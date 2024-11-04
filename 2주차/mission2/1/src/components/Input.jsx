import styled from "styled-components";

export default function Input({ type, placeholder, register }) {
  return (
    <InputWrapper {...register(type)} type={type} placeholder={placeholder} />
  );
}

const InputWrapper = styled.input`
  width: 100%;
  height: 40px;
  border-radius: 10px;
  padding: 5px;
`;
