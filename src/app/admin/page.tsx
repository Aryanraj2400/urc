import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Scissors, Tag, Users, ShoppingBag } from "lucide-react";

const stats = [
    { title: "Total Services", value: "11", icon: Scissors, color: "text-blue-500" },
    { title: "Active Discounts", value: "3", icon: Tag, color: "text-green-500" },
    { title: "Total Users", value: "150", icon: Users, color: "text-purple-500" },
    { title: "Bookings", value: "45", icon: ShoppingBag, color: "text-orange-500" },
];

export default function AdminDashboard() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
                <p className="text-muted-foreground">Welcome back to your administration portal.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => (
                    <Card key={stat.title} className="border-none shadow-md bg-card/40 backdrop-blur-sm hover:shadow-lg transition-shadow">
                        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                            <stat.icon className={`w-4 h-4 ${stat.color}`} />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stat.value}</div>
                            <p className="text-xs text-muted-foreground">+2 since last week</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4 border-none shadow-md bg-card/40 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                        <ShoppingBag className="w-5 h-5 text-primary" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium">New booking for Deep Clean</p>
                                        <p className="text-xs text-muted-foreground">2 hours ago</p>
                                    </div>
                                    <div className="text-sm font-semibold text-primary">₹899</div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card className="col-span-3 border-none shadow-md bg-card/40 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle>System Status</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">Database</span>
                                <span className="text-xs px-2 py-1 bg-green-500/10 text-green-500 rounded-full font-bold">Healthy</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">API Server</span>
                                <span className="text-xs px-2 py-1 bg-green-500/10 text-green-500 rounded-full font-bold">Online</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">Cloud Storage</span>
                                <span className="text-xs px-2 py-1 bg-green-500/10 text-green-500 rounded-full font-bold">Active</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
