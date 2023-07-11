import {
  Box,
  Link,
  Divider,
  Flex,
  Text,
  Tooltip,
  PlacementWithLogical,
} from "@chakra-ui/react";
import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import SettingsIconVertical from "./SettingsIconVertical.tsx";
import { ReaderTheme } from "./ReaderThemes.ts";
import { isMobileSafari, isSafari } from "react-device-detect";
import { readerModes } from "./ReaderThemes.ts";

interface SettingsBarVerticalProps {
  settingsWindowHidden: boolean;
  setSettingsWindowHidden: React.Dispatch<React.SetStateAction<boolean>>;
  readerTheme: ReaderTheme;
  readerMode: readerModes;
}

const SettingsBar: React.FC<SettingsBarVerticalProps> = ({
  setSettingsWindowHidden,
  settingsWindowHidden,
  readerTheme,
  readerMode,
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

  const isTategumi = readerMode == readerModes.Tategumi;
  const isYokogumi = readerMode == readerModes.Yokogumi;
  const writingMode = isTategumi ? "vertical-rl" : "horizontal-tb";

  const iconWrapperProps = {
    minWidth: "50px",
    minHeight: "50px",
    sx: { ...{ _hover: { color: readerTheme.settingsBarHoverColor } } },
    cursor: "pointer",
    alignItems: "center",
  };

  const toolTipProps = {
    hasArrow: true,
    fontSize: "small",
    placement: isTategumi
      ? ("left" as PlacementWithLogical)
      : ("bottom" as PlacementWithLogical),
    backgroundColor: readerTheme.toolTipStyle.bgColor,
    textColor: readerTheme.toolTipStyle.textColor,
    sx: { ...{ writingMode: writingMode } },
    marginRight: isSafari && isTategumi ? "20px" : "unset",
  };

  return (
    <Box
      width={isTategumi ? "50px" : "100%"}
      height={
        isYokogumi
          ? "50px"
          : isSafari && !isMobileSafari
          ? "calc(100% - 6px)"
          : "100%"
      }
      bgColor={readerTheme.mainBgColor}
      borderLeftWidth={isTategumi ? "2px" : "0px"}
      borderBottomWidth={isYokogumi ? "2px" : "0px"}
      borderColor={readerTheme.settingsBarBorderColor}
      position={"fixed"}
      right={isTategumi ? "0px" : "unset"}
      top={isYokogumi ? "0px" : "unset"}
      zIndex={2}
      onMouseDown={disableDoubleClickSelection}
      sx={{
        writingMode: "horizontal-tb",
        WebkitTransform: "translate3d(0, 0, 0) !important",
      }}
    >
      <Flex
        flexDir={isTategumi ? "column" : "row"}
        width={"inherit"}
        height={"inherit"}
        textColor={readerTheme.mainTextColor}
        alignItems={"center"}
        justifyContent={"center"}
        px={isTategumi ? 3 : "unset"}
        py={isYokogumi ? 3 : "unset"}
      >
        <Tooltip {...toolTipProps} label={"閉じる"}>
          <Flex {...iconWrapperProps} onClick={() => {}}>
            <CloseIcon
              m={"auto"}
              fontSize={"15px"}
              color={"inherit"}
            ></CloseIcon>
          </Flex>
        </Tooltip>

        <Divider
          orientation={isTategumi ? "horizontal" : "vertical"}
          textColor={"unset"}
          borderColor={readerTheme.settingsBarDividerColor}
        ></Divider>

        <Flex
          width={"inherit"}
          height={"inherit"}
          flexDir={isTategumi ? "row-reverse" : "column"}
          justifyContent={"center"}
          flexGrow={1}
          lineHeight={"1.1"}
          pt={isTategumi ? 3 : "unset"}
          pl={isYokogumi ? 3 : "unset"}
        >
          <Link
            fontSize={"13px"}
            transition="transform 0.15s ease-out, fontWeight 0.15s ease-out"
            href="https://github.com/chakra-ui/chakra-ui/issues/6173"
            textOverflow={"ellipsis"}
            whiteSpace={"nowrap"}
            overflow={"hidden"}
            sx={{
              writingMode: writingMode,
            }}
            _hover={{
              textDecorationLine: "none",
              textColor: readerTheme.settingsBarHoverColor,
              textDecorationStyle: "none",
            }}
          >
            シリーズのタイトル
          </Link>

          <Text
            fontSize={"13px"}
            color={readerTheme.subTitleTextColor}
            sx={{ writingMode: writingMode }}
            textOverflow={"ellipsis"}
            whiteSpace={"nowrap"}
            overflow={"hidden"}
          >
            章チャプターのタイトル
          </Text>
        </Flex>

        <Flex
          flexDir={"inherit"}
          alignItems={"center"}
          mt={isTategumi ? "5vh" : "unset"}
          ml={isYokogumi ? "5vw" : "unset"}
        >
          <Tooltip {...toolTipProps} label={"ビューワー設定"}>
            <Flex {...iconWrapperProps} onClick={handleSettingIconClick}>
              <SettingsIconVertical
                m={"auto"}
                fontSize={"35px"}
                color={"inherit"}
              ></SettingsIconVertical>
            </Flex>
          </Tooltip>

          <Tooltip {...toolTipProps} label={"目次"}>
            <Flex {...iconWrapperProps} onClick={() => {}}>
              <HamburgerIcon
                mx={"auto"}
                fontSize={"25px"}
                minWidth={"35px"}
              ></HamburgerIcon>
            </Flex>
          </Tooltip>
        </Flex>
      </Flex>
    </Box>
  );
};

export default SettingsBar;
