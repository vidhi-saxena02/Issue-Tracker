import { useLabelData } from "../helpers/useLabelsData";

export default function LabelList({ selected, toggle }) {
  const labelQuery = useLabelData();
  return (
    <div className="labels">
      <h3>Labels</h3>
      {labelQuery.isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {labelQuery.data.map((label) => (
            <li key={label.id}>
              <button
                onClick={() => toggle(label.id)}
                className={` label ${
                  selected.includes(label.id) ? "selected" : ""
                } ${label.color}`}
              >
                {label.name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
