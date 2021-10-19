import { Box, VStack, Link } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/image";
import adi from '../../adi.png';

export function JoinADI(){
  return(
    <Box id='adi'>
      <VStack>       
        <Link href='https://atlasdefenseindustries.com/join-adi'><Image src={adi}/></Link>
        <Link href='https://atlasdefenseindustries.com/join-adi'>Join ADI!</Link>
      </VStack>
    </Box>
  )
}