import styled from "styled-components";

const StyledSelect = styled.select<{ $type?: "white" | "default" }>`
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  border: 1px solid
    ${(props) =>
    props.$type === "white"
      ? "var(--color-grey-100)"
      : "var(--color-grey-300)"};
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  font-weight: 500;
  box-shadow: var(--shadow-sm);
`;

type SelectOption = {
  value: string | number;
  label: string;
};

type SelectProps = {
  options: SelectOption[];
  value: string | number;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  type?: "white" | "default";
};

const Select = ({ options, value, onChange, type }: SelectProps) => {
  return (
    <StyledSelect value={value} onChange={onChange} $type={type}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </StyledSelect>
  );
};
export default Select;