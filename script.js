// AUTHOR SETTINGS — visitors can only play these preassigned clips.
// Set src to a relative local path, e.g. 'media/a.mp4' or 'media/b.mp3'.
// Online sources use provider/id/source. Empty src without a provider is unavailable.
// See README.md for setup. No server, uploads, or browser storage required.
const SOUNDS = {
  "A": {
    "title": "A · @sammylevitt",
    "artist": "@sammylevitt",
    "src": "",
    "provider": "tiktok",
    "id": "7707440150988606733",
    "source": "https://www.tiktok.com/@sammylevitt/video/7707440150988606733",
    "note": "Exact clip supplied by the author and assigned to A."
  },
  "B": {
    "title": "B · @abu.shiny",
    "artist": "@abu.shiny",
    "src": "",
    "provider": "tiktok",
    "id": "7694929559833169170",
    "source": "https://www.tiktok.com/@abu.shiny/video/7694929559833169170",
    "note": "Exact author-supplied clip assigned to B."
  },
  "E": {
    "title": "Nicole Kidman — “Every…”",
    "artist": "ADÉLA",
    "src": "",
    "note": "ADÉLA sound in @riversmomm’s TikTok trend example, linked by Bevyl. Internet required.",
    "provider": "tiktok",
    "id": "7682869113043029261",
    "source": "https://www.tiktok.com/@riversmomm/video/7682869113043029261"
  },
  "G": {
    "title": "G · @temper.city",
    "artist": "@temper.city",
    "src": "",
    "provider": "tiktok",
    "id": "7610897192114588958",
    "source": "https://www.tiktok.com/@temper.city/video/7610897192114588958",
    "note": "Latest author-supplied replacement for G."
  },
  "I": {
    "title": "I · @h.juy4964",
    "artist": "@h.juy4964",
    "src": "",
    "provider": "tiktok",
    "id": "7683619846789025031",
    "source": "https://www.tiktok.com/@h.juy4964/video/7683619846789025031",
    "note": "Exact author-supplied clip assigned to I."
  },
  "J": {
    "title": "J · @arminn.ai",
    "artist": "@arminn.ai",
    "src": "",
    "provider": "tiktok",
    "id": "7707458177075301653",
    "source": "https://www.tiktok.com/@arminn.ai/video/7707458177075301653",
    "note": "Exact author-supplied clip assigned to J."
  },
  "L": {
    "title": "L · @gzvk.hr",
    "artist": "@gzvk.hr",
    "src": "",
    "provider": "tiktok",
    "id": "7690978158341917972",
    "source": "https://www.tiktok.com/@gzvk.hr/video/7690978158341917972",
    "note": "Exact clip supplied by the author and assigned to L."
  },
  "N": {
    "title": "No, no, no!",
    "artist": "Obsession / Universal Pictures",
    "src": "",
    "note": "Universal Pictures’ original scene post. Internet required; platform playback may need an extra click.",
    "provider": "tiktok",
    "id": "7642453175194225934",
    "source": "https://www.tiktok.com/@universalpics/video/7642453175194225934"
  },
  "P": {
    "title": "P · @nbcchicago",
    "artist": "@nbcchicago",
    "src": "",
    "provider": "tiktok",
    "id": "7707772168767065357",
    "source": "https://www.tiktok.com/@nbcchicago/video/7707772168767065357",
    "note": "Exact author-supplied clip assigned to P."
  },
  "S": {
    "title": "S · @lukeb.72",
    "artist": "@lukeb.72",
    "src": "",
    "provider": "tiktok",
    "id": "7648830036279119117",
    "source": "https://www.tiktok.com/@lukeb.72/video/7648830036279119117",
    "note": "Exact author-supplied clip assigned to S."
  },
  "V": {
    "title": "V · @st.mncastr",
    "artist": "@st.mncastr",
    "src": "",
    "provider": "tiktok",
    "id": "7698178948684991750",
    "source": "https://www.tiktok.com/@st.mncastr/video/7698178948684991750",
    "note": "Exact author-supplied clip assigned to V."
  },
  "X": {
    "title": "X · @spacex_updates",
    "artist": "@spacex_updates",
    "src": "",
    "provider": "tiktok",
    "id": "7707735108110929204",
    "source": "https://www.tiktok.com/@spacex_updates/video/7707735108110929204",
    "note": "Exact author-supplied clip assigned to X."
  }
};
const $ = id => document.getElementById(id);
const media = $('media');
const badge = $('currentLetter');
let selected = null;
let embed = null;
const playerCache = new Map();
function command(frame, type, value) {
  if (frame?.dataset.provider === "youtube") {
    const names = {pause:"pauseVideo", play:"playVideo", unMute:"unMute", seekTo:"seekTo"};
    if (names[type]) frame.contentWindow.postMessage(JSON.stringify({event:"command",func:names[type],args:type === "seekTo" ? [value,true] : []}), "https://www.youtube.com");
  }
  if (frame?.dataset.provider === "tiktok") frame.contentWindow.postMessage({"x-tiktok-player": true, type, value}, "https://www.tiktok.com");
}
let generation = 0;
let embedTimer;
let providerMuted = null;
let providerVolume = null;
const available = sound => Boolean(sound?.src || sound?.provider);
function setPlaying(value) { badge.classList.toggle('playing', value); }
function resetPlayback() {
  generation++;
  clearTimeout(embedTimer);
  if (embed) { command(embed, "pause"); embed.hidden = true; embed = null; }
  media.pause();
  media.removeAttribute('src');
  media.load();
  media.hidden = true;
  setPlaying(false);
  providerMuted = null;
  providerVolume = null;
  delete badge.dataset.muted;
  delete badge.dataset.volume;
}
function showEmpty(title, note) {
  $('empty').hidden = false;
  $('emptyTitle').textContent = title;
  $('emptyNote').textContent = note;
}
function stop() {
  resetPlayback();
  document.querySelectorAll('[data-key]').forEach(key => key.classList.remove('active'));
  showEmpty('A year in sound.', 'Press a letter on your keyboard.');
  $('status').textContent = 'Stopped.';
}
function trigger(letter) {
  if (!SOUNDS[letter]) return;
  resetPlayback();
  document.querySelectorAll('[data-key]').forEach(key => key.classList.toggle('active', key.dataset.key === letter));
  selected = letter;
  badge.textContent = letter;
  const sound = SOUNDS[letter];
  $('sourceLink').hidden = !sound?.source;
  if (sound?.source) $('sourceLink').href = sound.source;
  if (!available(sound)) {
    showEmpty(letter + ' · Coming soon.', sound ? 'This clip is not available yet.' : 'This letter is still open.');
    $('status').textContent = sound?.title || 'No sound assigned.';
    return;
  }
  $('empty').hidden = true;
  const current = generation;
  $('status').textContent = sound.title;
  if (sound.provider) {
    const cached = playerCache.get(letter);
    if (cached) {
      embed = cached;
      embed.hidden = false;
      providerMuted = embed.dataset.muted === 'true' ? true : embed.dataset.muted === 'false' ? false : null;
      providerVolume = embed.dataset.volume === undefined ? null : Number(embed.dataset.volume);
      $('status').textContent = providerVolume === 0 ? 'Raise this clip’s player volume once, then press its letter again.' : sound.title;
      command(embed, 'seekTo', 0);
      command(embed, 'unMute');
      command(embed, 'play');
      return;
    }
    const frame = document.createElement('iframe');
    embed = frame;
    frame.id = 'onlinePlayer-' + letter;
    frame.className = 'online-player';
    frame.dataset.provider = sound.provider;
    playerCache.set(letter, frame);
    frame.title = sound.title + ' — ' + sound.artist;
    frame.allow = 'autoplay; encrypted-media; fullscreen; picture-in-picture';
    frame.allowFullscreen = true;
    frame.referrerPolicy = 'strict-origin-when-cross-origin';
    // Keep focus on the page for letter shortcuts; provider controls remain available.
    frame.tabIndex = -1;
    frame.src = sound.provider === 'youtube'
      ? `https://www.youtube.com/embed/${sound.id}?autoplay=1&playsinline=1&enablejsapi=1`
      : `https://www.tiktok.com/player/v1/${sound.id}?autoplay=0&muted=0&force_muted=0&controls=1&description=0&music_info=0`;
    $('player').append(frame);
    embedTimer = setTimeout(() => {
      if (generation === current) $('status').textContent = 'Raise this clip’s player volume, then press its letter again.';
    }, 10000);
    return;
  }
  media.muted = false;
  media.volume = 1;
  media.src = sound.src;
  media.hidden = false;
  // Call play synchronously within the physical key's user gesture.
  media.play().catch(() => {
    if (generation === current) $('status').textContent = 'Use the player’s Play control.';
  });
}
media.addEventListener('play', () => setPlaying(true));
media.addEventListener('pause', () => setPlaying(false));
media.addEventListener('ended', () => {
  setPlaying(false);
  $('status').textContent = 'Press a letter to play again.';
});
media.addEventListener('error', () => {
  if (!media.getAttribute('src')) return;
  setPlaying(false);
  showEmpty('Clip unavailable.', 'Try another letter.');
  media.hidden = true;
  $('status').textContent = 'This file could not play.';
});
document.addEventListener('keydown', event => {
  if (event.repeat || event.isComposing || event.metaKey || event.ctrlKey || event.altKey) return;
  if (event.key === 'Escape') { event.preventDefault(); stop(); return; }
  if (event.target.closest('input,textarea,[contenteditable="true"]')) return;
  if (event.code === 'Space' || event.key === ' ') {
    event.preventDefault();
    if (embed) {
      command(embed, 'unMute');
      command(embed, 'play');
    } else if (media.getAttribute('src')) {
      media.muted = false;
      media.play().catch(() => { $('status').textContent = 'Use the player’s Play control.'; });
    } else if (selected) {
      trigger(selected);
    }
    return;
  }
  if (/^[a-z]$/i.test(event.key)) {
    event.preventDefault();
    trigger(event.key.toUpperCase());
  }
});
window.addEventListener('message', event => {
  if (!embed || event.source !== embed.contentWindow) return;
  const sound = SOUNDS[selected];
  if (sound?.provider === 'tiktok' && event.origin === 'https://www.tiktok.com') {
    const message = event.data;
    if (!message || !message['x-tiktok-player']) return;
    if (message.type === 'onPlayerReady') {
      embed.contentWindow.postMessage({'x-tiktok-player': true, type: 'unMute'}, 'https://www.tiktok.com');
      embed.contentWindow.postMessage({'x-tiktok-player': true, type: 'play'}, 'https://www.tiktok.com');
    }
    if (message.type === 'onStateChange') {
      setPlaying(message.value === 1);
      if (message.value === 1) {
        clearTimeout(embedTimer);
        $('status').textContent = providerMuted === true || providerVolume === 0 ? 'Unmute and raise volume in the player.' : sound.title;
      }
      if (message.value === 0) $('status').textContent = 'Press a letter to play again.';
    }
    if (message.type === 'onMute') {
      providerMuted = message.value;
      badge.dataset.muted = String(message.value);
      embed.dataset.muted = String(message.value);
      if (message.value === true) { command(embed, 'pause'); $('status').textContent = 'Click the player’s speaker once for this clip, then press its letter again.'; }
    }
    if (message.type === 'onVolumeChange') {
      providerVolume = message.value;
      badge.dataset.volume = String(message.value);
      embed.dataset.volume = String(message.value);
      if (message.value === 0) { command(embed, 'pause'); $('status').textContent = 'Raise the player’s volume once for this clip, then press its letter again.'; }
    }
    if (message.type === 'onPlayerError') {
      clearTimeout(embedTimer);
      setPlaying(false);
      $('status').textContent = 'Playback blocked. Try the player or open original.';
    }
  }
  if (sound?.provider === 'youtube' && event.origin === 'https://www.youtube.com') {
    let message;
    try { message = typeof event.data === 'string' ? JSON.parse(event.data) : event.data; } catch { return; }
    if (message?.event === 'infoDelivery' && typeof message.info?.playerState === 'number') setPlaying(message.info.playerState === 1);
  }
});
