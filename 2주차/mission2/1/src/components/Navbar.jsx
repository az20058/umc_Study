import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <NavContainer>
      <Logo onClick={(()=>navigate('/'))}>YONGCHA</Logo>
      <Menu>
        <MenuItem onClick={(()=>navigate('/login'))}>로그인</MenuItem>
        <SignupButton onClick={(()=>navigate('/signUp'))}>회원가입</SignupButton>
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

export default Navbar;
