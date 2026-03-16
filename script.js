// ═══════════════════════════════════════════════
//  COLLECTIBLES AUCTION HOUSE — script.js
// ═══════════════════════════════════════════════

// ── All auction items data (single source of truth) ──
const AUCTION_ITEMS = [
  { id:'vintage-coin',     title:'Vintage Coin',        desc:'19th-century silver coin in excellent condition.',              img:'https://images.unsplash.com/photo-1768337099514-83d3c0f2b726?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', start:100,  watchers:7,  badge:'live', category:'Coins', era:'19th Century', condition:'Excellent', seller:'A. Mehta' },
  { id:'antique-clock',    title:'Antique Clock',        desc:'Victorian mahogany mantel clock, fully restored.',              img:'https://images.unsplash.com/photo-1627307284579-327ea0c7de14?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', start:300,  watchers:12, badge:'live', category:'Watches & Clocks', era:'Victorian Era', condition:'Restored', seller:'P. Singh' },
  { id:'rare-stamp',       title:'Rare Stamp',           desc:'1890s inverted print stamp — a true collector\'s gem.',         img:'https://images.unsplash.com/photo-1767635360163-0633939b9f4b?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', start:200,  watchers:4,  badge:'live', category:'Stamps', era:'1890s', condition:'Very Good', seller:'R. Iyer' },
  { id:'pocket-watch',     title:'Pocket Watch',         desc:'Gold-plated Swiss pocket watch, engraved case.',               img:'https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', start:150,  watchers:9,  badge:'live', category:'Watches & Clocks', era:'Early 20th C.', condition:'Excellent', seller:'K. Joshi' },
  { id:'classic-painting', title:'Classic Painting',     desc:'Oil on canvas, signed original from the 1920s.',               img:'https://images.unsplash.com/photo-1705299493174-34f5fd95f51a?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', start:500,  watchers:19, badge:'hot',  category:'Art', era:'1920s', condition:'Good', seller:'M. D\'Souza' },
  { id:'war-medal-set',    title:'War Medal Set',        desc:'Authenticated WWII medals with provenance documents.',          img:'https://images.unsplash.com/photo-1613825787641-2dbbd4f96a1c?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', start:400,  watchers:15, badge:'hot',  category:'Weapons & Militaria', era:'WWII 1940s', condition:'Very Good', seller:'H. Sharma' },
  { id:'bronze-sculpture', title:'Bronze Sculpture',     desc:'18th-century European bronze figurine, museum quality.',       img:'https://images.unsplash.com/photo-1691317836447-2710cac29f1e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', start:750,  watchers:22, badge:'hot',  category:'Sculptures', era:'18th Century', condition:'Excellent', seller:'L. Fernandes' },
  { id:'vintage-camera',   title:'Vintage Camera',       desc:'1950s Leica rangefinder, fully functional with leather case.', img:'https://images.unsplash.com/photo-1512390225428-a9d51c817f94?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', start:180,  watchers:11, badge:'live', category:'Other', era:'1950s', condition:'Very Good', seller:'T. Bose' },
  { id:'antique-vase',     title:'Antique Vase',         desc:'Ming dynasty–style hand-painted porcelain vase, 19th century.',img:'https://images.unsplash.com/photo-1695902047073-796e00ccd35f?q=80&w=769&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', start:620,  watchers:16, badge:'hot',  category:'Furniture & Décor', era:'19th Century', condition:'Good', seller:'N. Rao' },
  { id:'vintage-compass',  title:'Antique Compass',      desc:'Brass maritime compass, 1870s, with original wooden box.',     img:'https://images.unsplash.com/photo-1769776400503-6ad467d68ac3?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', start:90,   watchers:6,  badge:'live', category:'Other', era:'1870s', condition:'Good', seller:'S. Nair' },
  { id:'tribal-mask',      title:'African Tribal Mask',  desc:'Hand-carved ceremonial mask, early 20th-century West Africa.', img:'https://plus.unsplash.com/premium_photo-1661274142083-c2eca56b41b7?q=80&w=822&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', start:340,  watchers:13, badge:'live', category:'Sculptures', era:'Early 20th C.', condition:'Good', seller:'O. Diallo' },
  { id:'antique-violin',   title:'Antique Violin',       desc:'19th-century Italian violin with original bow and hard case.',  img:'https://images.unsplash.com/photo-1764463263233-b3909ded3228?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', start:1200, watchers:28, badge:'hot',  category:'Other', era:'19th Century', condition:'Restored', seller:'G. Moretti' },
  { id:'vintage-globe',    title:'Vintage Globe',        desc:'Hand-drawn terrestrial globe on mahogany stand, circa 1890.',  img:'https://images.unsplash.com/photo-1771797628619-926785541b8d?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', start:250,  watchers:8,  badge:'live', category:'Maps & Documents', era:'1890s', condition:'Very Good', seller:'E. Clarke' },
  { id:'samurai-sword',    title:'Samurai Sword',        desc:'Edo-period katana with lacquered scabbard, certified authentic.',img:'https://images.unsplash.com/photo-1643496265069-faf6ed01a1ad?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', start:480,  watchers:24, badge:'hot',  category:'Weapons & Militaria', era:'Edo Period', condition:'Excellent', seller:'Y. Tanaka' },
  { id:'antique-typewriter',title:'Antique Typewriter',  desc:'1920s Underwood No. 5 in working condition, original decals intact.',img:'https://images.unsplash.com/photo-1622132406635-5820763fc4cd?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', start:130, watchers:10, badge:'live', category:'Other', era:'1920s', condition:'Good', seller:'B. Hughes' },
  { id:'jade-figurine',    title:'Jade Figurine',        desc:'Qing dynasty carved jade Buddha, deep green nephrite.',         img:'https://images.unsplash.com/photo-1603253192413-b2e66e81a2e5?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', start:890,  watchers:17, badge:'hot',  category:'Sculptures', era:'Qing Dynasty', condition:'Excellent', seller:'W. Chen' },
  { id:'antique-map',      title:'Antique Map',          desc:'Hand-engraved 1780s map of the Indian subcontinent, framed.',   img:'https://images.unsplash.com/photo-1603253192413-b2e66e81a2e5?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', start:220,  watchers:5,  badge:'live', category:'Maps & Documents', era:'1780s', condition:'Good', seller:'V. Pillai' },
  { id:'persian-rug',      title:'Persian Rug',          desc:'Early 20th-century hand-knotted Tabriz rug, wool on cotton.',   img:'https://images.unsplash.com/photo-1652634213812-f0deeb1de78e?q=80&w=1025&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', start:560,  watchers:20, badge:'hot',  category:'Furniture & Décor', era:'Early 20th C.', condition:'Very Good', seller:'F. Hosseini' },
  { id:'vintage-telescope', title:'Brass Telescope',     desc:'Victorian naval brass telescope, extends to 80cm, working optics.',img:'https://images.unsplash.com/photo-1764605357421-6bd96a1f9991?q=80&w=1333&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', start:310, watchers:14, badge:'live', category:'Other', era:'Victorian Era', condition:'Good', seller:'C. Wallace' },
  { id:'roman-coin-set',   title:'Roman Coin Set',       desc:'Collection of 12 authenticated Roman denarii, 1st–3rd century AD.',img:'https://images.unsplash.com/photo-1579468118530-81d99a432513?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', start:2500, watchers:33, badge:'hot', category:'Coins', era:'1st–3rd Century AD', condition:'Mint', seller:'D. Romano' },
];

