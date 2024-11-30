import styled from "styled-components";
import { FaSearch, FaFilm } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { MdCollections, MdStarRate } from "react-icons/md";

const SideBar = () => {
  const navigate = useNavigate();

  return (
    <SidebarContainer>
      <MenuItem onClick={() => navigate("/search")}>
        <FaSearch />
        <span>찾기</span>
      </MenuItem>
      <MenuItem onClick={() => navigate("/movies")}>
        <FaFilm />
        <span>영화</span>
      </MenuItem>
      <MenuItem onClick={() => navigate("/collections")}>
        <MdCollections />
        <span>My Collections</span>
      </MenuItem>

      <MenuItem onClick={() => navigate("/ratings")}>
        <MdStarRate />
        <span>My Ratings</span>
      </MenuItem>
    </SidebarContainer>
  );
};

const SidebarContainer = styled.div`
  float: left;
  width: 200px;
  height: 100%;
  background-color: #1a1a1a;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  box-sizing: border-box;
`;

const MenuItem = styled.div`
  display: flex;
  align-items: center;
  color: #ffffff;
  font-size: 1rem;
  margin-bottom: 1rem;
  cursor: pointer;

  & > svg {
    margin-right: 0.5rem;
  }

  &:hover {
    opacity: 0.8;
  }
`;

export default SideBar;
