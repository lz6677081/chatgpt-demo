import type { APIRoute } from 'astro'

export const get: APIRoute = async() => {
  const response = await fetch('https://analytics.gptnb.xyz/api/v1/stats/aggregate?site_id=gpt.aifree.site&period=6mo&metrics=visitors,pageviews,bounce_rate,visit_duration', {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer 9IkbPkcHmrQ5oOLa6s2SHTI-twsaJnlh9IRlt36qJexfHv0XUfVzaavGAajEJYnL',
    },
    method: 'GET',
  })
  const text = await response.text()
  return new Response(text)
}
