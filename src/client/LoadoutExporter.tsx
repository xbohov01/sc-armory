import { Button, Textarea, VStack } from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import { KeyValue, ListKey, LocatedItem } from "../types/types";

type LoadoutExporterProps = {
  gear: KeyValue<ListKey, LocatedItem[]>[]
}

export function LoadoutExporter(props: LoadoutExporterProps) {
  const [textExport, setTextExport] = useState('');
  const [showExport, setShowExport] = useState(false);

  useEffect(() => {
    let text = '';
    for (let location of props.gear) {
      text += `${location.key.name} - ${location.key.chain.split(' - ').reverse().join(' - ')}\n`;
      for (let item of location.value) {
        text += `\t${item.item} - ${item.price} aUEC\n`
      }
      text += '\n';
    }
    setTextExport(text);
  }, [props.gear])

  return (
    <VStack id='export'>
      <Button
        colorScheme='blue'
        marginBottom='10pt'
        marginTop='10pt'
        marginLeft='auto'
        marginRight='auto'
        width='15vw'
        minWidth='150pt'
        maxWidth='300pt'
        onClick={() => setShowExport(!showExport)}
        isDisabled={props.gear.length === 0}
      >Export shopping list
      </Button>
      {showExport ? <LoadoutExportText text={textExport} /> : ''}
    </VStack>
  )
}

function LoadoutExportText(props: { text: string }) {
  const [status, setStatus] = useState('Copy');

  const copyToClipboard = () => {
    navigator.clipboard.writeText(props.text)
    setStatus('Copied!')
  }

  return (
    <>
      <Textarea textColor='whitesmoke' width='350pt' minWidth='350pt' value={props.text} isReadOnly={true} />
      <Button onClick={copyToClipboard}>{status}</Button>
    </>
  )
}