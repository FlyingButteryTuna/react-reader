import { Box, Flex, Slide } from "@chakra-ui/react";

import ChapterText from "./components/ChapterText.tsx";
import SettingsBar from "./components/SettingsBar.tsx";
import SettingsWindow from "./components/SettingsWindow.tsx";
import { createRef, useState } from "react";
import { isSafari } from "react-device-detect";
import { light } from "./components/ReaderThemes.tsx";

function App() {
  let paragraphs = [
    "　そこは一面緑の<ruby>草叢<rt>くさむら</rt></ruby>に覆われた丘陵地帯だった。まだ日は高く、時間的に昼過ぎくらいだろうか。緑の水面を吹き付ける風が撫で、草の波が岩に腰かけた自分へと向かって押し寄せて来る。吹き付ける風には緑の青臭さと、湿った土の薫りが混じり合い鼻孔に届く。そして背後にある森の木々をその風がざわめかせ、駆け抜けていく。",
  ];

  const parentRef: React.RefObject<HTMLDivElement> = createRef();

  const [sidebarVisibility, setSidebarVisibility] = useState(true);
  const [settingsWindowHidden, setSettingsWindowHidden] = useState(true);
  const [readerTheme, setReaderTheme] = useState(light);

  let lastWidthScrollPos = 0;
  const visibilityChangeThreshold = 7;

  const handleScroll = (event: React.UIEvent<HTMLElement>) => {
    let scrollSpeedDelta =
      Math.abs(event.currentTarget.scrollLeft) - lastWidthScrollPos;
    if (scrollSpeedDelta > 1 && sidebarVisibility && lastWidthScrollPos != 0) {
      setSidebarVisibility(false);
    } else if (
      scrollSpeedDelta < -visibilityChangeThreshold &&
      !sidebarVisibility &&
      lastWidthScrollPos != 0
    ) {
      setSidebarVisibility(true);
    }

    lastWidthScrollPos = Math.abs(event.currentTarget.scrollLeft);
    if (lastWidthScrollPos < 18) {
      setSidebarVisibility(true);
    }
  };

  const handleVerticalScroll = (event: React.WheelEvent<HTMLDivElement>) => {
    if (event.deltaY != 0 && settingsWindowHidden) {
      if (parentRef.current != undefined) {
        if (isSafari) {
          parentRef.current.scrollTo(
            parentRef.current.scrollLeft - event.deltaY + event.deltaX,
            0
          );
        } else {
          parentRef.current.scrollTo(
            parentRef.current.scrollLeft - event.deltaY,
            0
          );
        }
      }
    }
  };

  for (let i = 0; i < 100; i++) {
    paragraphs.push(paragraphs[0].concat("penis" + i));
  }

  return (
    <>
      <Flex
        position={"relative"}
        flexDir={"row-reverse"}
        justifyContent={"flex-start"}
        fontFamily="sans-serif"
        lineHeight={"200%"}
        overflowX={"auto"}
        overflowY="hidden"
        maxHeight={"100vh"}
        fontSize={{ base: "20px", md: "23px", lg: "23px" }}
        onScroll={handleScroll}
        onWheel={handleVerticalScroll}
        ref={parentRef as React.RefObject<HTMLDivElement>}
        pr={"60px"}
        textColor={readerTheme.mainTextColor}
        bgColor={readerTheme.mainBgColor}
        width={"100%"}
        height={"100%"}
      >
        <Box
          display={"block"}
          sx={{
            writingMode: "vertical-rl",
            overflowWrap: "break-word",
          }}
          h="fit-content"
          py={["3vh", "5vh", "7vh", "12vh"]}
          m="0"
          filter={settingsWindowHidden ? "unset" : "opacity(0.5)"}
        >
          {paragraphs.map((object, i) => {
            return (
              <ChapterText full_chapter_text={object} key={i}></ChapterText>
            );
          })}
        </Box>

        <SettingsWindow isHidden={settingsWindowHidden}></SettingsWindow>
        <Slide in={sidebarVisibility} style={{ maxWidth: "80px" }}>
          <SettingsBar
            settingsWindowHidden={settingsWindowHidden}
            setSettingsWindowHidden={setSettingsWindowHidden}
            setReaderTheme={setReaderTheme}
          ></SettingsBar>
        </Slide>
      </Flex>
    </>
  );
}

export default App;