// Live bid state
const bidState = {};
AUCTION_ITEMS.forEach(item => { bidState[item.id] = item.start; });

// Watcher counts
const watcherCounts = {};
AUCTION_ITEMS.forEach(item => { watcherCounts[item.id] = item.watchers; });

// ── Watchlist storage ──
const WL_KEY = 'cah_watchlist';
function getWL()  { try { return JSON.parse(localStorage.getItem(WL_KEY)) || []; } catch { return []; } }
function saveWL(l){ localStorage.setItem(WL_KEY, JSON.stringify(l)); }

function updateWLBadge() {
  const n = getWL().length;
  document.querySelectorAll('#watchlistCount').forEach(el => {
    el.textContent = n;
    el.style.display = n === 0 ? 'none' : 'inline-flex';
  });
}

// ── Active Nav ──
(function () {
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('nav a').forEach(a => {
    if (a.getAttribute('href') === page) a.classList.add('active');
  });
})();

// ── Toast ──
function showToast(msg) {
  let t = document.getElementById('toast');
  if (!t) { t = document.createElement('div'); t.id = 'toast'; document.body.appendChild(t); }
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.remove('show'), 3200);
}

// ── Welcome Banner ──
const banner = document.getElementById('welcomeBanner');
if (banner) { setTimeout(() => banner.classList.add('hide'), 3000); setTimeout(() => banner.remove(), 3700); }

