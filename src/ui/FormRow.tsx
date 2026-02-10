import styled from "styled-components";
import { isValidElement } from "react";

const FormRowStyled = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
`;
const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

const FormRow = ({ children, label, error }: { children: React.ReactNode; label: string; error: any }) => {
  // 检查 children 是否是有效的 React 元素，并获取 id
  const inputId = isValidElement(children) && (children.props as any)?.id ? (children.props as any).id : undefined;

  return (
    <FormRowStyled>
      <Label htmlFor={inputId}>{label}</Label>
      {children}
      {error?.message && <Error>{error.message}</Error>}
    </FormRowStyled>
  );
};
export default FormRow