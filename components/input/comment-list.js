import classes from "./comment-list.module.css";

function CommentList(props) {
  // console.log(props.items)
  return (
    <ul className={classes.comments}>
      {/* Render list of comments - fetched from API */}
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
