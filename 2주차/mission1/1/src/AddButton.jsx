import './App.css';

// eslint-disable-next-line react/prop-types
const AddButton = ({ onClick, label }) => {
  return (
    <button onClick={onClick} className="add-button">
      {label}
    </button>
  );
};

export default AddButton;
