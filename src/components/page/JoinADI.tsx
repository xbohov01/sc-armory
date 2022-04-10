import { Image } from "@chakra-ui/image";
import { Box, Link, VStack } from "@chakra-ui/layout";
import adi from "../../adi.png";

export default function JoinADI() {
  return (
    <Box id="adi">
      <VStack>
        <Link
          id="adi-join-link"
          href="https://atlasdefenseindustries.com/join-adi"
        >
          <Image src={adi} />
        </Link>
        <Link
          id="adi-join-link"
          href="https://atlasdefenseindustries.com/join-adi"
        >
          Join ADI!
        </Link>
      </VStack>
    </Box>
  );
}
