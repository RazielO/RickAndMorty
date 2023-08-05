import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  getCharacter,
  type Character,
  type Episode,
  getEpisode,
} from "rickmortyapi";
import { StatusIcon } from "./StatusIcon";
import cn from "classnames";
import { IoMdArrowBack } from "react-icons/io";
import { StatusImage } from "./StatusImage";

export const CharacterInfo = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [character, setCharacter] = useState<Character>();
  const [episodes, setEpisodes] = useState<Episode[]>([]);

  const requestCharacter = async () => {
    const id = params.characterId ? params.characterId : "1";

    const request = await getCharacter(Number.parseInt(id));
    const character = request.data;
    setCharacter(character);

    const episodeNumbers = character.episode.map((x) =>
      Number.parseInt(x.split("/")[5])
    );

    const episodesRequest = await getEpisode(
      episodeNumbers.length === 1
        ? [episodeNumbers[0], episodeNumbers[0]]
        : episodeNumbers
    );
    const episodeList = episodesRequest.data;
    setEpisodes(episodeList);
  };

  useEffect(() => {
    requestCharacter();
  }, []);

  return (
    <div className="my-4 mx-8">
      <div className="grid grid-cols-3 justify-between items-center">
        <Link
          to={".."}
          onClick={(e) => {
            e.preventDefault();
            navigate(-1);
          }}
          className="text-gray-100 text-2xl flex items-center"
        >
          <IoMdArrowBack /> Back
        </Link>
        <h2 className="mb-4 text-center text-4xl text-gray-100 bold">
          {character?.name}
        </h2>
      </div>

      <div className="flex flex-col sm:flex-row gap-8">
        <StatusImage
          src={character?.image}
          alt={character?.name}
          status={character?.status}
        />

        <div className="flex flex-col text-gray-100 text-2xl justify-center gap-2">
          <h3 className="bold flex gap-2 items-center">
            Status:{" "}
            <StatusIcon status={character ? character?.status : "unknown"} />
            <span
              className={cn(
                character?.status === "Alive"
                  ? "text-green-400"
                  : character?.status === "Dead"
                  ? "text-red-700"
                  : "text-yellow-500"
              )}
            >
              {character?.status}
            </span>
          </h3>

          <span>
            <b>Species: </b>{" "}
            {character?.gender !== "unknown" ? character?.gender : ""}{" "}
            {character?.species}
          </span>
          {character?.type ? (
            <span>
              <b>Type or subspecies: </b> {character?.type}
            </span>
          ) : (
            ""
          )}
          <span>
            <b>From: </b>
            <span>
              {character?.origin.url === "" ? (
                <span>{character.origin.name}</span>
              ) : (
                <Link to={`/location/${character?.origin.url.split("/")[5]}`}>
                  <span className="underline">{character?.origin.name}</span>
                </Link>
              )}
            </span>
          </span>
          <span>
            <b>Last seen at: </b>{" "}
            <span className="underline">
              {character?.location.url === "" ? (
                <span>{character.location.name}</span>
              ) : (
                <Link to={`/location/${character?.location.url.split("/")[5]}`}>
                  <span className="underline">{character?.location.name}</span>
                </Link>
              )}
            </span>
          </span>
        </div>
      </div>

      <h3 className="text-gray-100 text-3xl my-4 text-center">
        Episodes with {character?.name}
      </h3>

      <ol className="list-disc text-gray-100 text-xl">
        {episodes.map((episode) => (
          <li key={episode.episode}>
            <b>{episode.episode}</b>:{" "}
            <a
              className="underline"
              href={`/episode/${episode.url.split("/")[5]}`}
            >
              {episode.name} (Aired on: {episode.air_date})
            </a>
          </li>
        ))}
      </ol>
    </div>
  );
};
