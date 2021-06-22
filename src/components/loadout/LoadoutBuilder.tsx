import { Button } from '@chakra-ui/button';
import { Box, Heading } from '@chakra-ui/layout';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { LoadoutComponent } from './LoadoutComponent';
import { OptionalLoadoutItems } from './OptionalLoadoutItems';
import { SecondarySelectorComponent } from './SecondarySelectorComponent';
import { WeaponAttachmentsList } from './WeaponAttachmentsList';

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
  const [optionals, setOptionals] = useState<string[]>([]);
  const [primAttachments, setPrimAttachments] = useState<string[]>([]);
  const [secAttachments, setSecAttachments] = useState<string[]>([]);
  const [sideAttachments, setSideAttachments] = useState<string[]>([]);

  const sendBuildToList = () => {
    props.updater([helmet, arms, core, legs, pistol, primary, secondary, undersuit, ...optionals, ...sideAttachments, ...primAttachments, ...secAttachments].filter(g => g !== ''));
  }

  return (
    <Box backgroundColor='#282c34' color='whitesmoke' id='loadout-builder' marginBottom='10pt'>
      <Heading size='lg'>Build your loadout:</Heading>
      <Box marginBottom='10pt' fontSize='md'>
        <LoadoutComponent type='Undersuit' updater={setUndersuit} />
        <LoadoutComponent type='Helmet' updater={setHelmet} />
        <LoadoutComponent type='Arms' updater={setArms} />
        <LoadoutComponent type='Core' updater={setCore} />
        <LoadoutComponent type='Legs' updater={setLegs} />
        <LoadoutComponent type='Sidearm' updater={setPistol} />
        {pistol !== '' ? <WeaponAttachmentsList weapon={pistol} updater={setSideAttachments}/> : ''}
        <LoadoutComponent type='Primary' updater={setPrimary} />
        {primary !== '' ? <WeaponAttachmentsList weapon={primary} updater={setPrimAttachments}/> : ''}
        <SecondarySelectorComponent coreName={core} setSecondary={setSecondary}/>
        {secondary !== '' ? <WeaponAttachmentsList weapon={secondary} updater={setSecAttachments}/> : ''}
        <OptionalLoadoutItems updater={setOptionals}/>
      </Box>
      <Button width='30vw' maxWidth='300pt' minWidth='200pt' colorScheme='teal' onClick={sendBuildToList}>Get shopping list</Button>
    </Box>
  )
}