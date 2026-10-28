import Select from "react-select";
import { customSelectStyles } from "./CustomSelect.styles";

const CustomSelect = ({ options, value, onChange, placeholder }) => {
  const val = options.find((option) => option.value === value);
  return (
    <>
      <Select
        options={options}
        value={val}
        onChange={(selectedOption) => onChange(selectedOption.value)}
        placeholder={placeholder}
        styles={customSelectStyles}
      />
    </>
  );
};

export default CustomSelect;
