import React from 'react'
import { Box, Icon, HStack, VStack, Link, Divider, Image } from '@chakra-ui/react';
import { AiFillYoutube, AiFillTwitterCircle, AiFillInstagram } from 'react-icons/ai'
import { FaTwitch, FaDiscord, FaFlickr, FaPatreon } from 'react-icons/fa';
import { SiRedbubble } from 'react-icons/si';
import { Support } from './Support';
import cig from '../../cig.png';
import "@fontsource/lato";
import { JoinADI } from './JoinADI';

export function Footer() {
  return (
    <Box id='footer' marginTop='50pt' color='whitesmoke' marginBottom='10pt'>
      <VStack>
        <JoinADI/>
        <Support/>
        <HStack>
          <Link href='https://www.youtube.com/c/thespacecoder'>
            <Icon boxSize='20pt' cursor='pointer' as={AiFillYoutube} />
          </Link>
          <Link href='https://twitter.com/TheSpaceCoder1'>
            <Icon boxSize='20pt' cursor='pointer' as={AiFillTwitterCircle} />
          </Link>
          <Link href='https://www.twitch.tv/thespacecoder'>
            <Icon boxSize='20pt' cursor='pointer' as={FaTwitch} />
          </Link>
          <Link href='https://www.instagram.com/thespacecoder2.0/'>
            <Icon boxSize='20pt' cursor='pointer' as={AiFillInstagram} />
          </Link>
          <Link href='https://discord.com/invite/cY9gx4E'>
            <Icon boxSize='20pt' cursor='pointer' as={FaDiscord} />
          </Link>
          <Link href='https://www.flickr.com/photos/162203426@N06'>
            <Icon boxSize='20pt' cursor='pointer' as={FaFlickr} />
          </Link>
          <Link href='https://www.redbubble.com/people/TheSpaceCoder/shop'>
            <Icon boxSize='20pt' cursor='pointer' as={SiRedbubble} />
          </Link>
          <Link href='https://www.patreon.com/scarmory'>
            <Icon boxSize='20pt' cursor='pointer' as={FaPatreon} />
          </Link>
        </HStack>
        <Divider width='60vw' />
        <VStack fontFamily='Lato'>
          <Box width='fit-content' margin='auto'>©TheSpaceCoder 2018 - 2021 thespacecoder.business@gmail.com</Box>
          <HStack width='400pt' id='cig-notice'>
            <Image width='100pt' src={cig} />
            <p>This is an unofficial Star Citizen fansite, not affiliated with the Cloud Imperium group of companies. All content on this site not authored by its host or users are property of their respective owners</p>
          </HStack>
        </VStack>
      </VStack>
    </Box>
  )
}