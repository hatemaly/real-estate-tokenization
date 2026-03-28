import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

export default function InvestorLayout() {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar role="investor" />
      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
