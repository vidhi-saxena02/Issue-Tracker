import { useQuery } from "react-query";
import { IssueItem } from "./IssueItem";
import { useState } from "react";
import fetchWithError from "../helpers/fetchWithError";

export default function IssuesList({ labels, status }) {
  const [searchValue, setSearchValue] = useState("");
  const issuesQuery = useQuery(
    ["issues", { labels, status }],
    () => {
      const statusString = status ? `&status=${status}` : "";
      const labelsString = labels.map((label) => `labels[]=${label}`).join("&");
      return fetchWithError(`/api/issues?${labelsString}${statusString}`, {
        headers: {
          "x-error": true,
        },
      });
    },
    {
      staleTime: 1000 * 60,
    }
  );
  const searchQuery = useQuery(
    ["search", "issues", searchValue],
    () =>
      fetch(`/api/search/issues?q=${searchValue}`).then((res) => res.json()),
    {
      enabled: !!searchValue,
    }
  );
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSearchValue(e.target.elements.search.value);
        }}
      >
        <label htmlFor="search">Search</label>
        <input
          type="search"
          placeholder="Search"
          name="search"
          id="search"
          onChange={(e) => {
            if (e.target.value.length === 0) {
              setSearchValue("");
            }
          }}
        />
      </form>
      <h2>Issue List</h2>
      {issuesQuery.isLoading ? (
        <p>Loading...</p>
      ) : issuesQuery.isError ? (
        <p>{issuesQuery.error.message}</p>
      ) : searchQuery.fetchStatus === "idle" &&
        searchQuery.isLoading === true ? (
        <ul className="issues-list">
          {issuesQuery.data.map((issue) => (
            <IssueItem
              key={issue.id}
              title={issue.title}
              number={issue.number}
              assignee={issue.assignee}
              commentCount={issue.comments.length}
              createdBy={issue.createdBy}
              createdDate={issue.createdDate}
              labels={issue.labels}
              status={issue.status}
            />
          ))}
        </ul>
      ) : (
        <>
          <h2>Search Results</h2>
          {searchQuery.isLoading ? (
            <p>Loading...</p>
          ) : (
            <>
              <p>{searchQuery.data.count} Results</p>
              <ul className="issues-list">
                {searchQuery.data.items.map((issue) => (
                  <IssueItem
                    key={issue.id}
                    title={issue.title}
                    number={issue.number}
                    assignee={issue.assignee}
                    commentCount={issue.comments.length}
                    createdBy={issue.createdBy}
                    createdDate={issue.createdDate}
                    labels={issue.labels}
                    status={issue.status}
                  />
                ))}
              </ul>
            </>
          )}
        </>
      )}
    </div>
  );
}
