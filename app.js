// Digital Film Making Studio - Main JS
// Language: English / Bangla / French

let langs = ['en', 'bn', 'fr'];
let langIndex = 0;
let currentLang = 'en';

function toggleLang() {
  langIndex = (langIndex + 1) % 3;
  currentLang = langs[langIndex];
  document.getElementById('langBtn').textContent =
    currentLang === 'en' ? 'বাংলা / BN' :
    currentLang === 'bn' ? 'Français / FR' : 'English / EN';
  document.querySelectorAll('[data-en]').forEach(el => {
    let val = el.getAttribute('data-' + currentLang);
    if (val) el.textContent = val;
  });
}

function showTab(e, id) {
  document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  e.target.classList.add('active');
}

function generateScript() {
  const title = document.getElementById('f_title').value || 'Untitled Film';
  const genre = document.getElementById('f_genre').value;
  const dur = +document.getElementById('f_duration').value || 10;
  const story = document.getElementById('f_story').value || 'Your story...';
  const scenes = Math.ceil(dur / 2);
  document.getElementById('script_res').innerHTML =
    '<b>' + title + '</b> - ' + genre + ' - ' + dur + ' min<br><br><b>Story:</b> ' + story +
    '<br><br>1. Opening - Character + Problem<br>2. Conflict - Tension rises<br>3. Climax - Biggest twist<br>4. Ending - Emotional<br><br>Scenes: ~' + scenes + ' | Pages: ~' + dur;
}

let board = [];
function addStoryboard() {
  const scene = document.getElementById('sb_scene').value;
  const shot = document.getElementById('sb_shot').value;
  const desc = document.getElementById('sb_desc').value || 'No description';
  board.push('Scene ' + scene + ' | ' + shot + '<br>' + desc);
  document.getElementById('sb_list').innerHTML =
    board.map((b, i) => '<div class="shot"><b>Shot ' + (i + 1) + '</b><br>' + b + '</div>').join('') +
    '<br><b>Total: ' + board.length + '</b>';
}
function clearBoard() {
  board = [];
  document.getElementById('sb_list').innerHTML = 'No shots yet / এখনো কোনো শট নাই / Aucun plan';
}

function shootPlan() {
  const scenes = +document.getElementById('sh_scenes').value || 20;
  const days = +document.getElementById('sh_days').value || 3;
  const perDay = Math.ceil(scenes / days);
  document.getElementById('shoot_res').innerHTML =
    'Shooting Plan:<br>Scenes Per Day: ' + perDay + '<br>Tip: Shoot same location together!';
}

function calcBudget() {
  const b = +document.getElementById('b_total').value || 0;
  if (!b) { document.getElementById('b_res').innerHTML = 'Enter budget'; return; }
  const items = [['Camera / Equipment', 0.25], ['Actors / Team', 0.20], ['Location + Food', 0.20], ['Editing + Music', 0.15], ['Poster + Promotion', 0.10], ['Emergency', 0.10]];
  let html = 'Budget ' + b.toLocaleString() + ' Tk<br>';
  items.forEach(([n, p]) => { html += n + ': ' + Math.round(b * p).toLocaleString() + ' Tk<br>'; });
  document.getElementById('b_res').innerHTML = html;
}

function editPlan() {
  const plat = document.getElementById('e_platform').value;
  const len = +document.getElementById('e_len').value || 10;
  document.getElementById('e_res').innerHTML =
    'Platform: ' + plat + '<br>Length: ' + len + ' min<br>Editing Time: ~' + Math.ceil(len / 2) + ' days<br>Export: 1080p, 24fps, MP4';
}

let castList = [];
function addCast() {
  const ch = document.getElementById('cast_char').value || 'Character';
  const actor = document.getElementById('cast_actor').value || 'Not selected';
  castList.push('<b>' + ch + '</b> - ' + actor);
  document.getElementById('cast_list').innerHTML = castList.join('<br><br>') + '<br><br><b>Total: ' + castList.length + '</b>';
}
function clearCast() {
  castList = [];
  document.getElementById('cast_list').innerHTML = 'No cast yet / এখনো কেউ নাই / Aucun acteur';
}

function musicSuggest() {
  const mood = document.getElementById('mus_mood').value;
  const map = {
    emotional: 'Piano soft + Violin slow. Volume 20%.',
    happy: 'Upbeat Ukulele + Drums.',
    horror: 'Low drone + Heartbeat. Silence is scarier!',
    action: 'Epic drums + Bass.',
    romantic: 'Soft guitar + Flute.',
    islamic: 'Nasheed (no music) / নাশিদ / Nasheed'
  };
  document.getElementById('mus_res').innerHTML = '<b>' + mood.toUpperCase() + '</b><br>' + map[mood] + '<br><br>Free: YouTube Audio Library / Pixabay Music';
}

function makePromo() {
  const title = document.getElementById('p_title').value || 'My Film';
  const date = document.getElementById('p_date').value || 'Coming Soon';
  const plat = document.getElementById('p_plat').value;
  document.getElementById('promo_res').innerHTML =
    '🎬 <b>' + title + '</b> আসছে! / Coming! / Arrive! 🎬<br><br>📅 Release: ' + date + '<br>📱 Platform: ' + plat +
    '<br><br>🔥 নতুন ফিল্ম আসছে! ' + title + '<br>New Film Coming! ' + title + '<br>Nouveau Film ! ' + title +
    '<br><br>Share করে সবাইকে জানিয়ে দাও! / Share! / Partagez !<br>#DigitalFilmMaking #BangladeshiFilm';
}

// Register Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(reg => console.log('SW Registered:', reg.scope))
      .catch(err => console.log('SW Failed:', err));
  });
}