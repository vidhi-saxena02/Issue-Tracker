import IssuesList from "../components/IssuesList";
import LabelList from "../components/LabelList";
import { useState } from "react";
import { StatusSelect } from "../components/StatusSelect";

export default function Issues() {
  const [label, setLabel] = useState([]);
  const [status, setStatus] = useState("");
  return (
    <div>
      <main>
        <section>
          <h1>Issues</h1>
          <IssuesList labels={label} status={status} />
        </section>
        <aside>
          <LabelList
            selected={label}
            toggle={(label) =>
              setLabel((currentLabels) =>
                currentLabels.includes(label)
                  ? currentLabels.filter(
                      (currentLabel) => currentLabel != label
                    )
                  : currentLabels.concat(label)
              )
            }
          />
          <h3>Status</h3>
          <StatusSelect
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          />
        </aside>
      </main>
    </div>
  );
}
