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
	var showEmpty=document.getElementById('show-empty').checked;
	var inputType= document.getElementById('type').value;
	jsonDatas.forEach(function(element) {
		if(inputType==element.type && (showEmpty || element.quantity>0)){
			console.log(element);
		}
	});
}