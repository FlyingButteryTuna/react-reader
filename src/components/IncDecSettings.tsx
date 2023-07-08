import { Box, List, ListItem, Text } from "@chakra-ui/react";
import FontSizeCircles from "./FontSizeCircles";

interface IncDecSettingsProps {
  setSetting: React.Dispatch<React.SetStateAction<string>>;
  setSelected: React.Dispatch<React.SetStateAction<number>>;
  numberOfSizes: number;
  selectedSetting: number;
  settingsArray: string[];
  settingHeader: string;
  forceRepaint: boolean;
}

const IncDecSettings: React.FC<IncDecSettingsProps> = ({
  setSetting,
  setSelected,
  numberOfSizes,
  selectedSetting,
  settingsArray,
  settingHeader,
  forceRepaint,
}) => {
  const handleIncrese = (event: React.MouseEvent<HTMLLIElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (selectedSetting < numberOfSizes) {
      let newSetting = selectedSetting + 1;
      setSelected(newSetting);
      setSetting(settingsArray[newSetting - 1]);
    }
  };

  const handleDecrese = (event: React.MouseEvent<HTMLLIElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (selectedSetting > 1) {
      let newSetting = selectedSetting - 1;
      setSelected(newSetting);
      setSetting(settingsArray[newSetting - 1]);
    }
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
          display={"flex"}
          m={"auto"}
          fontSize={"25px"}
          minW={"45%"}
          h={"60%"}
          border={"1px"}
          sx={{
            WebkitTransform: "translate3d(0, 0, 0) !important",
          }}
          _hover={{
            borderColor: "cyan.500",
          }}
          onClick={handleIncrese}
          cursor={"pointer"}
        >
          <Text as={"span"} m={"auto"}>
            ＋
          </Text>
        </ListItem>
        <ListItem
          display={"flex"}
          m={"auto"}
          fontSize={"25px"}
          minW={"45%"}
          h={"60%"}
          border={"1px"}
          sx={{
            WebkitTransform: "translate3d(0, 0, 0) !important",
          }}
          _hover={{
            borderColor: "cyan.500",
          }}
          onClick={handleDecrese}
          cursor={"pointer"}
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
          <FontSizeCircles
            numberOfSizes={numberOfSizes}
            selectedSize={selectedSetting}
          ></FontSizeCircles>
        </Box>
      </List>
    </Box>
  );
};

export default IncDecSettings;
