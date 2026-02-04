/**
 * Aplicação Web Filesfy
 * Frontend responsivo para recuperação de dados
 */

// ==================== ESTADO GLOBAL ====================
let cachedPlans = [];
let selectedPaymentPlanId = 'pro';
let selectedAccessPlan = 'free';

// ==================== TEMA ====================
function loadTheme() {
  const savedTheme = localStorage.getItem('app-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = savedTheme || (prefersDark ? 'dark' : 'light');
  
  applyTheme(theme);

  // Escutar mudanças de tema do sistema
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('app-theme')) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });
}

function applyTheme(theme) {
  if (theme === 'light') {
    document.body.classList.remove('theme-dark');
    document.body.classList.add('theme-light');
  } else if (theme === 'dark') {
    document.body.classList.remove('theme-light');
    document.body.classList.add('theme-dark');
  }

  const btnTheme = document.getElementById('btn-theme-toggle');
  if (btnTheme) {
    btnTheme.textContent = theme === 'light' ? '🌙' : '☀️';
    btnTheme.title = theme === 'light' ? 'Ativar tema escuro' : 'Ativar tema claro';
  }
}

function toggleTheme() {
  const currentTheme = document.body.classList.contains('theme-dark') ? 'dark' : 'light';
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  
  localStorage.setItem('app-theme', newTheme);
  applyTheme(newTheme);
}

// ==================== MENU RESPONSIVO ====================
function setupResponsiveMenu() {
  const toggle = document.getElementById('navbar-toggle');
  const menu = document.getElementById('navbar-menu');

  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      menu.classList.toggle('active');
      toggle.setAttribute('aria-expanded', menu.classList.contains('active'));
    });

    // Fechar menu ao clicar em um link
    menu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        menu.classList.remove('active');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }
}

// ==================== ACESSIBILIDADE ====================
function setupAccessibility() {
  const toggle = document.getElementById('access-menu-toggle');
  const panel = document.getElementById('access-menu-panel');
  const btnZoomIn = document.getElementById('btn-zoom-in');
  const btnZoomOut = document.getElementById('btn-zoom-out');
  const btnContrast = document.getElementById('btn-contrast');
  const btnHoverRead = document.getElementById('btn-hover-read');
  const status = document.getElementById('access-status');

  if (!toggle) return;

  toggle.addEventListener('click', () => {
    const isOpen = !panel.hidden;
    panel.hidden = isOpen;
    toggle.setAttribute('aria-expanded', !isOpen);
  });

  let currentZoom = 100;
  if (btnZoomIn) {
    btnZoomIn.addEventListener('click', () => {
      currentZoom = Math.min(currentZoom + 20, 200);
      document.documentElement.style.fontSize = (currentZoom / 100) * 16 + 'px';
      if (status) status.textContent = `Zoom: ${currentZoom}%`;
    });
  }

  if (btnZoomOut) {
    btnZoomOut.addEventListener('click', () => {
      currentZoom = Math.max(currentZoom - 20, 80);
      document.documentElement.style.fontSize = (currentZoom / 100) * 16 + 'px';
      if (status) status.textContent = `Zoom: ${currentZoom}%`;
    });
  }

  if (btnContrast) {
    btnContrast.addEventListener('click', () => {
      document.body.classList.toggle('high-contrast');
      if (status) {
        const isActive = document.body.classList.contains('high-contrast');
        status.textContent = isActive ? 'Alto contraste: ativado' : 'Alto contraste: desativado';
      }
    });
  }

  if (btnHoverRead) {
    btnHoverRead.addEventListener('click', () => {
      document.body.classList.toggle('hover-read');
      if (status) {
        const isActive = document.body.classList.contains('hover-read');
        status.textContent = isActive ? 'Leitura ao passar: ativada' : 'Leitura ao passar: desativada';
      }
    });
  }
}

// ==================== WIZARD / ROTEAMENTO ====================
function renderWizard(page) {
  const wizard = document.getElementById('wizard');
  if (!wizard) return;

  wizard.innerHTML = '';

  if (!isAuthenticated) {
    if (page === 'payment') {
      renderLoginPageNew(wizard);
      return;
    }

    if ((page === 'scan' || page === 'recovery') && selectedAccessPlan !== 'free') {
      renderSubscriptionPage(wizard);
      return;
    }

    // Mostrar tela de login quando solicitado
    if (page === 'login') {
      renderLoginPageNew(wizard);
      return;
    }

    // Mostrar tela de registro quando solicitado
    if (page === 'register') {
      renderRegisterPage(wizard);
      return;
    }

    // Para outros casos, mostrar subscription
    if (page === 'home') {
      renderSubscriptionPage(wizard);
      return;
    }
  }

  switch (page) {
    case 'login':
      renderLoginPageNew(wizard);
      break;
    case 'google-auth':
      renderGoogleAuthPage(wizard);
      break;
    case 'register':
      renderRegisterPage(wizard);
      break;
    case 'home':
      renderHomePage(wizard);
      break;
    case 'scan':
      renderScanPage(wizard);
      break;
    case 'recovery':
      renderRecoveryPage(wizard);
      break;
    case 'subscription':
      renderSubscriptionPage(wizard);
      break;
    case 'payment':
      showPaymentPage();
      break;
    default:
      renderHomePage(wizard);
  }
}

function renderHomePage(container) {
  container.innerHTML = `
    <div class="home-container">
      <div class="hero-section">
        <div class="hero-content">
          <h2>Recupere seus dados com segurança</h2>
          <p>Filesfy é a solução profissional mais confiável para recuperação de arquivos deletados.</p>
          <div class="hero-buttons">
            <button class="btn-primary" onclick="renderWizard('scan')">Iniciar Recuperação</button>
            <button class="btn-secondary" onclick="renderWizard('subscription')">Ver Planos</button>
          </div>
        </div>
      </div>

      <div class="features-section">
        <h3>Por que escolher Filesfy?</h3>
        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon">🔒</div>
            <h4>Segurança</h4>
            <p>Criptografia end-to-end de todos os dados recuperados</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">⚡</div>
            <h4>Rápido</h4>
            <p>Tecnologia otimizada para varredura e recuperação veloz</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">📊</div>
            <h4>Eficiente</h4>
            <p>Taxa de recuperação de até 99% dos arquivos deletados</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">🌍</div>
            <h4>Suporte</h4>
            <p>Atendimento 24/7 em múltiplos idiomas</p>
          </div>
        </div>
      </div>

      <div class="subscription-cta">
        <h3>Escolha o plano ideal para você</h3>
        <button class="btn-primary" onclick="renderWizard('subscription')">Ver Planos Disponíveis</button>
      </div>
    </div>
  `;
}

function renderScanPage(container) {
  container.innerHTML = `
    <div class="scan-container">
      <div class="scan-card" style="max-width: 800px;">
        <h2 style="color: #0ea5e9; font-size: 24px; margin-bottom: 30px;">Selecione um Dispositivo</h2>
        
        <div id="devices-list" class="devices-list">
          <div class="loading-devices">
            <div class="spinner-small"></div>
            <p>Carregando dispositivos...</p>
          </div>
        </div>
        
        <button class="btn-voltar" onclick="renderWizard('home')" style="margin-top: 30px;">Voltar</button>
      </div>
    </div>
  `;

  loadDevices();
}

