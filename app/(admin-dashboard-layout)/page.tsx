"use client";
import { useDashboardOverview, useUserInsights, useDashboardUsers } from "@/apis/hooks/useDashboard";
import { XAxis, YAxis, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";

interface StatCardProps {
  title: string;
  value: string | number;
  valueColor: string;
}

function StatCard({ title, value, valueColor }: StatCardProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm flex-1">
      <p className="text-lg font-semibold mb-1">{title}</p>
      <p className={`text-2xl font-semibold ${valueColor}`}>{value}</p>
    </div>
  );
}

export default function DashboardHomePage() {
  const { data: overview, isLoading: overviewLoading } = useDashboardOverview();
  const { data: insights, isLoading: insightsLoading } = useUserInsights();
  const { data: usersData, isLoading: usersLoading } = useDashboardUsers();

  // Shape chart data from API response
  const chartData =
    insights?.labels.map((label, i) => ({
      month: label,
      value: insights.values[i],
    })) ?? [];

    // Single loading gate
  if (overviewLoading || insightsLoading || usersLoading) {
    return (
      <div className="min-h-screen bg-[#faf8f5] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-[#7aaa8a] border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf8f5] p-6 font-sans">
      {/* Stat Cards */}
      <div className="flex gap-4 mb-4">
        <StatCard
          title="Total Users"
          value={overviewLoading ? "..." : (overview?.total_users ?? 0)}
          valueColor="text-[#e8a838]"
        />
        <StatCard
          title="Active Subscriptions"
          value={overviewLoading ? "..." : (overview?.active_subscriptions ?? 0)}
          valueColor="text-[#5bbf8a]"
        />
        <StatCard
          title="Analyses This Month"
          value={overviewLoading ? "..." : (overview?.analysis_this_month ?? 0)}
          valueColor="text-[#3a7bd5]"
        />
        <StatCard
          title="Influencer Accounts"
          value={overviewLoading ? "..." : (overview?.influencer_accounts ?? 0)}
          valueColor="text-[#e8a838]"
        />
      </div>

      {/* Bottom Section */}
      <div className="flex gap-4">
        {/* User Table */}
        <div className="bg-white rounded-2xl shadow-sm flex-1 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left px-6 py-4 text-md font-semibold text-gray-700">User</th>
                <th className="text-left px-6 py-4 text-md font-semibold text-gray-700">Plan</th>
                <th className="text-left px-6 py-4 text-md font-semibold text-gray-700">Joined</th>
                <th className="text-left px-6 py-4 text-md font-semibold text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {usersLoading ? (
                <tr>
                  <td colSpan={4} className="px-6 py-4 text-center text-gray-400">
                    Loading...
                  </td>
                </tr>
              ) : (
                usersData?.results.map((user) => (
                  <tr key={user.id} className="border-b border-gray-50 last:border-0">
                    <td className="px-6 py-4 text-gray-600">{user.email}</td>
                    <td className="px-6 py-4 text-gray-600">{user.plan}</td>
                    <td className="px-6 py-4 text-gray-600">{user.created_at}</td>
                    <td className="px-6 py-4">
                      <span className="bg-[#74C69D] text-white text-xs px-3 py-1 rounded-full">
                        {user.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Chart */}
        <div className="bg-white rounded-2xl shadow-sm flex-1 p-6">
          <p className="text-md font-semibold text-gray-700 mb-4">Overall user activity</p>
          {insightsLoading ? (
            <div className="flex items-center justify-center h-55 text-gray-400">Loading...</div>
          ) : (
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={chartData} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="activityGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#c8d8c0" stopOpacity={0.5} />
                    <stop offset="95%" stopColor="#c8d8c0" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#9ca3af" }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#9ca3af" }} />
                <Tooltip
                  contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 2px 8px rgba(0,0,0,0.1)", fontSize: 12 }}
                  formatter={(val: unknown) => [typeof val === "number" ? val.toLocaleString() : String(val ?? ""), "Users"]}
                />
                <Area type="monotone" dataKey="value" stroke="#7aaa8a" strokeWidth={1.5} fill="url(#activityGradient)" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
}