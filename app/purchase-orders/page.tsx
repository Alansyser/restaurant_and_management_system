'use client';

import Link from 'next/link';
import { mockPurchaseOrders, mockSuppliers, mockStores, mockPurchaseOrderItems } from '@/data/mockData';
import PageHeader from '@/components/PageHeader';
import Button from '@/components/Button';
import Table, { TableRow, TableCell } from '@/components/Table';
import { Plus, Eye, ShoppingBag, ArrowRight } from 'lucide-react';

export default function PurchaseOrdersPage() {
  return (
    <div className="space-y-6">
      <PageHeader 
        title="Purchase Orders" 
        description="Create and track orders sent to your suppliers."
        action={
          <Button size="lg" className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Create New Order
          </Button>
        }
      />

      <Table headers={['Order ID', 'Store', 'Supplier', 'Date', 'Status', 'Items', 'Actions']}>
        {mockPurchaseOrders.map((order) => {
          const store = mockStores.find(s => s.id === order.store_id);
          const supplier = mockSuppliers.find(s => s.id === order.supplier_id);
          const itemsCount = mockPurchaseOrderItems.filter(item => item.purchase_order_id === order.id).length;

          return (
            <TableRow key={order.id}>
              <TableCell className="font-bold text-slate-900">#{order.id}</TableCell>
              <TableCell>{store?.name || 'N/A'}</TableCell>
              <TableCell>{supplier?.name || 'N/A'}</TableCell>
              <TableCell>{order.order_date}</TableCell>
              <TableCell>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  order.status === 'completed' ? 'bg-emerald-100 text-emerald-700' : 
                  order.status === 'pending' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-700'
                }`}>
                  {order.status.toUpperCase()}
                </span>
              </TableCell>
              <TableCell>
                <div className="flex items-center">
                  <ShoppingBag className="w-4 h-4 mr-2 text-slate-400" />
                  {itemsCount} items
                </div>
              </TableCell>
              <TableCell>
                <Link href={`/purchase-orders/${order.id}`}>
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    View Details
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </TableCell>
            </TableRow>
          );
        })}
      </Table>
    </div>
  );
}
