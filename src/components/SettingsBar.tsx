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
import SettingsIconVertical from "./SettingsIconVertical";
import { ReaderTheme } from "./ReaderThemes.ts";

interface SettingsBarProps {
  settingsWindowHidden: boolean;
  setSettingsWindowHidden: React.Dispatch<React.SetStateAction<boolean>>;
  setReaderTheme: React.Dispatch<React.SetStateAction<ReaderTheme>>;
  windowMaxHeight: number;
  readerTheme: ReaderTheme;
}

const SettingsBar: React.FC<SettingsBarProps> = ({
  //setReaderTheme,
  setSettingsWindowHidden,
  settingsWindowHidden,
  windowMaxHeight,
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
        textColor={readerTheme.mainTextColor}
        width={"inherit"}
        height={"inherit"}
        maxHeight={"inherit"}
        alignItems={"center"}
        justifyContent={"center"}
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
        >
          <CloseIcon
            minWidth={"35px"}
            fontSize={"15px"}
            sx={{ _hover: { color: readerTheme.settingsBarHoverColor } }}
            _focus={{ boxShadow: "outline" }}
            cursor={"pointer"}
          ></CloseIcon>
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
          >
            <SettingsIconVertical
              sx={{ _hover: { color: readerTheme.settingsBarHoverColor } }}
              _focus={{ boxShadow: "outline" }}
              fontSize={"35px"}
              color={
                settingsWindowHidden
                  ? readerTheme.mainTextColor
                  : readerTheme.settingsBarHoverColor
              }
              onClick={handleSettingIconClick}
              cursor={"pointer"}
            ></SettingsIconVertical>
          </Tooltip>
          <Tooltip
            hasArrow
            label={"目次"}
            fontSize={"small"}
            placement={"left"}
            backgroundColor={readerTheme.toolTipStyle.bgColor}
            textColor={readerTheme.toolTipStyle.textColor}
          >
            <HamburgerIcon
              fontSize={"25px"}
              mt={3}
              minWidth={"35px"}
            ></HamburgerIcon>
          </Tooltip>
        </Flex>
      </VStack>
    </Box>
  );
};

export default SettingsBar;
