import { useForm } from "react-hook-form";
import styled from "styled-components";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "./Input";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

export default function Login() {
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
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const navigate = useNavigate();

  // 로그인 요청을 위한 useMutation 설정
  const loginMutation = useMutation({
    mutationFn: (data) =>
      axios.post("http://localhost:3000/auth/login", {
        email: data.email,
        password: data.password,
      }),
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

  const onSubmit = (data) => {
    // useMutation의 mutate를 사용하여 로그인 요청
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
          type={"email"}
          register={register}
        />
        <label>{errors.email?.message}</label>
        <Input
          name="password"
          placeholder="비밀번호를 입력해주세요"
          type={"password"}
          register={register}
        />
        <label>{errors.password?.message}</label>
        <button disabled={errors.password || errors.email} type={"submit"}>
          로그인
        </button>
      </LoginWrapper>
    </PageWrapper>
  );
}

const PageWrapper = styled.div`
  background-color: black;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const LoginWrapper = styled.form`
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
