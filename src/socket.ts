import { Server } from "socket.io";
import passport from "passport";
import sessionMiddleware from "./sessionMiddleware";
import prisma from "./db";

let ioInstance: Server;

export const getIo = (server: any) => {
  if (!ioInstance) {
    const io = new Server(server, {
      cors: {
        origin: true,
        credentials: true,
      },
    });
    // io.engine.use((socket: any, next: any) => {
    //   console.log("test");
    //   next();
    // });
    // io.engine.use(sessionMiddleware);
    // io.engine.use(passport.initialize());
    // io.engine.use(passport.session());

    // io.use((socket: any, next: any) => {
    //   if (socket.request.isAuthenticated()) {
    //     return next();
    //   } else {
    //     io.emit("unauthorized");
    //   }
    // });
    ioInstance = io;
  }
  return ioInstance;
};

const clientsByUserId: any = {};

export const initConnection = (server: any) => {
  const io = getIo(server);
  io.on("connect", (socket: any) => {
    console.log("a user connected");
    socket.on("subscribe", (userId: string) => {
      if (!clientsByUserId[userId]) {
        clientsByUserId[userId] = new Set();
      }
      clientsByUserId[userId].add(socket.id);
    });

    socket.on("message-sent", async (message: any) => {
      const newMessage = await prisma.message.create({
        data: {
          senderId: message.senderId,
          receiverId: message.receiverId,
          text: message.text,
        },
      });
      emitMessage(message.receiverId, newMessage);
    });

    socket.on("unsubscribe", (userId: any) => {
      if (clientsByUserId[userId]) {
        clientsByUserId[userId].delete(socket.id);
      }
    });

    socket.on("disconnect", (userId: string) => {
      console.log("disconnected");
      if (clientsByUserId[userId]) {
        clientsByUserId[userId].delete(socket.id);
      }
    });
  });
};

export const emitMessage = (receiverId: any, message: any) => {
  if (clientsByUserId[receiverId] && ioInstance) {
    clientsByUserId[receiverId].forEach((clientId: any) => {
      console.log("emitting message");
      ioInstance.to(clientId).emit("message-recieved", message);
    });
  }
};