// ── Countdown ──
(function () {
  const h = document.getElementById('cd-hours'), m = document.getElementById('cd-mins'), s = document.getElementById('cd-secs');
  if (!h) return;
  function getNext() {
    const now = new Date(), ist = new Date(now.getTime() + 5.5*3600000), t = new Date(ist);
    t.setUTCHours(14,30,0,0); if (ist >= t) t.setUTCDate(t.getUTCDate()+1); return t;
  }
  function tick() {
    const d = getNext() - new Date(); if (d<=0){h.textContent=m.textContent=s.textContent='00';return;}
    h.textContent=String(Math.floor(d/3600000)).padStart(2,'0');
    m.textContent=String(Math.floor((d%3600000)/60000)).padStart(2,'0');
    s.textContent=String(Math.floor((d%60000)/1000)).padStart(2,'0');
  }
  tick(); setInterval(tick,1000);
})();

// ── Stats counter ──
(function () {
  const items = document.querySelectorAll('.stat-number'); if (!items.length) return;
  const seen = new Set();
  const obs = new IntersectionObserver(entries => {
    entries.forEach(({isIntersecting,target}) => {
      if (!isIntersecting || seen.has(target)) return; seen.add(target);
      const end = parseInt(target.dataset.target,10); let cur=0;
      const t = setInterval(()=>{ cur+=end/60; if(cur>=end){target.textContent=end.toLocaleString();clearInterval(t);}else target.textContent=Math.floor(cur).toLocaleString(); },30);
    });
  },{threshold:0.3});
  items.forEach(el=>obs.observe(el));
})();

// ── Gavel Sound ──
function playGavel() {
  try {
    const ctx = new (window.AudioContext||window.webkitAudioContext)();
    const buf = ctx.createBuffer(1,ctx.sampleRate*0.15,ctx.sampleRate), d=buf.getChannelData(0);
    for(let i=0;i<d.length;i++) d[i]=(Math.random()*2-1)*Math.exp(-i/(ctx.sampleRate*0.03));
    const src=ctx.createBufferSource(); src.buffer=buf;
    const f=ctx.createBiquadFilter(); f.type='lowpass'; f.frequency.value=400;
    const g=ctx.createGain(); g.gain.setValueAtTime(1.2,ctx.currentTime); g.gain.exponentialRampToValueAtTime(0.001,ctx.currentTime+0.14);
    src.connect(f); f.connect(g); g.connect(ctx.destination); src.start();
    const osc=ctx.createOscillator(), g2=ctx.createGain();
    osc.frequency.value=180; osc.type='sine';
    g2.gain.setValueAtTime(0.25,ctx.currentTime+0.01); g2.gain.exponentialRampToValueAtTime(0.001,ctx.currentTime+0.18);
    osc.connect(g2); g2.connect(ctx.destination); osc.start(ctx.currentTime+0.01); osc.stop(ctx.currentTime+0.18);
  } catch(e){}
}

