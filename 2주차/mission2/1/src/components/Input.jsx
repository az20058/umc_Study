import styled from "styled-components";

export default function Input({ name, type, placeholder, register }) {
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
