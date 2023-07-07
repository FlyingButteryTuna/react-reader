import { Flex, Text } from "@chakra-ui/react";
import { ReaderTheme } from "./ReaderThemes.ts";

interface ThemeElementProps {
  theme: ReaderTheme;
  isSelected: boolean;
  setReaderTheme: React.Dispatch<React.SetStateAction<ReaderTheme>>;
}

const ThemeElement: React.FC<ThemeElementProps> = ({
  theme,
  isSelected,
  setReaderTheme,
}) => {
  const handleThemeChange = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    if (!isSelected) {
      setReaderTheme(theme);
    }
  };

  return (
    <>
      <Flex
        border={"1px"}
        height={"20%"}
        width={"100%"}
        justify={"center"}
        align={"center"}
        rounded={"10"}
        cursor={"pointer"}
        borderColor={isSelected ? "cyan.500" : "white"}
        _hover={{
          borderColor: "cyan.500",
        }}
        my={1}
        onClick={handleThemeChange}
      >
        <Text fontSize={"24px"} lineHeight={"100%"}>
          {theme.themeName}
        </Text>
      </Flex>
    </>
  );
};

export default ThemeElement;
