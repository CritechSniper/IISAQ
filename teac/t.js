document.body.innerHTML=`Loading...`
const btnc=document.createElement("div");
btnc.id="dash-container";
const tdu=[{a:"v-asgn",b:"View Assignments"},{a:"c-asgn",b:"Create Assignment"}];
const ibtnc=document.createElement("div");
ibtnc.id="dash-container-btns"
tdu.forEach((t)=>{
  const btn=document.createElement("button");
  btn.id=t.a;
  btn.innerHTML=t.b
  ibtnc.appendChild(btn);
})
document.body.appendChild(btnc)
