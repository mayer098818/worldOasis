import { createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import useClickOutside from "../hooks/useClickOutside";

const StyledMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul<{ position: { x: number; y: number } }>`
  position: fixed;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

type MenusContextType = {
  openId: string;
  open: (id: string) => void;
  close: () => void;
  position: { x: number; y: number } | null;
  setPosition: React.Dispatch<
    React.SetStateAction<{ x: number; y: number } | null>
  >;
};

export const MenusContext = createContext<MenusContextType | null>(null)
function Menus({ children }: { children: React.ReactNode }) {
  const [openId, setOpenId] = useState('')
  const [position, setPosition] = useState<{ x: number, y: number } | null>({ x: 20, y: 20 })
  const close = () => setOpenId('')
  const open = setOpenId
  return (
    <MenusContext.Provider value={{ openId, open, close, position, setPosition }}>
      <StyledMenu>{children}</StyledMenu>
    </MenusContext.Provider>
  )

}
function Toggle({ children, id }: { children: React.ReactNode, id: string }) {
  const { openId, open, close, setPosition } = useContext(MenusContext)!
  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    setPosition({
      x: window.innerWidth - rect.width - rect.x,
      y: rect.y + rect.height + 8,
    });
    openId === "" || openId !== id ? open(id) : close();
  }
  return <StyledToggle onClick={handleClick}>{children}</StyledToggle>
}
function List({ children, id }: { children: React.ReactNode, id: string }) {
  const { position, close, openId } = useMenus()
  const ref = useClickOutside<HTMLUListElement>(close)
  if (openId !== id || !position) return null;
  return createPortal(<StyledList ref={ref} position={position}>{children}</StyledList>, document.body)
}
function Button({ children, icon, onClick }: { children: React.ReactNode, icon?: React.ReactNode, onClick?: () => void }) {
  return (
    <li>
      <StyledButton onClick={onClick}>
        {icon && <>{icon}</>}
        <span>{children}</span>
      </StyledButton>
    </li>
  )

}
export function useMenus() {
  const context = useContext(MenusContext);
  if (!context) {
    // 如果不在 Menus 内，返回一个 no-op 对象，避免报错
    return {
      openId: '',
      close: () => { },
      open: () => { },
      position: null,
      setPosition: () => { },
    } as MenusContextType;
  }
  return context;
}
Menus.Toggle = Toggle
Menus.List = List
Menus.Button = Button
export default Menus