async function loadDevices() {
  try {
    const devices = await recovery.listDevices();
    const devicesList = document.getElementById('devices-list');
    
    if (!devicesList) return;
    
    devicesList.innerHTML = devices.map(device => `
      <div class="device-card" data-device-id="${device.id}" data-device-name="${device.name}">
        <div class="device-icon">
          ${getDeviceIcon(device.type)}
        </div>
        <div class="device-info">
          <h3 class="device-name">${device.name}</h3>
          <p class="device-capacity">${formatBytes(device.sizeInBytes)}</p>
        </div>
        <div class="device-arrow">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </div>
      </div>
    `).join('');
    
    // Adicionar event listeners
    document.querySelectorAll('.device-card').forEach(card => {
      card.addEventListener('click', () => {
        const deviceId = card.dataset.deviceId;
        const deviceName = card.dataset.deviceName;
        showFileTypeSelection(deviceId, deviceName);
      });
    });
  } catch (error) {
    const devicesList = document.getElementById('devices-list');
    if (devicesList) {
      devicesList.innerHTML = `
        <div class="error-message">
          <p>Erro ao carregar dispositivos: ${error.message}</p>
          <button class="btn-secondary" onclick="loadDevices()">Tentar Novamente</button>
        </div>
      `;
    }
  }
}

function formatBytes(bytes) {
  if (!bytes || bytes === 0) return '0 B';
  
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  const k = 1024;
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + units[i];
}

function getDeviceIcon(type) {
  const icons = {
    'hdd': `<svg width="40" height="40" viewBox="0 0 24 24">
              <path fill="#0ea5e9" d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-5.04-6.71l-2.75 3.54h2.96l3.49-4.5-3.7-3.02-1.99 2.54-2.28-2.97H6.5l3.54 4.7-2.08 2.71h2.97z"/>
            </svg>`,
    'usb': `<svg width="40" height="40" viewBox="0 0 24 24">
              <path fill="#0ea5e9" d="M15 7v4h1v2h-3V5h2l-3-4-3 4h2v8H8v-2.07c.7-.37 1.2-1.08 1.2-1.93 0-1.21-.99-2.2-2.2-2.2-1.21 0-2.2.99-2.2 2.2 0 .85.5 1.56 1.2 1.93V13c0 1.11.89 2 2 2h3v3.05c-.71.37-1.2 1.1-1.2 1.95 0 1.22.99 2.2 2.2 2.2 1.21 0 2.2-.98 2.2-2.2 0-.85-.49-1.58-1.2-1.95V15h3c1.11 0 2-.89 2-2v-2h1V7h-4z"/>
            </svg>`,
    'mobile': `<svg width="40" height="40" viewBox="0 0 24 24">
                <path fill="#0ea5e9" d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z"/>
              </svg>`,
    'external': `<svg width="40" height="40" viewBox="0 0 24 24">
                  <path fill="#0ea5e9" d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-5.04-6.71l-2.75 3.54h2.96l3.49-4.5-3.7-3.02-1.99 2.54-2.28-2.97H6.5l3.54 4.7-2.08 2.71h2.97z"/>
                </svg>`,
    'default': `<svg width="40" height="40" viewBox="0 0 24 24">
                  <path fill="#0ea5e9" d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-5.04-6.71l-2.75 3.54h2.96l3.49-4.5-3.7-3.02-1.99 2.54-2.28-2.97H6.5l3.54 4.7-2.08 2.71h2.97z"/>
                </svg>`
  };
  return icons[type] || icons['default'];
}

function showFileTypeSelection(deviceId, deviceName) {
  const wizard = document.getElementById('wizard');
  wizard.innerHTML = `
    <div class="scan-container">
      <div class="scan-card" style="max-width: 800px;">
        <h2 style="color: #0ea5e9; font-size: 24px; margin-bottom: 10px;">Tipo de Arquivo</h2>
        <p style="color: var(--color-text-secondary); margin-bottom: 30px;">Dispositivo: ${deviceName}</p>
        
        <div class="file-types-list">
          <div class="device-card" data-file-type="todos">
            <div class="device-icon">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#0ea5e9" stroke-width="2">
                <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/>
                <polyline points="13 2 13 9 20 9"/>
              </svg>
            </div>
            <div class="device-info">
              <h3 class="device-name">Todos os tipos</h3>
              <p class="device-capacity">Recuperar qualquer arquivo</p>
            </div>
            <div class="device-arrow">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </div>
          </div>
          
          <div class="device-card" data-file-type="imagens">
            <div class="device-icon">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#0ea5e9" stroke-width="2">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                <circle cx="8.5" cy="8.5" r="1.5"/>
                <polyline points="21 15 16 10 5 21"/>
              </svg>
            </div>
            <div class="device-info">
              <h3 class="device-name">Imagens</h3>
              <p class="device-capacity">JPG, PNG, GIF, etc.</p>
            </div>
            <div class="device-arrow">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </div>
          </div>
          
          <div class="device-card" data-file-type="documentos">
            <div class="device-icon">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#0ea5e9" stroke-width="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
                <polyline points="10 9 9 9 8 9"/>
              </svg>
            </div>
            <div class="device-info">
              <h3 class="device-name">Documentos</h3>
              <p class="device-capacity">PDF, DOC, TXT, etc.</p>
            </div>
            <div class="device-arrow">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </div>
          </div>
          
          <div class="device-card" data-file-type="videos">
            <div class="device-icon">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#0ea5e9" stroke-width="2">
                <polygon points="23 7 16 12 23 17 23 7"/>
                <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
              </svg>
            </div>
            <div class="device-info">
              <h3 class="device-name">Vídeos</h3>
              <p class="device-capacity">MP4, AVI, MOV, etc.</p>
            </div>
            <div class="device-arrow">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </div>
          </div>
          
          <div class="device-card" data-file-type="audio">
            <div class="device-icon">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#0ea5e9" stroke-width="2">
                <path d="M9 18V5l12-2v13"/>
                <circle cx="6" cy="18" r="3"/>
                <circle cx="18" cy="16" r="3"/>
              </svg>
            </div>
            <div class="device-info">
              <h3 class="device-name">Áudio</h3>
              <p class="device-capacity">MP3, WAV, FLAC, etc.</p>
            </div>
            <div class="device-arrow">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </div>
          </div>
        </div>
        
        <button class="btn-voltar" onclick="renderWizard('scan')" style="margin-top: 30px;">Voltar</button>
      </div>
    </div>
  `;
  
  // Adicionar event listeners
  document.querySelectorAll('.file-types-list .device-card').forEach(card => {
    card.addEventListener('click', () => {
      const fileType = card.dataset.fileType;
      startScan(deviceId, fileType);
    });
  });
}

async function startScan(deviceId, fileType) {
  if (!deviceId) {
    showError('Selecione um dispositivo');
    return;
  }

  try {
    const wizard = document.getElementById('wizard');
    wizard.innerHTML = `
      <div class="loading-container">
        <div class="spinner"></div>
        <h2>Iniciando varredura...</h2>
      </div>
    `;

    const result = await recovery.startScan(deviceId, fileType || 'todos');

    // Guardar resultado para usar na página de recuperação
    window.currentScanResult = result;

    // Mostrar barra de progresso antes dos resultados
    renderScanProgress(deviceId);
  } catch (error) {
    showError('Erro ao iniciar varredura: ' + error.message);
    setTimeout(() => renderWizard('scan'), 2000);
  }
}

