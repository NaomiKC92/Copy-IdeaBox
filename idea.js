class Idea {
  constructor(obj) {
      this.title = obj.title;
      this.body = obj.body;
      this.id = obj.id || Date.now();
      this.quality = obj.quality || 0;
      this.starred = obj.starred || false;
  }
// methods we MUST add
  saveToStorage(ideas) {
  	localStorage.setItem("ideasKey", JSON.stringify(ideas));
  }

updateIdea() {
  localStorage.setItem("ideasKey", JSON.stringify(ideas));
//
}

// updateQuality() {git 
//
// }
	deleteFromStorage(id) {
		localStorage.getItem("ideasKey", JSON.parse(ideas));
    //
		
	}


// 	var targetedId = event.target.parentNode.id;
// 	var output = ideas.filter(function(idea){
// 		return idea.id !== parseInt(targetedId);

// 	}
// } 
// maybe this.id instead of ideas???
}