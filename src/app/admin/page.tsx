
'use client';

import {
  Activity,
  ArrowUpRight,
  CircleUser,
  CreditCard,
  DollarSign,
  Menu,
  Package2,
  Search,
  Users,
} from 'lucide-react';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts';

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collectionGroup, query, orderBy, limit, Firestore } from 'firebase/firestore';
import type { Order } from '@/lib/types';
import { useMemo, useState, useEffect } from 'react';

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'hsl(var(--chart-1))',
  },
  mobile: {
    label: 'Mobile',
    color: 'hsl(var(--chart-2))',
  },
};

export default function AdminDashboard() {
  const firestore = useFirestore();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const ordersQuery = useMemoFirebase(
    () => firestore ? query(collectionGroup(firestore, 'orders'), orderBy('orderDate', 'desc')) : null,
    [firestore]
  );
  
  const recentOrdersQuery = useMemoFirebase(
    () => firestore ? query(collectionGroup(firestore, 'orders'), orderBy('orderDate', 'desc'), limit(5)) : null,
    [firestore]
  );

  const { data: orders, isLoading: isLoadingOrders } = useCollection<Order>(ordersQuery);
  const { data: recentOrders, isLoading: isLoadingRecentOrders } = useCollection<Order>(recentOrdersQuery);

  const { totalRevenue, totalSales, salesData } = useMemo(() => {
    if (!orders) {
      return { totalRevenue: 0, totalSales: 0, salesData: [] };
    }

    const totalRevenue = orders.reduce((acc, order) => acc + order.totalAmount, 0);
    const totalSales = orders.length;

    const salesByMonth: { [key: string]: number } = {};
    orders.forEach(order => {
      const month = new Date(order.orderDate).toLocaleString('default', { month: 'long' });
      salesByMonth[month] = (salesByMonth[month] || 0) + order.totalAmount;
    });
    
    const salesData = Object.entries(salesByMonth).map(([month, revenue]) => ({
      month,
      revenue
    })).reverse();


    return { totalRevenue, totalSales, salesData };
  }, [orders]);


  return (
      <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
          <Card className="sm:col-span-2">
            <CardHeader className="pb-3">
              <CardTitle>Revenue</CardTitle>
              <CardDescription className="max-w-lg text-balance leading-relaxed">
                Introducing Our Dynamic Orders Dashboard for Seamless
                Management and Insightful Analysis.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalRevenue.toFixed(2)}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Sales</CardDescription>
              <CardTitle className="text-4xl">{totalSales}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground">
                Total sales across all time.
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Earnings</CardDescription>
              <CardTitle className="text-4xl">${totalRevenue.toFixed(2)}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground">
                Total earnings from all sales.
              </div>
            </CardContent>
          </Card>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Sales Overview</CardTitle>
            <CardDescription>
              A chart showing the sales overview for the last months.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
              <LineChart data={salesData}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="month" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} />
                <Tooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="line" />}
                />
                <Line
                  dataKey="revenue"
                  type="monotone"
                  stroke="var(--color-desktop)"
                  strokeWidth={2}
                  dot={true}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Product Performance</CardTitle>
              <CardDescription>
                Top performing products by sales. (Feature coming soon)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead className="text-right">Sales</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell colSpan={2} className="text-center h-24">
                      Product performance data is not yet available.
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>
                A list of recent transactions from your store.
              </CardDescription>
            </CardHeader>
            <CardContent>
            <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoadingRecentOrders ? (
                    <TableRow>
                      <TableCell colSpan={2} className="text-center h-24">
                        Loading recent transactions...
                      </TableCell>
                    </TableRow>
                  ) : recentOrders && recentOrders.length > 0 ? (
                    recentOrders.map(order => (
                       <TableRow key={order.id}>
                        <TableCell>
                          <div className="font-medium">{order.customerId.substring(0, 12)}...</div>
                          <div className="text-sm text-muted-foreground">{new Date(order.orderDate).toLocaleDateString()}</div>
                        </TableCell>
                        <TableCell className="text-right">${order.totalAmount.toFixed(2)}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={2} className="text-center h-24">No transactions yet.</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
  );
}
