import { Box } from "@chakra-ui/react";

const SettingsBar = () => {
  return (
    <Box
      bgColor={"blackAlpha.600"}
      borderColor={"blue.500"}
      borderLeftWidth={"2px"}
      borderTopWidth={"2px"}
      borderBottomWidth={"2px"}
      minH={"100%"}
      right={"0px"}
      position={"fixed"}
      display={"block"}
      hidden={false}
      minWidth="40px"
      width={"55px"}
    ></Box>
  );
};

export default SettingsBar;
