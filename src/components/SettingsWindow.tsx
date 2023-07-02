import { Box, Button, Text, useMediaQuery } from "@chakra-ui/react";
import { useState } from "react";
import IncDecSettings from "./IncDecSettings";
import ReaderThemesSettings from "./ThemesSettings";

interface SettingsWindowProps {
  isHidden: boolean;
  setReaderFontSize: React.Dispatch<React.SetStateAction<string>>;
  setReaderLineSpacing: React.Dispatch<React.SetStateAction<string>>;
  setReaderVMargins: React.Dispatch<React.SetStateAction<string>>;
  setSettingsWindowHidden: React.Dispatch<React.SetStateAction<boolean>>;
}

const SettingsWindow: React.FC<SettingsWindowProps> = ({
  isHidden,
  setReaderFontSize,
  setReaderLineSpacing,
  setReaderVMargins,
  setSettingsWindowHidden,
}) => {
  const [isLargerThan640] = useMediaQuery("(min-width: 640px)");

  const numberOfSizes = 7;

  const [selectedFontSize, setSelectedFontSize] = useState(6);
  const fontSizes = ["13px", "15px", "16px", "17px", "20px", "23px", "26px"];

  const [selectedLineSpacing, setSelectedLineSpacing] = useState(6);
  const lineSpaces = ["125%", "140%", "155%", "170%", "185%", "200%", "215%"];

  const [selectedVMargins, setSelectedVMargins] = useState(2);
  const vMargins = ["2vh", "5vh", "8vh", "11vh", "14vh", "17vh", "20vh"];

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
      m={"auto"}
      top={0}
      bottom={0}
      left={0}
      right={0}
      rounded={"10px"}
      textColor={"white"}
      zIndex={1000}
      flexDir={"column"}
      rowGap={"2"}
      minWidth={"249px"}
      onClick={handleStopPropagation}
      onMouseDown={disableDoubleClickSelection}
    >
      <Box
        display={"flex"}
        w={"20%"}
        borderLeft={"1px"}
        borderLeftColor={"white"}
        h={"100%"}
        roundedRight={"inherit"}
        mx={"auto"}
        alignItems={"center"}
      >
        <Text
          lineHeight={"0"}
          pt={"10%"}
          fontSize={"18px"}
          pr={isLargerThan640 ? "none" : 1}
        >
          ビューワー設定
        </Text>

        <Button
          display={"flex"}
          mt={"auto"}
          mb={2}
          w={"fit-content"}
          h={"10%"}
          rounded={"base"}
          variant={"solid"}
          py={2}
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
      >
        <IncDecSettings
          setSetting={setReaderFontSize}
          setSelected={setSelectedFontSize}
          numberOfSizes={numberOfSizes}
          selectedSetting={selectedFontSize}
          settingsArray={fontSizes}
          settingHeader={"文字サイズ"}
          forceRepaint={true}
        ></IncDecSettings>

        <IncDecSettings
          setSetting={setReaderLineSpacing}
          setSelected={setSelectedLineSpacing}
          numberOfSizes={numberOfSizes}
          selectedSetting={selectedLineSpacing}
          settingsArray={lineSpaces}
          settingHeader={"行間サイズ"}
          forceRepaint={true}
        ></IncDecSettings>

        <IncDecSettings
          setSetting={setReaderVMargins}
          setSelected={setSelectedVMargins}
          numberOfSizes={numberOfSizes}
          selectedSetting={selectedVMargins}
          settingsArray={vMargins}
          settingHeader={"余白サイズ"}
          forceRepaint={true}
        ></IncDecSettings>
      </Box>

      <ReaderThemesSettings></ReaderThemesSettings>
    </Box>
  );
};

export default SettingsWindow;
