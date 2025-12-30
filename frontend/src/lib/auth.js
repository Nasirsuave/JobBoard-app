// Token storage helpers
export const getToken = () => localStorage.getItem('authToken');
export const setToken = (token) => localStorage.setItem('authToken', token);
export const removeToken = () => localStorage.removeItem('authToken');

export const getUser = () => {
  const user = localStorage.getItem('authUser');
  return user ? JSON.parse(user) : null;
};
export const setUser = (user) => localStorage.setItem('authUser', JSON.stringify(user));
export const removeUser = () => localStorage.removeItem('authUser');

export const isAuthenticated = () => !!getToken();
