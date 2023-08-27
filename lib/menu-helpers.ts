import prismadb from "./prismadb";



// Create a new menuItem
async function createMenu(
  name: string,
  price:number,
  restaurantId:string,
) {
  return prismadb.menuItem.create({
    data: {
      name,
      price,
      restaurantId
    },
  });
}

// Create a new menuItem
async function updateMenu(
  id: string,
  name: string,
  price:number,
  restaurantId:string,
) {
  return prismadb.menuItem.update({
    where: {
      id: id,
    },
    data: {
      name,
      price,
      restaurantId
    },
  });
}

async function getByIdMenu(id: string) {
  return prismadb.menuItem.findUnique({ where: { id: id } });
}

async function getByRestaurantMenu(restaurantId: string) {
  return prismadb.menuItem.findMany({ where: { restaurantId: restaurantId } });
}



// Fetch all restaurants
async function getAllMenus() {
  return prismadb.menuItem.findMany({});
}

async function deleteByIdMenu(id: string) {
  return prismadb.menuItem.delete({ where: { id: id } });
}

export {
  getAllMenus,
  getByIdMenu,
  getByRestaurantMenu,
  updateMenu,
  createMenu,
  deleteByIdMenu,
};
