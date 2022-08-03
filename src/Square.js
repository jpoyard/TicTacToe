export function Square(props) {
  const classNames = ['square', props.win ? 'win' : undefined]
    .filter((v) => v != null)
    .join(' ');
  return (
    <button className={classNames} onClick={props.onClick}>
      {props.value}
    </button>
  );
}
