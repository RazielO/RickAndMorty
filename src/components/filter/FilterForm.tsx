import { useState } from "react";
import { FilterInputProps, FilterSelectProps } from "../../lib/types";
import { FilterDropdown } from "./FilterDropdown";
import { FilterInput } from "./FilterInput";
import { RiFilterFill, RiFilterOffFill } from "react-icons/ri";
import { BiSolidDownArrow, BiSolidUpArrow } from "react-icons/bi";
import cn from "classnames";
import { motion } from "framer-motion";

export const FilterForm = (props: {
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  inputs: FilterInputProps[];
  selects: FilterSelectProps[];
  clearFilters: React.MouseEventHandler<HTMLButtonElement>;
}) => {
  const { onSubmit, inputs, selects, clearFilters } = props;
  const [opened, setOpened] = useState<boolean>(false);

  const switchOpened = () => {
    setOpened(!opened);
  };

  return (
    <div>
      <button
        onClick={switchOpened}
        className={cn(
          opened ? "" : "mb-4",
          "w-full flex gap-2 justify-center items-center bg-blue-700 h-11 border-4 border-solid border-zinc-700 rounded-lg text-lg px-2 py-1"
        )}
      >
        {opened ? "Hide" : "Show"} Filters
        {opened ? <BiSolidUpArrow /> : <BiSolidDownArrow />}
      </button>
      <motion.div
        style={{
          display: opened ? "initial" : "none",
        }}
      >
        <form
          onSubmit={onSubmit}
          className="grid grid-cols-2 justify-center gap-x-4 gap-1 mb-2 flex-col md:flex-row"
        >
          {inputs.map((field) => (
            <FilterInput
              key={field.id}
              label={field.label}
              id={field.id}
              placeholder={field.placeholder}
              type={field.type}
              value={field.value}
              onChange={field.onChange}
            />
          ))}

          {selects.map((field) => (
            <FilterDropdown
              key={field.id}
              label={field.label}
              id={field.id}
              placeholder={field.placeholder}
              value={field.value}
              options={field.options}
              selected={field.selected}
              onChange={field.onChange}
            />
          ))}

          <div className="flex flex-col justify-between col-span-2">
            <span></span>
            <button
              type="submit"
              className="flex justify-center items-center bg-orange-700 h-11 border-4 border-solid border-zinc-700 rounded-lg text-lg px-2 py-1"
            >
              Filter
              <RiFilterFill />
            </button>
          </div>
        </form>

        <div className="flex flex-col justify-between my-2">
          <span></span>
          <button
            onClick={clearFilters}
            className="flex justify-center items-center bg-red-700 h-11 border-4 border-solid border-zinc-700 rounded-lg text-lg px-2 py-1"
          >
            Clear Filters
            <RiFilterOffFill />
          </button>
        </div>
      </motion.div>
    </div>
  );
};
