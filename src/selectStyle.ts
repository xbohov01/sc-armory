export const customStyles = {
  option: (provided:any, state:any) => ({
    ...provided,
    color: 'black'
  }),
  control: (provided:any, state:any) => ({
    ...provided,
    // none of react-select's styles are passed to <Control />
    //width: 300,
    minWidth: 300
  }),
  singleValue: (provided:any, state:any) => {
    //const opacity = state.isDisabled ? 0.5 : 1;
    //const transition = 'opacity 300ms';

    return { ...provided};
  }
}