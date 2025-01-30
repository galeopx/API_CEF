document.addEventListener('DOMContentLoaded', function() {
    console.log('Script catways.js chargé');
    loadCatways();

    // Ajout des gestionnaires d'événements pour les formulaires
    document.getElementById('addCatwayForm').addEventListener('submit', handleAddSubmit);
    document.getElementById('editCatwayForm').addEventListener('submit', handleEditSubmit);
});

async function loadCatways() {
    console.log('Tentative de chargement des catways');
    try {
        const response = await fetch('/catways');
        console.log('Réponse reçue:', response);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const catways = await response.json();
        console.log('Catways reçus:', catways);
        
        const tbody = document.getElementById('catwaysList');
        tbody.innerHTML = '';
        
        catways.forEach(catway => {
            tbody.innerHTML += `
                <tr>
                    <td>${catway.catwayNumber}</td>
                    <td>${catway.type}</td>
                    <td>${catway.catwayState}</td>
                    <td>
                        <button onclick="editCatway(${catway.catwayNumber})">Modifier</button>
                    </td>
                </tr>
            `;
        });
    } catch (error) {
        console.error('Erreur lors du chargement:', error);
    }
}

function showAddModal() {
    document.getElementById('addModal').hidden = false;
}

function closeAddModal() {
    document.getElementById('addModal').hidden = true;
}

function editCatway(catwayNumber) {
    document.getElementById('editCatwayNumber').value = catwayNumber;
    document.getElementById('editModal').hidden = false;
}

function closeEditModal() {
    document.getElementById('editModal').hidden = true;
}

async function handleAddSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const catwayData = {
        catwayNumber: parseInt(formData.get('catwayNumber')),
        type: formData.get('type'),
        catwayState: formData.get('catwayState')
    };

    try {
        const response = await fetch('/catways', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(catwayData)
        });

        if (response.ok) {
            await loadCatways();
            closeAddModal();
            this.reset();
        } else {
            const error = await response.text();
            alert('Erreur: ' + error);
        }
    } catch (error) {
        console.error('Erreur:', error);
        alert('Erreur lors de l\'ajout du catway');
    }
}

async function handleEditSubmit(e) {
    e.preventDefault();
    
    const catwayNumber = document.getElementById('editCatwayNumber').value;
    const newState = this.elements['catwayState'].value;

    try {
        const response = await fetch(`/catways/${catwayNumber}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ catwayState: newState })
        });

        if (response.ok) {
            await loadCatways();
            closeEditModal();
            this.reset();
        } else {
            alert('Erreur lors de la modification');
        }
    } catch (error) {
        console.error('Erreur:', error);
        alert('Erreur lors de la modification');
    }
}