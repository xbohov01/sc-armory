import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Link } from "@chakra-ui/react";
import React from "react";

export function Support() {
  return (
    <Box id='support'>
      <Accordion allowToggle width='300pt'>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="center">
                How to support the Armory
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4} textAlign='left'>
            <p>
              The Armory is a passion project for me, I made it to help the community and I expect nothing in terms of support.
            </p>
            <p>
              However, if you want to, the best way to support the Armory is to subscribe to my <Link textDecoration='underline' href='https://www.youtube.com/c/thespacecoder'>YouTube</Link> channel and help it grow.
            </p>
            <p>
              Alternatively, if you REALLY want to, you can support the 
              project on <Link textDecoration='underline' href='https://www.patreon.com/scarmory'>Patreon</Link> and 
              there is some <Link textDecoration='underline' href='https://www.redbubble.com/shop/ap/89403056'>merch</Link>. 
              More options/items can be added per request.
            </p>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Box>
  )
}