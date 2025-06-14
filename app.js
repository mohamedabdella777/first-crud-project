//call 
let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let removeAll = document.getElementById("removeAll");
let mood='creat';
let tmp;//متغير مساعد (متغير global)
let search=document.getElementById('search');
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
    if(title.avlue !='' && price.value !='' && category.value !='' && count.value <= 100){
      if(mood==='creat'){
    if(count.value>1){  //count
      for(i=0;i<count.value;i++){
        datapro.push(newPro);
      }
    }else{
       datapro.push(newPro);
    }
  }else{
    datapro[tmp]= newPro;
    mood='creat';
    submit.innerHTML='create';
    count.style.display='block';
  }
     cleardata();//متمسحش ال بيانات الا لو الشرط تحقق
    }
      
    

    localStorage.setItem('pro',JSON.stringify(datapro))
    
    datashow();
  }
  //clear input
   function cleardata(){
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
   }
  //read=show data
  function datashow(){
    let table='';
    for(i=0;i<datapro.length;i++){
        table +=`
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
    if(datapro.length > 0){
        removeAll.innerHTML=`<button>remove all (${datapro.length})</button>`
    }else{
        removeAll.innerHTML='';
    }
     total.style.background='#a00d02';
  }

datashow();


//delete on product form local storage
function deleteData(i){
    datapro.splice(i,1);
    localStorage.pro = JSON.stringify(datapro);
    datashow();//حدث البيانات
}

//remove all data

removeAll.onclick = function(){
    localStorage.clear();
    datapro.splice(0);
    datashow();
  }




//count




//update
function updateData(i){
  //first step
  //نقل البيانات من arry الي inputs
  
  title.value = datapro[i].title;
  price.value = datapro[i].price;
  taxes.value = datapro[i].taxes;
  ads.value = datapro[i].ads;
  discount.value = datapro[i].discount;
  getTotal();
  count.style.display='none';
  submit.innerHTML='update';

  //second step
  mood='update';
   tmp=i;

 scroll({
  top:0,
  behavior:'smooth'
 })



}


//search

let searchMood;
//first step
function getsearchMood(id){
    if(id==='searchTitle'){//id=searchTitle searchTitle الاول مضغط علي زر 
        searchMood='title';
        search.placeholder='search by title';
        
    }else{// id=searchCategory لما اضغط علي زر searchCategory
        searchMood='category';
        search.placeholder='search by category';
          

    }

    search.focus();
}
 //secondstep
 let table='';
 function searchData(value){
  if(searchMood==='title'){
    for(i=0;i<datapro.length;i++){
      if(datapro[i].title.toLowerCase().includes(value.toLowerCase())){
       
      table +=`
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
  
   document.getElementById('tbody').innerHTML = table;
  }
   if(searchMood==='category'){
    for(i=0;i<datapro.length;i++){
      if(datapro[i].category.toLowerCase().includes(value.toLowerCase())){
       
      table +=`
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
  
   document.getElementById('tbody').innerHTML = table;
  }

}


//clean data




