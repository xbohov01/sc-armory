import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

import LoadoutComponent from "./LoadoutComponent";

import { getCore } from "~/util/gear";

type SecondarySelectorComponentProps = {
  coreName: string;
  undersuitName: string;
  setSecondary: Dispatch<SetStateAction<string>>;
};

export default function SecondarySelectorComponent(
  props: SecondarySelectorComponentProps
) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (props.coreName === "" && props.undersuitName === "") {
      setIsVisible(true);
    } else if (
      props.coreName === "" &&
      (props.undersuitName.includes("Pembroke") ||
        props.undersuitName.includes("Novikov"))
    ) {
      setIsVisible(true);
    } else if (props.coreName === "" && props.undersuitName !== "") {
      setIsVisible(false);
    } else {
      getCore(props.coreName).then((result) => {
        if (result.localizedDescription.includes("Light Armor")) {
          setIsVisible(false);
        }
      });
      setIsVisible(true);
    }
  }, [props.coreName, props.undersuitName]);

  return (
    <>
      <LoadoutComponent
        type="Secondary"
        onUpdate={props.setSecondary}
        isDisabled={!isVisible}
      />
      {/* {isVisible ? <LoadoutComponent type='Secondary' onUpdate={props.setSecondary} /> : "" } */}
    </>
  );
}
