import {
  Box,
  Link,
  Divider,
  Flex,
  Text,
  VStack,
  Tooltip,
} from "@chakra-ui/react";
import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import SettingsIconVertical from "./SettingsIconVertical.tsx";
import { ReaderTheme } from "./ReaderThemes.ts";
import { isMobileSafari, isSafari } from "react-device-detect";

interface SettingsBarVerticalProps {
  settingsWindowHidden: boolean;
  setSettingsWindowHidden: React.Dispatch<React.SetStateAction<boolean>>;
  readerTheme: ReaderTheme;
}

const SettingsBarVertical: React.FC<SettingsBarVerticalProps> = ({
  setSettingsWindowHidden,
  settingsWindowHidden,
  readerTheme,
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
      bgColor={readerTheme.mainBgColor}
      borderColor={readerTheme.settingsBarBorderColor}
      borderLeftWidth={"2px"}
      //maxHeight={windowMaxHeight}
      height={isSafari && !isMobileSafari ? "calc(100% - 6px)" : "100%"}
      zIndex={2}
      right={"0px"}
      position={"fixed"}
      width={"50px"}
      onMouseDown={disableDoubleClickSelection}
    >
      <VStack
        textColor={readerTheme.mainTextColor}
        width={"inherit"}
        height={"inherit"}
        maxHeight={"inherit"}
        alignItems={"center"}
        justifyContent={"center"}
        sx={{ writingMode: "horizontal-tb" }}
        py={4}
        px={3}
      >
        <Tooltip
          hasArrow
          label={"閉じる"}
          fontSize={"small"}
          placement={"left"}
          backgroundColor={readerTheme.toolTipStyle.bgColor}
          textColor={readerTheme.toolTipStyle.textColor}
          sx={{ writingMode: "vertical-rl" }}
          marginRight={isSafari ? "20px" : "unset"}
        >
          <Flex
            minWidth={"50px"}
            sx={{ _hover: { color: readerTheme.settingsBarHoverColor } }}
            cursor={"pointer"}
          >
            <CloseIcon
              m={"auto"}
              fontSize={"15px"}
              minWidth={"35px"}
              color={"inherit"}
            ></CloseIcon>
          </Flex>
        </Tooltip>

        <Divider orientation="horizontal" pt={3}></Divider>

        <Flex
          width={"inherit"}
          flexDir={"row-reverse"}
          justifyContent={"center"}
          flexGrow={1}
          flexShrink={1}
          mt={4}
          lineHeight={"1.1"}
          minHeight={0}
        >
          <Link
            display={"block"}
            fontSize={"13px"}
            transition="transform 0.15s ease-out, fontWeight 0.15s ease-out"
            sx={{
              writingMode: "vertical-rl",
            }}
            _hover={{
              textDecorationLine: "none",
              textColor: readerTheme.settingsBarHoverColor,
              textDecorationStyle: "none",
            }}
            href="https://github.com/chakra-ui/chakra-ui/issues/6173"
            textOverflow={"ellipsis"}
            height={"inherit"}
            whiteSpace={"nowrap"}
            overflow={"hidden"}
          >
            シリーズのタイトル
          </Link>

          <Text
            display={"block"}
            fontSize={"13px"}
            color={readerTheme.subTitleTextColor}
            sx={{ writingMode: "vertical-rl" }}
            textOverflow={"ellipsis"}
            height={"inherit"}
            whiteSpace={"nowrap"}
            overflow={"hidden"}
          >
            章チャプターのタイトル
          </Text>
        </Flex>

        <Flex flexDir={"column"} alignItems={"center"} flexBasis={"35px"}>
          <Tooltip
            hasArrow
            label={"ビューワー設定"}
            fontSize={"small"}
            placement={"left"}
            backgroundColor={readerTheme.toolTipStyle.bgColor}
            textColor={readerTheme.toolTipStyle.textColor}
            sx={{ writingMode: "vertical-rl" }}
            marginRight={isSafari ? "20px" : "unset"}
          >
            <Flex
              minW={"50px"}
              sx={{ _hover: { color: readerTheme.settingsBarHoverColor } }}
              color={
                settingsWindowHidden
                  ? readerTheme.mainTextColor
                  : readerTheme.settingsBarHoverColor
              }
              cursor={"pointer"}
              onClick={handleSettingIconClick}
            >
              <SettingsIconVertical
                m={"auto"}
                fontSize={"35px"}
                color={"inherit"}
              ></SettingsIconVertical>
            </Flex>
          </Tooltip>
          <Tooltip
            hasArrow
            label={"目次"}
            fontSize={"small"}
            placement={"left"}
            backgroundColor={readerTheme.toolTipStyle.bgColor}
            textColor={readerTheme.toolTipStyle.textColor}
            sx={{ writingMode: "vertical-rl" }}
            marginRight={isSafari ? "20px" : "unset"}
          >
            <Flex
              minW={"50px"}
              mt={3}
              sx={{ _hover: { color: readerTheme.settingsBarHoverColor } }}
              cursor={"pointer"}
            >
              <HamburgerIcon
                mx={"auto"}
                fontSize={"25px"}
                minWidth={"35px"}
              ></HamburgerIcon>
            </Flex>
          </Tooltip>
        </Flex>
      </VStack>
    </Box>
  );
};

export default SettingsBarVertical;
