var titleInput = document.querySelector('.title__input');
var bodyInput = document.querySelector('.body__input');
var saveButton = document.querySelector('.top__input--btn');
var bottomSection = document.querySelector('.main__bottom')

var ideas = [];

checkLocalStorage();
appendCards();

titleInput.addEventListener('keyup', enableSave);
bodyInput.addEventListener('keyup', enableSave);
saveButton.addEventListener("click", createIdea);

bottomSection.addEventListener("click", eventHandling);

function enableSave() {
    if (titleInput.value === '' || bodyInput.value === ''){
      saveButton.disabled = true;
    } else {
        saveButton.disabled = false;
    };
};

function clearFields () {
  if (saveButton.disabled = true) {
    titleInput.value = "";
    bodyInput.value = "";
  };
};

function createIdea() {
	var idea = new Idea({title:titleInput.value, body:bodyInput.value});
	ideas.push(idea);
  idea.saveToStorage(ideas);
  makeCard(idea);
  clearFields();
};

function checkLocalStorage() {
  if (JSON.parse(localStorage.getItem("ideasKey")) === null) {
    ideas = []
  } else {
  ideas = JSON.parse(localStorage.getItem("ideasKey")).map( function(element) {
    return new Idea(element) 
  });
};
};

function findId(event) {
    var foundId = parseInt(event.target.closest('.card').id);
    return foundId;
};

function deleteMatchingIdea(event) {
  var cardId = findId(event)
    ideas = ideas.filter(function(idea) {
        return idea.id !== cardId 
    });
    var idea = new Idea("title", "body")
    idea.saveToStorage(ideas);
};

function deleteCard(event) {
	if (event.target.classList[1] === "card__img--close") {
		var card = event.target.closest(".card")
    card.remove();
    deleteMatchingIdea(event)
  };
};

function appendCards() {
  for (var i = 0; i < ideas.length ; i++) {
    makeCard(ideas[i]);
  };
};

function handlePrompt() {
  var prompt = document.querySelector(".prompt__new-idea")
  if (ideas.length === 0) {
    prompt.hidden = false;
  } else {
  prompt.hidden = true;
  };
};

function getIndex(event) {
  return ideas.findIndex( function(idea) {
    return parseInt(findId(event)) === idea.id
  });
};

function starIdea(event) {
  var index = getIndex(event);
  ideas[index].starred = !ideas[index].starred
  var starToChange = event.target;
  var starred = "images/star-active.svg"
  var notStarred = "images/star.svg"

  ideas[index].starred === true ? starToChange.src = starred : starToChange.src = notStarred
  
  ideas[index].saveToStorage(ideas)
};

function eventHandling() {
  if (event.target.classList[1] === "card__img--close") {
    deleteCard(event);
    handlePrompt();
  }; 

  if (event.target.classList === "card__ideas") {
    updateTitle(event);
  }; 
};

function makeCard(idea) {
  bottomSection.insertAdjacentHTML("afterbegin", `<article class="card" id=${idea.id}>
						<section class="card__header">
              <img src =${idea.starred ? "images/star-active.svg" : "images/star.svg"} class="card__img card__img--star" id="card__img--star" onclick="starIdea(event)">
							<img src="images/delete.svg"  class="card__img card__img--close" onclick="deleteCard(event)">
						</section>
						<section class="card__body">
							<h2 class="card__ideas" contenteditable="true">${idea.title}</h2>
							<p class="card__info" contenteditable="true">${idea.body}</p>
						</section>
						<section class="card__footer">
							<img src="images/upvote.svg" class="card__img card__img--upvote"
							arrow up>
							<p class="card__quality"> Quality: Swill</p>
							<img src="images/downvote.svg"
							class="card__img card__img--downvote" arrow down>
						</section>
          </article>`)
  handlePrompt();
};