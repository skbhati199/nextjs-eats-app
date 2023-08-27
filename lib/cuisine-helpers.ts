import prismadb from "./prismadb";



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

async function getByNameCusine(name: string) {
  return prismadb.cuisine.findUnique({ where: { name: name } });
}



// Fetch all restaurants
async function getAllCusines() {
  return prismadb.cuisine.findMany({});
}

async function deleteByIdCusine(id: string) {
  return prismadb.cuisine.delete({ where: { id: id } });
}

export {
  getAllCusines,
  getByIdCusine,
  getByNameCusine,
  updateCusine,
  createCusine,
  deleteByIdCusine,
};
