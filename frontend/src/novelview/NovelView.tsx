import { Box, Flex, Skeleton, Spinner, useMediaQuery } from "@chakra-ui/react";
import NovelViewHeader from "./ViewHeader";
import ChapterList from "./ChapterList";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { NovelData } from "./types";

const NovelView = () => {
  const [isLargerThan665] = useMediaQuery("(min-width: 665px)");

  const novelDataQuery = useQuery({
    queryKey: ["novelData"],
    queryFn: async () => {
      const response = await axios.get<NovelData>("/api/v1/demo/test1", {
        params: {
          path: "/n8611bv/",
        },
        withCredentials: true,
      });
      const data = await response.data;
      return data;
    },
  });

  if (novelDataQuery.isLoading)
    return (
      <Flex
        width={"100vw"}
        height={"100vh"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Spinner size={"xl"}></Spinner>
      </Flex>
    );

  if (novelDataQuery.data == undefined) {
    return <></>;
  }

  return (
    <Box width={"100vw"} height={"fit-content"} py={4}>
      <Flex
        flexDir={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        maxWidth={"665px"}
        mx={isLargerThan665 ? "auto" : 2}
      >
        <NovelViewHeader
          series_title={novelDataQuery.data.series_title}
          series_description={novelDataQuery.data.series_description}
        ></NovelViewHeader>

        <ChapterList
          chapterIndex={novelDataQuery.data.chapter_index}
        ></ChapterList>
      </Flex>
    </Box>
  );
};

export default NovelView;
