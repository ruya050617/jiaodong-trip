document.addEventListener('DOMContentLoaded', function() {
    initMap();
    loadWeather();
    initChecklist();
});

function initMap() {
    const map = L.map('map', {
        center: [36.8, 121.2],
        zoom: 8,
        scrollWheelZoom: true
    });

    L.tileLayer('http://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}', {
        subdomains: "1234",
        attribution: '&copy; 高德地图',
        maxZoom: 19
    }).addTo(map);

    const locations = [
        { name: '🏝️ 渔人码头', coords: [37.5378, 121.3955], day: 1, description: 'Day 1-2 烟台起点' },
        { name: '🐴 养马岛', coords: [37.4655, 121.5263], day: 2, description: '环岛骑行' },
        { name: '🚢 布鲁维斯号', coords: [37.3948, 122.6954], day: 3, description: 'Day 3 威海' },
        { name: '🎬 火炬八街', coords: [37.2007, 122.5549], day: 3, description: '威海小镰仓' },
        { name: '⛪ 天主教堂', coords: [36.0706, 120.3192], day: 4, description: 'Day 4-5 青岛' },
        { name: '🌊 五四广场', coords: [36.0664, 120.3828], day: 5, description: '五月的风' },
        { name: '🌉 栈桥', coords: [36.0685, 120.3155], day: 5, description: '青岛标志' }
    ];

    const dayColors = { 1: '#00B4D8', 2: '#00B4D8', 3: '#43E97B', 4: '#FF6B6B', 5: '#FF6B6B' };
    const dayLabels = { 1: 'Day 1-2', 2: 'Day 1-2', 3: 'Day 3', 4: 'Day 4-5', 5: 'Day 4-5' };

    locations.forEach(loc => {
        const marker = L.circleMarker(loc.coords, {
            radius: 10, fillColor: dayColors[loc.day], color: '#fff', weight: 2, opacity: 1, fillOpacity: 0.9
        }).addTo(map);
        marker.bindPopup(`<b>${loc.name}</b><br>${loc.description}`);
    });

    L.polyline([
        [37.5378, 121.3955], [37.4655, 121.5263],
        [37.3948, 122.6954], [37.2007, 122.5549],
        [36.0706, 120.3192], [36.0664, 120.3828], [36.0685, 120.3155]
    ], { color: '#0077B6', weight: 4, opacity: 0.7, dashArray: '10, 10' }).addTo(map);
}

function loadWeather() {
    const weatherContainer = document.getElementById('weather-cards');
    
    const cities = [
        { name: '烟台', coords: [37.5365, 121.3914] },
        { name: '青岛', coords: [36.0671, 120.3827] },
        { name: '威海', coords: [37.1986, 122.5459] }
    ];

    const dates = [
        { day: '6月2日', label: 'Day 1' },
        { day: '6月3日', label: 'Day 2' },
        { day: '6月4日', label: 'Day 3' },
        { day: '6月5日', label: 'Day 4' },
        { day: '6月6日', label: 'Day 5' }
    ];

    const weatherData = generateWeatherData();

    let html = '';
    dates.forEach((date, dateIndex) => {
        cities.forEach((city, cityIndex) => {
            const weather = weatherData[dateIndex][cityIndex];
            html += `
                <div class="weather-card" data-day="${date.label}" data-city="${city.name}">
                    <div class="city">${city.name}</div>
                    <div class="date">${date.label} · ${date.day}</div>
                    <div class="temp">${weather.temp}°</div>
                    <div class="condition">${weather.condition}</div>
                    <div style="margin-top: 8px; font-size: 12px; color: #888;">
                        💨 ${weather.wind} · 💧 ${weather.humidity}
                    </div>
                </div>
            `;
        });
    });

    weatherContainer.innerHTML = html;
}

function generateWeatherData() {
    const conditions = ['☀️ 晴', '⛅ 多云', '🌤️ 晴转多云', '🌥️ 多云转晴'];
    const winds = ['3-4级', '4-5级', '2-3级'];

    const baseTemps = {
       烟台: { min: 22, max: 28 },
        青岛: { min: 21, max: 27 },
        威海: { min: 22, max: 28 }
    };

    return dates = [
        [
            { temp: 25, condition: '☀️ 晴', wind: '3级', humidity: '55%' },
            { temp: 24, condition: '⛅ 多云', wind: '4级', humidity: '60%' },
            { temp: 26, condition: '☀️ 晴', wind: '3级', humidity: '52%' }
        ],
        [
            { temp: 26, condition: '☀️ 晴', wind: '2级', humidity: '50%' },
            { temp: 25, condition: '🌤️ 晴转多云', wind: '3级', humidity: '55%' },
            { temp: 27, condition: '☀️ 晴', wind: '2级', humidity: '48%' }
        ],
        [
            { temp: 24, condition: '⛅ 多云', wind: '4级', humidity: '58%' },
            { temp: 23, condition: '🌥️ 多云', wind: '5级', humidity: '62%' },
            { temp: 25, condition: '⛅ 多云', wind: '4级', humidity: '55%' }
        ],
        [
            { temp: 23, condition: '🌤️ 晴转多云', wind: '4级', humidity: '56%' },
            { temp: 22, condition: '⛅ 多云', wind: '5级', humidity: '60%' },
            { temp: 24, condition: '🌤️ 晴转多云', wind: '4级', humidity: '54%' }
        ],
        [
            { temp: 25, condition: '☀️ 晴', wind: '3级', humidity: '50%' },
            { temp: 24, condition: '☀️ 晴', wind: '3级', humidity: '52%' },
            { temp: 26, condition: '☀️ 晴', wind: '2级', humidity: '48%' }
        ]
    ];
}

function initChecklist() {
    const checkboxes = document.querySelectorAll('.packing-list input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const li = this.closest('li');
            if (this.checked) {
                li.style.textDecoration = 'line-through';
                li.style.color = '#999';
            } else {
                li.style.textDecoration = 'none';
                li.style.color = 'inherit';
            }
        });
    });
}