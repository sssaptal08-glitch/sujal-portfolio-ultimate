import { useState, useEffect, useRef, useCallback } from "react";
// Styles in index.css — fonts loaded via index.html

// ── Data ──────────────────────────────────────────────────────────────────────
const NAV = ["About","Skills","Projects","Certifications","Experience","Contact"];
const SKILLS = [
  {cat:"Programming",  grad:"linear-gradient(135deg,#7c3aed,#4f46e5)",color:"#7c3aed",items:[{n:"Python",p:88},{n:"JavaScript",p:80},{n:"Java",p:72},{n:"C++",p:68}]},
  {cat:"AI / ML",      grad:"linear-gradient(135deg,#4f46e5,#0d9488)",color:"#4f46e5",items:[{n:"Machine Learning",p:82},{n:"Deep Learning",p:74},{n:"NLP",p:70},{n:"GANs",p:60}]},
  {cat:"Cybersecurity",grad:"linear-gradient(135deg,#0d9488,#0891b2)",color:"#0d9488",items:[{n:"Network Security",p:65},{n:"Threat Detection",p:70},{n:"Pen Testing",p:55},{n:"OSINT",p:60}]},
  {cat:"Web Dev",      grad:"linear-gradient(135deg,#f43f5e,#f59e0b)",color:"#f43f5e",items:[{n:"HTML / CSS",p:90},{n:"React",p:75},{n:"Tailwind CSS",p:78},{n:"Node.js",p:60}]},
];
const PROJECTS = [
  {title:"Smart WebGuard(CYBERPHOENIX) Malicious Threat Detection",cat:"AIML / Cyber-Security",grad:"linear-gradient(135deg,#7c3aed,#4f46e5)",color:"#7c3aed",desc:"Advanced AI-powered threat detection system by Team Wise Coders. Real-time malware, phishing, spam, and misinformation-signal detection using machine learning + pattern analysis.",stack:["Python", "Typescript (TSX)", "Javascript", "HTML", "CSS", "Flask/Node.js", "Scikit-learn/TensorFlow", "Phishing URL Dataset/Web Security Dataset", "VS Code", "Git", "Browsers APIs"],github:"https://github.com/sssaptal08-glitch/Smart-WebGuard-CYBERPHOENIX-",demo:"https://github.com/sssaptal08-glitch/Smart-WebGuard-CYBERPHOENIX-",icon:"🛡"},
  {title:"Bookswaphub (Book Exchange Store)",cat:"PHP (ecommerce)",grad:"linear-gradient(135deg,#4f46e5,#0891b2)",color:"#4f46e5",desc:"BookSwapHub is a web-based application developed as a college project to promote book sharing and sustainable reading practices. The platform allows users to list books they own, request exchanges, and connect with other readers in their community.",stack:["PHP","HTML/CSS","JavaScript (Node.js,Express.js)","MONGODB","BootStrap"],github:"https://github.com/sssaptal08-glitch/Book-Exchange-Store",demo:"https://github.com/sssaptal08-glitch/Book-Exchange-Store",icon:"📰"},
  {title:"Credit-Card-Default-Prediction",cat:"Artificial Intelligence & Machine Learning",grad:"linear-gradient(135deg,#0d9488,#10b981)",color:"#0d9488",desc:"A Machine Learning web application that predicts whether a customer is likely to default on their credit card payment based on financial and demographic details.",stack:["Python","Pandas & Numpy","Scikit-learn","Flask","pickle","HTML"],github:"https://github.com/sssaptal08-glitch/Credit-Card-Default-Prediction",demo:"https://github.com/sssaptal08-glitch/Credit-Card-Default-Prediction",icon:"🤖"},
  {title:"EV Battery Prediction",cat:"Machine Learning",grad:"linear-gradient(135deg,#f43f5e,#f59e0b)",color:"#f43f5e",desc:"A comprehensive machine learning application that predicts Electric Vehicle (EV) battery health metrics including State of Health (SOH) and Remaining Useful Life (RUL) using advanced ML models and an interactive web interface.",stack:["Python","Scikit-learn","TensorFlow/Keras","Streamlit","Pandas & NumPy","Ploty,Matplotlib,Seaborn"],github:"https://github.com/sssaptal08-glitch/ev_battery_prediction",demo:"https://github.com/sssaptal08-glitch/ev_battery_prediction",icon:"🔋"},
  {title:"QUIZAPP",cat:"WEB Application",grad:"linear-gradient(135deg,#7c3aed,#f43f5e)",color:"#7c3aed",desc:"QuizApp is a Java-based application designed to conduct multiple-choice quizzes in an interactive and user-friendly manner. The application evaluates user responses, calculates scores, and displays results instantly.",stack:["JAVA","Swing","AWT","JDK(Java Development Kit)"],github:"https://github.com/sssaptal08-glitch/QUIZAPP",demo:"https://github.com/sssaptal08-glitch/QUIZAPP",icon:"🎯"},
  {title:"Pulse Task Manager",cat:"Web Development",grad:"linear-gradient(135deg,#0891b2,#4f46e5)",color:"#0891b2",desc:"Dashboard with live stats, recent activity, upcoming deadlines, team workload.Projects with members, color-coded cards, progress bars.Role-based UI: first user becomes admin, everyone else is a member",stack:["TypeScript","React","Vite","Node.js","PostgreSQL"],github:"https://github.com/sssaptal08-glitch/pulse-task-manager-website",demo:"https://github.com/sssaptal08-glitch/pulse-task-manager-website",icon:"✦"},
];
const CERTS = [
  {name:"AWS Academy Graduate – Data Engineering (AWS)",org:"AWS Platform",year:"2025",icon:"🤖",color:"#7c3aed",grad:"linear-gradient(135deg,#7c3aed,#4f46e5)"},
  {name:"Neural networks & Deep learning (Great learning)",org:"Google / Great Learning",year:"2024",icon:"🛡",color:"#0d9488",grad:"linear-gradient(135deg,#0d9488,#0891b2)"},
  {name:"Skills4Future Artificial Intelligence",org:"Edunet Foundation",year:"2023",icon:"🐍",color:"#4f46e5",grad:"linear-gradient(135deg,#4f46e5,#7c3aed)"},
  {name:"AWS Academy Cloud Web Application Builder (AWS)",org:"AWS",year:"2024",icon:"🧠",color:"#f43f5e",grad:"linear-gradient(135deg,#f43f5e,#f59e0b)"},
  {name:"AWS Academy Cloud Foundations (AWS)",org:"AWS",year:"2023",icon:"⚛",color:"#0891b2",grad:"linear-gradient(135deg,#0891b2,#4f46e5)"},
  {name:"Microsoft PowerBI",org:"GET Tutorials",year:"2024",icon:"🔒",color:"#10b981",grad:"linear-gradient(135deg,#10b981,#0d9488)"},
];
const TESTIMONIALS = [
  {name:"Prof. K.N. Attarde",role:"HOD, CSE(AIML) Department",text:"Sujal consistently demonstrates exceptional analytical thinking and a rare ability to bridge AI theory with practical implementation. One of our most promising students.",avatar:"👨‍🏫",color:"#7c3aed"},
  {name:"Prof. Nirajsingh Yeotikar",role:"Professor, CSE(AIML) Department",text:"Worked with Sujal on a freelance ML project. Delivered ahead of schedule with clean, well-documented code. Highly recommend for any AI/ML work.",avatar:"👩‍💻",color:"#0d9488"},
  {name:"Sandeep Sahani",role:"Classmate & Collaborator",text:"Sujal's ability to explain complex AI concepts simply is incredible. Our GAN project became a showcase piece for the entire department.",avatar:"👨‍💻",color:"#f43f5e"},
];
const CODING_PROFILES = [
  {name:"LeetCode",  icon:"💡",href:"https://leetcode.com/sujalsaptal",   stat:"150+ Problems",color:"#f59e0b"},
  {name:"HackerRank",icon:"⭐",href:"https://www.hackerrank.com/profile/sssaptal08", stat:"5★ Python",    color:"#10b981"},
  {name:"Kaggle",    icon:"📊",href:"https://kaggle.com/sujalsaptal",     stat:"Contributor",  color:"#4f46e5"},
  {name:"GitHub",    icon:"🐙",href:"https://github.com/sssaptal08-glitch",     stat:"50+ Commits",  color:"#7c3aed"},
];
const CONTACT_LINKS = [
  {icon:"✉", label:"Email",   val:"saptalsujal041@gmail.com",         href:"mailto:saptalsujal041@gmail.com",          grad:"linear-gradient(135deg,#7c3aed,#4f46e5)",color:"#7c3aed"},
  {icon:"📞",label:"Phone",   val:"+91 8010291863",                   href:"tel:+918010291863",                         grad:"linear-gradient(135deg,#0d9488,#10b981)",color:"#0d9488"},
  {icon:"💼",label:"LinkedIn",val:"linkedin.com/in/sujal-saptal-2b9363350",     href:"https://linkedin.com/in/sujal-saptal-2b9363350",  grad:"linear-gradient(135deg,#4f46e5,#0891b2)",color:"#4f46e5"},
  {icon:"🐙",label:"GitHub",  val:"github.com/sssaptal08-glitch",           href:"https://github.com/sssaptal08-glitch",            grad:"linear-gradient(135deg,#f43f5e,#f59e0b)",color:"#f43f5e"},
];
const BADGES=["Python","JavaScript","React","TensorFlow","PyTorch","Scikit-learn","Flask","FastAPI","Django","Node.js","HTML5","CSS3","Tailwind","Git","Linux","Docker","PostgreSQL"];

