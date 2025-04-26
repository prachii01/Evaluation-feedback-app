import { useState } from 'react';
import { postFeedback } from '../firebase';

export default function FeedbackForm({ onFeedbackSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    comment: ''
  });
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.comment.trim()) {
      newErrors.comment = 'Comment is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const feedbackData = {
        ...formData,
        timestamp: new Date().toISOString()
      };
      const response = await postFeedback(feedbackData);
      const newFeedback = { id: response.name, ...feedbackData };
      onFeedbackSubmit(newFeedback);
      setFormData({ name: '', email: '', comment: '' });
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      alert('Failed to submit feedback. Please try again.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  return (
    <form className="feedback-form" onSubmit={handleSubmit}>
      {showSuccess && (
        <div className="success-message show">
          Feedback submitted successfully!
        </div>
      )}
      
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={errors.name ? 'error' : ''}
        />
        {errors.name && <div className="error-message">{errors.name}</div>}
      </div>

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={errors.email ? 'error' : ''}
        />
        {errors.email && <div className="error-message">{errors.email}</div>}
      </div>

      <div className="form-group">
        <label htmlFor="comment">Comment</label>
        <textarea
          id="comment"
          name="comment"
          value={formData.comment}
          onChange={handleChange}
          rows="4"
          className={errors.comment ? 'error' : ''}
        />
        {errors.comment && <div className="error-message">{errors.comment}</div>}
      </div>

      <button type="submit" className="btn btn-primary">
        Submit Feedback
      </button>
    </form>
  );
}
