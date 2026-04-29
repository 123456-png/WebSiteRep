function FilterButton(props) {
  return (
    <button
      type="button"
      className={props.isPressed ? "btn-active" : ""}
      onClick={() => props.setFilter(props.name)}
    >
      <span>{props.name}</span>
    </button>
  );
}
export default FilterButton;