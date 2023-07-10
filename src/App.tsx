import { Box, Slide, calc } from "@chakra-ui/react";

import ChapterText from "./components/ChapterText.tsx";
import SettingsWindow from "./components/SettingsWindow.tsx";
import { createRef, useEffect, useState } from "react";
import { isFirefox, isMobileSafari, isSafari } from "react-device-detect";
import {
  themes,
  myoucyouFont,
  readerModes,
} from "./components/ReaderThemes.ts";
import SettingsBarVertical from "./components/SettingsBarVertical.tsx";
import SettingsBarHorizontal from "./components/SettingsBarHorizontal.tsx";

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
  const [readerVMargins, setReaderVMargins] = useState("8vh");
  const [readerFont, setReaderFont] = useState(myoucyouFont);
  const [readerMode, setReaderMode] = useState(readerModes.Tategumi);
  const [shouldScrollToStart, setShouldScrollToStart] = useState(true);
  const [horizontalStartPos, setHorizontalStartPos] = useState(-1);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const handleResize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
    setShouldScrollToStart(true);
  };

  const dimScreenFunc = "brightness(0.3)";

  const verticalWR = "body { writing-mode: vertical-rl }";
  const horizontalWR = "body { writing-mode: horizontal-tb }";

  const isTategumi = readerMode == readerModes.Tategumi;
  const isYokogumi = readerMode == readerModes.Yokogumi;
  const writngMode = isMobileSafari
    ? horizontalWR
    : isTategumi
    ? verticalWR
    : horizontalWR;

  const outerDivWidthBase = isYokogumi ? "100%" : "max-content";
  const outerDivWidthDesktopSafari = isTategumi ? windowSize.width : "100%";
  const outerDivWidth =
    isSafari && !isMobileSafari
      ? outerDivWidthDesktopSafari
      : outerDivWidthBase;
  const outerDivHeight = isYokogumi ? "max-content" : "100%";

  let lastWidthScrollPos = 0;
  const showSettingsBarThreshold = 1;
  const hideSettingsBarThreshold = -5;
  const startAreaThreshold = 18;

  const handleScroll = (scrollLeft: number, isReverse: boolean) => {
    let scrollSpeedDelta = Math.abs(scrollLeft) - lastWidthScrollPos;
    let shouldShow = isReverse
      ? scrollSpeedDelta < -showSettingsBarThreshold
      : scrollSpeedDelta > showSettingsBarThreshold;
    let shouldHide = isReverse
      ? scrollSpeedDelta > -hideSettingsBarThreshold
      : scrollSpeedDelta < hideSettingsBarThreshold;

    if (shouldShow && sidebarVisibility && lastWidthScrollPos != 0) {
      setSidebarVisibility(false);
    } else if (shouldHide && !sidebarVisibility && lastWidthScrollPos != 0) {
      setSidebarVisibility(true);
    }
    lastWidthScrollPos = Math.abs(scrollLeft);
    shouldShow = isReverse
      ? horizontalStartPos - startAreaThreshold < lastWidthScrollPos
      : startAreaThreshold > lastWidthScrollPos;

    if (shouldShow) {
      setSidebarVisibility(true);
    }
  };

  const handleWheelScroll = (
    event: React.WheelEvent<HTMLDivElement> | WheelEvent,
    scrollLeft: number,
    scrollTop: number
  ) => {
    if (event.deltaY != 0 && settingsWindowHidden) {
      let x: number;
      let y: number;
      if (isSafari || isFirefox) {
        x = scrollLeft - event.deltaY + event.deltaX;
      } else {
        x = scrollLeft - event.deltaY;
      }
      if (window.scrollY != 0) {
        y = scrollTop + event.deltaY;
      } else {
        y = 0;
      }

      if (event.currentTarget == undefined) {
        scrollTo(x, y);
      } else if ("scrollTo" in event.currentTarget) {
        event.currentTarget.scrollTo(x, y);
      }
    }
  };

  const handleScrollWindow = () => {
    handleScroll(
      isTategumi ? window.scrollX : window.scrollY,
      isMobileSafari && isTategumi ? true : false
    );
  };

  const handleWheelScrollWindow = (event: WheelEvent) => {
    handleWheelScroll(event, window.scrollX, window.scrollY);
  };

  const handleScrollDiv = (event: React.UIEvent<HTMLDivElement>) => {
    handleScroll(
      isTategumi
        ? event.currentTarget.scrollLeft
        : event.currentTarget.scrollTop,
      false
    );
  };

  const handleWheelScrollDiv = (event: React.WheelEvent<HTMLDivElement>) => {
    handleWheelScroll(
      event,
      event.currentTarget.scrollLeft,
      event.currentTarget.scrollTop
    );
  };

  const handleCloseSettingsOnClick = () => {
    if (!settingsWindowHidden) {
      setSettingsWindowHidden(!settingsWindowHidden);
    }
  };

  for (let i = 0; i < 20; i++) {
    paragraphs.push(paragraphs[0].concat("penis" + i));
  }

  useEffect(() => {
    if ((isMobileSafari || isSafari) && isTategumi) {
      window.addEventListener("resize", handleResize);
    }

    if (shouldScrollToStart && isTategumi && isMobileSafari) {
      window.scrollTo(document.body.scrollWidth - window.innerWidth, 0);
      setTimeout(() => {
        setHorizontalStartPos(window.scrollX);
      }, 500);
      setHorizontalStartPos(window.scrollX);
    }

    if (isTategumi) {
      window.addEventListener("wheel", handleWheelScrollWindow);
    }

    window.addEventListener("scroll", handleScrollWindow);

    return () => {
      if (isTategumi) {
        window.removeEventListener("wheel", handleWheelScrollWindow);
      }
      window.removeEventListener("scroll", handleScrollWindow);

      if ((isMobileSafari || isSafari) && isTategumi) {
        window.removeEventListener("resize", handleResize);
      }
      setShouldScrollToStart(false);
    };
  }, [
    handleResize,
    handleWheelScrollWindow,
    handleScrollWindow,
    setShouldScrollToStart,
    shouldScrollToStart,
    setHorizontalStartPos,
  ]);

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: writngMode,
        }}
      />

      <style
        dangerouslySetInnerHTML={{
          __html: readerTheme.pageBackground,
        }}
      />

      <style
        dangerouslySetInnerHTML={{
          __html:
            isSafari && !isMobileSafari && isTategumi
              ? "body {overflow: hidden}"
              : "",
        }}
      />

      <SettingsWindow
        isHidden={settingsWindowHidden}
        setReaderFontSize={setReaderFontSize}
        setReaderLineSpacing={setReaderLineSpacing}
        setReaderVMargins={setReaderVMargins}
        setReaderFont={setReaderFont}
        setSettingsWindowHidden={setSettingsWindowHidden}
        setReaderTheme={setReaderTheme}
        readerTheme={readerTheme}
        setReaderMode={setReaderMode}
        readerMode={readerMode}
        setShouldScrollToStart={setShouldScrollToStart}
      ></SettingsWindow>

      <Slide
        in={sidebarVisibility}
        style={{
          width: "100%",
          height: "100%",
          maxWidth: isTategumi ? "50px" : "unset",
          maxHeight: isYokogumi ? "50px" : "unset",
          zIndex: 2,
          filter: settingsWindowHidden ? "unset" : dimScreenFunc,
        }}
        direction={isTategumi ? "right" : "top"}
      >
        {isTategumi ? (
          <SettingsBarVertical
            settingsWindowHidden={settingsWindowHidden}
            setSettingsWindowHidden={setSettingsWindowHidden}
            readerTheme={readerTheme}
          ></SettingsBarVertical>
        ) : (
          <SettingsBarHorizontal
            settingsWindowHidden={settingsWindowHidden}
            setSettingsWindowHidden={setSettingsWindowHidden}
            readerTheme={readerTheme}
          ></SettingsBarHorizontal>
        )}
      </Slide>

      <Box //outer main div
        display={"flex"}
        flexDir={"row"}
        justifyContent={"center"}
        position={"relative"}
        width={outerDivWidth}
        height={outerDivHeight}
        alignItems={"center"}
        lineHeight={readerLineSpacing}
        fontFamily={readerFont}
        fontSize={readerFontSize}
        textColor={readerTheme.mainTextColor}
        bgColor={readerTheme.mainBgColor}
        overflowY={isTategumi ? "hidden" : "auto"}
        overflowX={isYokogumi ? "hidden" : "auto"}
        zIndex={1}
        filter={settingsWindowHidden ? "unset" : dimScreenFunc}
        onClick={handleCloseSettingsOnClick}
        onWheel={isSafari && !isMobileSafari ? handleWheelScrollDiv : () => {}}
        onScroll={isSafari && !isMobileSafari ? handleScrollDiv : () => {}}
        ref={parentRef as React.RefObject<HTMLDivElement>}
        sx={{
          writingMode: isMobileSafari && isTategumi ? "vertical-rl" : "inherit",
        }}
        css={{
          "&::-webkit-scrollbar": {
            position: "relative",
            display: "block",
            height: "6px",
            width: "1px",
          },
          "&::-webkit-scrollbar-track": {
            background: "#333333",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "#B0AEAE",
            borderRadius: "0px",
          },
        }}
        pt={isTategumi ? readerVMargins : "60px"}
        pb={isTategumi ? readerVMargins : "unset"}
        pr={isTategumi ? "60px" : "4%"}
        pl={isTategumi ? "undet" : "4%"}
        //p={"10"}
      >
        <Box //inner main div
          m={"auto"}
          position={"relative"}
          maxWidth={isYokogumi ? "665px" : "unset"}
          //maxHeight={isTategumi ? "665px" : "unset"}
          width={"fit-content"}
          height={"fit-content"}
          textColor={"inherit"}
          bgColor={"inherit"}
          userSelect={settingsWindowHidden ? "auto" : "none"}
          cursor={settingsWindowHidden ? "auto" : "default"}
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
