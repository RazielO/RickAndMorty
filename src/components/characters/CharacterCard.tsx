import { type Character } from "rickmortyapi";
import { FaDizzy, FaRegQuestionCircle, FaGrin } from "react-icons/fa";
import { motion } from "framer-motion";

const StatusIcon = (props: { status: "Dead" | "Alive" | "unknown" }) => {
  const { status } = props;

  if (status === "Dead") {
    return <FaDizzy className="text-red-500 inline" />;
  } else if (status === "unknown") {
    return <FaRegQuestionCircle className="text-yellow-500 inline" />;
  }
  return <FaGrin className="text-green-500 inline" />;
};

export const CharacterCard = (props: { character: Character }) => {
  const { character } = props;

  return (
    <motion.div
      className="flex flex-col md:flex-row md:h-56 bg-zinc-800 rounded-xl drop-shadow-lg hover:bg-gray-800"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
    >
      <img
        src={character.image}
        alt={character.name}
        className="h-full object-cover rounded-t-xl md:rounded-l-xl md:rounded-tr-none"
      />

      <div className="m-2 flex flex-col text-slate-200 text-xl justify-around">
        <h1 className="font-bold text-3xl mb-2">{character.name}</h1>
        <span>
          <b>Status: </b> <StatusIcon status={character.status} />{" "}
          {character.status}
        </span>
        <span>
          <b>Species: </b> {character.species}
        </span>
        <span>
          <b>From: </b> {character.origin.name}
        </span>
        <span>
          <b>Last seen at: </b> {character.location.name}
        </span>
      </div>
    </motion.div>
  );
};
