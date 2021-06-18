import { Button } from '@chakra-ui/button';
import { Box, Heading } from '@chakra-ui/layout';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { LoadoutComponent } from './LoadoutComponent';
import { SecondarySelectorComponent } from './SecondarySelectorComponent';

type LoadoutBuilderProps = {
  updater: Dispatch<SetStateAction<string[]>>;
}

export function LoadoutBuilder(props: LoadoutBuilderProps) {
  const [helmet, setHelmet] = useState<string>('');
  const [undersuit, setUndersuit] = useState<string>('');
  const [arms, setArms] = useState<string>('');
  const [core, setCore] = useState<string>('');
  const [legs, setLegs] = useState<string>('');
  const [pistol, setPistol] = useState<string>('');
  const [primary, setPrimary] = useState<string>('');
  const [secondary, setSecondary] = useState<string>('');

  const sendBuildToList = () => {
    props.updater([helmet, arms, core, legs, pistol, primary, secondary, undersuit].filter(g => g !== ''));
  }

  return (
    <Box id='loadout-builder' marginBottom='20pt'>
      <Heading>Build your loadout:</Heading>
      <Box fontSize='md'>
        <LoadoutComponent type='Undersuit' updater={setUndersuit} />
        <LoadoutComponent type='Helmet' updater={setHelmet} />
        <LoadoutComponent type='Arms' updater={setArms} />
        <LoadoutComponent type='Core' updater={setCore} />
        <LoadoutComponent type='Legs' updater={setLegs} />
        <LoadoutComponent type='Sidearm' updater={setPistol} />
        <LoadoutComponent type='Primary' updater={setPrimary} />
        <SecondarySelectorComponent coreName={core} setSecondary={setSecondary}/>
      </Box>
      <Button colorScheme='blue' onClick={sendBuildToList}>Get shopping list</Button>
    </Box>
  )
}