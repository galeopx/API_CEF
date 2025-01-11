import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.js';
import Dashboard from './pages/Dashboard.js';
import Reservations from './pages/Reservation.js';
import Users from './pages/Users.js';


function App() {
  return (
    <Router>
       <div className='App'>
            {/* Ajoutez une barre de navigation ici si nécessaire */}
              <Routes>
                  <Route path="/" element={<Home />} /> {/* Page d'accueil */}
                  <Route path="/dashboard" element={<Dashboard />} /> {/* Tableau de bord */}
                  {/* <Route path="/catways" element={<Catways />} /> CRUD Catways */}
                  <Route path="/reservations" element={<Reservations />} /> {/* CRUD Réservations */}
                  <Route path="/users" element={<Users />} /> {/* CRUD Utilisateurs */}
                  {/* <Route path="*" element={<NotFound />} /> Page 404 */}
              </Routes>
        </div>
    </Router>
  );
}

export default App;
