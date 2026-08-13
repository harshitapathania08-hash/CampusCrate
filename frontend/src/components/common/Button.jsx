function Button({
    children,
    type = "button",
    variant = "primary",
    className = "",
    ...props
  }) {
    const baseStyle =
      "inline-flex items-center justify-center rounded-lg px-5 py-3 text-sm font-medium transition duration-200";
  
    const variants = {
      primary:
        "bg-blue-600 text-white hover:bg-blue-700",
  
      secondary:
        "border border-slate-300 bg-white text-slate-700 hover:bg-slate-100",
  
      danger:
        "bg-red-600 text-white hover:bg-red-700",
  
      success:
        "bg-green-600 text-white hover:bg-green-700",
    };
  
    return (
      <button
        type={type}
        className={`${baseStyle} ${variants[variant]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
  
  export default Button;