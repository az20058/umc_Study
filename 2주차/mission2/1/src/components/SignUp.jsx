import { useForm } from "react-hook-form";
import styled from "styled-components";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "./Input";

export default function SignUp() {
  const schema = yup.object().shape({
    email: yup.string().email("올바른 이메일 형식을 사용하세요").required(),
    password: yup
      .string()
      .min(8, "8~16자를 사용하세요")
      .max(16, "8~16자를 사용하세요")
      .required(),
    password2: yup
      .string()
      .oneOf([yup.ref("password"), null], "비밀번호가 일치하지 않습니다"),
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
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <PageWrapper>
      <SignupWrapper
        onSubmit={handleSubmit(onSubmit)}
        color={errors.email || errors.password ? "gray" : "#e83278"}
      >
        <h1>회원가입</h1>
        <Input type="email" register={register} placeholder="이메일" />
        <label>{errors.email?.message}</label>
        <Input type="password" register={register} placeholder="비밀번호" />
        <label>{errors.password?.message}</label>
        <Input
          type="password2"
          register={register}
          placeholder="비밀번호 확인"
        />
        <label>{errors.password2?.message}</label>
        <button type="submit">회원가입</button>
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

const SignupWrapper = styled.form`
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
