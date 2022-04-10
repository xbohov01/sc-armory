import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Link
} from "@chakra-ui/react";

export default function Bugs() {
  return (
    <Box id="bugs">
      <Accordion allowToggle width="300pt">
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="center">
                How to report issues
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4} textAlign="left">
            <p>This application is still under development. Bugs happen.</p>
            <p>You can report them to thespacecoder.business@gmail.com</p>
            <p>
              Or join my{" "}
              <Link
                textDecoration="underline"
                href="https://discord.com/invite/cY9gx4E"
              >
                Discord server
              </Link>{" "}
              and use the #tsc-bugs channel.
            </p>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Box>
  );
}
