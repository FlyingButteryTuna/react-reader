import {
  Flex,
  Input,
  chakra,
  Text,
  Button,
  Link,
  useColorMode,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

const RegistrationForm = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [userEmail, setUserEmail] = useState("");
  const [userPassoword, setUserPassword] = useState("");
  const inputProps = {
    mx: "auto",
    width: "90%",
    variant: "filled",
    fontSize: "sm",
  };
  return (
    <Flex
      flexDir={"column"}
      rowGap={5}
      width={"100%"}
      height={window.innerHeight}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Button onClick={toggleColorMode}>toggle color mode</Button>
      <Flex
        flexDir={"column"}
        width={[300, 350, 400, 450]}
        minHeight={"500px"}
        border={"2px"}
        justify={"flex-start"}
        rounded={10}
        p={4}
        rowGap={5}
      >
        <chakra.h1
          fontWeight={"semibold"}
          fontSize={"2xl"}
          alignSelf={"center"}
        >
          ログイン
        </chakra.h1>

        <chakra.section
          display={"flex"}
          flexDir={"column"}
          height={"fit-content"}
          rowGap={2}
        >
          <chakra.h2 fontSize="lg" fontWeight={"medium"}>
            メールアドレス
          </chakra.h2>
          <Input
            {...inputProps}
            value={userEmail}
            onChange={(event) => setUserEmail(event.target.value)}
            placeholder="john@example.com"
          ></Input>
        </chakra.section>

        <chakra.section
          display={"flex"}
          flexDir={"column"}
          height={"fit-content"}
          rowGap={2}
        >
          <chakra.h2 fontSize="lg" fontWeight={"medium"}>
            パスワード
          </chakra.h2>
          <Input
            {...inputProps}
            value={userPassoword}
            onChange={(event) => setUserPassword(event.target.value)}
            placeholder="●●●●●●●"
          ></Input>
        </chakra.section>

        <Button mt={"auto"} alignSelf={"center"} width={"50%"} fontSize={"md"}>
          サインイン
        </Button>

        <chakra.section display={"flex"} flexDir={"column"} fontSize={"sm"}>
          <Text m={"auto"}>アカウントをお持ちでない場合</Text>
          <Link
            href="/signup"
            m={"auto"}
            color={colorMode == "dark" ? "teal.200" : "teal.500"}
          >
            アカウントを作成する
          </Link>
        </chakra.section>
      </Flex>
    </Flex>
  );
};

export default RegistrationForm;
