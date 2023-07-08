import { Box, List, ListItem, Text } from "@chakra-ui/react";

interface ChoiceSettingsProps {
  settingHeader: string;
  settingOneName: string;
  settingTwoName: string;
  setSetting: React.Dispatch<React.SetStateAction<string>>;
  selectedSetting: number;
  setSelectedSetting: React.Dispatch<React.SetStateAction<number>>;
  settingsArray: Array<any>;
}

const ChoiceSettings: React.FC<ChoiceSettingsProps> = ({
  settingHeader,
  settingOneName,
  settingTwoName,
  setSetting,
  selectedSetting,
  setSelectedSetting,
  settingsArray,
}) => {
  const handleSettingChange = (chosenSetting: number) => {
    if (chosenSetting != selectedSetting) {
      setSetting(settingsArray[chosenSetting - 1]);
      setSelectedSetting(chosenSetting);
    }
  };
  const handleSettingOneClick = (event: React.MouseEvent<HTMLLIElement>) => {
    event.preventDefault();
    event.stopPropagation();
    handleSettingChange(1);
  };
  const handleSettingTwoClick = (event: React.MouseEvent<HTMLLIElement>) => {
    event.preventDefault();
    event.stopPropagation();
    handleSettingChange(2);
  };

  return (
    <Box
      h={"fit-content"}
      display={"flex"}
      flexDir={"row-reverse"}
      alignItems={"center"}
      border={"1px"}
      rounded={10}
      minWidth={"100%"}
      minH={"20%"}
      height={"auto"}
      p={1}
      userSelect={"none"}
      cursor={"default"}
    >
      <Text
        fontSize={"12px"}
        lineHeight={"normal"}
        sx={{
          writingMode: "vertical-rl",
        }}
        cursor={"default"}
        fontWeight={"semibold"}
      >
        {settingHeader}
      </Text>
      <List
        display={"flex"}
        height={"100%"}
        userSelect={"none"}
        width={"100%"}
        flexDir={"row"}
        alignContent={"center"}
        justifyContent={"center"}
        columnGap={1}
        m={"auto"}
        p={0}
      >
        <ListItem
          display={"flex"}
          fontSize={"15px"}
          minH={"100%"}
          minW={"45%"}
          border={"1px"}
          sx={{
            WebkitTransform: "translate3d(0, 0, 0) !important",
          }}
          borderColor={selectedSetting == 1 ? "cyan.500" : "unset"}
          _hover={{
            borderColor: "cyan.500",
          }}
          cursor={"pointer"}
          onClick={handleSettingOneClick}
        >
          <Text as={"span"} m={"auto"} sx={{ writingMode: "vertical-rl" }}>
            {settingOneName}
          </Text>
        </ListItem>
        <ListItem
          display={"flex"}
          py={1}
          fontSize={"15px"}
          minH={"100%"}
          minW={"45%"}
          border={"1px"}
          sx={{
            WebkitTransform: "translate3d(0, 0, 0) !important",
          }}
          borderColor={selectedSetting == 2 ? "cyan.500" : "unset"}
          _hover={{
            borderColor: "cyan.500",
          }}
          cursor={"pointer"}
          onClick={handleSettingTwoClick}
        >
          <Text as={"span"} m={"auto"} sx={{ writingMode: "vertical-rl" }}>
            {settingTwoName}
          </Text>
        </ListItem>
      </List>
    </Box>
  );
};

export default ChoiceSettings;
