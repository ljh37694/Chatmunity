import type { MongoClient } from 'mongodb'
import { RedisClientType } from 'redis'

declare global {
  namespace globalThis {
    var _mongo: Promise<MongoClient>
    var redisClient: RedisClientType
  }
}