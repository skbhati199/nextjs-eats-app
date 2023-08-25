"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { redirect, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useAuth } from "@clerk/nextjs";

import { cuisineDetailsSchema } from "@/types/types";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { useCuisineModal } from "@/hooks/use-cuisine-modal";

export default function CuisineForm() {
  const router = useRouter();
  const modal = useCuisineModal();
  const { userId } = useAuth();
  if (!userId) {
    redirect("/sign-in");
  }
  const form = useForm<z.infer<typeof cuisineDetailsSchema>>({
    resolver: zodResolver(cuisineDetailsSchema),
    defaultValues: {
      name: "",
    },
  });
  const isLoading = form.formState.isSubmitting;
  const onSubmitCuisineDetails = async (
    values: z.infer<typeof cuisineDetailsSchema>
  ) => {
    try {
      const response = await axios.post("/api/v1/cuisines", {
        body: values,
      });
      if (response.data) {
        modal.setCuisine(response.data);
        toast({
          title: `Cuisine ${response.data.name} successfully created.`,
        });
        modal.onClose();
        router.refresh();
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
        onSubmit={form.handleSubmit(onSubmitCuisineDetails)}
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
                    focus-visible:ring-transparent"
                  disabled={isLoading}
                  placeholder="Name"
                  {...field}
                />
              </FormControl>
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
