//first step get all inputs
let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let mood = 'create';
let tmp;
//check if inputs not empty
// console.log(title,price,taxes,ads,discount,total,count,category,submit);

//get total
function getTotal(){
if(price.value !=''){
    let result = (+price.value + +taxes.value + +ads.value)- +discount.value ;
    total.innerHTML = result ;
    total.style.background = '#040'
}
    else{
        total.innerHTML = '';
        total.style.background = '#a00d02'
    }

}

//create && save data in localstorage
let datapro;
if(localStorage.getItem('pro') != null){
    datapro = JSON.parse(localStorage.getItem('pro'))
}else{
    datapro = [];
}

 submit.onclick = function createPro(){
    let newPro = {
        title:title.value,
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value,
    }
//cleean data
if(title.value != '' && price.value != '' && category.value != '' && newPro.count < 100){
 //search
if(mood === 'create'){
    
    //count 
if(newPro.count > 1){
    for(let i = 0 ; i < newPro.count ; i++){
        datapro.push(newPro)
    }
   
}else{
    datapro.push(newPro)
}

}else{
    datapro[tmp] = newPro;
    mood = 'create';
    submit.innerHTML = 'create';
    count.style.display = 'block';
    
}
clearData()
}
    localStorage.setItem('pro',JSON.stringify(datapro))
    console.log(datapro);
    datashow()
 }


 
//clear inputs

function clearData(){
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}

//read

function datashow(){
    let table = '';
    for(let i = 0 ; i < datapro.length ; i++){
      table += `
        <tr>
            <td>${i+1}</td>
            <td>${datapro[i].title}</td>
            <td>${datapro[i].price}</td>
            <td>${datapro[i].taxes}</td>
            <td>${datapro[i].ads}</td>
            <td>${datapro[i].discount}</td>
            <td>${datapro[i].total}</td>
            <td>${datapro[i].category}</td>
          <td><button onclick="updateData(${i})">update</button></td>
          <td><button onclick="deleteData(${i})">delete</button></td>
        </tr>
        `
    }
    document.getElementById('tbody').innerHTML = table;


    let btndelete = document.getElementById('deleteAll');
    if(datapro.length > 0){
       btndelete.innerHTML = `<button onclick="deleteAll()"> delete all(${datapro.length}) </button>`
    }else{
        btndelete.innerHTML = '';
       
    }
    getTotal()
}
datashow()
//delete
 function deleteData(i){
   // console.log(i);
    datapro.splice(i,1);
    localStorage.pro = JSON.stringify(datapro);
    datashow()
 }
 //delete all
function deleteAll(){
    localStorage.clear();
    datapro.splice(0);
    datashow();

}
//update
function updateData(i){
    //console.log(i);
    title.value = datapro[i].title;
    price.value = datapro[i].price;
    taxes.value = datapro[i].taxes;
    ads.value = datapro[i].ads;
    discount.value = datapro[i].discount;
    getTotal()
    count.style.display = 'none';
    category.value = datapro[i].category;
    submit.innerHTML = 'update';
    mood = 'update';
    tmp = i;
    scroll({
        top:0,
        behavior:'smooth',
    });

}

//search
let searchMood ;
function getSearchMood(id){
    let search = document.getElementById('search');
if( id=='searchTitle'){
    searchMood = 'title';
    search.placeholder = 'search by title';
}else{
    searchMood = 'category';
    search.placeholder = 'search by category';
}
search.focus();

}

//search data
function searchData(value){
    let table = '';
    for(let i = 0 ; i < datapro.length ; i++){
        if(searchMood == 'title'){
            if(datapro[i].title.includes(value.toLowerCase())){
                table += `
                <tr>
                    <td>${i}</td>
                    <td>${datapro[i].title}</td>
                    <td>${datapro[i].price}</td>
                    <td>${datapro[i].taxes}</td>
                    <td>${datapro[i].ads}</td>
                    <td>${datapro[i].discount}</td>
                    <td>${datapro[i].total}</td>
                    <td>${datapro[i].category}</td>
                  <td><button onclick="updateData(${i})">update</button></td>
                  <td><button onclick="deleteData(${i})">delete</button></td>
                </tr>
                `
            }
        }else{
            if(datapro[i].category.includes(value.toLowerCase())){
                table += `
                <tr>
                    <td>${i}</td>
                    <td>${datapro[i].title}</td>
                    <td>${datapro[i].price}</td>
                    <td>${datapro[i].taxes}</td>
                    <td>${datapro[i].ads}</td>
                    <td>${datapro[i].discount}</td>
                    <td>${datapro[i].total}</td>
                    <td>${datapro[i].category}</td>
                  <td><button onclick="updateData(${i})">update</button></td>
                  <td><button onclick="deleteData(${i})">delete</button></td>
                </tr>
                `
            }
        }
    }
    document.getElementById('tbody').innerHTML = table;
        }





  
