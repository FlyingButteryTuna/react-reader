import { Box, Button, Text, useMediaQuery } from "@chakra-ui/react";
import { useState } from "react";
import IncDecSettings from "./IncDecSettings";
import ReaderThemesSettings from "./ThemesSettings";
import {
  ReaderTheme,
  myoucyouFont,
  gothicFont,
  readerModes,
} from "./ReaderThemes.ts";
import ChoiceSettings from "./ChoiceSettings.tsx";

interface SettingsWindowProps {
  isHidden: boolean;
  setReaderFontSize: React.Dispatch<React.SetStateAction<string>>;
  setReaderLineSpacing: React.Dispatch<React.SetStateAction<string>>;
  setReaderVMargins: React.Dispatch<React.SetStateAction<string>>;
  setReaderFont: React.Dispatch<React.SetStateAction<string>>;
  setSettingsWindowHidden: React.Dispatch<React.SetStateAction<boolean>>;
  setReaderTheme: React.Dispatch<React.SetStateAction<ReaderTheme>>;
  setReaderMode: React.Dispatch<React.SetStateAction<readerModes>>;
  setShouldScrollToStart: React.Dispatch<React.SetStateAction<boolean>>;
  readerMode: readerModes;
  readerTheme: ReaderTheme;
}

const SettingsWindow: React.FC<SettingsWindowProps> = ({
  isHidden,
  setReaderFontSize,
  setReaderLineSpacing,
  setReaderVMargins,
  setReaderFont,
  setSettingsWindowHidden,
  setReaderTheme,
  setReaderMode,
  readerMode,
  readerTheme,
  setShouldScrollToStart,
}) => {
  const [isLargerThan640] = useMediaQuery("(min-width: 640px)");

  const numberOfSizes = 7;

  const [selectedFontSize, setSelectedFontSize] = useState(6);
  const fontSizes = ["13px", "15px", "16px", "17px", "20px", "23px", "26px"];

  const [selectedLineSpacing, setSelectedLineSpacing] = useState(6);
  const lineSpaces = ["125%", "140%", "155%", "170%", "185%", "200%", "215%"];

  const [selectedVMargins, setSelectedVMargins] = useState(4);
  const vMargins = ["1vh", "3vh", "6vh", "8vh", "10vh", "13vh", "16vh"];

  const [selectedFont, setSelectedFont] = useState(1);
  const fonts = [myoucyouFont, gothicFont];

  const [selectedReaderMode, setSelectedReaderMode] = useState(
    readerModes.Tategumi
  );
  const readerModesArr = [readerModes.Tategumi, readerModes.Yokogumi];

  const handleStopPropagation = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    event.preventDefault();
  };

  const disableDoubleClickSelection = (
    event: React.MouseEvent<HTMLElement>
  ) => {
    if (event.detail > 1) {
      event.preventDefault();
    }
  };

  const handleCloseSettingsOnClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation();
    if (!isHidden) {
      setSettingsWindowHidden(!isHidden);
    }
  };

  return (
    <Box
      bgColor={"black"}
      position={"fixed"}
      display={"flex"}
      hidden={isHidden}
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
      zIndex={3}
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
          onClick={handleCloseSettingsOnClick}
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
          setSetting={setReaderFontSize}
          setSelected={setSelectedFontSize}
          numberOfSizes={numberOfSizes}
          selectedSetting={selectedFontSize}
          settingsArray={fontSizes}
          settingHeader={"文字サイズ"}
          forceRepaint={true}
          lockSetting={false}
        ></IncDecSettings>

        <IncDecSettings
          setSetting={setReaderLineSpacing}
          setSelected={setSelectedLineSpacing}
          numberOfSizes={numberOfSizes}
          selectedSetting={selectedLineSpacing}
          settingsArray={lineSpaces}
          settingHeader={"行間サイズ"}
          forceRepaint={true}
          lockSetting={false}
        ></IncDecSettings>

        <IncDecSettings
          setSetting={setReaderVMargins}
          setSelected={setSelectedVMargins}
          numberOfSizes={numberOfSizes}
          selectedSetting={selectedVMargins}
          settingsArray={vMargins}
          settingHeader={"余白サイズ"}
          forceRepaint={true}
          lockSetting={readerMode == readerModes.Tategumi ? false : true}
        ></IncDecSettings>

        <ChoiceSettings
          settingHeader={"フォント"}
          settingOneName={"明朝"}
          settingTwoName={"ゴシック"}
          setSetting={setReaderFont}
          selectedSetting={selectedFont}
          setSelectedSetting={setSelectedFont}
          settingsArray={fonts}
          shouldScrollToStart={false}
          setShouldScrollToStart={undefined}
        ></ChoiceSettings>

        <ChoiceSettings
          settingHeader={"組み方向"}
          settingOneName={"縦組み"}
          settingTwoName={"横組み"}
          setSetting={setReaderMode}
          selectedSetting={selectedReaderMode}
          setSelectedSetting={setSelectedReaderMode}
          settingsArray={readerModesArr}
          shouldScrollToStart={true}
          setShouldScrollToStart={setShouldScrollToStart}
        ></ChoiceSettings>
      </Box>

      <ReaderThemesSettings
        setReaderTheme={setReaderTheme}
        readerTheme={readerTheme}
      ></ReaderThemesSettings>
    </Box>
  );
};

export default SettingsWindow;
