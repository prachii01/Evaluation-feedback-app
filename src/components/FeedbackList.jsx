import { deleteFeedback } from '../firebase';
import FeedbackItem from './FeedbackItem';

export default function FeedbackList({ feedbacks, loading, error, onDelete }) {
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this feedback?')) return;
    
    try {
      await deleteFeedback(id);
      onDelete(id);
    } catch (err) {
      alert('Failed to delete feedback. Please try again.');
    }
  };

  if (loading) {
    return <div>Loading feedback...</div>;
  }

  if (error) {
    return <div style={{ color: 'var(--error-color)' }}>{error}</div>;
  }

  if (feedbacks.length === 0) {
    return <div>No feedback submitted yet.</div>;
  }

  return (
    <div className="feedback-list">
      {feedbacks.map(feedback => (
        <FeedbackItem
          key={feedback.id}
          feedback={feedback}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}
