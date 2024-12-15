import axios from "axios";
import { useRef, useState } from "react";
import styled from "styled-components";
import { debounce } from "lodash";
import MovieCard from "./MovieCard";
import { useQuery } from "@tanstack/react-query";
import React from "react";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
}

interface MovieResponse {
  results: Movie[];
}

export default function Search(): JSX.Element {
  const titleRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState<string>("");

  const fetchMovies = async (query: string): Promise<MovieResponse> => {
    if (!query.trim()) return { results: [] };
    const { data } = await axios.get<MovieResponse>(
      `https://api.themoviedb.org/3/search/movie?query=${query}`,
      {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNTNkYWIyMDkxMzI2Y2Y3NTkwNTAwYjQyODNkNjZkNyIsIm5iZiI6MTcyNjE0MTU3Ny42MDM2ODcsInN1YiI6IjY0MzVmY2Y2NjUxZmNmMDBkM2RhYzNmNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.cFPsPRHPidq2OnJ3U-3wHJYhnGajDFqUsM8XJ_a_0bw",
        },
      }
    );
    return data;
  };

  const { data, isFetching } = useQuery<MovieResponse>({
    queryKey: ["movies", query],
    queryFn: () => fetchMovies(query),
    enabled: !!query, // query가 빈 값이 아니어야 실행
    keepPreviousData: true,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (titleRef.current) {
      titleRef.current.value = value;
    }
    debouncedSearch(value);
  };

  const debouncedSearch = debounce((value: string) => {
    setQuery(value);
  }, 500);

  return (
    <PageWrapper>
      <InputWrapper>
        <input
          ref={titleRef}
          onChange={handleChange}
          placeholder="영화 제목을 입력해주세요"
        />
      </InputWrapper>
      {isFetching ? (
        <Movies>
          {Array.from({ length: 20 }).map((_, index) => (
            <SkeletonMovie key={index} />
          ))}
        </Movies>
      ) : data?.results?.length > 0 ? (
        <Movies>
          {data.results.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </Movies>
      ) : (
        <Not>해당하는 검색어에 해당하는 검색 결과가 없습니다.</Not>
      )}
    </PageWrapper>
  );
}

const PageWrapper = styled.div`
  background-color: black;
  width: 100%;
  height: 100%;
`;

const InputWrapper = styled.div`
  width: 90%;
  margin: 0 auto;
  height: 200px;
  margin-top: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  input {
    width: 85%;
    height: 20%;
  }

  button {
    background-color: #e83278;
    color: white;
  }
`;

const Movies = styled.div`
  height: 60%;
  overflow-y: auto;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`;

const Not = styled.span`
  font-size: 30px;
  color: white;
`;

const SkeletonMovie = styled.div`
  background-color: gray;
  height: 100px;
  width: 100px;
`;
