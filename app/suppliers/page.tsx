'use client';

import { mockSuppliers } from '@/data/mockData';
import PageHeader from '@/components/PageHeader';
import Button from '@/components/Button';
import Table, { TableRow, TableCell } from '@/components/Table';
import { Plus, Edit2, Trash2, Phone, FileText } from 'lucide-react';

export default function SuppliersPage() {
  return (
    <div className="space-y-6">
      <PageHeader 
        title="Suppliers" 
        description="Manage the vendors you purchase products from."
        action={
          <Button size="lg" className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Add Supplier
          </Button>
        }
      />

      <Table headers={['Supplier Name', 'Contact Info', 'Notes', 'Actions']}>
        {mockSuppliers.map((supplier) => (
          <TableRow key={supplier.id}>
            <TableCell className="font-semibold text-slate-900">{supplier.name}</TableCell>
            <TableCell>
              <div className="flex items-center text-slate-600">
                <Phone className="w-4 h-4 mr-2" />
                {supplier.phone}
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center text-slate-500 max-w-xs truncate">
                <FileText className="w-4 h-4 mr-2 flex-shrink-0" />
                {supplier.notes || 'No notes'}
              </div>
            </TableCell>
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
        ))}
      </Table>
    </div>
  );
}