// ── Confetti ──
function launchConfetti() {
  const canvas = document.getElementById('confettiCanvas'); if (!canvas) return;
  canvas.style.display='block'; const ctx=canvas.getContext('2d');
  canvas.width=window.innerWidth; canvas.height=window.innerHeight;
  const colors=['#C9963A','#F0C96A','#e05a7a','#4ecdc4','#fff','#ff6b35','#a8e6cf'];
  const pieces=Array.from({length:140},()=>({
    x:Math.random()*canvas.width, y:Math.random()*-canvas.height*0.5-20,
    w:Math.random()*10+5, h:Math.random()*6+3,
    color:colors[Math.floor(Math.random()*colors.length)],
    rot:Math.random()*Math.PI*2, vx:(Math.random()-0.5)*3, vy:Math.random()*4+2,
    vr:(Math.random()-0.5)*0.15, opacity:1
  }));
  let frame, elapsed=0;
  function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height); elapsed++; let alive=false;
    pieces.forEach(p=>{
      p.x+=p.vx; p.y+=p.vy; p.rot+=p.vr; p.vy+=0.08;
      if(elapsed>90) p.opacity-=0.015;
      if(p.opacity>0&&p.y<canvas.height+20){
        alive=true; ctx.save(); ctx.globalAlpha=Math.max(0,p.opacity);
        ctx.translate(p.x,p.y); ctx.rotate(p.rot); ctx.fillStyle=p.color;
        ctx.fillRect(-p.w/2,-p.h/2,p.w,p.h); ctx.restore();
      }
    });
    if(alive) frame=requestAnimationFrame(draw);
    else { ctx.clearRect(0,0,canvas.width,canvas.height); canvas.style.display='none'; }
  }
  cancelAnimationFrame(frame); draw();
}

// ── Build auction card HTML ──
function buildCard(item) {
  const wl = getWL();
  const saved = wl.includes(item.id);
  const badgeClass = item.badge === 'hot' ? 'card-badge hot-badge' : 'card-badge';
  const badgeLabel = item.badge === 'hot' ? '🔥 Hot' : '🟡 Live';
  const currentBid = bidState[item.id] || item.start;
  const bidLabel = currentBid > item.start ? 'Current Bid' : 'Starting Bid';
  return `
    <div class="card auction-card" data-id="${item.id}" data-start="${item.start}" data-watchers="${item.watchers}">
      <div class="card-img-wrap">
        <img src="${item.img}" alt="${item.title}" class="card-img" loading="lazy">
        <button class="watchlist-btn${saved?' saved':''}" aria-label="Save to watchlist">${saved?'♥':'♡'}</button>
        <span class="${badgeClass}">${badgeLabel}</span>
      </div>
      <div class="card-body">
        <div class="watcher-bar"><span class="pulse-dot"></span><span class="watcher-text">${watcherCounts[item.id]||item.watchers} people watching</span></div>
        <h3>${item.title}</h3>
        <p>${item.desc}</p>
        <span class="bid-amount">${bidLabel}: $${currentBid.toLocaleString()}</span>
        <button class="bid-btn">🔨 Bid Now</button>
      </div>
    </div>`;
}

// ── Attach card events (bid + watchlist) ──
function attachCardEvents(container) {
  container.querySelectorAll('.auction-card').forEach(card => {
    const id = card.dataset.id;

    // Watchlist btn
    const wBtn = card.querySelector('.watchlist-btn');
    if (wBtn) {
      wBtn.addEventListener('click', e => {
        e.stopPropagation();
        let list = getWL(), idx = list.indexOf(id);
        const name = card.querySelector('h3').textContent;
        if (idx===-1) { list.push(id); wBtn.classList.add('saved'); wBtn.textContent='♥'; showToast('❤️ "'+name+'" added to Watchlist!'); }
        else { list.splice(idx,1); wBtn.classList.remove('saved'); wBtn.textContent='♡'; showToast('🗑️ "'+name+'" removed from Watchlist.'); }
        saveWL(list); updateWLBadge();
        // Refresh watchlist page if open
        if (typeof renderWatchlist === 'function') renderWatchlist();
      });
    }

    // Bid btn
    const bidBtn = card.querySelector('.bid-btn');
    if (bidBtn) {
      let bidCount = 0;
      bidBtn.addEventListener('click', e => {
        e.stopPropagation();
        bidState[id] = (bidState[id] || parseInt(card.dataset.start,10)) + 25;
        bidCount++;
        card.querySelector('.bid-amount').textContent = 'Current Bid: $' + bidState[id].toLocaleString();
        playGavel();
        if (bidCount % 3 === 0) { launchConfetti(); showToast('🎉 Highest bidder! Current bid: $' + bidState[id].toLocaleString()); }
        else showToast('🔨 Bid placed! Current bid: $' + bidState[id].toLocaleString());
        card.style.boxShadow = '0 0 0 3px var(--gold)';
        setTimeout(() => card.style.boxShadow = '', 600);
      });
    }

    // Click card → item detail
    card.addEventListener('click', () => {
      window.location.href = 'item.html?id=' + id;
    });
    card.style.cursor = 'pointer';
  });
}

