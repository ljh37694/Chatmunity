import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";
import { createClient } from "redis";
import dotenv from "dotenv";

dotenv.config({ path: '.env.local' });

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

const userList = new Map([]);

const client = createClient({
  url: `redis://${process.env.REDIS_USERNAME}:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}/0`
});

client.on('connect', () => {
  console.log('Redis connected');
});

client.on('error', (err) => {
  console.error('Redis error: ' + err);
});

await client.connect();

app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer);

  io.on("connection", (socket) => {
    socket.on('message', (roomId, message) => {
      console.log('message: ' + message.content);
      io.to(roomId).emit('message', message);
    });

    // 유저 온라인/오프라인 상태 업데이트
    socket.on('userStatus', async (userId, status) => {
      const userData = {
        userId: userId,
        socketId: socket.id,
        status: status,
      };

      const result = await client.set(socket.id, JSON.stringify(userData));

      io.emit('userStatus', userId, status);

      if (status === 'online') {
        userList.set(userId, userData);
      } else {
        userList.delete(userId);
      }

      console.log('userStatus: ' + userId + ' ' + status);
      console.log(result);
    });

    socket.on('joinRoom', (roomId) => {
      console.log('join: ' + roomId, " " + socket.rooms);
      socket.join(roomId);
    });

    socket.on('disconnect', async () => {
      const userData = JSON.parse(await client.get(socket.id));

      await client.del(socket.id);
      io.emit('userStatus', userData.userId, 'offline');
      userList.delete(userData.userId);

      console.log(userList);

      console.log('user disconnected: ' + userData.userId);
    });
  });

  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});

global.redisClient = client;
global.userList = userList;