function renderScanProgress(deviceId) {
  const wizard = document.getElementById('wizard');
  let progress = 0;

  wizard.innerHTML = `
    <div class="scan-container">
      <div class="scan-card">
        <h2>Varrendo Dispositivo...</h2>
        <div class="progress-section">
          <div class="progress-bar">
            <div class="progress-fill" id="scan-progress-fill" style="width: 0%;"></div>
          </div>
          <p class="progress-text" id="scan-progress-text">0%</p>
          <p class="progress-details" id="scan-progress-details">Analisando setores em ${deviceId}...</p>
        </div>
      </div>
    </div>
  `;

  const interval = setInterval(() => {
    progress += Math.random() * 18;
    if (progress > 100) progress = 100;

    const fill = document.getElementById('scan-progress-fill');
    const text = document.getElementById('scan-progress-text');
    const details = document.getElementById('scan-progress-details');

    if (fill) fill.style.width = `${progress}%`;
    if (text) text.textContent = `${Math.floor(progress)}%`;
    if (details) details.textContent = `Analisando...`;

    if (progress >= 100) {
      clearInterval(interval);
      setTimeout(() => renderRecoveryPage(document.getElementById('wizard')), 600);
    }
  }, 350);
}

async function recoverFiles() {
  if (!isAuthenticated && selectedAccessPlan !== 'free') {
    renderSubscriptionPage(document.getElementById('wizard'));
    return;
  }

  try {
    // Coletar arquivos selecionados
    const checkboxes = document.querySelectorAll('.file-checkbox:checked');
    if (checkboxes.length === 0) {
      showError('Selecione pelo menos um arquivo');
      return;
    }

    const selectedFiles = Array.from(checkboxes).map(cb => {
      const item = cb.closest('.result-item');
      const fileId = item.dataset.fileId;
      const fileName = item.querySelector('.file-name').textContent;
      const fileSize = item.querySelector('.file-size').textContent;
      
      // Extrair tamanho em MB
      const sizeMatch = fileSize.match(/(\d+\.?\d*)\s*(MB|GB|KB)/);
      let sizeInMB = 0;
      if (sizeMatch) {
        const value = parseFloat(sizeMatch[1]);
        const unit = sizeMatch[2];
        if (unit === 'GB') sizeInMB = value * 1024;
        else if (unit === 'MB') sizeInMB = value;
        else if (unit === 'KB') sizeInMB = value / 1024;
      }

      return {
        id: fileId,
        name: fileName,
        sizeInMB
      };
    });

    // Simular destino (em produção seria seleção do usuário)
    const destination = 'C:\\Recuperados';

    // Mostrar barra de progresso de recuperação
    renderRecoveryProgress(selectedFiles.length);

    const result = await recovery.recoverFiles(selectedFiles, destination);

    setTimeout(() => {
      showSuccess(`${selectedFiles.length} arquivo(s) recuperado(s) com sucesso!`);
      renderWizard('home');
    }, 1200);
  } catch (error) {
    showError('Erro ao recuperar arquivos: ' + error.message);
  }
}

function renderRecoveryProgress(filesCount) {
  const wizard = document.getElementById('wizard');
  let progress = 0;

  wizard.innerHTML = `
    <div class="recovery-container">
      <div class="recovery-card">
        <h2>Recuperando Arquivos...</h2>
        <div class="progress-section">
          <div class="progress-bar">
            <div class="progress-fill" id="recover-progress-fill" style="width: 0%;"></div>
          </div>
          <p class="progress-text" id="recover-progress-text">0%</p>
          <p class="progress-details">Recuperando ${filesCount} arquivo(s)...</p>
        </div>
      </div>
    </div>
  `;

  const interval = setInterval(() => {
    progress += Math.random() * 20;
    if (progress > 100) progress = 100;

    const fill = document.getElementById('recover-progress-fill');
    const text = document.getElementById('recover-progress-text');
    if (fill) fill.style.width = `${progress}%`;
    if (text) text.textContent = `${Math.floor(progress)}%`;

    if (progress >= 100) {
      clearInterval(interval);
    }
  }, 300);
}

function renderRecoveryPage(container) {
  if (!isAuthenticated && selectedAccessPlan !== 'free') {
    renderSubscriptionPage(container);
    return;
  }

  const scanResult = window.currentScanResult;
  
  if (!scanResult || !scanResult.results) {
    container.innerHTML = `
      <div class="recovery-container">
        <div class="recovery-card">
          <h2>Erro ao carregar resultados</h2>
          <p>Nenhum arquivo encontrado. Tente novamente.</p>
          <button class="btn-secondary" onclick="renderWizard('scan')">Voltar</button>
        </div>
      </div>
    `;
    return;
  }

  const results = scanResult.results || [];
  const recoverableCount = results.filter(f => f.canRecover).length;
  const totalSize = results
    .filter(f => f.canRecover)
    .reduce((sum, f) => sum + f.sizeInMB, 0)
    .toFixed(2);

  let html = `
    <div class="recovery-container">
      <div class="recovery-card">
        <h2>Arquivos Encontrados</h2>
        <div class="recovery-info">
          <p><strong>Tipo:</strong> ${scanResult.fileType || 'todos'} | 
             <strong>Plano:</strong> ${(scanResult.plan || 'FREE').toUpperCase()} | 
             <strong>Limite:</strong> ${scanResult.limits.maxFiles} arquivos, ${scanResult.limits.maxSizeMB}MB</p>
          <p><strong>Encontrados:</strong> ${recoverableCount} de ${results.length} arquivo(s) | 
             <strong>Tamanho:</strong> ${totalSize}MB</p>
        </div>
        
        <div class="results-header">
          <button class="btn-small" id="btn-select-all">Selecionar Tudo</button>
          <span class="results-count"><span id="selected-count">0</span> / ${recoverableCount} selecionados</span>
        </div>

        <div class="results-list">
  `;

  results.forEach(file => {
    const disabled = !file.canRecover ? 'disabled' : '';
    const blockedIcon = file.blockedReason ? '🔒' : '✓';
    const blockedMsg = file.blockedReason ? `<p class="blocked-reason">${blockedIcon} ${file.blockedReason}</p>` : '';
    const fileIcon = getFileIcon(file.type);

    html += `
      <div class="result-item ${disabled}" data-file-id="${file.id}">
        <input type="checkbox" class="file-checkbox" ${disabled}>
        <span class="file-icon">${fileIcon}</span>
        <div class="file-info">
          <p class="file-name">${file.name}</p>
          <p class="file-size">${file.size}</p>
          ${blockedMsg}
        </div>
      </div>
    `;
  });

  html += `
        </div>

        <div class="recovery-actions">
          <button class="btn-primary" onclick="recoverFiles()">Recuperar Selecionados</button>
          <button class="btn-secondary" onclick="renderWizard('scan')">Voltar</button>
        </div>
      </div>
    </div>
  `;

  container.innerHTML = html;

  // Adicionar event listeners
  setTimeout(() => {
    const selectAllBtn = document.getElementById('btn-select-all');
    const checkboxes = document.querySelectorAll('.file-checkbox:not([disabled])');
    const selectedCount = document.getElementById('selected-count');

    if (selectAllBtn) {
      selectAllBtn.addEventListener('click', () => {
        const allChecked = Array.from(checkboxes).every(cb => cb.checked);
        checkboxes.forEach(cb => cb.checked = !allChecked);
        updateSelectedCount();
      });
    }

    checkboxes.forEach(cb => {
      cb.addEventListener('change', updateSelectedCount);
    });

    function updateSelectedCount() {
      const count = document.querySelectorAll('.file-checkbox:checked').length;
      selectedCount.textContent = count;
    }
  }, 100);
}

