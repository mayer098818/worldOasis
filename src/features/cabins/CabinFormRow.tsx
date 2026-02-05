import styled, { css } from "styled-components";

const FormRowStyled = styled.div<{ $type: string }>`
  ${(props) =>
    props.$type === "horizontal" &&
    css`
      display: grid;
    align-items: center;
    grid-template-columns: 24rem 1fr 1.2fr;
    gap: 2.4rem;
    padding: 1.2rem 0;
    `}

  ${(props) =>
    props.$type === "vertical" &&
    css`
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 1.2rem 0;
    `}
`;
const Label = styled.label<{ $type: string }>`
  font-weight: 500;
    min-width: 220px;
    margin-right: ${(props) => props.$type === "vertical" ? "17.4rem" : "0"};
    margin-bottom: ${(props) => props.$type === "vertical" ? "0.8rem" : "0"};
    `;
const Error = styled.span<{ $type: string }>`
  font-size: 1.4rem;
  color: var(--color-red-700);
  ${(props) =>
    props.$type === "vertical" &&
    css`
       margin-right:260px;
        margin-top:10px;
    `}

`;
const CabinFormRow = ({ item, children, error, type = 'horizontal' }: { item: any, children: any, error: any, type?: string }) => {
  return (
    <FormRowStyled $type={type}>
      <Label $type={type} htmlFor={children?.props?.id as string}>{item.label}</Label>
      {children}
      <Error $type={type}>{error?.message}</Error>
    </FormRowStyled>
  )
}
export default CabinFormRow