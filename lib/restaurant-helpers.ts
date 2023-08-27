import axios from "axios";
import prismadb from "./prismadb";

// import { withAccelerate } from '@prisma/extension-accelerate';

// const prismaWithAccelerate = prismadb.$extends(withAccelerate())

// Create a new restaurant
export async function createRestaurant(
  name: string,
  address: string,
  cuisineId: string,
  ownerId: string
) {
  const existingUser = await prismadb.user.findUnique({
    where: { id: ownerId },
  });

  if (!existingUser) {
    throw new Error(`restaurant with id ${ownerId} does not exist.`);
  }

  return await prismadb.restaurant.create({
    data: {
      name: name,
      address: address,
      cuisineId: cuisineId,
      ownerId: ownerId,
    },
  });
}

// Create a new restaurant
export async function updateRestaurant(
  id: string,
  name: string,
  address: string,
  cuisineId: string,
  ownerId: string
) {
  return await prismadb.restaurant.update({
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

export async function getByIdRestaurant(id: string) {
  return await prismadb.restaurant.findUnique({ where: { id: id } });
}

export async function getByOwnerIdRestaurant(ownerId: string) {
  return await prismadb.restaurant.findMany({
    where: { ownerId: ownerId },
    include: {
      menuItems: true,
      review: true,
    },
  });
}

// Fetch all restaurants
export async function getAllRestaurants() {
  return await prismadb.restaurant.findMany();
}

export async function deleteByIdRestaurant(id: string) {
  return await prismadb.restaurant.delete({ where: { id: id } });
}

export async function getRestaurantsByOwnerId(ownerId: string) {
  return await prismadb.restaurant.findMany({});
}

export async function getAllPublicRestaurants() {
  return await prismadb.restaurant.findMany({
    include: {
      cuisine: true,
      review: true,
      menuItems: true,
    },
  });
}

// export {
//   getAllRestaurants,
//   getByOwnerIdRestaurant,
//   getByIdRestaurant,
//   updateRestaurant,
//   createRestaurant,
//   deleteByIdRestaurant,
//   getRestaurantsByOwnerId,
// };
