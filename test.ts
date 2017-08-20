

declare var Promise;

var fetched = function () :Promise<any>{
  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      resolve('aaa');
    },1000)
  })
}


var a = async  function(){
  let data11 =  await fetched();
  let data22 =  await fetched();
  return "dsfdsafdsafdsafdsafsafdsafdsafdsafasfas";
}




console.log(a());
