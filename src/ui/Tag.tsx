import styled from "styled-components";
import type { ReactNode } from "react";

// 支持的 Tag 颜色类型
type TagType = "blue" | "green" | "silver" | string;

// 使用 transient prop，避免传到 DOM 上
const StyledTag = styled.span<{ $type: TagType }>`
  width: fit-content;
  text-transform: uppercase;
  font-size: 1.1rem;
  font-weight: 600;
  padding: 0.4rem 1.2rem;
  border-radius: 100px;

  /* 根据传入的 $type 动态生成 CSS 变量 */
  color: ${({ $type }) => `var(--color-${$type}-700)`};
  background-color: ${({ $type }) => `var(--color-${$type}-100)`};
`;

function Tag({ type, children }: { type: TagType; children: ReactNode }) {
  return <StyledTag $type={type}>{children}</StyledTag>;
}

export default Tag;
