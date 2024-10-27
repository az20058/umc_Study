import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { fetchMovies } from "../hooks/fetchMovies";
import MovieCard from "./MovieCard";

// 스타일 컴포넌트로 각 요소 정의
const MovieList = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  justify-content: center;
  background-color: black;
  gap: 10px; /* 각 셀 사이의 간격 */
  overflow-y: auto;
`;

// 컴포넌트 정의
export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState("");
  const { type } = useParams();

  useEffect(() => {
    fetchMovies(type, setMovies, setIsLoading, setIsError);
  }, [type]);

  return (
    <MovieList>
      {!isLoading &&
        !isError &&
        movies.map((movie, index) => <MovieCard key={index} movie={movie} />)}
    </MovieList>
  );
}
