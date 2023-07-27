import { type Character } from "rickmortyapi";
import { CharacterCard } from "./CharacterCard";
import { motion } from "framer-motion";

export const CharacterList = (props: { characters: Character[] }) => {
  const { characters } = props;

  return (
    <motion.div
      layout
      className="grid grid-cols-1 lg:grid-cols-2 gap-y-6 sm:gap-4 md:gap-6"
    >
      {characters.map((character) => (
        <CharacterCard character={character} key={character.id} />
      ))}
    </motion.div>
  );
};
