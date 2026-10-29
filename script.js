const opening = document.querySelector('#opening');
const openButton = document.querySelector('#open-letter');
const flowers = ['✿', '❀', '✦', '♡', '✽', '❁'];
document.querySelector('#letter-date').textContent = new Intl.DateTimeFormat('en-US', {
  month: 'long', day: 'numeric', year: 'numeric'
}).format(new Date());
document.querySelector('#love-letter').addEventListener('copy', event => event.preventDefault());
const letterPaper = document.querySelector('#love-letter');
document.querySelector('.letter-copy').addEventListener('click', () => {
  letterPaper.classList.add('is-unrolled');
});

openButton.addEventListener('click', () => {
  if (opening.classList.contains('is-opening')) return;
  window.scrollTo(0, 0);
  opening.classList.add('is-opening');

  for (let i = 0; i < 110; i++) {
    const petal = document.createElement('span');
    petal.className = 'burst';
    petal.textContent = flowers[i % flowers.length];
    petal.style.color = ['#d97881', '#f0a58c', '#a8ba9d', '#e6bd72'][i % 4];
    petal.style.fontSize = `${1 + Math.random() * 2.1}rem`;
    petal.style.left = `${42 + (Math.random() - .5) * 18}%`;
    petal.style.top = `${47 + (Math.random() - .5) * 12}%`;
    petal.style.transitionDelay = `${Math.random() * .45}s`;
    document.body.appendChild(petal);
    requestAnimationFrame(() => {
      const angle = Math.random() * Math.PI * 2;
      const distance = 230 + Math.random() * 700;
      petal.style.transform = `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) rotate(${Math.random() * 720}deg)`;
      petal.style.opacity = '0';
    });
    setTimeout(() => petal.remove(), 4400);
  }
  setTimeout(() => opening.classList.add('is-gone'), 1750);
});

const lightbox = document.querySelector('#lightbox');
const lightboxIcon = document.querySelector('#lightbox-icon');
const lightboxTitle = document.querySelector('#lightbox-title');
const lightboxCaption = document.querySelector('#lightbox-caption');
const revealButtons = document.querySelectorAll('[data-title][data-caption]:not(.polaroid):not(.love-card)');

revealButtons.forEach(item => {
  item.addEventListener('click', () => {
    lightboxIcon.innerHTML = item.dataset.image
      ? `<img src="${item.dataset.image}" alt="${item.dataset.title}">`
      : item.dataset.icon || item.querySelector('.photo-placeholder, .stop-photo')?.textContent || '♡';
    lightboxTitle.textContent = item.dataset.title;
    lightboxCaption.textContent = item.dataset.caption;
    lightbox.classList.add('visible');
    lightbox.setAttribute('aria-hidden', 'false');
  });
});

document.querySelectorAll('.love-card').forEach(card => {
  card.addEventListener('click', () => {
    const isOpen = card.classList.toggle('is-open');
    card.setAttribute('aria-expanded', String(isOpen));
  });
});

document.querySelectorAll('.memory-card').forEach(card => {
  card.addEventListener('click', () => {
    if (!card.classList.contains('is-revealed')) {
      card.classList.add('is-revealed');
      return;
    }
    if (card.classList.contains('has-media')) return;
    const picker = document.createElement('input');
    picker.type = 'file';
    picker.accept = 'image/*,video/*';
    picker.addEventListener('change', () => {
      const file = picker.files?.[0];
      if (!file) return;
      const media = card.querySelector('.memory-media');
      const source = URL.createObjectURL(file);
      media.innerHTML = file.type.startsWith('video/')
        ? `<video controls playsinline src="${source}"></video>`
        : `<img src="${source}" alt="A favorite memory">`;
      card.classList.add('has-media');
    });
    picker.click();
  });
});

const chickenCard = document.querySelector('.video-card');
const videoLightbox = document.querySelector('#video-lightbox');
const chickenVideo = document.querySelector('#chicken-video');
function closeChickenVideo() {
  chickenVideo.pause();
  videoLightbox.classList.remove('visible');
  videoLightbox.setAttribute('aria-hidden', 'true');
}
chickenCard.addEventListener('click', async () => {
  videoLightbox.classList.add('visible');
  videoLightbox.setAttribute('aria-hidden', 'false');
  try { await chickenVideo.play(); } catch { /* Controls remain available if playback is blocked. */ }
});
document.querySelector('.close-video').addEventListener('click', closeChickenVideo);
videoLightbox.addEventListener('click', event => { if (event.target === videoLightbox) closeChickenVideo(); });