// ── Hooks ─────────────────────────────────────────────────────────────────────
function useInView(ref,thr=0.1){const[v,sv]=useState(false);useEffect(()=>{const o=new IntersectionObserver(([e])=>{if(e.isIntersecting)sv(true)},{threshold:thr});if(ref.current)o.observe(ref.current);return()=>o.disconnect()},[ref,thr]);return v}

// ── Custom Cursor ─────────────────────────────────────────────────────────────
function Cursor(){
  const cc=useRef(),cr=useRef();
  useEffect(()=>{
    const mv=e=>{if(cc.current){cc.current.style.left=e.clientX+"px";cc.current.style.top=e.clientY+"px"}if(cr.current){cr.current.style.left=e.clientX+"px";cr.current.style.top=e.clientY+"px"}};
    const on=()=>cr.current?.classList.add("h");const off=()=>cr.current?.classList.remove("h");
    window.addEventListener("mousemove",mv);
    document.addEventListener("mouseover",e=>{if(e.target.closest("a,button,.glass"))on();else off()});
    return()=>window.removeEventListener("mousemove",mv);
  },[]);
  return <><div id="cc" ref={cc}/><div id="cr" ref={cr}/></>;
}

// ── Scroll Progress ───────────────────────────────────────────────────────────
function ScrollBar(){
  const[p,sp]=useState(0);
  useEffect(()=>{const fn=()=>{const d=document.documentElement;sp(d.scrollTop/(d.scrollHeight-d.clientHeight)*100)};window.addEventListener("scroll",fn);return()=>window.removeEventListener("scroll",fn)},[]);
  return <div id="sp" style={{width:p+"%"}}/>;
}

// ── Loader ────────────────────────────────────────────────────────────────────
function Loader({onDone}){
  const[p,sp]=useState(0);
  useEffect(()=>{let n=0;const t=setInterval(()=>{n+=Math.random()*15+8;if(n>=100){n=100;clearInterval(t);setTimeout(onDone,350)}sp(Math.min(n,100))},[],80);return()=>clearInterval(t)},[onDone]);
  return(
    <div style={{position:"fixed",inset:0,zIndex:99999,background:"linear-gradient(135deg,#0f0e1a,#1a1040,#0a1a2e)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:28,animation:"fadeInScale .3s ease"}}>
      <div style={{fontFamily:"'Outfit',sans-serif",fontWeight:800,fontSize:"clamp(32px,8vw,68px)",letterSpacing:"-.04em",background:"linear-gradient(135deg,#7c3aed,#4f46e5,#0d9488)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundSize:"200% auto",animation:"shimmer 2s linear infinite"}}>
        Sujal<span style={{WebkitTextFillColor:"#7c3aed"}}>.</span>
      </div>
      <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:11,color:"#6b7280",letterSpacing:".2em"}}>LOADING PORTFOLIO...</div>
      <div style={{width:180,height:4,background:"rgba(124,58,237,.2)",borderRadius:99,overflow:"hidden"}}>
        <div style={{height:"100%",width:p+"%",background:"linear-gradient(135deg,#7c3aed,#4f46e5,#0d9488)",borderRadius:99,transition:"width .1s",boxShadow:"0 0 10px rgba(124,58,237,.6)"}}/>
      </div>
      <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:12,color:"#7c3aed"}}>{Math.round(p)}%</div>
    </div>
  );
}

// ── Dark Toggle ───────────────────────────────────────────────────────────────
function DarkToggle({dark,setDark}){
  return(
    <button onClick={()=>{setDark(d=>!d);document.body.classList.toggle("dark")}}
      style={{width:40,height:40,borderRadius:10,border:"1px solid rgba(124,58,237,.25)",background:"rgba(124,58,237,.08)",fontSize:17,display:"flex",alignItems:"center",justifyContent:"center",transition:"all .2s"}}
      onMouseEnter={e=>{e.currentTarget.style.background="rgba(124,58,237,.18)";e.currentTarget.style.transform="scale(1.1)"}}
      onMouseLeave={e=>{e.currentTarget.style.background="rgba(124,58,237,.08)";e.currentTarget.style.transform="none"}}>
      {dark?"☀️":"🌙"}
    </button>
  );
}

// ── Particles ─────────────────────────────────────────────────────────────────
function Particles(){
  const ps=Array.from({length:20},(_,i)=>({id:i,sz:Math.random()*5+2,l:Math.random()*100,t:Math.random()*100,dur:Math.random()*8+5,del:Math.random()*5,c:["#7c3aed","#4f46e5","#0d9488","#f43f5e","#f59e0b","#10b981"][i%6]}));
  return <div style={{position:"absolute",inset:0,overflow:"hidden",pointerEvents:"none",zIndex:0}}>{ps.map(p=><div key={p.id} className="part" style={{width:p.sz,height:p.sz,left:p.l+"%",top:p.t+"%",background:p.c,opacity:.4,animationDuration:p.dur+"s",animationDelay:p.del+"s"}}/>)}</div>;
}

// ── Typewriter ────────────────────────────────────────────────────────────────
function TW({words}){
  const[i,si]=useState(0);const[c,sc]=useState(0);const[d,sd]=useState(false);
  useEffect(()=>{const t=setTimeout(()=>{if(!d){if(c<words[i].length)sc(x=>x+1);else setTimeout(()=>sd(true),1500)}else{if(c>0)sc(x=>x-1);else{sd(false);si(x=>(x+1)%words.length)}}},d?32:72);return()=>clearTimeout(t)},[c,d,i,words]);
  return <span className="gt" style={{fontFamily:"'Outfit',sans-serif",fontStyle:"italic",fontWeight:700}}>{words[i].slice(0,c)}<span style={{animation:"blink 1s step-end infinite",WebkitTextFillColor:"#7c3aed"}}>|</span></span>;
}

// ── Counter ───────────────────────────────────────────────────────────────────
function Counter({target,suffix=""}){
  const[val,sv]=useState(0);const ref=useRef();const v=useInView(ref,.5);
  useEffect(()=>{if(!v)return;let s=0;const step=target/40;const t=setInterval(()=>{s+=step;if(s>=target){sv(target);clearInterval(t)}else sv(Math.floor(s))},40);return()=>clearInterval(t)},[v,target]);
  return <span ref={ref}>{val}{suffix}</span>;
}

// ── Navbar ────────────────────────────────────────────────────────────────────
function Navbar({dark,setDark}){
  const[sc,setSc]=useState(false);const[op,setOp]=useState(false);
  useEffect(()=>{const fn=()=>setSc(window.scrollY>50);window.addEventListener("scroll",fn);return()=>window.removeEventListener("scroll",fn)},[]);
  const go=id=>{setOp(false);document.getElementById(id.toLowerCase())?.scrollIntoView({behavior:"smooth"})};
  return(
    <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:1000,padding:"0 clamp(20px,5vw,80px)",height:68,display:"flex",alignItems:"center",justifyContent:"space-between",background:sc?"rgba(248,247,255,.9)":"transparent",backdropFilter:sc?"blur(20px)":"none",borderBottom:sc?"1px solid rgba(124,58,237,.1)":"none",transition:"all .3s"}}>
      <div style={{fontFamily:"'Outfit',sans-serif",fontWeight:800,fontSize:22,letterSpacing:"-.03em"}}><span className="gt">Sujal</span><span style={{color:"#7c3aed"}}>.</span></div>
      <div className="hm" style={{display:"flex",gap:24,alignItems:"center"}}>{NAV.map(n=><a key={n} className="nl" href={`#${n.toLowerCase()}`} onClick={e=>{e.preventDefault();go(n)}}>{n}</a>)}</div>
      <div style={{display:"flex",gap:8,alignItems:"center"}}>
        <DarkToggle dark={dark} setDark={setDark}/>
        <a className="bg hm" href="Resume_1.pdf" download style={{padding:"9px 18px",fontSize:12}}>📄 Resume</a>
        <a className="bg hm" href="#contact" onClick={e=>{e.preventDefault();go("Contact")}} style={{padding:"9px 18px",fontSize:12}}>Hire Me ↗</a>
      </div>
      <button className="sm" onClick={()=>setOp(o=>!o)} style={{background:"none",border:"none",fontSize:22,color:"#7c3aed",alignItems:"center"}}>{op?"✕":"☰"}</button>
      {op&&<div style={{position:"fixed",top:68,left:0,right:0,bottom:0,background:"rgba(248,247,255,.97)",zIndex:999,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:26}}>
        {NAV.map(n=><a key={n} className="nl" href="#" style={{fontSize:18}} onClick={e=>{e.preventDefault();go(n)}}>{n}</a>)}
        <a className="bg" href="Resume_1.pdf" download>📄 Download Resume</a>
        <a className="bg" href="#contact" onClick={e=>{e.preventDefault();go("Contact")}}>Hire Me ↗</a>
      </div>}
    </nav>
  );
}

