import { Alert, AlertIcon } from "@chakra-ui/react";

export default function WrongSizeWarning() {
  return (
    <Alert status="warning" variant="solid" borderRadius="5px" width="inherit">
      <AlertIcon />
      This backpack is too large for the selected core. Select a different core
      or a backpack.
    </Alert>
  );
}
