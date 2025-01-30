document.addEventListener('DOMContentLoaded', function() {
    loadReservations();
    loadCatwaysForSelect();
});

// Modification de la fonction loadReservations
async function loadReservations() {
    console.log('Chargement des réservations...');
    try {
        // Nous devons peut-être ajuster ce chemin selon vos routes
        const response = await fetch('/reservations/all');  // ou le chemin correct selon votre API
        console.log('Réponse reçue:', response);
        
        const reservations = await response.json();
        console.log('Réservations reçues:', reservations);
        
        const tbody = document.getElementById('reservationsList');
        tbody.innerHTML = '';
        
        if (reservations.length === 0) {
            console.log('Aucune réservation trouvée');
            tbody.innerHTML = '<tr><td colspan="6">Aucune réservation trouvée</td></tr>';
            return;
        }
        
        reservations.forEach(reservation => {
            tbody.innerHTML += `
                <tr>
                    <td>${reservation.catwayNumber}</td>
                    <td>${reservation.clientName}</td>
                    <td>${reservation.boatName}</td>
                    <td>${new Date(reservation.checkIn).toLocaleDateString()}</td>
                    <td>${new Date(reservation.checkOut).toLocaleDateString()}</td>
                    <td>
                        <button onclick="editReservation('${reservation._id}', ${reservation.catwayNumber})">Modifier</button>
                        <button onclick="deleteReservation('${reservation._id}', ${reservation.catwayNumber})">Supprimer</button>
                    </td>
                </tr>
            `;
        });
    } catch (error) {
        console.error('Erreur lors du chargement des réservations:', error);
    }
}

async function loadCatwaysForSelect() {
    try {
        const response = await fetch('/catways');
        const catways = await response.json();
        
        const select = document.getElementById('catwaySelect');
        select.innerHTML = '<option value="">Sélectionnez un catway</option>';
        
        catways.forEach(catway => {
            select.innerHTML += `
                <option value="${catway.catwayNumber}">
                    Catway ${catway.catwayNumber} (${catway.type})
                </option>
            `;
        });
    } catch (error) {
        console.error('Erreur:', error);
    }
}

function showAddModal() {
    document.getElementById('addModal').hidden = false;
}

function closeAddModal() {
    document.getElementById('addModal').hidden = true;
    document.getElementById('addReservationForm').reset();
}

function closeEditModal() {
    document.getElementById('editModal').hidden = true;
    document.getElementById('editReservationForm').reset();
}

document.getElementById('addReservationForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const data = {
        catwayNumber: formData.get('catwayNumber'),
        clientName: formData.get('clientName'),
        boatName: formData.get('boatName'),
        checkIn: formData.get('checkIn'),
        checkOut: formData.get('checkOut')
    };

    try {
        const response = await fetch('/reservations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            await loadReservations();
            closeAddModal();
        } else {
            const error = await response.text();
            alert('Erreur: ' + error);
        }
    } catch (error) {
        console.error('Erreur:', error);
        alert('Erreur lors de l\'ajout de la réservation');
    }
});

async function editReservation(reservationId, catwayId) {
    document.getElementById('editReservationId').value = reservationId;
    document.getElementById('editCatwayId').value = catwayId;
    document.getElementById('editModal').hidden = false;
}

document.getElementById('editReservationForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const reservationId = document.getElementById('editReservationId').value;
    const catwayId = document.getElementById('editCatwayId').value;
    const formData = new FormData(this);
    
    const data = {
        checkIn: formData.get('checkIn'),
        checkOut: formData.get('checkOut')
    };

    try {
        const response = await fetch(`/catways/${catwayId}/reservations/${reservationId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            await loadReservations();
            closeEditModal();
        } else {
            alert('Erreur lors de la modification');
        }
    } catch (error) {
        console.error('Erreur:', error);
        alert('Erreur lors de la modification');
    }
});

async function deleteReservation(reservationId, catwayId) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette réservation ?')) {
        try {
            const response = await fetch(`/catways/${catwayId}/reservations/${reservationId}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                await loadReservations();
            } else {
                alert('Erreur lors de la suppression');
            }
        } catch (error) {
            console.error('Erreur:', error);
            alert('Erreur lors de la suppression');
        }
    }
}