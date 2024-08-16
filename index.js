
/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import games from './games.js';
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/
const searchBar = document.getElementById('search-bar');
searchBar.addEventListener('input', function() {
  const searchTerm = searchBar.value.toLowerCase();
  const gameCards = gamesContainer.getElementsByClassName('game-card');
  
  Array.from(gameCards).forEach((card) => {
    const title = card.querySelector('h3').textContent.toLowerCase();
    if (title.includes(searchTerm)) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
});
// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {
 
    // loop over each item in the data
    for (let i = 0; i < games.length; i++ ){

        const game = games[i];
    
        // create a new div element, which will become the game card
        let gameCard = document.createElement("div");

        // add the class game-card to the list
        gameCard.classList.add("game-card")

        // set the inner HTML using a template literal to display some info 
        // about each game
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")
        gameCard.innerHTML = `
        <h3>${game.name}</h3>
        <p>${game.description}</p>
        <img src = "${game.img}" alt = "${game.name}" />`;

        // append the game to the games-container
        gamesContainer.appendChild(gameCard);

}

}

// call the function we just defined using the correct variable

addGamesToPage(GAMES_JSON)
// later, we'll call this function using a different list of games


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const totalContributions = GAMES_JSON.reduce( (acc, game) => {
    return acc + game.backers;
  }, 0);
  console.log(totalContributions)

// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = `${totalContributions.toLocaleString()}`;

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");
const totalAmount = GAMES_JSON.reduce( (acc, game) => {
    return acc + game.pledged;
  }, 0);
 

// set inner HTML using template literal
raisedCard.innerHTML = `$${totalAmount.toLocaleString()}`;

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");

const totalGames = GAMES_JSON.length;

gamesCard.innerHTML = `${totalGames}`;
/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    let unfundedGames = GAMES_JSON.filter((game) => {
        return game.pledged < game.goal;
    });

    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(unfundedGames);
    console.log(unfundedGames.length);
}
filterUnfundedOnly()


// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    let fundedGames = GAMES_JSON.filter((game) => {
        return game.pledged >= game.goal
    });

    // use the function we previously created to add unfunded games to the DOM
    addGamesToPage(fundedGames);
    console.log(fundedGames.length);
}
filterFundedOnly()


// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON)
}
showAllGames()

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
document.getElementById("unfunded-btn").addEventListener("click", filterUnfundedOnly);
document.getElementById("funded-btn").addEventListener("click", filterFundedOnly);
document.getElementById("all-btn").addEventListener("click", showAllGames);

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/
const unfundedGames = GAMES_JSON.filter((game) => game.pledged < game.goal).length;

const displayStr = `A total of $${totalAmount.toLocaleString()} has been raised for ${totalGames} game${totalGames > 1 ? 's' : ''}. Currently, ${unfundedGames} game${unfundedGames !== 1 ? 's' : ''} remain${unfundedGames !== 1 ? '' : 's'} unfunded. We need your help to fund these amazing game${totalGames > 1 ? 's' : ''}!`;
console.log(displayStr);

// grab the description container
const descriptionContainer = document.getElementById("description-container");
const newParagraph = document.createElement('p');
newParagraph.textContent = displayStr;
descriptionContainer.appendChild(newParagraph);

// use filter or reduce to count the number of unfunded games


// create a string that explains the number of unfunded games using the ternary operator


// create a new DOM element containing the template string and append it to the description container

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
const [topGame, secondTopGame] = sortedGames;
// create a new element to hold the name of the top pledge game, then append it to the correct element
const topGameElement = document.createElement("p");
topGameElement.textContent = topGame.name;
firstGameContainer.appendChild(topGameElement);
// do the same for the runner up item
const secondGameElement = document.createElement("p");
secondGameElement.textContent = secondTopGame.name;
secondGameContainer.appendChild(secondGameElement);

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
});

document.querySelectorAll('.fade-in').forEach(section => {
  observer.observe(section);
});

// JavaScript to animate stats numbers
function animateValue(element, start, end, duration, prefix = '') {
  let startTimestamp = null;

  const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const currentValue = Math.floor(progress * (end - start) + start);

      // Apply toLocaleString() and add the prefix if provided
      element.innerHTML = `${prefix}${currentValue.toLocaleString()}`;

      if (progress < 1) {
          window.requestAnimationFrame(step);
      }
  };

  window.requestAnimationFrame(step);
}

const contributionsElement = document.getElementById('num-contributions');
animateValue(contributionsElement, 0, totalContributions, 2000);

const raisedElement = document.getElementById('total-raised');
animateValue(raisedElement, 0, totalAmount, 2000, '$');
