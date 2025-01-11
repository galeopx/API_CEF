import React, { useState, useEffect } from 'react';

//Ici nous allons donc intéragir avec le backEnd qui répond aux requêtes HTTP avec des fichiers JSON
// en envoyant des requêtes puis s'il n'y a pas d'erreur nous allons transformer les données
// en interfaces graphique
// Nous utilisons la méthode FETCH pour se faire
const Reservations = () => {
    const [reservations, setReservations] = useState([]);
    const [form, setForm] = useState({
        catwayNumber: '',
        clientName: '',
        boatName: '',
        checkIn: '',
        checkOut: '',
    });

    // Récupérer toutes les réservations
    useEffect(() => {
        fetch('http://localhost:3000/reservations')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Erreur réseau');
                }
                return response.json();
            })
            .then((data) => setReservations(data))
            .catch((error) => console.error('Erreur :', error));
    }, []);

    // Ajouter une réservation
    const handleAddReservation = (e) => {
        e.preventDefault();
        fetch('http://localhost:3000/reservations', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Erreur lors de l'ajout");
                }
                return response.json();
            })
            .then((newReservation) => {
                setReservations([...reservations, newReservation]);
                setForm({ catwayNumber: '', clientName: '', boatName: '', checkIn: '', checkOut: '' });
            })
            .catch((error) => console.error('Erreur :', error));
    };

    // Supprimer une réservation
    const handleDelete = (id) => {
        fetch(`http://localhost:3000/reservations/${id}`, {
            method: 'DELETE',
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Erreur lors de la suppression');
                }
                setReservations(reservations.filter((reservation) => reservation._id !== id));
            })
            .catch((error) => console.error('Erreur :', error));
    };

    return (
        <div className="container mt-5">
            <h1>Réservations</h1>
            <form onSubmit={handleAddReservation}>
                <div>
                    <label>Numéro du Catway</label>
                    <input
                        type="number"
                        value={form.catwayNumber}
                        onChange={(e) => setForm({ ...form, catwayNumber: e.target.value })}
                        required
                    />
                </div>
                <div>
                    <label>Nom du Client</label>
                    <input
                        type="text"
                        value={form.clientName}
                        onChange={(e) => setForm({ ...form, clientName: e.target.value })}
                        required
                    />
                </div>
                <div>
                    <label>Nom du Bateau</label>
                    <input
                        type="text"
                        value={form.boatName}
                        onChange={(e) => setForm({ ...form, boatName: e.target.value })}
                        required
                    />
                </div>
                <div>
                    <label>Date de Début</label>
                    <input
                        type="date"
                        value={form.checkIn}
                        onChange={(e) => setForm({ ...form, checkIn: e.target.value })}
                        required
                    />
                </div>
                <div>
                    <label>Date de Fin</label>
                    <input
                        type="date"
                        value={form.checkOut}
                        onChange={(e) => setForm({ ...form, checkOut: e.target.value })}
                        required
                    />
                </div>
                <button type="submit">Ajouter</button>
            </form>

            <table className="table mt-5">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Catway</th>
                        <th>Client</th>
                        <th>Bateau</th>
                        <th>Début</th>
                        <th>Fin</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {reservations.map((reservation, index) => (
                        <tr key={reservation._id}>
                            <td>{index + 1}</td>
                            <td>{reservation.catwayNumber}</td>
                            <td>{reservation.clientName}</td>
                            <td>{reservation.boatName}</td>
                            <td>{reservation.checkIn}</td>
                            <td>{reservation.checkOut}</td>
                            <td>
                                <button
                                    onClick={() => handleDelete(reservation._id)}
                                    className="btn btn-danger"
                                >
                                    Supprimer
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Reservations;
