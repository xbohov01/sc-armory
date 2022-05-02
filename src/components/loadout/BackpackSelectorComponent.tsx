import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

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
  const [maxBackpackSize, setMaxBackpackSize] = useState(0);

  useEffect(() => {
    if (
      props.undersuitName.includes("Pembroke") ||
      props.undersuitName.includes("Novikov")
    ) {
      setMaxBackpackSize(3);
      return;
    }
    if (props.coreName === "") {
      setMaxBackpackSize(0);
    } else {
      getCore(props.coreName).then((result) => {
        setMaxBackpackSize(result.backpackMaxSize);
      });
    }
  }, [props.coreName, props.undersuitName]);

  return (
    <BackpackSelectorDropdown
      setBackpack={props.setBackpack}
      maxBackpackSize={maxBackpackSize}
    />
  );
}
