import React, { Dispatch, SetStateAction, useState } from 'react';
import { Box, Heading } from '@chakra-ui/layout';
import AsyncSelect from "react-select/async"
import { customStyles } from '../../selectStyle';
import gearProvider from '../../providers/gearProvider';
import { FormatProps } from '../../types/types';

type LoadoutComponentProps = {
  type: string;
  updater: Dispatch<SetStateAction<string>>;
  isDisabled?: boolean
}

export function LoadoutComponent(props: LoadoutComponentProps) {
  const [filter, setFilter] = useState('');

  const loadOptions = async () => await gearProvider.GetGearOptions(props.type, filter);

  const handleGearChange = (selected: any) => {
    props.updater(selected.label);
  }

  const formatOptionLabel = (props: FormatProps) => (
    <div style={{ display: "flex"}}>
      <div>{props.label}</div>
      <div style={{ marginLeft: "10px", color: "#ccc" }}>
        {props.type}
      </div>
    </div>
  );

  return (
    <Box maxWidth='300pt' id={'component-' + props.type} padding='2pt' margin='auto'>
      <Heading fontSize='md'>{props.type}</Heading>
      <Box paddingTop='2pt'>
        <AsyncSelect
          id={props.type}
          styles={customStyles}
          loadOptions={loadOptions}
          onChange={handleGearChange}
          onInputChange={setFilter}
          isMulti={false}
          isDisabled={props.isDisabled !== undefined ? props.isDisabled : false}
          defaultOptions
          formatOptionLabel={formatOptionLabel}
          placeholder='Start typing...'
        />
      </Box>
    </Box>
  )
}