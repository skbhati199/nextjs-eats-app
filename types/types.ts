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

// export const bussinessAddressSchema = z.object({
//   address: z.string().optional(),
//   contactNumber: z.string().optional(),
//   contactCountryCode: z.string().optional(),
//   city: z.string().optional(),
//   state: z.string().optional(),
//   country: z.string().optional(),
// });

// export const buinsessDocumentSchema = z.object({
//   certificateId: z.string(),
//   buinsessDocuments: z.array(z.string()).optional(),
// });

// export const siteSchema = z.object({
//   orgId: z.string(),
//   name: z.string(),
//   phoneNumberWithCode: z.string(),
//   site: z.string().optional(),
//   site_area: z.string().optional(),
//   location: z.string().optional(),
//   price: z.string().optional(),
//   min_power: z.string().optional(),
//   max_power: z.string().optional(),
// });

// export const chargePointSchema = z.object({
//   orgId: z.string(),
//   siteId: z.string(),
//   chargePointHardwareId: z.string(),
//   chargePointName: z.string(),
//   instantPower: z.string(),
//   status: z.string().optional(),
//   power: z.string().optional(),
//   publicValue: z.boolean().default(false),
// });

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
  id: "",
  name: "",
  address: "",
  cuisineId: "",
  ownerId: "",
}


export interface CuisineModel {
  id: "",
  name: "",
}
