import type { InputHTMLAttributes } from "react";
import { forwardRef } from "react";
import styled from "styled-components";

const InputStyled = styled.input`
  border: 1px solid var(--color-grey-300);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-sm);
  padding: 0.8rem 1.2rem;
  box-shadow: var(--shadow-sm);
`;
type InputProps = InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  // `type` 本来就会被 {...props} 传进去；这里主要是为了解决 TS 推断 props 为 {} 的问题
  return <InputStyled {...props} ref={ref} />;
});
export default Input;
