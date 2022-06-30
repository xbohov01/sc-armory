import { useState } from "react";
import { Field, Form } from "react-final-form";

import { Button } from "@chakra-ui/button";
import { Box, Divider, Heading, HStack, VStack } from "@chakra-ui/layout";

import AdvancedInfo from "../advanced/AdvancedInfo";
import ImageDisplay from "../images/ImageDisplay";
import ShopsLoot from "../page/ShopsLoot";

import BackpackSelectorComponent from "./BackpackSelectorComponent";
import LoadoutComponent from "./LoadoutComponent";
import LoadoutExporter from "./LoadoutExporter";
import OptionalLoadoutItems from "./OptionalLoadoutItems";
import SecondarySelectorComponent from "./SecondarySelectorComponent";
import WeaponAttachmentsList from "./WeaponAttachmentsList";

import { ListKey, LocatedItem } from "~type/search";
import { KeyValue } from "~type/select";

type LoadoutBuilderProps = {
  showImages: boolean;
  showInfo: boolean;
  showList: boolean;
};

export type LoadoutFormValues = {
  undersuit: string;
  helmet: string;
  arms: string;
  core: string;
  legs: string;
  backpack: string;
  pistol: string;
  primary: string;
  secondary: string;
  tool: string;
  optionals: string[];
  primAttachments: string[];
  secAttachments: string[];
  sideAttachments: string[];
};

export default function LoadoutBuilder(props: LoadoutBuilderProps) {
  const [list, setList] = useState<KeyValue<ListKey, LocatedItem[]>[]>([]);
  const initialGearFormValues: LoadoutFormValues = {
    undersuit: "",
    helmet: "",
    arms: "",
    core: "",
    legs: "",
    backpack: "",
    pistol: "",
    primary: "",
    secondary: "",
    tool: "",
    optionals: [],
    primAttachments: [],
    secAttachments: [],
    sideAttachments: [],
  };

  const isUndersuitArmored = (values: LoadoutFormValues): boolean =>
    values.undersuit !== ""
      ? values.undersuit.includes("Pembroke") ||
        values.undersuit.includes("Novikov")
      : false;

  const handleSubmit = (values: LoadoutFormValues) => {
    Object.values(values).flat().map(item => item.length)
  }

  return (
    <Form onSubmit={handleSubmit} initialValues={initialGearFormValues}>
      {({ values }) => (
        <HStack width="auto" margin="auto" alignItems="start" spacing="10pt">
          {props.showInfo ? <AdvancedInfo gear={values} /> : ""}
          <VStack id="loadout-section" width="400pt">
            <Box
              backgroundColor="#1a2130"
              padding="10px"
              borderRadius="8px"
              color="whitesmoke"
              id="loadout-builder"
              marginBottom="10pt"
              boxShadow="4px 4px 8px rgba(0, 0, 0, 0.25), -2px -2px 6px #293342"
            >
              <Heading size="lg">Build your loadout:</Heading>
              <Box marginBottom="10pt" fontSize="md">
                <Field
                  name="undersuit"
                  render={({ input }) => {
                    return (
                      <LoadoutComponent
                        type="Undersuit"
                        isDisabled={false}
                        onUpdate={input.onChange}
                      />
                    );
                  }}
                />
                <Field
                  name="helmet"
                  render={({ input }) => {
                    return (
                      <LoadoutComponent
                        type="Helmet"
                        isDisabled={false}
                        onUpdate={input.onChange}
                      />
                    );
                  }}
                />
                <Field
                  name="arms"
                  render={({ input }) => {
                    return (
                      <LoadoutComponent
                        type="Arms"
                        isDisabled={false}
                        onUpdate={input.onChange}
                      />
                    );
                  }}
                />
                <Field
                  name="core"
                  render={({ input }) => {
                    return (
                      <LoadoutComponent
                        type="Core"
                        isDisabled={false}
                        onUpdate={input.onChange}
                      />
                    );
                  }}
                />
                <Field
                  name="backpack"
                  render={({ input }) => {
                    return (
                      <BackpackSelectorComponent
                        coreName={values.core}
                        undersuitName={values.undersuit}
                        setBackpack={input.onChange}
                      />
                    );
                  }}
                />
                <Field
                  name="legs"
                  render={({ input }) => {
                    return (
                      <LoadoutComponent
                        type="Legs"
                        isDisabled={isUndersuitArmored(values)}
                        onUpdate={input.onChange}
                      />
                    );
                  }}
                />
                <Field
                  name="sidearm"
                  render={({ input }) => {
                    return (
                      <LoadoutComponent
                        type="Sidearm"
                        isDisabled={false}
                        onUpdate={input.onChange}
                      />
                    );
                  }}
                />
                {values.pistol ? (
                  <Field
                    name="sideAttachments"
                    render={({ input }) => {
                      return (
                        <WeaponAttachmentsList
                          weapon={values.pistol}
                          onUpdate={input.onChange}
                        />
                      );
                    }}
                  />
                ) : null}
                <Field
                  name="primary"
                  render={({ input }) => {
                    return (
                      <LoadoutComponent
                        type="Primary"
                        isDisabled={false}
                        onUpdate={input.onChange}
                      />
                    );
                  }}
                />
                {values.primary ? (
                  <Field
                    name="primAttachments"
                    render={({ input }) => {
                      return (
                        <WeaponAttachmentsList
                          weapon={values.primary}
                          onUpdate={input.onChange}
                        />
                      );
                    }}
                  />
                ) : null}
                <Field
                  name="secondary"
                  render={({ input }) => {
                    return (
                      <SecondarySelectorComponent
                        coreName={values.core}
                        undersuitName={values.undersuit}
                        setSecondary={input.onChange}
                      />
                    );
                  }}
                />
                {values.secondary ? (
                  <Field
                    name="secAttachments"
                    render={({ input }) => {
                      return (
                        <WeaponAttachmentsList
                          weapon={values.secondary}
                          onUpdate={input.onChange}
                        />
                      );
                    }}
                  />
                ) : null}
                <Field
                  name="tool"
                  render={({ input }) => {
                    return (
                      <LoadoutComponent
                        type="Tool"
                        isDisabled={false}
                        onUpdate={input.onChange}
                      />
                    );
                  }}
                />
                <Field
                  name="optionals"
                  render={({ input }) => {
                    return <OptionalLoadoutItems onUpdate={input.onChange} />;
                  }}
                />
                <Button
                  width="100%"
                  colorScheme="teal"
                  type="submit"
                >
                  Get shopping list
                </Button>
              </Box>
            </Box>

            <Divider
              orientation="horizontal"
              width="40vw"
              maxWidth="350pt"
              minWidth="200pt"
              margin="auto"
            />
            {Object.values(values)
              .flat()
              .filter((item) => item.length).length > 0 && props.showList ? (
              <ShopsLoot gear={values} listSetter={setList} />
            ) : (
              ""
            )}
            <LoadoutExporter gear={list} />
          </VStack>
          {props.showImages ? <ImageDisplay gear={values} /> : ""}
        </HStack>
      )}
    </Form>
  );
}
