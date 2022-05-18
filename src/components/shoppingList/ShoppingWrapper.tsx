import { Dispatch, SetStateAction } from "react";

import { Box } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";

import ShoppingList from "./ShoppingList";
import ShoppingTable from "./ShoppingTable";

import type { ListKey, LocatedItem } from "~type/search";
import type { KeyValue } from "~type/select";

type ShoppingWrapperProps = {
  gear: string[];
  listUpstream: Dispatch<SetStateAction<KeyValue<ListKey, LocatedItem[]>[]>>;
  isTable: boolean;
};

export default function ShoppingWrapper(props: ShoppingWrapperProps) {
  useToast();

  return (
    <Box id="shopping-list-container">
      {props.isTable ? (
        <ShoppingTable gear={props.gear} />
      ) : (
        <ShoppingList gear={props.gear} listUpstream={props.listUpstream} />
      )}
    </Box>
  );
}