function getFileIcon(type) {
  const icons = {
    image: '🖼️',
    video: '🎬',
    audio: '🎵',
    document: '📄',
    archive: '📦'
  };
  return icons[type] || '📁';
}

function renderSubscriptionPage(container) {
  container.innerHTML = `
    <div class="subscription-container">
      <div class="plans-header">
        <h1>Escolha seu Plano</h1>
        <p>Selecione FREE para começar ou upgrade para PRO</p>
      </div>
      
      <div class="plans-grid" id="plans-grid">
        <p>Carregando planos...</p>
      </div>
    </div>
  `;

  loadSubscriptionPlans();
}

async function loadSubscriptionPlans() {
  try {
    const plans = await subscriptions.getPlans();
    const grid = document.getElementById('plans-grid');
    cachedPlans = Array.isArray(plans) ? plans : [];
    
    grid.innerHTML = plans.map(plan => `
      <div class="plan-card ${plan.id === 'pro' ? 'plan-card-pro' : 'plan-card-free'}">
        ${plan.id === 'pro' ? '<div class="plan-badge">Mais Popular</div>' : '<div class="plan-badge-basic">Plano Básico</div>'}
        
        <h3>${plan.name}</h3>
        
        <div class="plan-pricing">
          ${plan.originalPrice ? `<span class="original-price">De R$ ${(plan.originalPrice / 100).toFixed(2)}</span>` : ''}
          <span class="price">${plan.price === 0 ? 'Grátis' : 'R$ ' + (plan.price / 100).toFixed(2)}</span>
          ${plan.discount ? `<span class="discount">${plan.discount} OFF</span>` : ''}
          <span class="duration">/${plan.interval}</span>
        </div>

        <button class="btn-primary ${plan.id === 'pro' ? 'btn-pro' : 'btn-free'}" onclick="${plan.id === 'pro' ? "selectProPlan(); return false;" : "selectFreePlan(); return false;"}">
          ${plan.button}
        </button>

        <div class="plan-features">
          ${plan.features.map(f => `
            <div class="feature-item ${f.included ? 'included' : 'excluded'}">
              <span class="feature-icon">${f.included ? '✓' : '✗'}</span>
              <span class="feature-name">${f.name}</span>
            </div>
          `).join('')}
        </div>
      </div>
    `).join('');
  } catch (error) {
    showError('Erro ao carregar planos: ' + error.message);
  }
}

function selectFreePlan() {
  console.log('FREE Plan Selected');
  selectedAccessPlan = 'free';
  renderFreePlanInfo();
}

function selectProPlan() {
  console.log('PRO Plan Selected');
  selectedPaymentPlanId = 'pro';
  // Vai para tela de upgrade
  renderUpgradePage();
}

function renderUpgradePage() {
  const wizard = document.getElementById('wizard');
  wizard.innerHTML = `
    <div class="upgrade-container">
      <div class="upgrade-card">
        <h2 class="upgrade-title">Upgrade para PRO</h2>
        <p class="upgrade-price">Filesfy PRO - R$ 15,99</p>
        
        <div class="upgrade-features">
          <h3 class="features-title">Seu plano inclui:</h3>
          
          <div class="features-grid">
            <div class="features-column">
              <div class="feature-item-upgrade">
                <svg class="feature-check" viewBox="0 0 24 24" width="20" height="20">
                  <path fill="#0ea5e9" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
                <span>Limite 128GB por varredura</span>
              </div>
              
              <div class="feature-item-upgrade">
                <svg class="feature-check" viewBox="0 0 24 24" width="20" height="20">
                  <path fill="#0ea5e9" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
                <span>Recuperação avançada</span>
              </div>
              
              <div class="feature-item-upgrade">
                <svg class="feature-check" viewBox="0 0 24 24" width="20" height="20">
                  <path fill="#0ea5e9" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
                <span>Histórico 90 dias</span>
              </div>
              
              <div class="feature-item-upgrade">
                <svg class="feature-check" viewBox="0 0 24 24" width="20" height="20">
                  <path fill="#0ea5e9" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
                <span>Sem anúncios</span>
              </div>
            </div>
            
            <div class="features-column">
              <div class="feature-item-upgrade">
                <svg class="feature-check" viewBox="0 0 24 24" width="20" height="20">
                  <path fill="#0ea5e9" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
                <span>Armazenamento 5GB</span>
              </div>
              
              <div class="feature-item-upgrade">
                <svg class="feature-check" viewBox="0 0 24 24" width="20" height="20">
                  <path fill="#0ea5e9" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
                <span>Varreduras ilimitadas</span>
              </div>
              
              <div class="feature-item-upgrade">
                <svg class="feature-check" viewBox="0 0 24 24" width="20" height="20">
                  <path fill="#0ea5e9" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
                <span>Sem limite de arquivos</span>
              </div>
              
              <div class="feature-item-upgrade">
                <svg class="feature-check" viewBox="0 0 24 24" width="20" height="20">
                  <path fill="#0ea5e9" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
                <span>Suporte por email</span>
              </div>
              
              <div class="feature-item-upgrade">
                <svg class="feature-check" viewBox="0 0 24 24" width="20" height="20">
                  <path fill="#0ea5e9" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
                <span>Atualizações Automáticas</span>
              </div>
            </div>
          </div>
        </div>
        
        <button class="btn-primary btn-full" style="margin-top: 30px;" onclick="renderWizard('login')">Fazer Upgrade PRO</button>
        <button class="btn-voltar" style="margin-top: 15px;" onclick="renderWizard('subscription')">Voltar</button>
      </div>
    </div>
  `;
}

function startProPayment() {
  if (!requireAuth()) return;
  selectedPaymentPlanId = 'pro';
  showPaymentPage();
}

