import { Flex, chakra } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import EmailInput from "../EmailInput";
import PasswordInput from "../PasswordInput";
import RegistrationAlerts from "./RegistrationAlerts";
import RegisterButton from "./RegisterButton";

const AuthorizationForm = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [isPasswordInvalid, setIsPasswordInvalid] = useState(false);
  const [isEmailInvalid, setIsEmailInvalid] = useState(false);

  const inputProps = {
    mx: "auto",
    width: "100%",
    variant: "filled",
    fontSize: "sm",
  };

  useEffect(() => {
    document.title = "Register";
  }, [userPassword, userEmail]);

  return (
    <>
      <Flex
        flexDir={"column"}
        rowGap={5}
        width={"100%"}
        height={"90vh"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <RegistrationAlerts
          userEmail={userEmail}
          userPassword={userPassword}
          invalidSetters={{ setIsPasswordInvalid, setIsEmailInvalid }}
        ></RegistrationAlerts>
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
            新規登録
          </chakra.h1>

          <EmailInput
            {...inputProps}
            headerColor={isEmailInvalid ? "red.200" : "unset"}
            userEmail={userEmail}
            setUserEmail={setUserEmail}
          ></EmailInput>

          <PasswordInput
            {...inputProps}
            headerColor={isPasswordInvalid ? "red.200" : "unset"}
            userPassword={userPassword}
            setUserPassword={setUserPassword}
          ></PasswordInput>

          <RegisterButton
            userEmail={userEmail}
            userPassword={userPassword}
            invalidSetters={{ setIsPasswordInvalid, setIsEmailInvalid }}
            areCredentialsInvalid={{ isEmailInvalid, isPasswordInvalid }}
          ></RegisterButton>
        </Flex>
      </Flex>
    </>
  );
};

export default AuthorizationForm;
