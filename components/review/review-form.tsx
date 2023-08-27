"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { redirect, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useAuth } from "@clerk/nextjs";
import { reviewSchema } from "@/types/types";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { useReviewModal } from "@/hooks/use-review-modal";
import { useEffect, useState } from "react";
import Rating from "./Rating";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Review } from "@prisma/client";

export default function ReviewForm() {
  const [data, setData] = useState<Review>();
  const [rating, setRating] = useState(0);

  const router = useRouter();
  const modal = useReviewModal();
  const { userId } = useAuth();
  if (!userId) {
    redirect("/sign-in");
  }

  useEffect(() => {
    async function getByIdReview() {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/review/${modal.reviewId}`
      );
      setData(response.data);
      console.log(response.data);
      form.setValue("rating", `${response.data.rating}`);
      form.setValue("comment", `${response.data.comment}`);
      setRating(response.data.rating);
    }
    getByIdReview();
  }, [setData]);

  const form = useForm<z.infer<typeof reviewSchema>>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      restaurantId: modal.restaurantId ?? "",
      rating: `${data?.rating}`,
      userId: data?.userId,
      comment: `${data?.comment}`,
    },
  });
  // const isLoading = form.formState.isSubmitting;
  const onSubmitReviewDetails = async (
    values: z.infer<typeof reviewSchema>
  ) => {
    console.log(`^^^^^^^^^${modal.reviewId}`);

    try {
      const response = await axios.patch("/api/review", {
        body: values,
      });
      if (response.data) {
        toast({
          title: `Review ${response.data.name} successfully updated.`,
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

  // Catch Rating value
  const handleRating = (rate: number) => {
    form.setValue("rating", `${rate}`);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmitReviewDetails)}
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
        <div className="flex flex-col items-start justify-center my-4">
          <Label className="text-muted-foreground text-xl my-2">Rating</Label>
          <div className="flex flex-row items-start mt-4"></div>
          <Rating initialRating={rating} onChange={handleRating} />
        </div>
        <FormField
          name="comment"
          render={({ field }) => (
            <FormItem className="col-span-12 lg:col-span-10">
              <FormControl className="m-0 p-0">
                <Textarea
                  className="border outline-none dark:text-white/100
                    focus-visible:ring-0 
                    focus-visible:ring-transparent pl-2"
                  placeholder="Write a your comment here..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end">
         
          <Button type="submit" className="max-w-4xl" >
            Save Changes
          </Button>
        </div>
      </form>
    </Form>
  );
}
