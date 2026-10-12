
// Inicialización de i18next con recursos embebidos
//Objeto de javascript = JSON. JSON es texto q representa un objeto
i18next.init({
  lng: localStorage.getItem('language') || "es", // Recuperar el idioma desde localStorage, si no existe, usar "es" por defecto
  debug: true, //permite ver información en la consola útil para depuración.
  resources: { //objeto con las traducciones
    es: {
      translation: {
	    welcome: "¡Bienvenido!",
	    // ...
	}
    },
    en: {
      translation: {
	    // clave: "valor"
            welcome: "Welcome!",
	    // ...
	}
    },
    function(err, t) {
    if (err) return console.error("Error al cargar traducciones", err);
    updateContent();
    }
  }, 
});

// Función para aplicar traducciones a los elementos NORMALES con data-i18n
function updateContent() {
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    el.innerHTML = i18next.t(key);
  });
  // Placeholders
  document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
    const key = el.getAttribute("data-i18n-placeholder");
    el.placeholder = i18next.t(key);
  });
}


// Botón para cambiar idioma (puede haber varios botones)
document.querySelectorAll(".bi-translate").forEach((btn) => {
  btn.addEventListener("click", () => {
    let newLang = i18next.language === "es" ? "en" : "es";
    
    // Cambiar el idioma en i18next
    i18next.changeLanguage(newLang, () => {
      // Actualizar el contenido de la página con el nuevo idioma
      updateContent();
      // Guardar el idioma seleccionado en localStorage
      localStorage.setItem('language', newLang);
    });
  });
});