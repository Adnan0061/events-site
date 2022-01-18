import classes from "./comment-list.module.css";

function CommentList(props) {
  return (
    <ul className={classes.comments}>
      {
        props.items ?
        props.items.map((comment) => {
        return <li key={comment._id}>
          <p>{comment.text}</p>
          <div>
            By <address>{comment.name}</address>
          </div>
        </li>
      })
      :
      <p>Loading ...</p>
      }
    </ul>
  );
}

export default CommentList;