// ── Watcher fluctuation ──
function startWatcherFluctuation(container) {
  setInterval(() => {
    container.querySelectorAll('.auction-card[data-id]').forEach(card => {
      const id = card.dataset.id;
      const txt = card.querySelector('.watcher-text'); if (!txt) return;
      if (Math.random() < 0.35) {
        watcherCounts[id] = Math.max(1, watcherCounts[id] + (Math.random()<0.55?1:-1));
        txt.textContent = watcherCounts[id] + ' people watching';
        txt.style.transform='scale(1.15)'; setTimeout(()=>txt.style.transform='',300);
      }
    });
  }, 3200);
}

// ══════════════════════════════════
//  PAGE: product.html — Auctions
// ══════════════════════════════════
const auctionGrid = document.getElementById('auctionGrid');
if (auctionGrid) {
  let currentItems = [...AUCTION_ITEMS];

  function renderGrid(items) {
    auctionGrid.innerHTML = items.map(buildCard).join('');
    attachCardEvents(auctionGrid);
    const countEl = document.getElementById('auctionCount');
    if (countEl) countEl.textContent = items.length + ' items live';
  }

  renderGrid(currentItems);
  startWatcherFluctuation(auctionGrid);

  // Sort
  const sortSel = document.getElementById('sortSelect');
  if (sortSel) {
    sortSel.addEventListener('change', () => {
      let sorted = [...AUCTION_ITEMS];
      if (sortSel.value === 'price-asc')  sorted.sort((a,b)=>(bidState[a.id]||a.start)-(bidState[b.id]||b.start));
      if (sortSel.value === 'price-desc') sorted.sort((a,b)=>(bidState[b.id]||b.start)-(bidState[a.id]||a.start));
      if (sortSel.value === 'watchers')   sorted.sort((a,b)=>watcherCounts[b.id]-watcherCounts[a.id]);
      if (sortSel.value === 'ending')     sorted.sort(()=>Math.random()-0.5);
      renderGrid(sorted);
    });
  }
}

// ══════════════════════════════════
//  PAGE: watchlist.html
// ══════════════════════════════════
function renderWatchlist() {
  const grid = document.getElementById('watchlistGrid');
  const empty = document.getElementById('watchlistEmpty');
  if (!grid) return;
  const list = getWL();
  const items = AUCTION_ITEMS.filter(i => list.includes(i.id));
  if (items.length === 0) {
    grid.innerHTML = ''; grid.style.display='none'; if(empty) empty.style.display='block';
  } else {
    if(empty) empty.style.display='none'; grid.style.display='flex';
    grid.innerHTML = items.map(buildCard).join('');
    attachCardEvents(grid);
    startWatcherFluctuation(grid);
  }
}
if (document.getElementById('watchlistGrid')) {
  renderWatchlist();
}

