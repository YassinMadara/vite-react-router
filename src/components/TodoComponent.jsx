export default function TodoComponent({ todos }) {
  return todos
    .sort((a, b) => a.title.toLowerCase().localeCompare(b.title.toLowerCase()))
    .map((t) => (
      <li className={t.completed ? "strike-through" : ""} key={t.id}>
        {t.title}
      </li>
    ));
}
