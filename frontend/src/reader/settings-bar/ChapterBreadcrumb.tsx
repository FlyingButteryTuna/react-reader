import { readerModes } from "../settings-consts/readerSettings.ts";
import { useReaderSettings } from "../states/readerSettings.ts";
import { Link, Flex, Text } from "@chakra-ui/react";

interface ChapterBreadcrumbProps {
  seriesTitle: string;
  chapterTitle: string;
}

const ChapterBreadcrumb: React.FC<ChapterBreadcrumbProps> = ({
  seriesTitle,
  chapterTitle,
}) => {
  const readerMode = useReaderSettings((state) => state.mode);
  const readerTheme = useReaderSettings((state) => state.theme);

  const isTategumi = readerMode == readerModes.Tategumi;
  const isYokogumi = readerMode == readerModes.Yokogumi;
  const writingMode = isTategumi ? "vertical-rl" : "horizontal-tb";

  return (
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
        {seriesTitle}
      </Link>

      <Text
        fontSize={"13px"}
        color={readerTheme.subTitleTextColor}
        sx={{ writingMode: writingMode }}
        textOverflow={"ellipsis"}
        whiteSpace={"nowrap"}
        overflow={"hidden"}
      >
        {chapterTitle}
      </Text>
    </Flex>
  );
};

export default ChapterBreadcrumb;
