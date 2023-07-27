import { useState, useEffect } from "react";
import { type Character, getCharacters } from "rickmortyapi";
import { CharacterList } from "./components/characters/CharacterList";

function App() {
  const [characters, setCharacters] = useState<Character[]>([]);

  useEffect(() => {
    const getData = async () => {
      const charactersRequest = await getCharacters({page: 1});
      const data = charactersRequest.data.results;
      setCharacters(data ? data : []);
    };

    getData();
  });

  return (
    <>
      <h1 className="mb-4 text-6xl text-gray-100 bold text-center">Rick & Morty</h1>
      <CharacterList characters={characters} />
    </>
  );
}

export default App;
