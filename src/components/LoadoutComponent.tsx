import React, { Dispatch, SetStateAction, useState } from 'react';
import { Box, Heading } from '@chakra-ui/layout';
import AsyncSelect from "react-select/async"
import { customStyles } from '../selectStyle';
import gearProvider from '../gearProvider';

type LoadoutComponentProps = {
  type: string;
  updater: Dispatch<SetStateAction<string>>;
}

export function LoadoutComponent(props: LoadoutComponentProps) {
  const [filter, setFilter] = useState('');

  const loadOptions = async () => await gearProvider.GetGearOptions(props.type, filter);

  const handleGearChange = (selected: any) => {
    props.updater(selected.label);
  }

  return (
    <Box id={'component-' + props.type} padding='2pt'>
      <Heading fontSize='md'>{props.type}</Heading>
      <Box paddingTop='2pt'>
        <AsyncSelect
          id={props.type}
          styles={customStyles}
          loadOptions={loadOptions}
          onChange={handleGearChange}
          onInputChange={setFilter}
          isMulti={false}
          defaultOptions
        />
      </Box>
    </Box>
  )
}