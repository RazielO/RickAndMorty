export const FilterInput = (props: {
  label: string;
  id: string;
  placeholder: string;
  type: string;
  value: any;
  onChange: any;
}) => {
  const { label, id, placeholder, type, value, onChange } = props;

  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="font-bold text-lg">
        {label}
      </label>
      <input
        type={type}
        name={id}
        id={id}
        placeholder={placeholder}
        value={value}
        className="border-4 border-solid border-zinc-700 rounded-lg bg-zinc-400 text-zinc-700 px-2 py-1 text-lg placeholder:text-zinc-600"
        onChange={onChange}
      />
    </div>
  );
};
