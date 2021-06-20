import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, CloseButton } from "@chakra-ui/react";
import React, { useState } from "react";

export function AppNotice() {
  const [hidden, setHidden] = useState(false);

  return (
    <Box width='800pt' marginBottom='20pt' hidden={hidden}>
      <Alert status="info" variant='solid' borderRadius='3pt'>
        <AlertIcon />
        <AlertTitle mr={2} fontSize='md'>Development notice</AlertTitle>
        <AlertDescription fontSize='sm'>This application is still under development. Bugs happen. You can report them to thespacecoder.bussiness@gmail.com</AlertDescription>
        <CloseButton onClick={() => setHidden(true)}/>
      </Alert>
    </Box>
  )
}