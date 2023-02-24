import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const messagesRouter = createTRPCRouter({
  createMessage: publicProcedure
    .input(z.object({ message: z.string(), image: z.string().nullable() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.message.create({
        data: {
          text: input.message,
          image: input.image,
        },
      });
    }),

  getMessages: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.message
      .findMany({
        orderBy: {
          createdAt: "asc",
        },
      })
      .then((messages) => {
        return messages.map((message) => {
          return {
            ...message,
            image: message.image
              ? `https://chat-room-trcp-s3-images.s3.us-east-2.amazonaws.com/${message.image}`
              : null,
          };
        });
      });
  }),

  deleteMessage: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.message.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
