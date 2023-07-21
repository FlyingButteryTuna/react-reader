import { Box, Flex, Heading, useColorMode } from "@chakra-ui/react";
import SubChapter from "./SubChapter";
import { ChapterData } from "./types";

interface ChapterListProps {
  chapterIndex: Array<ChapterData>;
}

const ChapterList: React.FC<ChapterListProps> = ({ chapterIndex }) => {
  const { colorMode } = useColorMode();

  return (
    <>
      {chapterIndex.map((chapter, index) => {
        return (
          <Flex
            flexDir={"column"}
            width={"100%"}
            height={"fit-content"}
            key={index}
            mb={6}
          >
            <Heading
              fontSize={"xl"}
              fontWeight={"extrabold"}
              bgColor={colorMode == "dark" ? "gray.700" : "gray.200"}
              mb={4}
            >
              {chapter.chapter_title}
            </Heading>
            <Box px={2}>
              {chapter.subchapter_list.map((subchapter, index) => {
                return (
                  <SubChapter
                    subChapterTitle={subchapter.chapter_subtitle}
                    key={index}
                  ></SubChapter>
                );
              })}
            </Box>
          </Flex>
        );
      })}
    </>
  );
};

export default ChapterList;
