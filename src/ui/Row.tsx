import React from "react";
import styled, { css } from "styled-components";

// 1️⃣ 定义 props 类型
type RowProps = {
  type?: "horizontal" | "vertical"; // type 只能是这两个
  children?: React.ReactNode;       // 支持子组件
};

// 2️⃣ 定义 styled 组件，带类型
const RowStyled = styled.div<RowProps>`
  display: flex;

  ${(props) =>
    props.type === "horizontal" &&
    css`
      justify-content: space-between;
      align-items: center;
    `}

  ${(props) =>
    props.type === "vertical" &&
    css`
      flex-direction: column;
      gap: 1.6rem;
    `}
`;

// 3️⃣ 给默认 props
RowStyled.defaultProps = {
  type: "vertical",
};

// 4️⃣ 封装成 React.FC
const Row: React.FC<RowProps> = ({ type, children, ...rest }) => {
  return (
    <RowStyled type={type} {...rest}>
      {children}
    </RowStyled>
  );
};

export default Row;
