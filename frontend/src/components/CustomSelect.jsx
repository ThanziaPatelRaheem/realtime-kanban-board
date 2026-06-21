import React from "react";
import Select from "react-select";

const CustomSelect = ({ options, value, onChange, placeholder }) => {
  const val = options.find((option) => option.value === value);
  return (
    <>
      <Select
        options={options}
        value={val}
        onChange={(selectedOption) => onChange(selectedOption.value)}
        placeholder={placeholder}
      />
    </>
  );
};

export default CustomSelect;
