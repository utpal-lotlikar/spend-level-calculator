"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { inputStore } from "@/lib/store";

// Function to format currency
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
};

type MetricKeys =
  | "Monthly Spend"
  | "Ad Attributed Revenue"
  | "Cost of Goods"
  | "Gross Profit"
  | "Storage & Packing"
  | "Shipment & Fulfillment"
  | "Return Cost"
  | "Credit Card & Merchant Fee"
  | "Customer Orders"
  | "ROAS"
  | "CMOAS";

export default function FinancialTable() {
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
  const starting_monthly_spend = inputStore((state) => state.starting_spend);
  const monthly_increment = inputStore((state) => state.monthly_increment);

  let var_percent =
    costOfGoodsSoldPercentage +
    storingAndPackingPercentage +
    shippingAndFulfillmentPercentage +
    returnCostPercentage +
    creditCardAndMerchantFeePercentage +
    otherVariableCostsPercentage;
  let contribution_percent = 100 - var_percent;
  let cpa_target = contribution_percent - target_margin;
  let cpa_nc = avg_order_value * (cpa_target / 100);
  let nc_roas = avg_order_value / cpa_nc;

  // Function to calculate metrics for a given month
  const calculateMetrics = (monthlySpend: number) => {
    const adAttributedRevenue = monthlySpend * nc_roas;
    const costOfGoods = adAttributedRevenue * (costOfGoodsSoldPercentage / 100);
    const grossProfit = adAttributedRevenue - costOfGoods;
    const storingAndPacking =
      adAttributedRevenue * (storingAndPackingPercentage / 100);
    const shippingAndFulfillment =
      adAttributedRevenue * (shippingAndFulfillmentPercentage / 100);
    const returnCost = adAttributedRevenue * (returnCostPercentage / 100);
    const creditCardAndMerchantFee =
      adAttributedRevenue * (creditCardAndMerchantFeePercentage / 100);
    const otherVariableCosts =
      adAttributedRevenue * (otherVariableCostsPercentage / 100);
    const totalCost =
      monthlySpend +
      storingAndPacking +
      shippingAndFulfillment +
      returnCost +
      creditCardAndMerchantFee +
      otherVariableCosts;
    const contributionMargin = grossProfit - totalCost;
    const roas = adAttributedRevenue / monthlySpend;
    const cmoas = contributionMargin / monthlySpend;
    const customerOrders = adAttributedRevenue / avg_order_value;

    return {
      "Monthly Spend": monthlySpend,
      "Ad Attributed Revenue": adAttributedRevenue,
      "Cost of Goods": costOfGoods,
      "Gross Profit": grossProfit,
      "Storage & Packing": storingAndPacking,
      "Shipment & Fulfillment": shippingAndFulfillment,
      "Return Cost": returnCost,
      "Credit Card & Merchant Fee": creditCardAndMerchantFee,
      "Other Variable Costs": otherVariableCosts,
      "Total Cost": totalCost,
      "Contribution Margin": contributionMargin,
      ROAS: roas,
      CMOAS: cmoas,
      "Customer Orders": customerOrders,
    };
  };

  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const metrics = months.map((month) =>
    calculateMetrics(starting_monthly_spend + (month - 1) * monthly_increment)
  );

  return (
    <Card className="w-full overflow-x-auto">
      <CardHeader>
        <CardTitle>12-Month Financial Projection</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="sticky left-0 bg-background">
                Metric
              </TableHead>
              {months.map((month) => (
                <TableHead key={month} className="text-right">
                  Month {month}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {(Object.keys(metrics[0]) as MetricKeys[]).map((key) => (
              <TableRow key={key}>
                <TableCell className="sticky left-0 bg-background font-bold">
                  {key}
                </TableCell>
                {metrics.map((metric, index) => (
                  <TableCell key={index} className="text-right">
                    {key === "ROAS" || key === "CMOAS"
                      ? metric[key].toFixed(2)
                      : key === "Customer Orders"
                      ? metric[key].toFixed(0)
                      : formatCurrency(metric[key])}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
