import { Flex, useMediaQuery } from "@chakra-ui/react";
import NovelViewHeader from "./ViewHeader";
import ChapterList from "./ChapterList";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { NovelData } from "./types";
import LoadingScreenSpinner from "../FullScreenSpinner";
import { useQueryParams } from "../useQueryParams";

const NovelView = () => {
  const queryParams = useQueryParams();
  let novelPath = queryParams.get("novelpath");

  const novelDataQuery = useQuery({
    queryKey: ["novelData", novelPath],
    queryFn: async () => {
      const response = await axios.get<NovelData>("/api/v1/demo/test1", {
        params: {
          path: novelPath,
        },
        withCredentials: true,
      });
      const data = await response.data;
      return data;
    },
    staleTime: 100000,
  });

  const [isLargerThan665] = useMediaQuery("(min-width: 665px)");

  if (novelDataQuery.isLoading) return <LoadingScreenSpinner />;

  if (novelDataQuery.data == undefined) {
    return <></>;
  }

  return (
    <Flex
      width={"100vw"}
      height={"fit-content"}
      py={4}
      justifyContent={"center"}
    >
      <Flex
        flexDir={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        maxWidth={"665px"}
        mx={isLargerThan665 ? "unset" : 2}
      >
        <NovelViewHeader
          series_title={novelDataQuery.data.series_title}
          series_description={novelDataQuery.data.series_description}
        ></NovelViewHeader>

        <ChapterList
          seriesTitle={novelDataQuery.data.series_title}
          chapterIndex={novelDataQuery.data.chapter_index}
        ></ChapterList>
      </Flex>
    </Flex>
  );
};

export default NovelView;
