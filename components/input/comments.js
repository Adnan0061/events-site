import { useEffect, useState } from 'react';

import CommentList from './comment-list';
import NewComment from './new-comment';
import classes from './comments.module.css';

function Comments(props) {
  const { eventId } = props;

  const [comments, setComments] = useState();
  const [showComments, setShowComments] = useState(false);

  useEffect(()=>{
    if(showComments){
      fetch(`/api/comments/${eventId}`)
      .then(res => res.json())
      .then(data => setComments(data.comments))
    }
  },[showComments])
  console.log(comments)

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  function addCommentHandler(commentData) {
    // send data to API
    fetch(`/api/comments/${eventId}`, {
      method: "POST",
      headers: {
        "content-type" : "application/json"
      },
      body: JSON.stringify(commentData)
    })
    .then(res => res.json())
    .then(data => console.log(data))
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList items={comments} />}
    </section>
  );
}

export default Comments;
