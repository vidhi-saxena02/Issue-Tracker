import { relativeDate } from "../helpers/relativeDate";
import { useUserData } from "../helpers/useUserData";

export function Comment({ comment, createdBy, createdDate }) {
  const useQuery = useUserData(createdBy);
  if (useQuery.isLoading)
    return (
      <div className="comment">
        <div>
          <div className="comment-header">Loading...</div>
        </div>
      </div>
    );

  return (
    <div className="comment">
      <img src={useQuery.data.profilePictureUrl} alt="Comment Avatar" />
      <div>
        <div className="comment-header">
          <span>{useQuery.data.name}</span> commented{" "}
          <span>{relativeDate(createdDate)}</span>
        </div>
        <div className="comment-body">{comment}</div>
      </div>
    </div>
  );
}
