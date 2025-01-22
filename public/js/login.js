document.querySelector('form').addEventListener('submit', async (e) => {
    e.preventDefault(); // Empêche la soumission traditionnelle du formulaire
    
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

        const data = await response.json();
        
        if (data.success) {
            window.location.replace(data.redirectUrl);
        } else {
            alert(data.message); 
        }
    } catch (error) {
        console.error('Erreur:', error);
        alert('Erreur lors de la connexion');
    }
});