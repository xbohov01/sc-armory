import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, CloseButton, Link } from "@chakra-ui/react";
import React, { useState } from "react";

export function AppNotice() {
  const [hidden, setHidden] = useState(false);

  return (
    <Box width='600pt' marginBottom='20pt' hidden={hidden}>
      <Alert status="info" variant='solid' borderRadius='3pt'>
        <AlertIcon />
        <AlertTitle mr={2} fontSize='md'>Development notice</AlertTitle>
        <AlertDescription fontSize='sm' margin='auto' width='fit-content'>
          <p>This application is still under development. Bugs happen.</p>
          <p>You can report them to thespacecoder.business@gmail.com</p>
          <p>Or join my <Link href='https://discord.com/invite/cY9gx4E'>Discord server</Link> and use the #tsc-bugs channel.</p>
        </AlertDescription>
        <CloseButton onClick={() => setHidden(true)}/>
      </Alert>
    </Box>
  )
}

export function ImageNotice() {
  const [hidden, setHidden] = useState(false);

  return (
    <Box width='600pt' marginBottom='20pt' hidden={hidden}>
      <Alert status="info" variant='solid' borderRadius='3pt'>
        <AlertIcon />
        <AlertTitle mr={2} fontSize='md'>Image submissions</AlertTitle>
        <AlertDescription fontSize='sm' margin='auto' width='fit-content'>
          <p>Not all images of armor and weapons are in yet.</p>
          <p>You can help get it added by submitting it <Link href='https://forms.gle/P1TQnhtueK6wmmbn8'>here</Link></p>
        </AlertDescription>
        <CloseButton onClick={() => setHidden(true)}/>
      </Alert>
    </Box>
  )
}