import React, { Dispatch, SyntheticEvent, useEffect, useState } from 'react';
import { Button } from "@chakra-ui/button";
import { Box, VStack } from "@chakra-ui/layout"
import { KeyValue } from '../../types/types';
import { OptionalLoadoutComponent } from './OptionalLoadoutComponent';

type OptionalLoadoutItemsProps = {
  updater: Dispatch<React.SetStateAction<string[]>>
}

export function OptionalLoadoutItems(props: OptionalLoadoutItemsProps) {
  const [optionals, setOptionals] = useState<KeyValue<number, string>[]>([]);

  useEffect(() => {
    props.updater(optionals.map(o => o.value));
  }, [optionals]);

  const addOptional = (e: SyntheticEvent) => {
    e.preventDefault();
    setOptionals([...optionals, { key: Math.random(), value: '' }])
  }

  const removeOptional = (key: number) => {
    var removed = optionals.filter(o => o.key !== key);
    setOptionals(removed);

    props.updater(optionals.map(o => o.value));
  }

  const updateOptional = (item: KeyValue<number, string>) => {
    let opts = optionals;
    opts.filter(o => o.key === item.key)[0].value = item.value;

    setOptionals(opts);
    props.updater(optionals.map(o => o.value));
  }

  return (
    <Box marginTop='10pt' maxWidth='300pt' margin='auto'>
      <Button marginBottom='10pt' marginTop='10pt' colorScheme='blue' onClick={addOptional}>Add optional gear</Button>
      <VStack>
        {optionals.map(o => <OptionalLoadoutComponent
          id={o.key}
          key={o.key}
          type='Usable'
          remover={removeOptional}
          updater={updateOptional}
        />)}
      </VStack>
    </Box>
  )
}