// ── Hero ──────────────────────────────────────────────────────────────────────
function Hero(){
  const ql=[
    {label:"Email",href:"mailto:saptalsujal041@gmail.com",icon:"✉",c:"#7c3aed"},
    {label:"LinkedIn",href:"https://linkedin.com/in/sujal-saptal-2b9363350",icon:"💼",c:"#4f46e5",ext:true},
    {label:"GitHub",href:"https://github.com/sssaptal08-glitch",icon:"🐙",c:"#0d9488",ext:true},
    {label:"Phone",href:"tel:+918010291863",icon:"📞",c:"#f43f5e"},
  ];
  return(
    <section id="home" style={{minHeight:"100vh",display:"flex",alignItems:"center",padding:"110px clamp(20px,8vw,120px) 60px",position:"relative",overflow:"hidden"}}>
      <Particles/>
      <div className="blob" style={{pointerEvents:"none",top:"-15%",right:"-8%",width:"55vw",height:"55vw",maxWidth:700,background:"radial-gradient(circle,rgba(124,58,237,.28) 0%,transparent 70%)",animation:"floatY 9s ease-in-out infinite"}}/>
      <div className="blob" style={{pointerEvents:"none",bottom:"-10%",left:"-5%",width:"40vw",height:"40vw",maxWidth:500,background:"radial-gradient(circle,rgba(13,148,136,.22) 0%,transparent 70%)",animation:"floatY 13s ease-in-out infinite reverse"}}/>
      <div style={{maxWidth:1200,width:"100%",position:"relative",zIndex:1}}>
        <div className="g2" style={{display:"grid",gridTemplateColumns:"1fr 420px",gap:60,alignItems:"center"}}>
          <div>
            <div className="fu d1" style={{display:"inline-flex",alignItems:"center",gap:8,padding:"7px 16px",borderRadius:100,background:"rgba(124,58,237,.08)",border:"1px solid rgba(124,58,237,.25)",marginBottom:28}}>
              <span style={{width:8,height:8,borderRadius:"50%",background:"#10b981",display:"inline-block",boxShadow:"0 0 8px #10b981",animation:"pulse 2.5s infinite"}}/>
              <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:11,color:"#7c3aed",letterSpacing:".1em"}}>AVAILABLE FOR HIRE</span>
            </div>
            <h1 className="fu d2 di" style={{fontFamily:"'Outfit',sans-serif",fontWeight:800,fontSize:"clamp(42px,6.5vw,82px)",lineHeight:1.0,letterSpacing:"-.04em",color:"#1e1b4b",marginBottom:18}}>
              Hi, I'm<br/><span className="gt" style={{display:"inline-block"}}>Sujal Saptal</span>
            </h1>
            <div className="fu d3" style={{fontSize:"clamp(18px,2.5vw,27px)",marginBottom:24,minHeight:"1.5em",fontFamily:"'Outfit',sans-serif"}}>
              <TW words={["AI Engineer","Web Developer","Cybersecurity Learner","Freelance Dev"]}/>
            </div>
            <p className="fu d4 dm" style={{color:"#6b7280",fontSize:15.5,lineHeight:1.85,maxWidth:510,marginBottom:40}}>
              CS &amp; Engineering graduate specialising in AI &amp; ML. I build intelligent, secure, and beautiful software — from ML pipelines to full-stack web apps.
            </p>
            <div className="fu d5" style={{display:"flex",gap:14,flexWrap:"wrap",marginBottom:48}}>
              <a className="bg" href="#projects" onClick={e=>{e.preventDefault();document.getElementById("projects")?.scrollIntoView({behavior:"smooth"})}}>View My Work ↓</a>
              <a className="bgl" href="Resume_1.pdf" download>📄 Download Resume</a>
            </div>
            <div className="fu d6" style={{display:"flex",gap:10,flexWrap:"wrap"}}>
            {ql.map(({label,href,icon,c,ext})=>{
              const handleHeroClick=e=>{
                if(!ext){e.preventDefault();if(label==="Email")navigator.clipboard.writeText("saptalsujal041@gmail.com").then(()=>alert("Email copied!")); else if(label==="Phone")navigator.clipboard.writeText("+91 8010291863").then(()=>alert("Phone copied!"));}
              };
              return <a key={label} href={href} onClick={handleHeroClick} target={ext?"_blank":undefined} rel={ext?"noopener noreferrer":undefined}
                  style={{display:"flex",alignItems:"center",gap:7,padding:"9px 16px",borderRadius:100,background:"rgba(255,255,255,.8)",border:`1.5px solid ${c}22`,backdropFilter:"blur(10px)",textDecoration:"none",fontFamily:"'JetBrains Mono',monospace",fontSize:12,color:c,fontWeight:500,boxShadow:`0 2px 10px ${c}18`,transition:"all .22s"}}
                  onMouseEnter={e=>{e.currentTarget.style.background=c+"12";e.currentTarget.style.borderColor=c+"55";e.currentTarget.style.transform="translateY(-3px)";e.currentTarget.style.boxShadow=`0 6px 20px ${c}30`}}
                  onMouseLeave={e=>{e.currentTarget.style.background="rgba(255,255,255,.8)";e.currentTarget.style.borderColor=c+"22";e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow=`0 2px 10px ${c}18`}}>
                  <span>{icon}</span>{label}
                </a>;
            })}
            </div>
          </div>
          <div className="hm float" style={{display:"flex",flexDirection:"column",gap:14}}>
            <div style={{borderRadius:28,padding:"44px 36px",display:"flex",alignItems:"center",justifyContent:"center",minHeight:320,position:"relative",overflow:"hidden",background:"linear-gradient(135deg,rgba(124,58,237,.12),rgba(79,70,229,.08),rgba(13,148,136,.1))",border:"1px solid rgba(124,58,237,.2)",backdropFilter:"blur(20px)",boxShadow:"0 20px 60px rgba(124,58,237,.2)"}}>
              <div style={{position:"absolute",inset:-2,borderRadius:30,background:"linear-gradient(135deg,#7c3aed,#4f46e5,#0d9488,#f43f5e,#7c3aed)",backgroundSize:"300% 300%",animation:"gradMove 4s ease infinite",opacity:.5,zIndex:0}}/>
              <div style={{position:"absolute",inset:2,borderRadius:27,background:"rgba(248,247,255,.95)",zIndex:1}}/>
              {/* Replace emoji with <img src="/profile.jpg" style={{width:150,height:150,borderRadius:"50%",objectFit:"cover",position:"relative",zIndex:2}}/> after adding your photo */}
              <div style={{position:"relative",zIndex:2,fontSize:110,textAlign:"center",lineHeight:1}}>👨‍💻</div>
              {[{text:"🤖 AI Engineer",pos:{top:18,right:-12},c:"#7c3aed"},{text:"🛡 Security",pos:{bottom:18,left:-12},c:"#0d9488"},{text:"✅ Open to Work",pos:{bottom:18,right:-12},c:"#10b981"}].map(({text,pos,c})=>(
                <div key={text} style={{position:"absolute",...pos,background:"rgba(255,255,255,.92)",backdropFilter:"blur(10px)",borderRadius:12,padding:"7px 13px",fontFamily:"'JetBrains Mono',monospace",fontSize:11,color:c,border:`1px solid ${c}30`,boxShadow:`0 4px 14px ${c}20`,fontWeight:500,zIndex:3,whiteSpace:"nowrap"}}>{text}</div>
              ))}
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10}}>
              {[["6","Projects","+","#7c3aed"],["4","Domains","+","#0d9488"],["2","Years","+","#f43f5e"]].map(([n,l,s,c])=>(
                <div key={l} style={{background:"rgba(255,255,255,.75)",border:`1px solid ${c}22`,borderRadius:16,padding:"16px 10px",textAlign:"center",backdropFilter:"blur(10px)",boxShadow:`0 4px 16px ${c}14`}}>
                  <div style={{fontFamily:"'Outfit',sans-serif",fontWeight:900,fontSize:26,background:`linear-gradient(135deg,${c},${c}99)`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",lineHeight:1}}><Counter target={parseInt(n)} suffix={s}/></div>
                  <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:10,color:"#6b7280",marginTop:4,letterSpacing:".06em"}}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── GitHub Stats ──────────────────────────────────────────────────────────────
function GitHubStats(){
  const ref=useRef();const v=useInView(ref);
  return(
    <section ref={ref} style={{padding:"60px clamp(20px,8vw,120px)",background:"linear-gradient(135deg,rgba(124,58,237,.04),rgba(13,148,136,.04))"}}>
      <div style={{maxWidth:1200,margin:"0 auto",opacity:v?1:0,transform:v?"none":"translateY(20px)",transition:"all .7s"}}>
        <div style={{textAlign:"center",marginBottom:28}}>
          <div className="sl">GitHub Activity</div>
          <h3 className="di" style={{fontFamily:"'Outfit',sans-serif",fontWeight:800,fontSize:"clamp(22px,3vw,32px)",color:"#1e1b4b"}}><span className="gt">Open Source</span> Contributions</h3>
        </div>
        <div style={{display:"flex",gap:16,flexWrap:"wrap",justifyContent:"center",marginBottom:20}}>
          {[
            {src:"https://github-readme-stats.vercel.app/api?username=sssaptal08-glitch&show_icons=true&theme=tokyonight&hide_border=true&bg_color=00000000&title_color=7c3aed&icon_color=0d9488&text_color=4f46e5",alt:"GitHub Stats"},
            {src:"https://github-readme-stats.vercel.app/api/top-langs/?username=sssaptal08-glitch&layout=compact&theme=tokyonight&hide_border=true&bg_color=00000000&title_color=7c3aed&text_color=4f46e5",alt:"Top Languages"},
          ].map(({src,alt})=>(
            <div key={alt} className="glass" style={{padding:16,borderRadius:16,overflow:"hidden"}}>
              <img src={src} alt={alt} style={{maxWidth:"100%",height:"auto",display:"block",borderRadius:8}} onError={e=>{e.target.style.display="none"}}/>
            </div>
          ))}
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:14}}>
          {CODING_PROFILES.map(({name,icon,href,stat,color})=>(
            <a key={name} href={href} target="_blank" rel="noopener noreferrer" className="glass"
              style={{padding:"18px 20px",display:"flex",alignItems:"center",gap:14,textDecoration:"none",borderLeft:`3px solid ${color}`}}>
              <div style={{width:42,height:42,borderRadius:12,background:`${color}18`,border:`1px solid ${color}30`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0}}>{icon}</div>
              <div>
                <div className="di" style={{fontFamily:"'Outfit',sans-serif",fontWeight:700,fontSize:14,color:"#1e1b4b",marginBottom:3}}>{name}</div>
                <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:11,color}}>{stat}</div>
              </div>
              <span style={{marginLeft:"auto",fontSize:12,color:"#a5b4fc"}}>↗</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── About ─────────────────────────────────────────────────────────────────────
function About(){
  const ref=useRef();const v=useInView(ref);
  return(
    <section id="about" ref={ref} style={{padding:"100px clamp(20px,8vw,120px)",position:"relative",overflow:"hidden"}}>
      <div className="blob" style={{pointerEvents:"none",top:"10%",right:"-5%",width:"35vw",height:"35vw",maxWidth:450,background:"radial-gradient(circle,rgba(79,70,229,.12),transparent 70%)"}}/>
      <div style={{maxWidth:1200,margin:"0 auto",position:"relative",zIndex:1}}>
        <div className="g2" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:60,alignItems:"center",opacity:v?1:0,transform:v?"none":"translateY(28px)",transition:"all .7s"}}>
          <div>
            <div className="sl">About Me</div>
            <h2 className="di" style={{fontFamily:"'Outfit',sans-serif",fontSize:"clamp(28px,4vw,46px)",fontWeight:800,lineHeight:1.1,marginBottom:20,color:"#1e1b4b",letterSpacing:"-.02em"}}>
              Building at the edge of<br/><span className="gt">AI &amp; Security</span>
            </h2>
            <p className="dm" style={{color:"#6b7280",lineHeight:1.85,fontSize:15,marginBottom:18}}>I'm a CS &amp; Engineering student specialising in AI &amp; ML. My work sits at the intersection of intelligent systems, cybersecurity, and modern web development.</p>
            <p className="dm" style={{color:"#6b7280",lineHeight:1.85,fontSize:15,marginBottom:36}}>As a freelancer I ship fast and communicate clearly — ML pipelines, secure backends, or polished React interfaces.</p>
            <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
              <a className="bg" href="#contact" onClick={e=>{e.preventDefault();document.getElementById("contact")?.scrollIntoView({behavior:"smooth"})}}>Let's Work Together</a>
              <a className="bgl" href="Resume_1.pdf" download>📄 Download CV</a>
            </div>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:14}}>
            {[{icon:"🤖",title:"Artificial Intelligence",desc:"ML pipelines, deep learning, GANs and NLP with TensorFlow & PyTorch.",grad:"linear-gradient(135deg,#7c3aed,#4f46e5)",c:"#7c3aed"},{icon:"🛡",title:"Cybersecurity",desc:"Network security, threat detection, ethical hacking and secure architecture.",grad:"linear-gradient(135deg,#0d9488,#0891b2)",c:"#0d9488"},{icon:"🌐",title:"Full-Stack Web Dev",desc:"React frontends, Python/Node backends, REST APIs — end-to-end products.",grad:"linear-gradient(135deg,#4f46e5,#7c3aed)",c:"#4f46e5"}].map(({icon,title,desc,grad,c})=>(
              <div key={title} className="glass" style={{padding:"20px 22px",display:"flex",gap:16,alignItems:"flex-start"}}>
                <div style={{width:46,height:46,borderRadius:14,background:grad,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0,boxShadow:`0 4px 16px ${c}40`}}>{icon}</div>
                <div><div className="di" style={{fontFamily:"'Outfit',sans-serif",fontWeight:700,fontSize:15,color:"#1e1b4b",marginBottom:5}}>{title}</div><div className="dm" style={{fontSize:13,color:"#6b7280",lineHeight:1.65}}>{desc}</div></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Skills ────────────────────────────────────────────────────────────────────
function Bar({n,p,grad,color,v}){
  return(
    <div style={{marginBottom:16}}>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:7}}>
        <span className="di" style={{fontSize:13,fontWeight:500,color:"#3730a3"}}>{n}</span>
        <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:12,color,fontWeight:600}}>{p}%</span>
      </div>
      <div style={{height:8,background:"rgba(124,58,237,.08)",borderRadius:99,overflow:"hidden",border:"1px solid rgba(124,58,237,.1)"}}>
        <div style={{height:"100%",borderRadius:99,background:grad,width:v?`${p}%`:"0%",transition:"width 1.2s cubic-bezier(.22,1,.36,1)",boxShadow:`0 0 8px ${color}50`}}/>
      </div>
    </div>
  );
}
function Skills(){
  const ref=useRef();const v=useInView(ref);
  const cs=["#7c3aed","#4f46e5","#0d9488","#f43f5e","#f59e0b","#0891b2","#10b981"];
  return(
    <section id="skills" ref={ref} style={{padding:"100px clamp(20px,8vw,120px)",position:"relative",overflow:"hidden",background:"linear-gradient(180deg,rgba(238,242,255,.6) 0%,rgba(240,253,250,.4) 100%)"}}>
      <div className="blob" style={{pointerEvents:"none",bottom:"5%",left:"-5%",width:"40vw",height:"40vw",maxWidth:500,background:"radial-gradient(circle,rgba(13,148,136,.1),transparent 70%)"}}/>
      <div style={{maxWidth:1200,margin:"0 auto",position:"relative",zIndex:1}}>
        <div style={{textAlign:"center",marginBottom:56}}>
          <div className="sl">Tech Stack</div>
          <h2 className="di" style={{fontFamily:"'Outfit',sans-serif",fontSize:"clamp(28px,4vw,46px)",fontWeight:800,color:"#1e1b4b",lineHeight:1.1,letterSpacing:"-.02em"}}>Skills &amp; <span className="gt">Expertise</span></h2>
        </div>
        <div className="g2" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:22,marginBottom:40,opacity:v?1:0,transform:v?"none":"translateY(28px)",transition:"all .7s"}}>
          {SKILLS.map(({cat,grad,color,items})=>(
            <div key={cat} className="glass" style={{padding:28}}>
              <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:24}}>
                <div style={{width:36,height:36,borderRadius:10,background:grad,flexShrink:0,boxShadow:`0 4px 12px ${color}40`}}/>
                <div className="di" style={{fontFamily:"'Outfit',sans-serif",fontWeight:700,fontSize:16,color:"#1e1b4b"}}>{cat}</div>
              </div>
              {items.map(({n,p})=><Bar key={n} n={n} p={p} grad={grad} color={color} v={v}/>)}
            </div>
          ))}
        </div>
        <div style={{display:"flex",flexWrap:"wrap",gap:9,justifyContent:"center",opacity:v?1:0,transition:"opacity 1s .3s"}}>
          {BADGES.map((b,i)=>{const c=cs[i%cs.length];return(
            <span key={b} style={{display:"inline-flex",alignItems:"center",padding:"5px 13px",borderRadius:100,background:`${c}0e`,color:c,fontFamily:"'JetBrains Mono',monospace",fontSize:11,fontWeight:500,border:`1px solid ${c}28`,transition:"all .2s",cursor:"default"}}
              onMouseEnter={e=>{e.target.style.background=`${c}20`;e.target.style.borderColor=`${c}55`;e.target.style.transform="translateY(-2px)";e.target.style.boxShadow=`0 4px 12px ${c}25`}}
              onMouseLeave={e=>{e.target.style.background=`${c}0e`;e.target.style.borderColor=`${c}28`;e.target.style.transform="none";e.target.style.boxShadow="none"}}>{b}</span>
          )})}
        </div>
      </div>
    </section>
  );
}

