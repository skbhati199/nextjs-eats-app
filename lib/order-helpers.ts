import { OrderStatus } from "@prisma/client";
import prismadb from "./prismadb";

// Create a new order
async function createOrder(
  userId: string,
  restaurantId: string,
  menuItemId: string,
  price: number,
  gst: number,
  totalAmount: number
) {
  return prismadb.order.create({
    data: {
      userId,
      restaurantId,
      menuItemId,
      price,
      gst,
      totalAmount,
    },
  });
}

// Create a new order
async function updateOrder(
  id: string,
  userId: string,
  menuItemId: string,
  restaurantId: string,
  orderStatus: OrderStatus
) {
  return prismadb.order.update({
    where: {
      id: id,
    },
    data: {
      userId,
      restaurantId,
      menuItemId,
      orderStatus,
    },
  });
}

async function getByIdOrder(id: string) {
  return prismadb.order.findUnique({ where: { id: id } });
}

async function getByRestaurantOrder(restaurantId: string) {
  return prismadb.order.findMany({ where: { restaurantId: restaurantId } });
}

// Fetch all restaurants
async function getAllOrders() {
  return prismadb.order.findMany({});
}

async function deleteByIdOrder(id: string) {
  return prismadb.order.delete({ where: { id: id } });
}

export {
  getAllOrders,
  getByIdOrder,
  getByRestaurantOrder,
  updateOrder,
  createOrder,
  deleteByIdOrder,
};
