'use client';

import { useEffect } from 'react';

function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = crypto.getRandomValues(new Uint8Array(1))[0] % 16;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

function getDeviceId() {
  let id = localStorage.getItem('deviceId');
  if (!id) {
    id = generateUUID();
    localStorage.setItem('deviceId', id);
  }
  return id;
}

export default function ClickTracker() {
  useEffect(() => {
    const deviceId = getDeviceId();
    const domain = 'https://www.z7neckbrace.online/';

    fetch('https://fantasymmadness-game-server-three.vercel.app/track-click', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ deviceId, domain })
    })
      .then(res => res.json())
      .then(data => console.log('Click Tracked:', data.message))
      .catch(err => console.error('Tracking failed:', err));
  }, []);

  return null;
}
