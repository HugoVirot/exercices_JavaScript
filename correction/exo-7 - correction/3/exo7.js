console.log("exo-7");

console.log(jsonDatas);
var myTable={
	videoGame:"Jeux Vidéos",
	car:"Voiture",
	house:"Maison",
	show:"Spectacle"
}
jsonDatas.forEach(function(element) {
	//Penser à utiliser une autre variable pour avoir toujours accès à element.type plsu tard
	element.displayType=myTable[element.type];
	console.log(element);
});