import type { MongoClient } from 'mongodb'
import { RedisClientType } from 'redis'
import { UserSocketData } from './types'

declare global {
  namespace globalThis {
    var _mongo: Promise<MongoClient>
    var redisClient: RedisClientType
    var userList: Map<string, UserSocketData>
  }
}