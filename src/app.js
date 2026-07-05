import './styles/main.css';
import { story } from './data/story.js';
import { renderLanding } from './components/LandingScreen.js';
import { renderStory } from './components/StoryScreen.js';
import { renderEnding } from './components/EndingScreen.js';

const app = document.querySelector('#app');
let currentView = 'landing';

function setView(view) {
  currentView = view;
  app.replaceChildren();

  const screen = {
    landing: () => renderLanding({ onBegin: () => setView('story') }),
    story: () =>
      renderStory({
        story,
        onBack: () => setView('landing'),
        onContinue: () => setView('ending'),
      }),
    ending: () =>
      renderEnding({
        country: story.country,
        onRestart: () => setView('landing'),
      }),
  }[view]();

  app.append(screen);
  requestAnimationFrame(() => screen.classList.add('is-visible'));
}

window.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape') return;
  if (currentView === 'story') setView('landing');
  if (currentView === 'ending') setView('story');
});

setView('landing');
