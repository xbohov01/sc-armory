import { Image } from "@chakra-ui/image";
import { Box, Heading, HStack, Link, VStack } from "@chakra-ui/layout";
import logo from '../../logo.png';

export function Header() {
  return (
    <Box marginTop='20pt' marginBottom='20pt'>
      <HStack>
        <Image src={logo} width='100pt' marginLeft='-100pt'/>
        <VStack>
          <Heading>Star Citizen Armory</Heading>
          <Link fontSize='sm' href='https://www.thespacecoder.space/'>by TheSpaceCoder</Link>
        </VStack>
      </HStack>
    </Box>
  )
}