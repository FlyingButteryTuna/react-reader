import { Box } from "@chakra-ui/react";
import { isMobileSafari, isSafari } from "react-device-detect";
import { useReaderSettings } from "../states/readerSettings.ts";
import InnerDiv from "./InnerDiv.tsx";

const SettingsBar = (props: { isVertical: boolean }) => {
  const disableDoubleClickSelection = (
    event: React.MouseEvent<HTMLElement>
  ) => {
    if (event.detail > 1) {
      event.preventDefault();
    }
  };

  const readerTheme = useReaderSettings((state) => state.theme);

  return (
    <Box
      width={props.isVertical ? "50px" : "100%"}
      height={
        !props.isVertical
          ? "50px"
          : isSafari && !isMobileSafari
          ? "calc(100% - 6px)"
          : "100%"
      }
      bgColor={readerTheme.mainBgColor}
      borderLeftWidth={props.isVertical ? "2px" : "0px"}
      borderBottomWidth={!props.isVertical ? "2px" : "0px"}
      borderColor={readerTheme.settingsBarBorderColor}
      position={"fixed"}
      right={props.isVertical ? "0px" : "unset"}
      top={!props.isVertical ? "0px" : "unset"}
      zIndex={2}
      onMouseDown={disableDoubleClickSelection}
      sx={{
        writingMode: "horizontal-tb",
        WebkitTransform: "translate3d(0, 0, 0) !important",
      }}
    >
      <InnerDiv isVertical={props.isVertical}></InnerDiv>
    </Box>
  );
};

export default SettingsBar;
