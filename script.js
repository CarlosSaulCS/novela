// Mini novela logic – chapters, rendering, state, vocab highlighting (versión limpia)

const chapters = [
  {
    title: 'Capítulo 1 · Aeropuertos y Mensajes',
    segments: [
      {
        es: 'Hace una semana nuestras charlas agarraron ritmo: cortas, puntuales y con tu toque que no se copia.',
        en: 'A week ago our chats picked up a rhythm: short, on time, and with your touch no one copies.',
        ru: 'Неделю назад наши переписки поймали ритм: короткие, вовремя и с твоим оттенком, который не повторить.',
        vocab: [ ['agarraron','picked up'], ['ritmo','rhythm'], ['toque','touch'] ]
      },
      {
        es: 'Tú en Estonia y yo en México; a veces la distancia fastidia, hoy se queda quieta y yo al pendiente.',
        en: 'You in Estonia and me in Mexico; sometimes distance annoys, today it stays still and I stay watchful.',
        ru: 'Ты в Эстонии, я в Мексике; иногда расстояние мешает, сегодня оно тихое, а я слежу.',
        vocab: [ ['distancia','distance'], ['fastidia','annoys'], ['pendiente','watchful'] ]
      },
      {
        es: 'Dices Roma, Turquía, Dinamarca, España… suena a mapa abierto y me dan ganas de apuntar rutas.',
        en: 'You say Rome, Turkey, Denmark, Spain… it sounds like an open map and makes me want to note routes.',
        ru: 'Ты говоришь Рим, Турция, Дания, Испания… звучит как раскрытая карта, хочется отмечать маршруты.',
        vocab: [ ['mapa','map'], ['rutas','routes'], ['ganas','desire'] ]
      },
      {
        es: 'También crecí con novelas; aprendí que una mirada tranquila dice más que mil frases exageradas.',
        en: 'I also grew up with novelas; I learned a calm look says more than a thousand exaggerated lines.',
        ru: 'Я тоже вырос на новеллах; понял, что спокойный взгляд говорит больше тысячи преувеличенных фраз.',
        vocab: [ ['mirada','look'], ['frases','lines'], ['exageradas','exaggerated'] ]
      },
      {
        es: 'Esto va simple: notas cortas, tono claro y ya conozco algunos de tus miedos; yo te cubro.',
        en: 'This stays simple: short notes, a clear tone, and I already know some of your fears; I’ve got you.',
        ru: 'Всё просто: короткие заметки, спокойный тон и я уже знаю некоторые твои страхи; я прикрою.',
        vocab: [ ['miedos','fears'], ['cubro','I cover'], ['simple','simple'] ]
      },
      {
        es: 'Si busco una palabra en español para describirte y no sale, es porque vas más allá: única, bonita y con fuerza.',
        en: 'If I look for a Spanish word to describe you and it doesn’t show up, it’s because you go beyond: unique, beautiful and strong.',
        ru: 'Если ищу испанское слово, чтобы описать тебя, и его нет — значит ты выше обычных слов: уникальная, красивая и сильная.',
        vocab: [ ['única','unique'], ['bonita','beautiful'], ['fuerza','strength'] ]
      }
    ]
  },
  {
    title: 'Capítulo 2 · Mañanas y Ritmos',
    segments: [
      {
        es: 'Allá amaneces antes que el sol; aquí todavía la noche se queda unos minutos más cuando tú ya saludas el día.',
        en: 'There you wake before the sun; here the night still lingers a few more minutes when you are already greeting the day.',
        ru: 'Там ты просыпаешься раньше солнца; здесь ночь держится ещё пару минут, пока ты уже приветствуешь день.',
        vocab: [ ['amaneces','you wake at dawn'], ['noche','night'], ['minutos','minutes'] ]
      },
      {
        es: 'Me cuentas lo que desayunas: algo ligero, limpio; yo sonrío y pienso qué palabra nueva podría servirte hoy.',
        en: 'You tell me what you have for breakfast: something light, clean; I smile and think which new word might help you today.',
        ru: 'Ты рассказываешь, что ешь на завтрак: что‑то лёгкое, простое; я улыбаюсь и думаю, какое новое слово может тебе пригодиться сегодня.',
        vocab: [ ['desayunas','you have breakfast'], ['ligero','light'], ['palabra','word'] ]
      },
      {
        es: 'Coincidimos en algo: viajar limpia la cabeza. A ti te ordena ideas; a mí me afila el paso.',
        en: 'We agree on something: traveling clears the head. For you it organizes ideas; for me it sharpens my step.',
        ru: 'Мы совпадаем в одном: путешествия очищают голову. Тебе они раскладывают мысли; мне — точат шаг.',
        vocab: [ ['viajar','to travel'], ['cabeza','head'], ['ideas','ideas'] ]
      },
      {
        es: 'Te digo que el español se agarra igual que una costumbre buena: despacio y seguido. No hay prisa; yo marco compás.',
        en: 'I tell you Spanish is picked up like a good habit: slowly and consistently. No rush; I set the beat.',
        ru: 'Я говорю, что испанский берётся как хорошая привычка: медленно и постоянно. Никакой спешки; я задаю ритм.',
        vocab: [ ['costumbre','habit'], ['prisa','rush'], ['compás','beat'] ]
      },
      {
        es: 'Si algo te inquieta o da un poco de miedo, lo nombras y listo; yo lo pongo del lado tranquilo.',
        en: 'If something worries you or feels a bit scary, you name it and that’s it; I place it on the calm side.',
        ru: 'Если что‑то тревожит или немного пугает — ты называешь это и всё; я ставлю это на спокойную сторону.',
        vocab: [ ['inquieta','worries'], ['miedo','fear'], ['calmado','calm'] ]
      },
      {
        es: 'Y si hoy ninguna palabra española te queda perfecta, no fuerces: tu forma de decir las cosas ya tiene brillo propio.',
        en: 'And if today no Spanish word fits you perfectly, don’t force it: your way of saying things already has its own shine.',
        ru: 'И если сегодня ни одно испанское слово не ложится идеально — не дави; твой способ говорить уже светится сам.',
        vocab: [ ['brillo','shine'], ['propio','own'], ['forzar','to force'] ]
      }
    ]
  }
];

