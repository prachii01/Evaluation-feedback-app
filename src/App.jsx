import { useState, useEffect } from 'react'
import './styles/styles.css'
import './styles/feedback.css'
import FeedbackForm from './components/FeedbackForm'
import FeedbackList from './components/FeedbackList'
import ThemeToggle from './components/ThemeToggle'
import { getFeedback } from './firebase'

function App() {
  // Initialize theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.dataset.theme = savedTheme;
    document.documentElement.className = savedTheme;
  }, []);

  const [feedbacks, setFeedbacks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const loadFeedbacks = async () => {
    try {
      const data = await getFeedback()
      setFeedbacks(data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)))
      setError(null)
    } catch (err) {
      setError('Failed to load feedback. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadFeedbacks()
  }, [])

  const handleNewFeedback = (newFeedback) => {
    setFeedbacks(prev => [newFeedback, ...prev])
  }

  const handleDelete = async (id) => {
    setFeedbacks(prev => prev.filter(feedback => feedback.id !== id))
  }

  return (
    <div className="container">
      <ThemeToggle />
      <header>
        <h1>Feedback Board</h1>
      </header>
      <main>
        <h2>Feedback Board</h2>
        <FeedbackForm onFeedbackSubmit={handleNewFeedback} />
        <FeedbackList 
          feedbacks={feedbacks}
          loading={loading}
          error={error}
          onDelete={handleDelete}
        />
      </main>
    </div>
  )
}

export default App
