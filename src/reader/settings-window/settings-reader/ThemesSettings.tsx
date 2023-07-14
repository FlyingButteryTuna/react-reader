import { Box, useRadioGroup } from "@chakra-ui/react";
import { themes, ReaderTheme } from "../../settings-consts/readerThemes.ts";
import SettingsRadio from "./SettingsRadio.tsx";

interface ReaderThemesSettingsProps {
  setReaderTheme: (value: string) => void;
  readerTheme: ReaderTheme;
}

const ReaderThemesSettings: React.FC<ReaderThemesSettingsProps> = ({
  setReaderTheme,
  readerTheme,
}) => {
  const { getRadioProps, getRootProps } = useRadioGroup({
    defaultValue: readerTheme.themeName,
    onChange: setReaderTheme,
  });
  return (
    <Box
      display={"flex"}
      flexDir={"column"}
      flexGrow={1}
      border={"1px"}
      rounded={10}
      my={2}
      ml={2}
      p={"2"}
      rowGap={1}
      sx={{
        writingMode: "horizontal-tb",
      }}
      justifyContent={"space-between"}
      textAlign={"center"}
    >
      {Object.entries(themes).map((value, i) => {
        return (
          <Box width={"100%"} height={"100%"} key={i} {...getRootProps}>
            <SettingsRadio
              rounded={10}
              fontSize={"25px"}
              settingName={value[1].themeName}
              {...getRadioProps({ value: value[1].themeName })}
              key={i}
            ></SettingsRadio>
          </Box>
        );
      })}
    </Box>
  );
};

export default ReaderThemesSettings;
