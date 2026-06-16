'use client';

import { mockStores } from '@/data/mockData';
import PageHeader from '@/components/PageHeader';
import Button from '@/components/Button';
import Table, { TableRow, TableCell } from '@/components/Table';
import { Plus, Edit2, Trash2, MapPin, Calendar } from 'lucide-react';

export default function StoresPage() {
  return (
    <div className="space-y-6">
      <PageHeader 
        title="Stores" 
        description="Manage your restaurant branch locations."
        action={
          <Button size="lg" className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Add Store
          </Button>
        }
      />

      <Table headers={['Store Name', 'Location', 'Created At', 'Actions']}>
        {mockStores.map((store) => (
          <TableRow key={store.id}>
            <TableCell className="font-semibold text-slate-900">{store.name}</TableCell>
            <TableCell>
              <div className="flex items-center text-slate-600">
                <MapPin className="w-4 h-4 mr-2" />
                {store.location}
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center text-slate-500">
                <Calendar className="w-4 h-4 mr-2" />
                {store.created_at}
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