function showPaymentPage() {
  if (!requireAuth()) return;

  const wizard = document.getElementById('wizard');
  const plan = cachedPlans.find(p => p.id === selectedPaymentPlanId) || {
    id: 'pro',
    name: 'Filesfy PRO',
    price: 1599,
    interval: 'mês'
  };

  wizard.innerHTML = `
    <div class="payment-container">
      <div class="payment-header">
        <h2>Escolha a Forma de Pagamento</h2>
        <p>Clique em uma opção para continuar</p>
        <div class="payment-amount">
          <span>Total:</span>
          <strong>R$ ${(plan.price / 100).toFixed(2)}</strong>
          <span class="payment-period">/${plan.interval}</span>
        </div>
      </div>

      <div class="payment-methods">
        <div class="payment-option" data-method="pix">
          <svg class="payment-icon" viewBox="0 0 24 24">
            <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/>
          </svg>
          <div>
            <h3>PIX</h3>
            <p>Transferência instantânea</p>
          </div>
        </div>

        <div class="payment-option" data-method="credit_card">
          <svg class="payment-icon" viewBox="0 0 24 24">
            <path fill="currentColor" d="M20 8H4V6h16m0 10H4v-6h16m0-4H4c-1.11 0-2 .9-2 2v12c0 1.1.89 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2z"/>
          </svg>
          <div>
            <h3>Cartão de Crédito</h3>
            <p>Parcelado em até 12x</p>
          </div>
        </div>

        <div class="payment-option" data-method="debit_card">
          <svg class="payment-icon" viewBox="0 0 24 24">
            <path fill="currentColor" d="M20 8H4V6h16m0 10H4v-6h16m0-4H4c-1.11 0-2 .9-2 2v12c0 1.1.89 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2z"/>
          </svg>
          <div>
            <h3>Cartão de Débito</h3>
            <p>Débito em conta corrente</p>
          </div>
        </div>
      </div>

      <div style="display: flex; justify-content: center; margin-top: 20px;">
        <button class="btn-secondary" id="btn-back-payment">Voltar</button>
      </div>
    </div>
  `;

  document.querySelectorAll('.payment-option').forEach(option => {
    option.addEventListener('click', () => {
      const method = option.dataset.method;
      processPayment(method);
    });
  });

  const backBtn = document.getElementById('btn-back-payment');
  if (backBtn) {
    backBtn.addEventListener('click', () => renderWizard('subscription'));
  }
}

function renderFreePlanInfo() {
  const wizard = document.getElementById('wizard');
  const plan = cachedPlans.find(p => p.id === 'free') || {
    name: 'Filesfy FREE',
    price: 0,
    interval: 'mês',
    features: []
  };

  wizard.innerHTML = `
    <div class="subscription-container">
      <div class="plans-header">
        <h1>${plan.name}</h1>
        <p>Você já pode começar a recuperar seus arquivos</p>
      </div>

      <div class="plan-card plan-card-free" style="max-width: 720px; margin: 0 auto;">
        <div class="plan-badge-basic">Plano Básico</div>
        <h3>O que está liberado no FREE</h3>
        <div class="plan-features">
          ${plan.features.map(f => `
            <div class="feature-item ${f.included ? 'included' : 'excluded'}">
              <span class="feature-icon">${f.included ? '✓' : '✗'}</span>
              <span class="feature-name">${f.name}</span>
            </div>
          `).join('')}
        </div>

        <div style="margin-top: 20px; display: flex; gap: 12px; flex-wrap: wrap;">
          <button class="btn-primary btn-free" onclick="renderWizard('scan')">Iniciar Recuperação</button>
          <button class="btn-secondary" onclick="renderWizard('subscription')">Ver Planos</button>
        </div>
      </div>
    </div>
  `;
}

async function processPayment(method) {
  const wizard = document.getElementById('wizard');
  wizard.innerHTML = `
    <div class="loading-container">
      <div class="spinner"></div>
      <h2>Processando pagamento...</h2>
      <p>Método: ${method === 'pix' ? 'PIX' : method === 'credit_card' ? 'Cartão de Crédito' : 'Cartão de Débito'}</p>
    </div>
  `;

  try {
    if (!currentUser || !currentUser.id) {
      throw new Error('Usuário não autenticado. Faça login novamente.');
    }

    const result = await payments.createPaymentIntent(currentUser.id, 'PRO', method);

    if (result?.token) {
      localStorage.setItem('token', result.token);
    }

    if (result?.subscription) {
      localStorage.setItem('subscription', JSON.stringify(result.subscription));
      const user = JSON.parse(localStorage.getItem('user'));
      user.subscription = result.subscription;
      localStorage.setItem('user', JSON.stringify(user));
      currentUser = user;
    }

    showPaymentSuccess();
  } catch (error) {
    wizard.innerHTML = `
      <div class="error-container">
        <h2>Erro no Pagamento</h2>
        <p>${error?.message || 'Não foi possível processar o pagamento'}</p>
        <button class="btn-primary" id="btn-retry-payment">Tentar Novamente</button>
        <button class="btn-secondary" id="btn-back-home-error">Voltar ao Início</button>
      </div>
    `;

    const retryBtn = document.getElementById('btn-retry-payment');
    if (retryBtn) retryBtn.addEventListener('click', () => showPaymentPage());

    const backBtn = document.getElementById('btn-back-home-error');
    if (backBtn) backBtn.addEventListener('click', () => renderWizard('home'));
  }
}

function showPaymentSuccess() {
  const wizard = document.getElementById('wizard');
  wizard.innerHTML = `
    <div class="success-container">
      <svg class="success-icon" viewBox="0 0 24 24">
        <path fill="#22c55e" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
      </svg>
      <h2>Pagamento Realizado!</h2>
      <p>Sua assinatura PRO está ativa</p>
      <p class="success-details">Você agora tem acesso a todas as funcionalidades premium:</p>
      <ul style="text-align: left; margin: 20px auto; max-width: 400px; color: var(--color-text-secondary);">
        <li>✓ Recuperar até 50 arquivos por varredura</li>
        <li>✓ Limite de 5GB por scan</li>
        <li>✓ Todos os tipos de arquivo</li>
        <li>✓ Suporte prioritário</li>
      </ul>
      <button class="btn-primary" id="btn-start-recovery-pro">Iniciar Recuperação Agora</button>
    </div>
  `;

  const startBtn = document.getElementById('btn-start-recovery-pro');
  if (startBtn) {
    startBtn.addEventListener('click', () => {
      renderWizard('scan');
    });
  }
}

async function subscribeToPlan(planId) {
  if (!requireAuth()) return;

  try {
    const result = await subscriptions.subscribeToPlan(planId);
    
    // Atualizar token e subscription no localStorage
    if (result.token) {
      localStorage.setItem('token', result.token);
    }
    
    if (result.subscription) {
      localStorage.setItem('subscription', JSON.stringify(result.subscription));
      
      // Atualizar currentUser
      const user = JSON.parse(localStorage.getItem('user'));
      user.subscription = result.subscription;
      localStorage.setItem('user', JSON.stringify(user));
      currentUser = user;
    }
    
    showSuccess(`Plano ${planId.toUpperCase()} ativado com sucesso!`);
    
    // Recarregar página para aplicar mudanças
    setTimeout(() => {
      location.reload();
    }, 1500);
  } catch (error) {
    showError('Erro ao assinar plano: ' + error.message);
  }
}

// ==================== MODAIS E NOTIFICAÇÕES ====================
function showSuccess(message) {
  showNotification(message, 'success');
}

function showError(message) {
  showNotification(message, 'error');
}

