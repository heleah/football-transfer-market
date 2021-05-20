export function saveToLocal(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function loadFromLocal(key) {
  try {
    const data = localStorage.getItem(key);
    return JSON.parse(data);
  } catch (error) {
    console.error(error);
  }
}
