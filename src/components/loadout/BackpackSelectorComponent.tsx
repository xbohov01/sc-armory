import React, { Dispatch, SetStateAction } from "react";
import { useQuery } from "react-query";

import { BackpackSelectorDropdown } from "./BackpackSelectorDropdown";

import { getCore } from "~/util/gear";

type BackpackSelectorComponentProps = {
  coreName: string;
  undersuitName: string;
  setBackpack: Dispatch<SetStateAction<string>>;
};

export default function BackpackSelectorComponent(
  props: BackpackSelectorComponentProps
) {
  const { data: maxBackpackSize } = useQuery(
    ["getCore", props.coreName, props.undersuitName],
    () => {
      if (
        props.undersuitName.includes("Pembroke") ||
        props.undersuitName.includes("Novikov")
      ) {
        return 3;
      }
      if (props.coreName === "") {
        return 0;
      } else {
        return getCore(props.coreName).then((result) => result.backpackMaxSize);
      }
    }
  );

  return (
    <BackpackSelectorDropdown
      setBackpack={props.setBackpack}
      maxBackpackSize={maxBackpackSize ?? 0}
    />
  );
}
