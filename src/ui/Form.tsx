import type { FormHTMLAttributes, PropsWithChildren } from "react";
import styled, { css } from "styled-components";

type FormVariant = "modal" | "default";

type StyledFormProps = {
  $type: FormVariant;
};

const StyledForm = styled.form<StyledFormProps>`
  ${(props) =>
    props.$type !== "modal" &&
    css`
      padding: 2.4rem 4rem;

      /* Box */
      background-color: var(--color-grey-0);
      border: 1px solid var(--color-grey-100);
      border-radius: var(--border-radius-md);
    `}

  ${(props) =>
    props.$type === "modal" &&
    css`
      width: 80rem;
    `}
    
  overflow: hidden;
  font-size: 1.4rem;
`;

type FormProps = PropsWithChildren<
  FormHTMLAttributes<HTMLFormElement> & {
    type?: FormVariant;
  }
>;

function Form({ type = "default", ...props }: FormProps) {
  return <StyledForm $type={type} {...props} />
}
export default Form;
