import prismadb from "./prismadb";

// import { withAccelerate } from '@prisma/extension-accelerate';

// const prismadb = prismadb.$extends(withAccelerate())

// Create a new cuisine
async function createCusine(
  name: string,
) {
  return prismadb.cuisine.create({
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
  return prismadb.cuisine.update({
    where: {
      id: id,
    },
    data: {
      name,
    },
  });
}

async function getByIdCusine(id: string) {
  return prismadb.cuisine.findUnique({ where: { id: id } });
}


// Fetch all restaurants
async function getAllCusines() {
  return prismadb.cuisine.findMany();
}

async function deleteByIdCusine(id: string) {
  return prismadb.cuisine.delete({ where: { id: id } });
}

export {
  getAllCusines,
  getByIdCusine,
  updateCusine,
  createCusine,
  deleteByIdCusine,
};
