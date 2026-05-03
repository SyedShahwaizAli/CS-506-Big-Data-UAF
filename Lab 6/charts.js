var COLORS = {
  'Americas': '#3b82f6',
  'Europe':   '#8b5cf6',
  'Asia':     '#10b981',
  'Africa':   '#f59e0b',
  'Oceania':  '#ec4899'
};

var BASE = {
  paper_bgcolor: 'rgba(0,0,0,0)',
  plot_bgcolor:  'rgba(0,0,0,0)',
  font: { family: 'Segoe UI, sans-serif', color: '#475569', size: 11 },
  margin: { t: 50, r: 30, b: 50, l: 60 },
  xaxis: { gridcolor: '#f1f5f9', linecolor: '#e2e8f0' },
  yaxis: { gridcolor: '#f1f5f9', linecolor: '#e2e8f0' }
};

function drawLineChart() {
  var trace1 = {
    x: years,
    y: worldPop,
    name: 'Population (Billion)',
    type: 'scatter',
    mode: 'lines+markers',
    line: { color: '#3b82f6', width: 3 },
    marker: { size: 7, color: '#3b82f6' },
    fill: 'tozeroy',
    fillcolor: 'rgba(59,130,246,0.08)'
  };

  var trace2 = {
    x: years,
    y: worldGDP,
    name: 'GDP (Trillion $)',
    type: 'scatter',
    mode: 'lines+markers',
    line: { color: '#10b981', width: 3 },
    marker: { size: 7, color: '#10b981' },
    yaxis: 'y2'
  };

  var layout = Object.assign({}, BASE, {
    title: { text: 'World Population & GDP Over Time', font: { size: 13, color: '#1e3a8a' } },
    yaxis:  { title: { text: 'Population (Billions)' }, gridcolor: '#f1f5f9' },
    yaxis2: { title: { text: 'GDP (Trillion USD)' }, overlaying: 'y', side: 'right' },
    legend: { x: 0.01, y: 0.98 },
    hovermode: 'x unified'
  });

  Plotly.newPlot('lineChart', [trace1, trace2], layout, { responsive: true, displayModeBar: false });
}

function drawBarChart() {
  var t2000 = { x: regions, y: gdp2000, name: '2000', type: 'bar', marker: { color: 'rgba(59,130,246,0.6)' } };
  var t2010 = { x: regions, y: gdp2010, name: '2010', type: 'bar', marker: { color: 'rgba(139,92,246,0.6)' } };
  var t2024 = { x: regions, y: gdp2024, name: '2024', type: 'bar', marker: { color: 'rgba(16,185,129,0.6)' } };

  var layout = Object.assign({}, BASE, {
    title: { text: 'GDP by Region (Trillion USD)', font: { size: 13, color: '#1e3a8a' } },
    barmode: 'group',
    yaxis: { title: { text: 'GDP (Trillion USD)' }, gridcolor: '#f1f5f9' }
  });

  Plotly.newPlot('barChart', [t2000, t2010, t2024], layout, { responsive: true, displayModeBar: false });
}

function drawScatterChart() {
  var continents = ['Americas', 'Europe', 'Asia', 'Africa', 'Oceania'];

  var traces = continents.map(function(c) {
    var list = countries.filter(function(d) { return d.continent === c; });
    return {
      x: list.map(function(d) { return d.gdpPerCapita; }),
      y: list.map(function(d) { return d.lifeExp; }),
      mode: 'markers',
      type: 'scatter',
      name: c,
      text: list.map(function(d) { return d.name; }),
      customdata: list.map(function(d) { return [d.population, d.growth]; }),
      hovertemplate:
        '<b>%{text}</b><br>' +
        'GDP/Capita: $%{x:,.0f}<br>' +
        'Life Expectancy: %{y} yrs<br>' +
        'Population: %{customdata[0]}M<br>' +
        'GDP Growth: %{customdata[1]}%' +
        '<extra></extra>',
      marker: {
        size: list.map(function(d) { return Math.sqrt(d.population) * 2.5; }),
        color: COLORS[c],
        opacity: 0.8,
        line: { color: 'white', width: 1 }
      }
    };
  });

  var layout = Object.assign({}, BASE, {
    title: { text: 'GDP Per Capita vs Life Expectancy  (bubble = population size)', font: { size: 13, color: '#1e3a8a' } },
    xaxis: { title: { text: 'GDP Per Capita (USD, log scale)' }, type: 'log', gridcolor: '#f1f5f9' },
    yaxis: { title: { text: 'Life Expectancy (years)' }, gridcolor: '#f1f5f9' },
    hovermode: 'closest',
    height: 440
  });

  Plotly.newPlot('scatterChart', traces, layout, { responsive: true, displayModeBar: false });
}

