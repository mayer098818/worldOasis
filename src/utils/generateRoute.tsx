import { Navigate, type RouteObject } from 'react-router-dom';
import AppLayout from '../ui/AppLayout';
import Signup from '../features/authentication/Signup';
import PageNotFound from '../pages/PageNotFound';
import Login from "../pages/Login";
import { lazy } from 'react';
import { House, BookOpen, Settings, UsersRound, Building } from 'lucide-react';
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
    hidden?: boolean;
};

// 在 sidebar 显示的菜单配置
export const menuConfig: MenuConfig[] = [
    { name: 'dashboard', path: '/dashboard', label: 'Dashboard', icon: <House size={12} />, component: lazy(() => import('../pages/Dashboard')) },
    { name: 'bookings', path: '/bookings', label: 'Bookings', icon: <BookOpen size={12} />, component: lazy(() => import('../pages/Bookings')) },
    { name: 'cabins', path: '/cabins', label: 'Cabins', icon: <Building size={12} />, component: lazy(() => import('../pages/Cabins')), },
    { name: 'settings', path: '/settings', label: 'Settings', icon: <Settings size={12} />, component: lazy(() => import('../pages/Settings')), },
    { name: 'users', path: '/users', label: 'Users', icon: <UsersRound size={12} />, component: lazy(() => import('../pages/Users')), },
    { name: 'booking_detail', path: '/bookings/:bookingId', hidden: true, component: lazy(() => import('../features/bookings/BookingDetail')) },
    { name: 'checkin', path: '/checkin/:bookingId', hidden: true, component: lazy(() => import('../pages/Checkin')) },
    { name: 'account', path: '/account', hidden: true, component: lazy(() => import('../pages/Account')) },
];

export default function generateRoute(menus: MenuItem[]): RouteObject[] {
    const menuRoutes: RouteObject[] = menus
        .map(menu => {
            const configs = menuConfig.filter(config => config.name === menu.name);
            return configs.map(config => {
                const Component = config.component;
                const path = config.path;
                return { path, element: <Component /> } as RouteObject;
            })
        })
        .flat()
    return [
        {
            path: '/',
            element: <AppLayout />,
            errorElement: <ErrorFallback />,
            loader: authLoader,
            children: [
                { index: true, element: <Navigate replace to="dashboard" /> },
                ...menuRoutes

            ]
        },
        // 静态路由（未登录用户可访问）
        { path: 'login', element: <Login /> },
        { path: 'signup', element: <Signup /> },
        { path: '*', element: <PageNotFound /> }
    ];
}
