import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import { validate } from "email-validator";
import { useEffect, useState } from "react";

const RegistrationAlerts = (props: {
  userEmail: string;
  userPassword: string;
  invalidSetters: {
    setIsEmailInvalid: React.Dispatch<React.SetStateAction<boolean>>;
    setIsPasswordInvalid: React.Dispatch<React.SetStateAction<boolean>>;
  };
}) => {
  const [alertDescription, setAlertDescription] = useState<alertDesc | null>();

  type alertDesc = {
    title: string;
    decsription: string;
  };

  const passwordTooShort: alertDesc = {
    title: "パスワードが短すぎます",
    decsription: "最低限７文字が必要です",
  };

  const passwordNoCapitalLetters: alertDesc = {
    title: "パスワードに大文字が含まれていません",
    decsription: "パスワードには少なくとも1つの大文字を含めてください",
  };

  const passowrdInvalidSymboles: alertDesc = {
    title: "パスワードに無効な文字が含まれています",
    decsription:
      "パスワードには英数字とアンダースコア(_)のみを使用してください",
  };

  const passowrdNumbersAndLetters: alertDesc = {
    title: "数字とアルファベットを含めてください",
    decsription:
      "パスワードには少なくとも1つの数字と1つのアルファベットが必要です",
  };

  const passowrdConsecutiveSymboles: alertDesc = {
    title: "パスワードに連続した記号が含まれています",
    decsription:
      "パスワードに連続した同じ記号が3つ以上含まれていないかご確認ください",
  };

  const incorrectEmail: alertDesc = {
    title: "不正なメールアドレスです",
    decsription: "正しいメールアドレスをご入力ください",
  };

  // Function to check if the password contains more than 3 consecutive symbols
  const hasMoreThan3ConsecutiveSymbols = (password: string): boolean =>
    /(\w)\1{3}/.test(password);

  // Function to check if the password contains at least one uppercase letter
  const containsUpperCaseLetter = (password: string): boolean =>
    /[A-Z]/.test(password);

  // Function to check if the password contains both letters and numbers
  const hasLettersAndNumbers = (password: string): boolean => {
    const hasLetters = /[a-zA-Z]/.test(password);
    const hasNumbers = /\d/.test(password);
    return hasLetters && hasNumbers;
  };

  // Function to check if the password contains only allowed characters (letters, numbers, and underscores)
  const containsOnlyAllowedCharacters = (password: string): boolean =>
    /^[a-zA-Z0-9_]+$/.test(password);

  useEffect(() => {
    let alertDescriptionTmp: alertDesc | null;
    let isEmailInvalid = false;
    let isPasswordInvalid = false;

    if (props.userEmail && !validate(props.userEmail)) {
      alertDescriptionTmp = incorrectEmail;
      isEmailInvalid = true;
    } else if (!props.userPassword) {
      alertDescriptionTmp = null; // Handle the case when props.userPassword is falsy (null or undefined)
    } else {
      alertDescriptionTmp =
        props.userPassword.length < 7
          ? passwordTooShort
          : !containsOnlyAllowedCharacters(props.userPassword)
          ? passowrdInvalidSymboles
          : !hasLettersAndNumbers(props.userPassword)
          ? passowrdNumbersAndLetters
          : !containsUpperCaseLetter(props.userPassword)
          ? passwordNoCapitalLetters
          : hasMoreThan3ConsecutiveSymbols(props.userPassword)
          ? passowrdConsecutiveSymboles
          : null; // Set to null when no alert description is needed
      isPasswordInvalid = alertDescriptionTmp ? true : false;
    }
    setAlertDescription(alertDescriptionTmp);
    props.invalidSetters.setIsEmailInvalid(isEmailInvalid);
    props.invalidSetters.setIsPasswordInvalid(isPasswordInvalid);
  }, [props.userEmail, props.userPassword]);

  return (
    <Alert
      status="error"
      width={[300, 350, 400, 450]}
      hidden={alertDescription ? false : true}
    >
      <AlertIcon></AlertIcon>
      <AlertTitle>{alertDescription?.title}</AlertTitle>
      <AlertDescription>{alertDescription?.decsription}</AlertDescription>
    </Alert>
  );
};

export default RegistrationAlerts;
