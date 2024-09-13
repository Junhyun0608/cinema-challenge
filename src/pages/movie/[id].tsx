import style from "./[id].module.css";

export default function Page() {
  const mockData = {
    id: 872585,
    title: "오펜하이머",
    releaseDate: "2023-07-19",
    company: "Syncopy, Universal Pictures, Atlas Entertainment",
    genres: ["드라마", "역사"],
    subTitle: "나는 이제 죽음이요, 세상의 파괴자가 되었다.",
    description:
      "제2차 세계대전 당시 핵무기 개발을 위해 진행되었던 비밀 프로젝트 ‘맨해튼 프로젝트’를 주도한 미국의 물리학자 ‘로버트 오펜하이머’의 이야기",
    runtime: 181,
    posterImgUrl:
      "https://media.themoviedb.org/t/p/w300_and_h450_face/jpD6z9fgNe7OqsHoDeAWQWoULde.jpg",
  };

  const {
    id,
    title,
    releaseDate,
    company,
    genres,
    subTitle,
    description,
    runtime,
    posterImgUrl,
  } = mockData;

  return (
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
  );
}
