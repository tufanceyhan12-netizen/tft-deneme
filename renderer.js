const { ipcRenderer } = require('electron');
const strategies = require('./strategies.json');

// Close button functionality
document.getElementById('close-btn').addEventListener('click', () => {
  ipcRenderer.send('close-app');
});

// Ionia strategy button
document.getElementById('btn-ionia').addEventListener('click', () => {
  const ioniaStrategy = strategies.find(s => s.name.includes('Ionia'));
  
  if (ioniaStrategy) {
    displayStrategy(ioniaStrategy);
  }
});

function displayStrategy(strategy) {
  const contentDiv = document.getElementById('content');
  
  // Build items HTML
  let itemsHTML = '';
  for (const [champion, items] of Object.entries(strategy.priority_items)) {
    itemsHTML += `
      <div class="champion-items">
        <span class="champion-name">${champion}:</span>
        <div class="item-list">${items.join(', ')}</div>
      </div>
    `;
  }
  
  // Build traits HTML
  let traitsHTML = '';
  for (const [trait, count] of Object.entries(strategy.traits)) {
    traitsHTML += `<span class="trait-badge">${trait} ${count}</span>`;
  }
  
  contentDiv.innerHTML = `
    <div class="strategy-name">${strategy.name}</div>
    
    <div class="section-title">Ana Birimler:</div>
    <div class="unit-list">
      ${strategy.core_units.map(unit => `<span class="unit-tag">${unit}</span>`).join('')}
    </div>
    
    <div class="section-title">Özellikler:</div>
    <div class="trait-info">
      ${traitsHTML}
    </div>
    
    <div class="section-title">Öncelikli Eşyalar:</div>
    <div class="item-section">
      ${itemsHTML}
    </div>
    
    <div class="section-title">Önerilen Artırımlar:</div>
    <div class="augment-list">
      ${strategy.recommended_augments.map(aug => `<span class="augment-tag">${aug}</span>`).join('')}
    </div>
    
    <div class="section-title">Erken Oyun Rehberi:</div>
    <div class="guide-text">${strategy.early_game_guide}</div>
    
    <div class="section-title">Ne Zaman Oynamalı:</div>
    <div class="guide-text">${strategy.when_to_play}</div>
  `;
}
