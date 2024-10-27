"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Button } from "./ui/button";
import { schema } from "@/lib/types";
import { DollarSign, PercentIcon } from "lucide-react";
import { inputStore } from "@/lib/store";
import { useRouter } from "next/navigation";

export const InputForm = () => {
  const router = useRouter();
  const setFormData = inputStore((state) => state.setFormData);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      avg_order_value: 1000,
      day90_avg_order_value: 1800,
      cogs: 15,
      storage_packaging: 5,
      shipping_fulfillment: 10,
      returns_cost: 1,
      cc_merchant_fees: 2.5,
      other_cost: 1,
      target_margin: 15,
      starting_spend: 5000,
      monthly_increment: 5000,
    },
  });

  function onSubmit(values: z.infer<typeof schema>) {
    setFormData(
      values.avg_order_value,
      values.day90_avg_order_value,
      values.cogs,
      values.storage_packaging,
      values.shipping_fulfillment,
      values.returns_cost,
      values.cc_merchant_fees,
      values.other_cost,
      values.target_margin,
      values.starting_spend,
      values.monthly_increment
    );
    router.push("/dashboard");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="border rounded-lg p-4 shadow-sm mt-1">
          <h2 className="text-2xl">Cost & Spend Levels Input</h2>
          <h4 className="mb-5 text-sm">
            Check your profits at your specified margin and spend
          </h4>
          <div className="md:flex gap-2">
            <FormField
              control={form.control}
              name="avg_order_value"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>New Customer Avg. Order Value</FormLabel>
                  <FormControl>
                    <div className="flex h-10 items-center rounded-md border border-input bg-white pl-3 text-sm ring-offset-background focus-within:ring-1 focus-within:ring-ring focus-within:ring-offset-2">
                      <DollarSign className="h-[16px] w-[16px]" />
                      <input
                        {...field}
                        type="number"
                        className="w-full p-2 placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="day90_avg_order_value"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>90 Days Average Order Value</FormLabel>
                  <FormControl>
                    <div className="flex h-10 items-center rounded-md border border-input bg-white pl-3 text-sm ring-offset-background focus-within:ring-1 focus-within:ring-ring focus-within:ring-offset-2">
                      <DollarSign className="h-[16px] w-[16px]" />
                      <input
                        {...field}
                        type="number"
                        className="w-full p-2 placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="md:flex gap-2 mt-2">
            <FormField
              control={form.control}
              name="cogs"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Cost of Goods Sold</FormLabel>
                  <FormControl>
                    <div className="flex h-10 items-center rounded-md border border-input bg-white pl-3 text-sm ring-offset-background focus-within:ring-1 focus-within:ring-ring focus-within:ring-offset-2">
                      <PercentIcon className="h-[16px] w-[16px]" />
                      <input
                        {...field}
                        type="number"
                        className="w-full p-2 placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="storage_packaging"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Storage & Packaging Cost</FormLabel>
                  <FormControl>
                    <div className="flex h-10 items-center rounded-md border border-input bg-white pl-3 text-sm ring-offset-background focus-within:ring-1 focus-within:ring-ring focus-within:ring-offset-2">
                      <PercentIcon className="h-[16px] w-[16px]" />
                      <input
                        {...field}
                        type="number"
                        className="w-full p-2 placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="md:flex gap-2 mt-2">
            <FormField
              control={form.control}
              name="shipping_fulfillment"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Shipping & Fulfillment Cost</FormLabel>
                  <FormControl>
                    <div className="flex h-10 items-center rounded-md border border-input bg-white pl-3 text-sm ring-offset-background focus-within:ring-1 focus-within:ring-ring focus-within:ring-offset-2">
                      <PercentIcon className="h-[16px] w-[16px]" />
                      <input
                        {...field}
                        type="number"
                        className="w-full p-2 placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="returns_cost"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Returns Cost</FormLabel>
                  <FormControl>
                    <div className="flex h-10 items-center rounded-md border border-input bg-white pl-3 text-sm ring-offset-background focus-within:ring-1 focus-within:ring-ring focus-within:ring-offset-2">
                      <PercentIcon className="h-[16px] w-[16px]" />
                      <input
                        {...field}
                        type="number"
                        className="w-full p-2 placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="md:flex gap-2 mt-2">
            <FormField
              control={form.control}
              name="cc_merchant_fees"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Credit Card & Merchant Fees</FormLabel>
                  <FormControl>
                    <div className="flex h-10 items-center rounded-md border border-input bg-white pl-3 text-sm ring-offset-background focus-within:ring-1 focus-within:ring-ring focus-within:ring-offset-2">
                      <PercentIcon className="h-[16px] w-[16px]" />
                      <input
                        {...field}
                        type="number"
                        className="w-full p-2 placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="other_cost"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Other Variable Cost</FormLabel>
                  <FormControl>
                    <div className="flex h-10 items-center rounded-md border border-input bg-white pl-3 text-sm ring-offset-background focus-within:ring-1 focus-within:ring-ring focus-within:ring-offset-2">
                      <PercentIcon className="h-[16px] w-[16px]" />
                      <input
                        {...field}
                        type="number"
                        className="w-full p-2 placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="md:flex gap-2 mt-2">
            <FormField
              control={form.control}
              name="target_margin"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Target Margin</FormLabel>
                  <FormControl>
                    <div className="flex h-10 items-center rounded-md border border-input bg-white pl-3 text-sm ring-offset-background focus-within:ring-1 focus-within:ring-ring focus-within:ring-offset-2">
                      <PercentIcon className="h-[16px] w-[16px]" />
                      <input
                        {...field}
                        type="number"
                        className="w-full p-2 placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="md:flex gap-2 mt-2">
            <FormField
              control={form.control}
              name="starting_spend"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Starting Monthly Spend</FormLabel>
                  <FormControl>
                    <div className="flex h-10 items-center rounded-md border border-input bg-white pl-3 text-sm ring-offset-background focus-within:ring-1 focus-within:ring-ring focus-within:ring-offset-2">
                      <DollarSign className="h-[16px] w-[16px]" />
                      <input
                        {...field}
                        type="number"
                        className="w-full p-2 placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="monthly_increment"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Monthly Spend Increment</FormLabel>
                  <FormControl>
                    <div className="flex h-10 items-center rounded-md border border-input bg-white pl-3 text-sm ring-offset-background focus-within:ring-1 focus-within:ring-ring focus-within:ring-offset-2">
                      <DollarSign className="h-[16px] w-[16px]" />
                      <input
                        {...field}
                        type="number"
                        className="w-full p-2 placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className="mt-5">
            Calculate Spend
          </Button>
        </div>
      </form>
    </Form>
  );
};