// ── Projects ──────────────────────────────────────────────────────────────────
function Projects(){
  const ref=useRef();const v=useInView(ref);
  return(
    <section id="projects" ref={ref} style={{padding:"100px clamp(20px,8vw,120px)",position:"relative",overflow:"hidden"}}>
      <div className="blob" style={{pointerEvents:"none",top:"-5%",right:"-3%",width:"38vw",height:"38vw",maxWidth:480,background:"radial-gradient(circle,rgba(244,63,94,.1),transparent 70%)"}}/>
      <div style={{maxWidth:1200,margin:"0 auto",position:"relative",zIndex:1}}>
        <div style={{textAlign:"center",marginBottom:56}}>
          <div className="sl">Portfolio</div>
          <h2 className="di" style={{fontFamily:"'Outfit',sans-serif",fontSize:"clamp(28px,4vw,46px)",fontWeight:800,color:"#1e1b4b",lineHeight:1.1,letterSpacing:"-.02em",marginBottom:14}}>Featured <span className="gt">Projects</span></h2>
          <p className="dm" style={{color:"#6b7280",fontSize:15,maxWidth:460,margin:"0 auto"}}>Spanning AI, cybersecurity, and full-stack web development.</p>
        </div>
        <div className="g3" style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:20,opacity:v?1:0,transform:v?"none":"translateY(28px)",transition:"all .7s"}}>
          {PROJECTS.map(({title,cat,desc,stack,github,demo,grad,color,icon})=>(
            <div key={title} className="glass" style={{padding:24,display:"flex",flexDirection:"column",gap:13}}>
              <div style={{height:4,borderRadius:99,background:grad,marginBottom:4,boxShadow:`0 2px 10px ${color}40`}}/>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                <div style={{display:"flex",alignItems:"center",gap:10}}>
                  <div style={{width:38,height:38,borderRadius:10,background:grad,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,boxShadow:`0 4px 12px ${color}40`}}>{icon}</div>
                  <span style={{padding:"3px 10px",borderRadius:100,background:`${color}12`,color,fontFamily:"'JetBrains Mono',monospace",fontSize:10,fontWeight:600,border:`1px solid ${color}30`}}>{cat}</span>
                </div>
                <div style={{display:"flex",gap:6}}>
                  {[["🐙",github],["↗",demo]].map(([ico,href])=>(
                    <a key={ico} href={href} target="_blank" rel="noopener noreferrer"
                      style={{width:30,height:30,borderRadius:8,border:`1px solid ${color}25`,display:"flex",alignItems:"center",justifyContent:"center",textDecoration:"none",fontSize:13,color:"#6b7280",background:`${color}08`,transition:"all .18s"}}
                      onMouseEnter={e=>{e.currentTarget.style.background=grad;e.currentTarget.style.color="#fff";e.currentTarget.style.borderColor="transparent";e.currentTarget.style.transform="translateY(-2px)"}}
                      onMouseLeave={e=>{e.currentTarget.style.background=`${color}08`;e.currentTarget.style.color="#6b7280";e.currentTarget.style.borderColor=`${color}25`;e.currentTarget.style.transform="none"}}>
                      {ico}
                    </a>
                  ))}
                </div>
              </div>
              <div className="di" style={{fontFamily:"'Outfit',sans-serif",fontWeight:700,fontSize:15,color:"#1e1b4b",lineHeight:1.3}}>{title}</div>
              <p className="dm" style={{fontSize:13,color:"#6b7280",lineHeight:1.7,flex:1}}>{desc}</p>
              <div style={{display:"flex",flexWrap:"wrap",gap:5,paddingTop:10,borderTop:`1px solid ${color}15`}}>
                {stack.map(s=><span key={s} style={{padding:"3px 10px",borderRadius:100,background:`${color}0e`,color,fontFamily:"'JetBrains Mono',monospace",fontSize:10,fontWeight:500,border:`1px solid ${color}28`}}>{s}</span>)}
              </div>
            </div>
          ))}
        </div>
        <div style={{textAlign:"center",marginTop:40}}>
          <a className="bgl" href="https://github.com/sssaptal08-glitch" target="_blank" rel="noopener noreferrer">View All on GitHub ↗</a>
        </div>
      </div>
    </section>
  );
}

