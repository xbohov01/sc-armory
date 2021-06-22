export const customStyles = {
  option: (provided:any, state:any) => ({
    ...provided,
    color: 'black'
  }),
  control: (provided:any, state:any) => ({
    ...provided,
    // none of react-select's styles are passed to <Control />
    //width: 300,
    minWidth: 300,
    opacity: state.isDisabled ? 0.5 : 1
  }),
  singleValue: (provided:any, state:any) => {
    //const opacity = state.isDisabled ? 0.5 : 1;
    //const transition = 'opacity 300ms';

    return { ...provided};
  }
}

export const compactStyles = {
  option: (provided:any, state:any) => ({
    ...provided,
    color: 'black'
  }),
  control: (provided:any, state:any) => ({
    ...provided,
    // none of react-select's styles are passed to <Control />
    //width: 300,
    width: 'auto',
    minWidth: 150
  }),
  singleValue: (provided:any, state:any) => {
    //const opacity = state.isDisabled ? 0.5 : 1;
    //const transition = 'opacity 300ms';

    return { ...provided};
  }
}