import React from "react";
import { useState } from "react";
import {useNavigate} from "react-router-dom";

const Home = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        // appel de l'API de connexion
        // si succès rediriger vers le tableau de bord
        navigate('/dashboard');
    };

    return (
        <div className="container mt-5">
            <h1>Application de gestion des Catways</h1>
            <form onSubmit={handleLogin}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Mot de passe</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Se connecter</button>
            </form>

            <a href="/documentation" className="mt-3 d-block">Voir la documentation de l'API</a>
        </div>
    );
};

export default Home;