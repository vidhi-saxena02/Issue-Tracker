import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { Comment } from "./Comment";
import { IssueHeader } from "./IssueHeader";

function useIssueData(issueNumber) {
  return useQuery(["issues", issueNumber], () =>
    fetch(`/api/issues/${issueNumber}`).then((res) => res.json())
  );
}

function useIssueComments(issueNumber) {
  console.log("triggered");
  return useQuery(["issues", issueNumber, "comments"], () => {
    return fetch(`/api/issues/${issueNumber}/comments`).then((res) =>
      res.json()
    );
  });
}

export default function IssueDetails() {
  const { number } = useParams();
  const issueQuery = useIssueData(number);
  const commentsQuery = useIssueComments(number);

  console.log(commentsQuery.data);

  return (
    <div className="issue-details">
      {issueQuery.isLoading ? (
        <p>Loading Issue...</p>
      ) : (
        <>
          <IssueHeader {...issueQuery.data} />
          <main>
            <section>
              {commentsQuery.isLoading ? (
                <p>Loading...</p>
              ) : (
                commentsQuery?.data.map((comment) => (
                  <Comment key={comment.id} {...comment} />
                ))
              )}
            </section>
            <aside></aside>
          </main>
        </>
      )}
    </div>
  );
}
