console.log("exo-7");

console.log(jsonDatas);


var myTable={
	videoGame:"Jeux Vidéos",
	car:"Voiture",
	house:"Maison",
	show:"Spectacle"
}
var currentArray = jsonDatas;


	currentArray.forEach(function(category) {
		category.items.forEach(function(item) {
			console.log(item.contact);
		});
	});