function drawMap(metric, btn) {
  document.querySelectorAll('.mbtn').forEach(function(b) { b.classList.remove('active'); });
  if (btn) btn.classList.add('active');

  var configs = {
    gdp:  { field: 'gdpPerCapita', title: 'GDP Per Capita (USD)',      color: [[0,'#dbeafe'],[0.5,'#3b82f6'],[1,'#1e3a8a']] },
    pop:  { field: 'population',   title: 'Population (Millions)',      color: [[0,'#fef9c3'],[0.5,'#f59e0b'],[1,'#92400e']] },
    life: { field: 'lifeExp',      title: 'Life Expectancy (Years)',    color: [[0,'#dcfce7'],[0.5,'#22c55e'],[1,'#14532d']] }
  };

  var cfg = configs[metric];

  var trace = {
    type: 'choropleth',
    locations: countries.map(function(d) { return d.code; }),
    z: countries.map(function(d) { return d[cfg.field]; }),
    text: countries.map(function(d) { return d.name; }),
    colorscale: cfg.color,
    colorbar: { title: { text: cfg.title } },
    marker: { line: { color: 'white', width: 0.5 } },
    hovertemplate: '<b>%{text}</b><br>' + cfg.title + ': %{z}<extra></extra>'
  };

  var layout = {
    paper_bgcolor: 'rgba(0,0,0,0)',
    geo: {
      showframe: false,
      showcoastlines: true,
      coastlinecolor: '#cbd5e1',
      showland: true,
      landcolor: '#f8fafc',
      showocean: true,
      oceancolor: '#e0f2fe',
      showcountries: true,
      countrycolor: '#e2e8f0',
      projection: { type: 'natural earth' }
    },
    margin: { t: 10, r: 0, b: 10, l: 0 },
    height: 440
  };

  Plotly.newPlot('mapChart', [trace], layout, { responsive: true, displayModeBar: false });
}

function draw3DScatter() {
  var continents = ['Americas', 'Europe', 'Asia', 'Africa', 'Oceania'];

  var traces = continents.map(function(c) {
    var list = countries.filter(function(d) { return d.continent === c; });
    return {
      x: list.map(function(d) { return Math.log10(d.gdpPerCapita); }),
      y: list.map(function(d) { return d.lifeExp; }),
      z: list.map(function(d) { return d.population; }),
      mode: 'markers',
      type: 'scatter3d',
      name: c,
      text: list.map(function(d) { return d.name; }),
      hovertemplate: '<b>%{text}</b><br>log(GDP/cap): %{x:.2f}<br>Life Exp: %{y} yrs<br>Pop: %{z}M<extra></extra>',
      marker: { size: 6, color: COLORS[c], opacity: 0.85 }
    };
  });

  var layout = {
    paper_bgcolor: 'rgba(0,0,0,0)',
    scene: {
      xaxis: { title: 'log(GDP/Capita)' },
      yaxis: { title: 'Life Expectancy' },
      zaxis: { title: 'Population (M)' }
    },
    title: { text: '3D Scatter: GDP / Life Exp / Population', font: { size: 12, color: '#1e3a8a' } },
    margin: { t: 50, r: 10, b: 10, l: 10 },
    height: 450,
    legend: { font: { size: 10 } }
  };

  Plotly.newPlot('scatter3d', traces, layout, { responsive: true, displayModeBar: false });
}

function draw3DSurface() {
  var xVals = [];
  var yVals = [];
  for (var i = 0; i < 25; i++) {
    xVals.push(1000 + i * 3200);
    yVals.push(1.0 + i * 0.17);
  }

  var zVals = yVals.map(function(fert) {
    return xVals.map(function(gdp) {
      var base = 45 + 35 * (1 - Math.exp(-gdp / 25000));
      var fertEffect = -5 * (fert - 1.0);
      return Math.min(88, Math.max(50, base + fertEffect));
    });
  });

  var trace = {
    x: xVals,
    y: yVals,
    z: zVals,
    type: 'surface',
    colorscale: 'Blues',
    opacity: 0.9,
    hovertemplate: 'GDP/Cap: $%{x:,.0f}<br>Fertility: %{y:.2f}<br>Life Exp: %{z:.1f} yrs<extra></extra>'
  };

  var layout = {
    paper_bgcolor: 'rgba(0,0,0,0)',
    scene: {
      xaxis: { title: 'GDP Per Capita' },
      yaxis: { title: 'Fertility Rate' },
      zaxis: { title: 'Life Expectancy' }
    },
    title: { text: '3D Surface: GDP & Fertility → Life Expectancy', font: { size: 12, color: '#1e3a8a' } },
    margin: { t: 50, r: 10, b: 10, l: 10 },
    height: 450
  };

  Plotly.newPlot('surface3d', [trace], layout, { responsive: true, displayModeBar: false });
}

