import './App.css';

// eslint-disable-next-line react/prop-types
const InputField = ({ value, onChange, placeholder }) => {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="input-field"
    />
  );
};

export default InputField;
