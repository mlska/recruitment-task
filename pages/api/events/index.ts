import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const prisma = new PrismaClient();

  const events = await prisma.event.findMany();

  if (events?.length) {
    return res.send({ status: "200", events });
  }

  res.send({ status: "404", message: "events not found" });
};
