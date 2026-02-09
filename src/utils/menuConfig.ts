import type React from "react";
import Account from "../pages/Account";
import Bookings from "../pages/Bookings";
import Cabins from "../pages/Cabins";
import Checkin from "../pages/Checkin";
import Dashboard from "../pages/Dashboard";
import Settings from "../pages/Settings";
import Users from "../pages/Users";
type MenuConfig = {
    name: string;
    path: string;
    component: React.FC;
    icon?: React.ReactNode;
    label?: string;
};
const menuConfig: MenuConfig[] = [
    { name: 'dashboard', path: '/dashboard', component: Dashboard },
    { name: 'bookings', path: '/bookings', component: Bookings, },
    { name: 'checkin', path: '/checkin/:bookingId', component: Checkin },
    { name: 'cabins', path: '/cabins', component: Cabins, },
    { name: 'account', path: '/account', component: Account, },
    { name: 'settings', path: '/settings', component: Settings, },
    { name: 'users', path: '/users', component: Users, },
]
export default menuConfig