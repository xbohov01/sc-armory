import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import gearProvider from '../gearProvider';
import { LoadoutComponent } from './LoadoutComponent';

type SecondarySelectorComponentProps = {
  coreName: string;
  setSecondary: Dispatch<SetStateAction<string>>
}

export function SecondarySelectorComponent(props: SecondarySelectorComponentProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (props.coreName === '') {
      setIsVisible(false);
    } else {
      gearProvider.GetCore(props.coreName).then((result) => {
        if (result.LocalizedDescription.includes("Heavy Armor") || result.LocalizedDescription.includes("Medium Armor")) {
          setIsVisible(true);
        }
      });
      setIsVisible(false);
    }
  }, [props.coreName])

  return (
    <>
      { isVisible ? <LoadoutComponent type='Secondary' updater={props.setSecondary} /> : ""}
    </>
  )
}