import { Flex, chakra, Text, Link, useColorMode } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import EmailInput from "../EmailInput";
import PasswordInput from "../PasswordInput";
import LoginButton from "./LoginButton";

const AuthorizationForm = () => {
  useEffect(() => {
    document.title = "Sign in";
  });
  const { colorMode } = useColorMode();
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const inputProps = {
    mx: "auto",
    width: "100%",
    variant: "filled",
    fontSize: "sm",
  };

  return (
    <Flex
      flexDir={"column"}
      rowGap={5}
      width={"100%"}
      height={"90vh"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Flex
        flexDir={"column"}
        width={[300, 350, 400, 450]}
        minHeight={"450px"}
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

        <EmailInput
          {...inputProps}
          headerColor={"unset"}
          userEmail={userEmail}
          setUserEmail={setUserEmail}
        ></EmailInput>

        <PasswordInput
          {...inputProps}
          headerColor={"unset"}
          userPassword={userPassword}
          setUserPassword={setUserPassword}
        ></PasswordInput>

        <LoginButton
          mt={"auto"}
          alignSelf={"center"}
          width={"50%"}
          fontSize={"md"}
          userEmail={userEmail}
          userPassword={userPassword}
        ></LoginButton>

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

export default AuthorizationForm;
