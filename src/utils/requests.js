// src/utils/requests.js
const keyFor = (email) => `bc_requests:${email || "anonymous"}`;

const safeParse = (value, fallback) => {
  try {
    return JSON.parse(value) ?? fallback;
  } catch {
    return fallback;
  }
};

export const getRequests = (email) => {
  const raw = localStorage.getItem(keyFor(email));
  return safeParse(raw, []);
};

export const saveRequests = (email, requests) => {
  localStorage.setItem(keyFor(email), JSON.stringify(requests));
};

export const addRequest = (email, request) => {
  const existing = getRequests(email);
  const updated = [request, ...existing]; // newest first
  saveRequests(email, updated);
  return updated;
};

export const clearRequests = (email) => {
  localStorage.removeItem(keyFor(email));
};
