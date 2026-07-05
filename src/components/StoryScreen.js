import { createAudioPlayer } from './audioPlayer.js';
import { button, el } from '../utils/dom.js';

export function renderStory({ story, onContinue }) {
  const image = el('img', {
    className: 'story-photo',
    src: story.photo,
    alt: `Family photograph connected to ${story.country}`,
    loading: 'lazy',
    decoding: 'async',
  });

  const photoShell = el('figure', { className: 'photo-shell' }, [
    el('div', { className: 'photo-fallback', style: { '--accent': story.accent } }, [
      el('span', { text: story.country }),
    ]),
    image,
  ]);

  image.addEventListener('load', () => photoShell.classList.add('is-loaded'), { once: true });
  image.addEventListener('error', () => photoShell.classList.add('has-missing-media'), { once: true });

  return el('main', { className: 'screen story-screen', 'aria-labelledby': 'story-title' }, [
    el('div', { className: 'story-veil', 'aria-hidden': 'true', style: { '--accent': story.accent } }),
    el('section', { className: 'story-content' }, [
      el('p', { className: 'kicker', text: 'Before you scratch this country' }),
      el('h2', { id: 'story-title', className: 'country-title', text: story.country }),
      photoShell,
      el('p', {
        className: 'story-note',
        text: 'Before you scratch this country, let me tell you why it matters to me.',
      }),
      createAudioPlayer(story.audio, story.country),
      button('Complete Journey', 'primary-button story-action', onContinue, {
        'aria-label': 'Complete Journey',
      }),
    ]),
  ]);
}
