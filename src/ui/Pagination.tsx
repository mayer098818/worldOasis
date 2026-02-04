import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { ArrowLeft, ArrowRight } from 'lucide-react'

import { PAGE_SIZE } from "../utils/constants";


const StyledPagination = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const P = styled.p`
  font-size: 1.4rem;
  margin-left: 0.8rem;

  & span {
    font-weight: 600;
  }
`;

const Buttons = styled.div`
  display: flex;
  gap: 0.6rem;
`;

const PaginationButton = styled.button<{ $active?: boolean }>`
  background-color: ${(props) =>
    props.$active ? " var(--color-brand-600)" : "var(--color-grey-50)"};
  color: ${(props) => (props.$active ? " var(--color-brand-50)" : "inherit")};
  border: none;
  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.6rem 1.2rem;
  transition: all 0.3s;

  &:has(span:last-child) {
    padding-left: 0.4rem;
  }

  &:has(span:first-child) {
    padding-right: 0.4rem;
  }

  & svg {
    height: 1.8rem;
    width: 1.8rem;
  }

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;
function Pagination({ count }: { count: number }) {
  const [searchParams, setSearchParams] = useSearchParams()
  const currentPage = Number(searchParams.get('page')) || 1
  const pageCount = Math.ceil(count / PAGE_SIZE)
  function handlePrev() {
    searchParams.set('page', String(currentPage - 1))
    setSearchParams(searchParams)
  }
  function handleNext() {
    searchParams.set('page', String(currentPage + 1))
    setSearchParams(searchParams)
  }
  if (pageCount <= 1) return null
  return (
    <StyledPagination>
      <P>
        Showing <span>{(currentPage - 1) * PAGE_SIZE + 1}</span> to <span>{currentPage === pageCount ? count : currentPage * PAGE_SIZE}</span> of <span>{count}</span> results
      </P>
      <Buttons>
        <PaginationButton disabled={currentPage === 1} onClick={handlePrev}><ArrowLeft />Previous</PaginationButton>
        <PaginationButton disabled={currentPage === pageCount} onClick={handleNext}><ArrowRight />Next</PaginationButton>
      </Buttons>
    </StyledPagination>
  )
}
export default Pagination;