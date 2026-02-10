import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { menuConfig } from "../utils/generateRoute";
import { getUserMenus } from "../services/apiMenu";
import useUser from "../features/authentication/useUser";
import { useQuery } from "@tanstack/react-query";
import Spinner from "./Spinner";
const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 1.2rem;

    color: var(--color-grey-600);
    font-size: 1.6rem;
    font-weight: 500;
    padding: 1.2rem 2.4rem;
    transition: all 0.3s;
  }

  /* This works because react-router places the active class on the active NavLink */
  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-grey-800);
    background-color: var(--color-grey-50);
    border-radius: var(--border-radius-sm);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: var(--color-brand-600);
  }
`;


function MainNav() {
  const { user, isLoading: isLoadingUser } = useUser();

  // 先等待用户加载完成
  if (isLoadingUser || !user) return <Spinner />;

  // 只有 user.id 存在时才触发查询
  const { data: menus, isLoading: isLoadingMenus } = useQuery({
    queryKey: ['menus', user.id], // user.id 变化时刷新
    queryFn: () => getUserMenus(user.id),
    enabled: !!user.id
  });

  if (isLoadingMenus) return <Spinner />;

  const menuList = menus
    ?.map((menu) => {
      const config = menuConfig.find((config) => config.name === menu.name);
      if (!config) return null;
      // 使用菜单配置中的 path，如果数据库中有自定义 path 则使用数据库的
      const path = menu.path || config.path;
      return {
        path,
        icon: config.icon,
        label: config.label || menu.label,
      };
    })
    .filter((item): item is { path: string; icon: React.ReactNode; label: string } => item !== null) ?? [];

  return (
    <nav>
      <NavList>
        {menuList.map((item) => (
          <li key={item.path}>
            <StyledNavLink to={item.path}>
              {item.icon}
              <span>{item.label}</span>
            </StyledNavLink>
          </li>
        ))}
      </NavList>
    </nav>
  );
}


export default MainNav;
