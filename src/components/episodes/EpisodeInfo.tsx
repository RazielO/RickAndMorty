import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Character,
  Episode,
  getCharacter,
  getEpisode,
} from "rickmortyapi";
import { IoMdArrowBack } from "react-icons/io";
import { StatusImage } from "../characters/StatusImage";
import { motion } from "framer-motion";

export const EpisodeInfo = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [episode, setEpisode] = useState<Episode>();
  const [characters, setCharacters] = useState<Character[]>([]);

  const requestEpisode = async () => {
    const id = params.episodeId ? params.episodeId : "1";

    const request = await getEpisode(Number.parseInt(id));
    const episode = request.data;
    setEpisode(episode);

    const charactersIds = episode.characters.map((x) =>
      Number.parseInt(x.split("/")[5])
    );

    const charactersRequest = await getCharacter(
      charactersIds.length === 1 ? [charactersIds[0], charactersIds[0]] : charactersIds
    );
    const charactersList = charactersRequest.data;
    setCharacters(charactersList);
  };

  useEffect(() => {
    requestEpisode();
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
          {episode?.episode}. {episode?.name}
        </h2>
      </div>

      <div className="flex flex-col text-gray-100 text-2xl justify-center gap-2 text-center">
        <span>
          <b>Aired on: </b> {episode?.air_date}
        </span>
      </div>

      <h3 className="text-gray-100 text-3xl my-4 text-center">
        Characters who appeared on "{episode?.name}"
      </h3>

      <div className="grid grid-cols-2 content-center gap-4">
        {characters.map((resident) => (
          <Link to={`/character/${resident.id}`}>
            <motion.div
              key={resident.id}
              className="flex flex-col justify-center items-center cursor-pointer"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              <StatusImage
                src={resident?.image}
                alt={resident?.name}
                status={resident?.status}
              />
              <span className="text-2xl text-center text-gray-100">
                {resident.name}
              </span>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
};
