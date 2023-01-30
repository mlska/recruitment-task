import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const prisma = new PrismaClient();

  console.log(req.method);
  switch (req.method) {
    case "GET":
      const events = await prisma.event.findMany();
      if (events?.length) {
        res.status(200).json(events);
      } else {
        res.status(404).json("Error in reading events");
      }
      break;

    case "PUT":
      const data = JSON.parse(req.body);
      const event = await prisma.event.create({
        data,
      });
      res.status(200).json(event);
      break;

    case "PATCH":
      res.status(200).json({ message: "PATCH" });
      break;

    case "DELETE":
      const id = JSON.parse(req.body);
      const record = await prisma.event.delete({
        where: {
          id,
        },
      });
      res.status(200).json(record);
      break;

    default:
      res.status(405).json({ message: "Wrong method" });
  }
};
