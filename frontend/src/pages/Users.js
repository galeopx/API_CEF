import React, { useState, useEffect } from 'react';

const Users = () => {
    const [users, setUsers] = useState([]);

    // Récupérer tous les utilisateurs
    useEffect(() => {
        fetch('http://localhost:3000/users') // URL de votre API backend
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Erreur réseau');
                }
                return response.json();
            })
            .then((data) => setUsers(data))
            .catch((error) => console.error('Erreur :', error));
    }, []);

    // Supprimer un utilisateur
    const handleDelete = (email) => {
        fetch(`http://localhost:3000/users/${email}`, {
            method: 'DELETE',
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Erreur lors de la suppression');
                }
                setUsers(users.filter((user) => user.email !== email));
            })
            .catch((error) => console.error('Erreur :', error));
    };

    return (
        <div className="container mt-5">
            <h1>Utilisateurs</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nom</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={user.email}>
                            <td>{index + 1}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>
                                <button
                                    onClick={() => handleDelete(user.email)}
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

export default Users;
