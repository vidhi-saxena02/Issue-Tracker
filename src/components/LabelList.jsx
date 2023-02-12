import { useLabelData } from "../helpers/useLabelsData";

export default function LabelList() {
  const labelQuery = useLabelData();
  return (
    <div>
      <h3>Labels</h3>
      {labelQuery.isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {labelQuery.data.map((label) => (
            <li key={label.id}>
              <button className={`${label.color}`}>{label.name}</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
