import SearchableLayout from "@/components/searchable-layout";
import { ReactNode } from "react";
import style from "./index.module.css";
import MovieItem from "@/components/movie-item";
import { InferGetServerSidePropsType } from "next";
import fetchMovies from "@/lib/fetch-movies";
import fetchRandomMovies from "@/lib/fetch-random-movies";

export const getServerSideProps = async () => {
  const [allMovies, recoMovies] = await Promise.all([
    fetchMovies(),
    fetchRandomMovies(),
  ]);

  return {
    props: { allMovies, recoMovies },
  };
};

export default function Home({
  allMovies,
  recoMovies,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  console.log(allMovies);
  return (
    <div className={style.container}>
      <section>
        <h3>지금 가장 추천하는 영화</h3>
        <div className={style.reco_movie}>
          {recoMovies.map((movie) => (
            <MovieItem key={movie.id} {...movie} />
          ))}
        </div>
      </section>
      <section>
        <h3>등록된 모든 영화</h3>
        <div className={style.all_movie}>
          {allMovies.map((movie) => (
            <MovieItem key={movie.id} {...movie} />
          ))}
        </div>
      </section>
    </div>
  );
}

Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
