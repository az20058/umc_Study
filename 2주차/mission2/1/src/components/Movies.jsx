import { useParams } from "react-router-dom";
import styled from "styled-components";
import MovieCard from "./MovieCard";
import axios from "axios";
import { useInfiniteQuery } from "@tanstack/react-query";

// 스타일 컴포넌트 정의
const MovieList = styled.div`
  width: 100%;
  height: 90%;
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  justify-content: center;
  background-color: black;
  gap: 10px;
  overflow-y: auto;
  padding: 20px;
  box-sizing: border-box;
`;

const PaginationControls = styled.div`
  display: flex;
  justify-content: center;
  height: 10%;
  align-items: center;
  background-color: black;

  button {
    height: 50%;
    background-color: #444;
    color: white;
    border: none;
    padding: 10px 15px;
    margin: 0 5px;
    cursor: pointer;
    border-radius: 5px;

    &:disabled {
      background-color: #888;
      cursor: not-allowed;
    }

    &:hover:not(:disabled) {
      background-color: #666;
    }
  }
`;

const fetchMovies = async ({ pageParam = 1, queryKey }) => {
  const type = queryKey[1];
  let url = "";
  switch (type) {
    case "now-playing":
      url = `https://api.themoviedb.org/3/movie/now_playing?language=ko-KR&page=${pageParam}`;
      break;
    case "popular":
      url = `https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=${pageParam}`;
      break;
    case "top-rated":
      url = `https://api.themoviedb.org/3/movie/top_rated?language=ko-KR&page=${pageParam}`;
      break;
    case "up-coming":
      url = `https://api.themoviedb.org/3/movie/upcoming?language=ko-KR&page=${pageParam}`;
      break;
    default:
      url = `https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=${pageParam}`;
  }

  const { data } = await axios.get(url, {
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNTNkYWIyMDkxMzI2Y2Y3NTkwNTAwYjQyODNkNjZkNyIsIm5iZiI6MTcyNjE0MTU3Ny42MDM2ODcsInN1YiI6IjY0MzVmY2Y2NjUxZmNmMDBkM2RhYzNmNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.cFPsPRHPidq2OnJ3U-3wHJYhnGajDFqUsM8XJ_a_0bw`,
    },
  });
  return {
    results: data.results,
    nextPage: pageParam + 1,
    totalPages: data.total_pages,
    currentPage: pageParam,
  };
};

// 컴포넌트 정의
export default function Movies() {
  const { type } = useParams();

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    isFetchingNextPage,
    isPreviousData,
  } = useInfiniteQuery({
    queryKey: ["movies", type],
    queryFn: ({ pageParam }) =>
      fetchMovies({ pageParam, queryKey: ["movies", type] }),

    getNextPageParam: (lastPage) =>
      lastPage.nextPage <= lastPage.totalPages ? lastPage.nextPage : undefined,

    getPreviousPageParam: (firstPage) =>
      firstPage.currentPage > 1 ? firstPage.currentPage - 1 : undefined,
  });

  if (isLoading) return <div style={{ color: "white" }}>Loading...</div>;
  if (isError) return <div style={{ color: "white" }}>Error!</div>;

  const currentPage = data.pages[data.pages.length - 1]?.currentPage || 1;

  return (
    <div>
      <MovieList>
        {data.pages.map((page, pageIndex) =>
          page.results.map((movie, index) => (
            <MovieCard key={`${pageIndex}-${index}`} movie={movie} />
          ))
        )}
        {isFetchingNextPage && (
          <div style={{ color: "white", textAlign: "center" }}>
            Loading more...
          </div>
        )}
      </MovieList>
      <PaginationControls>
        <button
          onClick={() => fetchPreviousPage()}
          disabled={currentPage === 1 || isPreviousData}
        >
          Previous
        </button>
        <span style={{ color: "white", alignSelf: "center" }}>
          Page {currentPage}
        </span>
        <button
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          Next
        </button>
      </PaginationControls>
    </div>
  );
}
