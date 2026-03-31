// navigation.js — Manejo de navegación entre secciones

import { loadPosts } from "./posts.js";

const homeSection = document.getElementById("homeSection");
const createSection = document.getElementById("createSection");

export function showHome() {
  homeSection.classList.remove("hidden");
  createSection.classList.add("hidden");
  loadPosts();
}

export function showCreate() {
  homeSection.classList.add("hidden");
  createSection.classList.remove("hidden");
}
