const Input = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  required = false,
  labelColor = "text-white",
  inputColor = "text-white",
  bgColor = "bg-darkNavy",
}) => {
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={name}
          className={`block text-sm font-semibold mb-2 ${labelColor}`}
        >
          {label}
        </label>
      )}
      <input
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`w-full px-4 py-3 border border-white/30 rounded-lg focus:ring-2 focus:ring-accentOrange focus:outline-none transition shadow-sm ${inputColor} ${bgColor} placeholder:text-white/50`}
      />
    </div>
  );
};

export default Input;
