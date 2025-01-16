document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('errorMessage');

    try {
        const response = await fetch('/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();
        
        if (response.ok) {
            localStorage.setItem('token', data.token);
            window.location.href = '/dashboard';
        } else {
            errorMessage.textContent = data.message || 'Erreur de connexion';
            errorMessage.style.display = 'block';
        }
    } catch (error) {
        console.error('Erreur:', error);
        errorMessage.textContent = 'Erreur de connexion au serveur';
        errorMessage.style.display = 'block';
    }
});