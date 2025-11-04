'use client';

import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collectionGroup, query, orderBy } from 'firebase/firestore';
import type { Order } from '@/lib/types';
import { useMemo } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';

const lineChartConfig = {
  revenue: {
    label: 'Revenue',
    color: 'hsl(var(--chart-1))',
  },
};

const barChartConfig = {
  sales: {
    label: 'Sales',
    color: 'hsl(var(--chart-2))',
  },
}

export default function AnalyticsPage() {
  const firestore = useFirestore();

  const ordersQuery = useMemoFirebase(
    () => (firestore ? query(collectionGroup(firestore, 'orders'), orderBy('orderDate', 'desc')) : null),
    [firestore]
  );
  
  const { data: orders } = useCollection<Order>(ordersQuery);

  const { monthlyRevenue, monthlySales } = useMemo(() => {
    if (!orders) {
      return { monthlyRevenue: [], monthlySales: [] };
    }

    const revenueByMonth: { [key: string]: number } = {};
    const salesByMonth: { [key: string]: number } = {};

    orders.forEach(order => {
      const date = new Date(order.orderDate);
      const month = date.toLocaleString('default', { month: 'short' });
      
      revenueByMonth[month] = (revenueByMonth[month] || 0) + order.totalAmount;
      salesByMonth[month] = (salesByMonth[month] || 0) + 1;
    });

    const monthOrder = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
    const sortedRevenue = monthOrder.map(month => ({
      month,
      revenue: revenueByMonth[month] || 0
    })).filter(d => d.revenue > 0);

    const sortedSales = monthOrder.map(month => ({
        month,
        sales: salesByMonth[month] || 0
    })).filter(d => d.sales > 0);

    return { monthlyRevenue: sortedRevenue, monthlySales: sortedSales };
  }, [orders]);

  return (
    <div className="grid gap-8">
        <Card>
            <CardHeader>
            <CardTitle>Revenue Over Time</CardTitle>
            <CardDescription>
                A line chart showing monthly revenue.
            </CardDescription>
            </CardHeader>
            <CardContent>
            <ChartContainer config={lineChartConfig} className="min-h-[300px] w-full">
                <LineChart data={monthlyRevenue}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="month" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                <Tooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="line" />}
                />
                <Line
                    dataKey="revenue"
                    type="monotone"
                    stroke="var(--color-revenue)"
                    strokeWidth={2}
                    dot={true}
                />
                </LineChart>
            </ChartContainer>
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
            <CardTitle>Sales Per Month</CardTitle>
            <CardDescription>
                A bar chart showing the number of sales each month.
            </CardDescription>
            </CardHeader>
            <CardContent>
            <ChartContainer config={barChartConfig} className="min-h-[300px] w-full">
                <BarChart data={monthlySales}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="month" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} />
                <Tooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="dot" />}
                />
                <Bar
                    dataKey="sales"
                    fill="var(--color-sales)"
                    radius={4}
                />
                </BarChart>
            </ChartContainer>
            </CardContent>
        </Card>
    </div>
  );
}
