function Input({
    label,
    type = "text",
    placeholder,
    ...props
  }) {
    return (
      <div>
        {label && (
          <label className="mb-2 block text-sm font-medium text-slate-700">
            {label}
          </label>
        )}
  
        <input
          type={type}
          placeholder={placeholder}
          className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-blue-600"
          {...props}
        />
      </div>
    );
  }
  
  export default Input;