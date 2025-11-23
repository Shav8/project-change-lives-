import React, { useState } from "react";

export default function App() {
  const [view, setView] = useState("dashboard");
  const [balance, setBalance] = useState(100);
  const [days, setDays] = useState(300);
  const [dailyTargetPct, setDailyTargetPct] = useState(0.03);
  const [riskPerTradePct, setRiskPerTradePct] = useState(0.05);

  function simulateCompound(initial, dailyRate, daysToSim) {
    const timeline = [];
    let bal = initial;
    for (let i = 1; i <= daysToSim; i++) {
      bal = +(bal * (1 + dailyRate)).toFixed(8);
      timeline.push({ day: i, balance: +bal.toFixed(2) });
    }
    return timeline;
  }

  function tradesPerDayForRisk(balance, riskPct, targetPct) {
    // If each trade risks riskPct of balance, and targetPct is goal per day,
    // number of winning trades needed (assuming full target achieved by wins of riskPct each)
    if (riskPct <= 0) return 0;
    return Math.ceil((targetPct) / riskPct);
  }

  const timeline = simulateCompound(balance, dailyTargetPct, days);
  const tradesNeeded = tradesPerDayForRisk(balance, riskPerTradePct, dailyTargetPct);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold">Project Change Lives</h1>
          <nav className="space-x-3">
            <button onClick={() => setView('dashboard')} className="px-3 py-1 rounded-md hover:bg-gray-100">Dashboard</button>
            <button onClick={() => setView('planner')} className="px-3 py-1 rounded-md hover:bg-gray-100">Planner</button>
            <button onClick={() => setView('tools')} className="px-3 py-1 rounded-md hover:bg-gray-100">Tools</button>
          </nav>
        </div>
      </header>

      <main className="flex-1 max-w-5xl mx-auto p-4">
        {view === 'dashboard' && (
          <section>
            <h2 className="text-2xl font-bold mb-4">Dashboard</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-white rounded shadow">
                <h3 className="font-semibold">Balance</h3>
                <div className="text-3xl">${balance.toFixed(2)}</div>
              </div>

              <div className="p-4 bg-white rounded shadow">
                <h3 className="font-semibold">Daily Target</h3>
                <div>{(dailyTargetPct*100).toFixed(2)}%</div>
              </div>

              <div className="p-4 bg-white rounded shadow">
                <h3 className="font-semibold">Risk per Trade</h3>
                <div>{(riskPerTradePct*100).toFixed(2)}%</div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-white rounded shadow">
              <h3 className="font-semibold mb-2">Compound Simulator (first 10 days)</h3>
              <ol className="list-decimal pl-6">
                {timeline.slice(0,10).map(t=>(
                  <li key={t.day}>Day {t.day}: ${t.balance.toFixed(2)}</li>
                ))}
              </ol>
            </div>

            <div className="mt-6 p-4 bg-white rounded shadow">
              <h3 className="font-semibold">Trades needed per day to reach daily target</h3>
              <p className="text-lg">{tradesNeeded} trade(s) (assuming each winning trade returns ~{(riskPerTradePct*100).toFixed(2)}% of balance)</p>
            </div>
          </section>
        )}

        {view === 'planner' && (
          <section>
            <h2 className="text-2xl font-bold mb-4">Planner</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="block p-4 bg-white rounded shadow">
                <span className="text-sm">Starting balance</span>
                <input type="number" value={balance} onChange={e=>setBalance(parseFloat(e.target.value)||0)} className="w-full mt-2 p-2 border rounded" />
              </label>

              <label className="block p-4 bg-white rounded shadow">
                <span className="text-sm">Days to simulate</span>
                <input type="number" value={days} onChange={e=>setDays(parseInt(e.target.value)||0)} className="w-full mt-2 p-2 border rounded" />
              </label>

              <label className="block p-4 bg-white rounded shadow">
                <span className="text-sm">Daily target (%)</span>
                <input step="0.01" type="number" value={dailyTargetPct*100} onChange={e=>setDailyTargetPct((parseFloat(e.target.value)||0)/100)} className="w-full mt-2 p-2 border rounded" />
              </label>

              <label className="block p-4 bg-white rounded shadow">
                <span className="text-sm">Risk per trade (%)</span>
                <input step="0.01" type="number" value={riskPerTradePct*100} onChange={e=>setRiskPerTradePct((parseFloat(e.target.value)||0)/100)} className="w-full mt-2 p-2 border rounded" />
              </label>
            </div>

            <div className="mt-4 p-4 bg-white rounded shadow">
              <h4 className="font-semibold">Projected balance after {days} days</h4>
              <div>${simulateProjected(balance, dailyTargetPct, days).toFixed(2)}</div>
            </div>
          </section>
        )}

        {view === 'tools' && (
          <section>
            <h2 className="text-2xl font-bold mb-4">Tools</h2>
            <p className="p-4 bg-white rounded shadow">Placeholder for VA toolkit, coloring-book generator, and AI chat (to be integrated).</p>
          </section>
        )}
      </main>

      <footer className="bg-white border-t py-3">
        <div className="max-w-5xl mx-auto px-4 text-sm text-center">
          © Project Change Lives
        </div>
      </footer>
    </div>
  );

  // helper used inside return (declared after to keep JSX clean)
  function simulateProjected(initial, dailyRate, daysToSim) {
    let bal = initial;
    for (let i = 1; i <= daysToSim; i++) {
      bal = +(bal * (1 + dailyRate)).toFixed(8);
    }
    return +bal.toFixed(2);
  }
}
