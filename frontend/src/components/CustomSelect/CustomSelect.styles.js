export const customSelectStyles = {
  control: (base, state) => ({
    ...base,
    backgroundColor: "#0f172a",
    borderColor: state.isFocused ? "#3b82f6" : "#475569",
    borderRadius: "8px",
    minHeight: "48px",
    boxShadow: state.isFocused ? "0 0 0 3px rgba(37, 99, 235, 0.12)" : "none",
    "&:hover": {
      borderColor: "#3b82f6",
    },
  }),

  singleValue: (base) => ({
    ...base,
    color: "#f8fafc",
  }),

  input: (base) => ({
    ...base,
    color: "#f8fafc",
  }),

  placeholder: (base) => ({
    ...base,
    color: "#94a3b8",
  }),

  menu: (base) => ({
    ...base,
    backgroundColor: "#1e293b",
    border: "1px solid #334155",
    zIndex: 10,
  }),

  option: (base, state) => ({
    ...base,
    backgroundColor: state.isSelected
      ? "#2563eb"
      : state.isFocused
        ? "#334155"
        : "#1e293b",
    color: "#f8fafc",
    cursor: "pointer",
  }),

  dropdownIndicator: (base) => ({
    ...base,
    color: "#94a3b8",
  }),

  indicatorSeparator: () => ({
    display: "none",
  }),
};