function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 15px 20px;
    border-radius: 8px;
    background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
    color: white;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    z-index: 9999;
    animation: slideIn 0.3s ease-out;
  `;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease-out';
    setTimeout(() => notification.remove(), 300);
  }, 4000);
}

function showPrivacyPolicy(e) {
  e.preventDefault();
  const modal = document.getElementById('modal-dialog');
  const body = document.getElementById('modal-body');
  body.innerHTML = `
    <h2>Política de Privacidade</h2>
    <p>A Filesfy respeita sua privacidade e se compromete a proteger seus dados pessoais...</p>
  `;
  modal.showModal();
}

function showProductPolicy(e) {
  e.preventDefault();
  const modal = document.getElementById('modal-dialog');
  const body = document.getElementById('modal-body');
  body.innerHTML = `
    <h2>Política de Produtos</h2>
    <p>Todos os produtos Filesfy são desenvolvidos com os mais altos padrões de qualidade...</p>
  `;
  modal.showModal();
}

function showLicenseAgreement(e) {
  e.preventDefault();
  const modal = document.getElementById('modal-dialog');
  const body = document.getElementById('modal-body');
  body.innerHTML = `
    <h2>Termos de Serviço</h2>
    <p>Ao usar os serviços Filesfy, você concorda com os seguintes termos...</p>
  `;
  modal.showModal();
}

function showSupport() {
  const modal = document.getElementById('modal-dialog');
  const body = document.getElementById('modal-body');
  body.innerHTML = `
    <h2>Central de Suporte</h2>
    <div style="text-align: left;">
      <h3>Como podemos ajudar?</h3>
      <p><strong>Email:</strong> suporte@filesfy.com</p>
      <p><strong>Telefone:</strong> 0800-123-4567</p>
      <p><strong>Horário:</strong> Segunda a Sexta, 9h às 18h</p>
      <hr>
      <h3>Perguntas Frequentes</h3>
      <p><strong>Como recuperar arquivos deletados?</strong><br>
      Acesse "Recuperação" no menu, selecione o dispositivo e inicie a varredura.</p>
      <p><strong>Qual a diferença entre planos FREE e PRO?</strong><br>
      Plano FREE: 5 arquivos, 300MB | Plano PRO: 50 arquivos, 5GB por varredura.</p>
    </div>
  `;
  modal.showModal();
}

function showDocumentation() {
  const modal = document.getElementById('modal-dialog');
  const body = document.getElementById('modal-body');
  body.innerHTML = `
    <h2>Documentação</h2>
    <div style="text-align: left;">
      <h3>Guia de Uso</h3>
      <ol>
        <li><strong>Criar Conta:</strong> Clique em "Entrar" e depois "Cadastre-se"</li>
        <li><strong>Escolher Plano:</strong> Acesse "Preços" e selecione FREE ou PRO</li>
        <li><strong>Iniciar Recuperação:</strong> Clique em "Recuperação" no menu</li>
        <li><strong>Selecionar Dispositivo:</strong> Escolha o disco ou dispositivo</li>
        <li><strong>Varrer Arquivos:</strong> Aguarde a análise completar</li>
        <li><strong>Recuperar:</strong> Selecione os arquivos e clique em "Recuperar"</li>
      </ol>
      <h3>Recursos Técnicos</h3>
      <p>Acesse nossa documentação completa em: <a href="https://docs.filesfy.com" target="_blank">docs.filesfy.com</a></p>
    </div>
  `;
  modal.showModal();
}

// ==================== INICIALIZAÇÃO ====================
document.addEventListener('DOMContentLoaded', () => {
  loadTheme();
  setupResponsiveMenu();
  setupAccessibility();

  const btnTheme = document.getElementById('btn-theme-toggle');
  if (btnTheme) {
    btnTheme.addEventListener('click', toggleTheme);
  }

  // Setup modal close button
  const modal = document.getElementById('modal-dialog');
  if (modal) {
    const closeBtn = modal.querySelector('.modal-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        modal.close();
      });
    }
    
    // Fechar ao pressionar ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.open) {
        modal.close();
      }
    });

    // Acompanhar scroll do wizard-container
    const wizardContainer = document.getElementById('wizard');
    if (wizardContainer) {
      wizardContainer.addEventListener('scroll', () => {
        if (modal.open) {
          const scrollTop = wizardContainer.scrollTop;
          modal.style.top = `calc(50% + ${scrollTop}px)`;
        }
      });
    }
  }

  // Inicializar página
  if (loadAuthState()) {
    renderWizard('home');
  } else {
    renderWizard('subscription');
  }
});
// ==================== MODALS ====================
function openSupportModal(section) {
  const modal = document.getElementById('modal-dialog');
  const modalBody = document.getElementById('modal-body');
  const wizardContainer = document.getElementById('wizard');
  
  // Posicionar modal no topo visível do wizard-container
  if (wizardContainer) {
    const scrollTop = wizardContainer.scrollTop;
    modal.style.top = `${scrollTop + 50}px`;
  }
  
  let content = '';
  
  if (section === 'help') {
    content = `
      <h2>Central de Ajuda</h2>
      <p>Bem-vindo à Central de Ajuda do Filesfy. Aqui você encontra tudo o que precisa para recuperar seus dados com segurança.</p>
      
      <h3>Primeiros Passos</h3>
      <ul>
        <li>Conecte o dispositivo do qual deseja recuperar dados</li>
        <li>Escolha o tipo de arquivo que deseja recuperar (imagens, documentos, vídeos, etc.)</li>
        <li>Aguarde a conclusão do scan</li>
        <li>Selecione os arquivos encontrados e clique em "Recuperar"</li>
      </ul>
      
      <h3>Tutoriais Disponíveis</h3>
      <ul>
        <li>Como recuperar fotos deletadas do celular</li>
        <li>Recuperação de documentos do pen drive</li>
        <li>Restaurar vídeos de cartão SD formatado</li>
        <li>Recuperar arquivos de HD externo danificado</li>
      </ul>
      
      <h3>Melhores Práticas</h3>
      <ul>
        <li>Pare de usar o dispositivo imediatamente após perder os dados</li>
        <li>Não formate o dispositivo antes de tentar recuperar</li>
        <li>Use o Filesfy o quanto antes para aumentar as chances de sucesso</li>
        <li>Mantenha backups regulares para prevenir perdas futuras</li>
      </ul>
    `;
  } else if (section === 'faq') {
    content = `
      <h2>FAQ - Perguntas Frequentes</h2>
      <p>Respostas para as perguntas mais comuns sobre o Filesfy.</p>
      
      <h3>Quanto tempo demora a recuperação?</h3>
      <p>Depende do tamanho do dispositivo, geralmente entre 5 minutos a 2 horas.</p>
      
      <h3>É seguro recuperar meus dados?</h3>
      <p>Sim, usamos criptografia de ponta a ponta e nunca armazenamos seus dados.</p>
      
      <h3>Qual é a taxa de sucesso?</h3>
      <p>Nossa taxa de sucesso é superior a 85% para dispositivos com danos lógicos.</p>
      
      <h3>Posso recuperar dados de múltiplos dispositivos?</h3>
      <p>Sim, o plano PRO permite até 50 arquivos por scan.</p>
      
      <h3>Meus dados são privados?</h3>
      <p>Todos os dados são processados localmente e nunca são enviados para servidores.</p>
      
      <h3>Quais tipos de arquivo posso recuperar?</h3>
      <p>Suportamos imagens (JPG, PNG, GIF), documentos (PDF, DOC, XLS), vídeos (MP4, AVI, MOV), áudios (MP3, WAV) e muitos outros formatos.</p>
      
      <h3>O que acontece se eu cancelar minha assinatura?</h3>
      <p>Você manterá acesso aos recursos PRO até o final do período pago, depois voltará ao plano FREE.</p>
      
      <h3>Posso usar o Filesfy offline?</h3>
      <p>Sim, a recuperação de dados funciona completamente offline. Apenas o login e pagamento requerem conexão.</p>
    `;
  } else if (section === 'contact') {
    content = `
      <h2>Contato</h2>
      <p>Entre em contato com nossa equipe de suporte. Estamos aqui para ajudar!</p>
      
      <h3>Informações de Contato</h3>
      <p><strong>Email:</strong> <a href="mailto:suporte@filesfy.com">suporte@filesfy.com</a></p>
      <p><strong>Email Comercial:</strong> <a href="mailto:comercial@filesfy.com">comercial@filesfy.com</a></p>
      <p><strong>Email Técnico:</strong> <a href="mailto:tech@filesfy.com">tech@filesfy.com</a></p>
      
      <h3>Horário de Atendimento</h3>
      <p><strong>Segunda a Sexta:</strong> 9h às 18h (Horário de Brasília)</p>
      <p><strong>Sábados:</strong> 9h às 13h (Horário de Brasília)</p>
      <p><strong>Domingos e Feriados:</strong> Fechado</p>
      
      <h3>Tempo de Resposta</h3>
      <p><strong>Plano FREE:</strong> Até 48 horas úteis</p>
      <p><strong>Plano PRO:</strong> Até 24 horas (suporte prioritário)</p>
      
      <h3>Redes Sociais</h3>
      <p>Siga-nos para novidades e dicas:</p>
      <ul>
        <li>Twitter: @filesfy</li>
        <li>Instagram: @filesfy_oficial</li>
        <li>LinkedIn: Filesfy Inc.</li>
        <li>YouTube: Filesfy Tutoriais</li>
      </ul>
    `;
  }
  
  modalBody.innerHTML = content;
  modal.showModal();
}

function openLegalModal(section) {
  const modal = document.getElementById('modal-dialog');
  const modalBody = document.getElementById('modal-body');
  const wizardContainer = document.getElementById('wizard');
  
  // Posicionar modal no topo visível do wizard-container
  if (wizardContainer) {
    const scrollTop = wizardContainer.scrollTop;
    modal.style.top = `${scrollTop + 50}px`;
  }
  
  let content = '';
  
  if (section === 'privacy') {
    content = `
      <h2>Política de Privacidade</h2>
      <p><strong>Última atualização: 31 de janeiro de 2026</strong></p>
      
      <h3>1. Introdução</h3>
      <p>A Filesfy Inc. respeita sua privacidade e se compromete a proteger seus dados pessoais. Esta Política de Privacidade explica como coletamos, usamos e protegemos suas informações.</p>
      
      <h3>2. Dados que Coletamos</h3>
      <ul>
        <li>Informações de conta: nome, email, senha (criptografada)</li>
        <li>Informações de dispositivo: identificadores de dispositivo, tipos de arquivo procurados</li>
        <li>Dados de uso: histórico de scans, plano utilizado</li>
        <li>Informações técnicas: IP, navegador, sistema operacional</li>
      </ul>
      
      <h3>3. Como Usamos Seus Dados</h3>
      <ul>
        <li>Fornecer e melhorar nossos serviços</li>
        <li>Autenticar sua conta e processar pagamentos</li>
        <li>Comunicar sobre atualizações e ofertas (apenas com consentimento)</li>
        <li>Analisar uso e melhorar a experiência do usuário</li>
        <li>Cumprir obrigações legais</li>
      </ul>
      
      <h3>4. Segurança de Dados</h3>
      <p>Usamos criptografia AES-256 para todos os dados sensíveis e seguimos as normas LGPD e GDPR.</p>
      
      <h3>5. Seus Direitos</h3>
      <p>Você tem direito a acessar, corrigir ou deletar seus dados. Contate suporte@filesfy.com para solicitar.</p>
    `;
  } else if (section === 'terms') {
    content = `
      <h2>Termos de Serviço</h2>
      <p><strong>Última atualização: 31 de janeiro de 2026</strong></p>
      
      <h3>1. Aceitação dos Termos</h3>
      <p>Ao usar a Filesfy, você concorda com estes Termos de Serviço. Se não concordar, não use nosso serviço.</p>
      
      <h3>2. Licença de Uso</h3>
      <p>Concedemos a você uma licença limitada, não-exclusiva e revogável para usar a Filesfy pessoalmente ou comercialmente.</p>
      
      <h3>3. Planos de Assinatura</h3>
      <ul>
        <li><strong>Plano FREE:</strong> Até 5 arquivos, 300MB por scan, acesso limitado</li>
        <li><strong>Plano PRO:</strong> Até 50 arquivos, 5GB por scan, suporte prioritário</li>
      </ul>
      
      <h3>4. Pagamento e Reembolso</h3>
      <p>Pagamentos são processados imediatamente. Reembolsos são disponíveis em até 30 dias da compra, sujeito a avaliação.</p>
      
      <h3>5. Responsabilidades do Usuário</h3>
      <ul>
        <li>Você é responsável por manter a confidencialidade de sua senha</li>
        <li>Você concorda em usar a Filesfy apenas para fins legais</li>
        <li>Você não pode redistribuir ou revender nosso serviço</li>
      </ul>
      
      <h3>6. Isenção de Garantia</h3>
      <p>A Filesfy é fornecida "no estado em que se encontra" sem garantias. Não garantimos 100% de sucesso em todas as recuperações.</p>
      
      <h3>7. Limitação de Responsabilidade</h3>
      <p>A Filesfy Inc. não será responsável por perdas indiretas, incidentais ou consequentes resultantes do uso do serviço.</p>
    `;
  } else if (section === 'cookies') {
    content = `
      <h2>Política de Cookies</h2>
      <p><strong>Última atualização: 31 de janeiro de 2026</strong></p>
      
      <h3>1. O que são Cookies?</h3>
      <p>Cookies são pequenos arquivos de texto armazenados no seu navegador para melhorar sua experiência.</p>
      
      <h3>2. Tipos de Cookies que Usamos</h3>
      <ul>
        <li><strong>Cookies Essenciais:</strong> Necessários para autenticação e segurança</li>
        <li><strong>Cookies de Preferência:</strong> Armazenam suas preferências de tema e idioma</li>
        <li><strong>Cookies de Análise:</strong> Ajudam-nos a entender como você usa a Filesfy</li>
        <li><strong>Cookies de Rastreamento:</strong> Usados apenas com seu consentimento explícito</li>
      </ul>
      
      <h3>3. Como Gerenciar Cookies</h3>
      <p>Você pode desabilitar cookies nas configurações do seu navegador. Note que isso pode afetar algumas funcionalidades.</p>
      
      <h3>4. Cookies de Terceiros</h3>
      <p>Utilizamos Google Analytics e Stripe, que podem estabelecer seus próprios cookies. Veja suas políticas de privacidade para mais detalhes.</p>
    `;
  } else if (section === 'lgpd') {
    content = `
      <h2>Conformidade com LGPD</h2>
      <p><strong>Última atualização: 31 de janeiro de 2026</strong></p>
      
      <h3>1. Lei Geral de Proteção de Dados (LGPD)</h3>
      <p>A Filesfy está totalmente em conformidade com a Lei nº 13.709/2018 (LGPD) - a legislação brasileira de proteção de dados pessoais.</p>
      
      <h3>2. Princípios Fundamentais</h3>
      <ul>
        <li><strong>Finalidade:</strong> Coletamos dados apenas para fins específicos e determinados</li>
        <li><strong>Adequação:</strong> Os dados coletados são adequados e relevantes</li>
        <li><strong>Necessidade:</strong> Coletamos apenas o mínimo necessário</li>
        <li><strong>Transparência:</strong> Informamos claramente sobre coleta e uso de dados</li>
        <li><strong>Segurança:</strong> Protegemos seus dados com tecnologias avançadas</li>
      </ul>
      
      <h3>3. Direitos do Titular</h3>
      <p>Você tem direito a:</p>
      <ul>
        <li>Acessar seus dados pessoais</li>
        <li>Corrigir dados incompletos ou inexatos</li>
        <li>Solicitar exclusão de dados</li>
        <li>Obter confirmação de tratamento</li>
        <li>Revogar consentimento a qualquer momento</li>
      </ul>
      
      <h3>4. Encarregado de Proteção de Dados (DPO)</h3>
      <p><strong>Email:</strong> dpo@filesfy.com</p>
      <p>Para exercer seus direitos ou fazer reclamações, entre em contato com nosso DPO.</p>
      
      <h3>5. Dados de Menores</h3>
      <p>A Filesfy não coleta dados de menores de 13 anos. Se identificarmos tal coleta, deletaremos imediatamente.</p>
    `;
  }
  
  modalBody.innerHTML = content;
  modal.showModal();
}

// ==================== AUTENTICAÇÃO GOOGLE ====================
function renderGoogleAuthPage(container) {
  container.innerHTML = `
    <div class="auth-container">
      <div class="auth-card">
        <h2>Entrar com Google</h2>
        <p style="color: #666; margin-bottom: 25px;">Escolha como deseja continuar:</p>
        
        <button class="btn-primary" style="width: 100%; margin-bottom: 15px; padding: 12px;" onclick="handleGoogleLogin()">
          <span style="font-size: 18px; margin-right: 8px;">🔐</span> Entrar com Conta Google
        </button>
        
        <div style="text-align: center; margin: 20px 0;">
          <p style="color: #999;">ou</p>
        </div>
        
        <button class="btn-secondary" style="width: 100%; padding: 12px;" onclick="createTestUser()">
          <span style="font-size: 18px; margin-right: 8px;">👤</span> Usuário de Teste
        </button>
        
        <button class="btn-secondary" style="width: 100%; margin-top: 15px; padding: 12px;" onclick="renderWizard('subscription')">
          Voltar aos Planos
        </button>
      </div>
    </div>
  `;
}

function handleGoogleLogin() {
  currentUser = {
    id: 'google-' + Math.random().toString(36).substring(7),
    name: 'Usuário Google',
    email: 'user@gmail.com',
    createdAt: new Date().toISOString(),
    paymentConfirmed: false
  };
  
  localStorage.setItem('filesfy-user', JSON.stringify(currentUser));
  showPaymentPage();
}

function createTestUser() {
  currentUser = {
    id: 'test-' + Date.now(),
    name: 'Usuário Teste',
    email: `test-${Date.now()}@filesfy.dev`,
    createdAt: new Date().toISOString(),
    paymentConfirmed: false
  };
  
  localStorage.setItem('filesfy-user', JSON.stringify(currentUser));
  showPaymentPage();
}

// ==================== NOVA TELA DE LOGIN COM GOOGLE ====================
function renderLoginPageNew(container) {
  container.innerHTML = `
    <div class="auth-container">
      <div class="auth-card">
        <div style="text-align: center; margin-bottom: 30px;">
          <h2 style="color: var(--color-text-primary); font-weight: 600; margin-bottom: 10px; font-size: 28px;">Bem-vindo ao Filesfy</h2>
          <p style="color: var(--color-text-secondary); margin: 0; font-size: 15px;">Faça login para continuar</p>
        </div>
        
        <div id="g_id_onload"
          data-client_id="USE_YOUR_GOOGLE_CLIENT_ID_FROM_CONSOLE.apps.googleusercontent.com"
          data-context="signin"
          data-ux_mode="popup"
          data-callback="handleGoogleCallback"
          data-auto_prompt="false">
        </div>

        <button class="google-signin-btn" id="google-signin-custom">
          <svg class="google-icon" viewBox="0 0 24 24" width="18" height="18">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          <span>Continuar com o Google</span>
        </button>

        <div style="text-align: center; margin: 20px 0;">
          <span style="color: var(--color-text-tertiary); font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">ou</span>
        </div>

        <button class="btn-test-login" id="test-login-btn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
          <span>Entrar como Usuário Teste</span>
        </button>
        
        <button class="btn-voltar" onclick="renderWizard('subscription'); return false;">Voltar</button>
      </div>
    </div>
  `;

  // Inicializar Google Sign-In após renderizar
  setTimeout(() => {
    initializeGoogleSignIn();
    initializeTestLogin();
  }, 100);
}

/**
 * Inicializa o botão de login de teste
 */
function initializeTestLogin() {
  const button = document.getElementById('test-login-btn');
  if (button) {
    button.addEventListener('click', async () => {
      try {
        const result = await auth.testLogin('teste@filesfy.com', 'Usuário Teste');
        
        localStorage.setItem('token', result.token);
        localStorage.setItem('user', JSON.stringify(result.user));
        if (result.subscription) {
          localStorage.setItem('subscription', JSON.stringify(result.subscription));
        }
        
        currentUser = result.user;
        currentUser.subscription = result.subscription;
        isAuthenticated = true;
        
        updateAuthUI();
        
        // Redireciona para pagamento do plano PRO
        selectedPaymentPlanId = 'pro';
        showPaymentPage();
        showSuccess('Login de teste realizado com sucesso!');
      } catch (error) {
        console.error('Erro no login de teste:', error);
        showError('Erro ao fazer login de teste: ' + error.message);
      }
    });
  }
}

/**
 * Inicializa o botão do Google Sign-In
 */
function initializeGoogleSignIn() {
  const button = document.getElementById('google-signin-custom');
  if (button) {
    button.addEventListener('click', () => {
      // Trigger Google Sign-In
      if (window.google && window.google.accounts) {
        window.google.accounts.id.initialize({
          client_id: 'USE_YOUR_GOOGLE_CLIENT_ID_FROM_CONSOLE.apps.googleusercontent.com',
          callback: handleGoogleCallback,
          auto_select: false,
          cancel_on_tap_outside: true,
        });
        window.google.accounts.id.prompt();
      } else {
        console.error('Google Sign-In API não carregada');
        showError('Erro ao carregar Google Sign-In. Tente novamente.');
      }
    });
  }
}

/**
 * Callback do Google Sign-In (chamado globalmente)
 */
window.handleGoogleCallback = async function(response) {
  if (response.credential) {
    try {
      const result = await auth.googleLogin(response.credential);
      
      localStorage.setItem('token', result.token);
      localStorage.setItem('user', JSON.stringify(result.user));
      if (result.subscription) {
        localStorage.setItem('subscription', JSON.stringify(result.subscription));
      }
      
      currentUser = result.user;
      currentUser.subscription = result.subscription;
      isAuthenticated = true;
      
      updateAuthUI();
      renderWizard('home');
      showSuccess('Login realizado com sucesso!');
    } catch (error) {
      console.error('Erro no Google Login:', error);
      showError('Erro ao fazer login com Google: ' + error.message);
    }
  }
};