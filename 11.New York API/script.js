//Date Content
const Displaydate=document.querySelector("span");
const d = new Date();
const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const day = weekday[d.getDay()];
const MMYYDD=new Date().toLocaleString('en-us',{month:'long', year:'numeric', day:'numeric'});
const dateres=`${day} ,${MMYYDD}`;
Displaydate.innerText=dateres;


const body        =document.querySelector("body");
const sectiontag  =document.createElement("section");
const containerdiv=document.createElement("div");
containerdiv.className="container mt-5 common"
sectiontag.appendChild(containerdiv);
body.append(containerdiv);

// Click Changes
const navLinks=document.querySelectorAll(".nav-link");
navLinks.forEach(data=>{
data.addEventListener("click",function(){
    const Existdata=containerdiv.children;
    const arr = Array.from(Existdata);
    arr.forEach(function (e) {
      e.remove();
    });
    landingpage(data.textContent.toLowerCase());
})
}
)

//Default Home Page 
async function landingpage(url){
    try{
        const urlpage= await fetch(`https://api.nytimes.com/svc/topstories/v2/${url}.json?api-key=0xiCB7EaZRX4BK3o75UFSTVkRsddWLHc`);
        const urldata= await urlpage.json();
        const Result= urldata.results;
        Result.forEach(item =>{
            
            const sectiondata=item.section;
            const titledata  =item.title;
            const lastupadtedatedata=item.updated_date.split('T')[0]+' '+item.updated_date.split('T')[1];
            const abstractdata=item.abstract;
            const weburl      =item.url;
            
            const card=document.createElement("div");
            card.className="card";

            const rowdiv=document.createElement("div");
            rowdiv.className="row";

            const infodiv=document.createElement("div");
            infodiv.className="col-md-8";

            const headingsection=document.createElement("h2");
            headingsection.className="section-card";
            headingsection.innerText=sectiondata;

            const newstitle=document.createElement("h3");
            newstitle.className="title ";
            newstitle.innerText=titledata;

            const dateinfo=document.createElement("p");
            dateinfo.innerText=lastupadtedatedata;

            const abstratctdata=document.createElement("p");
            abstratctdata.innerText=abstractdata;

            const continuereading=document.createElement("a");
            continuereading.setAttribute("href",weburl);
            continuereading.innerText="Continue Reading";
           
            const imagediv=document.createElement("div");
            imagediv.className="col-md-4 inner"

            const image=document.createElement("img");
            if(item.multimedia)
            {
                image.setAttribute("src",item.multimedia[0].url)
                image.className="img-fluid imageitem "
                image.setAttribute("alt","")
            }
            else{
                console.log("No Image Present");
                const imagediv=document.createElement("img");
                image.setAttribute("src","")
                image.className="img-fluid imageitem"
                image.setAttribute("alt","")
            }
            imagediv.append(image);
           
            infodiv.append(headingsection);
            infodiv.append(newstitle);
            infodiv.append(dateinfo);
            infodiv.append(abstratctdata);
            infodiv.append(continuereading);
            
            rowdiv.append(infodiv);
            rowdiv.append(imagediv);
            card.append(rowdiv);

            containerdiv.appendChild(card);
        })
    }
    catch(err){
       console.log(`Error :${err}`);
    }
}

landingpage("home");

