// TODO: remove eslint-disable
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
export const customStyles = {
  option: (provided: any) => ({
    ...provided,
    color: "black",
  }),
  control: (provided: any, state: any) => ({
    ...provided,
    // none of react-select's styles are passed to <Control />
    // width: 300,
    minWidth: 300,
    opacity: state.isDisabled ? 0.5 : 1,
  }),
  singleValue: (provided: any) => ({ ...provided }),
};

export const compactStyles = {
  option: (provided: any) => ({
    ...provided,
    color: "black",
  }),
  control: (provided: any) => ({
    ...provided,
    // none of react-select's styles are passed to <Control />
    // width: 300,
    width: "auto",
    minWidth: 150,
  }),
  singleValue: (provided: any) => ({ ...provided }),
};
