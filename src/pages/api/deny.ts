import { updateDenyIp } from '@/global'
import type { APIRoute } from 'astro'

export const get: APIRoute = async() => {
  const response = await fetch('https://api.gptnb.xyz/deny.js', {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer 9IkbPkcHmrQ5oOLa6s2SHTI-twsaJnlh9IRlt36qJexfHv0XUfVzaavGAajEJYnL',
    },
    method: 'GET',
  })
  const text = await response.text()
  updateDenyIp(text)
  return new Response(text)
}
