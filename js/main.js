// main.js — Punto de entrada de la aplicación
// Solo registra eventos e inicializa. Toda la lógica vive en sus módulos.

import { showHome, showCreate } from "./navigation.js";
import { searchPosts, createPost, loadPosts } from "./posts.js";

// ── REFERENCIAS DOM ───────────────────────────────────────

const homeBtn = document.getElementById("homeBtn");
const createBtn = document.getElementById("createBtn");
const searchBtn = document.getElementById("searchBtn");
const createPostForm = document.getElementById("createPostForm");
const retryBtn = document.getElementById("retryBtn");


// ── REGISTRO DE EVENTOS ───────────────────────────────────

homeBtn.addEventListener("click", showHome);
createBtn.addEventListener("click", showCreate);
searchBtn.addEventListener("click", searchPosts);
createPostForm.addEventListener("submit", createPost);
retryBtn.addEventListener("click", loadPosts);


// ── INICIALIZACIÓN ────────────────────────────────────────

document.addEventListener("DOMContentLoaded", loadPosts);
