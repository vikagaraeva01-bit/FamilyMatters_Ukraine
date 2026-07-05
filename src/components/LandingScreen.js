import { button, el } from '../utils/dom.js';

export function renderLanding({ onBegin }) {
  const screen = el('main', { className: 'screen landing-screen', 'aria-labelledby': 'landing-title' });
  const sky = el('div', { className: 'night-sky', 'aria-hidden': 'true' }, [
    el('div', { className: 'star-field star-field-a' }),
    el('div', { className: 'star-field star-field-b' }),
    el('div', { className: 'earth-glow' }),
  ]);

  const content = el('section', { className: 'landing-copy' }, [
    el('p', { className: 'kicker', text: 'Interactive installation' }),
    el('h1', { id: 'landing-title', className: 'title-stack' }, [
      el('span', { text: 'Family' }),
      el('span', { text: 'Matters' }),
    ]),
    el('p', { className: 'subtitle', text: 'Every family leaves traces around the world.' }),
    button('Begin Journey', 'orb-button', onBegin, { 'aria-label': 'Begin Journey' }),
  ]);

  screen.append(sky, content);
  return screen;
}
