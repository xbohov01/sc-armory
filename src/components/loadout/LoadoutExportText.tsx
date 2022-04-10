import React, { useState } from "react";

import { Button, Textarea } from "@chakra-ui/react";

export default function LoadoutExportText(props: { text: string }) {
  const [status, setStatus] = useState("Copy");

  const copyToClipboard = () => {
    navigator.clipboard.writeText(props.text);
    setStatus("Copied!");
  };

  return (
    <>
      <Textarea
        textColor="whitesmoke"
        width="350pt"
        minWidth="350pt"
        value={props.text}
        isReadOnly
      />
      <Button onClick={copyToClipboard}>{status}</Button>
    </>
  );
}
