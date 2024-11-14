import axios from "axios";
import { useRef, useState } from "react";
import styled from "styled-components";
import { debounce } from "lodash";
import MovieCard from "./MovieCard";

export default function Search() {
  const titleRef = useRef();
  const [movies, setMovies] = useState([]);
  const [not, setNot] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // 실시간 검색용 디바운스된 함수
  const handleSearch = debounce((query) => {
    if (query.trim() === "") {
      setMovies([]);
      setNot(false);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setNot(false);

    axios
      .get(`https://api.themoviedb.org/3/search/movie?query=${query}`, {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNTNkYWIyMDkxMzI2Y2Y3NTkwNTAwYjQyODNkNjZkNyIsIm5iZiI6MTcyNjE0MTU3Ny42MDM2ODcsInN1YiI6IjY0MzVmY2Y2NjUxZmNmMDBkM2RhYzNmNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.cFPsPRHPidq2OnJ3U-3wHJYhnGajDFqUsM8XJ_a_0bw",
        },
      })
      .then((res) => {
        setMovies(res.data.results);
        setNot(res.data.results.length === 0);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, 500); // 500ms 디바운스 시간 설정

  // 버튼 클릭 시 검색 요청을 보내는 함수
  function handleClick() {
    const query = titleRef.current.value;
    handleSearch(query);
  }

  function handleChange(event) {
    handleSearch(event.target.value); // 실시간 검색 요청
  }

  return (
    <PageWrapper>
      <InputWrapper>
        <input
          ref={titleRef}
          onChange={handleChange}
          placeholder="영화 제목을 입력해주세요"
        />
        <button onClick={handleClick}>검색</button>
      </InputWrapper>
      {!not ? (
        <Movies>
          {isLoading
            ? Array.from({ length: 20 }).map((_, index) => (
                <SkeletonMovie key={index} />
              ))
            : movies.map((movie, index) => (
                <MovieCard key={index} movie={movie} />
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
