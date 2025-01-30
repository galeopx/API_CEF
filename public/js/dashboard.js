  // Affichage de la date, j'ai trouvé ce code sur un forum !
  function updateDate() {
    try {
        const dateElement = document.getElementById('currentDate');
        if (!dateElement) {
            console.error("L'élément 'currentDate' n'a pas été trouvé");
            return;
        }
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const date = new Date().toLocaleDateString('fr-FR', options);
        dateElement.textContent = date;
    } catch (error) {
        console.error('Erreur dans updateDate:', error);
    }
  }
  // mettre à jour la date
  document.addEventListener('DOMContentLoaded', updateDate);
  
  window.onerror = function(msg, src, line, col, error) {
    console.log('Erreur:', msg);
    console.log('Source:', src);
    console.log('Ligne:', line);
    return false;
  };
  