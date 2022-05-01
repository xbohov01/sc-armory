import { Checkbox } from "@chakra-ui/checkbox";
import { Box, Heading, HStack } from "@chakra-ui/layout";

import type { LocatedItem } from "~type/search";

export type ShoppingListItemProps = {
  item: LocatedItem;
  boughtSetter: (item: string, bought: boolean) => void;
};

export function ShoppingListItem(props: ShoppingListItemProps) {
  const handleToggle = () => {
    // e.preventDefault();
    props.boughtSetter(props.item.item, !props.item.isBought);
  };

  return (
    <HStack key={Math.random()} spacing="20pt">
      <Box
        minWidth="200pt"
        textAlign="left"
        fontSize="sm"
        textDecoration={props.item.isBought ? "line-through" : "none"}
      >{`${props.item.item} - ${props.item.price}aUEC`}</Box>
      <HStack>
        <Heading size="xs" as="h5">
          Purchased:{" "}
        </Heading>
        <Checkbox isChecked={props.item.isBought} onChange={handleToggle} />
      </HStack>
    </HStack>
  );
}