// State
let current = 0;
let showRussian = false;
let vocabMode = false;
const chaptersContainer = document.getElementById('chapters');
const indicator = document.getElementById('chapter-indicator');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const progressBar = document.getElementById('progress-bar');

function renderChapter(index) {
  const chapter = chapters[index];
  chaptersContainer.innerHTML = '';
  const wrapper = document.createElement('section');
  wrapper.className = 'chapter';
  const h2 = document.createElement('h2');
  h2.textContent = chapter.title;
  wrapper.appendChild(h2);

  chapter.segments.forEach(seg => {
    const div = document.createElement('div');
    div.className = 'segment';
    if (showRussian) div.dataset.showRu = 'true';

    const esP = document.createElement('p');
    esP.innerHTML = applyVocab(seg.es, seg.vocab);
    div.appendChild(esP);

    const enP = document.createElement('p');
    enP.className = 'translation en';
    enP.textContent = seg.en;
    div.appendChild(enP);

    if (seg.ru) {
      const ruP = document.createElement('p');
      ruP.className = 'translation ru';
      ruP.textContent = seg.ru;
      div.appendChild(ruP);
    }

    wrapper.appendChild(div);
  });

  chaptersContainer.appendChild(wrapper);
  indicator.textContent = `${index + 1} / ${chapters.length}`;
  prevBtn.disabled = index === 0;
  nextBtn.disabled = index === chapters.length - 1;
  updateProgress();
  saveState();
}

function updateProgress() {
  const chapter = chapters[current];
  const total = chapter.segments.length;
  const visible = chaptersContainer.querySelectorAll('.segment').length;
  const pct = Math.min(100, (visible / total) * 100);
  progressBar.style.width = pct + '%';
}

