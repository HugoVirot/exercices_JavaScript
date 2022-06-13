console.log("exo-7");

console.log(jsonDatas);

var currentArray = jsonDatas;
var cartContent=[];

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
	obj.id=generateUuid();
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
function generateUuid(){
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
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
					createLine(table, item, element.displayType, element.type, true);
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

function createLine(table, item, displayType, type, withCheckbox){

	var row = table.getElementsByTagName('tbody')[0].insertRow(-1);

	var selectCell = row.insertCell(0);
	var selection = document.createElement('input');
	selection.type = "checkbox";
	selection.name = "cart-content";
	selection.value = item.id;
	selection.className = "form-control";
	if(item.quantity<=0){
		selection.disabled="disabled";
	}
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
	
	if(!withCheckbox){
		row.removeChild(row.firstChild);
	}
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
	//then dynamically create options
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

function addToCart(){
	var checkBoxes=document.getElementsByName('cart-content');
	var showEmpty=document.getElementById('show-empty').checked;
	var inputType= document.getElementById('type').value;
	cartContent=[];
	checkBoxes.forEach(function(element) {
		if(element.checked){
			cartContent.push(element.value);
			element.checked=false;
		}
	});
	var table = document.getElementById('cart-table');
	cleanTable(table);
	var totalPrice=0;
	var itemCount=0;
	currentArray.forEach(function(category) {
		if((inputType=="" ||inputType==category.type) ){
			category.items.forEach(function(item) {
				if((showEmpty || item.quantity>0) && cartContent.includes(item.id)){
					createLine(table, item, category.displayType, category.type, false);
					totalPrice+=item.price;
					itemCount++;
				}
			});
		}
	});
	
	document.getElementById("cart-total-price").innerHTML=totalPrice;
	document.getElementById("cart-total-quentity").innerHTML="nb items : "+itemCount;
}

function validateCart(){
	currentArray.forEach(function(category) {
		category.items.forEach(function(item) {
			if(cartContent.includes(item.id)){
				item.quantity--;
			}
		});
	});
	var table = document.getElementById('cart-table');
	cleanTable(table);
	displayItems();
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
