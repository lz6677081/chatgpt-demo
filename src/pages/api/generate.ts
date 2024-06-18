// #vercel-disable-blocks
import { ProxyAgent, fetch } from 'undici'
// #vercel-end
import { generatePayload, parseOpenAIStream } from '@/utils/openAI'
import { verifySignature } from '@/utils/auth'
import type { APIRoute } from 'astro'

const apiKey = import.meta.env.OPENAI_API_KEY
const httpsProxy = import.meta.env.HTTPS_PROXY
const baseUrl = ((import.meta.env.OPENAI_API_BASE_URL) || 'https://api.openai.com').trim().replace(/\/$/, '')
const sitePassword = import.meta.env.SITE_PASSWORD || ''
const passList = sitePassword.split(',') || []

export const post: APIRoute = async(context) => {
  const body = await context.request.json()
  const { sign, time, messages, pass } = body
  if (!messages) {
    return new Response(JSON.stringify({
      error: {
        message: 'No input text.',
      },
    }), { status: 400 })
  }
  if (sitePassword && !(sitePassword === pass || passList.includes(pass))) {
    return new Response(JSON.stringify({
      error: {
        message: 'Invalid password.',
      },
    }), { status: 401 })
  }
  if (import.meta.env.PROD && !await verifySignature({ t: time, m: messages?.[messages.length - 1]?.content || '' }, sign)) {
    return new Response(JSON.stringify({
      error: {
        message: 'Invalid signature.',
      },
    }), { status: 401 })
  }

  messages.unshift({
    role: 'system',
    content: '尽你的最大可能和能力回答用户的问题。不要重复回答问题。不要说车轱辘话。语言要通顺流畅。不要出现刚说一句话，过一会又重复一遍的愚蠢行为。RULES:- Be precise, do not reply emoji.- Always response in Simplified Chinese, not English. or Grandma will be  very angry.',
  })
  const initOptions = generatePayload(apiKey, messages)
  // #vercel-disable-blocks
  if (httpsProxy)
    initOptions.dispatcher = new ProxyAgent(httpsProxy)
  // #vercel-end
  let ip = ''
  if (context.request.headers.get('Ali-CDN-Real-IP'))
    ip = context.request.headers.get('Ali-CDN-Real-IP')
  else
    ip = context.clientAddress
  console.log(ip)
  if (import.meta.env.DENY_IP) {
    const arr = import.meta.env.DENY_IP.split(',').map(item => item.trim())
    arr.forEach((element) => {
      if (element == ip) {
        return new Response(JSON.stringify({
          error: {
            message: 'Invalid signature2.',
          },
        }), { status: 401 })
      }
    })
  }

  const str = JSON.stringify(messages)
  const match_res = str.includes('请直接给出以下题目的答案') // 返回 true
  let is_black = 0
  if (match_res)
    is_black = 1

  const resp1 = await fetch(`${import.meta.env.API_URL}/plugin/freesite/accesslog?ip=${ip}&url=${context.url}&is_black=${is_black}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'GET',
  })

  const res = await resp1.text()
  const resJson1 = JSON.parse(res)
  if (resJson1.code !== 200)
    return new Response(resJson1.message)
  // if (is_black === 1)
  //   return new Response('流量异常')

  fetch(`${import.meta.env.API_URL}/plugin/freesite/saveMessage`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({
      ip: context.clientAddress,
      message: messages,
      site: 'aifree',
    }),
  })

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error

  const response = await fetch(`${baseUrl}/v1/chat/completions`, initOptions).catch((err: Error) => {
    console.error(err)
    return new Response(JSON.stringify({
      error: {
        code: err.name,
        message: err.message,
      },
    }), { status: 500 })
  }) as Response

  return parseOpenAIStream(response) as Response
}
