import { Flex } from "@chakra-ui/react";

interface SettingsWindowProps {
  isHidden: boolean;
}

const SettingsWindow: React.FC<SettingsWindowProps> = ({ isHidden }) => {
  return (
    <Flex
      bgColor={"black"}
      position={"fixed"}
      hidden={isHidden}
      maxWidth={"270px"}
      maxHeight={"500px"}
      overflow={"auto"}
      m={"auto"}
      top={0}
      bottom={0}
      left={0}
      right={0}
      rounded={"10px"}
      textColor={"white"}
    >
      Hello
    </Flex>
  );
};

export default SettingsWindow;
