// api.js — Todas las llamadas a la API externa

const API_URL = "https://dummyjson.com/posts";

export async function fetchPosts(limit = 5) {
  const response = await fetch(`${API_URL}?limit=${limit}`);
  const data = await response.json();
  return data.posts;
}

export async function fetchPostsByQuery(query) {
  const response = await fetch(`${API_URL}/search?q=${query}`);
  const data = await response.json();
  return data.posts;
}

export async function postNewPost({ title, body, userId }) {
  const response = await fetch(`${API_URL}/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, body, userId }),
  });
  const data = await response.json();

  // La API no devuelve estos campos al crear, se inicializan manualmente
  data.reactions = { likes: 0, dislikes: 0 };
  data.views = 0;
  data.tags = [];

  return data;
}
