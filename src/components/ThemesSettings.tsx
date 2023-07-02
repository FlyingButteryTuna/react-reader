import { Box } from "@chakra-ui/react";

interface ReaderThemesSettingsProps {}

const ReaderThemesSettings: React.FC<ReaderThemesSettingsProps> = () => {
  return (
    <Box
      display={"flex"}
      flexDir={"column"}
      flexGrow={1}
      border={"1px"}
      rounded={10}
      my={2}
      ml={2}
    ></Box>
  );
};

export default ReaderThemesSettings;
