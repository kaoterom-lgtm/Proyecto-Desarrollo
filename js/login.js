// /js/login.js

document.addEventListener('DOMContentLoaded', () => {
    // 1. Obtener elementos del DOM
    const loginForm = document.getElementById('login-form');
    const errorMessage = document.getElementById('login-error');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');

    // Credenciales quemadas (usamos 'admin' y '123' como antes)
    const USERNAME = 'admin';
    const PASSWORD = '123';

    // 2. Agregar el listener del evento 'submit'
    loginForm.addEventListener('submit', (e) => {
        // MUY IMPORTANTE: Previene que el formulario se envíe de forma tradicional 
        // y recargue la página, permitiendo que JS maneje la validación.
        e.preventDefault(); 
        
        // Limpiar mensajes de error previos
        errorMessage.textContent = '';
        
        const usernameValue = usernameInput.value;
        const passwordValue = passwordInput.value;

        if (usernameValue === USERNAME && passwordValue === PASSWORD) {
            // Login correcto
            
            // Opción 1 (Preferida): Redirección a index.html (asumiendo que está en la misma carpeta)
            window.location.href = 'index.html'; 

            // Si la Opción 1 falla, prueba esta:
            // window.location.href = './index.html'; 
            
            // Si NINGUNA funciona (posible problema de servidor local), descomenta la siguiente línea 
            // para verificar que al menos la lógica JS se ejecuta correctamente:
            // alert('Login Exitoso, revisa la ruta de redirección.');

        } else {
            // Login incorrecto
            errorMessage.textContent = '❌ Usuario o contraseña incorrectos. Intenta con admin/123.';
            // Limpiar campo de contraseña por seguridad
            passwordInput.value = '';
        }
    });
});