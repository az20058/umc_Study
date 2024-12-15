import { useForm, SubmitHandler } from "react-hook-form";
import styled from "styled-components";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "./Input";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

// 폼 데이터 타입 정의
interface LoginFormInputs {
  email: string;
  password: string;
}

export default function Login() {
  // Yup 스키마 정의
  const schema = yup.object().shape({
    email: yup.string().email("올바른 이메일 형식을 사용하세요").required(),
    password: yup
      .string()
      .min(8, "8~16자를 사용하세요")
      .max(16, "8~16자를 사용하세요")
      .required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: yupResolver(schema),
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const navigate = useNavigate();

  // useMutation을 위한 타입 정의
  interface LoginResponse {
    accessToken: string;
    refreshToken: string;
  }

  const loginMutation = useMutation({
    mutationFn: (data: LoginFormInputs) =>
      axios.post<LoginResponse>("http://localhost:3000/auth/login", data),
    onSuccess: (res) => {
      localStorage.setItem("token", res.data.accessToken);
      localStorage.setItem("refresh", res.data.refreshToken);
      navigate("/");
    },
    onError: (error) => {
      console.error("로그인 실패:", error);
      alert("로그인에 실패했습니다.");
    },
  });

  // 제출 핸들러 타입 정의
  const onSubmit: SubmitHandler<LoginFormInputs> = (data) => {
    loginMutation.mutate(data);
  };

  return (
    <PageWrapper>
      <LoginWrapper
        onSubmit={handleSubmit(onSubmit)}
        color={errors.email || errors.password ? "gray" : "#e83278"}
      >
        <h1>로그인 페이지</h1>
        <Input
          name="email"
          placeholder="이메일을 입력해주세요"
          type="email"
          register={register}
        />
        <label>{errors.email?.message}</label>
        <Input
          name="password"
          placeholder="비밀번호를 입력해주세요"
          type="password"
          register={register}
        />
        <label>{errors.password?.message}</label>
        <button disabled={!!(errors.password || errors.email)} type="submit">
          로그인
        </button>
      </LoginWrapper>
    </PageWrapper>
  );
}

// styled-components 타입 정의
const PageWrapper = styled.div`
  background-color: black;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

interface LoginWrapperProps {
  color: string;
}

const LoginWrapper = styled.form<LoginWrapperProps>`
  width: 30%;
  display: flex;
  flex-direction: column;
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
