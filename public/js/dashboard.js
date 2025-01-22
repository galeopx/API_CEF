// Affichage de la date, j'ai trouvé ce code sur un forum !
function updateDate() {
    const dateElement = document.getElementById('currentDate');
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date().toLocaleDateString('fr-FR', options);
    dateElement.textContent = date;
}
// mettre à jour la date
updateDate();