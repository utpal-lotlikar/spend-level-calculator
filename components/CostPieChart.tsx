"use client";

import { PieChart, Pie, Cell, LabelList } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { inputStore } from "@/lib/store";

const COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
  "hsl(var(--chart-6))",
  "hsl(var(--chart-7))",
];

export default function CostBreakdownChart() {
  const avg_order_value = inputStore((state) => state.avg_order_value);
  const day90_avg_order_value = inputStore(
    (state) => state.day90_avg_order_value
  );
  const costOfGoodsSoldPercentage = inputStore((state) => state.cogs);
  const storingAndPackingPercentage = inputStore(
    (state) => state.storage_packaging
  );
  const shippingAndFulfillmentPercentage = inputStore(
    (state) => state.shipping_fulfillment
  );
  const returnCostPercentage = inputStore((state) => state.returns_cost);
  const creditCardAndMerchantFeePercentage = inputStore(
    (state) => state.cc_merchant_fees
  );
  const otherVariableCostsPercentage = inputStore((state) => state.other_cost);
  const target_margin = inputStore((state) => state.target_margin);

  let var_percent =
    costOfGoodsSoldPercentage +
    storingAndPackingPercentage +
    shippingAndFulfillmentPercentage +
    returnCostPercentage +
    creditCardAndMerchantFeePercentage +
    otherVariableCostsPercentage;
  let contribution_percent = 100 - var_percent;
  let cpa_target = contribution_percent - target_margin;

  const data = [
    {
      name: "Max CPA Target",
      value: avg_order_value * (cpa_target / 100),
      percentage: cpa_target,
    },
    {
      name: "Cost of goods",
      value: avg_order_value * (costOfGoodsSoldPercentage / 100),
      percentage: costOfGoodsSoldPercentage,
    },
    {
      name: "Storage & Packing",
      value: avg_order_value * (storingAndPackingPercentage / 100),
      percentage: storingAndPackingPercentage,
    },
    {
      name: "Shipping & fulfillment",
      value: avg_order_value * (shippingAndFulfillmentPercentage / 100),
      percentage: shippingAndFulfillmentPercentage,
    },
    {
      name: "Returns",
      value: avg_order_value * (returnCostPercentage / 100),
      percentage: returnCostPercentage,
    },
    {
      name: "Merchant Fees",
      value: avg_order_value * (creditCardAndMerchantFeePercentage / 100),
      percentage: creditCardAndMerchantFeePercentage,
    },
    {
      name: "Other Variable Fees",
      value: avg_order_value * (otherVariableCostsPercentage / 100),
      percentage: otherVariableCostsPercentage,
    },
  ];

  return (
    <Card className="w-full max-w-[300px] mx-auto">
      <CardHeader>
        <CardTitle>Cost Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            ...Object.fromEntries(
              data.map((item, index) => [
                item.name,
                {
                  label: item.name,
                  color: COLORS[index % COLORS.length],
                },
              ])
            ),
          }}
          className="mx-auto aspect-square max-h-[200px]  pb-0 [&_.recharts-pie-label-text]:fill-foreground"
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
              <LabelList
                dataKey="percentage"
                position="inside"
                fill="#ffffff"
                stroke="none"
                fontSize={14}
                formatter={(value: any) => `${value}%`}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