// ══════════════════════════════════
//  PAGE: item.html — Detail
// ══════════════════════════════════
const detailPage = document.getElementById('itemDetailPage');
if (detailPage) {
  const params = new URLSearchParams(location.search);
  const id = params.get('id');
  const item = AUCTION_ITEMS.find(i => i.id === id);

  if (item) {
    const currentBid = bidState[item.id] || item.start;
    const wl = getWL();
    const saved = wl.includes(item.id);

    // Fake bid history
    const bidHistory = [
      { initials:'YB', name:'You (Highest)', ago:'just now',     amount: currentBid },
      { initials:'MK', name:'M. Kumar',      ago:'2 min ago',    amount: currentBid - 25 },
      { initials:'SP', name:'S. Patel',      ago:'5 min ago',    amount: currentBid - 50 },
      { initials:'RJ', name:'R. Jones',      ago:'11 min ago',   amount: currentBid - 75 },
      { initials:'AL', name:'A. Lee',        ago:'18 min ago',   amount: item.start },
    ].filter(b => b.amount >= item.start);

    detailPage.innerHTML = `
      <a href="product.html" class="item-detail-back">← Back to Auctions</a>
      <div class="item-detail-layout">
        <div class="item-detail-img-wrap">
          <img src="${item.img}" alt="${item.title}">
          <span class="item-detail-badge">${item.badge==='hot'?'🔥 Hot':'🟡 Live'}</span>
        </div>
        <div class="item-detail-info">
          <div class="item-detail-watcher">
            <span class="pulse-dot"></span>
            <span class="watcher-text" id="detailWatcher">${watcherCounts[id]} people watching</span>
          </div>
          <h1>${item.title}</h1>
          <div class="item-detail-price" id="detailPrice">$${currentBid.toLocaleString()}</div>
          <div class="item-detail-price-label">Current Bid</div>
          <p class="item-detail-desc">${item.desc}</p>
          <div class="item-detail-meta">
            <div class="meta-item"><label>Category</label><span>${item.category}</span></div>
            <div class="meta-item"><label>Era / Period</label><span>${item.era}</span></div>
            <div class="meta-item"><label>Condition</label><span>${item.condition}</span></div>
            <div class="meta-item"><label>Seller</label><span>${item.seller}</span></div>
          </div>
          <button class="item-detail-bid-btn" id="detailBidBtn">🔨 Place Bid (+$25)</button>
          <button class="item-detail-watch-btn" id="detailWatchBtn">${saved?'♥ Saved to Watchlist':'♡ Add to Watchlist'}</button>
        </div>
      </div>
      <div class="bid-history">
        <h2>Bid History</h2>
        <div class="bid-history-list" id="bidHistoryList">
          ${bidHistory.map((b,i) => `
            <div class="bid-row">
              <div class="bid-row-left">
                <div class="bid-avatar">${b.initials}</div>
                <div>
                  <div class="bid-bidder">${b.name}${i===0?'<span class="highest-badge">Highest</span>':''}</div>
                  <div class="bid-time">${b.ago}</div>
                </div>
              </div>
              <div class="bid-amount-val">$${b.amount.toLocaleString()}</div>
            </div>`).join('')}
        </div>
      </div>`;

    // Bid button
    let detailBidCount = 0;
    document.getElementById('detailBidBtn').addEventListener('click', () => {
      bidState[id] += 25; detailBidCount++;
      document.getElementById('detailPrice').textContent = '$' + bidState[id].toLocaleString();
      playGavel();
      // Prepend new bid row
      const list = document.getElementById('bidHistoryList');
      const row = document.createElement('div'); row.className='bid-row';
      row.innerHTML = `<div class="bid-row-left"><div class="bid-avatar">YB</div><div><div class="bid-bidder">You (Highest)<span class="highest-badge">Highest</span></div><div class="bid-time">just now</div></div></div><div class="bid-amount-val">$${bidState[id].toLocaleString()}</div>`;
      list.insertBefore(row, list.firstChild);
      if (detailBidCount % 3 === 0) { launchConfetti(); showToast('🎉 Highest bidder! $' + bidState[id].toLocaleString()); }
      else showToast('🔨 Bid placed! $' + bidState[id].toLocaleString());
    });

    // Watch button
    document.getElementById('detailWatchBtn').addEventListener('click', () => {
      let list = getWL(), idx = list.indexOf(id), btn = document.getElementById('detailWatchBtn');
      if (idx===-1) { list.push(id); btn.textContent='♥ Saved to Wishlist'; showToast('❤️ "'+item.title+'" added to Watchlist!'); }
      else { list.splice(idx,1); btn.textContent='♡ Add to Watchlist'; showToast('🗑️ Removed from Watchlist.'); }
      saveWL(list); updateWLBadge();
    });

    // Watcher fluctuation
    setInterval(()=>{
      if(Math.random()<0.4){
        watcherCounts[id]=Math.max(1,watcherCounts[id]+(Math.random()<0.6?1:-1));
        const el=document.getElementById('detailWatcher');
        if(el) el.textContent=watcherCounts[id]+' people watching';
      }
    },3500);
  } else {
    detailPage.innerHTML = '<div style="text-align:center;padding:80px 20px;"><h2>Item not found</h2><p><a href="product.html">← Back to Auctions</a></p></div>';
  }
}

