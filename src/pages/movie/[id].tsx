import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import style from "./[id].module.css";
import fetchOneMovie from "@/lib/fetch-one-movie";
import { useRouter } from "next/router";
import fetchMovies from "@/lib/fetch-movies";
import { MovieData } from "@/types";
import Head from "next/head";

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const id = context.params!.id;
  const movie = await fetchOneMovie(Number(id));

  if (!movie) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      movie,
    },
  };
};

export const getStaticPaths = async () => {
  const movies = await fetchMovies();
  return {
    paths: movies.map((movie: MovieData) => ({
      params: { id: movie.id.toString() },
    })),
    fallback: true,
    // false: path에 설정하지 않은 경로는 모두 404
    // blocking: ssr방식
    // true : ssr방식 + 데이터가 없는 폴백 상태의 페이지부터 반환
  };
};

export default function Page({
  movie,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();
  if (router.isFallback) {
    return (
      <>
        <Head>
          <title>한입 시네마</title>
          <meta property="og:image" content="/thumbnail.png" />
          <meta property="og:title" content="한입 시네마" />
          <meta
            property="og:description"
            content="한입 시네마에 등록된 영화들을 만나보세요"
          />
        </Head>
        <div>로딩중...</div>
      </>
    );
  }
  if (!movie) return "문제가 발생했습니다. 다시 시도해 주세요";
  const {
    title,
    releaseDate,
    company,
    genres,
    subTitle,
    description,
    runtime,
    posterImgUrl,
  } = movie;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:image" content={posterImgUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
      </Head>
      <div className={style.container}>
        <div
          className={style.cover_img_container}
          style={{ backgroundImage: `url('${posterImgUrl}')` }}
        >
          <img src={posterImgUrl} />
        </div>
        <h2 className={style.title}>{title}</h2>
        <div className={style.movie_info}>
          {releaseDate} / {genres} / {runtime}분
        </div>
        <div className={style.company}>{company}</div>
        <div className={style.sub_title}>{subTitle}</div>
        <div className={style.description}>{description}</div>
      </div>
    </>
  );
}
