import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  console.log(token);

  const logout = () => {
    localStorage.clear();
    window.location.reload();
  };

  const fetchUserData = async (token) => {
    const response = await axios.get("http://localhost:3000/user/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  };

  const {
    data: user,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["userData", token],
    queryFn: () => fetchUserData(token),
    enabled: !!token,
  });

  if (isLoading) return null; // 로딩 중 상태 처리
  if (isError) return null; // 에러 상태 처리

  const userId = user?.email.split("@")[0];

  return (
    <NavContainer>
      <Logo onClick={() => navigate("/")}>YONGCHA</Logo>
      <Menu>
        {!userId ? (
          <MenuItem onClick={() => navigate("/login")}>로그인</MenuItem>
        ) : (
          <>
            <UserInfo>{userId}님 환영합니다.</UserInfo>
            <MenuItem onClick={logout}>로그아웃</MenuItem>
          </>
        )}
        {!userId && (
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
