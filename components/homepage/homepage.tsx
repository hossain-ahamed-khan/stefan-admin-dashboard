"use client";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";

const activityData = [
  { month: "Jan", value: 14000 },
  { month: "Feb", value: 9000 },
  { month: "Mar", value: 13000 },
  { month: "Apr", value: 21000 },
  { month: "May", value: 29000 },
  { month: "Jun", value: 22000 },
  { month: "Jul", value: 24000 },
];

const users = [
  { email: "jessica.martinez@gmail.com", plan: "Premium", joined: "Today", status: "Active" },
  { email: "jessica.martinez@gmail.com", plan: "Premium", joined: "Today", status: "Active" },
  { email: "jessica.martinez@gmail.com", plan: "Premium", joined: "Today", status: "Active" },
  { email: "jessica.martinez@gmail.com", plan: "Premium", joined: "Today", status: "Active" },
  { email: "jessica.martinez@gmail.com", plan: "Premium", joined: "Today", status: "Active" },
];

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  valueColor: string;
}

function StatCard({ title, value, change, valueColor }: StatCardProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm flex-1">
      <p className="text-lg font-semibold mb-1">{title}</p>
      <p className={`text-2xl font-semibold ${valueColor}`}>{value}</p>
      <p className="text-xs text-gray-400 mt-1">{change}</p>
    </div>
  );
}

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#faf8f5] p-6 font-sans">
      {/* Stat Cards */}
      <div className="flex gap-4 mb-4">
        <StatCard
          title="Total Users"
          value="1000"
          change="+47 this week"
          valueColor="text-[#e8a838]"
        />
        <StatCard
          title="Active Subscriptions"
          value="386"
          change="+12 this week"
          valueColor="text-[#5bbf8a]"
        />
        <StatCard
          title="Analyses This Month"
          value="8,291"
          change="+1,240 this week"
          valueColor="text-[#3a7bd5]"
        />
        <StatCard
          title="Influencer Accounts"
          value="10"
          change="+2 this week"
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
              {users.map((user, i) => (
                <tr key={i} className="border-b border-gray-50 last:border-0">
                  <td className="px-6 py-4 text-gray-600">{user.email}</td>
                  <td className="px-6 py-4 text-gray-600">{user.plan}</td>
                  <td className="px-6 py-4 text-gray-600">{user.joined}</td>
                  <td className="px-6 py-4">
                    <span className="bg-[#74C69D] text-white text-xs px-3 py-1 rounded-full">
                      {user.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Chart */}
        <div className="bg-white rounded-2xl shadow-sm flex-1 p-6">
          <p className="text-md font-semibold text-gray-700 mb-4">Overall user activity</p>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={activityData} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="activityGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#c8d8c0" stopOpacity={0.5} />
                  <stop offset="95%" stopColor="#c8d8c0" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: "#9ca3af" }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: "#9ca3af" }}
                tickFormatter={(v) => (v === 0 ? "0" : `${v / 1000}0K`)}
                domain={[0, 30000]}
                ticks={[0, 10000, 20000, 30000]}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: "8px",
                  border: "none",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  fontSize: 12,
                }}
                formatter={(val: unknown) => [typeof val === "number" ? val.toLocaleString() : String(val ?? ""), "Users"]}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#7aaa8a"
                strokeWidth={1.5}
                fill="url(#activityGradient)"
                dot={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}