// ── Certifications ────────────────────────────────────────────────────────────
function Certifications(){
  const ref=useRef();const v=useInView(ref);
  return(
    <section id="certifications" ref={ref} style={{padding:"100px clamp(20px,8vw,120px)",background:"linear-gradient(180deg,rgba(238,242,255,.5) 0%,rgba(240,253,250,.3) 100%)",position:"relative",overflow:"hidden"}}>
      <div className="blob" style={{pointerEvents:"none",top:"0%",left:"-5%",width:"35vw",height:"35vw",maxWidth:440,background:"radial-gradient(circle,rgba(124,58,237,.1),transparent 70%)"}}/>
      <div style={{maxWidth:1200,margin:"0 auto",position:"relative",zIndex:1}}>
        <div style={{textAlign:"center",marginBottom:56}}>
          <div className="sl">Credentials</div>
          <h2 className="di" style={{fontFamily:"'Outfit',sans-serif",fontSize:"clamp(28px,4vw,46px)",fontWeight:800,color:"#1e1b4b",lineHeight:1.1,letterSpacing:"-.02em"}}>Certifications &amp; <span className="gt">Achievements</span></h2>
        </div>
        <div className="g3" style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:18,opacity:v?1:0,transform:v?"none":"translateY(28px)",transition:"all .7s"}}>
          {CERTS.map(({name,org,year,icon,color,grad})=>(
            <div key={name} className="glass" style={{padding:24}}>
              <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:14}}>
                <div style={{width:48,height:48,borderRadius:14,background:grad,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,boxShadow:`0 4px 14px ${color}40`,flexShrink:0}}>{icon}</div>
                <div style={{padding:"3px 10px",borderRadius:100,background:`${color}12`,color,fontFamily:"'JetBrains Mono',monospace",fontSize:10,fontWeight:600,border:`1px solid ${color}30`}}>{year}</div>
              </div>
              <div className="di" style={{fontFamily:"'Outfit',sans-serif",fontWeight:700,fontSize:14,color:"#1e1b4b",marginBottom:6,lineHeight:1.3}}>{name}</div>
              <div className="dm" style={{fontFamily:"'JetBrains Mono',monospace",fontSize:11,color:"#6b7280",lineHeight:1.5}}>{org}</div>
              <div style={{marginTop:12,height:3,borderRadius:99,background:grad,opacity:.5}}/>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Testimonials ──────────────────────────────────────────────────────────────
function Testimonials(){
  const ref=useRef();const v=useInView(ref);
  return(
    <section ref={ref} style={{padding:"100px clamp(20px,8vw,120px)",position:"relative",overflow:"hidden"}}>
      <div className="blob" style={{pointerEvents:"none",bottom:"-5%",right:"-4%",width:"36vw",height:"36vw",maxWidth:460,background:"radial-gradient(circle,rgba(244,63,94,.08),transparent 70%)"}}/>
      <div style={{maxWidth:1200,margin:"0 auto",position:"relative",zIndex:1}}>
        <div style={{textAlign:"center",marginBottom:56}}>
          <div className="sl">Social Proof</div>
          <h2 className="di" style={{fontFamily:"'Outfit',sans-serif",fontSize:"clamp(28px,4vw,46px)",fontWeight:800,color:"#1e1b4b",lineHeight:1.1,letterSpacing:"-.02em"}}>What People <span className="gt">Say</span></h2>
        </div>
        <div className="g3" style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:20,opacity:v?1:0,transform:v?"none":"translateY(28px)",transition:"all .7s"}}>
          {TESTIMONIALS.map(({name,role,text,avatar,color})=>(
            <div key={name} className="glass" style={{padding:28,display:"flex",flexDirection:"column",gap:16}}>
              <div style={{fontSize:28,color}}>"</div>
              <p className="dm" style={{color:"#6b7280",fontSize:14,lineHeight:1.75,flex:1,fontStyle:"italic"}}>{text}</p>
              <div style={{display:"flex",alignItems:"center",gap:12,paddingTop:16,borderTop:`1px solid ${color}15`}}>
                <div style={{width:44,height:44,borderRadius:"50%",background:`linear-gradient(135deg,${color}30,${color}10)`,border:`2px solid ${color}40`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}}>{avatar}</div>
                <div>
                  <div className="di" style={{fontFamily:"'Outfit',sans-serif",fontWeight:700,fontSize:14,color:"#1e1b4b"}}>{name}</div>
                  <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:11,color}}>{role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Experience ────────────────────────────────────────────────────────────────
function Experience(){
  const ref=useRef();const v=useInView(ref);
  return(
    <section id="experience" ref={ref} style={{padding:"100px clamp(20px,8vw,120px)",background:"linear-gradient(180deg,rgba(238,242,255,.5) 0%,rgba(240,253,250,.3) 100%)",position:"relative",overflow:"hidden"}}>
      <div className="blob" style={{pointerEvents:"none",bottom:"0%",right:"-4%",width:"36vw",height:"36vw",maxWidth:460,background:"radial-gradient(circle,rgba(124,58,237,.1),transparent 70%)"}}/>
      <div style={{maxWidth:1200,margin:"0 auto",position:"relative",zIndex:1}}>
        <div style={{textAlign:"center",marginBottom:56}}>
          <div className="sl">Journey</div>
          <h2 className="di" style={{fontFamily:"'Outfit',sans-serif",fontSize:"clamp(28px,4vw,46px)",fontWeight:800,color:"#1e1b4b",lineHeight:1.1,letterSpacing:"-.02em"}}>Experience &amp; <span className="gt">Education</span></h2>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:20,opacity:v?1:0,transform:v?"none":"translateY(28px)",transition:"all .7s"}}>
          <div className="g2" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20}}>
            <div className="glass" style={{padding:30}}>
              <div style={{height:4,borderRadius:99,background:"linear-gradient(135deg,#7c3aed,#4f46e5)",marginBottom:20,boxShadow:"0 2px 10px rgba(124,58,237,.4)"}}/>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:14}}>
                <div>
                  <div className="di" style={{fontFamily:"'Outfit',sans-serif",fontWeight:700,fontSize:18,color:"#1e1b4b",marginBottom:4}}>Cybersecurity Intern</div>
                  <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:11,background:"linear-gradient(135deg,#7c3aed,#4f46e5)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",letterSpacing:".07em"}}>Hackveda Solutions Pvt. Ltd. (Cybersecurity Group) · APR 2026 – MAY 2026</div>
                </div>
                <span style={{background:"rgba(16,185,129,.1)",color:"#10b981",border:"1px solid rgba(16,185,129,.25)",borderRadius:100,padding:"4px 12px",fontFamily:"'JetBrains Mono',monospace",fontSize:10}}>Completed</span>
              </div>
              <p className="dm" style={{color:"#6b7280",fontSize:14,lineHeight:1.75,marginBottom:18}}>Custom web apps, AI/ML prototypes, and data science solutions. Python backends · React frontends · ML integration.</p>
              <div style={{display:"flex",flexWrap:"wrap",gap:7}}>{["Python","React","FastAPI","ML Integration"].map(t=><span key={t} className="tag">{t}</span>)}</div>
            </div>
            <div className="glass" style={{padding:30}}>
              <div style={{height:4,borderRadius:99,background:"linear-gradient(135deg,#4f46e5,#0d9488)",marginBottom:20,boxShadow:"0 2px 10px rgba(79,70,229,.4)"}}/>
              <div style={{display:"flex",gap:14,marginBottom:14,alignItems:"flex-start"}}>
                <div style={{width:48,height:48,borderRadius:14,background:"linear-gradient(135deg,#4f46e5,#0d9488)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0,boxShadow:"0 4px 16px rgba(79,70,229,.35)"}}>🎓</div>
                <div>
                  <div className="di" style={{fontFamily:"'Outfit',sans-serif",fontWeight:700,fontSize:15,color:"#1e1b4b",marginBottom:4}}>B.E. CS &amp; Engineering (AI &amp; ML)</div>
                  <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:11,background:"linear-gradient(135deg,#4f46e5,#0d9488)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",letterSpacing:".06em"}}>2022 – 2026 · Completed (CGPA: 8.5/10)</div>
                </div>
              </div>
              <p className="dm" style={{color:"#6b7280",fontSize:14,lineHeight:1.75,marginBottom:18}}>Specialisation in AI &amp; ML. Strong foundation in algorithms, data structures, and software engineering.</p>
              <div style={{display:"flex",flexWrap:"wrap",gap:7}}>{["AI & ML","Python","Data Structures","Software Engineering"].map(t=><span key={t} className="tag">{t}</span>)}</div>
            </div>
          </div>
          <div className="glass" style={{padding:32,display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:22,background:"linear-gradient(135deg,rgba(124,58,237,.06),rgba(79,70,229,.04),rgba(13,148,136,.06))"}}>
            <div style={{display:"flex",gap:20,alignItems:"center"}}>
              <div style={{width:60,height:60,borderRadius:18,background:"linear-gradient(135deg,#7c3aed,#4f46e5,#0d9488)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:28,boxShadow:"0 8px 24px rgba(124,58,237,.35)",flexShrink:0}}>🚀</div>
              <div>
                <div className="di" style={{fontFamily:"'Outfit',sans-serif",fontWeight:700,fontSize:18,color:"#1e1b4b",marginBottom:6}}>Open for Opportunities</div>
                <div className="dm" style={{color:"#6b7280",fontSize:14,lineHeight:1.6,maxWidth:500}}>Seeking entry-level Software Developer roles &amp; freelance projects in AI, security, or web development.</div>
              </div>
            </div>
            <a className="bg" href="#contact" onClick={e=>{e.preventDefault();document.getElementById("contact")?.scrollIntoView({behavior:"smooth"})}}>Start a Conversation ↗</a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Contact ───────────────────────────────────────────────────────────────────
function Contact(){
  const ref=useRef();const v=useInView(ref);
  const[form,sf]=useState({name:"",email:"",subject:"",message:""});
  const[sent,ss]=useState(false);const[sending,setSending]=useState(false);
  const send=async e=>{
    e.preventDefault();setSending(true);
    if(!form.name||!form.email||!form.subject||!form.message){alert("Please fill in all fields");setSending(false);return;}
    await new Promise(r=>setTimeout(r,1200));
    const msg={id:Date.now(),name:form.name,email:form.email,subject:form.subject,message:form.message,timestamp:new Date().toLocaleString(),read:false};
    const msgs=JSON.parse(localStorage.getItem("portfolio_messages")||"[]");msgs.push(msg);localStorage.setItem("portfolio_messages",JSON.stringify(msgs));
    ss(true);setTimeout(()=>ss(false),5000);sf({name:"",email:"",subject:"",message:""});setSending(false);
  };
  return(
    <section id="contact" ref={ref} style={{padding:"100px clamp(20px,8vw,120px) 80px",position:"relative",overflow:"hidden"}}>
      <div className="blob" style={{pointerEvents:"none",top:"0%",left:"-5%",width:"40vw",height:"40vw",maxWidth:500,background:"radial-gradient(circle,rgba(244,63,94,.08),transparent 70%)"}}/>
      <div className="blob" style={{pointerEvents:"none",bottom:"0%",right:"-3%",width:"35vw",height:"35vw",maxWidth:440,background:"radial-gradient(circle,rgba(13,148,136,.1),transparent 70%)"}}/>
      <div style={{maxWidth:1200,margin:"0 auto",position:"relative",zIndex:1}}>
        <div style={{textAlign:"center",marginBottom:56}}>
          <div className="sl">Contact</div>
          <h2 className="di" style={{fontFamily:"'Outfit',sans-serif",fontSize:"clamp(28px,4vw,46px)",fontWeight:800,color:"#1e1b4b",lineHeight:1.1,letterSpacing:"-.02em",marginBottom:14}}>Let's Work <span className="gt">Together</span></h2>
          <p className="dm" style={{color:"#6b7280",fontSize:15,maxWidth:420,margin:"0 auto"}}>Have a project? I'd love to hear about it.</p>
        </div>
        <div className="g2" style={{display:"grid",gridTemplateColumns:"1fr 1.3fr",gap:36,opacity:v?1:0,transform:v?"none":"translateY(28px)",transition:"all .7s"}}>
          <div style={{display:"flex",flexDirection:"column",gap:12}}>
            {CONTACT_LINKS.map(({icon,label,val,href,grad,color})=>{
              const isExternal=href.startsWith("http");
              const handleClick=e=>{
                if(!isExternal){e.preventDefault();if(label==="Email")navigator.clipboard.writeText("saptalsujal041@gmail.com").then(()=>alert("Email copied to clipboard!")); else if(label==="Phone")navigator.clipboard.writeText("+91 8010291863").then(()=>alert("Phone number copied to clipboard!"));}
              };
              return <a key={label} href={href} onClick={handleClick} target={isExternal?"_blank":undefined} rel={isExternal?"noopener noreferrer":undefined} className="glass"
                style={{padding:"18px 20px",display:"flex",alignItems:"center",gap:14,textDecoration:"none",cursor:isExternal?"pointer":"copy"}}>
                <div style={{width:44,height:44,borderRadius:12,background:grad,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0,boxShadow:`0 4px 14px ${color}40`}}>{icon}</div>
                <div style={{flex:1}}>
                  <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:10,color:"#6b7280",letterSpacing:".12em",textTransform:"uppercase",marginBottom:3}}>{label}</div>
                  <div style={{fontSize:13,fontWeight:600,background:grad,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>{val}</div>
                </div>
                <span style={{fontSize:14,color:"#a5b4fc"}}>{isExternal?"↗":"📋"}</span>
              </a>;
            })}
            <div className="glass" style={{padding:"18px 20px",background:"linear-gradient(135deg,rgba(16,185,129,.06),rgba(13,148,136,.06))"}}>
              <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:11,color:"#6b7280",letterSpacing:".1em",marginBottom:5}}>RESPONSE TIME</div>
              <div style={{fontFamily:"'Outfit',sans-serif",fontWeight:600,color:"#10b981",fontSize:14}}>⚡ Usually within 24 hours</div>
            </div>
          </div>
          <div className="glass" style={{padding:34}}>
            {sent?(
              <div style={{minHeight:400,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:18,textAlign:"center"}}>
                <div style={{width:72,height:72,borderRadius:"50%",background:"linear-gradient(135deg,#10b981,#0d9488)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:34,boxShadow:"0 8px 28px rgba(16,185,129,.4)"}}>✅</div>
                <div className="di" style={{fontFamily:"'Outfit',sans-serif",fontWeight:800,fontSize:24}}><span className="gt">Message Sent!</span></div>
                <div className="dm" style={{color:"#6b7280",fontSize:14}}>Thanks for reaching out. I'll reply within 24 hours.</div>
              </div>
            ):(
              <div style={{display:"flex",flexDirection:"column",gap:16}}>
                <div className="g2" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
                  {[{k:"name",l:"Your Name",t:"text",ph:"John Doe"},{k:"email",l:"Email",t:"email",ph:"you@example.com"}].map(({k,l,t,ph})=>(
                    <div key={k}>
                      <label style={{fontFamily:"'JetBrains Mono',monospace",fontSize:10,color:"#6b7280",display:"block",marginBottom:7,letterSpacing:".12em",textTransform:"uppercase"}}>{l}</label>
                      <input type={t} placeholder={ph} value={form[k]} onChange={e=>sf(f=>({...f,[k]:e.target.value}))}/>
                    </div>
                  ))}
                </div>
                <div>
                  <label style={{fontFamily:"'JetBrains Mono',monospace",fontSize:10,color:"#6b7280",display:"block",marginBottom:7,letterSpacing:".12em",textTransform:"uppercase"}}>Subject</label>
                  <input type="text" placeholder="Project inquiry, collaboration..." value={form.subject} onChange={e=>sf(f=>({...f,subject:e.target.value}))}/>
                </div>
                <div>
                  <label style={{fontFamily:"'JetBrains Mono',monospace",fontSize:10,color:"#6b7280",display:"block",marginBottom:7,letterSpacing:".12em",textTransform:"uppercase"}}>Message</label>
                  <textarea rows={5} placeholder="Tell me about your project, timeline, and budget..." value={form.message} onChange={e=>sf(f=>({...f,message:e.target.value}))} style={{resize:"vertical"}}/>
                </div>
                <button className="bg" onClick={send} disabled={sending} style={{width:"100%",justifyContent:"center",padding:15,fontSize:15,borderRadius:12,opacity:sending?.75:1}}>
                  {sending?"Sending ⏳":"Send Message →"}
                </button>
                <div style={{textAlign:"center",fontFamily:"'JetBrains Mono',monospace",fontSize:11,color:"#6b7280"}}>
                  Or email at <a href="mailto:saptalsujal041@gmail.com" style={{background:"linear-gradient(135deg,#7c3aed,#4f46e5)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",textDecoration:"none",fontWeight:600}}>saptalsujal041@gmail.com</a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────
function Footer(){
  const links=[
    {icon:"🐙",label:"GitHub",  href:"https://github.com/sssaptal08-glitch",           c:"#7c3aed"},
    {icon:"💼",label:"LinkedIn",href:"https://linkedin.com/in/sujal-saptal-2b9363350",  c:"#4f46e5"},
    {icon:"✉", label:"Email",   href:"mailto:saptalsujal041@gmail.com",           c:"#0d9488"},
    {icon:"📞",label:"Phone",   href:"tel:+918010291863",                          c:"#f43f5e"},
  ];
  return(
    <footer style={{borderTop:"1px solid rgba(124,58,237,.12)",padding:"32px clamp(20px,8vw,120px)",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:18,background:"rgba(255,255,255,.6)",backdropFilter:"blur(20px)"}}>
      <div>
        <div style={{fontFamily:"'Outfit',sans-serif",fontWeight:800,fontSize:22,letterSpacing:"-.02em",marginBottom:3}}><span className="gt">Sujal</span><span style={{color:"#7c3aed"}}>.</span></div>
        <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:11,color:"#6b7280"}}>Built with React · © 2025 Sujal Suresh Saptal</div>
      </div>
      <div style={{display:"flex",gap:10}}>
        {links.map(({icon,label,href,c})=>(
          <a key={label} href={href} title={label} target={href.startsWith("http")?"_blank":undefined} rel={href.startsWith("http")?"noopener noreferrer":undefined}
            style={{width:40,height:40,borderRadius:12,display:"flex",alignItems:"center",justifyContent:"center",border:`1px solid ${c}22`,color:"#6b7280",textDecoration:"none",fontSize:17,transition:"all .22s",background:"rgba(255,255,255,.7)",backdropFilter:"blur(8px)"}}
            onMouseEnter={e=>{e.currentTarget.style.background=`${c}15`;e.currentTarget.style.borderColor=`${c}50`;e.currentTarget.style.color=c;e.currentTarget.style.transform="translateY(-3px)";e.currentTarget.style.boxShadow=`0 6px 18px ${c}30`}}
            onMouseLeave={e=>{e.currentTarget.style.background="rgba(255,255,255,.7)";e.currentTarget.style.borderColor=`${c}22`;e.currentTarget.style.color="#6b7280";e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="none"}}>
            {icon}
          </a>
        ))}
      </div>
      <button onClick={()=>window.scrollTo({top:0,behavior:"smooth"})}
        style={{background:"linear-gradient(135deg,#7c3aed,#4f46e5)",color:"#fff",border:"none",borderRadius:12,width:40,height:40,fontSize:18,display:"flex",alignItems:"center",justifyContent:"center",transition:"all .22s",boxShadow:"0 4px 16px rgba(124,58,237,.35)"}}
        onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-3px)";e.currentTarget.style.boxShadow="0 8px 24px rgba(124,58,237,.5)"}}
        onMouseLeave={e=>{e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="0 4px 16px rgba(124,58,237,.35)"}}>↑</button>
    </footer>
  );
}

// ── WhatsApp Floating Button ──────────────────────────────────────────────────
function WhatsApp(){
  const[hov,sh]=useState(false);
  return(
    <a href="https://wa.me/918010291863?text=Hi%20Sujal!%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20project."
      target="_blank" rel="noopener noreferrer"
      style={{position:"fixed",bottom:28,right:28,zIndex:900,width:58,height:58,borderRadius:"50%",background:"linear-gradient(135deg,#25d366,#128c7e)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:26,boxShadow:hov?"0 8px 32px rgba(37,211,102,.6)":"0 4px 20px rgba(37,211,102,.4)",transition:"all .3s",animation:"waPulse 2.5s ease infinite",textDecoration:"none",transform:hov?"scale(1.12)":"scale(1)"}}
      onMouseEnter={()=>sh(true)} onMouseLeave={()=>sh(false)}>
      💬
      {hov&&<div style={{position:"absolute",right:68,top:"50%",transform:"translateY(-50%)",background:"rgba(0,0,0,.8)",color:"#fff",padding:"6px 14px",borderRadius:8,fontSize:12,fontFamily:"'JetBrains Mono',monospace",whiteSpace:"nowrap",backdropFilter:"blur(10px)"}}>Chat on WhatsApp</div>}
    </a>
  );
}

// ── Admin Dashboard ───────────────────────────────────────────────────────────
function AdminDashboard({onBack}){
  const[msgs,setMsgs]=useState([]);const[filter,setFilter]=useState("all");
  useEffect(()=>{const m=JSON.parse(localStorage.getItem("portfolio_messages")||"[]");setMsgs(m.reverse())},[]);
  const del=id=>{if(confirm("Delete this message?")){const m=msgs.filter(x=>x.id!==id);localStorage.setItem("portfolio_messages",JSON.stringify([...m.reverse()].reverse()));setMsgs(m)}};
  const toggleRead=id=>{const m=msgs.map(x=>x.id===id?{...x,read:!x.read}:x);localStorage.setItem("portfolio_messages",JSON.stringify([...m.reverse()].reverse()));setMsgs(m)};
  const exp=()=>{const csv="Name,Email,Subject,Timestamp,Message\n"+msgs.map(x=>`"${x.name}","${x.email}","${x.subject}","${x.timestamp}","${x.message.replace(/"/g,'""')}"`).join("\n");const a=document.createElement("a");a.href="data:text/csv;charset=utf-8,"+encodeURIComponent(csv);a.download="messages.csv";a.click()};
  const filt=filter==="unread"?msgs.filter(x=>!x.read):msgs;
  return(
    <div style={{position:"fixed",inset:0,background:"linear-gradient(135deg,#0f0e1a,#1a1040,#0a1a2e)",zIndex:99998,display:"flex",flexDirection:"column",backdropFilter:"blur(10px)"}}>
      <div style={{padding:"20px 30px",borderBottom:"1px solid rgba(124,58,237,.2)",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div style={{fontFamily:"'Outfit',sans-serif",fontWeight:800,fontSize:28,background:"linear-gradient(135deg,#7c3aed,#4f46e5)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>📨 Messages ({msgs.length})</div>
        <button onClick={onBack} style={{padding:"8px 16px",background:"rgba(244,63,94,.2)",border:"1px solid #f43f5e",borderRadius:8,color:"#f43f5e",cursor:"pointer",fontFamily:"'JetBrains Mono',monospace",fontSize:12}}>← Back</button>
      </div>
      <div style={{padding:"15px 30px",display:"flex",gap:10,borderBottom:"1px solid rgba(124,58,237,.2)"}}>
        <button onClick={()=>setFilter("all")} style={{padding:"8px 16px",background:filter==="all"?"rgba(124,58,237,.3)":"rgba(124,58,237,.1)",border:"1px solid rgba(124,58,237,.3)",borderRadius:8,color:"#a5b4fc",cursor:"pointer",fontFamily:"'JetBrains Mono',monospace",fontSize:11}}>All Messages ({msgs.length})</button>
        <button onClick={()=>setFilter("unread")} style={{padding:"8px 16px",background:filter==="unread"?"rgba(16,185,129,.3)":"rgba(16,185,129,.1)",border:"1px solid rgba(16,185,129,.3)",borderRadius:8,color:"#10b981",cursor:"pointer",fontFamily:"'JetBrains Mono',monospace",fontSize:11}}>Unread ({msgs.filter(x=>!x.read).length})</button>
        <button onClick={exp} style={{padding:"8px 16px",background:"rgba(79,70,229,.2)",border:"1px solid #4f46e5",borderRadius:8,color:"#4f46e5",cursor:"pointer",fontFamily:"'JetBrains Mono',monospace",fontSize:11,marginLeft:"auto"}}>📥 Export CSV</button>
      </div>
      <div style={{flex:1,overflowY:"auto",padding:"20px 30px",display:"flex",flexDirection:"column",gap:12}}>
        {filt.length===0?<div style={{textAlign:"center",color:"#6b7280",paddingTop:40}}>No messages yet</div>:filt.map(m=>(
          <div key={m.id} style={{background:`linear-gradient(135deg,rgba(124,58,237,.08),rgba(79,70,229,.05))`,border:`1px solid ${m.read?"rgba(124,58,237,.1)":"#7c3aed"}`,borderRadius:12,padding:16,boxShadow:!m.read?"0 0 20px rgba(124,58,237,.2)":"none"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"start",marginBottom:10}}>
              <div style={{flex:1}}>
                <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:6}}>
                  <span style={{fontFamily:"'JetBrains Mono',monospace",fontWeight:700,color:"#7c3aed",fontSize:12}}>{m.name}</span>
                  <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:10,color:"#6b7280"}}>{m.email}</span>
                  {!m.read&&<span style={{background:"#7c3aed",color:"#fff",padding:"3px 8px",borderRadius:4,fontSize:9,fontWeight:600}}>NEW</span>}
                </div>
                <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:10,color:"#10b981",marginBottom:8}}>{m.timestamp}</div>
                <div style={{fontFamily:"'Outfit',sans-serif",fontWeight:700,fontSize:13,color:"#e2e8f0",marginBottom:8}}>{m.subject}</div>
                <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:12,color:"#a5b4fc",lineHeight:1.5,whiteSpace:"pre-wrap",wordBreak:"break-word",maxHeight:150,overflowY:"auto"}}>{m.message}</div>
              </div>
              <div style={{display:"flex",gap:8,marginLeft:10}}>
                <button onClick={()=>toggleRead(m.id)} style={{padding:"6px 10px",background:m.read?"rgba(124,58,237,.1)":"rgba(124,58,237,.3)",border:"1px solid rgba(124,58,237,.3)",borderRadius:6,color:"#a5b4fc",cursor:"pointer",fontSize:11}}>✓ {m.read?"Unread":"Mark Read"}</button>
                <button onClick={()=>del(m.id)} style={{padding:"6px 10px",background:"rgba(244,63,94,.2)",border:"1px solid #f43f5e",borderRadius:6,color:"#f43f5e",cursor:"pointer",fontSize:11}}>🗑 Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── App ────────────────────────────────────────────────────────────────────────
export default function App(){
  const[loaded,setLoaded]=useState(false);
  const[dark,setDark]=useState(false);
  const[showAdmin,setShowAdmin]=useState(false);
  const done=useRef(false);
  const onDone=useCallback(()=>{if(!done.current){done.current=true;setLoaded(true)}},[]);
  useEffect(()=>{document.title="Sujal Suresh Saptal — AI & Freelance Developer"},[]);
  useEffect(()=>{const handleKey=e=>{if(e.ctrlKey&&e.shiftKey&&e.code==="KeyA"){setShowAdmin(!showAdmin)}};window.addEventListener("keydown",handleKey);return()=>window.removeEventListener("keydown",handleKey)},[showAdmin]);
  if(showAdmin) return <AdminDashboard onBack={()=>setShowAdmin(false)}/>;
  return(
    <>
      <Cursor/>
      <ScrollBar/>
      {!loaded&&<Loader onDone={onDone}/>}
      {loaded&&<>
        <Navbar dark={dark} setDark={setDark}/>
        <Hero/>
        <GitHubStats/>
        <About/>
        <Skills/>
        <Projects/>
        <Certifications/>
        <Testimonials/>
        <Experience/>
        <Contact/>
        <Footer/>
        <WhatsApp/>
      </>}
    </>
  );
}
