import { Box, Heading, Link, VStack } from "@chakra-ui/layout";

export function Header() {
  return (
    <Box marginTop='20pt' marginBottom='20pt'>
      <VStack>
        <Heading>Star Citizen Armory</Heading>
        <Link fontSize='sm' href='https://www.thespacecoder.space/'>by TheSpaceCoder</Link>
      </VStack>
    </Box>
  )
}