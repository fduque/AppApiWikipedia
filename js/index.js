
function getArticles () {

		//get the word to be search
		var inputsearch = document.getElementById("txtinput").value;
		var root = 'https://en.wikipedia.org/w/api.php?action=opensearch&origin=*&search=';
		$.ajax({
			//headers: { 'Api-User-Agent': 'AppTest/1.0' },
		    //data: someData,
		    dataType: 'json',
		    url: root + inputsearch + '&format=json',
		    method: 'GET'
		}).done(function(data) {
		    // If successful...

		    //cleaning cards loaded in the last query on the view
		    $("#cardsView").empty();
		   console.log(data);
		   //building cards in the view
		   cardGenerator(data);
		}).fail(function(jqXHR, textStatus, errorThrown) {
		    // If fail
		    console.log(textStatus + ': ' + errorThrown);
		});
		//removing background video
		$("#mainView").remove();
		//adding new layout page
		loadHtmlPageResult();
}


$("#btn").on("click", getArticles);

function cardGenerator (dataCard) {
	
	//get the word in the searched
	var word = dataCard[0];
	//get qty of arrays = Each array is a Field in a card
	var qtyfields = dataCard[1].length; //-1 because the last element is not an array, see the api the understand.
	//get qty of cards
	var qtycards = dataCard[1].length;
	//split an array per field
	var titlesofcards = dataCard[1];
	var descriptionsofcards = dataCard[2];
	var linksofcards = dataCard[3];
	//creating card backbone/prototyping
	function createCard (index) {
		this.cardIndex = index;
		this.cardTitle= "";
		this.cardDescription= "";
		this.cardUrl= ""
	}
	//list to put all cards converted together
	var cardList = [];

	//creating card in the list
	for (i = 0; i < qtycards; i++ ) {
		var c1 = new createCard(i+1);
		c1.cardTitle = titlesofcards[i];
		c1.cardDescription = descriptionsofcards[i];
		c1.cardUrl = linksofcards[i];
		cardList[i] = c1;
		console.log(cardList.length + " cards createds.");
		pagination = c1.cardIndex + " de " + qtycards;
		createHtmlCards(pagination, c1.cardTitle,c1.cardDescription,c1.cardUrl);
		}
	console.log(cardList);
}

function createHtmlCards (pag, tit, des, lin) {
		$(".cardsView").append("<div class='card w3-hover-shadow w3-hover-blue' style=' margin: 3%; padding: 2px;'><div class='card-block'><h4 class='card-title'>"
			+ tit +
			"</h4><h6 class='card-subtitle mb-2 text-muted text-right'>"
		 	+ pag +" </h6><p class='card-text '>"
		 	+ des +".</p><a href='"
		 	+ lin +"' class='card-link'>"
		 	+ lin +"</a></div></div>");
}

function loadHtmlPageResult () {
	$("#htmlresultpage").append("<div id='jumb' class='jumbotron jumbotron-fluid'><div class='container'><h1 class='display-3'>Wiki Search</h1><p class='lead'>Discover the Wikipedia World!</p><div class='input-group'><input id='txtinput' type='text' class='form-control' placeholder='Search for...'><span class='input-group-btn'><button id='btn' class='btn btn-secondary' type='button'>Go!</button></span></div></div></div>");  
}