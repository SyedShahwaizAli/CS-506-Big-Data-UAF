var loaded = {};

function showTab(tabId, btn) {
  document.querySelectorAll('.tab-content').forEach(function(t) {
    t.classList.remove('active');
  });
  document.querySelectorAll('.tab').forEach(function(b) {
    b.classList.remove('active');
  });

  document.getElementById(tabId).classList.add('active');
  btn.classList.add('active');

  if (!loaded[tabId]) {
    loaded[tabId] = true;
    if (tabId === 'tab2') drawScatterChart();
    if (tabId === 'tab3') drawMap('gdp', document.querySelector('.mbtn'));
    if (tabId === 'tab4') { draw3DScatter(); draw3DSurface(); }
    if (tabId === 'tab5') { drawAnimatedChart(); drawAreaChart(); }
  }

  window.dispatchEvent(new Event('resize'));
}

function exportDashboard() {
  var btn = document.querySelector('.top-bar button');
  btn.textContent = '⏳ Generating…';

  var charts = document.querySelectorAll('.js-plotly-plot');
  var promises = Array.from(charts).map(function(c) {
    return Plotly.toImage(c, { format: 'png', width: 750, height: 400 }).catch(function() { return null; });
  });

  Promise.all(promises).then(function(imgs) {
    var chartHTML = Array.from(charts).map(function(c, i) {
      return imgs[i]
        ? '<div style="margin:16px 0"><p style="font-size:11px;color:#64748b;margin-bottom:6px">' + c.id + '</p><img src="' + imgs[i] + '" style="width:100%;border-radius:8px;border:1px solid #e2e8f0"/></div>'
        : '';
    }).join('');

    var html = '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Dashboard Export</title>'
      + '<style>body{font-family:Segoe UI,sans-serif;background:#f0f4ff;padding:32px;color:#333}'
      + '.header{background:#1e3a8a;color:white;padding:18px 24px;border-radius:10px;margin-bottom:24px}'
      + '.header h1{font-size:1.3rem}.header p{font-size:0.78rem;opacity:0.7;margin-top:4px}'
      + '.cards{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:24px}'
      + '.card{background:white;border-left:4px solid #3b82f6;border-radius:8px;padding:14px 18px;text-align:center}'
      + '.cv{font-size:1.5rem;font-weight:700;color:#1e3a8a}.cl{font-size:11px;color:#64748b;margin-top:4px}'
      + '.footer{margin-top:24px;text-align:center;font-size:11px;color:#94a3b8}</style></head><body>'
      + '<div class="header"><h1>🌍 World Data Dashboard — Export</h1><p>BSCS 6th Semester | Practical Task 6 | Generated: ' + new Date().toLocaleString() + '</p></div>'
      + '<div class="cards">'
      + '<div class="card"><div class="cv">8.1 B</div><div class="cl">World Population</div></div>'
      + '<div class="card"><div class="cv">$105 T</div><div class="cl">Global GDP</div></div>'
      + '<div class="card"><div class="cv">$13,100</div><div class="cl">GDP Per Capita</div></div>'
      + '<div class="card"><div class="cv">72.8 yrs</div><div class="cl">Life Expectancy</div></div>'
      + '</div>'
      + chartHTML
      + '<div class="footer">Data: World Bank & IMF 2024 | BSCS Practical Task 6</div>'
      + '</body></html>';

    var blob = new Blob([html], { type: 'text/html' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'world_dashboard_export.html';
    a.click();
    URL.revokeObjectURL(url);

    btn.textContent = '✅ Exported!';
    setTimeout(function() { btn.textContent = '⬇ Export as HTML'; }, 2000);
  });
}

drawLineChart();
drawBarChart();
loaded['tab1'] = true;
