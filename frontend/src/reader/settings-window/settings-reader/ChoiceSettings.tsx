import { Flex, useRadioGroup } from "@chakra-ui/react";
import SettingsElement from "./SettingsElement";
import SettingsRadio from "./SettingsRadio";
import { useShouldScrollToStart } from "../../states/miscReaderStates";

interface ChoiceSettingsProps {
  settingHeader: string;
  settings: Array<{
    settingValue: string;
    settingName: string;
  }>;
  defaultValue: string;
  setSetting: (value: any) => void;
  shouldToggleScrollRestoration: boolean;
}

const ChoiceSettings: React.FC<ChoiceSettingsProps> = ({
  settingHeader,
  settings,
  defaultValue,
  setSetting,
  shouldToggleScrollRestoration,
}) => {
  const toggleScrollRestoration = useShouldScrollToStart(
    (state) => state.enableScrollRestoration
  );
  const handleChange = (value: any) => {
    if (shouldToggleScrollRestoration) {
      toggleScrollRestoration();
    }
    setSetting(value);
  };

  const { getRadioProps, getRootProps } = useRadioGroup({
    defaultValue:
      settings.find((obj) => obj.settingValue == defaultValue)?.settingValue ||
      settings[0].settingValue,
    onChange: handleChange,
  });

  return (
    <>
      <SettingsElement lockSetting={false} settingHeader={settingHeader}>
        <Flex
          {...getRootProps()}
          height={"100%"}
          userSelect={"none"}
          width={"100%"}
          flexDir={"row"}
          alignContent={"center"}
          justifyContent={"center"}
          columnGap={1}
          m={"auto"}
          p={0}
          minH={"100px"}
        >
          {settings.map((obj) => {
            return (
              <SettingsRadio
                fontSize={"15px"}
                settingName={obj.settingName}
                {...getRadioProps({ value: obj.settingValue.toString() })}
                key={obj.settingName}
              ></SettingsRadio>
            );
          })}
        </Flex>
      </SettingsElement>
    </>
  );
};

export default ChoiceSettings;
