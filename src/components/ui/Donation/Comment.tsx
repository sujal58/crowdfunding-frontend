import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "./Comments.css";

function Comments() {
  const comments = [
    {
      author: "Maria S.",
      text: "Thank you for this amazing initiative. Happy to help!",
      time: "6 hours ago",
      datetime: "2024-06-20T13:45",
    },
    {
      author: "John Doe",
      text: "Great project, hope this changes lives!",
      time: "1 day ago",
      datetime: "2024-06-19T18:22",
    },
  ];

  const { register, handleSubmit, reset } = useForm({
    defaultValues: { comment: "" },
  });

  const onSubmit = (data: any) => {
    if (!data.comment.trim()) return;
    toast.success("Comment posted (demo only).", {
      style: { background: "#f0fdf4", color: "#22c55e" },
    });
    reset();
  };

  return (
    <section className="comments-section" aria-label="Comments">
      {comments.map((c, index) => (
        <article key={index} className="comment">
          <p className="comment-author">{c.author}</p>
          <p className="comment-text">{c.text}</p>
          <time className="comment-time" dateTime={c.datetime}>
            {c.time}
          </time>
        </article>
      ))}
      <form
        className="comment-form"
        onSubmit={handleSubmit(onSubmit)}
        aria-label="Add a new comment"
      >
        <label htmlFor="newComment" className="sr-only">
          Add your comment
        </label>
        <textarea
          id="newComment"
          placeholder="Write your comment..."
          rows={4}
          {...register("comment")}
        ></textarea>
        <button type="submit">Post Comment</button>
      </form>
    </section>
  );
}

export default Comments;
