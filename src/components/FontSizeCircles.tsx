import { Circle } from "@chakra-ui/react";

interface FontSizeCirclesProps {
  numberOfSizes: number;
  selectedSize: number;
}

const FontSizeCircles: React.FC<FontSizeCirclesProps> = ({
  numberOfSizes,
  selectedSize,
}) => {
  const inactiveColor = "gray";
  const activeColor = "white";

  let resultArr: JSX.Element[] = [];
  for (let i = 1; i <= numberOfSizes; i++) {
    resultArr.push(
      <Circle
        display={"block"}
        bgColor={i == selectedSize ? activeColor : inactiveColor}
        size={"5px"}
        key={i}
      ></Circle>
    );
  }
  resultArr.reverse();

  return resultArr;
};

export default FontSizeCircles;
