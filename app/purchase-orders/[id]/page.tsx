'use client';

import { useParams, useRouter } from 'next/navigation';
import { 
  mockPurchaseOrders, 
  mockSuppliers, 
  mockStores, 
  mockPurchaseOrderItems,
  mockProducts 
} from '@/data/mockData';
import Button from '@/components/Button';
import Card from '@/components/Card';
import Table, { TableRow, TableCell } from '@/components/Table';
import { Printer, ArrowLeft, Download, ShoppingCart, Calendar, Store, Truck } from 'lucide-react';

export default function PurchaseOrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const orderId = params.id as string;

  const order = mockPurchaseOrders.find(o => o.id === orderId);
  
  if (!order) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <h2 className="text-2xl font-bold text-slate-800">Order not found</h2>
        <Button 
          variant="primary" 
          className="mt-4"
          onClick={() => router.push('/purchase-orders')}
        >
          Back to Orders
        </Button>
      </div>
    );
  }

  const store = mockStores.find(s => s.id === order.store_id);
  const supplier = mockSuppliers.find(s => s.id === order.supplier_id);
  const orderItems = mockPurchaseOrderItems.filter(item => item.purchase_order_id === order.id);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between no-print">
        <Button 
          variant="ghost" 
          onClick={() => router.back()}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Orders
        </Button>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="w-5 h-5" />
            Export PDF
          </Button>
          <Button variant="primary" onClick={handlePrint} className="flex items-center gap-2">
            <Printer className="w-5 h-5" />
            Print Order
          </Button>
        </div>
      </div>

      {/* Printable Area */}
      <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 print:shadow-none print:border-none print:p-0">
        {/* Header */}
        <div className="flex justify-between border-b border-slate-200 pb-8 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">PURCHASE ORDER</h1>
            <p className="text-slate-500 mt-1">Order #{order.id}</p>
          </div>
          <div className="text-right">
            <div className="bg-blue-600 text-white px-4 py-1 rounded text-sm font-bold uppercase tracking-widest inline-block mb-2">
              {order.status}
            </div>
            <div className="flex items-center justify-end text-slate-600">
              <Calendar className="w-4 h-4 mr-2" />
              <span className="font-medium">{order.order_date}</span>
            </div>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Store className="w-5 h-5 text-blue-600" />
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Ship To (Store)</h3>
            </div>
            <div className="bg-slate-50 p-4 rounded-lg">
              <p className="text-lg font-bold text-slate-900">{store?.name}</p>
              <p className="text-slate-600 mt-1">{store?.location}</p>
              <p className="text-slate-600">Phone: (Branch Main)</p>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Truck className="w-5 h-5 text-blue-600" />
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Vendor (Supplier)</h3>
            </div>
            <div className="bg-slate-50 p-4 rounded-lg">
              <p className="text-lg font-bold text-slate-900">{supplier?.name}</p>
              <p className="text-slate-600 mt-1">{supplier?.phone}</p>
              {supplier?.notes && <p className="text-slate-500 text-sm italic mt-2">{supplier.notes}</p>}
            </div>
          </div>
        </div>

        {/* Items Table */}
        <div className="mb-12">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-blue-600" />
            Order Items
          </h3>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-slate-900 text-white">
                <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">Item Name</th>
                <th className="px-6 py-4 text-center text-sm font-semibold uppercase tracking-wider">Quantity</th>
                <th className="px-6 py-4 text-center text-sm font-semibold uppercase tracking-wider">Unit</th>
                <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 border-x border-b border-slate-200">
              {orderItems.map((item) => {
                const product = mockProducts.find(p => p.id === item.product_id);
                return (
                  <tr key={item.id}>
                    <td className="px-6 py-4 text-slate-900 font-medium">{product?.name || 'Unknown'}</td>
                    <td className="px-6 py-4 text-center text-slate-900 font-bold">{item.quantity}</td>
                    <td className="px-6 py-4 text-center text-slate-600">{item.unit}</td>
                    <td className="px-6 py-4 text-slate-500 text-sm italic">{item.notes || '-'}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row justify-between gap-8">
          <div className="max-w-md">
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">Instructions / Notes</h4>
            <p className="text-slate-600 text-sm leading-relaxed">
              {order.notes || "Please deliver before 10:00 AM. Call store manager upon arrival for unloading instructions. Standard quality checks will be performed on delivery."}
            </p>
          </div>
          <div className="text-center md:text-right flex flex-col justify-end">
            <div className="border-t border-slate-300 w-64 inline-block mt-12 mb-2"></div>
            <p className="text-sm font-bold text-slate-900">Authorized Signature</p>
            <p className="text-xs text-slate-500">Resto Management HQ</p>
          </div>
        </div>
      </div>
    </div>
  );
}
