import { useState, useEffect } from 'react';

function App() {
  const [appVersion, setAppVersion] = useState('...');
  const [platform, setPlatform] = useState('...');

  useEffect(() => {
    window.electronAPI.getAppVersion().then(setAppVersion);
    window.electronAPI.getPlatform().then(setPlatform);
  }, []);

  const { electron, node, chrome } = window.electronAPI.versions;

  return (
    <div className="app">
      <h1>Kens Electron Boilerplate</h1>
      <p className="subtitle">Ready to build something amazing</p>

      <div className="info-grid">
        <div className="info-card">
          <div className="label">App Version</div>
          <div className="value">{appVersion}</div>
        </div>
        <div className="info-card">
          <div className="label">Platform</div>
          <div className="value">{platform}</div>
        </div>
        <div className="info-card">
          <div className="label">Electron</div>
          <div className="value">{electron}</div>
        </div>
        <div className="info-card">
          <div className="label">Node</div>
          <div className="value">{node}</div>
        </div>
        <div className="info-card">
          <div className="label">Chrome</div>
          <div className="value">{chrome}</div>
        </div>
        <div className="info-card">
          <div className="label">Renderer</div>
          <div className="value">React + Vite</div>
        </div>
      </div>

      <div className="tech-stack">
        <span className="tech-badge">Electron</span>
        <span className="tech-badge">React</span>
        <span className="tech-badge">TypeScript</span>
        <span className="tech-badge">Vite</span>
      </div>
    </div>
  );
}

export default App;
