// posts.js — Lógica de negocio y renderizado de posts

import { fetchPosts, fetchPostsByQuery, fetchPostsByTag, fetchPostById, postNewPost } from "./api.js";
import { setState } from "./ui.js";
import { showDetail, showHome, showMyPosts } from "./navigation.js";
import store from "./store.js";

const postsContainer = document.getElementById("postsContainer");
const searchInput = document.getElementById("searchInput");
const createPostForm = document.getElementById("createPostForm");
const titleInput = document.getElementById("titleInput");
const bodyInput = document.getElementById("bodyInput");
const userIdInput = document.getElementById("userIdInput");
const filterBtn = document.getElementById("filterBtn");
const filterUserId = document.getElementById("filterUserId");
const filterTag = document.getElementById("filterTag");
const filterMinLikes = document.getElementById("filterMinLikes");
const backToHomeBtn = document.getElementById("backToHomeBtn");
const detailId = document.getElementById("detailId");
const detailUserId = document.getElementById("detailUserId");
const detailTitleText = document.getElementById("detailTitleText");
const detailBody = document.getElementById("detailBody");
const detailViews = document.getElementById("detailViews");
const detailLikes = document.getElementById("detailLikes");
const detailDislikes = document.getElementById("detailDislikes");
const detailTags = document.getElementById("detailTags");
const detailRaw = document.getElementById("detailRaw");

filterBtn.addEventListener("click", filterPosts);
backToHomeBtn.addEventListener("click", () => {
  showHome();
  loadPosts();
});

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
  showHome();
  loadPosts();
}

// ── RENDERIZAR POSTS ──────────────────────────────────────

function renderPosts(posts) {
  postsContainer.innerHTML = "";

  posts.forEach((post) => {
    const postCard = document.createElement("div");
    postCard.classList.add("post-card");

    const title = document.createElement("h3");
    title.textContent = post.title;

    const body = document.createElement("p");
    body.textContent = post.body;

    const meta = document.createElement("div");
    meta.classList.add("post-meta");

    const views = document.createElement("span");
    views.textContent = `Views: ${post.views}`;

    const likes = document.createElement("span");
    likes.textContent = `Likes: ${post.reactions?.likes ?? 0}`;

    const dislikes = document.createElement("span");
    dislikes.textContent = `Dislikes: ${post.reactions?.dislikes ?? 0}`;

    meta.append(views, likes, dislikes);

    const detailButton = document.createElement("button");
    detailButton.textContent = "Ver detalle";
    detailButton.addEventListener("click", () => openPostDetail(post));

    postCard.append(title, body, meta, detailButton);
    postsContainer.appendChild(postCard);
  });
}

async function openPostDetail(post) {
  try {
    const detailPost = post.tags && post.reactions && typeof post.views !== "undefined"
      ? post
      : await fetchPostById(post.id);

    renderPostDetail(detailPost);
    showDetail();
  } catch {
    alert("No se pudo cargar el detalle del post.");
  }
}

function renderPostDetail(post) {
  detailId.textContent = post.id ?? "N/A";
  detailUserId.textContent = post.userId ?? "N/A";
  detailTitleText.textContent = post.title ?? "";
  detailBody.textContent = post.body ?? "";
  detailViews.textContent = post.views ?? 0;
  detailLikes.textContent = post.reactions?.likes ?? 0;
  detailDislikes.textContent = post.reactions?.dislikes ?? 0;
  detailTags.textContent = (post.tags && post.tags.length > 0) ? post.tags.join(", ") : "Sin tags";
  detailRaw.textContent = JSON.stringify(post, null, 2);
}

// - RENDERIZAR MIS POSTS -
export function renderMyPosts() {
  

  const container = document.getElementById("myPostsContainer");

  container.innerHTML = "";

  if(store.userPosts.length === 0){
    container.textContent = "No posts created yet.";
    return;
  }

  store.userPosts.forEach(post => {

    const postCard = document.createElement("div");
    postCard.classList.add("post-card");

    const title = document.createElement("h3");
    title.textContent = post.title;

    const body = document.createElement("p");
    body.textContent = post.body;

    const likes = document.createElement("p");
    likes.textContent = "Likes: " + post.reactions.likes;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Eliminar";
    deleteBtn.addEventListener("click", () => {
      store.userPosts = store.userPosts.filter(p => p.id !== post.id);
      renderMyPosts();
    });

    postCard.append(title, body, likes, deleteBtn);

    container.appendChild(postCard);

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

// ── FILTRAR POSTS ─────────────────────────────────────────
export async function filterPosts() {
  const userId = filterUserId.value.trim();
  const tag = filterTag.value.trim();
  const minLikes = filterMinLikes.value.trim();

  // Validar que al menos un filtro esté lleno
  if (userId === "" && tag === "" && minLikes === "") {
    alert("Ingresa al menos un filtro.");
    return;
  }

  try {
    setState("loading");

    let posts = [];

    // Filtro por tag (llama endpoint específico)
    if (tag !== "") {
      posts = await fetchPostsByTag(tag);
    } else {
      // Si no hay tag, traer todos y filtrar localmente
      posts = await fetchPosts(100, 0);
    }

    // Filtro por userId (local)
    if (userId !== "") {
      posts = posts.filter(p => p.userId === Number(userId));
    }

    // Filtro por likes mínimos (local)
    if (minLikes !== "") {
      posts = posts.filter(p => p.reactions.likes >= Number(minLikes));
    }

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