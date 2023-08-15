import { Button, ButtonProps } from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

interface LoginButtonProps extends ButtonProps {
  userEmail: string;
  userPassword: string;
}

const LoginButton: React.FC<LoginButtonProps> = (props) => {
  const { userEmail, userPassword, ...buttonProps } = props;

  type userCredentials = {
    email: string;
    password: string;
  };

  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: (userCredentials: userCredentials) => {
      return axios
        .post("/api/v1/auth/auth", userCredentials, {
          withCredentials: true,
        })
        .then(() => {
          navigate("/test");
        })
        .catch(() => {
          console.log("invalid login");
        });
    },
  });

  const handleLogin = () => {
    let data = {
      email: userEmail,
      password: userPassword,
    };

    mutation.mutate(data);
  };

  return (
    <Button {...buttonProps} onClick={handleLogin}>
      サインイン
    </Button>
  );
};

export default LoginButton;
