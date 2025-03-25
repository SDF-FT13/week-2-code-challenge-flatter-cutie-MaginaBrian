 document.addEventListener('DOMContentLoaded', () => {
        const baseUrl = 'https://json-server-vercel-rho-umber.vercel.app/characters';
        const characterBar = document.querySelector('#character-bar');
        const nameDisplay = document.querySelector('#name');
        const imageDisplay = document.querySelector('#image');
        const voteCount = document.querySelector('#vote-count');
        const votesForm = document.querySelector('#votes-form');
  
    let currentCharacter = null;
  
    fetch(baseUrl)
      .then(res => res.json())
      .then(characters => {

        characters.forEach(char => {
          const span = document.createElement('span');
          span.textContent = char.name;
          span.onclick = () => showCharacter(char);
          characterBar.appendChild(span);
        });
        
        if (characters.length > 0) showCharacter(characters[0]);
      })
      .catch(err => {
        characterBar.innerHTML = '<span>Error loading</span>';
      });
  
    function showCharacter(character) {
      currentCharacter = character;
      nameDisplay.textContent = character.name;
      imageDisplay.src = character.image;
      voteCount.textContent = character.votes;
    }
  
    votesForm.addEventListener('submit', e => {
      e.preventDefault();
      const votes = parseInt(e.target.votes.value);
      if (!isNaN(votes)) {
        currentCharacter.votes += votes;
        voteCount.textContent = currentCharacter.votes;
        e.target.reset();
      }
    });
  
    document.getElementById('reset-btn').addEventListener('click', () => {
      if (currentCharacter) {
        currentCharacter.votes = 0;
        voteCount.textContent = 0;
      }
    });
  });
