import { Button } from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface RegisterButtonProps {
  userEmail: string;
  userPassword: string;
  areCredentialsInvalid: {
    isEmailInvalid: boolean;
    isPasswordInvalid: boolean;
  };
  invalidSetters: {
    setIsEmailInvalid: React.Dispatch<React.SetStateAction<boolean>>;
    setIsPasswordInvalid: React.Dispatch<React.SetStateAction<boolean>>;
  };
}

const RegisterButton: React.FC<RegisterButtonProps> = ({
  userEmail,
  userPassword,
  areCredentialsInvalid,
  invalidSetters,
}) => {
  const navigate = useNavigate();

  const handleRegister = () => {
    if (!userEmail) {
      invalidSetters.setIsEmailInvalid(true);
    }
    if (!userPassword) {
      invalidSetters.setIsPasswordInvalid(true);
    }
    if (
      areCredentialsInvalid.isEmailInvalid ||
      areCredentialsInvalid.isPasswordInvalid ||
      !userEmail ||
      !userPassword
    ) {
      return;
    }

    let data = {
      email: userEmail,
      password: userPassword,
    };

    axios
      .post("http://localhost:8080/api/v1/auth/register", data)
      .then(() => {
        navigate("/signin");
      })
      .catch(() => {
        console.log("error creating a new user!");
      });
  };

  return (
    <Button
      mt={"auto"}
      alignSelf={"center"}
      width={"50%"}
      fontSize={"md"}
      onClick={handleRegister}
    >
      登録する
    </Button>
  );
};

export default RegisterButton;
