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
  es: 'A veces soy yo quien suelta primero el “buen día” y otras aparece el tuyo antes de que yo toque el teléfono.',
  en: 'Sometimes I’m the one who drops the “good morning” first and other times yours appears before I even touch the phone.',
  ru: 'Иногда я первым пишу «buen día», а иногда твоё сообщение всплывает ещё до того, как я беру телефон.',
  vocab: [ ['buen día','good morning'], ['aparece','appears'], ['teléfono','phone'] ]
      },
      {
  es: 'Sale la pregunta clásica: “¿ya desayunaste?”; a veces tú me la tiras primero y sólo reímos con el orden.',
  en: 'The classic question comes out: “did you eat breakfast yet?”; sometimes you throw it at me first and we just laugh at the order.',
  ru: 'Появляется классический вопрос: «уже позавтракала?»; иногда ты первая спрашиваешь меня, и мы смеёмся порядку.',
  vocab: [ ['clásica','classic'], ['pregunta','question'], ['reímos','we laugh'] ]
      },
      {
  es: 'Aunque respondas corto siempre estás; con dos palabras ya sé que sigues ahí marcando el ritmo.',
  en: 'Even if you answer briefly you’re always there; with two words I know you’re still setting the rhythm.',
  ru: 'Даже если отвечаешь коротко — ты есть; по паре слов понимаю, что ты держишь ритм.',
  vocab: [ ['corto','short'], ['siempre','always'], ['ritmo','rhythm'] ]
      },
      {
  es: 'Del trabajo basta con un “tranquilo” o “movido” y ya imagino luces, gente y tu modo sereno.',
  en: 'For work a simple “quiet” or “busy” is enough and I picture lights, people, and your calm style.',
  ru: 'Про работу хватает одного «спокойно» или «оживлённо», и я уже представляю огни, людей и твою спокойную манеру.',
  vocab: [ ['tranquilo','calm'], ['movido','busy'], ['sereno','serene'] ]
      },
      {
  es: 'Ya tarde calientas tu té y el vapor se vuelve señal de cierre; a veces tu “buenas noches” llega antes del mío.',
  en: 'Late at night you heat your tea and the steam becomes a closing signal; sometimes your “good night” lands before mine.',
  ru: 'Поздно вечером ты греешь чай, и пар — знак того, что день закрывается; иногда твоё «buenas noches» приходит раньше моего.',
  vocab: [ ['tarde','late'], ['cierre','closing'], ['buenas noches','good night'] ]
      },
      {
  es: 'Se arma un vaivén parejo: buenos días compartidos, preguntas cruzadas, respuestas cortas pero constantes y té nocturno antes del descanso.',
  en: 'A balanced back‑and‑forth forms: shared good mornings, crossed questions, short but steady replies and night tea before rest.',
  ru: 'Складывается ровный обмен: общие buenos días, встречные вопросы, короткие но постоянные ответы и ночной чай перед отдыхом.',
  vocab: [ ['vaivén','back and forth'], ['parejo','even'], ['constantes','steady'] ]
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
  // En navegación circular nunca deshabilitamos los botones
  prevBtn.disabled = false;
  nextBtn.disabled = false;
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
prevBtn.addEventListener('click', () => { current = (current - 1 + chapters.length) % chapters.length; renderChapter(current); });
nextBtn.addEventListener('click', () => { current = (current + 1) % chapters.length; renderChapter(current); });

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
