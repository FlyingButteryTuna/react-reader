import { Box, Text } from "@chakra-ui/react";

interface SettingsElementProps {
  lockSetting: boolean;
  settingHeader: string;
  children: React.ReactNode;
}

const SettingsElement: React.FC<SettingsElementProps> = ({
  lockSetting,
  settingHeader,
  children,
}) => {
  return (
    <Box
      h={"fit-content"}
      display={"flex"}
      flexDir={"row-reverse"}
      alignItems={"center"}
      border={"1px"}
      rounded={10}
      minWidth={"100%"}
      height={"auto"}
      p={1}
      userSelect={"none"}
      cursor={lockSetting ? "not-allowed" : "default"}
      textColor={lockSetting ? "gray" : "unset"}
      sx={{
        WebkitTransform: "translate3d(0, 0, 0) !important",
      }}
    >
      <Text
        fontSize={"12px"}
        lineHeight={"normal"}
        sx={{
          writingMode: "vertical-rl",
        }}
        cursor={lockSetting ? "not-allowed" : "default"}
        fontWeight={"semibold"}
      >
        {settingHeader}
      </Text>

      {children}
    </Box>
  );
};

export default SettingsElement;
