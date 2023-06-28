import { Box, Link, Divider, Flex, Text, VStack } from "@chakra-ui/react";
import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import SettingsIconVertical from "./SettingsIconVertical";
import { ReaderThemes } from "./ReaderThemes.tsx";

interface SettingsBarProps {
  settingsWindowHidden: boolean;
  setSettingsWindowHidden: React.Dispatch<React.SetStateAction<boolean>>;
  setReaderTheme: React.Dispatch<React.SetStateAction<ReaderThemes>>;
}

const SettingsBar: React.FC<SettingsBarProps> = ({
  setReaderTheme,
  setSettingsWindowHidden,
  settingsWindowHidden,
}) => {
  const handleSettingIconClick = (event: React.MouseEvent<SVGElement>) => {
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
      minH={"100%"}
      right={"0px"}
      position={"fixed"}
      hidden={false}
      width={"50px"}
      onMouseDown={disableDoubleClickSelection}
    >
      <VStack
        py={4}
        px={3}
        textColor={"black"}
        width={"inherit"}
        height={"100vh"}
        maxHeight={window.innerHeight}
        m={0}
      >
        <CloseIcon
          fontSize={"15px"}
          sx={{ _hover: { color: "cyan.500" } }}
          _focus={{ boxShadow: "outline" }}
        ></CloseIcon>
        <Divider orientation="horizontal" pt={3}></Divider>
        <Flex
          flexDir={"row-reverse"}
          width={"inherit"}
          justifyContent={"center"}
          pt={3}
          pr={0.5}
        >
          <Link
            fontSize={"13px"}
            sx={{
              writingMode: "vertical-rl",
              overflowWrap: "break-word",
            }}
            lineHeight={"140%"}
            transition="transform 0.15s ease-out, fontWeight 0.15s ease-out"
            _hover={{
              transform: "scale(1.02, 1.02)",
              fontWeight: "semibold",
              textDecorationStyle: "none",
            }}
            href="https://github.com/chakra-ui/chakra-ui/issues/6173"
          >
            第シリーズのタイトル
          </Link>

          <Text
            fontSize={"13px"}
            sx={{
              writingMode: "vertical-rl",
              overflowWrap: "break-word",
            }}
            lineHeight={"140%"}
            color={"blackAlpha.700"}
          >
            章チャプターのタイトル
          </Text>
        </Flex>

        <Flex
          w={"inherit"}
          flexDir={"column"}
          alignItems={"center"}
          flexGrow={"1"}
          maxHeight={"100%"}
          justifyContent={"end"}
          flexWrap={"nowrap"}
        >
          <SettingsIconVertical
            sx={{ _hover: { color: "cyan.500" } }}
            _focus={{ boxShadow: "outline" }}
            fontSize={"35px"}
            color={settingsWindowHidden ? "black" : "cyan.500"}
            onClick={handleSettingIconClick}
          ></SettingsIconVertical>
          <HamburgerIcon mt={3}></HamburgerIcon>
        </Flex>
      </VStack>
    </Box>
  );
};

export default SettingsBar;
