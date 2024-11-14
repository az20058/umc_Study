import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  console.log(token);

  const [id, setId] = useState(null);
  console.log(id);

  const logout = () => {
    localStorage.clear();
    window.location.reload();
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000/user/me", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setId(res.data.email.split("@")[0]);
      });
  }, [token]);

  return (
    <NavContainer>
      <Logo onClick={() => navigate("/")}>YONGCHA</Logo>
      <Menu>
        {!id ? (
          <MenuItem onClick={() => navigate("/login")}>로그인</MenuItem>
        ) : (
          <>
            <UserInfo>{id}님 환영합니다.</UserInfo>
            <MenuItem onClick={logout}>로그아웃</MenuItem>
          </>
        )}
        {!id && (
          <SignupButton onClick={() => navigate("/signUp")}>
            회원가입
          </SignupButton>
        )}
      </Menu>
    </NavContainer>
  );
};

const NavContainer = styled.nav`
  width: 100vw;
  display: flex;
  justify-content: space-between;
  background-color: #1a1a1a;
  padding: 0.5rem 0;
`;

const Logo = styled.div`
  margin-left: 3%;
  cursor: pointer;
  color: #e83278;
  font-size: 1.5rem;
  font-weight: bold;
`;

const Menu = styled.div`
  display: flex;
  align-items: center;
  margin-right: 2%;
`;

const MenuItem = styled.div`
  color: #ffffff;
  margin-right: 1rem;
  cursor: pointer;
`;

const SignupButton = styled.button`
  background-color: #e83278;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 0.5rem 1rem;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

const UserInfo = styled.span`
  color: white;
  margin-right: 20px;
`;

export default Navbar;
