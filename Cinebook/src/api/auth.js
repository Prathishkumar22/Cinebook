const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

// Helper function to handle responses
const handleResponse = async (response) => {
  const contentType = response.headers.get('content-type');
  
  // Check if response is JSON
  if (!contentType || !contentType.includes('application/json')) {
    const errorText = await response.text();
    throw new Error(errorText || 'Server returned non-JSON response');
  }

  const data = await response.json();

  if (!response.ok) {
    const error = new Error(data.message || 'Request failed');
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
};

export const signup = async (userData) => {
  try {
    // Basic validation
    if (!userData?.email || !userData?.password || !userData?.name) {
      throw new Error('Name, email and password are required');
    }

    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    return await handleResponse(response);
  } catch (error) {
    console.error('Signup error:', error);
    throw error;
  }
};

export const login = async (credentials) => {
  try {
    // Basic validation
    if (!credentials?.email || !credentials?.password) {
      throw new Error('Email and password are required');
    }

    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    return await handleResponse(response);
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};