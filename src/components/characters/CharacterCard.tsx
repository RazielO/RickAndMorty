import { type Character } from "rickmortyapi";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { StatusIcon } from "./StatusIcon";

export const CharacterCard = (props: { character: Character }) => {
  const { character } = props;

  return (
    <Link to={`/character/${character.id}`}>
      <motion.div
        className="flex flex-col md:flex-row md:h-56 bg-zinc-800 rounded-xl drop-shadow-lg hover:bg-gray-800 md:h-full cursor-pointer"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
      >
        <img
          src={character.image}
          alt={character.name}
          className="h-full object-cover rounded-t-xl md:rounded-l-xl md:rounded-tr-none md:max-w-[33%]"
        />
        <div className="m-2 flex flex-col text-slate-200 text-xl justify-around">
          <h1 className="font-bold text-3xl mb-2">{character.name}</h1>
          <span className="flex items-center gap-1">
            <b>Status: </b> <StatusIcon status={character.status} />{" "}
            {character.status}
          </span>
          <span>
            <b>Species: </b>{" "}
            {character.gender !== "unknown" ? character.gender : ""}{" "}
            {character.species}
          </span>
          {character.type ? (
            <span>
              <b>Type or subspecies: </b> {character.type}
            </span>
          ) : (
            ""
          )}
          <span>
            <b>From: </b> {character.origin.name}
          </span>
          <span>
            <b>Last seen at: </b> {character.location.name}
          </span>
        </div>
      </motion.div>
    </Link>
  );
};
