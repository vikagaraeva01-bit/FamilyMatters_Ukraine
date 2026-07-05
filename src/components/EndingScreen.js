import { button, el } from '../utils/dom.js';

export function renderEnding({ country, onRestart }) {
  return el('main', { className: 'screen text-screen ending-screen', 'aria-labelledby': 'ending-title' }, [
    el('div', { className: 'ambient-map is-complete', 'aria-hidden': 'true' }),
    el('section', { className: 'reading-panel' }, [
      el('p', { className: 'kicker', text: 'Story complete' }),
      el('h2', { id: 'ending-title', className: 'screen-heading', text: 'Thank You' }),
      el('div', { className: 'intro-lines' }, [
        el('p', { text: `You have uncovered why ${country} matters to my family.` }),
        el('p', { text: 'This place carries a trace of where we came from.' }),
        el('p', { text: 'It holds memory, movement, and home.' }),
        el('p', { text: 'Thank you for listening.' }),
        el('p', { text: 'Now return to the map and scratch this country into view.' }),
      ]),
      button('Begin Again', 'primary-button', onRestart, { 'aria-label': 'Begin Again' }),
    ]),
  ]);
}