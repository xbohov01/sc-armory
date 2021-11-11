import { Image } from "@chakra-ui/image";
import { Box, Heading, HStack, Link, VStack } from "@chakra-ui/layout";
import logo from '../../logo.png';
import { VersionSwitch } from "./VersionSwitch";

export function Header() {
  return (
    <Box
      marginTop='20pt'
      marginBottom='20pt'>
      <VStack>
        <HStack>
          <Image src={logo} width='100pt' />
          <VStack>
            <>
              <Heading>Star Citizen Armory</Heading>
              <Link fontSize='sm' href='https://www.thespacecoder.space/'>by TheSpaceCoder</Link>
            </>
          </VStack>
          <Box width='100pt'></Box>
        </HStack>
        <VersionSwitch isEnabled={false}/>
      </VStack>
    </Box>
  )
}