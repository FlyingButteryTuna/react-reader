import { Button, ButtonProps } from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface LoginButtonProps extends ButtonProps {
  userEmail: string;
  userPassword: string;
}

const LoginButton: React.FC<LoginButtonProps> = (props) => {
  const { userEmail, userPassword, ...buttonProps } = props;

  const navigate = useNavigate();

  const handleLogin = () => {
    let data = {
      email: userEmail,
      password: userPassword,
    };
    axios
      .post("http://localhost:8080/api/v1/auth/auth", data, {
        withCredentials: true,
      })
      .then(() => {
        navigate("/test");
      })
      .catch(() => {
        console.log("invalid login");
      });
  };

  return (
    <Button {...buttonProps} onClick={handleLogin}>
      サインイン
    </Button>
  );
};

export default LoginButton;
