import { AtSignIcon } from "@chakra-ui/icons";

import {
  Input,
  chakra,
  InputGroup,
  InputLeftElement,
  InputProps,
} from "@chakra-ui/react";

interface EmailInputProps extends InputProps {
  userEmail: string;
  setUserEmail: React.Dispatch<React.SetStateAction<string>>;
  headerColor: string;
}

const EmailInput: React.FC<EmailInputProps> = (props) => {
  const { userEmail, setUserEmail, headerColor, ...inputProps } = props;

  return (
    <chakra.section
      display={"flex"}
      flexDir={"column"}
      height={"fit-content"}
      rowGap={2}
    >
      <chakra.h2 fontSize="lg" fontWeight={"medium"} textColor={headerColor}>
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
  );
};

export default EmailInput;
