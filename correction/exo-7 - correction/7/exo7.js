console.log("exo-7");

console.log(jsonDatas);


var myTable={
	videoGame:"Jeux Vidéos",
	car:"Voiture",
	house:"Maison",
	show:"Spectacle"
}
var currentArray = jsonDatas;

currentArray.forEach(function(element) {
	element.displayType=myTable[element.type];
});


function processForm(){
	var formData = new FormData(document.getElementById('add-item-form'));
	var elements = document.getElementById("add-item-form").elements;
    var obj ={};
    for(var i = 0 ; i < elements.length ; i++){
        var item = elements.item(i);
		var value = item.value;
		if(item.type=="number"){
			if(!isNaN(parseInt(value))){
				value = parseInt(value);
			}
			else{
				value=0;
			}
		}
        obj[item.name] = value;
    }
	jsonDatas.push(obj);
	displayItems();
	document.getElementById('add-item-form').reset();
}

function displayItems(){
	sortItems();
	var showEmpty=document.getElementById('show-empty').checked;
	var inputType= document.getElementById('type').value;
	currentArray.forEach(function(element) {
		if((inputType=="" ||inputType==element.type) && (showEmpty || element.quantity>0)){
			console.log(element);
		}
	});
}

function sortItems(){
	var sortType = document.getElementById('sort-type').value;
	var sortOrder = document.getElementById('sort-order').value;
	if(sortType=="default" ){
		currentArray = jsonDatas;
	}
	else{
		var desc=true;
		if(sortOrder.toLowerCase() != "desc"){
			desc=false;
		}
		currentArray=jsonDatas.keySort(sortType,desc);
	}
}

Array.prototype.keySort = function(key, desc){
  this.sort(function(a, b) {
    var result = desc ? (a[key] < b[key]) : (a[key] > b[key]);
    return result ? 1 : -1;
  });
  return this;
}

