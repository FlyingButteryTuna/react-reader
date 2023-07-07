import { Box } from "@chakra-ui/react";
import ThemeElement from "./ThemeElement";
import { themes, ReaderTheme } from "./ReaderThemes.ts";

interface ReaderThemesSettingsProps {
  setReaderTheme: React.Dispatch<React.SetStateAction<ReaderTheme>>;
  readerTheme: ReaderTheme;
}

const ReaderThemesSettings: React.FC<ReaderThemesSettingsProps> = ({
  setReaderTheme,
  readerTheme,
}) => {
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
      sx={{
        writingMode: "horizontal-tb",
      }}
      justifyContent={"space-between"}
      textAlign={"center"}
    >
      {Object.entries(themes).map((value, i) => {
        return (
          <ThemeElement
            theme={value[1]}
            isSelected={value[1] == readerTheme ? true : false}
            setReaderTheme={setReaderTheme}
            key={i}
          ></ThemeElement>
        );
      })}
    </Box>
  );
};

export default ReaderThemesSettings;
