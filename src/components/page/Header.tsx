import { Image } from "@chakra-ui/image";
import { Box, Heading, HStack, Link, VStack } from "@chakra-ui/layout";

import VersionSwitch from "./VersionSwitch";

import logo from "~/assets/logo.png";

export default function Header() {
  const isPTU = import.meta.env.VITE_PTU_ENABLED === "true";

  return (
    <Box marginTop="20pt" marginBottom="20pt">
      <VStack>
        <HStack>
          <Image src={logo} width="100pt" />
          <VStack>
            <>
              <Heading>Star Citizen Armory</Heading>
              <Link fontSize="sm" href="https://www.thespacecoder.space/">
                by TheSpaceCoder
              </Link>
            </>
          </VStack>
          <Box width="100pt" />
        </HStack>
        <VersionSwitch isEnabled={isPTU} />
      </VStack>
    </Box>
  );
}
