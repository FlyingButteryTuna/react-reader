import { Box, Flex, Slide } from "@chakra-ui/react";

import ChapterText from "./components/ChapterText.tsx";
import SettingsBar from "./components/SettingsBar.tsx";
import { createRef, useState } from "react";

function App() {
  let paragraphs = [
    "　そこは一面緑の<ruby>草叢<rt>くさむら</rt></ruby>に覆われた丘陵地帯だった。まだ日は高く、時間的に昼過ぎくらいだろうか。緑の水面を吹き付ける風が撫で、草の波が岩に腰かけた自分へと向かって押し寄せて来る。吹き付ける風には緑の青臭さと、湿った土の薫りが混じり合い鼻孔に届く。そして背後にある森の木々をその風がざわめかせ、駆け抜けていく。",
  ];

  const parentRef: React.RefObject<HTMLDivElement> = createRef();

  const [settingsVisibility, setVisibility] = useState(false);
  let lastWidthScrollPos = 0;
  const visibilityChangeThreshold = 7;

  const handleScroll = (event: React.UIEvent<HTMLElement>) => {
    let scrollSpeedDelta =
      Math.abs(event.currentTarget.scrollLeft) - lastWidthScrollPos;
    console.log(scrollSpeedDelta);
    if (scrollSpeedDelta > 5 && settingsVisibility && lastWidthScrollPos != 0) {
      setVisibility(false);
      console.log("hide");
    } else if (
      scrollSpeedDelta < -visibilityChangeThreshold &&
      !settingsVisibility &&
      lastWidthScrollPos != 0
    ) {
      setVisibility(true);
      console.log("show");
    }
    lastWidthScrollPos = Math.abs(event.currentTarget.scrollLeft);
    setTimeout(() => {
      lastWidthScrollPos = 0;
    }, 500);
  };

  const handleVerticalScroll = (event: React.WheelEvent<HTMLDivElement>) => {
    if (event.deltaX < 100 && event.deltaX > -100 && event.deltaY != 0) {
      if (parentRef.current != undefined) {
        parentRef.current.scrollTo(
          parentRef.current.scrollLeft - event.deltaY,
          0
        );
      }
    }
  };

  for (let i = 0; i < 100; i++) {
    paragraphs.push(paragraphs[0].concat("penis" + i));
  }

  return (
    <>
      <Flex
        flexDir={"row-reverse"}
        justifyContent={"flex-start"}
        fontFamily="sans-serif"
        lineHeight={"170%"}
        overflowX={"scroll"}
        maxHeight={"100vh"}
        fontSize={{ base: "20px", md: "23px", lg: "25px" }}
        onScroll={handleScroll}
        onWheel={handleVerticalScroll}
        ref={parentRef as React.RefObject<HTMLDivElement>}
      >
        <Slide
          in={settingsVisibility}
          style={{ maxWidth: "80px", transitionDuration: "1ms" }}
        >
          <SettingsBar></SettingsBar>
        </Slide>

        <Box
          display={"block"}
          sx={{
            writingMode: "vertical-rl",
            overflowWrap: "break-word",
          }}
          h="fit-content"
          py={["3vh", "5vh", "7vh", "12vh"]}
        >
          {paragraphs.map((object, i) => {
            return (
              <ChapterText full_chapter_text={object} key={i}></ChapterText>
            );
          })}
        </Box>
      </Flex>
    </>
  );
}

export default App;
