"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { CPATable } from "@/components/CPATable";
import CostBreakdownChart from "@/components/CostPieChart";
import FinancialTable from "@/components/FinancialTable";

export default function Dashboard() {
  const router = useRouter();

  const handleGoBack = () => {
    router.push("/");
  };

  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="text-3xl font-bold mb-6 text-center mt-5">
        Cost & Spend Levels
      </h1>
      <div className="flex flex-col lg:flex-row gap-6">
        <CPATable />
        <CostBreakdownChart />
      </div>
      <div className="mt-5">
        <FinancialTable />
      </div>
      <Button onClick={handleGoBack} className="w-full mt-5">
        Go Back
      </Button>
    </div>
  );
}
