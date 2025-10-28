import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Simuler une vérification de l'utilisateur connecté (ex. depuis localStorage)
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (email, password) => {
    const storedUserRaw = localStorage.getItem('user');
    if (!storedUserRaw) return false;
    try {
      const storedUser = JSON.parse(storedUserRaw);
      const inputEmail = String(email || '').trim().toLowerCase();
      const inputPassword = String(password || '').trim();
      const storedEmail = String(storedUser.email || '').trim().toLowerCase();
      const storedPassword = String(storedUser.password || '').trim();

      const isValid = inputEmail === storedEmail && inputPassword === storedPassword;
      if (isValid) {
        const loggedInUser = { email: storedUser.email, name: storedUser.name, role: storedUser.role || 'user' };
        // Met à jour uniquement l'état en mémoire. Ne pas écraser le mot de passe stocké.
        setUser(loggedInUser);
        return true;
      }
      return false;
    } catch (e) {
      return false;
    }
  };

  const register = (userData) => {
    // Simulation d'inscription
    const normalized = {
      name: userData.name,
      email: String(userData.email || '').trim().toLowerCase(),
      password: String(userData.password || '').trim(),
      role: 'user',
    };
    setUser({ email: normalized.email, name: normalized.name, role: normalized.role });
    localStorage.setItem('user', JSON.stringify(normalized));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };