// API configuration and client
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const apiConfig = {
  baseURL: API_URL,
  apiURL: `${API_URL}/api`,
};

// Generic fetch wrapper with error handling
async function fetchAPI<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${apiConfig.apiURL}${endpoint}`;

  const defaultHeaders: HeadersInit = {
    'Content-Type': 'application/json',
  };

  const config: RequestInit = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      const error = await response.json().catch(() => ({
        message: response.statusText,
      }));
      throw new Error(error.message || `HTTP Error: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('An unknown error occurred');
  }
}

// API methods
export const api = {
  // Auth
  auth: {
    login: (data: { email: string; password: string }) =>
      fetchAPI('/auth/login', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    register: (data: any) =>
      fetchAPI('/auth/register', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    me: () => fetchAPI('/auth/me'),
    updateMe: (data: any) =>
      fetchAPI('/auth/me', {
        method: 'PATCH',
        body: JSON.stringify(data),
      }),
    changePassword: (data: {
      currentPassword: string;
      newPassword: string;
      confirmPassword: string;
    }) =>
      fetchAPI('/auth/change-password', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    logout: () =>
      fetchAPI('/auth/logout', {
        method: 'POST',
      }),
    forgotPassword: (email: string) =>
      fetchAPI('/auth/forgot-password', {
        method: 'POST',
        body: JSON.stringify({ email }),
      }),
    resetPassword: (token: string, password: string) =>
      fetchAPI('/auth/reset-password', {
        method: 'POST',
        body: JSON.stringify({ token, password }),
      }),
  },

  // Properties
  properties: {
    getAll: () => fetchAPI('/properties'),
    getById: (id: string) => fetchAPI(`/properties/${id}`),
    create: (data: any) =>
      fetchAPI('/properties', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    update: (id: string, data: any) =>
      fetchAPI(`/properties/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(data),
      }),
    delete: (id: string) =>
      fetchAPI(`/properties/${id}`, {
        method: 'DELETE',
      }),
    uploadImages: (id: string, formData: FormData) =>
      fetchAPI(`/properties/${id}/images`, {
        method: 'POST',
        body: formData,
        headers: {}, // Let browser set Content-Type for FormData
      }),
    share: (id: string) => fetchAPI(`/properties/${id}/share`),
  },

  // Contracts
  contracts: {
    getAll: () => fetchAPI('/contracts'),
    getById: (id: string) => fetchAPI(`/contracts/${id}`),
    create: (data: any) =>
      fetchAPI('/contracts', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    update: (id: string, data: any) =>
      fetchAPI(`/contracts/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(data),
      }),
    sendOTP: (id: string) =>
      fetchAPI(`/contracts/${id}/send-otp`, {
        method: 'POST',
      }),
    verifyOTP: (id: string, otp: string) =>
      fetchAPI(`/contracts/${id}/verify-otp`, {
        method: 'POST',
        body: JSON.stringify({ otp }),
      }),
    generatePDF: (id: string) => fetchAPI(`/contracts/${id}/generate-pdf`),
    download: (id: string) => `${apiConfig.apiURL}/contracts/${id}/download`,
  },

  // Viewings
  viewings: {
    getAll: () => fetchAPI('/viewings'),
    getById: (id: string) => fetchAPI(`/viewings/${id}`),
    create: (data: any) =>
      fetchAPI('/viewings', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    update: (id: string, data: any) =>
      fetchAPI(`/viewings/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(data),
      }),
    updateOutcome: (id: string, outcome: string) =>
      fetchAPI(`/viewings/${id}/outcome`, {
        method: 'POST',
        body: JSON.stringify({ outcome }),
      }),
  },

  // Users
  users: {
    getAll: () => fetchAPI('/users'),
    getById: (id: string) => fetchAPI(`/users/${id}`),
    update: (id: string, data: any) =>
      fetchAPI(`/users/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(data),
      }),
    verifyRERA: (reraNumber: string) =>
      fetchAPI('/users/verify-rera', {
        method: 'POST',
        body: JSON.stringify({ reraNumber }),
      }),
  },
};

export default api;
