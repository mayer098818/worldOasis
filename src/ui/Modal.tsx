import styled from "styled-components";
import { ArrowLeft } from 'lucide-react'
import { createPortal } from "react-dom";
// import { createContext } from "react-router-dom";
import React, { useContext, createContext, useState, cloneElement, isValidElement, useEffect, useRef } from "react";
import useClickOutside from "../hooks/useClickOutside";
const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`;
type ModalProps = {
  children: React.ReactNode
  onClose?: () => void
}
type ModalContextType = {
  openName: string
  close: () => void
  open: (name: string) => void
}
type ModalComponent = React.FC<ModalProps> & {
  Open: typeof Open
  Window: typeof Window
}
export const ModalContext = createContext<ModalContextType | undefined>(undefined)
const Modal: ModalComponent = ({ children }) => {
  const [openName, setOpenName] = useState("")
  const close = () => setOpenName("")
  const open = setOpenName

  return <ModalContext.Provider value={{ openName, close, open }}>
    {children}
  </ModalContext.Provider>
}
function Open({ children, name }: { children: React.ReactNode; name: string }) {
  const context = useContext(ModalContext);
  if (!context) throw new Error("Open must be used within Modal");

  const { open } = context;

  // 确保 children 是有效元素
  if (!isValidElement(children)) {
    throw new Error("Open children must be a valid React element");
  }

  return cloneElement(children, {
    onClick: () => open(name),
  } as any);
}

function Window({ children, name }: { children: React.ReactNode; name: string }) {
  const context = useContext(ModalContext)
  if (!context) throw new Error('Window must be used within Modal')
  const { openName, close } = context
  const ref = useClickOutside(close)
  if (name !== openName) return null;

  // 处理点击 overlay 外部关闭 modal
  // const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
  //   // 事件冒泡机制说明：
  //   // 1. 当点击任何元素时，事件会从最内层元素开始，逐层向上冒泡到父元素
  //   // 2. 例如：点击 Button → 事件冒泡到 StyledModal → 再冒泡到 Overlay
  //   // 3. 在这个过程中：
  //   //    - e.target: 始终是实际被点击的元素（Button、StyledModal 或 Overlay）
  //   //    - e.currentTarget: 当前处理事件的元素（在这个函数中始终是 Overlay）
  //   //
  //   // 判断逻辑：
  //   // - 如果 e.target === e.currentTarget，说明点击的就是 Overlay 本身（没有子元素被点击）
  //   // - 如果 e.target !== e.currentTarget，说明点击的是 Overlay 的子元素（事件冒泡上来的）
  //   console.log(e.target, 'e.target')
  //   console.log(e.currentTarget, 'e.currentTarget')
  //   if (e.target === e.currentTarget) {
  //     close()
  //   }
  // }

  return createPortal(
    <Overlay >
      <StyledModal ref={ref}>
        <Button onClick={close}>
          <ArrowLeft />
        </Button>
        <div>{children}</div>
      </StyledModal>
    </Overlay>,
    document.body
  )
}
// 导出 hook 供子组件使用
export function useModal() {
  const context = useContext(ModalContext);
  if (!context) {
    // 如果不在 Modal 内，返回一个 no-op 函数，避免报错
    return { close: () => { }, open: () => { } };
  }
  return context;
}

Modal.Open = Open
Modal.Window = Window
export default Modal