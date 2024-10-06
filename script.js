const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("container").appendChild(renderer.domElement);
const ambientLight = new THREE.AmbientLight(0x404040, 5);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 10, 7.5).normalize();
scene.add(directionalLight);
const textureLoader = new THREE.TextureLoader();
const sunGeometry = new THREE.SphereGeometry(0.1, 32, 32);
const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
const sun = new THREE.Mesh(sunGeometry, sunMaterial);
scene.add(sun);
const planets = [
    { name: "Mercury", color: 0xb0b0b0, a: 0.38709927, e: 0.20563593, I: 7.00497902, L: 252.25032350, longPeri: 77.45779628, longNode: 48.33076593, radius: (2440 / 6371) * 0.1 },
    { name: "Venus", color: 0xffd700, a: 0.72333566, e: 0.00677672, I: 3.39467605, L: 181.97909950, longPeri: 131.60246718, longNode: 76.67984255, radius: (6052 / 6371) * 0.1 },
    { name: "Earth", color: 0x0000ff, a: 1.00000261, e: 0.01671123, I: -0.00001531, L: 100.46457166, longPeri: 102.93768193, longNode: 0.0, radius: 0.1 },
    { name: "Mars", color: 0xff4500, a: 1.52371034, e: 0.09339410, I: 1.84969142, L: -4.55343205, longPeri: -23.94362959, longNode: 49.55953891, radius: (3390 / 6371) * 0.1 },
    { name: "Jupiter", color: 0xffa500, a: 5.20288700, e: 0.04838624, I: 1.30439695, L: 34.39644051, longPeri: 14.72847983, longNode: 100.47390909, radius: (69911 / 6371) * 0.1 },
    { name: "Saturn", color: 0xffff00, a: 9.53667594, e: 0.05386179, I: 2.48599187, L: 49.95424423, longPeri: 92.59887831, longNode: 113.66242448, radius: (58232 / 6371) * 0.1 },
    { name: "Uranus", color: 0x00ffff, a: 19.18916464, e: 0.04725744, I: 0.77263783, L: 313.23810451, longPeri: 170.95427630, longNode: 74.01692503, radius: (25362 / 6371) * 0.1 },
    { name: "Neptune", color: 0x0000ff, a: 30.06992276, e: 0.00859048, I: 1.77004347, L: -55.12002969, longPeri: 44.96476227, longNode: 131.78422574, radius: (24622 / 6371) * 0.1 },
    { name: "Halley", color: 0xffffff, a: 17.8, e: 0.9671429085, I: 162.2626906, L: 58.42008098, longPeri: 111.3324851, longNode: 58.42008098, radius: 0.01 },
    { name: "Encke", color: 0xffffff, a: 2.215, e: 0.8482682514, I: 11.77999525, L: 334.5698056, longPeri: 186.5403463, longNode: 334.5698056, radius: 0.01 },
    { name: "McNaught", color: 0xffffff, a: 5.23, e: 0.682526943, I: 4.894555854, L: 295.9854497, longPeri: 0.626837835, longNode: 295.9854497, radius: 0.01 },
    { name: "Catalina-McNaught", color: 0xffffff, a: 5.95, e: 0.6663127807, I: 15.1007464, L: 111.3920029, longPeri: 203.6490232, longNode: 111.3920029, radius: 0.01 },
    { name: "Biela", color: 0xffffff, a: 0.3, e: 0.751299, I: 13.2164, L: 239.0514, longPeri: 221.6588, longNode: 250.669, radius: 0.01 },
    { name: "Brorsen", color: 0xffffff, a: 0.5, e: 0.809796, I: 29.3821, L: 240.7439, longPeri: 14.9468, longNode: 102.9676, radius: 0.01 },
    { name: "Pons-Winnecke", color: 0xffffff, a: 1.3, e: 0.6375275046, I: 22.33501476, L: 245.7053, longPeri: 172.5061606, longNode: 93.41632728, radius: 0.01 },
    { name: "Tuttle", color: 0xffffff, a: 1.2, e: 0.819799747, I: 54.98318484, L: 245.4492, longPeri: 207.509246, longNode: 270.341652, radius: 0.01 },
    { name: "Pons-Brooks", color: 0xffffff, a: 0.9, e: 0.9548123942, I: 74.17689423, L: 243.4885, longPeri: 199.0284686, longNode: 255.8911444, radius: 0.01 },
    { name: "Olbers", color: 0xffffff, a: 1.6, e: 0.8635842905, I: 20.17116412, L: 289.2847096, longPeri: 209.8636489, longNode: 56.02807173, radius: 0.01 },
    { name: "Wolf", color: 0xffffff, a: 1.2, e: 0.775965, I: 24.2944, L: 325.1617, longPeri: 242.1597, longNode: 79.926, radius: 0.01 },
    { name: "Finlay", color: 0xffffff, a: 0.65, e: 0.752233, I: 36.3841, L: 219.9937, longPeri: 247.2153, longNode: 12.5542, radius: 0.01 },
    { name: "Brooks", color: 0xffffff, a: 1.1, e: 0.893230, I: 9.51638, L: 215.5097, longPeri: 23.4378, longNode: 189.1247, radius: 0.01 },
    { name: "Holmes", color: 0xffffff, a: 0.9, e: 0.9755882, I: 20.14989888, L: 171.9837, longPeri: 233.9668, longNode: 305.4874, radius: 0.01 },
    { name: "Barnard", color: 0xffffff, a: 0.95, e: 0.864, I: 11.049, L: 245.67, longPeri: 67.65, longNode: 133.8, radius: 0.01 },
    { name: "Borrelly", color: 0xffffff, a: 1.2, e: 0.616, I: 30.6397, L: 305.5156, longPeri: 257.2121, longNode: 203.8524, radius: 0.01 },
    { name: "Kopff", color: 0xffffff, a: 1.2, e: 0.724, I: 27.963, L: 295.543, longPeri: 65.45, longNode: 118.1, radius: 0.01 },
    { name: "Giacobini-Zinner", color: 0xffffff, a: 1.3, e: 0.847, I: 21.8893, L: 291.681, longPeri: 72.645, longNode: 196.2, radius: 0.01 },
    { name: "Kopff", color: 0xffffff, a: 1.2, e: 0.605, I: 11.194, L: 236.243, longPeri: 273.151, longNode: 48.234, radius: 0.01 },
    { name: "Brorsen-Metcalf", color: 0xffffff, a: 1.1, e: 0.721, I: 34.103, L: 195.888, longPeri: 25.315, longNode: 193.173, radius: 0.01 },
    { name: "NEAT", color: 0xffffff, a: 1.3, e: 0.878, I: 9.301, L: 164.276, longPeri: 152.561, longNode: 95.272, radius: 0.01 },
    { name: "Teodorina", color: 0xffffff, a: 1.2, e: 0.680, I: 19.161, L: 298.319, longPeri: 115.4, longNode: 152.5, radius: 0.01 },
    { name: "Grigg-Skjellerup", color: 0xffffff, a: 1.2, e: 0.554, I: 21.013, L: 287.012, longPeri: 29.143, longNode: 95.141, radius: 0.01 },
    { name: "Crommelin", color: 0xffffff, a: 1.4, e: 0.687, I: 28.083, L: 269.643, longPeri: 183.81, longNode: 295.04, radius: 0.01 },
    { name: "Neujmin", color: 0xffffff, a: 0.6, e: 0.671, I: 45.244, L: 221.315, longPeri: 83.452, longNode: 231.593, radius: 0.01 },
    { name: "Schwassmann-Wachmann", color: 0xffffff, a: 1.5, e: 0.859, I: 14.387, L: 215.654, longPeri: 40.096, longNode: 309.136, radius: 0.01 },
    { name: "Reinmuth", color: 0xffffff, a: 1.5, e: 0.715, I: 14.287, L: 184.592, longPeri: 267.431, longNode: 84.3, radius: 0.01 },
    { name: "du Toit-Hartley", color: 0xffffff, a: 3.95, e: 0.61851349, I: 3.145618792, longPeri: 281.6893173, longNode: 280.6403369, radius: 0.01 },
    { name: "Boethin", color: 0xffffff, a: 5.187, e: 0.7811606262, I: 4.295294591, longPeri: 37.61838461, longNode: 359.3961137, radius: 0.01 },
    { name: "Machholz 1", color: 0xffffff, a: 3.032, e: 0.9592118287, I: 58.31221424, longPeri: 14.7577484, longNode: 94.32323631, radius: 0.01 },
    { name: "Hartley 2", color: 0xffffff, a: 3.477, e: 0.693780472, I: 13.60427243, longPeri: 181.3222858, longNode: 219.7487451, radius: 0.01 },
    { name: "Kowal 2", color: 0xffffff, a: 3.259, e: 0.6385203614, I: 10.25097305, longPeri: 200.6509533, longNode: 235.4414959, radius: 0.01 },
    { name: "Swift-Tuttle", color: 0xffffff, a: 26.09, e: 0.963225755, I: 113.453817, longPeri: 152.9821676, longNode: 139.3811921, radius: 0.01 },
    { name: "de Vico", color: 0xffffff, a: 17.68, e: 0.9627088868, I: 85.38275311, longPeri: 12.99609194, longNode: 79.62450069, radius: 0.01 },
    { name: "Machholz 2-A", color: 0xffffff, a: 3.011, e: 0.7501239591, I: 12.79506334, longPeri: 149.2844343, longNode: 246.1615904, radius: 0.01 },
    { name: "Machholz 2-D", color: 0xffffff, a: 3.009, e: 0.7510624112, I: 12.81184124, longPeri: 149.2918108, longNode: 246.1336343, radius: 0.01 },
    { name: "Hartley-IRAS", color: 0xffffff, a: 7.721, e: 0.8350738463, I: 95.69806815, longPeri: 47.13845023, longNode: 1.415670065, radius: 0.01 },
    { name: "Siding Spring", color: 0xffffff, a: 3.048, e: 0.5972436348, I: 27.84477766, longPeri: 356.3636966, longNode: 31.25192352, radius: 0.01 },
    { name: "NEAT", color: 0xffffff, a: 2.604, e: 0.7669277193, I: 11.30444069, longPeri: 217.9760878, longNode: 176.2204118, radius: 0.01 },
    { name: "Barnard", color: 0xffffff, a: 24.34, e: 0.9545011069, I: 31.1792882, longPeri: 60.34965167, longNode: 272.1861491, radius: 0.01 },
    { name: "Shoemaker-Levy 6", color: 0xffffff, a: 3.838, e: 0.7073228279, I: 16.98117917, longPeri: 333.7988486, longNode: 37.67945772, radius: 0.01 },
    { name: "LONEOS", color: 0xffffff, a: 2.933, e: 0.66634233, I: 16.90929665, longPeri: 51.43384257, longNode: 75.10006349, radius: 0.01 },
    { name: "Petriew", color: 0xffffff, a: 3.272, e: 0.6993210375, I: 14.00701804, longPeri: 181.9403336, longNode: 214.0910177, radius: 0.01 },
    { name: "NEAT", color: 0xffffff, a: 2.888, e: 0.5967955467, I: 20.3759014, longPeri: 15.39713787, longNode: 282.144161, radius: 0.01 },
    { name: "LINEAR", color: 0xffffff, a: 2.884, e: 0.6296602372, I: 25.54272525, longPeri: 188.7289004, longNode: 66.38824615, radius: 0.01 },
    { name: "Barnard-Boattini", color: 0xffffff, a: 3.153, e: 0.6886420879, I: 31.97414822, longPeri: 179.5749493, longNode: 205.2603247, radius: 0.01 },
    { name: "NEAT", color: 0xffffff, a: 4.036, e: 0.7569889079, I: 10.14995411, longPeri: 271.195627, longNode: 200.6742212, radius: 0.01 },
    { name: "LINEAR", color: 0xffffff, a: 2.929, e: 0.6923704602, I: 19.44782985, longPeri: 150.4693054, longNode: 65.46431318, radius: 0.01 },
    { name: "Christensen", color: 0xffffff, a: 3.148, e: 0.8325032627, I: 10.24010578, longPeri: 345.8255534, longNode: 93.82650012, radius: 0.01 },
    { name: "LINEAR", color: 0xffffff, a: 3.943, e: 0.689642756, I: 12.88188017, longPeri: 246.7754682, longNode: 125.6220203, radius: 0.01 },
    { name: "LINEAR", color: 0xffffff, a: 2.851, e: 0.7267693964, I: 5.14614339, longPeri: 345.4248856, longNode: 7.132384188, radius: 0.01 },
    { name: "LINEAR", color: 0xffffff, a: 3.546, e: 0.6637644633, I: 20.70960946, longPeri: 1.329461349, longNode: 15.49778451, radius: 0.01 },
    { name: "LINEAR", color: 0xffffff, a: 2.775, e: 0.8161483931, I: 8.4340952, longPeri: 64.04057029, longNode: 240.6460863, radius: 0.01 },
    { name: "LINEAR", color: 0xffffff, a: 3.056, e: 0.6724112481, I: 10.38105211, longPeri: 343.2826819, longNode: 190.9962851, radius: 0.01 },
    { name: "Levy", color: 0xffffff, a: 3.044, e: 0.6681889017, I: 18.26659348, longPeri: 179.6923294, longNode: 279.7300367, radius: 0.01 },
    { name: "McNaught-Russell", color: 0xffffff, a: 6.935, e: 0.8154028826, I: 29.07941912, longPeri: 171.1690206, longNode: 218.0142884, radius: 0.01 },
    { name: "Gibbs", color: 0xffffff, a: 3.031, e: 0.5869803961, I: 14.4711765, longPeri: 26.31548584, longNode: 113.3508576, radius: 0.01 },
    { name: "Tsuchinshan 1", color: 0xffffff, a: 3.126, e: 0.6788881913, I: 12.02803154, longPeri: 47.69460798, longNode: 101.2694136, radius: 0.01 },
    { name: "Icarus", color: 0x00FFFF, a: 1.078, e: 0.8270, I: 22.80, L: 0, longPeri: 31.43, longNode: 87.95, radius: 0.01 },
    { name: "Geographos", color: 0x00FFFF, a: 1.246, e: 0.3356, I: 13.34, L: 0, longPeri: 277.01, longNode: 337.15, radius: 0.01 },
    { name: "Apollo", color: 0x00FFFF, a: 1.471, e: 0.5599, I: 6.35, L: 0, longPeri: 286.03, longNode: 35.56, radius: 0.01 },
    { name: "Midas", color: 0x00FFFF, a: 1.776, e: 0.6505, I: 39.82, L: 0, longPeri: 267.84, longNode: 356.80, radius: 0.01 },
    { name: "Adonis", color: 0x00FFFF, a: 1.874, e: 0.7642, I: 1.32, L: 0, longPeri: 43.69, longNode: 349.43, radius: 0.01 },
    { name: "Tantalus", color: 0x00FFFF, a: 1.29, e: 0.2993, I: 64.00, L: 0, longPeri: 61.52, longNode: 94.35, radius: 0.01 },
    { name: "Aristaeus", color: 0x00FFFF, a: 1.6, e: 0.5030, I: 23.07, L: 0, longPeri: 290.97, longNode: 191.11, radius: 0.01 },
    { name: "Oljato", color: 0x00FFFF, a: 2.179, e: 0.7107, I: 2.52, L: 0, longPeri: 98.37, longNode: 74.87, radius: 0.01 },
    { name: "Hathor", color: 0x00FFFF, a: 0.8438, e: 0.4500, I: 5.86, L: 0, longPeri: 40.10, longNode: 211.29, radius: 0.01 },
    { name: "Florence", color: 0x00FFFF, a: 1.769, e: 0.4231, I: 22.14, L: 0, longPeri: 27.90, longNode: 336.05, radius: 0.01 },
    { name: "Phaethon", color: 0x00FFFF, a: 1.271, e: 0.8898, I: 22.31, L: 0, longPeri: 322.31, longNode: 265.10, radius: 0.01 },
    { name: "Orpheus", color: 0x00FFFF, a: 1.21, e: 0.3229, I: 2.66, L: 0, longPeri: 302.34, longNode: 188.68, radius: 0.01 },
    { name: "Khufu", color: 0x00FFFF, a: 0.9895, e: 0.4685, I: 9.92, L: 0, longPeri: 55.09, longNode: 152.40, radius: 0.01 },
    { name: "Dionysus", color: 0x00FFFF, a: 2.2, e: 0.5420, I: 13.54, L: 0, longPeri: 204.33, longNode: 82.05, radius: 0.01 },
    { name: "Anagolay", color: 0x00FFFF, a: 1.834, e: 0.4459, I: 3.87, L: 0, longPeri: 17.24, longNode: 74.93, radius: 0.01 },
    { name: "Wilson-Harrington", color: 0x00FFFF, a: 2.626, e: 0.6312, I: 2.80, L: 0, longPeri: 95.52, longNode: 266.73, radius: 0.01 },
    { name: "Vishnu", color: 0x00FFFF, a: 1.06, e: 0.4441, I: 11.17, L: 0, longPeri: 296.70, longNode: 157.89, radius: 0.01 },
    { name: "Toutatis", color: 0x00FFFF, a: 2.543, e: 0.6248, I: 0.45, L: 0, longPeri: 277.88, longNode: 125.36, radius: 0.01 },
    { name: "Cuno", color: 0x00FFFF, a: 1.981, e: 0.6361, I: 6.67, L: 0, longPeri: 237.02, longNode: 294.35, radius: 0.01 },
    { name: "Pan", color: 0x00FFFF, a: 1.443, e: 0.5866, I: 5.52, L: 0, longPeri: 291.94, longNode: 311.70, radius: 0.01 },
    { name: "Mithra", color: 0x00FFFF, a: 2.205, e: 0.6620, I: 3.04, L: 0, longPeri: 169.12, longNode: 82.18, radius: 0.01 },
    { name: "Asclepius", color: 0x00FFFF, a: 1.023, e: 0.3570, I: 4.92, L: 0, longPeri: 255.38, longNode: 180.20, radius: 0.01 },
    { name: "Nereus", color: 0x00FFFF, a: 1.485, e: 0.3587, I: 1.45, L: 0, longPeri: 159.54, longNode: 313.11, radius: 0.01 },
    { name: "Castalia", color: 0x00FFFF, a: 1.063, e: 0.4832, I: 8.88, L: 0, longPeri: 121.44, longNode: 325.51, radius: 0.01 },
    { name: "Ptah", color: 0x00FFFF, a: 1.636, e: 0.5001, I: 7.41, L: 0, longPeri: 105.94, longNode: 10.63, radius: 0.01 },
    { name: "Minos", color: 0x00FFFF, a: 1.151, e: 0.4126, I: 3.94, L: 0, longPeri: 239.77, longNode: 344.53, radius: 0.01 },
    { name: "Golevka", color: 0x00FFFF, a: 2.484, e: 0.6151, I: 2.27, L: 0, longPeri: 68.66, longNode: 209.42, radius: 0.01 },
    { name: "Tomaiyowit", color: 0x00FFFF, a: 1.08, e: 0.3558, I: 10.31, L: 0, longPeri: 289.52, longNode: 234.39, radius: 0.01 },
    { name: "Zephyr", color: 0x00FFFF, a: 1.963, e: 0.4918, I: 5.30, L: 0, longPeri: 147.13, longNode: 168.17, radius: 0.01 },
    { name: "Hypnos", color: 0x00FFFF, a: 2.841, e: 0.6649, I: 1.98, L: 0, longPeri: 238.19, longNode: 57.93, radius: 0.01 },
    { name: "Itokawa", color: 0x00FFFF, a: 1.324, e: 0.2803, I: 1.62, L: 0, longPeri: 162.82, longNode: 69.08, radius: 0.01 },
    { name: "Illapa", color: 0x00FFFF, a: 1.478, e: 0.7525, I: 18.03, L: 0, longPeri: 303.90, longNode: 139.52, radius: 0.01 },
    { name: "Didymos", color: 0x00FFFF, a: 1.643, e: 0.3833, I: 3.41, L: 0, longPeri: 319.60, longNode: 72.99, radius: 0.01 },
    { name: "Moshup", color: 0x00FFFF, a: 0.6424, e: 0.6884, I: 38.88, L: 0, longPeri: 192.65, longNode: 244.90, radius: 0.01 },
    { name: "Hermes", color: 0x00FFFF, a: 1.655, e: 0.6239, I: 6.07, L: 0, longPeri: 92.90, longNode: 34.05, radius: 0.01 },
    { name: "Mjolnir", color: 0x00FFFF, a: 1.298, e: 0.3563, I: 4.08, L: 0, longPeri: 95.42, longNode: 2.31, radius: 0.01 },
    { name: "Apophis", color: 0x00FFFF, a: 0.9224, e: 0.1911, I: 3.34, L: 0, longPeri: 126.67, longNode: 203.90, radius: 0.01 },
    { name: "Bennu", color: 0x00FFFF, a: 1.126, e: 0.2037, I: 6.03, L: 0, longPeri: 66.22, longNode: 2.06, radius: 0.01 },
    { name: "Tatsunokingo", color: 0x00FFFF, a: 1.747, e: 0.4780, I: 10.99, L: 0, longPeri: 147.57, longNode: 50.13, radius: 0.01 },
    { name: "Cacus", color: 0x00FFFF, a: 1.123, e: 0.2139, I: 26.06, L: 0, longPeri: 102.09, longNode: 161.21, radius: 0.01 },
    { name: "Ryugu", color: 0x00FFFF, a: 1.191, e: 0.1911, I: 5.87, L: 0, longPeri: 211.61, longNode: 251.29, radius: 0.01 },
    { name: "Lugh", color: 0x00FFFF, a: 2.527, e: 0.7115, I: 4.44, L: 0, longPeri: 316.15, longNode: 177.75, radius: 0.01 },
    { name: "Agni", color: 0x00FFFF, a: 0.8646, e: 0.2733, I: 13.25, L: 0, longPeri: 328.62, longNode: 134.18, radius: 0.01 },
    { name: "Dryope", color: 0x00FFFF, a: 2.235, e: 0.5766, I: 16.18, L: 0, longPeri: 139.53, longNode: 116.62, radius: 0.01 },
    { name: "Akhenaten", color: 0x00FFFF, a: 0.879, e: 0.4402, I: 3.38, L: 0, longPeri: 309.34, longNode: 53.44, radius: 0.01 },
];
planets.forEach(planet => {
    const geometry = new THREE.SphereGeometry(planet.radius, 32, 32);
    const material = new THREE.MeshStandardMaterial({
        color: planet.color,
        roughness: 0.5,
        metalness: 0.5
    });
    planet.mesh = new THREE.Mesh(geometry, material);
    scene.add(planet.mesh);
    const orbitPoints = [];
    const segments = 360; 
    for (let i = 0; i <= segments; i++) {
        const angle = (i / segments) * Math.PI * 2;
        const r = (planet.a * (1 - planet.e ** 2)) / (1 + planet.e * Math.cos(angle));
        const x = r * Math.cos(angle);
        const z = r * Math.sin(angle);
        const y = 0;
        const position = new THREE.Vector3(x, y, z);
        const nodeRotation = new THREE.Matrix4().makeRotationY(THREE.Math.degToRad(planet.longNode));
        const positionAfterNode = position.applyMatrix4(nodeRotation);
        const inclinationRotation = new THREE.Matrix4().makeRotationZ(THREE.Math.degToRad(planet.I));
        const positionAfterInclination = positionAfterNode.applyMatrix4(inclinationRotation);
        const perihelionRotation = new THREE.Matrix4().makeRotationY(THREE.Math.degToRad(planet.longPeri));
        const finalPosition = positionAfterInclination.applyMatrix4(perihelionRotation);
        orbitPoints.push(finalPosition.x, finalPosition.y, finalPosition.z);
    }
        const orbitGeometry = new THREE.BufferGeometry();
        const orbitVertices = new Float32Array(orbitPoints);
        orbitGeometry.setAttribute('position', new THREE.BufferAttribute(orbitVertices, 3));
        const orbitLine = new THREE.Line(orbitGeometry, new THREE.LineBasicMaterial({ color: planet.color }));
        scene.add(orbitLine);
});
function updatePlanetPosition(planet, timeElapsed) {
    const semiMajorAxis = planet.a;
    const eccentricity = planet.e;
    const orbitalPeriod = Math.sqrt(semiMajorAxis ** 3);
    const angle = (timeElapsed / orbitalPeriod) * Math.PI * 2;
    const r = (semiMajorAxis * (1 - eccentricity ** 2)) / (1 + eccentricity * Math.cos(angle));
    const x = r * Math.cos(angle);
    const z = r * Math.sin(angle);
    const y = 0;
    const position = new THREE.Vector3(x, y, z);
    const nodeRotation = new THREE.Matrix4().makeRotationY(THREE.Math.degToRad(planet.longNode));
    const positionAfterNode = position.applyMatrix4(nodeRotation);
    const inclinationRotation = new THREE.Matrix4().makeRotationZ(THREE.Math.degToRad(planet.I));
    const positionAfterInclination = positionAfterNode.applyMatrix4(inclinationRotation);
    const perihelionRotation = new THREE.Matrix4().makeRotationY(THREE.Math.degToRad(planet.longPeri));
    const finalPosition = positionAfterInclination.applyMatrix4(perihelionRotation);
    planet.mesh.position.set(finalPosition.x, finalPosition.y, finalPosition.z);
}
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.enableZoom = true;
controls.screenSpacePanning = false;
controls.maxPolarAngle = Math.PI / 2;
camera.position.set(10, 10, 20);
controls.target.set(0, 0, 0);
const speedSlider = document.getElementById('speedSlider');
let simulationSpeed = parseFloat(speedSlider.value);
speedSlider.addEventListener('input', function() {
    simulationSpeed = parseFloat(this.value);
});
function animate() {
    requestAnimationFrame(animate);

    const timeElapsed = (performance.now() / 1000) * simulationSpeed;
    planets.forEach(planet => {
        updatePlanetPosition(planet, timeElapsed);
    });
    directionalLight.position.copy(sun.position);

    controls.update();
    renderer.render(scene, camera);
}
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
animate();