function closeLightbox() {
  lightbox.classList.remove('visible');
  lightbox.setAttribute('aria-hidden', 'true');
}
document.querySelector('.close-lightbox').addEventListener('click', closeLightbox);
lightbox.addEventListener('click', event => { if (event.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape') { closeLightbox(); closeChickenVideo(); } });

const reasons = [
  'Because being around you feels like home.',
  'Because I love seeing you happy.',
  'Because you make ordinary days feel special.',
  'Because somehow I miss you even after I just saw you.',
  'Because every food adventure is better with you at the table.',
  'Because your smile is one of my favorite places to get lost.',
  'Because you always push me to become a better version of myself.',
  'Because you have taught me how to be more patient, even when I do not realize I am learning.',
  'Because you believe in me and remind me that I can do hard things.',
  'Because loving you makes me want to grow, not just for us, but for myself too.',
  'Because you make me slow down and appreciate the little things.',
  'Because you bring out a softer, kinder side of me.',
  'Because I could keep going forever.'
];
let reasonIndex = 0;
const reasonPopup = document.querySelector('#reason-popup');
const reasonPopupText = document.querySelector('#reason-popup-text');
let reasonTimeout;
function closeReasonPopup() {
  reasonPopup.classList.remove('visible');
  reasonPopup.setAttribute('aria-hidden', 'true');
  clearTimeout(reasonTimeout);
}
document.querySelector('#reason-button').addEventListener('click', () => {
  reasonPopupText.textContent = reasons[reasonIndex];
  reasonIndex = (reasonIndex + 1) % reasons.length;
  reasonPopup.classList.add('visible');
  reasonPopup.setAttribute('aria-hidden', 'false');
  clearTimeout(reasonTimeout);
  reasonTimeout = setTimeout(closeReasonPopup, 15000);
});
reasonPopup.addEventListener('click', closeReasonPopup);

const openWhenNotes = {
  miss: {
    title: 'You miss me 🥺',
    lead: "Missing me already? Damn, I'm really that unforgettable huh?",
    body: "It's okay baby, I miss you too. If I could teleport, I'd already be annoying you with a million kisses and refusing to let go of you. Until then, consider this your virtual hug. I love you more than you know.",
    evidence: true
  },
  'bad-day': {
    title: "You're having a bad day 🌧️",
    lead: 'WHO MADE MY PRINCESS SAD??? GIVE ME THEIR NAME.',
    body: "Okay baby, jokes aside. I wish I could take all your worries away and replace them with kisses. You don't have to be happy all the time for me to love you. Even on your worst days, you're still my favorite person. Come here, you deserve the biggest hug.",
    battle: true
  },
  reminder: {
    title: 'You need a reminder 💗',
    lead: "Reminder: Im literally your biggest fan. Unfortunately, there's no unsubscribe button.",
    body: "But seriously, I hope you never question how special you are to me. You're beautiful, you're loved, and you mean so much more to me than I could ever fit into this little website. I'd choose you in every lifetime.",
    reminderPhoto: true
  },
  smile: {
    title: 'You want to smile 🤭',
    lead: 'Are you smiling yet? No? Damn, tough crowd.',
    body: "Fine, here's a fun fact: Somewhere in this world there's a man who gets ridiculously happy whenever your name pops up on his phone. Spoiler alert, it's me. And yes, I'm overly obsessed with you. Now give me that pretty smile or else 100 kiss punishment.",
    smilePhoto: true
  }
};
const openWhenModal = document.querySelector('#open-when-modal');
const missMeButton = document.querySelector('#miss-me-button');
const missMeEvidence = document.querySelector('#miss-me-evidence');
const badDayButton = document.querySelector('#bad-day-button');
const badDayEvidence = document.querySelector('#bad-day-evidence');
const reminderEvidence = document.querySelector('#reminder-evidence');
const smileEvidence = document.querySelector('#smile-evidence');
function closeOpenWhen() {
  openWhenModal.classList.remove('visible');
  openWhenModal.setAttribute('aria-hidden', 'true');
}
document.querySelectorAll('[data-open-when]').forEach(button => {
  button.addEventListener('click', () => {
    const note = openWhenNotes[button.dataset.openWhen];
    document.querySelector('#open-when-label').textContent = 'open when...';
    document.querySelector('#open-when-title').textContent = note.title;
    document.querySelector('#open-when-lead').textContent = note.lead;
    document.querySelector('#open-when-body').textContent = note.body;
    missMeButton.hidden = !note.evidence;
    missMeButton.textContent = 'Need visual proof? 🤓';
    missMeEvidence.hidden = true;
    badDayButton.hidden = !note.battle;
    badDayButton.textContent = 'Going to war for you 🫡';
    badDayEvidence.hidden = true;
    reminderEvidence.hidden = !note.reminderPhoto;
    smileEvidence.hidden = !note.smilePhoto;
    openWhenModal.classList.add('visible');
    openWhenModal.setAttribute('aria-hidden', 'false');
  });
});
missMeButton.addEventListener('click', () => {
  missMeEvidence.hidden = !missMeEvidence.hidden;
  missMeButton.textContent = missMeEvidence.hidden ? 'Need visual proof? 🤓' : 'Okay okay, I miss you too 🥺';
});
badDayButton.addEventListener('click', () => {
  badDayEvidence.hidden = !badDayEvidence.hidden;
  badDayButton.textContent = badDayEvidence.hidden ? 'Going to war for you 🫡' : 'Mission accomplished, princess 🫡';
});
document.querySelector('.close-open-when').addEventListener('click', closeOpenWhen);
openWhenModal.addEventListener('click', event => { if (event.target === openWhenModal) closeOpenWhen(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeOpenWhen(); });

const songCard = document.querySelector('#song-card');
const songPlayer = document.querySelector('#our-song');
const songButton = document.querySelector('#song-play');
songButton.addEventListener('click', async () => {
  if (songPlayer.paused) {
    try {
      await songPlayer.play();
      songCard.classList.add('is-playing');
      songButton.innerHTML = '<span>Ⅱ</span> Pause';
    } catch {
      songButton.innerHTML = '<span>▶</span> Try again';
    }
  } else {
    songPlayer.pause();
  }
});
songPlayer.addEventListener('pause', () => {
  songCard.classList.remove('is-playing');
  songButton.innerHTML = '<span>▶</span> Play';
});
songPlayer.addEventListener('ended', () => { songPlayer.currentTime = 0; });

const finale = document.querySelector('#finale');
const finaleMessage = finale.querySelector('.finale-message');
function closeFinale() {
  finale.classList.remove('visible', 'show-message');
  finale.setAttribute('aria-hidden', 'true');
  finale.querySelectorAll('.finale-petal').forEach(petal => petal.remove());
}
document.querySelector('#heart-button').addEventListener('click', () => {
  if (finale.classList.contains('visible')) return;
  document.querySelector('#heart-message').textContent = '';
  finale.classList.add('visible');
  finale.setAttribute('aria-hidden', 'false');

  const tokens = ['♥', '♡', '✿', '❀', '✦'];
  for (let i = 0; i < 72; i++) {
    const petal = document.createElement('span');
    const angle = (Math.PI * 2 * i) / 72 + (Math.random() - .5) * .22;
    const distance = Math.min(innerWidth, innerHeight) * (.3 + Math.random() * .52);
    petal.className = 'finale-petal';
    petal.textContent = tokens[Math.floor(Math.random() * tokens.length)];
    petal.style.color = ['#c15770', '#f6d68d', '#fff9e8', '#89a889', '#d9858d'][i % 5];
    petal.style.setProperty('--x', `${Math.cos(angle) * distance}px`);
    petal.style.setProperty('--y', `${Math.sin(angle) * distance}px`);
    petal.style.setProperty('--scale', String(.65 + Math.random() * 1.15));
    petal.style.setProperty('--turn', `${Math.round((Math.random() - .5) * 720)}deg`);
    finale.appendChild(petal);
    requestAnimationFrame(() => petal.classList.add('fly'));
    setTimeout(() => petal.classList.add('drift-away'), 2800 + Math.random() * 700);
    setTimeout(() => petal.remove(), 5200);
  }
  setTimeout(() => finale.classList.add('show-message'), 1350);
});
finale.addEventListener('click', closeFinale);
