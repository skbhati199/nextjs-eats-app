import { z } from "zod";

export const restaurantDetailsSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  address: z.string(),
  ownerId: z.string().optional(),
  cuisineId: z.string().optional(),
});
export const cuisineDetailsSchema = z.object({
  name: z.string(),
});

export const menuSchema = z.object({
  restaurantId:z.string(),
  name: z.string(),
  price: z.string(),
});


export const reviewSchema = z.object({
  userId:z.string(),
  restaurantId:z.string(),
  rating: z.string(),
  comment: z.string(),
});


// export enum UserRole {
//   USER = "user",
//   OPERATOR = "operator",
//   OWNER = "owner",
//   SUPER_ADMIN = "super_amdin",
// }

// export const UserSchema = z.object({
//   name: z.string(),
//   username: z.string(),
//   email: z.string(),
//   countryCode: z.string(),
//   mobileNumber: z.string(),
//   address: z.string().optional(),
//   pinCode: z.string().optional(),
//   city: z.string().optional(),
//   state: z.string().optional(),
//   country: z.string().optional(),
//   profilePic: z.string().optional(),
// });

export interface ResturantModel {
  id: "";
  name: "";
  address: "";
  cuisineId: "";
  ownerId: "";
}

export interface CuisineModel {
  id: "";
  name: "";
}
export interface MenuModel {
  id: "";
  name: "";
  price: 0;
}
