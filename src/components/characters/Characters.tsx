import React, { useState, useEffect } from "react";
import { type Character, getCharacters, CharacterFilter } from "rickmortyapi";
import ReactPaginate from "react-paginate";
import { FilterForm } from "../filter/FilterForm";
import { CharacterList } from "../characters/CharacterList";

export const Characters = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [page, setPage] = useState<number>(1);

  const [filterName, setFilterName] = useState<string>("");
  const [filterSpecies, setFilterSpecies] = useState<string>("");
  const [filterType, setFilterType] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<string>("");
  const [filterGender, setFilterGender] = useState<string>("");
  const [filter, setFilter] = useState<CharacterFilter>({});

  const [pageCount, setPageCount] = useState<number>(42);

  let nextPage = 1;

  const getData = async () => {
    const charactersRequest = await getCharacters({
      ...filter,
      page: nextPage,
    });
    const data = charactersRequest.data.results;
    const count = charactersRequest.data.info?.pages;
    setPageCount(count ? count : 1);
    setCharacters(data ? data : []);
  };

  useEffect(() => {
    getData();
  }, []);

  const handlePageChange = (event: { selected: number }) => {
    nextPage = event.selected + 1;
    setPage(nextPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
    getData();
  };

  const handleFilter = (event: React.FormEvent) => {
    event.preventDefault();
    let filter: CharacterFilter = {};

    filter["name"] = filterName;
    filter["species"] = filterSpecies;
    filter["status"] = filterStatus;
    filter["gender"] = filterGender;
    filter["type"] = filterType;

    setFilter(filter);
    setPage(1);
    getData();
  };

  const clearFilters = () => {
    setFilterName("");
    setFilterSpecies("");
    setFilterType("");
    setFilterStatus("");
    setFilterGender("");

    setFilter({});
    setPage(1);
    getData();
  };

  return (
    <>
      <h2 className="mb-4 text-4xl text-gray-100 bold text-center">
        Characters
      </h2>

      <FilterForm
        onSubmit={handleFilter}
        clearFilters={clearFilters}
        inputs={[
          {
            label: "Name",
            id: "name",
            placeholder: "Name",
            type: "text",
            value: filterName,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
              setFilterName(e.target.value),
          },
          {
            label: "Species",
            id: "species",
            placeholder: "Species",
            type: "text",
            value: filterSpecies,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
              setFilterSpecies(e.target.value),
          },
          {
            label: "Type",
            id: "type",
            placeholder: "Type",
            type: "text",
            value: filterType,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
              setFilterType(e.target.value),
          },
        ]}
        selects={[
          {
            label: "Status",
            id: "status",
            placeholder: "Status",
            value: filterStatus,
            options: [
              { value: "", display: "All" },
              { value: "alive", display: "Alive" },
              { value: "dead", display: "Dead" },
              { value: "unknown", display: "Unknown" },
            ],
            selected: filterStatus,
            onChange: (e: React.ChangeEvent<HTMLSelectElement>) =>
              setFilterStatus(e.target.value),
          },
          {
            label: "Gender",
            id: "gender",
            placeholder: "Gender",
            value: filterGender,
            options: [
              { value: "", display: "All" },
              { value: "male", display: "Male" },
              { value: "female", display: "Female" },
              { value: "genderless", display: "Genderless" },
              { value: "unknown", display: "Unknown" },
            ],
            selected: filterGender,
            onChange: (e: React.ChangeEvent<HTMLSelectElement>) =>
              setFilterGender(e.target.value),
          },
        ]}
      />

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
};
