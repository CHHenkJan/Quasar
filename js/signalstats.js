/* ══════════════════════════════════════════
   QUASAR — Signalstats API integration
   Populates the signal log on track-record.html
   from https://www.cryptohopper.com/signalstats.php
   The Regime and Confidence columns aren't surfaced
   by the public API; they stay as em-dashes for now.
   ══════════════════════════════════════════ */

(function () {
  const SIGNALLER_ID = 745;
  const API = 'https://www.cryptohopper.com/signalstats.php';

  function formatDate(unix) {
    if (!unix) return '—';
    return new Date(unix * 1000).toISOString().slice(0, 10);
  }

  function formatPct(n) {
    if (n === null || n === undefined || Number.isNaN(n)) return '';
    const sign = n >= 0 ? '+' : '-';
    return sign + Math.abs(n).toFixed(2) + '%';
  }

  function renderRows(tbody, trades) {
    if (!tbody || !trades || !trades.length) return;
    tbody.innerHTML = trades
      .slice(0, 10)
      .map((t) => {
        const win = (t.result_pct || 0) >= 0;
        const status = `Closed <span class="${win ? 'text-positive' : 'text-negative'}">${formatPct(t.result_pct)}</span>`;
        return `
          <tr>
            <td>${formatDate(t.exit_time)}</td>
            <td>${t.market}</td>
            <td>${(t.side || 'long').replace(/^./, (c) => c.toUpperCase())}</td>
            <td>—</td>
            <td>—</td>
            <td>${status}</td>
          </tr>`;
      })
      .join('');
  }

  async function load() {
    const tbody = document.querySelector('.track-table tbody');
    if (!tbody) return;
    try {
      const url = `${API}?signal_id=${SIGNALLER_ID}&exchange=all&trades=1`;
      const res = await fetch(url, { cache: 'no-store' });
      const json = await res.json();
      if (json.status !== 1 || !json.data) return;
      if (Array.isArray(json.data.paired_trades)) {
        renderRows(tbody, json.data.paired_trades);
      }
    } catch (err) {
      // Silent: keep em-dash placeholder rows on failure.
      // eslint-disable-next-line no-console
      console.warn('[signalstats]', err);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', load);
  } else {
    load();
  }
})();
