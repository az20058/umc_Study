import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";

export default function MovieDetails() {
  const location = useLocation();
  const params = useParams();
  const { src, title, rate, date, overview } = location.state || {};
  const [crews, setCrews] = useState([]);
  console.log(overview);

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/movie/${params.id}/credits`, {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNTNkYWIyMDkxMzI2Y2Y3NTkwNTAwYjQyODNkNjZkNyIsIm5iZiI6MTcyNjE0MTU3Ny42MDM2ODcsInN1YiI6IjY0MzVmY2Y2NjUxZmNmMDBkM2RhYzNmNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.cFPsPRHPidq2OnJ3U-3wHJYhnGajDFqUsM8XJ_a_0bw`,
        },
      })
      .then((res) => {
        console.log(res.data.crew);
        setCrews(res.data.crew);
      });
  }, [params]);

  return (
    <Container>
      <Header src={src}>
        <span>{title}</span>
        <span>평균 {rate}</span>
        <span>{date.slice(0, 4)}</span>
        <span>{overview}</span>
      </Header>
      <Staff>
        <span>감독/출연</span>
        <PeopleWrapper>
          {crews.map((crew, index) => (
            <People key={index}>
              <img
                src={"https://image.tmdb.org/t/p/original" + crew.profile_path}
              />
              <span>{crew.name}</span>
            </People>
          ))}
        </PeopleWrapper>
      </Staff>
    </Container>
  );
}

const Container = styled.div`
  background-color: black;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
`;
const Header = styled.div`
  background-image: linear-gradient(
      to right,
      rgba(0, 0, 0, 1),
      rgba(0, 0, 0, 0)
    ),
    ${(props) => `url(${props.src})`};
  border-radius: 10px;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  width: 90%;
  height: 500px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 50px;
  box-sizing: border-box;

  span {
    color: white;
  }

  span:first-child {
    font-weight: 800;
    font-size: 30px;
  }

  span:last-child {
    text-align: left;
    width: 50%;
  }
`;
const Staff = styled.div`
  height: 40%;
  span {
    color: white;
  }
`;

const PeopleWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 20px;
`;

const People = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    border-radius: 50%;
    width: 100px;
    height: 100px;
  }
`;