// ══════════════════════════════════
//  PAGE: seller.html
// ══════════════════════════════════
const sellerForm = document.getElementById('sellerForm');
if (sellerForm) {
  // Photo preview
  const photosInput = document.getElementById('itemPhotos');
  const previews = document.getElementById('photoPreviews');
  if (photosInput) {
    photosInput.addEventListener('change', () => {
      previews.innerHTML = '';
      Array.from(photosInput.files).slice(0,10).forEach(file => {
        const reader = new FileReader();
        reader.onload = e => { const img = document.createElement('img'); img.src = e.target.result; previews.appendChild(img); };
        reader.readAsDataURL(file);
      });
    });
    // Drag & drop
    const zone = document.getElementById('photoUploadZone');
    if (zone) {
      zone.addEventListener('dragover', e => { e.preventDefault(); zone.style.borderColor='var(--gold)'; });
      zone.addEventListener('dragleave', () => zone.style.borderColor='');
      zone.addEventListener('drop', e => { e.preventDefault(); zone.style.borderColor=''; photosInput.files = e.dataTransfer.files; photosInput.dispatchEvent(new Event('change')); });
    }
  }
  sellerForm.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('itemName').value.trim();
    showToast('✅ "'+name+'" submitted! Our team will contact you within 48 hours.');
    sellerForm.reset();
    if(previews) previews.innerHTML='';
    window.scrollTo({top:0,behavior:'smooth'});
  });
}

// ══════════════════════════════════
//  TESTIMONIALS CAROUSEL
// ══════════════════════════════════
(function(){
  const track = document.getElementById('testimonialsTrack');
  const dotsContainer = document.getElementById('carouselDots');
  const prevBtn = document.getElementById('carouselPrev');
  const nextBtn = document.getElementById('carouselNext');
  if (!track) return;

  const cards = track.querySelectorAll('.testimonial-card');
  let current = 0;
  const total = cards.length;

  // Build dots
  cards.forEach((_,i) => {
    const dot = document.createElement('button');
    dot.className = 'carousel-dot' + (i===0?' active':'');
    dot.addEventListener('click', ()=>goTo(i));
    dotsContainer.appendChild(dot);
  });

  function goTo(idx){
    current = (idx + total) % total;
    track.style.transform = 'translateX(-' + (current * 100) + '%)';
    track.style.transition = 'transform 0.45s cubic-bezier(0.25,0.46,0.45,0.94)';
    dotsContainer.querySelectorAll('.carousel-dot').forEach((d,i)=>d.classList.toggle('active',i===current));
  }

  prevBtn && prevBtn.addEventListener('click', ()=>goTo(current-1));
  nextBtn && nextBtn.addEventListener('click', ()=>goTo(current+1));

  // Auto-advance every 5s
  let timer = setInterval(()=>goTo(current+1), 5000);
  track.parentElement.addEventListener('mouseenter',()=>clearInterval(timer));
  track.parentElement.addEventListener('mouseleave',()=>{ timer=setInterval(()=>goTo(current+1),5000); });
})();

// ══════════════════════════════════
//  CONTACT FORM
// ══════════════════════════════════
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    showToast('✅ Thanks, ' + name + '! We\'ll reply within 24 hours.');
    contactForm.reset();
  });
}

