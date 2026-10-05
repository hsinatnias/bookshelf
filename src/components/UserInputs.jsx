export default function UserInputs({ inputType, value, onChange, ref}) {
  return (
    <input
      value={value}
      onChange={onChange}
      placeholder={inputType}
      ref={ref}
    />
  );
}