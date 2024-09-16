import { MongoClient } from 'mongodb'

const url = `mongodb+srv://ljh37694:${process.env.DB_PASSWORD}@forum.6p5dx3j.mongodb.net/?retryWrites=true&w=majority&appName=Forum`;
let connectDB: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  // 개발 중 재실행을 막음
  if (!global._mongo) {
    global._mongo = new MongoClient(url).connect();
  }
  connectDB = global._mongo;
} else {
  connectDB = new MongoClient(url).connect();
}

export { connectDB }