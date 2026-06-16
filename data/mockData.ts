import { Store, Supplier, Product, InventoryRecord, PurchaseOrder, PurchaseOrderItem } from '../types';

export const mockStores: Store[] = [
  { id: 's1', name: 'Downtown Branch', location: '123 Main St', created_at: '2024-01-01' },
  { id: 's2', name: 'Westside Branch', location: '456 West Ave', created_at: '2024-01-02' },
];

export const mockSuppliers: Supplier[] = [
  { id: 'sup1', name: 'Fresh Farm Produce', phone: '555-0101', notes: 'Best for vegetables', created_at: '2024-01-01' },
  { id: 'sup2', name: 'Meat Masters', phone: '555-0102', notes: 'Premium cuts', created_at: '2024-01-01' },
  { id: 'sup3', name: 'Ocean Catch', phone: '555-0103', notes: 'Daily seafood', created_at: '2024-01-01' },
  { id: 'sup4', name: 'Dry Goods Co.', phone: '555-0104', notes: 'Grains and spices', created_at: '2024-01-01' },
  { id: 'sup5', name: 'Beverage Plus', phone: '555-0105', notes: 'Drinks and juices', created_at: '2024-01-01' },
];

export const mockProducts: Product[] = [
  { id: 'p1', name: 'Organic Spinach', category: 'Vegetables', default_unit: 'box', supplier_id: 'sup1', created_at: '2024-01-01' },
  { id: 'p2', name: 'Roma Tomatoes', category: 'Vegetables', default_unit: 'box', supplier_id: 'sup1', created_at: '2024-01-01' },
  { id: 'p3', name: 'Chicken Breast', category: 'Meat', default_unit: 'lb', supplier_id: 'sup2', created_at: '2024-01-01' },
  { id: 'p4', name: 'Ground Beef', category: 'Meat', default_unit: 'lb', supplier_id: 'sup2', created_at: '2024-01-01' },
  { id: 'p5', name: 'Salmon Fillet', category: 'Seafood', default_unit: 'lb', supplier_id: 'sup3', created_at: '2024-01-01' },
  { id: 'p6', name: 'Basmati Rice', category: 'Dry Goods', default_unit: 'box', supplier_id: 'sup4', created_at: '2024-01-01' },
];

export const mockInventoryRecords: InventoryRecord[] = [
  { id: 'ir1', store_id: 's1', product_id: 'p1', quantity: 10, unit: 'box', record_type: 'initial_stock', created_at: '2024-05-20' },
  { id: 'ir2', store_id: 's1', product_id: 'p3', quantity: 50, unit: 'lb', record_type: 'purchase_received', created_at: '2024-05-21' },
  { id: 'ir3', store_id: 's2', product_id: 'p1', quantity: 5, unit: 'box', record_type: 'initial_stock', created_at: '2024-05-20' },
];

export const mockPurchaseOrders: PurchaseOrder[] = [
  { id: 'po1', store_id: 's1', supplier_id: 'sup1', order_date: '2024-05-22', status: 'pending', created_at: '2024-05-22' },
  { id: 'po2', store_id: 's1', supplier_id: 'sup2', order_date: '2024-05-23', status: 'completed', created_at: '2024-05-23' },
];

export const mockPurchaseOrderItems: PurchaseOrderItem[] = [
  { id: 'poi1', purchase_order_id: 'po1', product_id: 'p1', quantity: 5, unit: 'box' },
  { id: 'poi2', purchase_order_id: 'po1', product_id: 'p2', quantity: 3, unit: 'box' },
  { id: 'poi3', purchase_order_id: 'po2', product_id: 'p3', quantity: 20, unit: 'lb' },
  { id: 'poi4', purchase_order_id: 'po2', product_id: 'p4', quantity: 15, unit: 'lb' },
];
