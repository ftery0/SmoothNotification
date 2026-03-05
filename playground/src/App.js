import { useState } from 'react';
import { SmoothProvider, smooth } from 'smooth-notification';
import '../../src/styles/smooth.scss';
import './App.css';

function Demo() {
  const [modalOpen, setModalOpen] = useState(false);

  async function handleConfirm() {
    const ok = await smooth.confirm('Delete this item permanently?', {
      title: 'Delete Item',
      confirmText: 'Delete',
      cancelText: 'Cancel',
      icon: 'error',
    });
    smooth.toast(ok ? 'Item deleted.' : 'Cancelled.', {
      type: ok ? 'success' : 'default',
    });
  }

  async function handleAlert() {
    await smooth.alert('Your session will expire in 5 minutes.', {
      title: 'Session Warning',
      okText: 'Got it',
      icon: 'warning',
    });
    smooth.toast('Acknowledged!', { type: 'info' });
  }

  async function handleModal() {
    await smooth.modal(
      <div>
        <p>This is a custom modal with arbitrary React content.</p>
        <p style={{ marginTop: 12, color: 'rgba(237,237,250,0.5)', fontSize: 13 }}>
          Press ESC or click outside to close.
        </p>
      </div>,
      { title: 'Custom Modal' }
    );
    smooth.toast('Modal closed.', { type: 'info' });
  }

  return (
    <div className="demo">
      <div className="demo__header">
        <h1 className="demo__title">SmoothNotification</h1>
        <p className="demo__subtitle">Nocturne Design System · Toast · Modal · Confirm · Alert</p>
      </div>

      <div className="demo__grid">
        <div className="demo__section">
          <h2 className="demo__section-title">Toast</h2>
          <div className="demo__buttons">
            <button className="sn-btn sn-btn--success" onClick={() => smooth.toast('Operation successful!', { type: 'success' })}>
              Success
            </button>
            <button className="sn-btn sn-btn--danger" onClick={() => smooth.toast('Something went wrong.', { type: 'error' })}>
              Error
            </button>
            <button className="sn-btn sn-btn--ghost" onClick={() => smooth.toast('Heads up! Check this out.', { type: 'warning' })}>
              Warning
            </button>
            <button className="sn-btn sn-btn--primary" onClick={() => smooth.toast('Here is some information.', { type: 'info' })}>
              Info
            </button>
            <button className="sn-btn sn-btn--ghost" onClick={() => smooth.toast('Default notification.', { type: 'default' })}>
              Default
            </button>
            <button className="sn-btn sn-btn--ghost" onClick={() => smooth.toast('This toast stays forever.', { type: 'info', autoClose: false })}>
              No auto-close
            </button>
          </div>
        </div>

        <div className="demo__section">
          <h2 className="demo__section-title">Positions</h2>
          <div className="demo__buttons">
            {['top-right', 'top-center', 'top-left', 'bottom-right', 'bottom-center', 'bottom-left'].map(pos => (
              <button
                key={pos}
                className="sn-btn sn-btn--ghost"
                onClick={() => smooth.toast(`Toast at ${pos}`, { type: 'info', position: pos })}
              >
                {pos}
              </button>
            ))}
          </div>
        </div>

        <div className="demo__section">
          <h2 className="demo__section-title">Dialogs</h2>
          <div className="demo__buttons">
            <button className="sn-btn sn-btn--danger" onClick={handleConfirm}>
              Confirm
            </button>
            <button className="sn-btn sn-btn--ghost" onClick={handleAlert}>
              Alert
            </button>
            <button className="sn-btn sn-btn--primary" onClick={handleModal}>
              Modal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <SmoothProvider defaultPosition="top-right" defaultAutoClose={4000}>
      <Demo />
    </SmoothProvider>
  );
}
