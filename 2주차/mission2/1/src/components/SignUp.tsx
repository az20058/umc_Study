import { useForm } from "react-hook-form";
import styled from "styled-components";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "./Input";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

interface SignUpFormValues {
  email: string;
  password: string;
  password2: string;
}

export default function SignUp(): JSX.Element {
  const schema = yup.object().shape({
    email: yup
      .string()
      .email("올바른 이메일 형식을 사용하세요")
      .required("이메일은 필수 입력 항목입니다."),
    password: yup
      .string()
      .min(8, "8~16자를 사용하세요")
      .max(16, "8~16자를 사용하세요")
      .required("비밀번호는 필수 입력 항목입니다."),
    password2: yup
      .string()
      .oneOf([yup.ref("password"), null], "비밀번호가 일치하지 않습니다")
      .required("비밀번호 확인은 필수 입력 항목입니다."),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormValues>({
    resolver: yupResolver(schema),
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const navigate = useNavigate();

  // 회원가입을 위한 useMutation 설정
  const signUpMutation = useMutation({
    mutationFn: (data: SignUpFormValues) =>
      axios.post("http://localhost:3000/auth/register", data),
    onSuccess: () => {
      alert("회원가입이 완료되었습니다.");
      navigate("/login");
    },
    onError: (error) => {
      console.error("회원가입 실패:", error);
      alert("회원가입에 실패했습니다.");
    },
  });

  const onSubmit = (data: SignUpFormValues): void => {
    // useMutation의 mutate를 사용하여 회원가입 요청
    signUpMutation.mutate(data);
  };

  return (
    <PageWrapper>
      <SignupWrapper
        onSubmit={handleSubmit(onSubmit)}
        color={errors.email || errors.password ? "gray" : "#e83278"}
      >
        <h1>회원가입</h1>
        <Input
          name="email"
          type="email"
          register={register}
          placeholder="이메일"
        />
        <label>{errors.email?.message}</label>
        <Input
          name="password"
          type="password"
          register={register}
          placeholder="비밀번호"
        />
        <label>{errors.password?.message}</label>
        <Input
          type="password"
          name="password2"
          register={register}
          placeholder="비밀번호 확인"
        />
        <label>{errors.password2?.message}</label>
        <button type="submit" disabled={signUpMutation.isLoading}>
          {signUpMutation.isLoading ? "회원가입 중..." : "회원가입"}
        </button>
      </SignupWrapper>
    </PageWrapper>
  );
}

const PageWrapper = styled.div`
  background-color: black;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SignupWrapper = styled.form<{ color: string }>`
  display: flex;
  flex-direction: column;
  width: 30%;
  align-items: center;

  h1 {
    font-size: 24px !important;
    color: white;
  }

  input {
    border-radius: 10px;
    width: 100%;
    height: 40px;
    padding: 5px;
  }

  label {
    color: red;
  }

  button {
    background-color: ${({ color }) => color};
    color: white;
    margin-top: 20px;
  }
`;
