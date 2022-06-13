console.log("exo-7");

console.log(jsonDatas);

var myTable={
	videoGame:"Jeux Vidéos",
	car:"Voiture",
	house:"Maison",
	show:"Spectacle"
}
var baseArray = jsonDatas;
jsonDatas.forEach(function(element) {
	element.displayType=myTable[element.type];
});

function displayItems(){
	sortItems();
	var showEmpty=document.getElementById('show-empty').checked;
	var inputType= document.getElementById('type').value;
	jsonDatas.forEach(function(element) {
		if(inputType==element.type && (showEmpty || element.quantity>0)){
			console.log(element);
		}
	});
}

function sortItems(){
	var sortType = document.getElementById('sort-type').value;
	var sortOrder = document.getElementById('sort-order').value;
	if(sortType=="default" ){
		jsonDatas = baseArray;
	}
	else{
		var desc=true;
		if(sortOrder.toLowerCase() != "desc"){
			desc=false;
		}
		jsonDatas=jsonDatas.keySort(sortType,desc);
	}
}

Array.prototype.keySort = function(key, desc){
  this.sort(function(a, b) {
    var result = desc ? (a[key] < b[key]) : (a[key] > b[key]);
    return result ? 1 : -1;
  });
  return this;
}
