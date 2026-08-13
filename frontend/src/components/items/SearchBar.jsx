function SearchBar({
    placeholder = "Search...",
    value,
    onChange,
  }) {
    return (
      <div className="w-full">
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-600"
        />
      </div>
    );
  }
  
  export default SearchBar;