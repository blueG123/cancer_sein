// Base de données de réponses
const answersDatabase = {
  "Quels sont les symptômes du cancer du sein ?": "Les symptômes incluent : une masse palpable dans le sein (indolente, irrégulière), modifications de la peau ou du mamelon (rétraction, inversion), douleur persistante (rarement premier symptôme), changements de volume ou de forme du sein, écoulement du mamelon, ganglions enflés sous l'aisselle. En cas de détection de tout symptôme suspect, consultez immédiatement un professionnel de santé.",
  
  "Quel est le taux de survie en cas de détection précoce ?": "En cas de détection précoce, le taux de survie à 5 ans est d'environ 90% dans les pays développés. Dans les pays en développement, cela peut être inférieur (50-60%) en raison de l'accès limité aux traitements. La détection précoce est donc CRUCIALE : dépistage régulier, auto-examen mensuel, mammographie recommandée après 40-50 ans.",
  
  "Comment faire un auto-examen des seins ?": "Effectuez un auto-examen une fois par mois, idéalement une semaine après vos règles. Allongez-vous et utilisez vos doigts pour sentir l'ensemble de votre sein en mouvements circulaires, du centre vers le pourtour. Vérifiez aussi debout, devant un miroir, en cherchant des changements de forme, de couleur, ou d'écoulements. Connaître votre sein vous aide à détecter toute anomalie.",
  
  "Quels sont les facteurs de risque du cancer du sein ?": "Les facteurs non-modifiables incluent : âge (+ de 50 ans), antécédents familiaux, mutations génétiques (BRCA1/BRCA2). Les facteurs modifiables incluent : alcool, obésité, sédentarité, tabagisme, traitement hormonal prolongé, nulliparité, allaitement absent. Réduire ces risques par un mode de vie sain est possible et recommandé.",
  
  "À partir de quel âge faire une mammographie ?": "Les recommandations varient : les directives suggèrent à partir de 40-50 ans pour dépistage régulier. Pour les femmes à haut risque (antécédents familiaux, BRCA+), il est recommandé de commencer plus tôt, dès 30-35 ans. Consultez votre médecin pour déterminer l'âge optimal selon votre profil de risque.",
  
  "Qu'est-ce que le BRCA1 et BRCA2 ?": "Les gènes BRCA1 et BRCA2 (Breast Cancer susceptibility) codent pour des protéines réparant l'ADN. Les mutations de ces gènes augmentent le risque de cancer du sein jusqu'à 87%, et de cancer de l'ovaire. Un test génétique peut se faire si vous avez des antécédents familiaux. Si positif, surveillance renforcée ou mastectomie prophylactique peuvent être envisagées.",
  
  "Comment accéder aux traitements en Afrique ?": "L'accès reste limité en Afrique : peu de centres offrent chimiothérapie/radiothérapie. Solutions : consulter les initiatives gouvernementales, ONG partenaires (Susan G. Komen, Action Cancer, etc.), programmes d'aide financière, centres de référence nationaux. Plusieurs pays africains développent des programmes. Contactez votre ministère de la santé ou une structure locale pour plus d'informations.",
  
  "Quel est l'impact du cancer du sein dans les pays en développement ?": "Impact majeur : 80% des cas diagnostiqués trop tard (stade III-IV), mortalité 2-3x plus élevée qu'en pays développés. Raisons : manque d'infrastructure de dépistage, coût inaccessible, stigma social, faible éducation. L'incidence augmente de 2-3% par an en Afrique subsaharienne, d'où l'urgence d'investir en prévention et dépistage précoce.",
  
  "Y a-t-il une prévention efficace du cancer du sein ?": "Prévention primaire : poids santé, activité physique (150 min/semaine), limite alcool, allaitement, éviter THS prolongée. Prévention secondaire : dépistage régulier (mammographie, auto-examen). Prévention tertiaire : traitement précoce. Pour les mutations BRCA+, chimioprévention (tamoxifène) ou mastectomie prophylactique. Aucune prévention 100% efficace, mais ces mesures réduisent risque.",
  
  "Quelles organisations soutiennent les femmes atteintes du cancer du sein ?": "Organisations majeures : OMS, Susan G. Komen (USA), Cancer Research UK, Breast Cancer Now (UK), ASPS (Asie-Pacifique), AORTIC (Afrique). En Afrique : initiatives gouvernementales, cliniques de dépistage, programmes de sensibilisation croissants. Ces organisations offrent informations, soutien psychologique, aide financière, et plaidoyer pour améliorer l'accès aux soins."
};

document.addEventListener('DOMContentLoaded', () => {
  highlightNav();
  
  // Charger les ressources
  loadAllResources();
  
  // Handlers pour page query.html
  initQueryPageHandlers();
  
  // Initialiser le menu burger
  initBurgerMenu();
});

function highlightNav() {
  const links = Array.from(document.querySelectorAll('nav a, header nav a'));
  const path = (location.pathname + location.search).toLowerCase();
  links.forEach(a => {
    const href = a.getAttribute('href') || '';
    const file = href.split('/').pop().toLowerCase();
    if (file && path.endsWith(file)) {
      a.classList.add('active');
      a.setAttribute('aria-current', 'page');
    } else {
      a.classList.remove('active');
      a.removeAttribute('aria-current');
    }
  });
}

