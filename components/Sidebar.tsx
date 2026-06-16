'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Package, 
  Truck, 
  Store, 
  ClipboardList, 
  ShoppingCart, 
  ChevronRight 
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Products', href: '/products', icon: Package },
  { name: 'Suppliers', href: '/suppliers', icon: Truck },
  { name: 'Stores', href: '/stores', icon: Store },
  { name: 'Inventory', href: '/inventory', icon: ClipboardList },
  { name: 'Purchase Orders', href: '/purchase-orders', icon: ShoppingCart },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col w-64 bg-slate-900 text-white h-screen fixed left-0 top-0 overflow-y-auto z-20">
      <div className="p-6">
        <h1 className="text-xl font-bold tracking-wider">RESTO MGMT</h1>
        <p className="text-xs text-slate-400 mt-1">Inventory & Purchasing</p>
      </div>
      
      <nav className="flex-1 px-4 py-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center justify-between px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-150 group",
                isActive 
                  ? "bg-blue-600 text-white" 
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              )}
            >
              <div className="flex items-center">
                <item.icon className={cn("w-5 h-5 mr-3", isActive ? "text-white" : "text-slate-400 group-hover:text-white")} />
                {item.name}
              </div>
              {isActive && <ChevronRight className="w-4 h-4" />}
            </Link>
          );
        })}
      </nav>
      
      <div className="p-4 border-t border-slate-800">
        <div className="flex items-center p-2">
          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-xs font-bold mr-3">
            AD
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">Admin User</p>
            <p className="text-xs text-slate-400 truncate">HQ Management</p>
          </div>
        </div>
      </div>
    </div>
  );
}
