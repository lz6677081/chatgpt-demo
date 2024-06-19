import { deny_ip } from '@/global'
import type { APIRoute } from 'astro'

export const get: APIRoute = async() => {
  return new Response(deny_ip)
}
