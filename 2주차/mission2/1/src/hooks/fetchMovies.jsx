import axios from "axios";

function fetchMovies(type, setMovies, setIsLoading, setIsError) {
  let url = "";
  switch (type) {
    case "now-playing":
      url = `https://api.themoviedb.org/3/movie/now_playing?language=ko-KR&page=1`;
      break;
    case "popular":
      url = `https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1`;
      break;
    case "top-rated":
      url = `https://api.themoviedb.org/3/movie/top_rated?language=ko-KR&page=1`;
      break;
    case "up-coming":
      url = `https://api.themoviedb.org/3/movie/upcoming?language=ko-KR&page=1`;
      break;
    default:
      url = `https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1`;
  }

  axios
    .get(url, {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNTNkYWIyMDkxMzI2Y2Y3NTkwNTAwYjQyODNkNjZkNyIsIm5iZiI6MTcyNjE0MTU3Ny42MDM2ODcsInN1YiI6IjY0MzVmY2Y2NjUxZmNmMDBkM2RhYzNmNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.cFPsPRHPidq2OnJ3U-3wHJYhnGajDFqUsM8XJ_a_0bw`,
      },
    })
    .then((res) => {
      setMovies(res.data.results);
      setIsLoading(false);
    })
    .catch((err) => {
      console.error(err);
      setIsError(true);
    });
}

export { fetchMovies };
