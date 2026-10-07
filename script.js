const BIKES=[
 {n:"Zephyr 125",c:"Commuter",cc:125,k:"65 kmpl",p:89000,col:"#4aa3ff"},
 {n:"Strider 160",c:"Commuter",cc:160,k:"55 kmpl",p:124000,col:"#7fd99a"},
 {n:"Vortex 200",c:"Sports",cc:200,k:"38 kmpl",p:159000,col:"#ffb454"},
 {n:"Apex R 300",c:"Sports",cc:300,k:"30 kmpl",p:215000,col:"#e63946"},
 {n:"Outlaw 350",c:"Cruiser",cc:350,k:"35 kmpl",p:198000,col:"#c9a15b"},
 {n:"Volt E1",c:"Electric",cc:0,k:"120 km range",p:135000,col:"#5eead4"}
];
const $=id=>document.getElementById(id);
const inr=n=>"₹"+Math.round(n).toLocaleString("en-IN");
let cat="All",cur=null;

function chips(){
  const b=$("chips");b.textContent="";
  ["All","Commuter","Sports","Cruiser","Electric"].forEach(n=>{
    const x=document.createElement("button");x.className="chip";x.textContent=n;
    x.setAttribute("aria-pressed",String(n===cat));x.onclick=()=>{cat=n;chips();grid()};b.append(x)});
}
function grid(){
  let r=BIKES.filter(b=>cat==="All"||b.c===cat);
  const s=$("sort").value;
  r.sort((a,b)=>s==="low"?a.p-b.p:s==="high"?b.p-a.p:b.cc-a.cc);
  const g=$("grid");g.textContent="";
  r.forEach(b=>{
    const c=document.createElement("article");c.className="card";
    c.innerHTML='<svg style="color:'+b.col+'" viewBox="0 0 200 110" aria-hidden="true"><use href="#bike"/></svg><h3></h3><div class="sub"></div><div class="specs"><span><b></b> engine</span><span><b></b></span></div><div class="row"><span class="price"></span></div>';
    c.querySelector("h3").textContent=b.n;
    c.querySelector(".sub").textContent=b.c;
    const sp=c.querySelectorAll(".specs b");
    sp[0].textContent=b.cc?b.cc+" cc":"Electric";sp[1].textContent=b.k;
    c.querySelector(".price").textContent=inr(b.p);