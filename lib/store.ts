import { create } from "zustand";
import { FormDataState } from "./types";

export const inputStore = create<FormDataState>((set) => ({
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

  setFormData: (
    avg_order_value,
    day90_avg_order_value,
    cogs,
    storage_packaging,
    shipping_fulfillment,
    returns_cost,
    cc_merchant_fees,
    other_cost,
    target_margin,
    starting_spend,
    monthly_increment
  ) =>
    set({
      avg_order_value,
      day90_avg_order_value,
      cogs,
      storage_packaging,
      shipping_fulfillment,
      returns_cost,
      cc_merchant_fees,
      other_cost,
      target_margin,
      starting_spend,
      monthly_increment,
    }),

  reset: () =>
    set({
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
    }),
}));
