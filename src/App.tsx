import { useState, useEffect } from "react";
import { type Character, getCharacters } from "rickmortyapi";
import { CharacterList } from "./components/characters/CharacterList";
import ReactPaginate from "react-paginate";

function App() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [page, setPage] = useState(1);

  const pageCount = 42;

  const getData = async () => {
    const charactersRequest = await getCharacters({ page });
    const data = charactersRequest.data.results;
    setCharacters(data ? data : []);
  };

  useEffect(() => {
    getData();
  });

  const handlePageChange = (event: { selected: number }) => {
    setPage(event.selected);
    getData();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <h1 className="mb-4 text-6xl text-gray-100 bold text-center">
        Rick & Morty
      </h1>
      <CharacterList characters={characters} />
      <ReactPaginate
        className="flex text-2xl items-center justify-evenly px-4 my-6 w-full md:w-3/4 lg:w-1/2 mx-auto bg-zinc-300 rounded-lg drop-shadow-lg"
        pageCount={pageCount}
        onPageChange={handlePageChange}
        pageClassName="py-1 text-center hover:bg-blue-300 w-10"
        activeClassName="bg-blue-400 w-10 rounded-lg"
        previousClassName="hover:text-blue-950"
        nextClassName="hover:text-blue-950"
      />
    </>
  );
}

export default App;
