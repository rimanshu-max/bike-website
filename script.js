const BIKES=[
 {n:"Zephyr 125",c:"Commuter",cc:125,k:"65 kmpl",p:89000,col:"#4aa3ff"},
 {n:"Strider 160",c:"Commuter",cc:160,k:"55 kmpl",p:124000,col:"#7fd99a"},
 {n:"Vortex 200",c:"Sports",cc:200,k:"38 kmpl",p:159000,col:"#ffb454"},
 {n:"Apex R 300",c:"Sports",cc:300,k:"30 kmpl",p:215000,col:"#e63946"},
 {n:"Outlaw 350",c:"Cruiser",cc:350,k:"35 kmpl",p:198000,col:"#c9a15b"},
 {n:"Volt E1",c:"Electric",cc:0,k:"120 km range",p:135000,col:"#5eead4"}
];
const $=id=>document.getElementById(id);
const inr=n=>"\u20B9"+Math.round(n).toLocaleString("en-IN");
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
    const btn=document.createElement("button");btn.className="btn";btn.textContent="Details & EMI";
    btn.onclick=()=>openD(b);c.querySelector(".row").append(btn);
    g.append(c);
  });
}
function emi(){
  const d=+$("down").value,n=+$("ten").value,P=cur.p*(1-d/100),r=0.095/12;
  $("down-v").textContent=d+"% ("+inr(cur.p*d/100)+")";
  const e=d===100?0:P*r*Math.pow(1+r,n)/(Math.pow(1+r,n)-1);
  $("emi").textContent=inr(e)+" / month";
  $("emi-note").textContent="Loan "+inr(P)+" at 9.5% for "+n+" months (approx.)";
}
function openD(b){
  cur=b;$("d-name").textContent=b.n;
  $("d-sub").textContent=b.c+" \u00B7 "+(b.cc?b.cc+" cc":"Electric")+" \u00B7 "+b.k+" \u00B7 "+inr(b.p);
  $("ok").textContent="";$("nm").value="";$("ph").value="";
  emi();$("dlg").showModal();
}
$("down").oninput=emi;$("ten").onchange=emi;
$("close").onclick=()=>$("dlg").close();
$("book").onclick=()=>{
  const n=$("nm").value.trim(),p=$("ph").value.trim();
  $("ok").style.color=(n&&/^[0-9+\s-]{8,15}$/.test(p))?"#7fd99a":"#ff9a9a";
  $("ok").textContent=(n&&/^[0-9+\s-]{8,15}$/.test(p))
    ?"Thanks "+n+"! We'll call you to confirm your "+cur.n+" test ride."
    :"Enter your name and a valid phone number.";
};
$("navride").onclick=e=>{e.preventDefault();openD(BIKES[0])};
$("sort").onchange=grid;
chips();grid();