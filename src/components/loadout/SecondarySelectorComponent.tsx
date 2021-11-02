import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import gearProvider from '../../gearProvider';
import { LoadoutComponent } from './LoadoutComponent';

type SecondarySelectorComponentProps = {
  coreName: string;
  undersuitName:string
  setSecondary: Dispatch<SetStateAction<string>>
}

export function SecondarySelectorComponent(props: SecondarySelectorComponentProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (props.coreName === '' && props.undersuitName === '') {
      setIsVisible(true);
    } else if (props.coreName === '' && (props.undersuitName.includes("Pembroke") || props.undersuitName.includes("Novikov"))){
      setIsVisible(true);
    } else if (props.coreName === '' && props.undersuitName !== ''){
      setIsVisible(false);
    } 
    else {
      gearProvider.GetCore(props.coreName).then((result) => {
        if (result.LocalizedDescription.includes("Light Armor")) {
          setIsVisible(false);
        }
      });
      setIsVisible(true);
    }
  }, [props.coreName, props.undersuitName])

  return (
    <>
    <LoadoutComponent type='Secondary' updater={props.setSecondary} isDisabled={!isVisible} />
      { /*isVisible ? <LoadoutComponent type='Secondary' updater={props.setSecondary} /> : ""*/}
    </>
  )
}