import { Box, Heading, Accordion, AccordionItem, AccordionPanel, AccordionButton, AccordionIcon, Link } from "@chakra-ui/react"
import { Cloudinary } from "@cloudinary/base";
import { AdvancedImage } from '@cloudinary/react';
import React, { useEffect, useState } from "react"
import client from "../../client/client";
import gearInfoProvider from "../../providers/gearInfoProvider";
import { NameReference } from "../../types/types";

type ImageDisplayProps = {
  gear: string[]
}

export function ImageDisplay(props: ImageDisplayProps) {
  const [references, setReferences] = useState<NameReference[]>([]);

  useEffect(() => {
    gearInfoProvider.GetGearListReferences(props.gear).then(res => {
      setReferences(res);
    });

  }, [props.gear])


  const cloudinary = new Cloudinary({
    cloud: {
      cloudName: 'thespacecoder',
    }
  });

  return (
    <Box id='image-display' color='whitesmoke' width='30vw' maxWidth='300pt' minWidth='200pt'>
      <Heading size='lg' marginBottom='10pt'>Images</Heading>
      <Accordion width='30vw' maxWidth='300pt' minWidth='200pt' allowMultiple>
      {references.map(r => <ImageItem item={r} cloud={cloudinary} key={Math.random()} />)}
      </Accordion>
    </Box>
  )
}

type ImageItemProps = {
  item: NameReference;
  cloud: Cloudinary;
}

function ImageItem(props: ImageItemProps) {
  const [imageExists, setImageExists] = useState(false);

  useEffect(() => {
    client.CheckIfImageExists(props.item.reference).then((res) => {
      setImageExists(res);
    })
  });

  return (
    <AccordionItem>
      <h2>
        <AccordionButton>
          <Box flex="1" textAlign="left">
            {props.item.name}
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
        { imageExists ? <AdvancedImage cldImg={props.cloud.image('armory/' + props.item.reference)} /> : 
          <Box>
            This image is not yet in the Armory. You can help get it added by submitting it <Link textDecoration='underline' href='https://forms.gle/P1TQnhtueK6wmmbn8'>here</Link>.
          </Box>
        }
      </AccordionPanel>
    </AccordionItem>
  )
}