// La lógica se ejecuta cuando todo el contenido HTML está cargado.
document.addEventListener('DOMContentLoaded', () => {
    
    // NOTA: El problema con la carga de iconos es a menudo un conflicto de tiempo 
    // donde la librería 'lucide' aún no está completamente inicializada. Usamos un 
    // pequeño retraso (50ms) para asegurar que la librería esté lista antes de 
    // inicializar los iconos y la lógica del tema.
    setTimeout(() => {
        // Inicializa los iconos de Lucide (DEBE hacerse después de que el DOM esté listo)
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }

        const htmlElement = document.documentElement;
        const themeToggle = document.getElementById('theme-toggle');
        const themeIcon = document.getElementById('theme-icon');

        // Comprobación de seguridad: si no encontramos el botón, salimos
        if (!themeToggle || !themeIcon) return;


        // Función para cambiar el tema
        function toggleTheme() {
            // Alterna la clase 'dark' en el elemento <html>
            if (htmlElement.classList.contains('dark')) {
                htmlElement.classList.remove('dark');
                htmlElement.classList.add('light');
                themeIcon.setAttribute('data-lucide', 'moon');
                // Almacena la preferencia del usuario
                localStorage.setItem('theme', 'light');
            } else {
                htmlElement.classList.remove('light');
                htmlElement.classList.add('dark');
                themeIcon.setAttribute('data-lucide', 'sun');
                // Almacena la preferencia del usuario
                localStorage.setItem('theme', 'dark');
            }
            // Vuelve a inicializar Lucide para que el icono se actualice visualmente
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }
        }

        // Función para aplicar el tema guardado o el tema por defecto del sistema
        function loadTheme() {
            const savedTheme = localStorage.getItem('theme');
            // Esto comprueba la preferencia de tema del sistema operativo
            const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

            let initialTheme = 'light';
            
            // 1. Usa la preferencia guardada
            if (savedTheme) {
                initialTheme = savedTheme;
            } 
            // 2. Si no hay guardado, usa la preferencia del sistema
            else if (systemPrefersDark) {
                initialTheme = 'dark';
            }

            // Aplica el tema
            if (initialTheme === 'dark') {
                htmlElement.classList.add('dark');
                themeIcon.setAttribute('data-lucide', 'sun');
            } else {
                htmlElement.classList.add('light');
                themeIcon.setAttribute('data-lucide', 'moon');
            }
            // Vuelve a inicializar Lucide para asegurar el icono correcto al cargar
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }
        }

        // Carga el tema al inicio
        loadTheme();

        // Agrega el listener al botón
        themeToggle.addEventListener('click', toggleTheme);

    }, 50); // Pequeño retraso para asegurar que Lucide se cargue

});