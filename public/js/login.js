document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault(); // Empêche la soumission normale du formulaire
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });
            
            if (response.ok) {
                // Si la connexion réussit, redirige vers le dashboard
                window.location.href = '/dashboard';
            } else {
                // Si la connexion échoue, affiche le message d'erreur
                const data = await response.text();
                alert(data || 'Erreur de connexion');
            }
        } catch (error) {
            console.error('Erreur:', error);
            alert('Erreur lors de la connexion');
        }
    });
});