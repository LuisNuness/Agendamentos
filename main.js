const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  // Cria uma janela do navegador
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true, // Permite usar Node.js no frontend
      contextIsolation: false, // Necessário para integração com React
    },
  });

  // Carrega o aplicativo React
  if (process.env.NODE_ENV === 'development') {
    // No desenvolvimento, carrega o servidor local do React
    win.loadURL('http://localhost:3000');
  } else {
    // Na produção, carrega o build estático
    const indexPath = path.join(__dirname, 'out', 'index.html');
    win.loadFile(indexPath);
  }

  // Abre o console do Electron para depuração
  win.webContents.openDevTools();
}

// Quando o Electron estiver pronto, cria a janela
app.whenReady().then(createWindow);

// Fecha o aplicativo quando todas as janelas são fechadas
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') { 
    app.quit();
  }
});

// Reabre a janela no macOS (comportamento padrão)
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// Tratamento de erros não capturados
process.on('uncaughtException', (error) => {
  console.error('Erro não tratado:', error);
});