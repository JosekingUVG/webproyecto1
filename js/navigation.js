// navigation.js — Manejo de navegación entre secciones

const homeSection = document.getElementById("homeSection");
const createSection = document.getElementById("createSection");
const detailSection = document.getElementById("detailSection");
const myPostsSection = document.getElementById("myPostsSection");

export function showHome() {
  homeSection.classList.remove("hidden");
  createSection.classList.add("hidden");
  detailSection.classList.add("hidden");
  myPostsSection.classList.add("hidden");

}

export function showCreate() {
  homeSection.classList.add("hidden");
  createSection.classList.remove("hidden");
  detailSection.classList.add("hidden");
  myPostsSection.classList.add("hidden");

}

export function showDetail() {
  homeSection.classList.add("hidden");
  createSection.classList.add("hidden");
  detailSection.classList.remove("hidden");
  myPostsSection.classList.add("hidden");
}

export function showMyPosts() {
  homeSection.classList.add("hidden");
  createSection.classList.add("hidden");
  detailSection.classList.add("hidden");
  myPostsSection.classList.remove("hidden");
}
