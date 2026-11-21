import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, signInAnonymously, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, doc, getDoc, runTransaction, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
const _l=document.createElement('link');_l.rel='stylesheet';_l.href='https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;800&display=swap';document.head.appendChild(_l);
const _s=document.createElement('style');_s.textContent="\n:root{--g:#054f30;--g-dk:#022a19;--g2:#00a84f;--ink:#0f2a1d;--line:#cfe3d7;--muted:#5d7468;--font:'Poppins',system-ui,-apple-system,'Segoe UI',sans-serif;color-scheme:light}\n*{box-sizing:border-box;margin:0;padding:0;-webkit-tap-highlight-color:transparent}\n[hidden]{display:none!important}\nhtml,body{min-height:100%}\nbody{font-family:var(--font);color:var(--ink);background:radial-gradient(120% 60% at 50% 0%,#0a6b42 0%,#054f30 55%,#033a23 100%) fixed;display:flex;flex-direction:column;align-items:center;\n  padding:calc(24px + env(safe-area-inset-top,0px)) max(16px,env(safe-area-inset-right,0px)) calc(24px + env(safe-area-inset-bottom,0px)) max(16px,env(safe-area-inset-left,0px))}\n.wrap{width:100%;max-width:380px;display:flex;flex-direction:column;align-items:center;gap:18px}\n.logo{width:170px;max-width:60%;height:auto;display:block}\nh1{font-weight:800;color:#fff;font-size:2.3rem;line-height:1.05;text-align:center;text-wrap:balance}\n.sub{text-align:center;font-size:.95rem;max-width:32ch;color:#e6f4ec}\n.left{font-weight:800;color:#fff;background:rgba(255,255,255,.12);border-radius:999px;padding:6px 14px;font-size:.85rem;font-variant-numeric:tabular-nums}\n.panel{width:100%;background:#fff;border-radius:20px;padding:22px 20px;box-shadow:0 14px 30px rgba(0,0,0,.3);display:flex;flex-direction:column;gap:14px}\n.panel .sub{color:var(--ink);max-width:none}\nlabel{font-weight:600;font-size:.85rem;display:flex;flex-direction:column;gap:6px}\ninput[type=text],input[type=tel],input[type=date]{font:inherit;font-size:1rem;padding:13px 14px;border:2px solid var(--line);border-radius:12px;background:#fff;color:var(--ink);width:100%}\ninput:focus{outline:none;border-color:var(--g)}\n.ph{display:flex;align-items:stretch;border:2px solid var(--line);border-radius:12px;overflow:hidden;background:#fff}\n.ph:focus-within{border-color:var(--g)}\n.ph span{display:flex;align-items:center;padding:0 12px;background:#eaf5ef;color:var(--g);font-weight:800;border-right:2px solid var(--line)}\n.ph input{border:0;border-radius:0;letter-spacing:.12em}\n.bill{border:2px dashed var(--line);border-radius:12px;padding:14px;text-align:center;cursor:pointer;color:var(--muted);font-weight:600;font-size:.9rem;display:flex;flex-direction:column;align-items:center;gap:8px}\n.bill:focus-within{border-color:var(--g)}\n.bill img{max-height:160px;max-width:100%;border-radius:8px}\n.bill input{position:absolute;width:1px;height:1px;opacity:0}\n.chk{flex-direction:row;align-items:flex-start;gap:10px;font-weight:400;font-size:.78rem;color:var(--muted)}\n.chk input{margin-top:3px;width:18px;height:18px;flex:none;accent-color:var(--g)}\n.chk a{color:var(--g)}\n.btn{font:inherit;font-weight:800;font-size:1.05rem;border:0;border-radius:999px;padding:15px;background:var(--g);color:#fff;cursor:pointer;box-shadow:0 4px 0 var(--g-dk);width:100%}\n.btn:active{transform:translateY(2px);box-shadow:0 2px 0 var(--g-dk)}\n.btn:disabled{opacity:.6}\n.btn:focus-visible{outline:3px solid var(--g2);outline-offset:2px}\n.fb{background:#1877f2;box-shadow:0 4px 0 #0d55b3;display:flex;align-items:center;justify-content:center;gap:10px}\n.fb svg{width:22px;height:22px;flex:none}\n.who{display:flex;align-items:center;gap:10px;font-size:.85rem;color:var(--muted)}\n.who b{color:var(--ink)}\n.note{font-size:.72rem;color:var(--muted);text-align:center}\n.err{color:#c62828;font-weight:600;font-size:.85rem;text-align:center}\n.err:empty{display:none}\n.card{position:relative;width:100%;max-width:320px;aspect-ratio:1/1;border-radius:22px;background:#fff;overflow:hidden;box-shadow:0 18px 36px rgba(0,0,0,.4),0 0 0 6px var(--g2);user-select:none}\n.prize{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:18px;gap:6px}\n.pack{height:58%;aspect-ratio:987/1246;max-width:80%;background:url(\"Viber%20Posting%20template%20-%202026-11-18T124156.317.png\") 48.67% 53.18%/202.6% auto no-repeat}\n.smile{width:46%;aspect-ratio:1;border-radius:50%;background:url(\"Smiling%20Blushing%20Emoji%20with%20Green%20Rays.png\") 48.74% 56.45%/170.67% auto no-repeat}\n.prize .t{font-weight:800;color:var(--g2);font-size:1.1rem}\n.prize .big{font-weight:800;color:var(--g);font-size:3.6rem;line-height:1}\n.prize .p{font-weight:800;color:var(--g);font-size:1.25rem;line-height:1.2}\n.prize.lose .p{color:var(--ink);font-size:1.4rem}\ncanvas{position:absolute;inset:0;width:100%;height:100%;touch-action:none;cursor:grab;transition:opacity .6s}\n.msg{text-align:center;font-size:.95rem;max-width:32ch;color:#fff}\n.shot{margin-top:4px;background:#fff3b0;color:#3a2a00;border:2px dashed #f3b331;border-radius:14px;padding:12px 14px;font-weight:700;line-height:1.4}\n.shot b{display:block;font-size:1.05rem;color:#054f30}\n.shot .nb{display:block;margin-top:6px}\n.shot a{color:#054f30;white-space:nowrap}\n.tag{display:inline-block;margin-top:8px;background:var(--g2);color:#fff;font-weight:800;padding:6px 14px;border-radius:999px;letter-spacing:.1em;font-size:.85rem}\n.foot{font-size:.7rem;color:#bfe0cd;text-align:center;max-width:36ch}\n.foot a{color:#fff}\n.spin{width:36px;height:36px;border:4px solid rgba(255,255,255,.25);border-top-color:#fff;border-radius:50%;animation:sp 1s linear infinite}\n@keyframes sp{to{transform:rotate(360deg)}}\n.cf{position:fixed;top:-12px;width:9px;height:14px;pointer-events:none;animation:fall linear forwards;z-index:5}\n@keyframes fall{to{transform:translateY(110vh) rotate(720deg)}}\n@media (prefers-reduced-motion:reduce){.cf{display:none}canvas{transition:none}.spin{animation:none}}\n";document.head.appendChild(_s);
document.body.insertAdjacentHTML('afterbegin',"<main class=\"wrap\">\n  <img class=\"logo\" src=\"LOGO%20HD.png\" alt=\"Equics\" width=\"170\" height=\"65\">\n  <h1>Scratch &amp; Win</h1>\n  <div class=\"left\" id=\"left\" hidden></div>\n\n  <!-- loading -->\n  <section id=\"sLoad\" style=\"padding:30px\"><div class=\"spin\" role=\"status\" aria-label=\"Loading\"></div></section>\n\n  <!-- ended -->\n  <section id=\"sEnded\" class=\"panel\" hidden>\n    <p class=\"sub\"><b>This promotion has ended.</b><br>All the scratch cards for this offer have been played. Thank you for your interest!</p>\n  </section>\n\n\n  <!-- step 2: form -->\n  <section id=\"sForm\" class=\"panel\" hidden>\n    <p class=\"sub\">Enter your details to unlock your scratch card. One play per bill and per mobile number.</p>\n    <button type=\"button\" class=\"btn fb\" id=\"fbFill\"><svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path fill=\"#fff\" d=\"M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.04V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.95.93-1.95 1.88v2.26h3.33l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07z\"/></svg>Fill my name with Facebook</button>\n    <p class=\"note\" style=\"margin-top:-6px\">Optional. You can also just type your name below.</p>\n    <form id=\"form\" novalidate style=\"display:flex;flex-direction:column;gap:14px\">\n      <label for=\"name\">Your name<input id=\"name\" type=\"text\" autocomplete=\"name\" maxlength=\"60\" required placeholder=\"Your full name\"></label>\n      <label for=\"phone\">Mobile number\n        <div class=\"ph\"><span>+960</span><input id=\"phone\" type=\"tel\" inputmode=\"numeric\" maxlength=\"7\" autocomplete=\"tel-national\" required placeholder=\"7XXXXXX\"></div>\n      </label>\n      <label for=\"inv\">Invoice number (7 digits)<input id=\"inv\" type=\"text\" inputmode=\"numeric\" maxlength=\"7\" required placeholder=\"Number on your bill\" style=\"letter-spacing:.12em\"></label>\n      <label class=\"chk\" for=\"agree\"><input id=\"agree\" type=\"checkbox\"> <span>I agree that Equics may store my name, mobile number and invoice number for this promotion. See the <a href=\"privacy.html\" target=\"_blank\">privacy policy</a>.</span></label>\n      <div id=\"err\" class=\"err\" role=\"alert\"></div>\n      <button id=\"go\" class=\"btn\" type=\"submit\">Unlock my card</button>\n    </form>\n  </section>\n\n  <!-- step 3: scratch -->\n  <section id=\"sPlay\" hidden style=\"width:100%;display:flex;flex-direction:column;align-items:center;gap:16px\">\n    <p class=\"sub\" id=\"hello\">Scratch the silver box to reveal your prize</p>\n    <div class=\"card\" id=\"card\"><div class=\"prize\" id=\"prize\"></div><canvas id=\"c\" aria-label=\"Scratch area\"></canvas></div>\n    <div class=\"msg\" id=\"msg\"></div>\n  </section>\n\n  <p class=\"foot\">Run by Equics. <a href=\"privacy.html\">Privacy policy</a></p>\n</main>");
const KEY = document.body.dataset.k;
const LABELS = {p5:"5% OFF", p10:"10% OFF", emma:"Emma Coconut Milk Powder", luck:"Better luck next time", pool:"random"};
const POOL = KEY === "pool";
const LABEL = LABELS[KEY];
const app = initializeApp({apiKey:"AIzaSyDwQig1AiRn8371VvvYQuuYMzYaL2_u43Y",authDomain:"equics-fb-scratch.firebaseapp.com",projectId:"equics-fb-scratch",storageBucket:"equics-fb-scratch.firebasestorage.app",messagingSenderId:"90462183189",appId:"1:90462183189:web:1f07f3eb9589a289cd131c"});
const auth = getAuth(app), db = getFirestore(app);
const $ = id => document.getElementById(id);
const show = id => { for (const s of ["sLoad","sEnded","sForm","sPlay"]) $(s).hidden = s !== id; };
const esc = s => String(s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const INFO = {
  "5% OFF": {win:true, html:'<div class="t">YOU WON!</div><div class="big">5%</div><div class="p">OFF</div>', how:"Show this screen at checkout to get 5% off."},
  "10% OFF": {win:true, html:'<div class="t">YOU WON!</div><div class="big">10%</div><div class="p">OFF</div>', how:"Show this screen at checkout to get 10% off."},
  "Emma Coconut Milk Powder": {win:true, html:'<div class="t">YOU WON!</div><div class="pack" role="img" aria-label="Emma Coconut Milk Powder 150g"></div><div class="p">Emma Coconut Milk Powder</div>', how:"Show this screen to our staff to collect your free Emma Coconut Milk Powder."},
  "Better luck next time": {win:false, html:'<div class="smile" role="img" aria-label="Smiling face"></div><div class="p">Better luck next time</div><div>Thank you!</div>', how:""}
};
let meta = null, user = null, billData = "", playerName = "", playerInvoice = "", PRIZE_LABEL = "";

async function loadMeta(){ const s = await getDoc(doc(db, "meta", KEY)); meta = s.exists() ? s.data() : null; }
function leftBadge(){ if (meta) { const l = Math.max(0, meta.total - meta.next); $("left").textContent = l + " of " + meta.total + " cards left"; $("left").hidden = false; } }
function ended(){ return !meta || !meta.open || meta.next >= meta.total; }

let triedAnon = false;
onAuthStateChanged(auth, async u => {
  if (!u) {
    if (triedAnon) return;
    triedAnon = true;
    try { await signInAnonymously(auth); } catch (e) { console.error(e); show("sEnded"); $("sEnded").querySelector("p").innerHTML = "<b>Could not connect.</b><br>Please check your internet and reload the page."; }
    return;
  }
  show("sLoad");
  user = u;
  try { await loadMeta(); } catch (e) { console.error(e); }
  leftBadge();
  let mine = null;
  try { const s = await getDoc(doc(db, "entries", u.uid)); if (s.exists()) mine = s.data(); } catch (e) { console.error(e); }
  if (mine) { playerName = mine.name; playerInvoice = mine.invoice || ""; let pz = mine.prize; if (mine.key === "pool") { try { pz = (await getDoc(doc(db, "pool", String(mine.seq)))).data().prize; } catch (e) { console.error(e); } } return showCard(pz, true); }
  if (ended()) return show("sEnded");
  show("sForm");
});

const RETURN = location.origin + location.pathname;
$("fbFill").onclick = () => {
  try { sessionStorage.setItem("draft", JSON.stringify({phone: $("phone").value, inv: $("inv").value})); } catch (e) {}
  location.href = "https://www.facebook.com/v19.0/dialog/oauth?" + new URLSearchParams({client_id: "28861562946873672", redirect_uri: RETURN, response_type: "token", scope: "public_profile"});
};
(async () => {
  const h = new URLSearchParams(location.hash.slice(1)), q = new URLSearchParams(location.search);
  const tok = h.get("access_token");
  if (tok || h.get("error") || q.get("error")) history.replaceState(null, "", RETURN);
  try { const d = JSON.parse(sessionStorage.getItem("draft") || "null"); if (d) { $("phone").value = d.phone || ""; $("inv").value = d.inv || ""; sessionStorage.removeItem("draft"); } } catch (e) {}
  if (tok) {
    try { const j = await (await fetch("https://graph.facebook.com/v19.0/me?fields=name&access_token=" + encodeURIComponent(tok))).json(); if (j && j.name) $("name").value = String(j.name).slice(0, 60); } catch (e) { console.error(e); }
  }
})();
function guessInvoice(v){
  if (/^(\d)\1+$/.test(v)) return true;
  const d = [...v].map(Number);
  if (d.every((x, i) => i === 0 || x === d[i-1] + 1) || d.every((x, i) => i === 0 || x === d[i-1] - 1)) return true;
  if (/^(\d\d)\1+\d?$/.test(v)) return true;
  return false;
}
$("inv").addEventListener("input", e => { const v = e.target.value.replace(/[^0-9]/g,"").slice(0,7); if (v !== e.target.value) e.target.value = v; });
$("phone").addEventListener("input", e => { const v = e.target.value.replace(/[^0-9]/g,"").slice(0,7); if (v !== e.target.value) e.target.value = v; });
function compress(file){
  return new Promise((res, rej) => {
    const img = new Image(), url = URL.createObjectURL(file);
    img.onload = () => {
      let max = 1280, q = 0.72, out = "";
      for (let i = 0; i < 6; i++) {
        const k = Math.min(1, max / Math.max(img.width, img.height));
        const c = document.createElement("canvas"); c.width = Math.round(img.width*k); c.height = Math.round(img.height*k);
        const x = c.getContext("2d"); x.fillStyle = "#fff"; x.fillRect(0,0,c.width,c.height); x.drawImage(img, 0, 0, c.width, c.height);
        out = c.toDataURL("image/jpeg", q);
        if (out.length < 700000) break;
        max = Math.round(max*0.8); q = Math.max(0.5, q - 0.06);
      }
      URL.revokeObjectURL(url); out.length < 950000 ? res(out) : rej(new Error("too big"));
    };
    img.onerror = () => { URL.revokeObjectURL(url); rej(new Error("bad image")); };
    img.src = url;
  });
}

$("form").addEventListener("submit", async e => {
  e.preventDefault();
  const name = $("name").value.trim().replace(/\s+/g," ");
  const local = $("phone").value.replace(/[^0-9]/g,"");
  const phone = "960" + local;
  const err = t => $("err").textContent = t;
  if (name.length < 2) return err("Please enter your name.");
  if (local.length !== 7) return err("Please enter your 7-digit mobile number after +960.");
  const invoice = $("inv").value.replace(/[^0-9]/g,"");
  if (invoice.length !== 7) return err("Please enter the 7-digit invoice number from your bill.");
  if (guessInvoice(invoice)) return err("Please enter the real invoice number from your bill.");
  if (!$("agree").checked) return err("Please tick the box to agree.");
  err(""); $("go").disabled = true; $("go").textContent = "Please wait…";
  try {
    try { const ph = await getDoc(doc(db, "phones", phone)); if (ph.exists()) throw {friendly: "This mobile number has already been used for this promotion."}; } catch (x) { if (x.friendly) throw x; }
    try { const iv = await getDoc(doc(db, "invoices", invoice)); if (iv.exists()) throw {friendly: "This bill has already been used. Please enter a new invoice number."}; } catch (x) { if (x.friendly) throw x; }
    let slot = -1;
    await runTransaction(db, async t => {
      const ms = await t.get(doc(db, "meta", KEY));
      const m = ms.data();
      if (!m || !m.open || m.next >= m.total) throw {friendly: "Sorry, all the cards for this offer have just been played."};
      const n = m.next, uid = user.uid;
      t.update(doc(db, "meta", KEY), {next: n + 1});
      if (POOL) t.update(doc(db, "pool", String(n)), {claimedBy: uid});
      t.set(doc(db, "entries", uid), {name, phone, key: KEY, prize: LABEL, seq: n, invoice, createdAt: serverTimestamp()});
      t.set(doc(db, "invoices", invoice), {uid});
      slot = n;
      t.set(doc(db, "phones", phone), {uid});
    });
    meta.next++; leftBadge();
    let won = LABEL;
    if (POOL) won = (await getDoc(doc(db, "pool", String(slot)))).data().prize;
    playerName = name; playerInvoice = invoice; showCard(won, false);
  } catch (x) {
    console.error(x);
    err(x && x.friendly ? x.friendly : "Something went wrong. Please check your internet and try again.");
    $("go").disabled = false; $("go").textContent = "Unlock my card";
  }
});

const cv = $("c"), ctx = cv.getContext("2d");
let done = false, down = false, last = null, PRIZE = null;
function showCard(prize, revealed){
  PRIZE_LABEL = prize; PRIZE = INFO[prize] || INFO["Better luck next time"];
  show("sPlay");
  $("prize").className = "prize" + (PRIZE.win ? "" : " lose");
  $("prize").innerHTML = PRIZE.html;
  if (revealed){ done = true; cv.hidden = true; $("hello").textContent = doneTitle(true); $("msg").innerHTML = msgHTML(); return; }
  $("hello").textContent = "Hi " + playerName + "! Scratch the silver box to reveal your prize";
  requestAnimationFrame(size);
  if (document.fonts) document.fonts.ready.then(() => { if (!done) size(); });
  addEventListener("resize", () => { if (!done) size(); });
}
function msgHTML(){
  if (!PRIZE.win) return "Thank you for playing, " + esc(playerName) + "!";
  return '<div class="shot"><b>Name: ' + esc(playerName) + '</b><b>Invoice no: ' + esc(playerInvoice) + '</b>'
    + '<span class="nb">\u{1F4F8} Take a screenshot and show it at the counter</span>'
    + '<span class="nb">\u{1F4C5} Claim your gift or voucher 1 day after playing</span>'
    + '<span class="nb">\u{1F4DE} Help: <a href="tel:+9607544651">+960 7544651</a></span></div>';
}
function doneTitle(again){ return PRIZE.win ? "Congratulations " + playerName + "!" : (again ? "You have already played. " : "") + "Your prize, " + playerName; }
function size(){
  const r = $("card").getBoundingClientRect(), dpr = devicePixelRatio || 1;
  cv.width = r.width*dpr; cv.height = r.height*dpr; ctx.setTransform(dpr,0,0,dpr,0,0);
  const w = r.width, h = r.height, g = ctx.createLinearGradient(0,0,w,h);
  g.addColorStop(0,"#b9c0c8"); g.addColorStop(.5,"#eef1f4"); g.addColorStop(1,"#a7aeb7");
  ctx.globalCompositeOperation = "source-over"; ctx.fillStyle = g; ctx.fillRect(0,0,w,h);
  ctx.fillStyle = "rgba(255,255,255,.4)"; for (let i=0;i<260;i++) ctx.fillRect(Math.random()*w, Math.random()*h, 2, 2);
  ctx.fillStyle = "#054f30"; ctx.textAlign = "center";
  ctx.font = "800 26px Poppins,sans-serif"; ctx.fillText("SCRATCH HERE", w/2, h/2-4);
  ctx.font = "400 14px Poppins,sans-serif"; ctx.fillText("use your finger", w/2, h/2+22);
}
function pos(e){ const r = cv.getBoundingClientRect(), t = e.touches ? e.touches[0] : e; return {x:t.clientX-r.left, y:t.clientY-r.top}; }
function scratch(p){ ctx.globalCompositeOperation = "destination-out"; ctx.lineWidth = 42; ctx.lineCap = "round"; ctx.beginPath(); ctx.moveTo((last||p).x,(last||p).y); ctx.lineTo(p.x+.1,p.y); ctx.stroke(); last = p; }
function cleared(){ const d = ctx.getImageData(0,0,cv.width,cv.height).data; let c=0,n=0; for (let i=3;i<d.length;i+=64){ n++; if (d[i]===0) c++; } return c/n; }
function reveal(){
  if (done) return; done = true; cv.style.opacity = 0; setTimeout(() => cv.hidden = true, 600);
  $("hello").textContent = doneTitle(false); $("msg").innerHTML = msgHTML(); if (PRIZE.win) confetti();
}
function confetti(){ const cols = ["#00a84f","#ffffff","#7be0a8","#f3b331"];
  for (let i=0;i<80;i++){ const s = document.createElement("div"); s.className = "cf"; s.style.left = Math.random()*100+"vw"; s.style.background = cols[i%4];
    s.style.animationDuration = (2+Math.random()*2)+"s"; s.style.animationDelay = Math.random()*.5+"s"; document.body.appendChild(s); setTimeout(() => s.remove(), 5000); } }
function start(e){ if (done) return; down = true; last = null; scratch(pos(e)); e.preventDefault(); }
function move(e){ if (!down || done) return; scratch(pos(e)); e.preventDefault(); }
function end(){ if (!down) return; down = false; last = null; if (cleared() > 0.5) reveal(); }
cv.addEventListener("mousedown", start); cv.addEventListener("mousemove", move); addEventListener("mouseup", end);
cv.addEventListener("touchstart", start, {passive:false}); cv.addEventListener("touchmove", move, {passive:false}); addEventListener("touchend", end);
