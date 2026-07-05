import { button, el } from '../utils/dom.js';

export function createAudioPlayer(src, country) {
  const audio = new Audio(src);
  audio.preload = 'metadata';

  const playButton = button('Play', 'audio-play', togglePlayback, {
    'aria-label': `Play audio story for ${country}`,
  });
  const progress = el('input', {
    className: 'audio-progress',
    type: 'range',
    min: '0',
    max: '100',
    value: '0',
    step: '0.1',
    'aria-label': `Audio progress for ${country}`,
  });
  const current = el('span', { className: 'time-code', text: '0:00' });
  const duration = el('span', { className: 'time-code', text: '0:00' });
  const status = el('p', { className: 'audio-status', role: 'status', 'aria-live': 'polite' });

  const player = el('section', { className: 'audio-player', 'aria-label': `${country} audio story` }, [
    audio,
    el('div', { className: 'audio-topline' }, [
      playButton,
      el('div', { className: 'audio-meta' }, [
        el('p', { text: 'Listen to the story' }),
        el('div', { className: 'audio-times' }, [current, el('span', { text: '/' }), duration]),
      ]),
    ]),
    progress,
    status,
  ]);

  audio.addEventListener('loadedmetadata', () => {
    progress.max = String(audio.duration || 0);
    duration.textContent = formatTime(audio.duration);
  });

  audio.addEventListener('timeupdate', () => {
    progress.value = String(audio.currentTime);
    current.textContent = formatTime(audio.currentTime);
  });

  audio.addEventListener('play', () => {
    playButton.textContent = 'Pause';
    playButton.setAttribute('aria-label', `Pause audio story for ${country}`);
  });

  audio.addEventListener('pause', () => {
    playButton.textContent = 'Play';
    playButton.setAttribute('aria-label', `Play audio story for ${country}`);
  });

  audio.addEventListener('ended', () => {
    playButton.textContent = 'Play';
    progress.value = '0';
  });

  audio.addEventListener('error', () => {
    status.textContent = 'Audio will play once the matching recording is placed in the audio folder.';
    playButton.disabled = true;
    progress.disabled = true;
  });

  progress.addEventListener('input', () => {
    audio.currentTime = Number(progress.value);
  });

  function togglePlayback() {
    if (audio.paused) {
      audio.play().catch(() => {
        status.textContent = 'Audio playback could not start on this device.';
      });
      return;
    }

    audio.pause();
  }

  return player;
}

function formatTime(value) {
  if (!Number.isFinite(value)) return '0:00';
  const minutes = Math.floor(value / 60);
  const seconds = Math.floor(value % 60)
    .toString()
    .padStart(2, '0');

  return `${minutes}:${seconds}`;
}
