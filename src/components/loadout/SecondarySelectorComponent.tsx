import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import gearProvider from '../../gearProvider';
import { LoadoutComponent } from './LoadoutComponent';

type SecondarySelectorComponentProps = {
  coreName: string;
  setSecondary: Dispatch<SetStateAction<string>>
}

export function SecondarySelectorComponent(props: SecondarySelectorComponentProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (props.coreName === '') {
      setIsVisible(true);
    } else {
      gearProvider.GetCore(props.coreName).then((result) => {
        if (result.LocalizedDescription.includes("Light Armor")) {
          setIsVisible(false);
        }
      });
      setIsVisible(true);
    }
  }, [props.coreName])

  return (
    <>
    <LoadoutComponent type='Secondary' updater={props.setSecondary} isDisabled={!isVisible} />
      { /*isVisible ? <LoadoutComponent type='Secondary' updater={props.setSecondary} /> : ""*/}
    </>
  )
}