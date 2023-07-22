import { Flex, Spinner } from "@chakra-ui/react";

const LoadingScreenSpinner = () => {
  return (
    <Flex
      width={"100vw"}
      height={"100vh"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Spinner size={"xl"}></Spinner>
    </Flex>
  );
};

export default LoadingScreenSpinner;
