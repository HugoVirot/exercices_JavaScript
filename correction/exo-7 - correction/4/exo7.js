console.log("exo-7");

console.log(jsonDatas);

var myTable={
	videoGame:"Jeux Vidéos",
	car:"Voiture",
	house:"Maison",
	show:"Spectacle"
}
jsonDatas.forEach(function(element) {
	element.displayType=myTable[element.type];
});

function displayItems(){
	var inputType= document.getElementById('type').value;
	jsonDatas.forEach(function(element) {
		console.log(element);
	});
}