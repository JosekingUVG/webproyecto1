// main.js — Punto de entrada de la aplicación
// Solo registra eventos e inicializa. Toda la lógica vive en sus módulos.

import { showHome, showCreate, showMyPosts } from "./navigation.js";
import { searchPosts, createPost, loadPosts, renderMyPosts } from "./posts.js";

// ── REFERENCIAS DOM ───────────────────────────────────────

const homeBtn = document.getElementById("homeBtn");
const createBtn = document.getElementById("createBtn");
const searchBtn = document.getElementById("searchBtn");
const createPostForm = document.getElementById("createPostForm");
const retryBtn = document.getElementById("retryBtn");
const myPostsBtn = document.getElementById("myPostsBtn");


// ── REGISTRO DE EVENTOS ───────────────────────────────────

homeBtn.addEventListener("click", () => {
  showHome();
  loadPosts();
});
createBtn.addEventListener("click", showCreate);
searchBtn.addEventListener("click", searchPosts);
createPostForm.addEventListener("submit", createPost);
retryBtn.addEventListener("click", loadPosts);
myPostsBtn.addEventListener("click", () => {
  showMyPosts();
  renderMyPosts();
});


// ── INICIALIZACIÓN ────────────────────────────────────────

document.addEventListener("DOMContentLoaded", loadPosts);
