import { Redis } from '@upstash/redis'

const redis = Redis.fromEnv()

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST')

  if (req.method === 'POST') {
    const count = await redis.incr('portfolio:visitors')
    return res.json({ count })
  }

  if (req.method === 'GET') {
    const count = await redis.get('portfolio:visitors')
    return res.json({ count: count ?? 0 })
  }

  res.status(405).end()
}