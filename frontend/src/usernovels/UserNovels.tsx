import { Flex } from "@chakra-ui/react";
import NovelCard from "./NovelCard.tsx";

const UserNovels = () => {
  return (
    <Flex padding={10} flexDir={"column"} rowGap={2}>
      <NovelCard
        seriesTitle={"Title"}
        author={"Author"}
        creationDate={"2019-10-10"}
        lastUpdated={"2019-10-11"}
        seriesStatus={"連載中"}
        chapterCount={69}
        sourceType={"なろう"}
      ></NovelCard>
      <NovelCard
        seriesTitle={"Title"}
        author={"Author"}
        creationDate={"2019-10-10"}
        lastUpdated={"2019-10-11"}
        seriesStatus={"連載中"}
        chapterCount={69}
        sourceType={"なろう"}
      ></NovelCard>
    </Flex>
  );
};
export default UserNovels;
