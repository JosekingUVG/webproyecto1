// ui.js — Control de los estados visuales de la interfaz

const idleState = document.getElementById("idleState");
const loadingState = document.getElementById("loadingState");
const emptyState = document.getElementById("emptyState");
const errorState = document.getElementById("errorState");
const postsContainer = document.getElementById("postsContainer");

/**
 * Establece el estado visual de la UI.
 * @param {"idle"|"loading"|"empty"|"error"|"success"} state
 */
export function setState(state) {
  // Ocultar todos los estados primero
  [idleState, loadingState, emptyState, errorState, postsContainer].forEach(
    (el) => el.classList.add("hidden")
  );

  const stateMap = {
    idle: idleState,
    loading: loadingState,
    empty: emptyState,
    error: errorState,
    success: postsContainer,
  };

  stateMap[state]?.classList.remove("hidden");
}
