export default function UserInputs({ inputType, value, onChange }) {
  return (
    <input
      value={value}
      onChange={onChange}
      placeholder={inputType}
    />
  );
}