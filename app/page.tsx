import { 
  mockProducts, 
  mockSuppliers, 
  mockPurchaseOrders, 
  mockInventoryRecords,
  mockStores
} from '@/data/mockData';
import Card from '@/components/Card';
import PageHeader from '@/components/PageHeader';
import Table, { TableRow, TableCell } from '@/components/Table';
import { Package, Truck, ShoppingCart, ClipboardList } from 'lucide-react';

export default function Dashboard() {
  const stats = [
    { name: 'Total Products', value: mockProducts.length, icon: Package, color: 'text-blue-600', bg: 'bg-blue-50' },
    { name: 'Total Suppliers', value: mockSuppliers.length, icon: Truck, color: 'text-purple-600', bg: 'bg-purple-50' },
    { name: 'Active Orders', value: mockPurchaseOrders.filter(o => o.status === 'pending').length, icon: ShoppingCart, color: 'text-amber-600', bg: 'bg-amber-50' },
    { name: 'Recent Records', value: mockInventoryRecords.length, icon: ClipboardList, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  ];

  return (
    <div className="space-y-8">
      <PageHeader 
        title="Dashboard" 
        description="Overview of your restaurant operations across all branches." 
      />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center space-x-4">
            <div className={`p-3 rounded-lg ${stat.bg}`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">{stat.name}</p>
              <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Purchase Orders */}
        <Card title="Recent Purchase Orders">
          <Table headers={['Order ID', 'Supplier', 'Status', 'Date']}>
            {mockPurchaseOrders.slice(0, 5).map((order) => {
              const supplier = mockSuppliers.find(s => s.id === order.supplier_id);
              return (
                <TableRow key={order.id}>
                  <TableCell className="font-medium text-blue-600">#{order.id}</TableCell>
                  <TableCell>{supplier?.name || 'Unknown'}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      order.status === 'completed' ? 'bg-emerald-100 text-emerald-700' : 
                      order.status === 'pending' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {order.status.toUpperCase()}
                    </span>
                  </TableCell>
                  <TableCell>{order.order_date}</TableCell>
                </TableRow>
              );
            })}
          </Table>
        </Card>

        {/* Recent Inventory Records */}
        <Card title="Recent Inventory Activity">
          <Table headers={['Store', 'Product', 'Qty', 'Type']}>
            {mockInventoryRecords.slice(0, 5).map((record) => {
              const store = mockStores.find(s => s.id === record.store_id);
              const product = mockProducts.find(p => p.id === record.product_id);
              return (
                <TableRow key={record.id}>
                  <TableCell>{store?.name || 'Unknown'}</TableCell>
                  <TableCell>{product?.name || 'Unknown'}</TableCell>
                  <TableCell>{record.quantity} {record.unit}</TableCell>
                  <TableCell>
                    <span className="text-slate-500 text-xs italic">
                      {record.record_type.replace('_', ' ')}
                    </span>
                  </TableCell>
                </TableRow>
              );
            })}
          </Table>
        </Card>
      </div>
    </div>
  );
}