function drawAnimatedChart() {
  var countryKeys = ['usa', 'china', 'india', 'japan'];
  var labels = { usa: 'USA', china: 'China', india: 'India', japan: 'Japan' };
  var gdpData = { usa: usaGDP, china: chinaGDP, india: indiaGDP, japan: jpnGDP };
  var clrs = ['#3b82f6', '#ef4444', '#f59e0b', '#8b5cf6'];

  var traces = countryKeys.map(function(k, i) {
    return {
      x: [animYears[0]],
      y: [gdpData[k][0]],
      name: labels[k],
      type: 'scatter',
      mode: 'lines+markers',
      line: { color: clrs[i], width: 2.5 },
      marker: { size: 7, color: clrs[i] }
    };
  });

  var frames = animYears.map(function(yr, idx) {
    return {
      name: String(yr),
      data: countryKeys.map(function(k) {
        return {
          x: animYears.slice(0, idx + 1),
          y: gdpData[k].slice(0, idx + 1)
        };
      })
    };
  });

  var layout = {
    paper_bgcolor: 'rgba(0,0,0,0)',
    plot_bgcolor: 'rgba(0,0,0,0)',
    font: { family: 'Segoe UI', color: '#475569', size: 11 },
    title: { text: 'GDP Growth 2000–2024 — Press Play!', font: { size: 13, color: '#1e3a8a' } },
    xaxis: { title: { text: 'Year' }, range: [1999, 2025], gridcolor: '#f1f5f9' },
    yaxis: { title: { text: 'GDP (Trillion USD)' }, range: [0, 30], gridcolor: '#f1f5f9' },
    margin: { t: 80, r: 30, b: 60, l: 70 },
    height: 450,
    hovermode: 'x unified',
    updatemenus: [{
      type: 'buttons',
      showactive: false,
      y: 1.2,
      x: 0.5,
      xanchor: 'center',
      buttons: [
        {
          label: '▶ Play',
          method: 'animate',
          args: [null, { fromcurrent: true, transition: { duration: 300 }, frame: { duration: 700, redraw: false } }]
        },
        {
          label: '⏸ Pause',
          method: 'animate',
          args: [[null], { mode: 'immediate', transition: { duration: 0 }, frame: { duration: 0, redraw: false } }]
        }
      ],
      bgcolor: '#dbeafe',
      bordercolor: '#3b82f6',
      font: { color: '#1e3a8a', size: 12 }
    }],
    sliders: [{
      steps: animYears.map(function(yr) {
        return {
          args: [[String(yr)], { mode: 'immediate', frame: { duration: 400 }, transition: { duration: 300 } }],
          label: String(yr),
          method: 'animate'
        };
      }),
      x: 0.05, len: 0.9,
      currentvalue: { prefix: 'Year: ', font: { color: '#1e3a8a', size: 12 } },
      font: { color: '#64748b', size: 9 }
    }]
  };

  Plotly.newPlot('animChart', traces, layout, { responsive: true, displayModeBar: false })
    .then(function(gd) { Plotly.addFrames(gd, frames); });
}

function drawAreaChart() {
  var t1 = {
    x: years,
    y: worldPop,
    name: 'Population (B)',
    type: 'scatter',
    mode: 'lines',
    line: { color: '#3b82f6', width: 2.5 },
    fill: 'tozeroy',
    fillcolor: 'rgba(59,130,246,0.10)'
  };

  var t2 = {
    x: years,
    y: worldGDP,
    name: 'GDP (T $)',
    type: 'scatter',
    mode: 'lines',
    line: { color: '#10b981', width: 2.5 },
    fill: 'tozeroy',
    fillcolor: 'rgba(16,185,129,0.10)',
    yaxis: 'y2'
  };

  var layout = {
    paper_bgcolor: 'rgba(0,0,0,0)',
    plot_bgcolor: 'rgba(0,0,0,0)',
    font: { family: 'Segoe UI', color: '#475569', size: 11 },
    title: { text: 'Global Trends: Population vs GDP (Area Chart)', font: { size: 13, color: '#1e3a8a' } },
    xaxis: { gridcolor: '#f1f5f9' },
    yaxis: { title: { text: 'Population (Billions)' }, gridcolor: '#f1f5f9' },
    yaxis2: { title: { text: 'GDP (Trillion USD)' }, overlaying: 'y', side: 'right' },
    margin: { t: 50, r: 60, b: 50, l: 60 },
    legend: { x: 0.01, y: 0.98 },
    hovermode: 'x unified'
  };

  Plotly.newPlot('areaChart', [t1, t2], layout, { responsive: true, displayModeBar: false });
}
