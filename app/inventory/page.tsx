'use client';

import { useState } from 'react';
import { mockStores, mockProducts, mockInventoryRecords } from '@/data/mockData';
import PageHeader from '@/components/PageHeader';
import Button from '@/components/Button';
import Card from '@/components/Card';
import Table, { TableRow, TableCell } from '@/components/Table';
import { Plus, Filter, ClipboardList } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function InventoryPage() {
  const [selectedStoreId, setSelectedStoreId] = useState(mockStores[0].id);

  const selectedStore = mockStores.find(s => s.id === selectedStoreId);
  
  // For the prototype, we'll calculate current stock based on mock records
  // In a real app, this would be a more complex query
  const inventoryData = mockProducts.map(product => {
    const records = mockInventoryRecords.filter(
      r => r.store_id === selectedStoreId && r.product_id === product.id
    );
    const totalQuantity = records.reduce((sum, r) => sum + r.quantity, 0);
    return {
      ...product,
      current_quantity: totalQuantity,
      last_updated: records.length > 0 ? records[records.length - 1].created_at : 'Never'
    };
  });

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Inventory Tracking" 
        description="Monitor current stock levels and record inventory adjustments."
        action={
          <Button size="lg" className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Add Record
          </Button>
        }
      />

      {/* Store Selector */}
      <Card className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-slate-700 mb-1">Select Store</label>
            <div className="relative">
              <select 
                className="w-full pl-4 pr-10 py-3 rounded-lg border border-slate-200 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                value={selectedStoreId}
                onChange={(e) => setSelectedStoreId(e.target.value)}
              >
                {mockStores.map(store => (
                  <option key={store.id} value={store.id}>{store.name} - {store.location}</option>
                ))}
              </select>
              <Filter className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
            </div>
          </div>
          <div className="flex items-end pb-1">
            <div className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg border border-blue-100 flex items-center">
              <ClipboardList className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium">Viewing inventory for: {selectedStore?.name}</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Inventory Table */}
      <Table headers={['Product', 'Category', 'Current Stock', 'Unit', 'Last Updated', 'Actions']}>
        {inventoryData.map((item) => (
          <TableRow key={item.id}>
            <TableCell className="font-semibold text-slate-900">{item.name}</TableCell>
            <TableCell>
              <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-xs font-medium">
                {item.category}
              </span>
            </TableCell>
            <TableCell>
              <span className={cn(
                "font-bold text-lg",
                item.current_quantity <= 5 ? "text-red-600" : "text-slate-900"
              )}>
                {item.current_quantity}
              </span>
            </TableCell>
            <TableCell>{item.default_unit}</TableCell>
            <TableCell className="text-slate-500">{item.last_updated}</TableCell>
            <TableCell>
              <Button variant="outline" size="sm">Adjust</Button>
            </TableCell>
          </TableRow>
        ))}
      </Table>
    </div>
  );
}
