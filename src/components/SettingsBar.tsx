import { Box, Link, Divider, Flex, Text, VStack } from "@chakra-ui/react";
import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import SettingsIconVertical from "./SettingsIconVertical";
import { ReaderThemes } from "./ReaderThemes.tsx";

interface SettingsBarProps {
  settingsWindowHidden: boolean;
  setSettingsWindowHidden: React.Dispatch<React.SetStateAction<boolean>>;
  setReaderTheme: React.Dispatch<React.SetStateAction<ReaderThemes>>;
  windowMaxHeight: number;
}

const SettingsBar: React.FC<SettingsBarProps> = ({
  //setReaderTheme,
  setSettingsWindowHidden,
  settingsWindowHidden,
  windowMaxHeight,
}) => {
  const handleSettingIconClick = () => {
    setSettingsWindowHidden(!settingsWindowHidden);
  };

  const disableDoubleClickSelection = (
    event: React.MouseEvent<HTMLElement>
  ) => {
    if (event.detail > 1) {
      event.preventDefault();
    }
  };

  return (
    <Box
      bgColor={"white"}
      borderColor={"blackAlpha.300"}
      borderLeftWidth={"2px"}
      maxHeight={windowMaxHeight}
      height={"100%"}
      right={"0px"}
      position={"sticky"}
      hidden={false}
      width={"50px"}
      sx={{ writingMode: "horizontal-tb" }}
      onMouseDown={disableDoubleClickSelection}
    >
      <VStack
        textColor={"black"}
        width={"inherit"}
        height={"inherit"}
        alignItems={"center"}
        py={4}
        pr={0}
      >
        <CloseIcon
          fontSize={"15px"}
          sx={{ _hover: { color: "cyan.500" } }}
          _focus={{ boxShadow: "outline" }}
        ></CloseIcon>

        <Divider orientation="horizontal" pt={3}></Divider>

        <Flex
          width={"inherit"}
          flexDir={"row-reverse"}
          justifyContent={"center"}
          flex={1}
          mt={4}
          lineHeight={1.2}
        >
          <Link
            fontSize={"13px"}
            transition="transform 0.15s ease-out, fontWeight 0.15s ease-out"
            display={"inline-block"}
            sx={{
              writingMode: "vertical-rl",
            }}
            _hover={{
              textDecorationLine: "overline",
              textColor: "cyan.500",
              textDecorationStyle: "none",
            }}
            href="https://github.com/chakra-ui/chakra-ui/issues/6173"
          >
            第シリーズのタイトル
          </Link>

          <Text
            display={"block"}
            fontSize={"13px"}
            color={"blackAlpha.700"}
            sx={{ writingMode: "vertical-rl" }}
            as={"span"}
          >
            章チャプターのタイトル
          </Text>
        </Flex>

        <Flex flexDir={"column"} alignItems={"center"} mt={"20vh"}>
          <SettingsIconVertical
            sx={{ _hover: { color: "cyan.500" } }}
            _focus={{ boxShadow: "outline" }}
            fontSize={"35px"}
            color={settingsWindowHidden ? "black" : "cyan.500"}
            onClick={handleSettingIconClick}
          ></SettingsIconVertical>
          <HamburgerIcon fontSize={"19px"} mt={3}></HamburgerIcon>
        </Flex>
      </VStack>
    </Box>
  );
};

export default SettingsBar;
