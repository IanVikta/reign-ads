// Script to extract Uganda from Natural Earth GeoJSON and convert to SVG path
const https = require('https');

function fetchJSON(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); }
        catch(e) { reject(e); }
      });
    }).on('error', reject);
  });
}

const url = 'https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson';

fetchJSON(url).then(data => {
  const uganda = data.features.find(f => 
    f.properties.ADMIN === 'Uganda' || f.properties.name === 'Uganda'
  );
  if (!uganda) {
    console.log('Uganda not found');
    return;
  }
  
  const coords = uganda.geometry.type === 'Polygon' 
    ? uganda.geometry.coordinates[0]
    : uganda.geometry.coordinates[0][0];

  let minLon = Infinity, maxLon = -Infinity, minLat = Infinity, maxLat = -Infinity;
  coords.forEach(([lon, lat]) => {
    minLon = Math.min(minLon, lon);
    maxLon = Math.max(maxLon, lon);
    minLat = Math.min(minLat, lat);
    maxLat = Math.max(maxLat, lat);
  });

  const W = 580, H = 520, PAD = 20;
  const project = ([lon, lat]) => ({
    x: PAD + ((lon - minLon) / (maxLon - minLon)) * (W - 2 * PAD),
    y: PAD + ((maxLat - lat) / (maxLat - minLat)) * (H - 2 * PAD),
  });

  const pts = coords.map(project);
  const d = 'M ' + pts.map(p => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' L ') + ' Z';
  
  console.log('BBOX:', JSON.stringify({minLon, maxLon, minLat, maxLat}));
  console.log('COUNT:', coords.length);
  console.log('PATH:', d);
}).catch(err => {
  console.error('Error:', err.message);
});
