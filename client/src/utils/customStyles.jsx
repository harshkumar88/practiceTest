const selectCustomStyles = {
  control: (provided, state) => ({
    ...provided,
    borderRadius: "4px",
    padding: "0px 1px",
    backgroundColor: state.isDisabled ? "#f2f2f2" : "#ffffff", // Change background color if disabled
    backgroundImage: "linear-gradient(to bottom, #fff, #f3f5f7)",
    border: state.isFocused ? "1px solid #66afe9" : "1px solid #ccc",
    boxShadow: state.isFocused ? "0 0 0 1px #66afe9" : "none",
    transition: "border-color 0.2s ease",
    "&:hover": {
      border: state.isFocused ? "1px solid #66afe9" : "1px solid #ccc",
    },
    fontFamily: "Arial, sans-serif",
    fontSize: "14px",
    color: "#333",
    background: "#ffffff",
    textTransform: "capitalize",

    overflowY: "auto",
    outline: "none",
    minHeight: "34px",
  }),
  indicatorSeparator: () => ({ display: "none" }),
  menu: (provided) => ({
    ...provided,
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    fontFamily: "Arial, sans-serif",
    fontSize: "14px",
    color: "#333",
    ".Select-arrow-zone": {
      display: "none",
    },
    textTransform: "capitalize",
  }),
  valueContainer: (provided, state) => ({
    ...provided,
    paddingTop: "0px",
  }),

  input: (provided, state) => ({
    ...provided,
    margin: "0px",
    padding: "0px",
  }),
  indicatorSeparator: (state) => ({
    display: "none",
  }),
  indicatorsContainer: (provided, state) => ({
    ...provided,
  }),
  dropdownIndicator: (styles) => ({
    ...styles,
    paddingTop: 1,
    paddingBottom: 1,
  }),
  clearIndicator: (styles) => ({
    ...styles,
    paddingTop: 1,
    paddingBottom: 1,
  }),
};

export { selectCustomStyles };
