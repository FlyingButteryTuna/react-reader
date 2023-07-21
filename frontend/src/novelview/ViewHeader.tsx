import { Collapse, Divider, Flex, Heading, Text } from "@chakra-ui/react";
import { MutableRefObject, useLayoutEffect, useRef, useState } from "react";
import { isMobile } from "react-device-detect";

interface NovelViewHeaderProps {
  series_title: string;
  series_description: string;
}

const NovelViewHeader: React.FC<NovelViewHeaderProps> = ({
  series_title,
  series_description,
}) => {
  const [isShowMoreHidden, setIsShowMoreHidden] = useState(false);
  const [isDescCollapsed, setIsDescCollapsed] = useState(false);
  const ref = useRef<HTMLDivElement>();

  const readMoreBtnStr = "続きを読む";
  const hideBtnStr = "閉じる";

  useLayoutEffect(() => {
    if (ref.current != undefined) {
      if (ref.current?.scrollHeight > ref.current?.clientHeight) {
        setIsShowMoreHidden(false);
      } else {
        setIsShowMoreHidden(true);
      }
    }
  }, [setIsShowMoreHidden]);

  return (
    <Flex
      flexDir={"column"}
      maxWidth={"665px"}
      alignItems={"center"}
      p={3}
      rowGap={4}
      border={"2px"}
      rounded={5}
      mb={6}
    >
      <Heading
        minW={"30%"}
        as={"h1"}
        justifySelf={"center"}
        alignSelf={"center"}
        textAlign={"center"}
      >
        {series_title}
      </Heading>

      <Divider
        width={"80%"}
        orientation="horizontal"
        borderColor={"magenta"}
        borderWidth={"2px"}
      ></Divider>

      <Collapse
        in={isDescCollapsed}
        startingHeight={"200px"}
        ref={ref as MutableRefObject<HTMLDivElement>}
        style={{ whiteSpace: "pre-wrap" }}
      >
        {series_description}
      </Collapse>

      <Text
        fontSize={"md"}
        onClick={() => {
          setIsDescCollapsed(!isDescCollapsed);
        }}
        hidden={isShowMoreHidden}
        cursor={"pointer"}
        _hover={{ color: isMobile ? {} : "cyan.500" }}
      >
        {isDescCollapsed ? hideBtnStr : readMoreBtnStr}
      </Text>
    </Flex>
  );
};

export default NovelViewHeader;
