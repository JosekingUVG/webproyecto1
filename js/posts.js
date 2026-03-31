// posts.js — Lógica de negocio y renderizado de posts

import { fetchPosts, fetchPostsByQuery, fetchPostsByTag, postNewPost } from "./api.js";
import { setState } from "./ui.js";
import store from "./store.js";

const postsContainer = document.getElementById("postsContainer");
const searchInput = document.getElementById("searchInput");
const createPostForm = document.getElementById("createPostForm");
const titleInput = document.getElementById("titleInput");
const bodyInput = document.getElementById("bodyInput");
const userIdInput = document.getElementById("userIdInput");

// ── ESTADO DE PAGINACIÓN ─────────────────────────────────────────
let currentPage = 0;
const limit = 5;

// ── CARGAR POSTS ──────────────────────────────────────────

export async function loadPosts() {
  try {
    setState("loading");

    const apiPosts = await fetchPosts(limit, currentPage * limit);

    let allPosts = [];

    if(currentPage === 0){
      allPosts = [...store.userPosts, ...apiPosts];
    }else{
      allPosts = apiPosts;
    }

    if (allPosts.length === 0) {
      setState("empty");
      return;
    }

    renderPosts(allPosts);
    renderPagination();

    setState("success");
  } catch {
    setState("error");
  }
}

// ── BUSCAR POSTS ──────────────────────────────────────────

export async function searchPosts() {
  const query = searchInput.value.trim();

  if (query === "") {
    loadPosts();
    return;
  }

  try {
    setState("loading");

    const posts = await fetchPostsByQuery(query);

    if (posts.length === 0) {
      setState("empty");
      return;
    }

    renderPosts(posts);
    setState("success");
  } catch {
    setState("error");
  }
}


// ── CREAR POST ────────────────────────────────────────────

export async function createPost(event) {
  event.preventDefault();

  const title = titleInput.value.trim();
  const body = bodyInput.value.trim();
  const userId = userIdInput.value.trim();

  // Validaciones
  if (title === "") return alert("El título es obligatorio.");
  if (title.length < 5) return alert("El título debe tener al menos 5 caracteres.");
  if (body === "") return alert("El contenido es obligatorio.");
  if (body.length < 20) return alert("El contenido debe tener al menos 20 caracteres.");
  if (userId === "") return alert("El User ID es obligatorio.");
  if (isNaN(userId) || Number(userId) <= 0)
    return alert("El User ID debe ser un número válido mayor a 0.");

  const newPost = await postNewPost({ title, body, userId: Number(userId) });

  store.userPosts.unshift(newPost); // Guardar en el estado global
  createPostForm.reset();

  // Regresar al home después de crear
  const { showHome } = await import("./navigation.js");
  showHome();
}


// ── RENDERIZAR POSTS ──────────────────────────────────────

function renderPosts(posts) {
  postsContainer.innerHTML = "";

  posts.forEach((post) => {
    const postCard = document.createElement("div");
    postCard.classList.add("post-card");

    const title = document.createElement("h3");
    title.textContent = post.title;

    const user = document.createElement("p");
    user.textContent = "User ID: " + post.userId;

    const views = document.createElement("p");
    views.textContent = "Views: " + post.views;

    const body = document.createElement("p");
    body.textContent = post.body;

    const likes = document.createElement("p");
    likes.textContent = "Likes: " + post.reactions.likes;

    const dislikes = document.createElement("p");
    dislikes.textContent = "Dislikes: " + post.reactions.dislikes;

    postCard.append(title, body, user, views, likes, dislikes);
    postsContainer.appendChild(postCard);
  });
}

// ── RENDERIZAR PAGINACIÓN ─────────────────────────────────
function nextPage(){
  currentPage++;
  loadPosts();
}

function prevPage(){
  if(currentPage > 0){
    currentPage--;
    loadPosts();
  }
}

function renderPagination(){

  const paginationContainer = document.getElementById("pagination");

  paginationContainer.innerHTML = "";

  // botón prev
  const prevBtn = document.createElement("button");
  prevBtn.textContent = "←";
  prevBtn.onclick = prevPage;

  // número de página
  const pageNumber = document.createElement("span");
  pageNumber.textContent = `Page ${currentPage + 1}`;

  // botón next
  const nextBtn = document.createElement("button");
  nextBtn.textContent = "→";
  nextBtn.onclick = nextPage;

  paginationContainer.append(prevBtn, pageNumber, nextBtn);
}
