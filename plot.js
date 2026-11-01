(() => {
  // every project is a rare point; the featured ones carry a label and live on the home page
  const RARE = [
    {id:"trust", label:"Model trust", ctx:"At work · Federal public service", title:"Deciding which AI models a public institution can build on", line:"One repeatable assessment before any team builds on a model.", x:.70, y:.20},
    {id:"subtitles", label:"Live subtitles", ctx:"At work · Federal public service", title:"Live subtitles in six languages", line:"A terminology layer fixed what a bigger model couldn't.", x:.95, y:.40, left:true},
    {id:"homeroom", label:"Homeroom", ctx:"Research in progress", title:"Homeroom, teaching small models on a fixed budget", line:"An honest negative result so far, published with the code.", x:.93, y:.80, left:true},
    {id:"rare", label:"Rare attacks", ctx:"Research · 2021", title:"Finding rare attacks in network traffic", line:"52 training records out of almost 126,000.", x:.52, y:.54},
    {id:"rally", label:"Rally squash", ctx:"Open source · 2026", title:"Rally, a squash game in the browser", line:"A 3D glass court and an AI opponent that reads your shots.", x:.71, y:.90},
    {id:"forkcast", label:"Forkcast", ctx:"Open source · 2026", title:"Forkcast, meal planning from what's in the pantry", line:"AI drafts the plan. Nothing changes until you press Apply.", x:.49, y:.88},
    {id:"rag", ctx:"At work · Federal public service", title:"Answers from internal documents", line:"Re-ranking made the answers repeatable from run to run.", x:.79, y:.31, page:"work"},
    {id:"osint", ctx:"At work · Federal public service", title:"Structure in a thousand unlabelled articles", line:"Nobody had labelled anything, so the data showed its own groups.", x:.53, y:.19, page:"work"},
    {id:"tests", ctx:"At work · A Canadian bank", title:"Test cases that learn from the engineers who keep them", line:"Became the standard across the organisation.", x:.97, y:.60, page:"work"},
    {id:"validation", ctx:"At work · A Canadian bank", title:"Validating large financial datasets, faster", line:"Spark pipelines and a comparison tool two teams adopted.", x:.71, y:.62, page:"work"},
    {id:"cgan", ctx:"Research · 2021", title:"Teaching a GAN to make more of the rare class", line:"Impersonation labelled correctly 72% of the time, up from 36%.", x:.63, y:.55, page:"work"},
    {id:"ocean", ctx:"Research assistant", title:"Replacing hand labelling of ocean sensor data", line:"Matched the experts and cut manual labelling by 90%.", x:.97, y:.08, page:"work"},
    {id:"scout", ctx:"Side project · 2026", title:"A fantasy football scout with a second opinion", line:"Two AI models, one lineup, both verdicts shown.", x:.84, y:.90, page:"work"},
    {id:"unsung", ctx:"Building now", title:"Unsung", line:"A career assistant for people, and a hiring side for teams.", x:.76, y:.07}
  ];
  const CLUSTERS = [[.62,.34,.045,.07],[.86,.62,.04,.07],[.60,.72,.06,.045],[.87,.17,.045,.045],[.735,.47,.03,.05]];
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const field = document.getElementById("field"), cv = document.getElementById("cv"), ctx = cv.getContext("2d");
  const peek = document.getElementById("peek");
  let W=0,H=0,dpr=1,pts=[],btns=[],dim=0,dimTarget=0,t0=0,narrow=false;

  function rng(a){return()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
  function gauss(r){let u=0,v=0;while(!u)u=r();while(!v)v=r();return Math.sqrt(-2*Math.log(u))*Math.cos(2*Math.PI*v)}
  // narrow screens spread the plot across the full width; wide screens keep the left side for the introduction
  const X = u => narrow ? (.06 + (u-.42)/.58*.88)*W : u*W;
  const Y = v => narrow ? (.06 + v*.88)*H : (.08 + v*.86)*H;
  const href = p => (p.page ? p.page+".html" : "") + "#" + p.id;

  function build(){
    narrow = innerWidth <= 820;
    const r = field.getBoundingClientRect(); W=r.width; H=r.height; dpr=Math.min(devicePixelRatio||1,2);
    cv.width=W*dpr; cv.height=H*dpr; ctx.setTransform(dpr,0,0,dpr,0,0);
    const rnd=rng(7), n=Math.round(Math.min(2400, W*H/300));
    const wts=[.30,.22,.20,.12,.16];
    pts=[];
    for(let i=0;i<n;i++){
      let k=0,q=rnd(),acc=0; for(;k<wts.length-1;k++){acc+=wts[k]; if(q<acc)break}
      const c=CLUSTERS[k]; let u=c[0]+gauss(rnd)*c[2], v=c[1]+gauss(rnd)*c[3];
      if(rnd()<.05){u=.44+rnd()*.56; v=rnd()}
      u=Math.max(.43,Math.min(.995,u)); v=Math.max(.01,Math.min(.99,v));
      pts.push({tx:X(u),ty:Y(v),sx:X(.43+rnd()*.57),sy:Y(rnd()),d:rnd()*.35,s:1.2+rnd()*1.3});
    }
    placeButtons();
  }

  function placeButtons(){
    if(!btns.length){
      RARE.forEach((p,i)=>{
        const b=document.createElement("button");
        b.className="rp"+(p.left?" left":"")+(p.label?"":" quiet"); b.type="button";
        b.setAttribute("aria-label", p.title+". "+p.line);
        b.innerHTML='<span class="pt"></span>'+(p.label?'<span class="lb">'+p.label+'</span>':'');
        b.addEventListener("mouseenter",()=>{if(!narrow)show(i)}); b.addEventListener("focus",()=>{if(!narrow)show(i)});
        b.addEventListener("mouseleave",hide); b.addEventListener("blur",hide);
        b.addEventListener("click",()=>{ if(narrow && !b.classList.contains("on")){show(i);return} go(p) });
        field.appendChild(b); btns.push(b);
      });
    }
    RARE.forEach((p,i)=>{btns[i].style.left=X(p.x)+"px"; btns[i].style.top=Y(p.y)+"px"});
  }

  function show(i){
    const p=RARE[i], b=btns[i];
    btns.forEach(x=>x.classList.toggle("on",x===b));
    peek.innerHTML='<p class="k">'+p.ctx+'</p><h3>'+p.title+'</h3><p>'+p.line+(narrow?' <a href="'+href(p)+'">Read more</a>':'')+'</p>';
    if(!narrow){
      const px=X(p.x), py=Y(p.y), w=300;
      let lx = px - w - 30; if(lx < 16) lx = px + 30;
      let ly = Math.max(16, Math.min(H-180, py-60));
      peek.style.left=lx+"px"; peek.style.top=ly+"px";
    } else {
      // keep the card clear of the point that was tapped
      const py=Y(p.y); peek.style.top = (py > H/2 ? 12 : H-12-150)+"px"; peek.style.pointerEvents="auto";
    }
    peek.classList.add("show"); dimTarget=1; kick();
  }
  function hide(){ if(narrow) return; peek.classList.remove("show"); btns.forEach(x=>x.classList.remove("on")); dimTarget=0; kick(); }
  function go(p){
    const el = !p.page && document.getElementById(p.id);
    if(!el){ location.href = href(p); return; }
    el.classList.add("flash"); setTimeout(()=>el.classList.remove("flash"),1600);
    el.scrollIntoView({behavior:reduce?"auto":"smooth"});
  }

  const ease = t => t>=1?1:1-Math.pow(2,-10*t);
  let raf=0;
  function kick(){ if(!raf) raf=requestAnimationFrame(draw) }
  function draw(now){
    raf=0;
    const T = reduce ? 1 : Math.min(1,(now-t0)/1600);
    dim += (dimTarget-dim)*.18; if(Math.abs(dimTarget-dim)<.01) dim=dimTarget;
    ctx.clearRect(0,0,W,H);
    ctx.fillStyle = "rgba(108,116,112,"+(0.42-0.26*dim)+")";
    for(const p of pts){
      const k = ease(Math.max(0,Math.min(1,(T-p.d)/(1-p.d))));
      const x = p.sx+(p.tx-p.sx)*k, y = p.sy+(p.ty-p.sy)*k;
      ctx.beginPath(); ctx.arc(x,y,p.s,0,6.283); ctx.fill();
    }
    if(T>=.72) btns.forEach((b,i)=>setTimeout(()=>b.classList.add("in"), reduce?0:i*55));
    if(T<1 || dim!==dimTarget) kick();
  }

  document.addEventListener("click",e=>{ if(narrow && !e.target.closest(".rp") && !e.target.closest(".peek")){ peek.classList.remove("show"); btns.forEach(x=>x.classList.remove("on")); peek.style.pointerEvents="none"; dimTarget=0; kick(); }});
  addEventListener("resize",()=>{ build(); draw(performance.now()+1e5); });
  build(); t0=performance.now(); kick();
})();
