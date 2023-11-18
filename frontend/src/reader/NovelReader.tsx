import React, {useEffect, useLayoutEffect, useRef, useState} from "react";
import {isFirefox, isMobile, isMobileSafari, isSafari,} from "react-device-detect";
import {readerModes} from "./settings-consts/readerSettings.ts";
import {Box, Flex, Interpolation, Slide, Text} from "@chakra-ui/react";
import SettingsWindow from "./settings-window/SettingsWindow.tsx";
import SettingsBar from "./settings-bar/SettingsBar.tsx";
import {useReaderSettings} from "./states/readerSettings.ts";
import {useQuery} from "@tanstack/react-query";
import {useBreadCrumbs, useShouldScrollToStart, useWindowVisibility,} from "./states/miscReaderStates.ts";
import {useQueryParams} from "../useQueryParams.ts";
import axios from "axios";
import {ChapterBody} from "../novelview/types.ts";
import LoadingScreenSpinner from "../FullScreenSpinner.tsx";

const NovelReader = () => {
  const queryParams = useQueryParams();
  const chapterPathParam = queryParams.get("chapterpath");
  const seriesTitleParam = queryParams.get("seriestitle");
  const chapterTitleParam = queryParams.get("chaptertitle");

  const setSeriesTitle = useBreadCrumbs((state) => state.setSeriesTitle);
  const setChapterTitle = useBreadCrumbs((state) => state.setChapterTitle);

  const novelChapterQuery = useQuery({
    queryKey: ["novelData", chapterPathParam],
    queryFn: async () => {
      const response = await axios.get<ChapterBody>("/api/v1/demo/chapters", {
        params: {
          path: chapterPathParam,
        },
        withCredentials: true,
      });
      return response.data;
    },
    staleTime: 100000,
  });

  const fontSize = useReaderSettings((state) => state.fontSize);
  const lineSpacing = useReaderSettings((state) => state.lineSpacing);
  const vMargins = useReaderSettings((state) => state.vMargins);
  //const fontFamily = useReaderSettings((state) => state.font);
  const readerMode = useReaderSettings((state) => state.mode);
  const readerTheme = useReaderSettings((state) => state.theme);
  const shouldScrollToStart = useShouldScrollToStart(
    (state) => state.shouldScrollToStart
  );
  const enableScrollRestoration = useShouldScrollToStart(
    (state) => state.enableScrollRestoration
  );
  const disableScrollRestoration = useShouldScrollToStart(
    (state) => state.disableScrollRestoration
  );
  const isWindowHidden = useWindowVisibility((state) => state.isWindowHidden);
  const toggleWindowVisibility = useWindowVisibility(
    (state) => state.toggleWindowVisibility
  );

  const [sidebarVisibility, setSidebarVisibility] = useState(true);
  const horizontalStartPos = useRef(-1);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const scrollWidthScale = useRef(-1.0);

  const isTategumi = readerMode == readerModes.Tategumi;
  const isYokogumi = readerMode == readerModes.Yokogumi;

  enum screenOrientation {
    portrait,
    landscape,
  }

  const showSettingsBarThreshold = 1;
  const hideSettingsBarThreshold = -5;
  const startAreaThreshold = 18;

  const handleResize = () => {
    const oldOrientation =
      windowSize.width / windowSize.height > 1
        ? screenOrientation.landscape
        : screenOrientation.portrait;
    const newOrientation =
      window.innerWidth / window.innerHeight > 1
        ? screenOrientation.landscape
        : screenOrientation.portrait;

    if (oldOrientation != newOrientation) {
      enableScrollRestoration();
    }
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  const lastWidthScrollPos = useRef(0);

  const handleScroll = (scrollLeft: number, isReverse: boolean) => {
    const scrollStart = document.body.scrollWidth - window.innerWidth;

    if (isMobileSafari) {
      scrollWidthScale.current = scrollLeft / scrollStart;
      if (scrollStart != horizontalStartPos.current)
        horizontalStartPos.current = scrollStart;
    }

    const scrollSpeedDelta = Math.abs(scrollLeft) - lastWidthScrollPos.current;
    let shouldShow = isReverse
      ? scrollSpeedDelta < -showSettingsBarThreshold
      : scrollSpeedDelta > showSettingsBarThreshold;
    const shouldHide = isReverse
      ? scrollSpeedDelta > -hideSettingsBarThreshold
      : scrollSpeedDelta < hideSettingsBarThreshold;

    if (shouldShow && sidebarVisibility && lastWidthScrollPos.current != 0) {
      setSidebarVisibility(false);
    } else if (
      shouldHide &&
      !sidebarVisibility &&
      lastWidthScrollPos.current != 0
    ) {
      setSidebarVisibility(true);
    }
    lastWidthScrollPos.current = Math.abs(scrollLeft);
    shouldShow = isReverse
      ? horizontalStartPos.current - startAreaThreshold <
        lastWidthScrollPos.current
      : startAreaThreshold > lastWidthScrollPos.current;

    if (shouldShow && !sidebarVisibility) {
      setSidebarVisibility(true);
    }
  };

  const handleWheelScroll = (
    event: React.WheelEvent<HTMLDivElement> | WheelEvent,
    scrollLeft: number,
    scrollTop: number
  ) => {
    if (event.deltaY != 0 && isWindowHidden) {
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
      isMobileSafari && isTategumi
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
    if (!isWindowHidden) {
      toggleWindowVisibility();
    }
  };

  useLayoutEffect(() => {
    if ((!isSafari && isTategumi) || isYokogumi || isMobileSafari)
      window.addEventListener("scroll", handleScrollWindow);

    return () => {
      if ((!isSafari && isTategumi) || isYokogumi || isMobileSafari)
        window.removeEventListener("scroll", handleScrollWindow);
    };
  }, [handleScrollWindow, isTategumi, isYokogumi]);

  useEffect(() => {
    if (
      shouldScrollToStart &&
      isTategumi &&
      isMobileSafari &&
      document.body.scrollWidth != window.innerWidth
    ) {
      window.scrollTo(document.body.scrollWidth - window.innerWidth, 0); //scroll to the right (start)
      horizontalStartPos.current =
        document.body.scrollWidth - window.innerWidth;
      if (scrollWidthScale.current != -1.0) {
        window.scrollTo(
          (document.body.scrollWidth - window.innerWidth) *
            scrollWidthScale.current,
          0
        ); //scroll restoration
        scrollWidthScale.current = -1.0;
      } else {
        setSidebarVisibility(true); //show settings bar on initial load
      }
      console.log(document.body.scrollWidth - window.innerWidth);
      disableScrollRestoration();
    }

    if (isTategumi && !isSafari && !isMobile) {
      window.addEventListener("wheel", handleWheelScrollWindow);
    }

    if ((isMobileSafari || isSafari) && isTategumi) {
      window.addEventListener("resize", handleResize); //handle resize for safari (outer div width/height is constrained by wSize)
    }

    return () => {
      if (isTategumi && !isSafari && !isMobile) {
        window.removeEventListener("wheel", handleWheelScrollWindow);
      }

      if ((isMobileSafari || isSafari) && isTategumi) {
        window.removeEventListener("resize", handleResize);
      }
    };
  }, [readerMode, novelChapterQuery.isLoading, handleResize, handleWheelScrollWindow, shouldScrollToStart, isTategumi, disableScrollRestoration]);

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
  } as Interpolation<NonNullable<unknown>>;

  const dimScreenFunc = "brightness(0.3)";

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

  if (novelChapterQuery.isLoading) return <LoadingScreenSpinner />;

  if (
    novelChapterQuery.data == undefined ||
    !seriesTitleParam ||
    !chapterPathParam ||
    !chapterTitleParam
  ) {
    return <></>;
  }

  setSeriesTitle(seriesTitleParam);
  setChapterTitle(chapterTitleParam);

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

      <SettingsWindow></SettingsWindow>

      <Slide
        in={sidebarVisibility}
        style={{
          width: "100%",
          height: "100%",
          maxWidth: isTategumi ? "50px" : "unset",
          maxHeight: isYokogumi ? "50px" : "unset",
          zIndex: 2,
          filter: isWindowHidden ? "unset" : dimScreenFunc,
        }}
        direction={isTategumi ? "right" : "top"}
      >
        <SettingsBar isVertical={isTategumi}></SettingsBar>
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
        fontFamily={"Noto Sans Japanese"}
        fontWeight={"thin"}
        fontSize={fontSize}
        lineHeight={lineSpacing}
        overflowY={isTategumi ? "hidden" : "auto"}
        overflowX={isYokogumi ? "hidden" : "auto"}
        pt={isTategumi ? vMargins : "60px"}
        pb={isTategumi ? vMargins : "unset"}
        pr={isTategumi ? "60px" : "4%"}
        pl={isTategumi ? "undet" : "4%"}
        filter={isWindowHidden ? "unset" : dimScreenFunc}
        onClick={handleCloseSettingsOnClick}
        onWheel={
          isSafari && !isMobileSafari && isTategumi
            ? handleWheelScrollDiv
              // eslint-disable-next-line @typescript-eslint/no-empty-function
            : () => {}
        }
        onScroll={
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          isSafari && !isMobileSafari && isTategumi ? handleScrollDiv : () => {}
        }
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
          userSelect={isWindowHidden ? "auto" : "none"}
          cursor={isWindowHidden ? "auto" : "default"}
        >
          {novelChapterQuery.data.chapter_body.map((object, i) => {
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
};

export default NovelReader;
