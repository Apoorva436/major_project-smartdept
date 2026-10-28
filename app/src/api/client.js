/**
 * SMARTDEPT Frontend - API Client
 * Centralises all backend calls with JWT injection.
 * Never sends the role — always trusts what the server returns.
 */

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

/**
 * Low-level fetch wrapper.
 * Automatically attaches Authorization header from localStorage.
 * Throws structured errors for non-2xx responses.
 */
async function apiRequest(path, options = {}) {
  const token = localStorage.getItem('smartdept_token');

  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ detail: 'Network error' }));
    const error = new Error(errorData.detail || 'An error occurred');
    error.status = response.status;
    error.code = response.headers.get('X-Error-Code');
    error.cooldown = response.headers.get('X-Cooldown-Remaining');
    throw error;
  }

  // 204 No Content
  if (response.status === 204) return null;
  return response.json();
}

// ── Auth API ──────────────────────────────────────────────

export const authApi = {
  /**
   * Step 1: Request OTP — sends email, returns cooldown info.
   * OTP is NEVER in the response.
   */
  requestOtp: (email) =>
    apiRequest('/auth/request-otp', {
      method: 'POST',
      body: JSON.stringify({ email }),
    }),

  /**
   * Step 2: Verify OTP — returns JWT token + user object with role from DB.
   */
  verifyOtp: (email, otp) =>
    apiRequest('/auth/verify-otp', {
      method: 'POST',
      body: JSON.stringify({ email, otp }),
    }),

  /**
   * Validate current token and get fresh user data from DB.
   */
  getMe: () => apiRequest('/auth/me'),

  /**
   * Logout — server acknowledgement, client must clear token.
   */
  logout: () =>
    apiRequest('/auth/logout', { method: 'POST' }).catch(() => null),
};

// ── Users API (Admin only) ────────────────────────────────

export const usersApi = {
  list: () => apiRequest('/users/'),
  create: (data) =>
    apiRequest('/users/', { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) =>
    apiRequest(`/users/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
};
