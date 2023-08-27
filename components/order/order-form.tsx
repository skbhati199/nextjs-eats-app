"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { redirect, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useAuth } from "@clerk/nextjs";

import { menuSchema } from "@/types/types";

import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { useMenuModal } from "@/hooks/use-menu-modal";

export default function MenuForm() {
  const router = useRouter();
  const modal = useMenuModal();
  const { userId } = useAuth();
  if (!userId) {
    redirect("/sign-in");
  }
  const form = useForm<z.infer<typeof menuSchema>>({
    resolver: zodResolver(menuSchema),
    defaultValues: {
      restaurantId: modal.restaurantId??"",
      name: "",
      price: "0",
    },
  });
  const isLoading = form.formState.isSubmitting;
  const onSubmitMenuDetails = async (
    values: z.infer<typeof menuSchema>
  ) => {
    console.log(values);
    try {
      if(!modal.restaurantId || modal.restaurantId === ""){
        throw new Error("Restaurant Id missing");
      }
      const response = await axios.post("/api/menu", {
        body: values,
      });
      if (response.data) {
        // modal.setMenu(response.data);
        toast({
          title: `Menu ${response.data.name} successfully created.`,
        });
        router.refresh();
        modal.onClose();
      }
    } catch (error: any) {
      toast({
        title: "Something went wrong",
      });
    }
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmitMenuDetails)}
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
        <FormField
          name="name"
          render={({ field }) => (
            <FormItem className="col-span-12 lg:col-span-10">
              <FormControl className="m-0 p-0">
                <Input
                  className="border outline-none dark:text-white/100
                    focus-visible:ring-0 
                    focus-visible:ring-transparent pl-2"
                  disabled={isLoading}
                  placeholder="Name"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="price"
          render={({ field }) => (
            <FormItem className="flex flex-col items-start col-span-12 lg:col-span-10">
              <FormControl className="m-0 p-0">
                <Input
                  className="border outline-none dark:text-white/100
                    focus-visible:ring-0 
                    focus-visible:ring-transparent pl-2"
                  disabled={isLoading}
                  type="number"
                  placeholder="Price"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end">
          <Button type="submit" className="max-w-4xl" disabled={isLoading}>
            Save Changes
          </Button>
        </div>
      </form>
    </Form>
  );
}
