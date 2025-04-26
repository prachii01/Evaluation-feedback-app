export default function FeedbackItem({ feedback, onDelete }) {
  const { name, email, comment, timestamp } = feedback;
  
  const formattedDate = new Date(timestamp).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className="feedback-item">
      <h3>{name}</h3>
      <p>{comment}</p>
      <div className="feedback-meta">
        <div>{email}</div>
        <div>{formattedDate}</div>
      </div>
      <button 
        className="btn btn-delete"
        onClick={() => onDelete(feedback.id)}
        style={{ position: 'absolute', top: '1rem', right: '1rem' }}
      >
        Delete
      </button>
    </div>
  );
}
