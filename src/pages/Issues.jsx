import IssuesList from "../components/IssuesList";
import LabelList from "../components/LabelList";
import { useState } from "react";

export default function Issues() {
  const [label, setLabel] = useState([]);
  return (
    <div>
      <main>
        <section>
          <h1>Issues</h1>
          <IssuesList labels={label} />
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
        </aside>
      </main>
    </div>
  );
}
