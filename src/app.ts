import fastify from "fastify";
import { prisma } from "./lib/prisma";
import { Prisma } from "@prisma/client";

export const app = fastify();

app.get("/players", async (req, res) => {
  const result = await prisma.player.findMany();
  return result;
});

app.post<{
  Body: Prisma.PlayerCreateInput;
}>(`/players`, async (req, res) => {
  const result = await prisma.player.create({
    data: req.body,
  });

  return result;
});

app.put<{
  Params: { playerId: string };
  Body: Prisma.PlayerUpdateInput;
}>("/players/:playerId", async (req, res) => {
  const { playerId } = req.params;

  try {
    const player = await prisma.player.update({
      where: { id: playerId },
      data: req.body,
    });

    return player;
  } catch (error) {
    return {
      error: `player with ID ${playerId} does not exist in the database`,
    };
  }
});

app.delete<{
  Params: { playerId: string };
}>(`/players/:playerId`, async (req, res) => {
  const { playerId } = req.params;

  try {
    const player = await prisma.player.delete({
      where: {
        id: playerId,
      },
    });
    return player;
  } catch (error) {
    return {
      error: `player with ID ${playerId} does not exist in the database`,
    };
  }
});