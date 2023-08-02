export const FilterDropdown = (props: {
  label: string;
  id: string;
  placeholder: string;
  value: any;
  options: { value: string; display: string }[];
  onChange: any;
  selected: string;
}) => {
  const { label, id, placeholder, options, value, onChange, selected } = props;

  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="font-bold text-lg">
        {label}
      </label>
      <select
        name={id}
        id={id}
        placeholder={placeholder}
        value={value}
        className="h-full border-4 border-solid border-zinc-700 rounded-lg bg-zinc-400 text-zinc-700 px-2 py-2 text-lg placeholder:text-zinc-600"
        onChange={onChange}
      >
        <option disabled>{label}</option>

        {options.map((o) => (
          <option selected={selected === o.value} value={o.value}>{o.display}</option>
        ))}
      </select>
    </div>
  );
};
