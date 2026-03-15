import { DashboardSkeleton } from "@/components/Dashboard/DashboardSkeleton";

export default function DashboardLoading() {
  return (
    <div className="flex-1 w-full space-y-4 p-8 pt-6">
      <DashboardSkeleton />
    </div>
  );
}
