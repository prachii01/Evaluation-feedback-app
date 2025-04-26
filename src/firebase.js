// Firebase configuration
// Replace this URL with your own Firebase Realtime Database URL
const FIREBASE_URL = "https://feedback-board-app-80160-default-rtdb.firebaseio.com/";

// Validate Firebase URL
if (!FIREBASE_URL || FIREBASE_URL.includes('Feedback-Board-App')) {
  console.error('Please replace the Firebase URL with your own database URL');
}

// Helper functions for Firebase operations
export const postFeedback = async (feedback) => {
  try {
    const response = await fetch(`${FIREBASE_URL}/feedback.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(feedback),
    });
    if (!response.ok) throw new Error('Failed to submit feedback');
    return await response.json();
  } catch (error) {
    console.error('Error posting feedback:', error);
    throw error;
  }
};

export const getFeedback = async () => {
  try {
    const response = await fetch(`${FIREBASE_URL}/feedback.json`);
    if (!response.ok) throw new Error('Failed to fetch feedback');
    const data = await response.json();
    return data ? Object.entries(data).map(([id, value]) => ({ id, ...value })) : [];
  } catch (error) {
    console.error('Error fetching feedback:', error);
    throw error;
  }
};

export const deleteFeedback = async (id) => {
  try {
    const response = await fetch(`${FIREBASE_URL}/feedback/${id}.json`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete feedback');
    return true;
  } catch (error) {
    console.error('Error deleting feedback:', error);
    throw error;
  }
};
