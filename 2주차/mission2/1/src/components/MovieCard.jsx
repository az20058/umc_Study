import styled from "styled-components";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const POSTER_BASE_URL = "https://image.tmdb.org/t/p/w500";

export default function MovieCard({ movie }) {
  const navigate = useNavigate();
  console.log(movie);

  return (
    <CardContainer
      key={movie.id}
      onClick={() =>
        navigate(`/movies/${movie.id}`, {
          replace: false,
          state: {
            src: POSTER_BASE_URL + movie.poster_path,
            title: movie.title,
            rate: movie.vote_average,
            date: movie.release_date,
          },
        })
      }
    >
      <MoviePoster
        src={`${POSTER_BASE_URL}${movie.poster_path}`}
        alt={movie.title}
      />
      <MovieTitle>{movie.title}</MovieTitle>
      <MovieReleaseDate>Release Date: {movie.release_date}</MovieReleaseDate>
    </CardContainer>
  );
}

const CardContainer = styled.div`
  background-color: black;
  border-radius: 10px;
  margin: 10px;
  height: 35%;
  width: 80%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const MoviePoster = styled.img`
  border-radius: 10px;
  width: 100%;
  height: 100%;
  opacity: 0.5;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 1;
  }
`;

const MovieTitle = styled.h3`
  font-size: 1.2em;
  margin-top: 10px;
  color: white;
`;

const MovieReleaseDate = styled.span`
  font-size: 0.8em;
  color: #888;
  margin-top: 10px;
  display: block;
`;

MovieCard.propTypes = {
  movie: PropTypes.object,
};
