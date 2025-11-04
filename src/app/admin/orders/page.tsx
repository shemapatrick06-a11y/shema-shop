'use client';

import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collectionGroup, query, orderBy } from 'firebase/firestore';
import type { Order } from '@/lib/types';
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
import { Badge } from '@/components/ui/badge';
import { Loader2 } from 'lucide-react';

export default function OrdersPage() {
  const firestore = useFirestore();

  const ordersQuery = useMemoFirebase(
    () => (firestore ? query(collectionGroup(firestore, 'orders'), orderBy('orderDate', 'desc')) : null),
    [firestore]
  );
  
  const { data: orders, isLoading } = useCollection<Order>(ordersQuery);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Orders</CardTitle>
        <CardDescription>A list of all orders from your customers.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center h-24">
                  <div className="flex justify-center items-center">
                    <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                    <span>Loading orders...</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : orders && orders.length > 0 ? (
              orders.map(order => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id.substring(0, 7)}...</TableCell>
                  <TableCell>{order.customerId.substring(0, 7)}...</TableCell>
                  <TableCell>{new Date(order.orderDate).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={order.orderStatus === 'delivered' ? 'default' : 'secondary'}
                      className={order.orderStatus === 'pending' ? 'bg-yellow-500/20 text-yellow-700' : 
                                 order.orderStatus === 'shipped' ? 'bg-blue-500/20 text-blue-700' : ''}
                    >
                      {order.orderStatus}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">${order.totalAmount.toFixed(2)}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center h-24">
                  No orders found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