function applyVocab(text, vocabList) {
  if (!vocabMode || !vocabList) return text;
  let processed = text;
  vocabList.forEach(([es, en]) => {
  // Correct word boundary usage: must escape backslash inside template literal
  const pattern = new RegExp(`\\b${escapeRegex(es)}\\b`, 'gi');
    processed = processed.replace(pattern, match => `<span class="word" data-term="${es}">${match}<span class="tooltip">${en}</span></span>`);
  });
  return processed;
}

function escapeRegex(str) { return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }

// Events
prevBtn.addEventListener('click', () => { if (current > 0) { current--; renderChapter(current); } });
nextBtn.addEventListener('click', () => { if (current < chapters.length - 1) { current++; renderChapter(current); } });

document.getElementById('toggle-ru').addEventListener('click', e => {
  showRussian = !showRussian;
  e.currentTarget.setAttribute('aria-pressed', showRussian);
  renderChapter(current);
});

document.getElementById('vocab-mode').addEventListener('click', e => {
  vocabMode = !vocabMode; e.currentTarget.setAttribute('aria-pressed', vocabMode);
  renderChapter(current);
});

// Delegated tooltip toggling
document.addEventListener('click', e => {
  const word = e.target.closest('.word');
  if (word) {
    const active = word.getAttribute('data-active') === 'true';
    document.querySelectorAll('.word[data-active="true"]').forEach(el => el.dataset.active = 'false');
    if (!active) word.dataset.active = 'true';
  } else {
    document.querySelectorAll('.word[data-active="true"]').forEach(el => el.dataset.active = 'false');
  }
});

// Audio control
const audio = document.getElementById('bg-audio');
// Audio control (with gentle fade)
audio.volume = 0; // start silent, fade in on first play
const playBtn = document.getElementById('play-audio');
let fading = null;

function fadeAudio(target, ms = 1200) {
  if (!audio) return;
  if (fading) cancelAnimationFrame(fading);
  const startVol = audio.volume;
  const delta = target - startVol;
  const startTime = performance.now();
  function step(now) {
    const t = Math.min(1, (now/startTime - 1 + (startTime/ms)) * (ms/(now-startTime||1)) ); // fallback clamp if timing weird
    const p = Math.min(1, (now - startTime) / ms);
    audio.volume = +(startVol + delta * p).toFixed(3);
    if (p < 1) fading = requestAnimationFrame(step); else { if (audio.volume <= 0.001 && target === 0) { audio.pause(); audio.currentTime = 0; } }
  }
  fading = requestAnimationFrame(step);
}

playBtn.addEventListener('click', async () => {
  if (audio.paused) {
    try {
      await audio.play();
      playBtn.setAttribute('aria-pressed', 'true');
      fadeAudio(0.55, 1400);
    } catch (err) { console.warn('Audio play blocked:', err); }
  } else {
    playBtn.setAttribute('aria-pressed', 'false');
    fadeAudio(0, 900);
  }
});

document.addEventListener('scroll', () => updateProgress(), { passive: true });

function saveState() {
  try { localStorage.setItem('novelaState', JSON.stringify({ current, showRussian, vocabMode })); } catch { }
}
function loadState() {
  try {
    const raw = localStorage.getItem('novelaState');
    if (!raw) return;
    const st = JSON.parse(raw);
    current = st.current || 0;
    showRussian = !!st.showRussian;
    vocabMode = !!st.vocabMode;
  } catch { }
}

// Delay initial render until cover dismissed
loadState();
const coverEl = document.getElementById('cover');
const startBtn = document.getElementById('start-btn');
function startExperience(){
  if (!coverEl.classList.contains('hide-cover')) {
    coverEl.classList.add('hide-cover');
    setTimeout(()=>{ coverEl.remove(); }, 800);
  }
  renderChapter(current);
}
startBtn.addEventListener('click', startExperience);
// Accessibility: allow Enter
startBtn.addEventListener('keyup', e => { if (e.key === 'Enter') startExperience(); });