// ══════════════════════════════════
//  FOOTER INJECTION
// ══════════════════════════════════
(function(){
  const existing = document.querySelector('footer'); if (!existing) return;
  existing.outerHTML = `<footer>
    <div class="footer-main">
      <div class="footer-brand">
        <a href="index.html" class="footer-logo">
          <div class="logo-icon">🏆</div>
          <div class="logo-text"><span>Collectibles</span><span>Auction House</span></div>
        </a>
        <p>Your trusted destination for rare, authenticated collectibles — from vintage coins to antique art.</p>
        <div class="social-links">
          <a href="https://www.instagram.com/" target="_blank" rel="noopener" aria-label="Instagram"><svg viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.206.054 2.003.24 2.47.403a4.92 4.92 0 0 1 1.772 1.153 4.903 4.903 0 0 1 1.153 1.772c.163.467.35 1.264.403 2.47.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.054 1.206-.24 2.003-.403 2.47a4.903 4.903 0 0 1-1.153 1.772 4.92 4.92 0 0 1-1.772 1.153c-.467.163-1.264.35-2.47.403-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.206-.054-2.003-.24-2.47-.403a4.92 4.92 0 0 1-1.772-1.153A4.903 4.903 0 0 1 2.566 19.47c-.163-.467-.35-1.264-.403-2.47C2.105 15.734 2.093 15.354 2.093 12s.012-3.584.07-4.85c.054-1.206.24-2.003.403-2.47A4.903 4.903 0 0 1 3.72 2.908 4.92 4.92 0 0 1 5.492 1.755c.467-.163 1.264-.35 2.47-.403C9.228 2.175 9.608 2.163 12 2.163zm0 4.837a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 8.2a3.2 3.2 0 1 1 0-6.4 3.2 3.2 0 0 1 0 6.4zm6.406-9.445a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z"/></svg></a>
          <a href="https://www.facebook.com/" target="_blank" rel="noopener" aria-label="Facebook"><svg viewBox="0 0 24 24"><path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.313 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.874v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/></svg></a>
          <a href="https://www.twitter.com/" target="_blank" rel="noopener" aria-label="Twitter/X"><svg viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a>
          <a href="https://www.linkedin.com/" target="_blank" rel="noopener" aria-label="LinkedIn"><svg viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg></a>
          <a href="https://www.youtube.com/" target="_blank" rel="noopener" aria-label="YouTube"><svg viewBox="0 0 24 24"><path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/></svg></a>
        </div>
      </div>
      <div class="footer-col">
        <h4>Quick Links</h4>
        <ul>
          <li><a href="index.html">Home</a></li>
          <li><a href="about.html">About Us</a></li>
          <li><a href="product.html">Live Auctions</a></li>
          <li><a href="service.html">Our Services</a></li>
          <li><a href="watchlist.html">My Wishlist</a></li>
          <li><a href="seller.html">Sell an Item</a></li>
          <li><a href="contact.html">Contact</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Services</h4>
        <ul>
          <li><a href="service.html">Item Authentication</a></li>
          <li><a href="service.html">Auction Hosting</a></li>
          <li><a href="service.html">Secure Payments</a></li>
          <li><a href="service.html">Collector Support</a></li>
          <li><a href="seller.html">List an Item</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Contact Us</h4>
        <div class="footer-contact-info">
          <div class="footer-contact-item"><svg class="contact-icon" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg><span>Mumbai, Maharashtra,<br>India — 400 001</span></div>
          <div class="footer-contact-item"><svg class="contact-icon" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg><a href="mailto:bidemporiumofficial@gmail.com">bidemporiumofficial@gmail.com</a></div>
          <div class="footer-contact-item"><svg class="contact-icon" viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg><a href="tel:+919322519291">+91 93 2251 9291</a></div>
          <div class="footer-contact-item"><svg class="contact-icon" viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm4.24 16L12 15.45 7.77 18l1.12-4.81-3.73-3.23 4.92-.42L12 5l1.92 4.53 4.92.42-3.73 3.23L16.23 18z"/></svg><span>Mon – Sat: 10am – 7pm IST</span></div>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <p>© 2025 Collectibles Auction House. All rights reserved.</p>
      <div class="footer-bottom-links"><a href="#">Privacy Policy</a><a href="#">Terms of Service</a><a href="#">Cookie Policy</a></div>
    </div>
  </footer>`;
})();

// Init badge on all pages
updateWLBadge();
