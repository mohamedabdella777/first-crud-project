//get inputs
let title =document.getElementById('title');
let price =document.getElementById('price');
let taxes =document.getElementById('taxes');
let ads =document.getElementById('ads');
let discount=document.getElementById('discount');
let total =document.getElementById('total');
let count =document.getElementById('count');
let category=document.getElementById('category');
let create =document.getElementById('submit');
let tbody=document.getElementById('tbody');
let search =document.getElementById('search');
let searchTitle =document.getElementById('searchTitle');
let searchCategory =document.getElementById('searchCategory');
let cleandata=document.getElementById('clean');
let showdata=document.getElementById('show');
let productsarry=JSON.parse(localStorage.getItem("products")) || [];


 
//getTotal()
 function getTotal() {
  if (price.value !== '') {
    let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
    total.innerHTML = result;
    total.style.background = "#040"; // أخضر
  } else {
    total.innerHTML = '';
    total.style.background = "#a00d02"; // الأحمر الافتراضي
  }

}
 
create.addEventListener('click', () => {
 tbody.innerHTML = '';
 let userinputs={
    title:title.value,
    price:+price.value,
    taxes:+taxes.value,
    ads:+ads.value,
    discount:+discount.value,
    total:+total.innerHTML,
    count:+count.value,
    category:category.value
 };

   function make(){
    if(title.value !== '' && price.value !== '' && count.value !== '' && category.value !== ''){
      for (let i = 0; i < count.value; i++) {
     
    let tr=document.createElement('tr');
    let td1=document.createElement('td');
    let td2=document.createElement('td');
    let td3=document.createElement('td');
    let td4=document.createElement('td');
    let td5=document.createElement('td');
    let td6=document.createElement('td');
    let td7=document.createElement('td');
    let td8=document.createElement('td');
    let td9=document.createElement('td');
    let td10=document.createElement('td');
    
    
    td1.innerHTML=i+1;
    td2.innerHTML=title.value;
    td3.innerHTML=price.value;
    td4.innerHTML=taxes.value;
    td5.innerHTML=ads.value;
    td6.innerHTML=discount.value;
    td7.innerHTML=total.innerHTML;
    td8.innerHTML=category.value;
    td9.innerHTML= `<button type="button"class="update" data-index="${i}">update</button>`;
    td10.innerHTML=`<button type="button"class="delete" data-index="${i}">delete</button>`;
  

    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);
    tr.appendChild(td6);
    tr.appendChild(td7);
    tr.appendChild(td8);
    tr.appendChild(td9);
    tr.appendChild(td10);
    tbody.appendChild(tr);  
      }
  }

for(let i = 0; i < count.value; i++) {
    productsarry.push(userinputs);
   }
  
 
  
  localStorage.setItem("products", JSON.stringify(productsarry));

    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
    total.style.background='#a00d02'; 

    
    
  }
  
  
   make();
});


  let searchMode;
searchTitle.onclick= () =>{
  if( search!==''){
    search.value='';
  }
    searchMode='title';
    search.placeholder="search by title";
}
searchCategory.onclick= () => {
    if( search!==''){
    search.value='';
  }
    searchMode='category';
    search.placeholder="search by category";
}

 search.onkeyup= () => {
    //let searchvalue = search.value.toLowerCase();
    tbody.innerHTML = '';
    function makesearch(){
        
  
  for(let i=0;i<productsarry.length;i++){
    if( productsarry[i].title === search.value.toLowerCase() && searchMode==='title'|| productsarry[i].category === search.value.toLowerCase() && searchMode==='category'){
        
       let tr =document.createElement('tr');
       tr.innerHTML=
       `<td>${i+1}</td>
       <td>${productsarry[i].title}</td>
       <td>${productsarry[i].price}</td>
       <td>${productsarry[i].taxes}</td>
       <td>${productsarry[i].ads}</td>
       <td>${productsarry[i].discount}</td>
       <td>${productsarry[i].total}</td>
       <td>${productsarry[i].category}</td>
       <td><button type="button"class="update" data-index="${i}">update</button></td>
       <td><button type="button"class="delete" data-index="${i}">delete</button></td>`;
       tbody.appendChild(tr);
        
    }
      
  }
   
 }
    makesearch();
   }


    window.onload= () =>{
   
    tbody.innerHTML = '';
  
    productsarry.forEach((userinputs,i)  => {
  
    let tr=document.createElement('tr');
    let td1=document.createElement('td');
    let td2=document.createElement('td');
    let td3=document.createElement('td');
    let td4=document.createElement('td');
    let td5=document.createElement('td');
    let td6=document.createElement('td');
    let td7=document.createElement('td');
    let td8=document.createElement('td');
    let td9=document.createElement('td');
    let td10=document.createElement('td');
    
    
    td1.innerHTML=i+1;
    td2.innerHTML=userinputs.title;
    td3.innerHTML=userinputs.price;
    td4.innerHTML=userinputs.taxes;
    td5.innerHTML=userinputs.ads;
    td6.innerHTML=userinputs.discount;
    td7.innerHTML=userinputs.total;
    td8.innerHTML=userinputs.category;
    td9.innerHTML= `<button type="button"class="update" data-index="${i}">update</button>`;
    td10.innerHTML=`<button type="button"class="delete" data-index="${i}">delete</button>`;
  

    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);
    tr.appendChild(td6);
    tr.appendChild(td7);
    tr.appendChild(td8);
    tr.appendChild(td9);
    tr.appendChild(td10);
    tbody.appendChild(tr);  

 
});
   cleandata.style.display='block';
   cleandata.onclick= () => {
    localStorage.clear();
    tbody.innerHTML = '';
    cleandata.style.display='none';
   
   }

  }
  
  

  tbody.onclick= (e) => {
    if(e.target.classList.contains('delete')){
        let index=e.target.dataset.index;//امسك ال الرقم بتاع العنصر اللي بيساوي نفس رقم زر الحذف وادخل علي المصفوفه واحذف منها عنصر واحد عند نفس الindex
        productsarry.splice(index,1);
        localStorage.setItem("products", JSON.stringify(productsarry));
        
    }
     if(e.target.classList.contains('update')){
          let index=e.target.dataset.index;

          title.value=productsarry[index].title;
          price.value=productsarry[index].price;
          taxes.value=productsarry[index].taxes;
          ads.value=productsarry[index].ads;
          discount.value=productsarry[index].discount;
          total.innerHTML=productsarry[index].total;
          count.style.display = 'none';
          category.value=productsarry[index].category;
          getTotal();
          create.innerHTML='update';
           

          
          create.onclick= () => {
            productsarry[index]={
                title:title.value,
                price:+price.value,
                taxes:+taxes.value,
                ads:+ads.value,
                discount:+discount.value,
                total:+total.innerHTML,
                count:+count.value,
                category:category.value
            };
        
            localStorage.setItem("products", JSON.stringify(productsarry));
      
            create.innerHTML='create';
            count.style.display = 'block';
           

        
    
            }
          }
 
  
  }





















































































































































































































































































































































































































































































































































































































































































































































































































/*//first step get all inputs
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

*/


  
