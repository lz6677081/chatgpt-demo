import { kv } from '@vercel/kv'

export const config = {
  matcher: '/api/generate',
}

export default async function middleware(request) {
  const clientIp = request.headers.get('x-forwarded-for')

  const today = new Date()
  const date = `${today.getFullYear()}${today.getMonth() + 1}${today.getDate()}`
  const cache_key = `${date}:${clientIp}`
  const request_count = await kv.get(cache_key)

  if (request_count > 1000)
    return new Response('请求频率过高,请稍后再试', { status: 200 })

  kv.set(cache_key, request_count + 1)
}
