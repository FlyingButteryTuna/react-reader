import { RadioProps, useRadio, chakra, Text, Flex } from "@chakra-ui/react";

interface SettingsRadioProps extends RadioProps {
  settingName: string;
}

const SettingsRadio: React.FC<SettingsRadioProps> = (props) => {
  const { settingName, rounded, fontSize, ...radioProps } = props;
  const { state, getInputProps, getRadioProps, htmlProps, getLabelProps } =
    useRadio(radioProps);
  return (
    <chakra.label {...htmlProps} cursor={"pointer"} width={"45%"}>
      <input {...getInputProps({})} hidden></input>
      <Flex
        {...getRadioProps()}
        rounded={rounded}
        fontSize={fontSize}
        h={"fit-content"}
        _hover={{ borderColor: "cyan.500" }}
        minW={"100%"}
        minH={"100%"}
        border={"1px"}
        borderColor={state.isChecked ? "cyan.500" : "unset"}
        whiteSpace={"nowrap"}
        lineHeight={"normal"}
        py={1}
      >
        <Text
          m={"auto"}
          sx={{ writingMode: "vertical-rl" }}
          {...getLabelProps()}
        >
          {props.settingName}
        </Text>
      </Flex>
    </chakra.label>
  );
};

export default SettingsRadio;
