import { useState, useEffect } from "react";

const API_KEY =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNTNkYWIyMDkxMzI2Y2Y3NTkwNTAwYjQyODNkNjZkNyIsIm5iZiI6MTcyNjE0MTU3Ny42MDM2ODcsInN1YiI6IjY0MzVmY2Y2NjUxZmNmMDBkM2RhYzNmNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.cFPsPRHPidq2OnJ3U-3wHJYhnGajDFqUsM8XJ_a_0bw"; // TMDB API 키
const BASE_URL = "https://api.themoviedb.org/3/movie/now_playing";

const RatingPage = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchMovies(page);
  }, [page]);

  const fetchMovies = async (pageParam) => {
    try {
      const response = await fetch(
        `${BASE_URL}?language=ko-KR&page=${pageParam}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${API_KEY}`,
          },
        }
      );
      const data = await response.json();
      const moviesWithRating = data.results.map((movie) => ({
        ...movie,
        rating: 0, // 초기 평점
      }));
      setMovies((prevMovies) => [...prevMovies, ...moviesWithRating]);
    } catch (error) {
      console.error("영화 데이터를 가져오는 중 오류 발생:", error);
    }
  };

  const handleRating = (movieId, rating) => {
    setMovies((prevMovies) =>
      prevMovies.map((movie) =>
        movie.id === movieId ? { ...movie, rating } : movie
      )
    );
  };

  return (
    <div className="rating-page">
      <h1>현재 상영 중인 영화 평가하기</h1>
      <p>영화를 평가하고 맞춤 추천을 받아보세요</p>

      <div className="movies-grid">
        {movies.map((movie) => (
          <div key={movie.id} className="movie-card">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
            <h3>{movie.title}</h3>
            <div className="rating-stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => handleRating(movie.id, star)}
                  className={star <= movie.rating ? "active" : ""}
                >
                  ★
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <button className="load-more" onClick={() => setPage(page + 1)}>
        더 보기
      </button>

      <style>{`
        .rating-page {
          padding: 20px;
          color: #fff;
        }
        .movies-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 20px;
          margin-top: 20px;
        }
        .movie-card {
          background: #2a2a2a;
          padding: 10px;
          border-radius: 8px;
          text-align: center;
        }
        .movie-card img {
          width: 100%;
          border-radius: 8px;
        }
        .rating-stars {
          margin-top: 10px;
        }
        .rating-stars button {
          background: none;
          border: none;
          font-size: 24px;
          color: #666;
          cursor: pointer;
        }
        .rating-stars button.active {
          color: #ff0558;
        }
        .rating-stars button:hover {
          transform: scale(1.2);
        }
        .load-more {
          margin: 20px auto;
          padding: 10px 20px;
          font-size: 16px;
          color: #fff;
          background: #ff0558;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }
        .load-more:hover {
          background: #ff3368;
        }
      `}</style>
    </div>
  );
};

export default RatingPage;
