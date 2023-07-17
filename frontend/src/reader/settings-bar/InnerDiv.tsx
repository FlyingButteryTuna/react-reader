import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import { useReaderSettings } from "../states/readerSettings.ts";
import { Divider, Flex } from "@chakra-ui/react";
import SettingsIconVertical from "./SettingsIconVertical.tsx";
import SettingsBarTooltip from "./SettingsBarTooltip.tsx";
import ChapterBreadcrumb from "./ChapterBreadcrumb.tsx";
import { useWindowVisibility } from "../states/miscReaderStates.ts";

const InnerDiv = (props: { isVertical: boolean }) => {
  const readerTheme = useReaderSettings((state) => state.theme);

  const toggleWindowVisibility = useWindowVisibility(
    (state) => state.toggleWindowVisibility
  );

  return (
    <Flex
      flexDir={props.isVertical ? "column" : "row"}
      width={"inherit"}
      height={"inherit"}
      textColor={readerTheme.mainTextColor}
      alignItems={"center"}
      justifyContent={"center"}
      px={props.isVertical ? 3 : "unset"}
      py={!props.isVertical ? 3 : "unset"}
    >
      <SettingsBarTooltip label={"閉じる"} isVertical={props.isVertical}>
        <CloseIcon m={"auto"} fontSize={"15px"} color={"inherit"}></CloseIcon>
      </SettingsBarTooltip>

      <Divider
        orientation={props.isVertical ? "horizontal" : "vertical"}
        textColor={"unset"}
        borderColor={readerTheme.settingsBarDividerColor}
      ></Divider>

      <ChapterBreadcrumb
        seriesTitle="シリーズのタイトル"
        chapterTitle="この話のタイトル"
      ></ChapterBreadcrumb>

      <Flex
        flexDir={"inherit"}
        alignContent={"center"}
        mt={props.isVertical ? "5vh" : "unset"}
        ml={!props.isVertical ? "5vw" : "unset"}
      >
        <SettingsBarTooltip
          isVertical={props.isVertical}
          label={"ビューワー設定"}
          onClick={toggleWindowVisibility}
        >
          <SettingsIconVertical
            m={"auto"}
            fontSize={"35px"}
            color={"inherit"}
          ></SettingsIconVertical>
        </SettingsBarTooltip>

        <SettingsBarTooltip label={"目次"} isVertical={props.isVertical}>
          <HamburgerIcon
            mx={"auto"}
            fontSize={"25px"}
            minWidth={"35px"}
          ></HamburgerIcon>
        </SettingsBarTooltip>
      </Flex>
    </Flex>
  );
};

export default InnerDiv;
