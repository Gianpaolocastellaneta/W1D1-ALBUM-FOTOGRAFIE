function search() {
    let parolaCercata= document.getElementById("cerca").value
    let tipologia= document.getElementById("tipologia").value
   // console.log(tipologia)
   let url =""
   let urlFoto ="https://api.pexels.com/v1/search/?page=1&per_page=5&query=" // x vedere + img mettere al posto di 5 altro numero
   let urlVideo= "https://api.pexels.com/videos/search?per_page=5&query=" // x vedere + img mettere al posto di 5 altro numero
   if(tipologia === "foto"){
     url = urlFoto
   }else url =urlVideo
fetch(url + parolaCercata, {
 method: "GET",
 headers:{
     "authorization": "N8mUDMCFovqqZYOp4YpHpVRZ3HKfej6XsJDpR7MX6vY26ZUtjjg0CzLt",
     "content-type": "application/json"
 }
}).then((response) => {
 //console.log(response)
 response.json().then((data)=>{
     console.log(data)
 let container = document.querySelector("#contenitoreImg")
 container.innerHTML=""
 let contenuto=""
 if(tipologia==="foto"){
     data.photos.forEach(element => {
         // console.log(element)
          contenuto ="<img class='img-fluid' src=' "+ element.src.medium +" ' alt=' "+ element.alt +"'/>"
         // console.log(contenuto)
         container.innerHTML += "<div class='pictures'>"+ contenuto +" </div>" //tra i + mettiamo una stringa splittata. Ossia una stringa, una variabile tra i + e un'altra stringa - inoltre inner.HTML += serve perchè non vogliamo che ad ogni ciclo sostituisca la foto, ma che aggiunga una foto ad ogni ciclo.
      });
 }
 else{
     data.videos.forEach(item => {


     //console.log(data.videos[0].video_files)
    // item.video_files.forEach(element => {
         contenuto = '<video width="320" height="240" controls><source src="'+ item.video_files[0].link +'" type="video/mp4"></video>'
          //console.log(contenuto)
         container.innerHTML += "<div class='pictures'>"+ contenuto +" </div>" //tra i + mettiamo una stringa splittata. Ossia una stringa, una variabile tra i + e un'altra stringa - inoltre inner.HTML += serve perchè non vogliamo che ad ogni ciclo sostituisca la foto, ma che aggiunga una foto ad ogni ciclo.
     //})
 })
     
 }

 })
 
})
}