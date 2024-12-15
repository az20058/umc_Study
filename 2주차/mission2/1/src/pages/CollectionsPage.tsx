import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";

const CollectionsGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 25px;
  padding: 20px;
  box-sizing: border-box;
`;

const CollectionCard = styled.div`
  background: #2a2a2a;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.2s;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
  }

  .collection-image img {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }

  .collection-info {
    padding: 15px;
  }

  .movie-count {
    color: #ff0558;
    font-size: 14px;
  }
`;

const PageHeader = styled.div`
  padding: 20px;
  h1 {
    margin-bottom: 10px;
  }
  p {
    color: #999;
  }
`;

// 임시 데이터 (나중에 실제 API로 교체)
const mockCollections = [
  {
    id: 1,
    title: "2024년 아카데미 수상작",
    description: "제96회 아카데미 시상식 수상 작품 모음",
    coverImage: "https://example.com/academy.jpg",
    movieCount: 12,
  },
  {
    id: 2,
    title: "봄에 보기 좋은 로맨스",
    description: "따스한 봄날에 어울리는 로맨틱 무비",
    coverImage: "https://example.com/romance.jpg",
    movieCount: 15,
  },
];

const CollectionsPage = () => {
  const {
    data: collections,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["collections"],
    queryFn: () => mockCollections, // 실제 API 호출로 교체 필요
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading collections!</div>;

  return (
    <div>
      <PageHeader>
        <h1>컬렉션</h1>
        <p>왓챠가 엄선한 테마별 영화 컬렉션</p>
      </PageHeader>

      <CollectionsGrid>
        {collections.map((collection) => (
          <CollectionCard key={collection.id}>
            <div className="collection-image">
              <img src={collection.coverImage} alt={collection.title} />
            </div>
            <div className="collection-info">
              <h3>{collection.title}</h3>
              <p>{collection.description}</p>
              <span className="movie-count">
                {collection.movieCount}개의 작품
              </span>
            </div>
          </CollectionCard>
        ))}
      </CollectionsGrid>
    </div>
  );
};

export default CollectionsPage;
