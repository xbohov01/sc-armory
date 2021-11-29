import { Box, Heading, HStack } from "@chakra-ui/layout";
import { KeyValue } from "../../types/types";
import AsyncSelect from "react-select/async"
import { customStyles } from "../../selectStyle";
import gearProvider from "../../providers/gearProvider";
import { useState } from "react";
import { Button } from "@chakra-ui/button";

type OptionalLoadoutComponentProps = {
  type: string;
  id:number,
  updater: (item: KeyValue<number, string>) => void;
  remover: (key: number) => void;
}

export function OptionalLoadoutComponent(props: OptionalLoadoutComponentProps) {
  const [filter, setFilter] = useState('');

  const loadOptions = async () => await gearProvider.GetGearOptions(props.type, filter);

  const handleGearChange = (selected: any) => {
    props.updater({key: props.id, value: selected.label});
  }

  const handleRemove = () =>{
    props.remover(props.id)
  }

  return (
    <Box maxWidth='300pt' margin='auto'>
      <Heading fontSize='md'>Optional gear</Heading>
      <HStack id={'component-' + props.type} padding='2pt'>
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
        <Button colorScheme='red' onClick={handleRemove}>Remove</Button>
      </HStack>
    </Box>
  )
}