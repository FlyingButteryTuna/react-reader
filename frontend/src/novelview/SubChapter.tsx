import {
  Flex,
  IconButton,
  MenuButton,
  Menu,
  MenuList,
  MenuItem,
  Text,
  useMediaQuery,
  Link,
} from "@chakra-ui/react";
import { isMobile } from "react-device-detect";
import { GoKebabHorizontal } from "react-icons/go";
import { createSearchParams } from "react-router-dom";

interface SubChapterProps {
  subChapterTitle: string;
  subChapterPath: string;
  seriesTitle: string;
}

const SubChapter: React.FC<SubChapterProps> = ({
  subChapterTitle,
  subChapterPath,
  seriesTitle,
}) => {
  const [isLargerThan400] = useMediaQuery("(min-width: 400px)");

  return (
    <Flex
      alignItems={"center"}
      flexDir={"row"}
      mb={4}
      borderBottom={"1px"}
      _hover={{ color: isMobile ? {} : "cyan.500" }}
    >
      <Link
        href={
          "/readnovel?" +
          createSearchParams({
            chapterpath: subChapterPath,
            seriestitle: seriesTitle,
            chaptertitle: subChapterTitle,
          }).toString()
        }
        fontSize={"md"}
        letterSpacing={"tight"}
        width={"100%"}
      >
        {subChapterTitle}
      </Link>

      <Text
        fontSize={isLargerThan400 ? "md" : "xs"}
        color={"chakra-subtle-text"}
      >
        24/2/22
      </Text>

      <Menu gutter={4} isLazy={true} placement="bottom">
        <MenuButton
          as={IconButton}
          aria-label="Options"
          display={"flex"}
          icon={<GoKebabHorizontal />}
          variant={"unstyled"}
          borderColor={"white"}
          rounded={0}
          color={"chakra-body-text"}
          _hover={{ color: isMobile ? {} : "cyan.500" }}
        />

        <MenuList
          fontSize={"mg"}
          color={"gray"}
          minW="0"
          maxWidth={"fit-content"}
        >
          <MenuItem>Test</MenuItem>
          <MenuItem>Test</MenuItem>
          <MenuItem>Test</MenuItem>
          <MenuItem>Test</MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
};

export default SubChapter;
