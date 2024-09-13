import { MovieData } from "@/types";
import Link from "next/link";
import style from "./movie-item.module.css";

export default function MovieItem({ id, posterImgUrl }: MovieData) {
  return (
    <Link className={style.container} href={`/movie/${id}`}>
      <img src={posterImgUrl} />
    </Link>
  );
}
