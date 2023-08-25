import prismadb from "./prismadb";


// Create a new review
export async function createReview(
  rating: number,
  comment: string,
  userId: string,
  restaurantId: string
) {
  const existingUser = await prismadb.user.findUnique({
    where: { id: userId },
  });

  if (!existingUser) {
    throw new Error(`User with id ${userId} does not exist.`);
  }
  const existingResturant = await prismadb.restaurant.findUnique({
    where: { id: restaurantId },
  });

  if (!existingResturant) {
    throw new Error(`review with id ${restaurantId} does not exist.`);
  }

  return await prismadb.review.create({
    data: {
      rating: rating,
      comment: comment,
      userId: userId,
      restaurantId: restaurantId
    },
  });
}

// Create a new review
export async function updateReview(
  id: string,
  rating: number,
  comment: string,
  userId: string,
  restaurantId: string
) {
  return await prismadb.review.update({
    where: {
      id: id,
    },
    data: {
      rating: rating,
      comment: comment,
      userId: userId,
      restaurantId: restaurantId
    },
  });
}

export async function getByIdReview(id: string) {
  return await prismadb.review.findUnique({ where: { id: id } });
}

export async function getByUserIdReview(userId: string) {
  return await prismadb.review.findMany({
    where: { userId: userId },
  });
}

// Fetch all reviews
export async function getAllReviews() {
  return await prismadb.review.findMany();
}

export async function deleteByIdReview(id: string) {
  return await prismadb.review.delete({ where: { id: id } });
}

export async function getReviewsByOwnerId(ownerId: string) {
  return await prismadb.review.findMany({});
}