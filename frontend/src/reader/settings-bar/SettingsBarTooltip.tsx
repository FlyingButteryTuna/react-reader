import { PropsWithChildren } from "react";
import { useReaderSettings } from "../states/readerSettings.ts";
import {
  Flex,
  Tooltip,
  PlacementWithLogical,
  TooltipProps,
} from "@chakra-ui/react";

interface SettingsBarTooltipProps extends PropsWithChildren<TooltipProps> {
  isVertical: boolean;
}

const SettingsBarTooltip: React.FC<SettingsBarTooltipProps> = (props) => {
  const { onClick, children, isVertical, ...restOfProps } = props;

  const readerTheme = useReaderSettings((state) => state.theme);

  const writingMode = isVertical ? "vertical-rl" : "horizontal-tb";

  const iconWrapperProps = {
    minWidth: "50px",
    minHeight: "50px",
    sx: { _hover: { color: readerTheme.settingsBarHoverColor } },
    cursor: "pointer",
    alignItems: "center",
  };

  const toolTipProps = {
    hasArrow: true,
    fontSize: "small",
    placement: isVertical
      ? ("left" as PlacementWithLogical)
      : ("bottom" as PlacementWithLogical),
    backgroundColor: readerTheme.toolTipStyle.bgColor,
    textColor: readerTheme.toolTipStyle.textColor,
    sx: { writingMode: writingMode },
  };
  return (
    <Tooltip {...toolTipProps} {...restOfProps}>
      <Flex {...iconWrapperProps} onClick={onClick}>
        {children}
      </Flex>
    </Tooltip>
  );
};

export default SettingsBarTooltip;
