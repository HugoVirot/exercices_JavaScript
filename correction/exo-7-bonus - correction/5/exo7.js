console.log("exo-7");

console.log(jsonDatas);

var currentArray = jsonDatas;

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
	refreshTypeList();
	displayItems();
	document.getElementById('add-item-form').reset();
}

function displayItems(){
	var table = document.getElementById('items-table');
	var showEmpty=document.getElementById('show-empty').checked;
	var inputType= document.getElementById('type').value;
	cleanTable(table);
	sortItems();
	currentArray.forEach(function(element) {
		if((inputType=="" ||inputType==element.type) ){
			element.items.forEach(function(item) {
				if(showEmpty || item.quantity>0){
					createLine(table, item, element.displayType, element.type);
				}
			});
		}
	});
}

function cleanTable(table){
	var parent = table.getElementsByTagName('tbody')[0];
	while(parent.hasChildNodes())
	{
	   parent.removeChild(parent.firstChild);
	}
}

function createLine(table, item, displayType, type){

	var row = table.getElementsByTagName('tbody')[0].insertRow(-1);

	var selectCell = row.insertCell(0);
	var selection = document.createElement('input');
	selection.type = "checkbox";
	selection.className = "form-control";
	selectCell.appendChild(selection);
	var nameCell = row.insertCell(1);
	nameCell.innerHTML=item.name;
	var descCell = row.insertCell(2);
	descCell.innerHTML=item.description;
	var typeCell = row.insertCell(3);
	if(displayType!=null){
		typeCell.innerHTML=displayType;
	}
	else{
		typeCell.innerHTML=type;
	}
	var priceCell = row.insertCell(4);
	priceCell.innerHTML=item.price;
	var quantityCell = row.insertCell(5);
	quantityCell.innerHTML=item.quantity;
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

function refreshTypeList(){
	var select = document.getElementById('type');
	var selected=select.value;
	//clean first
	while(select.hasChildNodes())
	{
	   select.removeChild(select.firstChild);
	}
	//append default select
	var defaultOption = document.createElement('option');
	defaultOption.value = "";
	defaultOption.innerHTML = "";
	select.appendChild(defaultOption);
	//then append
	currentArray.forEach(function(category) {
		let optionLabel = category.type;
		if(category.displayType!=null){
			optionLabel = category.displayType;
		}
		var option = document.createElement('option');
		if(selected==category.type){
			option.selected ="selected";
		}
		option.value = category.type;
		option.innerHTML = optionLabel;
		select.appendChild(option);
	});
}

Array.prototype.keySort = function(key, desc){
  this.sort(function(a, b) {
    var result = desc ? (a[key] < b[key]) : (a[key] > b[key]);
    return result ? 1 : -1;
  });
  return this;
}


var myTable={
	videoGame:"Jeux Vidéos",
	car:"Voiture",
	house:"Maison",
	show:"Spectacle"
}

currentArray.forEach(function(element) {
	element.displayType=myTable[element.type];
});

displayItems();
refreshTypeList();
