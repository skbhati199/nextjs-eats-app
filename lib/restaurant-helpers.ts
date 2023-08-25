import { Restaurant } from "@prisma/client";
import prismadb from "./prismadb";

// import { withAccelerate } from '@prisma/extension-accelerate';

// const prismaWithAccelerate = prismadb.$extends(withAccelerate())

// Create a new restaurant
export async function createRestaurant(
  name: string,
  address:string,
  cuisineId: string,
  ownerId: string
) {
  return await prismadb.restaurant.create({
    data: {
      name,
      address,
      cuisineId,
      ownerId,
    },
  });
}

// Create a new restaurant
export async function updateRestaurant(
  id: string,
  name: string,
  address:string,
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
  return await  prismadb.restaurant.findMany();
}

export async function deleteByIdRestaurant(id: string) {
  return await  prismadb.restaurant.delete({ where: { id: id } });
}

export async function getRestaurantsByOwnerId(ownerId:string) {
  return await prismadb.restaurant.findMany({});
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
