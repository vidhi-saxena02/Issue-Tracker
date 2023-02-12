import IssuesList from "../components/IssuesList";
import LabelList from "../components/LabelList";
export default function Issues() {
  const [label, setLabel] = useState([]);
  return (
    <div>
      <main>
        <section>
          <h1>Issues</h1>
          <IssuesList />
        </section>
        <aside>
          <LabelList />
        </aside>
      </main>
    </div>
  );
}
