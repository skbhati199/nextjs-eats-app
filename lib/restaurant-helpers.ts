import prismadb from "./prismadb";

import { withAccelerate } from '@prisma/extension-accelerate';

const prismaWithAccelerate = prismadb.$extends(withAccelerate())

// Create a new restaurant
async function createRestaurant(
  name: string,
  address:string,
  cuisineId: string,
  ownerId: string
) {
  return prismaWithAccelerate.restaurant.create({
    data: {
      name,
      address,
      cuisineId,
      ownerId,
    },
  });
}

// Create a new restaurant
async function updateRestaurant(
  id: string,
  name: string,
  address:string,
  cuisineId: string,
  ownerId: string
) {
  return prismaWithAccelerate.restaurant.update({
    where: {
      id: id,
    },
    data: {
      name,
      address,
      cuisineId,
      ownerId,
    },
  });
}

async function getByIdRestaurant(id: string) {
  return prismaWithAccelerate.restaurant.findUnique({ where: { id: id } });
}

async function getByOwnerIdRestaurant(ownerId: string) {
  return prismaWithAccelerate.restaurant.findMany({
    where: { ownerId: ownerId },
    include: {
      menuItems: true,
      review: true,
    },
  });
}

// Fetch all restaurants
async function getAllRestaurants() {
  return prismaWithAccelerate.restaurant.findMany();
}

async function deleteByIdRestaurant(id: string) {
  return prismaWithAccelerate.restaurant.delete({ where: { id: id } });
}

export {
  getAllRestaurants,
  getByOwnerIdRestaurant,
  getByIdRestaurant,
  updateRestaurant,
  createRestaurant,
  deleteByIdRestaurant,
};
