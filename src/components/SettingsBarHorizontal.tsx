import {
  Box,
  Link,
  Divider,
  Flex,
  Text,
  Tooltip,
  HStack,
} from "@chakra-ui/react";
import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import SettingsIconVertical from "./SettingsIconVertical.tsx";
import { ReaderTheme } from "./ReaderThemes.ts";

interface SettingsBarHorizontalProps {
  settingsWindowHidden: boolean;
  setSettingsWindowHidden: React.Dispatch<React.SetStateAction<boolean>>;
  readerTheme: ReaderTheme;
}

const SettingsBarHorizontal: React.FC<SettingsBarHorizontalProps> = ({
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
      borderBottomWidth={"2px"}
      height={"50px"}
      top={"0px"}
      position={"fixed"}
      width={"100vw"}
      sx={{ writingMode: "horizontal-tb" }}
      zIndex={2}
      onMouseDown={disableDoubleClickSelection}
    >
      <HStack
        textColor={readerTheme.mainTextColor}
        width={"inherit"}
        height={"inherit"}
        alignItems={"center"}
        pl={"15px"}
        pr={2}
        py={3}
      >
        <Tooltip
          hasArrow
          label={"閉じる"}
          fontSize={"small"}
          placement={"bottom"}
          sx={{ writingMode: "horizontal-tb" }}
          backgroundColor={readerTheme.toolTipStyle.bgColor}
          textColor={readerTheme.toolTipStyle.textColor}
        >
          <Flex
            minHeight={"50px"}
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

        <Divider orientation="vertical"></Divider>

        <Flex
          flexDir={"column"}
          justifyContent={"center"}
          flexGrow={1}
          lineHeight={"short"}
          height={"inherit"}
        >
          <Link
            display={"block"}
            fontSize={"13px"}
            transition="transform 0.15s ease-out, fontWeight 0.15s ease-out"
            sx={{
              writingMode: "horizontal-tb",
            }}
            _hover={{
              textDecorationLine: "none",
              textColor: readerTheme.settingsBarHoverColor,
              textDecorationStyle: "none",
            }}
            href="https://github.com/chakra-ui/chakra-ui/issues/6173"
            textOverflow={"ellipsis"}
            height={"fit-content"}
            whiteSpace={"nowrap"}
            overflow={"hidden"}
          >
            シリーズのタイトル
          </Link>

          <Text
            display={"block"}
            fontSize={"13px"}
            color={readerTheme.subTitleTextColor}
            sx={{
              writingMode: "horizontal-tb",
            }}
            textOverflow={"ellipsis"}
            height={"fit-content"}
            whiteSpace={"nowrap"}
            overflow={"hidden"}
          >
            章チャプターのタイトル
          </Text>
        </Flex>

        <Flex
          flexDir={"row"}
          height={"inherit"}
          width={"100%"}
          justifyContent={"center"}
          alignItems={"center"}
          flexBasis={"35px"}
        >
          <Tooltip
            hasArrow
            label={"ビューワー設定"}
            fontSize={"small"}
            placement={"bottom"}
            backgroundColor={readerTheme.toolTipStyle.bgColor}
            textColor={readerTheme.toolTipStyle.textColor}
            sx={{ writingMode: "horizontal-tb" }}
          >
            <Flex
              minHeight={"50px"}
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
            placement={"bottom"}
            sx={{ writingMode: "horizontal-tb" }}
            backgroundColor={readerTheme.toolTipStyle.bgColor}
            textColor={readerTheme.toolTipStyle.textColor}
          >
            <Flex
              minHeight={"50px"}
              sx={{ _hover: { color: readerTheme.settingsBarHoverColor } }}
              cursor={"pointer"}
            >
              <HamburgerIcon
                m={"auto"}
                fontSize={"25px"}
                minWidth={"35px"}
                color={"inherit"}
              ></HamburgerIcon>
            </Flex>
          </Tooltip>
        </Flex>
      </HStack>
    </Box>
  );
};

export default SettingsBarHorizontal;
