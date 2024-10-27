"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { inputStore } from "@/lib/store";

export const CPATable = () => {
  const avg_order_value = inputStore((state) => state.avg_order_value);
  const day90_avg_order_value = inputStore(
    (state) => state.day90_avg_order_value
  );
  const cogs = inputStore((state) => state.cogs);
  const storage_packaging = inputStore((state) => state.storage_packaging);
  const shipping_fulfillment = inputStore(
    (state) => state.shipping_fulfillment
  );
  const returns_cost = inputStore((state) => state.returns_cost);
  const cc_merchant_fees = inputStore((state) => state.cc_merchant_fees);
  const other_cost = inputStore((state) => state.other_cost);
  const target_margin = inputStore((state) => state.target_margin);

  let var_percent =
    cogs +
    storage_packaging +
    shipping_fulfillment +
    returns_cost +
    cc_merchant_fees +
    other_cost;
  let var_nc_cost = avg_order_value * (var_percent / 100);
  let var_90d_cost = day90_avg_order_value * (var_percent / 100);

  let contribution_percent = 100 - var_percent;
  let contribution_nc = avg_order_value * (contribution_percent / 100);
  let contribution_90d = day90_avg_order_value * (contribution_percent / 100);

  let cpa_target = contribution_percent - target_margin;
  let cpa_nc = avg_order_value * (cpa_target / 100);
  let cpa_90d = day90_avg_order_value * (cpa_target / 100);

  let breakeven_roas = 1 / (contribution_percent / 100);
  let nc_roas = avg_order_value / cpa_nc;
  let day90_roas = day90_avg_order_value / cpa_nc;
  let day90_cpa_roas = avg_order_value / cpa_90d;

  return (
    <div className="flex flex-col max-w-md">
      <Table className="border border-gray-200">
        <TableHeader className="bg-gray-50">
          <TableRow className="border-b">
            <TableHead className="font-bold"></TableHead>
            <TableHead className="font-bold">% of AOV</TableHead>
            <TableHead className="font-bold text-right">
              New Customer Amount
            </TableHead>
            <TableHead className="font-bold text-right">
              90 Day Amount
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Variable Cost</TableCell>
            <TableCell>{var_percent.toFixed(2)}%</TableCell>
            <TableCell className="text-right">
              ${var_nc_cost.toFixed(2)}
            </TableCell>
            <TableCell className="text-right">
              ${var_90d_cost.toFixed(2)}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Contribution Margin</TableCell>
            <TableCell>{contribution_percent.toFixed(2)}%</TableCell>
            <TableCell className="text-right">
              ${contribution_nc.toFixed(2)}
            </TableCell>
            <TableCell className="text-right">
              ${contribution_90d.toFixed(2)}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-bold">Maximum CPA Target</TableCell>
            <TableCell className="font-bold">
              {cpa_target.toFixed(2)}%
            </TableCell>
            <TableCell className="font-bold text-right">
              ${cpa_nc.toFixed(2)}
            </TableCell>
            <TableCell className="font-bold text-right">
              ${cpa_90d.toFixed(2)}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Table className="border border-gray-200 mt-4">
        <TableHeader className="bg-gray-50">
          <TableRow className="border-b">
            <TableHead className="font-bold">Breakeven ROAS</TableHead>
            <TableHead className="font-bold">NC ROAS</TableHead>
            <TableHead className="font-bold">90D ROAS</TableHead>
            <TableHead className="font-bold">90D CPA ROAS</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-bold text-center">
              {breakeven_roas.toFixed(2)}
            </TableCell>
            <TableCell className="font-bold text-center">
              {nc_roas.toFixed(2)}
            </TableCell>
            <TableCell className="font-bold text-center">
              {day90_roas.toFixed(2)}
            </TableCell>
            <TableCell className="font-bold text-center">
              {day90_cpa_roas.toFixed(2)}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};
