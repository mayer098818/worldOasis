import { Navigate } from 'react-router-dom';
import ProtectedRoute from '../ui/ProtectedRoute';
import AppLayout from '../ui/AppLayout';
import Signup from '../features/authentication/Signup';
import PageNotFound from '../pages/PageNotFound';
import Login from "../pages/Login";
import { lazy } from 'react';
import { House, BookOpen, Settings, UsersRound, Check, Building } from 'lucide-react';
import Account from '../pages/Account';
import Checkin from '../pages/Checkin';
import authLoader from "./authLoader.ts";
import ErrorFallback from "../ui/ErrorFallback.tsx";

type MenuItem = {
    id: number;
    name: string;
    path: string;
};
type MenuConfig = {
    name: string;
    path: string;
    component: React.FC;
    icon?: React.ReactNode;
    label?: string;
};
export const menuConfig: MenuConfig[] = [
    { name: 'dashboard', path: '/dashboard', label: 'Dashboard', icon: <House size={12} />, component: lazy(() => import('../pages/Dashboard')) },
    { name: 'bookings', path: '/bookings', label: 'Bookings', icon: <BookOpen size={12} />, component: lazy(() => import('../pages/Bookings')) },
    { name: 'cabins', path: '/cabins', label: 'Cabins', icon: <Building size={12} />, component: lazy(() => import('../pages/Cabins')), },
    { name: 'settings', path: '/settings', label: 'Settings', icon: <Settings size={12} />, component: lazy(() => import('../pages/Settings')), },
    { name: 'users', path: '/users', label: 'Users', icon: <UsersRound size={12} />, component: lazy(() => import('../pages/Users')), },
]
export default function generateRoute(menus: MenuItem[]) {
    return [
        {
            path: '/',
            element: <AppLayout/>,
            errorElement: <ErrorFallback/>,
            loader:authLoader,
            children: [
                { index: true, element: <Navigate replace to="dashboard" /> },
                // 动态生成菜单路由
                ...menus.map(menu => {
                    const config = menuConfig.find(config => config.name === menu.name);
                    if (!config) return null;
                    const Component = config.component;
                    const path = config.path;
                    return { path, element: <Component /> };
                }).filter(Boolean), // 过滤掉 null
                { path: 'account', element: <Account /> },
                { path: 'checkin/:bookingId', element: <Checkin /> }
            ]
        },
        // 静态路由
        { path: 'login', element: <Login /> },
        { path: 'signup', element: <Signup /> },
        { path: '*', element: <PageNotFound /> }
    ];
}
