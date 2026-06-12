const htmlElement = document.documentElement;
const toggleButtonElement = document.querySelector(".toggle-darkmode");
const iconElement = toggleButtonElement.firstElementChild;

/** @function getDefaultMode @return {"dark" | "light"} */
function getDefaultMode() {
  return matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

/** @function getOverrideMode @return {"dark" | "light" | null} */
function getOverrideMode() {
  if (htmlElement.classList.contains("dark")) return "dark";
  if (htmlElement.classList.contains("light")) return "light";
  return null;
}

/** @function getActiveMode @return {"dark" | "light"} */
function getActiveMode() {
  if (!getOverrideMode()) {
    return getDefaultMode();
  }

  return getOverrideMode();
}

function setToDark() {
  if (htmlElement.classList.contains("light")) {
    htmlElement.classList.replace("light", "dark");
  } else {
    htmlElement.classList.add("dark");
  }

  iconElement.classList.replace("moon01-icon", "sun-icon");
}

function setToLight() {
  if (htmlElement.classList.contains("dark")) {
    htmlElement.classList.replace("dark", "light");
  } else {
    htmlElement.classList.add("light");
  }

  iconElement.classList.replace("sun-icon", "moon01-icon");
}

function toggleMode() {
  if (getActiveMode() === "dark") {
    setToLight();
  } else {
    setToDark();
  }
}

function init() {
  if (getActiveMode() === "dark") {
    if (iconElement.classList.contains("moon01-icon")) {
      iconElement.classList.replace("moon01-icon", "sun-icon");
    }
  } else {
    if (iconElement.classList.contains("sun-icon")) {
      iconElement.classList.replace("sun-icon", "moon01-icon");
    }
  }
}

addEventListener("DOMContentLoaded", init);
matchMedia("(prefers-color-scheme: dark)").addEventListener("change", init);
toggleButtonElement.addEventListener("click", toggleMode);
