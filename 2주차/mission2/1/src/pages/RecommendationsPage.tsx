import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import MovieCard from "../components/MovieCard";

type Movie = {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  [key: string]: any;
};

type RecommendationsData = {
  trending: Movie[];
  basedOnRatings: Movie[];
  similar: Movie[];
};

const PageContainer = styled.div`
  padding: 20px;
`;

const PageHeader = styled.div`
  margin-bottom: 30px;
  h1 {
    font-size: 2rem;
    margin-bottom: 10px;
  }
  p {
    color: #999;
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  margin: 30px 0 15px 0;
  color: #fff;
`;

const MovieGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
`;

const API_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNTNkYWIyMDkxMzI2Y2Y3NTkwNTAwYjQyODNkNjZkNyIsIm5iZiI6MTcyNjE0MTU3Ny42MDM2ODcsInN1YiI6IjY0MzVmY2Y2NjUxZmNmMDBkM2RhYzNmNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.cFPsPRHPidq2OnJ3U-3wHJYhnGajDFqUsM8XJ_a_0bw"; // 여기에 본인의 TMDB Bearer Token을 입력하세요.
const BASE_URL = "https://api.themoviedb.org/3";

const fetchRecommendations = async (): Promise<RecommendationsData> => {
  const headers = {
    Authorization: `Bearer ${API_TOKEN}`,
    "Content-Type": "application/json;charset=utf-8",
  };

  const trendingResponse = await fetch(
    `${BASE_URL}/trending/movie/week?language=ko-KR`,
    { headers }
  );
  const ratingsResponse = await fetch(
    `${BASE_URL}/movie/top_rated?language=ko-KR&page=1`,
    { headers }
  );
  const similarResponse = await fetch(
    `${BASE_URL}/movie/550/similar?language=ko-KR&page=1`, // movie ID 550(가상 ID)을 대체하세요.
    { headers }
  );

  const trending = await trendingResponse.json();
  const ratings = await ratingsResponse.json();
  const similar = await similarResponse.json();

  return {
    trending: trending.results,
    basedOnRatings: ratings.results,
    similar: similar.results,
  };
};

const RecommendationsPage = (): JSX.Element => {
  const {
    data: recommendations,
    isLoading,
    isError,
  } = useQuery<RecommendationsData>({
    queryKey: ["recommendations"],
    queryFn: fetchRecommendations,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading recommendations!</div>;

  const renderMovieSection = (title: string, movies: Movie[]) => {
    return (
      <>
        <SectionTitle>{title}</SectionTitle>
        <MovieGrid>
          {movies.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </MovieGrid>
      </>
    );
  };

  return (
    <PageContainer>
      <PageHeader>
        <h1>추천 영화</h1>
        <p>당신의 취향에 맞는 영화를 추천해드립니다</p>
      </PageHeader>

      {renderMovieSection("취향 기반 추천", recommendations.basedOnRatings)}
      {renderMovieSection("비슷한 영화", recommendations.similar)}
      {renderMovieSection("지금 뜨는 영화", recommendations.trending)}
    </PageContainer>
  );
};

export default RecommendationsPage;
