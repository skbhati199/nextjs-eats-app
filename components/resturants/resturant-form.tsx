"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { redirect, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useAuth } from "@clerk/nextjs";

import { restaurantDetailsSchema } from "@/types/types";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal";
import { toast } from "@/components/ui/use-toast";
import CuisineFilter from "../cuisine/CuisineFilter";
import { Cuisine, Restaurant } from "@prisma/client";
import EditPrfilePic from "@/components/resturants/edit-avator";

export default function ResturantForm({
  isEdit = false,
  data,
}: {
  isEdit?: boolean;
  data?: Restaurant;
}) {
  const router = useRouter();
  const modal = useModal();
  const { userId } = useAuth();
  if (!userId) {
    redirect("/sign-in");
  }
  const form = useForm<z.infer<typeof restaurantDetailsSchema>>({
    resolver: zodResolver(restaurantDetailsSchema),
    defaultValues: {
      id: isEdit ? data?.id : undefined,
      name: isEdit ? data?.name : "",
      address: isEdit ? data?.address : "",
      ownerId: userId ?? "",
      cuisineId: isEdit ? data?.cuisineId ?? "" : "",
    },
  });
  const isLoading = form.formState.isSubmitting;
  const onSubmitResturantDetails = async (
    values: z.infer<typeof restaurantDetailsSchema>
  ) => {
    try {
      const response = isEdit
        ? await axios.patch("/api/restaurant", {
            body: values,
          })
        : await axios.post("/api/restaurant", {
            body: values,
          });
      if (response.data) {
        modal.setRestaurant({ ...response.data });
        toast({
          title: `Restaurant ${response.data.name} successfully ${
            isEdit ? "updated" : "created"
          }.`,
        });
        if (isEdit) {
          router.push(`/restaurant/${response.data.id}/`)
        } else {
          modal.onClose();
          router.refresh();
        }
      }
    } catch (error: any) {
      console.error(error);
      toast({
        title: "Something went wrong",
      });
    }
  };

  const onFilterChange = async (selectedValue: Cuisine) => {
    try {
      form.setValue("cuisineId", selectedValue.id);
    } catch (error) {
      toast({
        title: "Something went wrong",
      });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmitResturantDetails)}
        className="
              rounded-lg
              w-full
              px-2
              md:px-4
              focus-within:shadow-sm
              flex
              flex-col
              gap-x-1
              gap-y-4
              "
      >
        <EditPrfilePic />
        <FormField
          name="name"
          render={({ field }) => (
            <FormItem className="col-span-12 lg:col-span-10">
              <FormControl className="m-0 p-0">
                <Input
                  className="border outline-none dark:text-white/100
                    focus-visible:ring-0 
                    focus-visible:ring-transparent"
                  disabled={isLoading}
                  placeholder="Name"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          name="address"
          render={({ field }) => (
            <FormItem className="col-span-12 lg:col-span-10">
              <FormControl className="m-0 p-0">
                <Input
                  className="border outline-none dark:text-white/100
                    focus-visible:ring-0 
                    focus-visible:ring-transparent"
                  disabled={isLoading}
                  placeholder="Address"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="flex flex-col justify-start items-start">
          <h2>Select Cuisine</h2>
          <CuisineFilter
            className="max-w-4xl"
            onFilterChange={onFilterChange}
          />
        </div>
        <Button
          type="submit"
          className="col-span-12 lg:col-span-2"
          disabled={isLoading}
        >
          Save Changes
        </Button>
      </form>
    </Form>
  );
}
