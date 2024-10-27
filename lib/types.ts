import { FieldErrors } from "react-hook-form";
import { z } from "zod";

export const schema = z.object({
  avg_order_value: z.coerce.number().min(0, {
    message: "Avg order value cannot be less than $0",
  }),
  day90_avg_order_value: z.coerce.number().min(0, {
    message: "90 days avg order value cannot be less than $0",
  }),
  cogs: z.coerce.number().min(0, {
    message: "Cost of goods solds cannot be less than 0%",
  }),
  storage_packaging: z.coerce.number().min(0, {
    message: "Storage & packaging cost cannot be less than 0%",
  }),
  shipping_fulfillment: z.coerce.number().min(0, {
    message: "Shipping & fulfillment cost cannot be less than 0%",
  }),
  returns_cost: z.coerce.number().min(0, {
    message: "Returns Cost cannot be less than 0%",
  }),
  cc_merchant_fees: z.coerce.number().min(0, {
    message: "Credit card & merchant fees cannot be less than 0%",
  }),
  other_cost: z.coerce.number().min(0, {
    message: "Other variable cost cannot be less than 0%",
  }),
  target_margin: z.coerce.number().min(0, {
    message: "Target margin cannot be less than 0%",
  }),
  starting_spend: z.coerce.number().min(0, {
    message: "Starting monthly spend cannot be less than 0%",
  }),
  monthly_increment: z.coerce.number().min(0, {
    message: "Monthly spend increment cannot be less than 0%",
  }),
});

export type FormActionState = {
  fields?: Record<string, string>;
  errors?: FieldErrors;
  message?: string | null;
};

export interface FormDataState {
  avg_order_value: number;
  day90_avg_order_value: number;
  cogs: number;
  storage_packaging: number;
  shipping_fulfillment: number;
  returns_cost: number;
  cc_merchant_fees: number;
  other_cost: number;
  target_margin: number;
  starting_spend: number;
  monthly_increment: number;

  setFormData: (
    avg_order_value: number,
    day90_avg_order_value: number,
    cogs: number,
    storage_packaging: number,
    shipping_fulfillment: number,
    returns_cost: number,
    cc_merchant_fees: number,
    other_cost: number,
    target_margin: number,
    starting_spend: number,
    monthly_increment: number
  ) => void;

  reset: () => void;
}
