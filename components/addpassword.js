"use client";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { zodResolver } from "@hookform/resolvers/zod";
import { addPassword } from "@/app/redux/passwords/passwordslice";
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
import { addpasswordserver } from "@/app/actions/actions/clerkaction";


const formSchema = z.object({
  websiteURL: z
    .string()
    .url({ message: "Enter a valid website URL (e.g. https://example.com)" }),

  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters" })
    .max(20, { message: "Username must not exceed 20 characters" }),

  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" })
    .max(64, { message: "Password must not exceed 64 characters" }),
});

export default function Addpassword() {
  const [iziToast, setiziToast] = useState(null);
  const { user } = useUser();
  const dispatch = useDispatch();

  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      websiteURL: "",
      username: "",
      password: "",
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
    let passwordId = crypto.randomUUID();
    addpasswordserver(passwordId,values.websiteURL, values.username, values.password, user.id);
    dispatch(
      addPassword({
        passwordId: passwordId,
        websiteURL: values.websiteURL,
        username: values.username,
        password: values.password,
      })
    );
    form.reset()

    iziToast?.show({
      title: "Success",
      message: "Password added successfully!",
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
            name="websiteURL"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Website URL</FormLabel>
                <FormControl>
                  <Input className="dark:border-[#A1A1AA]/70 dark:focus:outline-none dark:focus:border-primary" placeholder="https://example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

<FormField
  control={form.control}
  name="username"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Username</FormLabel>
      <FormControl>
        <Input className="dark:border-[#A1A1AA]/70 dark:focus:outline-none dark:focus:border-primary" placeholder="example123" {...field} />
        
      </FormControl>

      <FormMessage />
    </FormItem>
  )}
/>
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="relative">
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input className="dark:border-[#A1A1AA]/70 dark:focus:outline-none dark:focus:border-primary" type="password" placeholder="goose@482" {...field} />

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

          <Button type="submit">Submit</Button>
        </form>
      </Form>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
        Note: Your Password details are securely stored and encrypted.
      </p>
    </>
  );
}
