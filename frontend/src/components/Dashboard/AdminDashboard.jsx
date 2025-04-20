// "use client"

// import { useState, useEffect } from "react"
// import {
//   BarChart,
//   Bell,
//   Calendar,
//   CreditCard,
//   FileText,
//   Home,
//   LogOut,
//   Menu,
//   MessageSquare,
//   Moon,
//   Search,
//   Settings,
//   Sun,
//   User,
//   Users,
//   X,
// } from "lucide-react"
// import { useTheme } from "next-themes"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
// import { Input } from "@/components/ui/input"
// import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
// import {
//   AreaChart,
//   Area,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip as RechartsTooltip,
//   ResponsiveContainer,
//   PieChart as RechartsPieChart,
//   Pie,
//   Cell,
//   Legend,
//   BarChart as RechartsBarChart,
//   Bar,
// } from "recharts"
// // import DashboardStats from "./dashboard/dashboard-stats"
// // import RecentActivities from "./dashboard/recent-activities"
// // import UpcomingEvents from "./dashboard/upcoming-events"
// // import FeeReminders from "./dashboard/fee-reminders"
// // import QuickActions from "./dashboard/quick-actions"

// export default function AdminDashboard() {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true)
//   const [mounted, setMounted] = useState(false)
//   const { theme, setTheme } = useTheme()

//   // Ensure theme toggle only renders client-side
//   useEffect(() => {
//     setMounted(true)
//   }, [])

//   // Mock data for charts and statistics
//   const revenueData = [
//     { name: "Jan", revenue: 4000, students: 120 },
//     { name: "Feb", revenue: 3000, students: 115 },
//     { name: "Mar", revenue: 5000, students: 130 },
//     { name: "Apr", revenue: 4500, students: 135 },
//     { name: "May", revenue: 6000, students: 150 },
//     { name: "Jun", revenue: 5500, students: 145 },
//   ]

//   const attendanceData = [
//     { name: "Present", value: 85 },
//     { name: "Absent", value: 10 },
//     { name: "Leave", value: 5 },
//   ]

//   const performanceData = [
//     { name: "Math", score: 85 },
//     { name: "Science", score: 78 },
//     { name: "English", score: 92 },
//     { name: "History", score: 68 },
//     { name: "Physics", score: 76 },
//   ]

//   const COLORS = ["#4ade80", "#f87171", "#facc15"]

//   return (
//     <div className="flex h-screen bg-background">
//       {/* Sidebar for larger screens */}
     

//       {/* Main content */}
//       <main className={`flex-1 overflow-auto transition-all duration-300 ${isSidebarOpen ? "md:ml-64" : "md:ml-20"}`}>
//         {/* Header */}
        

//         {/* Dashboard content */}
//         <div className="grid gap-4 p-4 md:p-6">
//           <DashboardStats />

//           <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
//             <Card className="lg:col-span-4">
//               <CardHeader>
//                 <CardTitle>Revenue Overview</CardTitle>
//                 <CardDescription>Monthly revenue for the current year</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <div className="h-[300px]">
//                   <ResponsiveContainer width="100%" height="100%">
//                     <AreaChart
//                       data={revenueData}
//                       margin={{
//                         top: 10,
//                         right: 30,
//                         left: 0,
//                         bottom: 0,
//                       }}
//                     >
//                       <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
//                       <XAxis dataKey="name" />
//                       <YAxis />
//                       <RechartsTooltip
//                         contentStyle={{
//                           backgroundColor: "var(--background)",
//                           borderColor: "var(--border)",
//                           borderRadius: "6px",
//                           boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
//                         }}
//                       />
//                       <Area
//                         type="monotone"
//                         dataKey="revenue"
//                         stroke="var(--primary)"
//                         fill="var(--primary)"
//                         fillOpacity={0.2}
//                         activeDot={{ r: 6 }}
//                       />
//                       <Area
//                         type="monotone"
//                         dataKey="students"
//                         stroke="var(--secondary)"
//                         fill="var(--secondary)"
//                         fillOpacity={0.2}
//                         activeDot={{ r: 6 }}
//                       />
//                     </AreaChart>
//                   </ResponsiveContainer>
//                 </div>
//               </CardContent>
//             </Card>
//             <Card className="lg:col-span-3">
//               <CardHeader>
//                 <CardTitle>Attendance Overview</CardTitle>
//                 <CardDescription>Current month attendance statistics</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <div className="h-[300px]">
//                   <ResponsiveContainer width="100%" height="100%">
//                     <RechartsPieChart>
//                       <Pie
//                         data={attendanceData}
//                         cx="50%"
//                         cy="50%"
//                         labelLine={false}
//                         outerRadius={80}
//                         fill="#8884d8"
//                         dataKey="value"
//                         label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
//                       >
//                         {attendanceData.map((entry, index) => (
//                           <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                         ))}
//                       </Pie>
//                       <Legend />
//                       <RechartsTooltip
//                         contentStyle={{
//                           backgroundColor: "var(--background)",
//                           borderColor: "var(--border)",
//                           borderRadius: "6px",
//                           boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
//                         }}
//                       />
//                     </RechartsPieChart>
//                   </ResponsiveContainer>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>

//           <Card>
//             <CardHeader>
//               <CardTitle>Subject Performance</CardTitle>
//               <CardDescription>Average scores across different subjects</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="h-[300px]">
//                 <ResponsiveContainer width="100%" height="100%">
//                   <RechartsBarChart
//                     data={performanceData}
//                     margin={{
//                       top: 20,
//                       right: 30,
//                       left: 20,
//                       bottom: 5,
//                     }}
//                   >
//                     <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
//                     <XAxis dataKey="name" />
//                     <YAxis />
//                     <RechartsTooltip
//                       contentStyle={{
//                         backgroundColor: "var(--background)",
//                         borderColor: "var(--border)",
//                         borderRadius: "6px",
//                         boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
//                       }}
//                     />
//                     <Bar dataKey="score" fill="var(--primary)" radius={[4, 4, 0, 0]} />
//                   </RechartsBarChart>
//                 </ResponsiveContainer>
//               </div>
//             </CardContent>
//           </Card>

//           <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
//             <RecentActivities />
//             <UpcomingEvents />
//             <FeeReminders />
//           </div>

//           <QuickActions />
//         </div>
//       </main>
//     </div>
//   )
// }
import React from 'react'

const AdminDashboard = () => {
  return (
    <div>
      
    </div>
  )
}

export default AdminDashboard

