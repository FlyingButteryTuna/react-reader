import { AtSignIcon } from "@chakra-ui/icons";
import { AiOutlineLock } from "react-icons/ai";
import { BsEyeFill } from "react-icons/bs";

import {
  Flex,
  Input,
  chakra,
  Text,
  Button,
  Link,
  useColorMode,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import { isMobile } from "react-device-detect";

const AuthorizationForm = () => {
  useEffect(() => {
    document.title = "Sign in";
  });
  const { colorMode, toggleColorMode } = useColorMode();
  const [userEmail, setUserEmail] = useState("");
  const [userPassoword, setUserPassword] = useState("");
  const [showPassowrd, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const inputProps = {
    mx: "auto",
    width: "100%",
    variant: "filled",
    fontSize: "sm",
  };

  const handleLogin = (event: React.MouseEvent<HTMLButtonElement>) => {
    let data = {
      email: userEmail,
      password: userPassoword,
    };
    axios
      .post("http://192.16:8080/api/v1/auth/auth", data, {
        withCredentials: true,
      })
      .then(() => {
        navigate("/test");
      })
      .catch(() => {
        console.log("invalid login");
      });
  };

  const handlePasswordToggle = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    event.preventDefault();
    setShowPassword(!showPassowrd);
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

          <InputGroup display={"box"}>
            <InputLeftElement pointerEvents={"none"} fontSize={"lg"}>
              <AtSignIcon></AtSignIcon>
            </InputLeftElement>
            <Input
              {...inputProps}
              value={userEmail}
              onChange={(event) => setUserEmail(event.target.value)}
              placeholder="john@example.com"
            ></Input>
          </InputGroup>
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

          <InputGroup display={"box"}>
            <InputLeftElement pointerEvents={"none"} fontSize={"lg"}>
              <AiOutlineLock></AiOutlineLock>
            </InputLeftElement>

            <Input
              {...inputProps}
              value={userPassoword}
              onChange={(event) => setUserPassword(event.target.value)}
              placeholder="••••••••••••••••"
              type={showPassowrd ? "text" : "password"}
            ></Input>

            <InputRightElement
              onClick={handlePasswordToggle}
              color={showPassowrd ? "cyan.500" : "unset"}
              _hover={{ color: isMobile ? {} : "cyan.500" }}
              _active={{ color: "cyan.500" }}
            >
              <BsEyeFill />
            </InputRightElement>
          </InputGroup>
        </chakra.section>

        <Button
          mt={"auto"}
          alignSelf={"center"}
          width={"50%"}
          fontSize={"md"}
          onClick={handleLogin}
        >
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

export default AuthorizationForm;
