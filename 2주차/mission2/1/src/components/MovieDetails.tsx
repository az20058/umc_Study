import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";

// 타입 정의
interface LocationState {
  src: string;
  title: string;
  rate: number;
  date: string;
  overview: string;
}

interface Crew {
  id: number;
  name: string;
  profile_path: string;
  job: string; // 'Director' 등을 포함
}

interface Params {
  id: string; // URL에서 가져온 영화 ID
}

export default function MovieDetails() {
  const location = useLocation();
  const params = useParams<Params>();
  const { src, title, rate, date, overview } = (location.state ||
    {}) as LocationState;

  const fetchCrews = async (movieId: string): Promise<Crew[]> => {
    const res = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}/credits`,
      {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNTNkYWIyMDkxMzI2Y2Y3NTkwNTAwYjQyODNkNjZkNyIsIm5iZiI6MTcyNjE0MTU3Ny42MDM2ODcsInN1YiI6IjY0MzVmY2Y2NjUxZmNmMDBkM2RhYzNmNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.cFPsPRHPidq2OnJ3U-3wHJYhnGajDFqUsM8XJ_a_0bw`,
        },
      }
    );
    return res.data.crew.filter(
      (crew: Crew) => crew.job === "Director" || crew.profile_path
    );
  };

  const {
    data: crews = [],
    isLoading,
    isError,
  } = useQuery<Crew[]>({
    queryKey: ["movieCrews", params.id],
    queryFn: () => fetchCrews(params.id!),
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading) return <Container>Loading...</Container>;
  if (isError) return <Container>Error loading data</Container>;

  return (
    <Container>
      <Header src={src}>
        <span>{title}</span>
        <span>평균 {rate}</span>
        <span>{date?.slice(0, 4)}</span>
        <span>{overview}</span>
      </Header>
      <Staff>
        <span>감독/출연</span>
        <PeopleWrapper>
          {crews.map((crew) => (
            <People key={crew.id}>
              <img
                src={
                  crew.profile_path
                    ? "https://image.tmdb.org/t/p/original" + crew.profile_path
                    : "https://via.placeholder.com/100"
                }
                alt={crew.name}
              />
              <span>{crew.name}</span>
            </People>
          ))}
        </PeopleWrapper>
      </Staff>
    </Container>
  );
}

// 스타일 정의
const Container = styled.div`
  background-color: black;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
`;

const Header = styled.div<{ src: string }>`
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
