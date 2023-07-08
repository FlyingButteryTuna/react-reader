import { Box, Slide } from "@chakra-ui/react";

import ChapterText from "./components/ChapterText.tsx";
import SettingsBar from "./components/SettingsBar.tsx";
import SettingsWindow from "./components/SettingsWindow.tsx";
import { createRef, useEffect, useState } from "react";
import { isFirefox, isSafari } from "react-device-detect";
import { themes, myoucyouFont } from "./components/ReaderThemes.ts";

function App() {
  let paragraphs = [
    "　そこは一面緑の<ruby>草叢<rt>くさむら</rt></ruby>に覆われた丘陵地帯だった。まだ日は高く、時間的に昼過ぎくらいだろうか。緑の水面を吹き付ける風が撫で、草の波が岩に腰かけた自分へと向かって押し寄せて来る。吹き付ける風には緑の青臭さと、湿った土の薫りが混じり合い鼻孔に届く。そして背後にある森の木々をその風がざわめかせ、駆け抜けていく。",
  ];

  const parentRef: React.RefObject<HTMLDivElement> = createRef();

  const [readerTheme, setReaderTheme] = useState(themes.light);
  const [sidebarVisibility, setSidebarVisibility] = useState(true);
  const [settingsWindowHidden, setSettingsWindowHidden] = useState(true);
  const [readerFontSize, setReaderFontSize] = useState("23px");
  const [readerLineSpacing, setReaderLineSpacing] = useState("200%");
  const [readerVMargins, setReaderVMargins] = useState("5vh");
  const [readerFont, setReaderFont] = useState(myoucyouFont);

  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    heigth: window.innerHeight,
  });

  const dimScreenFunc = "brightness(0.3)";

  let lastWidthScrollPos = 0;
  const visibilityChangeThreshold = -5;

  const handleScroll = (scrollLeft: number) => {
    let scrollSpeedDelta = Math.abs(scrollLeft) - lastWidthScrollPos;
    if (scrollSpeedDelta >= 1 && sidebarVisibility && lastWidthScrollPos != 0) {
      setSidebarVisibility(false);
    } else if (
      scrollSpeedDelta < visibilityChangeThreshold &&
      !sidebarVisibility &&
      lastWidthScrollPos != 0
    ) {
      setSidebarVisibility(true);
    }

    lastWidthScrollPos = Math.abs(scrollLeft);
    if (lastWidthScrollPos < 18) {
      setSidebarVisibility(true);
    }
  };

  const handleHorizontalScroll = (
    event: React.WheelEvent<HTMLDivElement> | WheelEvent,
    scrollLeft: number
  ) => {
    if (event.deltaY != 0 && settingsWindowHidden) {
      let x: number;
      if (isSafari || isFirefox) {
        x = scrollLeft - event.deltaY + event.deltaX;
      } else {
        x = scrollLeft - event.deltaY;
      }
      if (event.currentTarget == undefined) {
        scrollTo(x, 0);
      } else if ("scrollTo" in event.currentTarget) {
        event.currentTarget.scrollTo(x, 0);
      }
    }
  };

  const handleScrollDiv = (event: React.MouseEvent<HTMLDivElement>) => {
    handleScroll(event.currentTarget.scrollLeft);
  };

  const handleHorizontalScrollDiv = (
    event: React.WheelEvent<HTMLDivElement>
  ) => {
    handleHorizontalScroll(event, event.currentTarget.scrollLeft);
  };

  const handleScrollWindow = () => {
    handleScroll(window.scrollX);
  };

  const handleHorizontalScrollWindow = (event: WheelEvent) => {
    handleHorizontalScroll(event, window.scrollX);
  };

  const handleCloseSettingsOnClick = () => {
    if (!settingsWindowHidden) {
      setSettingsWindowHidden(!settingsWindowHidden);
    }
  };

  const handleResize = () => {
    setWindowSize({
      width: window.innerWidth,
      heigth: window.innerHeight,
    });
  };

  const windowMaxHeight =
    window.innerHeight > window.innerWidth
      ? window.innerHeight
      : window.innerWidth;

  for (let i = 0; i < 20; i++) {
    paragraphs.push(paragraphs[0].concat("penis" + i));
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    if (!isSafari) {
      window.addEventListener("wheel", handleHorizontalScrollWindow);
      window.addEventListener("scroll", handleScrollWindow);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      if (!isSafari) {
        window.removeEventListener("wheel", handleHorizontalScrollWindow);
        window.removeEventListener("scroll", handleScrollWindow);
      }
    };
  }, [handleResize]);

  return (
    <>
      <SettingsWindow
        isHidden={settingsWindowHidden}
        setReaderFontSize={setReaderFontSize}
        setReaderLineSpacing={setReaderLineSpacing}
        setReaderVMargins={setReaderVMargins}
        setReaderFont={setReaderFont}
        setSettingsWindowHidden={setSettingsWindowHidden}
        setReaderTheme={setReaderTheme}
        readerTheme={readerTheme}
      ></SettingsWindow>

      <Slide
        in={sidebarVisibility}
        style={{
          maxWidth: "50px",
          zIndex: 100,
          filter: settingsWindowHidden ? "unset" : dimScreenFunc,
        }}
      >
        <SettingsBar
          settingsWindowHidden={settingsWindowHidden}
          setSettingsWindowHidden={setSettingsWindowHidden}
          setReaderTheme={setReaderTheme}
          windowMaxHeight={windowMaxHeight}
          readerTheme={readerTheme}
        ></SettingsBar>
      </Slide>
      <Box
        ref={parentRef as React.RefObject<HTMLDivElement>}
        position={"relative"}
        lineHeight={readerLineSpacing}
        fontFamily={readerFont}
        overflow={"auto"}
        overflowY={"hidden"}
        fontSize={readerFontSize}
        textColor={readerTheme.mainTextColor}
        bgColor={readerTheme.mainBgColor}
        pr={"60px"}
        my={"auto"}
        py={readerVMargins}
        height={windowSize.heigth - 4}
        width={isSafari ? windowSize.width : "fit-content"}
        onScroll={isSafari ? handleScrollDiv : () => {}}
        onWheel={isSafari ? handleHorizontalScrollDiv : () => {}}
        onClick={handleCloseSettingsOnClick}
        filter={settingsWindowHidden ? "unset" : dimScreenFunc}
        zIndex={1}
      >
        <Box
          height={"fit-content"}
          width={"fit-content"}
          minWidth={windowSize.width}
          textColor={"inherit"}
          bgColor={"inherit"}
          userSelect={settingsWindowHidden ? "auto" : "none"}
        >
          {paragraphs.map((object, i) => {
            return (
              <ChapterText full_chapter_text={object} key={i}></ChapterText>
            );
          })}
        </Box>
      </Box>
    </>
  );
}

export default App;
