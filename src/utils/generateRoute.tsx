import { Navigate, type RouteObject } from 'react-router-dom';
import AppLayout from '../ui/AppLayout';
import Signup from '../features/authentication/Signup';
import PageNotFound from '../pages/PageNotFound';
import Login from "../pages/Login";
import { lazy } from 'react';
import { House, BookOpen, Settings, UsersRound, Building } from 'lucide-react';
import Account from '../pages/Account';
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

// 在 sidebar 显示的菜单配置
export const menuConfig: MenuConfig[] = [
    { name: 'dashboard', path: '/dashboard', label: 'Dashboard', icon: <House size={12} />, component: lazy(() => import('../pages/Dashboard')) },
    { name: 'bookings', path: '/bookings', label: 'Bookings', icon: <BookOpen size={12} />, component: lazy(() => import('../pages/Bookings')) },
    { name: 'cabins', path: '/cabins', label: 'Cabins', icon: <Building size={12} />, component: lazy(() => import('../pages/Cabins')), },
    { name: 'settings', path: '/settings', label: 'Settings', icon: <Settings size={12} />, component: lazy(() => import('../pages/Settings')), },
    { name: 'users', path: '/users', label: 'Users', icon: <UsersRound size={12} />, component: lazy(() => import('../pages/Users')), },
];

// 不在 sidebar 显示但需要权限控制的路由配置
// 这些路由会根据用户权限动态生成，但不会出现在导航菜单中
type HiddenRouteConfig = {
    name: string; // 用于匹配权限菜单名称
    path: string;
    component: React.FC;
};

const hiddenRouteConfig: HiddenRouteConfig[] = [
    { name: 'bookings', path: 'bookings/:bookingId', component: lazy(() => import('../features/bookings/BookingDetail')) },
    { name: 'bookings', path: 'checkin/:bookingId', component: lazy(() => import('../pages/Checkin')) },
];
export default function generateRoute(menus: MenuItem[]): RouteObject[] {
    // 获取用户有权限的菜单名称集合
    const userMenuNames = new Set(menus.map(menu => menu.name));

    // 动态生成菜单路由（在 sidebar 显示）
    const menuRoutes: RouteObject[] = menus
        .map(menu => {
            const config = menuConfig.find(config => config.name === menu.name);
            if (!config) return null;
            const Component = config.component;
            const path = config.path;
            return { path, element: <Component /> } as RouteObject;
        })
        .filter((route): route is RouteObject => route !== null);

    // 动态生成隐藏路由（不在 sidebar 显示，但需要权限控制）
    const hiddenRoutes: RouteObject[] = hiddenRouteConfig
        .filter(route => userMenuNames.has(route.name)) // 只有用户有对应权限时才添加路由
        .map(route => {
            const Component = route.component;
            return {
                path: route.path,
                element: <Component />
            } as RouteObject;
        });

    return [
        {
            path: '/',
            element: <AppLayout />,
            errorElement: <ErrorFallback />,
            loader: authLoader,
            children: [
                { index: true, element: <Navigate replace to="dashboard" /> },
                ...menuRoutes, // 在 sidebar 显示的菜单路由
                ...hiddenRoutes, // 不在 sidebar 显示但需要权限控制的路由
                // 以下路由不需要权限控制，所有已登录用户都可以访问
                { path: 'account', element: <Account /> },
            ]
        },
        // 静态路由（未登录用户可访问）
        { path: 'login', element: <Login /> },
        { path: 'signup', element: <Signup /> },
        { path: '*', element: <PageNotFound /> }
    ];
}
