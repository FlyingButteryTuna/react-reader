import { Flex, Text } from "@chakra-ui/react";

interface NoverCardProps {
  seriesTitle: string;
  author: string;
  creationDate: string;
  lastUpdated: string;
  seriesStatus: string;
  chapterCount: number;
  sourceType: string;
}

const NovelCard: React.FC<NoverCardProps> = ({
  seriesTitle,
  author,
  seriesStatus,
  chapterCount,
  lastUpdated,
}) => {
  return (
    <Flex
      flexDir={"row"}
      borderWidth={"1.5px"}
      borderColor={"rebeccapurple"}
      minWidth={"500px"}
      width={"100%"}
      height={"10%"}
      p={"10px"}
    >
      <Flex width={"inherit"} height={"100%"} flexDir={"column"} rowGap={-1}>
        <Text fontSize={"lg"} fontWeight={"bold"}>
          {seriesTitle}
        </Text>
        <Text fontSize={"md"} color={"blackAlpha.700"}>
          {author}
        </Text>
        <Flex flexDir={"row"}>
          <Text fontSize={"md"} fontStyle={"italic"} pr={2}>
            {seriesStatus}
          </Text>
          <Text>全{chapterCount}話</Text>
          <Text ml={"auto"} fontSize={"md"}>
            {lastUpdated}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};
export default NovelCard;
