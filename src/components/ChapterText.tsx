import { Text } from "@chakra-ui/react";

interface ChapterTextProps {
  full_chapter_text: string;
}

const ChapterText: React.FC<ChapterTextProps> = ({ full_chapter_text }) => {
  return (
    <Text
      dangerouslySetInnerHTML={{
        __html: full_chapter_text,
      }}
    ></Text>
  );
};

export default ChapterText;
