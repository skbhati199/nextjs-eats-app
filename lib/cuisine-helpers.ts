import prismadb from "./prismadb";

import { withAccelerate } from '@prisma/extension-accelerate';

const prismaWithAccelerate = prismadb.$extends(withAccelerate())

// Create a new cuisine
async function createCusine(
  name: string,
) {
  return prismaWithAccelerate.cuisine.create({
    data: {
      name,
    },
  });
}

// Create a new cuisine
async function updateCusine(
  id: string,
  name: string,
) {
  return prismaWithAccelerate.cuisine.update({
    where: {
      id: id,
    },
    data: {
      name,
    },
  });
}

async function getByIdCusine(id: string) {
  return prismaWithAccelerate.cuisine.findUnique({ where: { id: id } });
}


// Fetch all restaurants
async function getAllCusines() {
  return prismaWithAccelerate.cuisine.findMany();
}

async function deleteByIdCusine(id: string) {
  return prismaWithAccelerate.cuisine.delete({ where: { id: id } });
}

export {
  getAllCusines,
  getByIdCusine,
  updateCusine,
  createCusine,
  deleteByIdCusine,
};
