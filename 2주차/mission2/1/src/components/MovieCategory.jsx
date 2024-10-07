import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const CategoryContainer = styled.div`
  width: 100%;
  background-color: black;
  padding: 20px;
`;

const Title = styled.h2`
  color: white;
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: bold;
  text-align: left;
`;

const CategoryList = styled.div`
  display: flex;
  gap: 20px;
  overflow-x: auto; /* 가로 스크롤이 가능하도록 설정 */
  padding-bottom: 10px;
`;

const CategoryItem = styled.div`
  min-width: 250px;
  width: 18%;
  background-color: #333;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  cursor: pointer;
`;

const CategoryImage = styled.img`
  width: 100%;
  height: 100%;
  display: block;
`;

const CategoryLabel = styled.div`
  position: absolute;
  bottom: 10px;
  left: 10px;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 14px;
`;

const Category = ({ image, label, onClick }) => (
  <CategoryItem onClick={onClick}>
    <CategoryImage src={image} alt={label} />
    <CategoryLabel>{label}</CategoryLabel>
  </CategoryItem>
);

const MovieCategory = () => {
  const categories = [
    { image: 'https://i.pinimg.com/474x/13/29/51/132951cad4c271cc96c2d5fd1a84e825.jpg', label: '현재 상영중인', type: 'now-playing' },
    { image: 'https://i.pinimg.com/474x/ed/40/7e/ed407e49a629fe66e45d3b4f6bbfcf0f.jpg', label: '인기있는', type: 'popular' },
    { image: 'https://i.pinimg.com/474x/b0/40/52/b0405272c264ee01cb0b783273280687.jpg', label: '높은 평가를 받은', type: 'top-rated' },
    { image: 'https://i.pinimg.com/474x/5d/97/c7/5d97c7914a50d86264231a6a7087fde8.jpg', label: '개봉 예정중인', type: 'up-coming' },
  ];

  const navigate = useNavigate();

  return (
    <CategoryContainer>
      <Title>카테고리</Title>
      <CategoryList>
        {categories.map((category, index) => (
          <Category onClick={()=>navigate(`/movie/${category.type}`)} key={index} image={category.image} label={category.label} />
        ))}
      </CategoryList>
    </CategoryContainer>
  );
};

export default MovieCategory;