import { Box, List, ListItem, Text } from "@chakra-ui/react";
import SettingsCircles from "./SettingsCircles";
import SettingsElement from "./SettingsElement";

interface IncDecSettingsProps {
  settingHeader: string;
  settingsArray: string[];
  selectedSetting: number;
  forceRepaint: boolean;
  lockSetting: boolean;
  increaseFunc: () => void;
  decreaseFunc: () => void;
}

const IncDecSettings: React.FC<IncDecSettingsProps> = ({
  settingHeader,
  settingsArray,
  selectedSetting,
  forceRepaint,
  lockSetting,
  increaseFunc,
  decreaseFunc,
}) => {
  const listItemProps = {
    display: "flex",
    m: "auto",
    fontSize: "25px",
    minW: "45%",
    h: "60%",
    border: "1px",
    cursor: lockSetting ? "not-allowed" : "pointer",
    _hover: {
      borderColor: lockSetting ? "unset" : "cyan.500",
    },
  };
  return (
    <SettingsElement lockSetting={lockSetting} settingHeader={settingHeader}>
      <List
        display={"flex"}
        height={"fit-content"}
        userSelect={"none"}
        flexDir={"row"}
        flexWrap={"wrap"}
        alignContent={"flex-start"}
        rowGap={1}
        columnGap={0}
        m={0}
        p={0}
      >
        <ListItem
          {...listItemProps}
          onClick={lockSetting ? () => {} : increaseFunc}
        >
          <Text as={"span"} m={"auto"}>
            ＋
          </Text>
        </ListItem>
        <ListItem
          {...listItemProps}
          onClick={lockSetting ? () => {} : decreaseFunc}
        >
          <Text as={"span"} m={"auto"}>
            ー
          </Text>
        </ListItem>

        <Box
          width={"100%"}
          height={"fit-content"}
          display={"flex"}
          mt={1}
          justifySelf={"flex-start"}
          flexDir={"row"}
          justifyContent={"space-between"}
          px={0.5}
          opacity={selectedSetting % 2 == 0 && forceRepaint ? "0.999" : "none"}
        >
          <SettingsCircles
            numberOfSizes={settingsArray.length}
            selectedSize={selectedSetting}
          ></SettingsCircles>
        </Box>
      </List>
    </SettingsElement>
  );
};

export default IncDecSettings;
