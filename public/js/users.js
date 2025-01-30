document.addEventListener('DOMContentLoaded', function() {
    loadUsers();
});

async function loadUsers() {
    try {
        const response = await fetch('/users');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const users = await response.json();
        
        const tbody = document.getElementById('usersList');
        if (!tbody) {
            console.error('Element usersList non trouvé dans le DOM');
            return;
        }
        
        tbody.innerHTML = '';
        users.forEach(user => {
            console.log('Traitement utilisateur:', user);
            tbody.innerHTML += `
                <tr>
                    <td>${user.username}</td>
                    <td>${user.email}</td>
                    <td>
                        <button onclick="editUser('${user.email}')">Modifier</button>
                        <button onclick="deleteUser('${user.email}')">Supprimer</button>
                    </td>
                </tr>
            `;
        });
    } catch (error) {
        console.error('Erreur chargement utilisateurs:', error);
    }
}

function showAddModal() {
    document.getElementById('addModal').hidden = false;
}

function closeAddModal() {
    document.getElementById('addModal').hidden = true;
    document.getElementById('addUserForm').reset();
}

function closeEditModal() {
    document.getElementById('editModal').hidden = true;
    document.getElementById('editUserForm').reset();
}

document.getElementById('addUserForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const data = {
        username: formData.get('username'),
        email: formData.get('email'),
        password: formData.get('password')
    };

    try {
        const response = await fetch('/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            await loadUsers();
            closeAddModal();
            this.reset();
        } else {
            const error = await response.text();
            alert(error);
        }
    } catch (error) {
        console.error('Erreur:', error);
    }
});

async function editUser(email) {
    document.getElementById('editUserEmail').value = email;
    document.getElementById('editModal').hidden = false;
}

document.getElementById('editUserForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const email = document.getElementById('editUserEmail').value;
    const formData = new FormData(this);
    const data = {};

    if (formData.get('username')) data.username = formData.get('username');
    if (formData.get('email')) data.email = formData.get('email');
    if (formData.get('password')) data.password = formData.get('password');

    try {
        const response = await fetch(`/users/${email}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            await loadUsers();
            closeEditModal();
        } else {
            const error = await response.text();
            alert(error);
        }
    } catch (error) {
        console.error('Erreur:', error);
    }
});

async function deleteUser(email) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
        try {
            const response = await fetch(`/users/${email}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                await loadUsers();
            } else {
                const error = await response.text();
                alert(error);
            }
        } catch (error) {
            console.error('Erreur:', error);
        }
    }
}