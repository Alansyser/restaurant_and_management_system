'use client';

import { useState } from 'react';
import { mockProducts, mockSuppliers } from '@/data/mockData';
import PageHeader from '@/components/PageHeader';
import Button from '@/components/Button';
import Card from '@/components/Card';
import Table, { TableRow, TableCell } from '@/components/Table';
import { Plus, Edit2, Trash2, Search } from 'lucide-react';

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = mockProducts.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Products" 
        description="Manage your inventory items and their default suppliers."
        action={
          <Button size="lg" className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Add Product
          </Button>
        }
      />

      <Card className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input 
            type="text"
            placeholder="Search products or categories..."
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </Card>

      <Table headers={['Product Name', 'Category', 'Default Unit', 'Supplier', 'Actions']}>
        {filteredProducts.map((product) => {
          const supplier = mockSuppliers.find(s => s.id === product.supplier_id);
          return (
            <TableRow key={product.id}>
              <TableCell className="font-semibold text-slate-900">{product.name}</TableCell>
              <TableCell>
                <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-xs font-medium">
                  {product.category}
                </span>
              </TableCell>
              <TableCell>{product.default_unit}</TableCell>
              <TableCell>{supplier?.name || 'N/A'}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" className="text-slate-500 hover:text-blue-600">
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-slate-500 hover:text-red-600">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          );
        })}
      </Table>
    </div>
  );
}
