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
    var obj ={"contact":{}};
	var type="";
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
		if(item.name!="type"){
			if(item.classList.contains("contact")){
				
				obj.contact[item.name] = value;
			}
			else{
				obj[item.name] = value;
			}
		}
		else{
			type=item.value;
		}
    }
	var categoryExists = false;
	currentArray.forEach(function(category) {
		if(category.type == type){
			categoryExists=true;
			category.items.push(obj);
		}
	});
	if(!categoryExists){
		var newCategory={"type":type,"items":[obj]};
		jsonDatas.push(newCategory);
	}
	displayItems();
	document.getElementById('add-item-form').reset();
}

function displayItems(){
	sortItems();
	var showEmpty=document.getElementById('show-empty').checked;
	var inputType= document.getElementById('type').value;
	currentArray.forEach(function(element) {
		if((inputType=="" ||inputType==element.type) ){
			element.items.forEach(function(item) {
				if(showEmpty || item.quantity>0){
					console.log(item);
				}
			});
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
		currentArray=jsonDatas;
		currentArray.forEach(function(category) {
			category.items.keySort(sortType,desc);
		});
	}
}

Array.prototype.keySort = function(key, desc){
  this.sort(function(a, b) {
    var result = desc ? (a[key] < b[key]) : (a[key] > b[key]);
    return result ? 1 : -1;
  });
  return this;
}

