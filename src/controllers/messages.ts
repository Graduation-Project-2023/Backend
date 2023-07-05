import prisma from "../db";

export class MessageController {
  getAll = async (req: any, res: any, next: any) => {
    try {
      const userId = req.user.id;
      const messages = await prisma.user.findUnique({
        where: {
          id: userId,
        },
        select: {
          messagesSent: {
            include: {
              receiver: true,
            },
          },
          messagesReceived: {
            include: {
              sender: true,
            },
          },
        },
      });
      res.status(200).json(messages);
    } catch (error) {
      next(error);
    }
  };
}