// Handlers pour la page Questions & Réponses
function initQueryPageHandlers() {
  const queryForm = document.getElementById('queryForm');
  const addForm = document.getElementById('addForm');
  const questionBtns = document.querySelectorAll('.question-btn');

  // Cliquer sur les questions suggérées
  if (questionBtns.length > 0) {
    questionBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const question = btn.getAttribute('data-question');
        answerQuestion(question);
      });
    });
  }

  // Soumettre une question personnalisée
  if (queryForm) {
    queryForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const question = document.getElementById('userQuestion').value.trim();
      if (question) {
        answerQuestion(question);
        queryForm.reset();
      }
    });
  }

  // Ajouter une ressource
  if (addForm) {
    addForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const title = document.getElementById('resourceTitle')?.value || '';
      const region = document.getElementById('resourceRegion')?.value || '';
      const category = document.getElementById('resourceCategory')?.value || '';
      const content = document.getElementById('resourceContent')?.value || '';

      // Sauvegarder dans localStorage
      const resources = JSON.parse(localStorage.getItem('cancerResources') || '[]');
      resources.push({ title, region, category, content, date: new Date().toLocaleDateString() });
      localStorage.setItem('cancerResources', JSON.stringify(resources));

      showNotification('✅ Ressource ajoutée avec succès !', 'success');
      addForm.reset();
      loadAllResources();
    });
  }
}

// Fonction pour répondre aux questions
function answerQuestion(question) {
  const answerSection = document.getElementById('answerSection');
  const answerContent = document.getElementById('answerContent');

  if (!answerSection || !answerContent) return;

  // Chercher une réponse exacte d'abord
  let answer = answersDatabase[question];

  // Si pas exacte, chercher par similarité simple
  if (!answer) {
    const keywords = question.toLowerCase().split(' ');
    for (const [key, value] of Object.entries(answersDatabase)) {
      const keyLower = key.toLowerCase();
      if (keywords.some(kw => keyLower.includes(kw))) {
        answer = value;
        break;
      }
    }
  }

  // Si toujours pas trouvé, réponse générale
  if (!answer) {
    answer = "Merci pour votre question ! Si elle ne figure pas dans notre base de données, nous vous recommandons de consulter : l'OMS (World Health Organization), un professionnel de santé local, ou les ressources partagées par la communauté ci-dessous. Vous pouvez également contribuer en partageant des informations utiles via le formulaire ci-bas.";
  }

  // Afficher la réponse
  answerContent.innerHTML = `<p>${escapeHtml(answer)}</p>`;
  answerSection.style.display = 'block';
  answerSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Charger et afficher toutes les ressources
function loadAllResources() {
  const resourcesSection = document.getElementById('resources');
  if (!resourcesSection) return;

  const resources = JSON.parse(localStorage.getItem('cancerResources') || '[]');

  if (resources.length === 0) {
    resourcesSection.innerHTML = '<p style="grid-column: 1/-1; color: var(--muted-gray);">Aucune ressource pour le moment. Soyez la première à en partager !</p>';
    return;
  }

  resourcesSection.innerHTML = resources.map(r => `
    <div class="resource-card">
      <h4>${escapeHtml(r.title)}</h4>
      <span class="category">${escapeHtml(r.category)}</span>
      <div class="region">📍 ${escapeHtml(r.region)}</div>
      <p>${escapeHtml(r.content)}</p>
      <small style="color: var(--muted-gray);">Ajoutée le ${r.date}</small>
    </div>
  `).join('');
}

// Utilitaires
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: ${type === 'success' ? '#6ba854' : 'var(--primary)'};
    color: white;
    padding: 15px 20px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    z-index: 1000;
    animation: slideIn 0.3s ease-in-out;
  `;
  notification.textContent = message;
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.opacity = '0';
    notification.style.transition = 'opacity 0.3s';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}

async function fetchJSON(url, options = {}) {
  const res = await fetch(url, options);
  if (!res.ok) throw new Error(res.statusText || 'Network error');
  return res.json();
}

function showAlert(message, type = 'info', timeout = 3000) {
  const id = 'site-toast';
  let el = document.getElementById(id);
  if (!el) {
    el = document.createElement('div');
    el.id = id;
    el.style.position = 'fixed';
    el.style.right = '16px';
    el.style.bottom = '16px';
    el.style.zIndex = '9999';
    el.style.minWidth = '200px';
    el.style.borderRadius = '8px';
    el.style.padding = '10px 14px';
    el.style.boxShadow = '0 6px 20px rgba(0,0,0,0.12)';
    el.style.color = '#fff';
    el.style.fontWeight = '600';
    document.body.appendChild(el);
  }
  el.textContent = message;
  if (type === 'success') el.style.background = 'linear-gradient(90deg,#6ba854,#5a9349)';
  else if (type === 'error') el.style.background = 'linear-gradient(90deg,#e8485e,#c0392b)';
  else el.style.background = 'rgba(0,0,0,0.75)';
  el.style.opacity = '1';
  if (el._hideTimeout) clearTimeout(el._hideTimeout);
  el._hideTimeout = setTimeout(()=> { el.style.opacity = '0'; }, timeout);
}

// Menu Burger
function initBurgerMenu() {
  const burgerBtn = document.getElementById('burgerBtn');
  const mainNav = document.getElementById('mainNav');
  
  if (!burgerBtn || !mainNav) return;
  
  burgerBtn.addEventListener('click', () => {
    burgerBtn.classList.toggle('active');
    mainNav.classList.toggle('active');
  });
  
  // Fermer le menu quand on clique sur un lien
  const navLinks = mainNav.querySelectorAll('a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      burgerBtn.classList.remove('active');
      mainNav.classList.remove('active');
    });
  });
  
  // Fermer le menu quand on clique en dehors
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.site-header') && !e.target.closest('.main-nav')) {
      burgerBtn.classList.remove('active');
      mainNav.classList.remove('active');
    }
  });
}