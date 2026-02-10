import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { menuConfig } from "../utils/generateRoute";
import { getUserMenus } from "../services/apiMenu";
import useUser from "../features/authentication/useUser";
import { useQuery } from "@tanstack/react-query";
import Spinner from "./Spinner";
import { buildMenuTree } from "../utils/buildMenuTree";
import { renderMenuTree } from "../utils/renderMenuTree";
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

  const menuTree = buildMenuTree(menus ?? [])
  const sidebarMenu = renderMenuTree(menuTree)

  return (
    <nav>
      <NavList>
        {sidebarMenu.map((item: any) => (
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
