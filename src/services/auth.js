// src/services/auth.js
const BackendUrl = 'https://ht-waec-backend.netlify.app/.netlify/functions/server/api';

export async function registerUser(formData) {
  try {
    const response = await fetch(`${BackendUrl}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Registration failed');
    }
    return data;
  } catch (error) {
    throw new Error(error.message || 'Network error');
  }
}

export async function loginUser(email, password) {
  try {
    const response = await fetch(`${BackendUrl}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    console.log('Login request sent:', {
      url: response.url,
      status: response.status,
      statusText: response.statusText
    });

    const data = await response.json();
    if (!response.ok) {
      console.error('Login error response:', data);
      throw new Error(data.message || 'Login failed');
    }
    return data;
  } catch (error) {
    throw new Error(error.message || 'Network error');
  }
}
