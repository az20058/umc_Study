import styled from "styled-components";

interface InputProps {
  name: string;
  type: string;
  placeholder: string;
  register: (name: string) => { [key: string]: any }; // `register` 함수의 반환 타입에 따라 수정 필요
}

export default function Input({
  name,
  type,
  placeholder,
  register,
}: InputProps) {
  return (
    <InputWrapper {...register(name)} type={type} placeholder={placeholder} />
  );
}

const InputWrapper = styled.input`
  width: 100%;
  height: 40px;
  border-radius: 10px;
  padding: 5px;
`;
