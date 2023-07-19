import { AiOutlineLock } from "react-icons/ai";
import { BsEyeFill } from "react-icons/bs";

import {
  Input,
  chakra,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  InputProps,
} from "@chakra-ui/react";
import { isMobile } from "react-device-detect";
import { useState } from "react";

interface PasswordInputProps extends InputProps {
  userPassword: string;
  setUserPassword: React.Dispatch<React.SetStateAction<string>>;
  headerColor: string;
}

const PasswordInput: React.FC<PasswordInputProps> = (props) => {
  const { userPassword, setUserPassword, headerColor, ...inputProps } = props;

  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordToggle = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    event.preventDefault();
    setShowPassword(!showPassword);
  };

  return (
    <chakra.section
      display={"flex"}
      flexDir={"column"}
      height={"fit-content"}
      rowGap={2}
    >
      <chakra.h2 fontSize="lg" fontWeight={"medium"} textColor={headerColor}>
        パスワード
      </chakra.h2>

      <InputGroup display={"box"}>
        <InputLeftElement pointerEvents={"none"} fontSize={"lg"}>
          <AiOutlineLock></AiOutlineLock>
        </InputLeftElement>
        <Input
          {...inputProps}
          value={userPassword}
          onChange={(event) => setUserPassword(event.target.value)}
          placeholder="••••••••••••••••"
          type={showPassword ? "text" : "password"}
        ></Input>

        <InputRightElement
          onClick={handlePasswordToggle}
          color={showPassword ? "cyan.500" : "unset"}
          _hover={{ color: isMobile ? {} : "cyan.500" }}
          _active={{ color: "cyan.500" }}
        >
          <BsEyeFill />
        </InputRightElement>
      </InputGroup>
    </chakra.section>
  );
};

export default PasswordInput;
