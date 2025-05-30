"use client";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addition, subtraction } from "@/app/redux/cards/cardsslice";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { addcardserver } from "@/app/actions/actions/clerkaction";

const formSchema = z.object({
  cardNumber: z
    .string()
    .min(16, { message: "Card number must be 16 digits" })
    .max(16, { message: "Card number must be 16 digits" }),

  cvv: z
    .string()
    .min(3, { message: "CVV must be atleast 3 digits" })
    .max(4, { message: "CVV cannot exceed 4 digits" }),

  expiryDate: z
    .string()
    .min(5, { message: "Enter expiry date as MM/YY" })
    .max(5, { message: "Enter expiry date as MM/YY" }),
});

export default function Addcard() {
  const [iziToast, setiziToast] = useState(null);
  const { user } = useUser();
  const dispatch = useDispatch();

  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cardNumber: "",
      cvv: "",
      expiryDate: "",
    },
  });
  useEffect(() => {
    const loadizitoast = async () => {
      const izitoastmodule = (await import("izitoast")).default;
      setiziToast(izitoastmodule);
    };
    loadizitoast();
  }, []);

  const onSubmitoo = (values) => {
    let cardId = crypto.randomUUID();
    addcardserver(cardId,values.cardNumber, values.cvv, values.expiryDate, user.id);
    dispatch(
      addition({
        cardId: cardId,
        cardNumber: values.cardNumber,
        cvv: values.cvv,
        expiryDate: values.expiryDate,
      })
    );
    form.reset()

    iziToast?.show({
      title: "Success",
      message: "Card added successfully!",
      position: "topCenter",
      color: "green",
      timeout: 3000,
      transitionIn: "fadeInDown",
      transitionOut: "fadeOutUp",
    });
    console.log(values);
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmitoo)} className="space-y-4">
          <FormField
            control={form.control}
            name="cardNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Card Number</FormLabel>
                <FormControl>
                  <Input className="dark:border-[#A1A1AA]/70 dark:focus:outline-none dark:focus:border-primary" placeholder="1234 5678 9123 4567" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="cvv"
            render={({ field }) => (
              <FormItem className="relative">
                <FormLabel>CVV</FormLabel>
                <FormControl>
                  <Input className="dark:border-[#A1A1AA]/70 dark:focus:outline-none dark:focus:border-primary" type="password" placeholder="482" {...field} />

                </FormControl>
                <img
            onClick={(e) => {
              if (e.target.src == `${process.env.NEXT_PUBLIC_URL}/svgs/eye-slash.svg`) {
                e.target.previousElementSibling.type = "text";
                e.target.alt = "Hide";
                e.target.src = `${process.env.NEXT_PUBLIC_URL}/svgs/eye.svg`;
              } 
              else {
                e.target.previousElementSibling.type = "password";
                e.target.alt = "Show";
                e.target.src = `${process.env.NEXT_PUBLIC_URL}/svgs/eye-slash.svg`;
              }
            }}
            className="absolute dark:invert top-[32px] right-4 w-6 cursor-pointer"
            src="svgs/eye-slash.svg"
            alt="Show"
          />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="expiryDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Expiry Date</FormLabel>
                <FormControl>
                  <Input className="dark:border-[#A1A1AA]/70 dark:focus:outline-none dark:focus:border-primary" placeholder="07/20" {...field} />
                  
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
        Note: Your card details are securely stored and encrypted.
      </p>
    </>
  );
}
