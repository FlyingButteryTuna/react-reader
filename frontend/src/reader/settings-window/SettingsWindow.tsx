import { Box, Button, Text, useMediaQuery } from "@chakra-ui/react";
import IncDecSettings from "./settings-reader/IncDecSettings.tsx";
import ReaderThemesSettings from "./settings-reader/ThemesSettings.tsx";
import {
  readerModes,
  fontSizes,
  lineSpaces,
  vMargins,
  myoucyouFont,
  gothicFont,
} from "../settings-consts/readerSettings.ts";
import ChoiceSettings from "./settings-reader/ChoiceSettings.tsx";
import { useReaderSettings } from "../states/readerSettings.ts";
import { isMobileSafari } from "react-device-detect";
import { useWindowVisibility } from "../states/miscReaderStates.ts";
import React from "react";

const SettingsWindow = () => {
  const isWindowHidden = useWindowVisibility((state) => state.isWindowHidden);
  const toggleWindowVisibility = useWindowVisibility(
    (state) => state.toggleWindowVisibility
  );
  const [isLargerThan640] = useMediaQuery("(min-width: 640px)");

  const selectedFontSize = useReaderSettings(
    (state) => fontSizes.indexOf(state.fontSize) + 1
  );
  const selectedLineSpacing = useReaderSettings(
    (state) => lineSpaces.indexOf(state.lineSpacing) + 1
  );
  const selectedVMargins = useReaderSettings(
    (state) => vMargins.indexOf(state.vMargins) + 1
  );
  const readerMode = useReaderSettings((state) => state.mode);
  const readerTheme = useReaderSettings((state) => state.theme);

  const fontSettings = [
    { settingValue: myoucyouFont, settingName: "明朝" },
    { settingValue: gothicFont, settingName: "ゴシック" },
  ];
  const modeSettings = [
    { settingValue: readerModes.Tategumi.toString(), settingName: "縦組み" },
    { settingValue: readerModes.Yokogumi.toString(), settingName: "横組み" },
  ];

  const handleStopPropagation = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
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
      zIndex={3}
      bgColor={"black"}
      position={"fixed"}
      display={"flex"}
      hidden={isWindowHidden}
      maxWidth={"270px"}
      maxHeight={"500px"}
      bottom={0}
      top={0}
      right={0}
      left={0}
      m={"auto"}
      columnGap={2}
      rounded={"10px"}
      textColor={"white"}
      flexDir={"row-reverse"}
      minWidth={"249px"}
      border={"2px"}
      borderColor={"aqua"}
      boxShadow={"0 0 300px #333"}
      sx={{ writingMode: "horizontal-tb" }}
      onClick={handleStopPropagation}
      onMouseDown={disableDoubleClickSelection}
    >
      <Box
        display={"flex"}
        flexDir={"column"}
        w={"20%"}
        borderLeft={"1px"}
        borderLeftColor={"white"}
        h={"inherit"}
        roundedRight={"inherit"}
        alignItems={"center"}
        pt={10}
        pb={2}
      >
        <Text
          lineHeight={"short"}
          fontSize={"18px"}
          pr={isLargerThan640 ? "none" : 1}
          sx={{ writingMode: "vertical-rl" }}
        >
          ビューワー設定
        </Text>

        <Button
          display={"flex"}
          mt={"auto"}
          w={"fit-content"}
          h={"10%"}
          rounded={"base"}
          variant={"solid"}
          px={"0px"}
          onClick={toggleWindowVisibility}
        >
          <Text
            lineHeight={"short"}
            fontSize={"13px"}
            sx={{
              writingMode: "vertical-rl",
            }}
          >
            終了
          </Text>
        </Button>
      </Box>

      <Box
        display={"flex"}
        py={2}
        px={0}
        maxWidth={"108px"}
        width={"auto"}
        flexDir={"column"}
        justifyContent={"space-between"}
        sx={{
          writingMode: "horizontal-tb",
        }}
        overflow={"auto"}
      >
        <IncDecSettings
          selectedSetting={selectedFontSize}
          settingsArray={fontSizes}
          settingHeader={"文字サイズ"}
          forceRepaint={true}
          lockSetting={false}
          increaseFunc={useReaderSettings((state) => state.increaseFontSize)}
          decreaseFunc={useReaderSettings((state) => state.decreaseFontSize)}
        ></IncDecSettings>

        <IncDecSettings
          selectedSetting={selectedLineSpacing}
          settingsArray={lineSpaces}
          settingHeader={"行間サイズ"}
          forceRepaint={true}
          lockSetting={false}
          increaseFunc={useReaderSettings((state) => state.increaseLineSpacing)}
          decreaseFunc={useReaderSettings((state) => state.decreaseLineSpacing)}
        ></IncDecSettings>

        <IncDecSettings
          selectedSetting={selectedVMargins}
          settingsArray={vMargins}
          settingHeader={"余白サイズ"}
          forceRepaint={true}
          lockSetting={readerMode != readerModes.Tategumi}
          increaseFunc={useReaderSettings((state) => state.increaseVMargins)}
          decreaseFunc={useReaderSettings((state) => state.decreaseVmargins)}
        ></IncDecSettings>

        <ChoiceSettings
          settingHeader={"フォント"}
          settings={fontSettings}
          setSetting={useReaderSettings((state) => state.setFontStyle)}
          defaultValue={useReaderSettings((state) => state.font)}
          shouldToggleScrollRestoration={false}
        ></ChoiceSettings>

        <ChoiceSettings
          settingHeader={"組み方向"}
          settings={modeSettings}
          setSetting={useReaderSettings((state) => state.setMode)}
          defaultValue={readerMode.toString()}
          shouldToggleScrollRestoration={isMobileSafari}
        ></ChoiceSettings>
      </Box>

      <ReaderThemesSettings
        setReaderTheme={useReaderSettings((state) => state.setTheme)}
        readerTheme={readerTheme}
      ></ReaderThemesSettings>
    </Box>
  );
};

export default SettingsWindow;
