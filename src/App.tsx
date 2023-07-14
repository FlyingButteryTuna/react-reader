import { useEffect, useState } from "react";
import { isFirefox, isMobileSafari, isSafari } from "react-device-detect";
import { readerModes } from "./reader/settings-consts/readerSettings.ts";
import { Box, Flex, Interpolation, Slide, Text } from "@chakra-ui/react";
import SettingsWindow from "./reader/settings-window/SettingsWindow.tsx";
import SettingsBar from "./reader/settings-bar/SettingsBar.tsx";
import { useReaderSettings } from "./reader/states/readerSettings.ts";
import { useShouldScrollToStart } from "./reader/states/shouldScrollToStart.ts";

function App() {
  let paragraphs = [
    "　そこは一面緑の<ruby>草叢<rt>くさむら</rt></ruby>に覆われた丘陵地帯だった。まだ日は高く、時間的に昼過ぎくらいだろうか。緑の水面を吹き付ける風が撫で、草の波が岩に腰かけた自分へと向かって押し寄せて来る。吹き付ける風には緑の青臭さと、湿った土の薫りが混じり合い鼻孔に届く。そして背後にある森の木々をその風がざわめかせ、駆け抜けていく。",
  ];

  const fontSize = useReaderSettings((state) => state.fontSize);
  const lineSpacing = useReaderSettings((state) => state.lineSpacing);
  const vMargins = useReaderSettings((state) => state.vMargins);
  const fontFamily = useReaderSettings((state) => state.font);
  const readerMode = useReaderSettings((state) => state.mode);
  const readerTheme = useReaderSettings((state) => state.theme);
  const shouldScrollToStart = useShouldScrollToStart(
    (state) => state.shouldScrollToStart
  );
  const toggleScrollRestoration = useShouldScrollToStart(
    (state) => state.toggleScrollRestoration
  );
  const disableScrollRestoration = useShouldScrollToStart(
    (state) => state.disableScrollRestoration
  );

  const [sidebarVisibility, setSidebarVisibility] = useState(true);
  const [settingsWindowHidden, setSettingsWindowHidden] = useState(true);

  const [horizontalStartPos, setHorizontalStartPos] = useState(-1);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [scrollWidthScale, setScrollWidthScale] = useState(-1.0);

  enum screenOrientation {
    portrait,
    landscape,
  }

  const handleResize = () => {
    let oldOrientation =
      windowSize.width / windowSize.height > 1
        ? screenOrientation.landscape
        : screenOrientation.portrait;
    let newOrientation =
      window.innerWidth / window.innerHeight > 1
        ? screenOrientation.landscape
        : screenOrientation.portrait;
    if (oldOrientation != newOrientation) {
      toggleScrollRestoration();
    }
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  const handleScroll = (scrollLeft: number, isReverse: boolean) => {
    if (isMobileSafari) {
      setScrollWidthScale(
        scrollLeft / (document.body.scrollWidth - window.innerWidth)
      );
    }
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
    if (isYokogumi) {
      setScrollWidthScale(-1.0); //reset scroll restoration on reader mode change
    }
    if ((isMobileSafari || isSafari) && isTategumi) {
      window.addEventListener("resize", handleResize); //handle resize for safari (outer div width/height is constrained by wSize)
    }

    if (shouldScrollToStart && isTategumi && isMobileSafari) {
      window.scrollTo(document.body.scrollWidth - window.innerWidth, 0); //scroll to the right (start)
      setHorizontalStartPos(window.scrollX); //store new position as initial scroll value

      if (scrollWidthScale != -1.0) {
        window.scrollTo(
          (document.body.scrollWidth - window.innerWidth) * scrollWidthScale,
          0
        ); //scroll restoration
        setScrollWidthScale(-1.0);
      } else {
        setSidebarVisibility(true); //show settings bar on initial load
      }
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
        disableScrollRestoration();
      }
    };
  }, [
    disableScrollRestoration,
    handleResize,
    handleWheelScrollWindow,
    handleScrollWindow,
    shouldScrollToStart,
    setHorizontalStartPos,
  ]);

  const settingsVisibility = {
    isHidden: settingsWindowHidden,
    setSettingsWindowHidden: setSettingsWindowHidden,
  };
  const scrollBarWebKitCss = {
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
  } as Interpolation<{}>;

  const dimScreenFunc = "brightness(0.3)";

  const isTategumi = readerMode == readerModes.Tategumi;
  const isYokogumi = readerMode == readerModes.Yokogumi;

  const verticalWR = "body { writing-mode: vertical-rl }";
  const horizontalWR = "body { writing-mode: horizontal-tb }";
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

      <SettingsWindow visibility={settingsVisibility}></SettingsWindow>

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
        <SettingsBar
          settingsWindowHidden={settingsWindowHidden}
          setSettingsWindowHidden={setSettingsWindowHidden}
          readerTheme={readerTheme}
        ></SettingsBar>
      </Slide>

      <Flex //outer main div
        flexDir={"row"}
        justifyContent={"center"}
        alignItems={"center"}
        position={"relative"}
        width={outerDivWidth}
        height={outerDivHeight}
        minWidth={isTategumi ? windowSize.width : "unset"}
        minHeight={isYokogumi ? windowSize.height : "unset"}
        bgColor={readerTheme.mainBgColor}
        textColor={readerTheme.mainTextColor}
        fontFamily={fontFamily}
        fontSize={fontSize}
        lineHeight={lineSpacing}
        overflowY={isTategumi ? "hidden" : "auto"}
        overflowX={isYokogumi ? "hidden" : "auto"}
        pt={isTategumi ? vMargins : "60px"}
        pb={isTategumi ? vMargins : "unset"}
        pr={isTategumi ? "60px" : "4%"}
        pl={isTategumi ? "undet" : "4%"}
        filter={settingsWindowHidden ? "unset" : dimScreenFunc}
        onClick={handleCloseSettingsOnClick}
        onWheel={isSafari && !isMobileSafari ? handleWheelScrollDiv : () => {}}
        onScroll={isSafari && !isMobileSafari ? handleScrollDiv : () => {}}
        zIndex={1}
        sx={{
          writingMode: isMobileSafari && isTategumi ? "vertical-rl" : "inherit",
        }}
        css={scrollBarWebKitCss}
      >
        <Box //inner main div
          m={"auto"}
          position={"relative"}
          maxWidth={isYokogumi ? "665px" : "unset"}
          width={"fit-content"}
          height={"fit-content"}
          textColor={"inherit"}
          bgColor={"inherit"}
          userSelect={settingsWindowHidden ? "auto" : "none"}
          cursor={settingsWindowHidden ? "auto" : "default"}
        >
          {paragraphs.map((object, i) => {
            return (
              <Text
                dangerouslySetInnerHTML={{
                  __html: object,
                }}
                key={i}
              ></Text>
            );
          })}
        </Box>
      </Flex>
    </>
  );
}

export default App;
