import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'

const BB = '#0220aa'
const BG = '#ffd22a'

// ── Uganda SVG viewport — real geographic shape from Natural Earth GeoJSON ──
const MAP_W = 580
const MAP_H = 520
// Real Uganda bounding box from GeoJSON:
// lon: 29.54846 → 35.006473  |  lat: -1.475206 → 4.219692
const LON_MIN = 29.54846, LON_MAX = 35.006473
const LAT_MIN = -1.475206, LAT_MAX = 4.219692
const PAD = 20

// project: [lat, lon] → {x, y} in SVG space (same mapping as the GeoJSON extraction)
const project = ([lat, lon]) => ({
  x: PAD + ((lon - LON_MIN) / (LON_MAX - LON_MIN)) * (MAP_W - 2 * PAD),
  y: PAD + ((LAT_MAX - lat) / (LAT_MAX - LAT_MIN)) * (MAP_H - 2 * PAD),
})

// Real Uganda border — 611 points extracted from Natural Earth GeoJSON dataset
// Mapped to 580×520 SVG viewport with 20px padding
const UGANDA_PATH = 'M 111.4,465.6 L 110.3,465.3 L 108.8,464.9 L 107.4,465.1 L 106.1,465.5 L 104.6,465.9 L 102.9,465.7 L 101.2,465.3 L 99.6,465.1 L 98.1,465.5 L 97.2,466.7 L 96.6,470.2 L 96.1,471.5 L 95.5,471.9 L 93.8,472.6 L 93.5,472.8 L 93.1,473.0 L 92.8,473.6 L 92.6,474.8 L 92.6,475.3 L 91.4,476.8 L 90.1,478.3 L 85.7,481.8 L 84.1,482.6 L 83.4,482.8 L 82.6,482.8 L 81.8,482.9 L 81.1,483.3 L 80.4,484.5 L 79.7,487.8 L 79.2,489.0 L 78.2,489.9 L 74.1,491.2 L 71.2,492.6 L 70.7,492.8 L 69.4,493.9 L 68.5,495.8 L 67.5,495.9 L 60.8,499.1 L 58.6,499.8 L 56.5,500.0 L 54.6,499.5 L 52.9,498.2 L 51.9,496.4 L 51.7,492.9 L 51.2,491.2 L 48.5,487.7 L 47.4,487.2 L 47.4,487.2 L 46.5,487.1 L 45.6,487.4 L 44.7,487.8 L 43.8,488.7 L 43.2,490.4 L 42.4,490.8 L 41.7,490.6 L 39.6,489.5 L 38.4,489.3 L 36.0,489.7 L 34.4,490.4 L 32.8,491.3 L 30.8,492.3 L 29.0,492.7 L 26.9,492.9 L 22.9,492.7 L 23.8,487.7 L 23.8,486.1 L 23.4,485.2 L 22.3,483.5 L 22.2,482.6 L 23.2,480.5 L 23.3,479.7 L 22.7,477.9 L 21.7,476.6 L 20.8,475.3 L 20.8,473.2 L 22.0,468.0 L 22.1,466.5 L 21.7,464.9 L 20.3,461.6 L 20.0,460.2 L 20.3,459.2 L 20.3,459.1 L 20.8,458.4 L 21.2,457.6 L 21.1,456.3 L 20.7,454.8 L 20.6,453.9 L 20.7,453.2 L 21.9,451.7 L 24.8,450.8 L 25.9,449.7 L 26.2,448.5 L 26.4,443.4 L 26.2,441.6 L 25.3,438.4 L 25.4,436.6 L 26.6,430.0 L 27.0,429.5 L 27.5,429.2 L 28.0,428.7 L 28.1,428.1 L 27.9,427.6 L 27.1,426.7 L 27.0,426.2 L 27.4,425.3 L 28.3,425.0 L 29.3,425.0 L 30.1,424.5 L 30.3,423.3 L 30.0,418.2 L 29.6,416.9 L 28.5,415.0 L 28.3,414.5 L 28.0,412.9 L 30.1,402.3 L 30.4,400.9 L 32.1,392.6 L 32.7,389.6 L 34.4,381.0 L 35.9,377.9 L 36.4,376.3 L 36.3,374.7 L 35.2,371.0 L 35.3,369.5 L 36.2,367.3 L 40.5,362.1 L 41.1,361.2 L 42.2,361.5 L 42.9,362.1 L 43.6,362.3 L 44.6,361.8 L 45.0,361.1 L 48.1,347.3 L 48.8,345.4 L 49.9,343.9 L 55.2,338.7 L 57.0,336.9 L 57.4,336.3 L 58.8,333.7 L 58.5,330.4 L 56.7,323.6 L 56.8,321.8 L 58.0,314.7 L 57.4,310.3 L 57.6,309.5 L 59.5,306.2 L 60.7,305.5 L 62.9,304.1 L 64.3,303.2 L 68.5,301.6 L 79.0,299.5 L 80.0,299.1 L 81.1,298.0 L 82.9,295.2 L 83.2,294.9 L 83.6,293.5 L 85.9,291.5 L 86.5,289.9 L 86.0,286.5 L 86.0,284.9 L 87.2,283.9 L 87.6,283.1 L 87.8,282.3 L 88.0,280.5 L 88.3,279.9 L 91.3,277.3 L 92.2,276.9 L 93.0,276.7 L 93.9,276.8 L 95.0,277.6 L 96.7,278.2 L 97.9,277.1 L 99.1,275.4 L 100.8,274.3 L 101.9,274.3 L 104.2,274.5 L 105.5,274.3 L 107.4,273.9 L 108.8,273.4 L 110.0,272.7 L 112.0,271.3 L 119.5,263.1 L 123.8,258.4 L 132.1,249.2 L 145.5,240.0 L 159.1,230.6 L 166.2,225.8 L 173.1,218.4 L 175.4,215.9 L 181.7,209.1 L 187.6,202.8 L 190.5,198.4 L 191.3,194.3 L 191.4,194.2 L 191.2,193.9 L 190.1,192.5 L 184.5,189.8 L 182.4,188.4 L 181.7,187.0 L 181.3,185.2 L 181.2,181.6 L 176.4,183.1 L 174.8,183.3 L 173.4,183.3 L 169.1,182.6 L 167.6,182.0 L 167.1,181.2 L 167.5,180.9 L 168.0,180.6 L 168.2,180.1 L 167.9,179.5 L 167.7,179.2 L 162.1,173.8 L 160.4,172.9 L 156.8,172.9 L 155.1,175.2 L 153.8,177.9 L 150.9,179.1 L 149.3,178.5 L 147.4,177.1 L 145.8,175.4 L 144.8,174.0 L 144.5,172.8 L 144.5,171.5 L 144.3,170.5 L 143.3,170.0 L 136.4,169.9 L 135.0,169.6 L 134.7,168.1 L 135.6,166.4 L 136.8,164.7 L 137.6,163.3 L 137.7,161.8 L 137.3,158.7 L 137.4,157.1 L 137.8,156.2 L 139.8,153.7 L 140.0,153.0 L 140.1,152.7 L 140.3,151.6 L 143.6,144.0 L 143.7,143.6 L 143.7,142.7 L 144.0,142.3 L 144.4,142.0 L 145.6,141.8 L 146.0,141.7 L 146.7,140.8 L 149.1,135.2 L 149.2,131.8 L 148.2,128.5 L 145.9,125.1 L 144.2,123.7 L 139.6,121.0 L 138.4,119.7 L 138.3,118.1 L 138.7,116.3 L 140.2,112.4 L 144.2,102.1 L 146.0,99.1 L 146.4,98.9 L 147.6,98.7 L 148.0,98.5 L 148.3,98.0 L 148.5,97.1 L 148.6,96.7 L 150.6,93.9 L 153.5,91.2 L 154.2,90.3 L 154.7,89.6 L 155.3,87.8 L 155.1,86.9 L 154.2,85.1 L 154.0,84.1 L 154.7,81.7 L 154.6,81.0 L 153.4,79.0 L 151.8,79.4 L 149.9,80.8 L 147.7,81.5 L 148.2,80.2 L 150.3,76.5 L 156.9,68.4 L 157.3,67.4 L 157.6,66.5 L 158.1,65.5 L 159.2,64.7 L 160.2,64.4 L 162.2,64.5 L 163.2,64.3 L 164.6,63.8 L 167.6,61.8 L 168.5,61.4 L 170.4,61.1 L 171.3,60.8 L 173.9,59.1 L 177.6,56.6 L 180.2,56.0 L 184.9,56.0 L 188.9,56.5 L 192.8,57.5 L 201.0,61.3 L 213.6,67.2 L 215.4,67.5 L 216.5,66.7 L 216.6,66.6 L 217.7,65.4 L 219.5,64.7 L 229.8,63.4 L 231.6,62.7 L 232.5,62.0 L 240.4,54.5 L 240.6,54.0 L 240.9,54.0 L 242.9,54.8 L 243.5,55.1 L 245.8,56.7 L 252.8,63.4 L 254.3,65.5 L 254.6,67.1 L 254.9,70.9 L 255.6,72.4 L 257.0,73.0 L 264.7,73.4 L 265.5,73.4 L 266.7,73.9 L 267.9,75.6 L 268.6,76.5 L 270.1,77.9 L 271.8,78.6 L 278.0,79.7 L 279.2,79.6 L 279.8,78.9 L 280.0,78.4 L 280.3,77.2 L 280.3,75.9 L 279.8,72.9 L 280.0,71.8 L 281.1,70.6 L 299.3,61.2 L 303.7,60.3 L 321.8,59.1 L 337.4,58.0 L 345.7,55.9 L 353.5,52.5 L 359.5,48.7 L 361.2,48.2 L 363.2,48.9 L 375.7,57.6 L 377.8,58.5 L 380.8,59.0 L 389.8,59.4 L 405.7,60.1 L 410.0,59.6 L 413.7,57.8 L 414.2,57.5 L 421.5,51.3 L 430.9,43.2 L 442.0,33.8 L 450.1,26.9 L 458.2,20.0 L 461.0,21.2 L 463.2,22.7 L 464.5,24.6 L 464.4,27.2 L 464.5,28.4 L 465.3,29.3 L 466.4,30.2 L 467.3,31.1 L 467.6,32.1 L 467.6,33.1 L 467.3,35.0 L 466.9,36.2 L 466.5,37.0 L 466.5,37.9 L 467.2,39.2 L 468.4,40.1 L 469.9,41.0 L 471.0,41.9 L 471.3,43.3 L 470.2,45.5 L 469.0,47.4 L 468.8,48.9 L 471.1,49.6 L 472.7,49.3 L 476.6,48.1 L 478.5,48.1 L 480.7,49.1 L 481.0,50.2 L 479.9,51.4 L 475.2,53.5 L 475.3,53.9 L 476.9,54.4 L 478.1,55.7 L 476.2,56.8 L 475.5,57.4 L 476.8,57.8 L 477.6,57.8 L 479.3,57.4 L 481.3,57.3 L 483.2,56.8 L 484.3,56.8 L 484.3,57.2 L 486.5,59.6 L 488.0,63.0 L 489.2,63.5 L 489.6,63.2 L 490.0,62.4 L 491.1,61.6 L 493.8,60.9 L 495.5,61.5 L 498.8,64.4 L 500.6,65.2 L 502.5,65.7 L 503.9,66.5 L 504.6,68.3 L 504.3,75.1 L 503.4,78.4 L 501.5,80.9 L 500.6,81.3 L 499.6,81.5 L 498.7,81.9 L 498.1,82.6 L 498.2,83.5 L 499.4,85.3 L 499.9,86.3 L 499.7,87.1 L 498.7,89.1 L 498.4,90.1 L 498.7,91.1 L 499.4,92.0 L 500.4,92.8 L 501.1,93.7 L 502.4,97.1 L 503.4,107.5 L 504.4,109.4 L 506.5,110.5 L 511.2,111.6 L 513.2,112.8 L 514.4,114.6 L 514.4,114.6 L 517.3,127.3 L 518.3,128.8 L 521.4,131.8 L 522.9,133.8 L 523.8,134.6 L 525.1,134.9 L 525.8,134.7 L 526.9,133.9 L 527.3,133.8 L 527.5,133.6 L 528.0,133.0 L 528.2,132.8 L 528.6,133.0 L 528.8,133.3 L 529.0,133.6 L 529.1,133.7 L 529.3,134.0 L 532.1,135.1 L 532.7,135.2 L 533.3,135.9 L 533.7,136.7 L 535.7,142.0 L 537.2,149.3 L 541.4,156.7 L 542.4,157.5 L 543.7,157.5 L 544.5,156.9 L 545.2,156.2 L 546.1,156.1 L 547.1,157.3 L 547.6,161.5 L 548.2,163.1 L 550.9,165.4 L 551.8,166.9 L 551.5,168.8 L 550.1,170.3 L 548.1,171.2 L 546.3,172.4 L 545.4,174.5 L 546.1,177.8 L 549.9,185.7 L 551.7,189.3 L 556.1,198.5 L 556.2,200.1 L 555.2,203.9 L 555.1,205.5 L 555.2,207.3 L 555.6,209.0 L 556.3,210.4 L 557.2,211.3 L 559.5,213.2 L 560.0,214.1 L 559.6,215.0 L 557.8,217.0 L 557.4,218.0 L 557.2,234.4 L 556.7,236.2 L 553.5,241.9 L 552.8,242.9 L 551.8,243.7 L 550.8,244.0 L 548.7,244.4 L 547.7,244.8 L 545.5,247.7 L 543.4,254.5 L 537.5,258.6 L 537.7,260.0 L 537.9,261.6 L 539.6,265.1 L 540.6,268.4 L 539.4,271.8 L 536.2,273.0 L 528.1,273.8 L 526.0,274.8 L 522.6,277.6 L 517.9,278.5 L 517.2,280.1 L 517.0,282.0 L 516.5,282.7 L 515.9,283.5 L 515.8,283.5 L 513.9,283.8 L 512.3,283.1 L 510.6,282.7 L 508.6,284.4 L 507.6,285.9 L 506.8,287.6 L 506.3,289.4 L 506.2,293.2 L 505.7,294.9 L 503.1,300.3 L 500.2,303.5 L 498.8,306.9 L 497.1,308.2 L 490.8,310.9 L 489.9,311.7 L 489.7,312.7 L 489.3,314.7 L 487.7,318.3 L 485.4,320.5 L 482.2,321.8 L 478.1,323.1 L 475.2,324.8 L 473.5,327.4 L 473.4,327.7 L 471.1,336.0 L 470.8,336.7 L 470.1,337.6 L 468.3,339.3 L 467.9,340.1 L 468.0,341.6 L 469.1,344.7 L 468.9,346.4 L 468.0,347.5 L 464.4,349.9 L 456.5,358.9 L 455.6,359.9 L 449.9,366.4 L 449.6,368.1 L 452.7,376.8 L 455.7,385.4 L 455.8,388.7 L 454.0,402.1 L 451.7,419.4 L 450.0,431.5 L 450.4,443.0 L 450.9,460.2 L 442.8,460.2 L 424.7,460.2 L 424.0,460.2 L 406.6,460.2 L 403.7,460.2 L 388.5,460.2 L 370.4,460.2 L 352.3,460.2 L 346.4,460.2 L 334.2,460.2 L 334.0,460.2 L 316.1,460.2 L 297.9,460.2 L 279.8,460.2 L 261.7,460.2 L 261.2,460.2 L 243.6,460.2 L 225.5,460.2 L 207.4,460.2 L 191.4,460.2 L 189.3,460.2 L 171.1,460.2 L 153.0,460.2 L 146.6,460.2 L 145.1,459.5 L 141.6,458.8 L 137.8,460.4 L 134.1,461.4 L 132.7,462.1 L 129.1,465.2 L 127.9,466.1 L 125.5,465.5 L 123.3,465.3 L 118.3,465.7 L 116.5,466.1 L 115.3,466.1 L 114.7,465.9 L 114.2,465.4 L 113.5,465.0 L 112.3,464.9 L 111.5,465.5 L 111.4,465.6 Z'

// ── Location data enriched ────────────────────────────────────────────────
const LOCATIONS = [
  {
    id: 'kampala', name: 'Kampala', region: 'Central',
    coords: [0.3476, 32.5825],
    billboards: 24, impressions: '4.2M/mo', size: '10×12m',
    traffic: 'Very High', status: 'Available',
    roads: ['Kampala Rd', 'Jinja Rd', 'Entebbe Rd'],
    img: 'https://images.unsplash.com/photo-1567095761054-7a02e69e5c43?w=600&q=80',
    desc: 'Uganda\'s capital and commercial hub. Billboards positioned along the busiest corridors in East Africa.',
  },
  {
    id: 'entebbe', name: 'Entebbe', region: 'Central',
    coords: [0.0522, 32.4635],
    billboards: 8, impressions: '1.8M/mo', size: '8×10m',
    traffic: 'High', status: 'Booked',
    roads: ['Entebbe Rd', 'Airport Rd'],
    img: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600&q=80',
    desc: 'Gateway city hosting Entebbe International Airport. High-value exposure to international travellers.',
  },
  {
    id: 'jinja', name: 'Jinja', region: 'Eastern',
    coords: [0.4244, 33.2040],
    billboards: 11, impressions: '2.1M/mo', size: '12×8m',
    traffic: 'High', status: 'Available',
    roads: ['Jinja–Kampala Hwy', 'Source of Nile Rd'],
    img: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=600&q=80',
    desc: 'Source of the Nile city. Commercial hub for Eastern Uganda with heavy transit traffic.',
  },
  {
    id: 'mbarara', name: 'Mbarara', region: 'Western',
    coords: [-0.6069, 30.6587],
    billboards: 9, impressions: '1.5M/mo', size: '10×10m',
    traffic: 'Medium', status: 'Available',
    roads: ['Mbarara–Kampala Rd', 'Kabale Rd'],
    img: 'https://images.unsplash.com/photo-1486299267070-83823f5448dd?w=600&q=80',
    desc: 'Fastest-growing city in Western Uganda. Strong consumer base for brand activations.',
  },
  {
    id: 'gulu', name: 'Gulu', region: 'Northern',
    coords: [2.7747, 32.2990],
    billboards: 7, impressions: '1.1M/mo', size: '8×12m',
    traffic: 'Medium', status: 'Booked',
    roads: ['Gulu–Kampala Hwy', 'Laroo Rd'],
    img: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600&q=80',
    desc: 'Northern Uganda\'s largest city. Rapid development creating growing advertising demand.',
  },
  {
    id: 'masaka', name: 'Masaka', region: 'Central',
    coords: [-0.3376, 31.7340],
    billboards: 6, impressions: '0.9M/mo', size: '10×8m',
    traffic: 'Medium', status: 'Available',
    roads: ['Masaka Rd', 'Mbarara Hwy'],
    img: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=600&q=80',
    desc: 'Strategic mid-point on the Kampala–Mbarara corridor with growing retail activity.',
  },
  {
    id: 'mbale', name: 'Mbale', region: 'Eastern',
    coords: [1.0796, 34.1753],
    billboards: 5, impressions: '0.8M/mo', size: '8×10m',
    traffic: 'Medium', status: 'Available',
    roads: ['Mbale–Jinja Rd', 'Mt Elgon Rd'],
    img: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80',
    desc: 'Eastern Uganda\'s commercial gateway at the foot of Mt. Elgon.',
  },
  {
    id: 'fort-portal', name: 'Fort Portal', region: 'Western',
    coords: [0.6710, 30.2742],
    billboards: 4, impressions: '0.6M/mo', size: '8×8m',
    traffic: 'Low', status: 'Available',
    roads: ['Fort Portal Rd', 'Rwenzori Rd'],
    img: 'https://images.unsplash.com/photo-1494783367193-149034c05e8f?w=600&q=80',
    desc: 'Tourism capital of Uganda near the Rwenzori Mountains and Kibale Forest.',
  },
]

const STATUS_COLOR = { Available: '#16a34a', Booked: '#dc2626' }
const TRAFFIC_W = { 'Very High': 4, 'High': 3, 'Medium': 2, 'Low': 1 }
const REGION_COLOR = { Central: BB, Eastern: '#7c3aed', Western: '#059669', Northern: '#d97706' }

// ── Radar sweep animation ─────────────────────────────────────────────────
// Key: ALL drawing is relative to (0,0) inside a <g transform="translate(cx,cy)">.
// This means `transformOrigin: '0 0'` on the motion.g correctly pivots from the hub.
const Radar = ({ cx, cy, r }) => (
  <>
    <defs>
      {/* Radial gradient from centre — sweep fades outward from hub */}
      <radialGradient id="sweep-grad" cx="0%" cy="0%" r="100%">
        <stop offset="0%"   stopColor={BB} stopOpacity="0.55" />
        <stop offset="100%" stopColor={BB} stopOpacity="0"    />
      </radialGradient>
      {/* Clip to the outer ring so nothing bleeds outside */}
      <clipPath id="radar-clip">
        <circle cx="0" cy="0" r={r} />
      </clipPath>
    </defs>

    {/* Translate to hub centre — all children use (0,0) as origin */}
    <g transform={`translate(${cx},${cy})`}>

      {/* Concentric range rings */}
      <circle r={r}         fill="none" stroke={BB} strokeWidth="1"   opacity="0.15" />
      <circle r={r * 0.67}  fill="none" stroke={BB} strokeWidth="0.8" opacity="0.10" />
      <circle r={r * 0.34}  fill="none" stroke={BB} strokeWidth="0.8" opacity="0.07" />

      {/* Crosshair lines through the exact hub */}
      <line x1={-r} y1="0" x2={r} y2="0" stroke={BB} strokeWidth="0.6" opacity="0.10" />
      <line x1="0" y1={-r} x2="0" y2={r}  stroke={BB} strokeWidth="0.6" opacity="0.10" />

      {/* ── Focal hub — stationary, always on top ──────────────────── */}
      {/* Outer pulsing ring */}
      <motion.circle
        cx="0" cy="0"
        r="8"
        fill="none" stroke={BG} strokeWidth="2"
        animate={{ r: [8, 20, 8], opacity: [0.9, 0, 0.9] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
      />
      {/* Static outer ring */}
      <circle cx="0" cy="0" r="10" fill="none" stroke={BG} strokeWidth="1.2" opacity="0.5" />
      {/* Hub dot — golden so it's unmistakably the radar centre, not a location pin */}
      <circle cx="0" cy="0" r="8" fill={BG} opacity="1"
        style={{ filter: `drop-shadow(0 0 10px ${BG})` }} />
      {/* Inner ring */}
      <circle cx="0" cy="0" r="4" fill="none" stroke={BB} strokeWidth="1.5" opacity="0.8" />
      {/* Centre pinhole */}
      <circle cx="0" cy="0" r="2" fill={BB} opacity="0.9" />
    </g>
  </>
)

// PIN_DELAYS: deterministic per-index delays (no Math.random)
const PIN_DELAYS = [0, 0.3, 0.6, 0.9, 1.2, 0.15, 0.45, 0.75]

// ── Pin component ─────────────────────────────────────────────────────────
const Pin = ({ loc, isActive, onClick, index }) => {
  const pt = project(loc.coords)
  const w = TRAFFIC_W[loc.traffic]
  const ringSize = 10 + w * 4
  const delay = PIN_DELAYS[index % PIN_DELAYS.length]

  return (
    <g onClick={onClick} style={{ cursor: 'pointer' }}>
      {/* Invisible larger hit area for easier clicking */}
      <circle cx={pt.x} cy={pt.y} r={22} fill="transparent" />

      {/* Ping ring — deterministic delay */}
      <motion.circle
        cx={pt.x} cy={pt.y}
        r={ringSize}
        fill="none" stroke={isActive ? BG : BB} strokeWidth="1.5"
        animate={{ r: [ringSize, ringSize + 14, ringSize], opacity: [0.7, 0, 0.7] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut', delay }}
      />
      {/* Main dot */}
      <motion.circle
        cx={pt.x} cy={pt.y}
        r={isActive ? 9 : 6}
        fill={isActive ? BG : BB}
        stroke="white" strokeWidth={isActive ? 2.5 : 2}
        animate={{ r: isActive ? 9 : 6 }}
        transition={{ duration: 0.25 }}
        whileHover={{ r: 10 }}
      />
      {/* Label */}
      <AnimatePresence>
        {isActive && (
          <motion.g initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <rect x={pt.x - 34} y={pt.y - 28} width="68" height="16" rx="3"
              fill={BB} />
            <text x={pt.x} y={pt.y - 17} textAnchor="middle"
              fill="white" fontSize="8" fontWeight="bold" fontFamily="system-ui" letterSpacing="0.5">
              {loc.name.toUpperCase()}
            </text>
          </motion.g>
        )}
      </AnimatePresence>
    </g>
  )
}

// ── Location Detail Panel ────────────────────────────────────────────────
const DetailPanel = ({ loc, onClose }) => (
  <motion.div
    key={loc.id}
    initial={{ opacity: 0, x: 40 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: 40 }}
    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    className="relative flex flex-col bg-white border border-gray-100 overflow-hidden"
    style={{ boxShadow: '0 4px 32px rgba(2,32,170,0.10)' }}
  >
    {/* Image */}
    <div className="relative h-44 flex-shrink-0 overflow-hidden">
      <img src={loc.img} alt={loc.name} className="w-full h-full object-cover" />
      <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${BB}cc, transparent 50%)` }} />

      {/* Status badge */}
      <div className="absolute top-3 right-3 px-2.5 py-1 text-xs font-black uppercase tracking-wider"
        style={{ background: STATUS_COLOR[loc.status], color: '#fff' }}>
        {loc.status}
      </div>

      {/* Region chip */}
      <div className="absolute top-3 left-3 px-2.5 py-1 text-xs font-black uppercase tracking-wider"
        style={{ background: REGION_COLOR[loc.region], color: '#fff' }}>
        {loc.region}
      </div>

      {/* Name over image */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <h3 className="text-white font-black text-xl leading-tight">{loc.name}</h3>
      </div>

      {/* Close */}
      <button onClick={onClose}
        className="absolute top-3 right-24 w-7 h-7 flex items-center justify-center text-white text-xs font-black"
        style={{ background: 'rgba(0,0,0,0.4)' }}>
        ✕
      </button>
    </div>

    {/* Info */}
    <div className="p-5 flex-grow overflow-y-auto">
      <p className="text-gray-400 text-xs leading-relaxed mb-5">{loc.desc}</p>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-2 mb-5">
        {[
          { l: 'Billboards', v: loc.billboards },
          { l: 'Monthly Reach', v: loc.impressions },
          { l: 'Size', v: loc.size },
          { l: 'Traffic', v: loc.traffic },
        ].map(s => (
          <div key={s.l} className="border border-gray-100 p-3 bg-gray-50">
            <div className="text-xs font-black" style={{ color: BB }}>{s.v}</div>
            <div className="text-xs text-gray-400 uppercase tracking-wider mt-0.5">{s.l}</div>
          </div>
        ))}
      </div>

      {/* Roads */}
      <div className="mb-5">
        <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: BB }}>Key Roads</p>
        <div className="flex flex-wrap gap-1.5">
          {loc.roads.map(r => (
            <span key={r} className="px-2 py-1 text-xs font-medium border border-gray-200 text-gray-500">{r}</span>
          ))}
        </div>
      </div>

      <Link to="/contact">
        <button className="w-full py-3 text-xs font-extrabold uppercase tracking-widest text-white transition-all"
          style={{ background: BB }}
          onMouseEnter={e => { e.currentTarget.style.background = BG; e.currentTarget.style.color = BB }}
          onMouseLeave={e => { e.currentTarget.style.background = BB; e.currentTarget.style.color = '#fff' }}>
          Book This Location →
        </button>
      </Link>
    </div>
  </motion.div>
)

// ── Mini location list ───────────────────────────────────────────────────
const LocationRow = ({ loc, isActive, onClick }) => (
  <motion.button
    onClick={onClick}
    whileHover={{ x: 4 }}
    className="w-full flex items-center gap-3 p-3 border-b border-gray-100 text-left transition-colors"
    style={{ background: isActive ? `${BB}08` : 'transparent' }}
  >
    <span className="w-2 h-2 rounded-full flex-shrink-0"
      style={{ background: isActive ? BG : STATUS_COLOR[loc.status] }} />
    <div className="flex-grow min-w-0">
      <div className="text-xs font-black text-gray-900 truncate">{loc.name}</div>
      <div className="text-xs text-gray-400">{loc.billboards} boards · {loc.impressions}</div>
    </div>
    <span className="text-xs font-bold flex-shrink-0" style={{ color: REGION_COLOR[loc.region] }}>
      {loc.region}
    </span>
  </motion.button>
)

// ── Main Component ───────────────────────────────────────────────────────
const LocationsMap = () => {
  const [active, setActive] = useState(LOCATIONS[0])
  const [filter, setFilter] = useState('All')

  const regions = ['All', 'Central', 'Eastern', 'Western', 'Northern']
  const filtered = filter === 'All' ? LOCATIONS : LOCATIONS.filter(l => l.region === filter)

  const kampalaCenter = project([1.37, 32.29])

  return (
    <section className="py-14 bg-gray-50">
      <div className="container mx-auto px-6">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.6 }} className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-1 w-7 rounded-full" style={{ background: BG }} />
            <p className="text-xs font-bold uppercase tracking-[0.35em]" style={{ color: BB }}>Our Reach</p>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 leading-tight">
              Coverage <span style={{ color: BB }}>Radar</span>
            </h2>
            <p className="text-gray-400 text-sm max-w-xs md:text-right">
              Click any location to explore billboard specs, traffic data, and availability.
            </p>
          </div>

          {/* Region filters */}
          <div className="flex flex-wrap gap-2 mt-5">
            {regions.map(r => (
              <button key={r} onClick={() => setFilter(r)}
                className="px-4 py-1.5 text-xs font-bold uppercase tracking-wider border-2 transition-all"
                style={{
                  borderColor: filter === r ? BB : '#e5e7eb',
                  background: filter === r ? BB : 'transparent',
                  color: filter === r ? '#fff' : '#6b7280',
                }}>
                {r}
              </button>
            ))}
          </div>

          <motion.div className="mt-5 h-px bg-gray-200"
            initial={{ scaleX: 0, originX: 0 }} whileInView={{ scaleX: 1 }}
            viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }} />
        </motion.div>

        {/* Main layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">

          {/* ── SVG Radar Map ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7 }}
            className="lg:col-span-5 border border-gray-200 bg-white relative overflow-hidden"
            style={{ minHeight: 380 }}
          >
            {/* Map label */}
            <div className="absolute top-3 left-3 z-10 px-2.5 py-1 text-xs font-black uppercase tracking-widest"
              style={{ background: BB, color: '#fff' }}>
              Uganda · Live Coverage
            </div>

            {/* Legend */}
            <div className="absolute bottom-3 left-3 z-10 flex flex-col gap-1.5 bg-white/90 border border-gray-100 p-3">
              {Object.entries(REGION_COLOR).map(([r, c]) => (
                <div key={r} className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ background: c }} />
                  <span className="text-xs text-gray-500">{r}</span>
                </div>
              ))}
            </div>

            <svg
              viewBox={`0 0 ${MAP_W} ${MAP_H}`}
              className="w-full h-full"
              style={{ minHeight: 380 }}
            >
              {/* Uganda land — smooth bezier border */}
              <path d={UGANDA_PATH}
                fill={`${BB}09`} stroke={BB} strokeWidth="2" strokeLinejoin="round"
                strokeLinecap="round" />
              {/* Subtle inner glow fill */}
              <path d={UGANDA_PATH}
                fill={`${BB}04`} stroke="none" />

              {/* Radar from Uganda centre */}
              <Radar cx={kampalaCenter.x} cy={kampalaCenter.y} r={170} />

              {/* Connection lines from Kampala to all locations */}
              {LOCATIONS.map(loc => {
                const pt = project(loc.coords)
                return (
                  <motion.line key={loc.id}
                    x1={kampalaCenter.x} y1={kampalaCenter.y}
                    x2={pt.x} y2={pt.y}
                    stroke={active?.id === loc.id ? BG : BB}
                    strokeWidth={active?.id === loc.id ? 1.5 : 0.5}
                    strokeDasharray="4 4"
                    opacity={active?.id === loc.id ? 0.6 : 0.15}
                    animate={{ opacity: active?.id === loc.id ? 0.6 : 0.15 }}
                    transition={{ duration: 0.3 }}
                  />
                )
              })}

              {/* Pins */}
              {LOCATIONS.filter(l => filter === 'All' || l.region === filter).map(loc => (
                <Pin key={loc.id} loc={loc}
                  isActive={active?.id === loc.id}
                  onClick={() => setActive(loc)} />
              ))}
            </svg>
          </motion.div>

          {/* ── Location List ── */}
          <motion.div
            initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-3 border border-gray-200 bg-white overflow-hidden flex flex-col"
          >
            {/* List header */}
            <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-widest" style={{ color: BB }}>
                {filtered.length} Location{filtered.length !== 1 ? 's' : ''}
              </span>
              <div className="flex gap-1">
                <span className="w-2 h-2 rounded-full" style={{ background: '#16a34a' }} />
                <span className="text-xs text-gray-400">Available</span>
                <span className="w-2 h-2 rounded-full ml-2" style={{ background: '#dc2626' }} />
                <span className="text-xs text-gray-400">Booked</span>
              </div>
            </div>

            <div className="overflow-y-auto flex-grow">
              {filtered.map(loc => (
                <LocationRow key={loc.id} loc={loc}
                  isActive={active?.id === loc.id}
                  onClick={() => setActive(loc)} />
              ))}
            </div>

            {/* Totals */}
            <div className="border-t border-gray-100 p-4 grid grid-cols-2 gap-3">
              <div>
                <div className="text-sm font-black" style={{ color: BB }}>
                  {LOCATIONS.reduce((s, l) => s + l.billboards, 0)}+
                </div>
                <div className="text-xs text-gray-400 mt-0.5">Total Boards</div>
              </div>
              <div>
                <div className="text-sm font-black" style={{ color: BB }}>10M+</div>
                <div className="text-xs text-gray-400 mt-0.5">Monthly Reach</div>
              </div>
            </div>
          </motion.div>

          {/* ── Detail Panel ── */}
          <div className="lg:col-span-4">
            <AnimatePresence mode="wait">
              {active
                ? <DetailPanel key={active.id} loc={active} onClose={() => setActive(null)} />
                : (
                  <motion.div key="empty"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="h-full border border-dashed border-gray-200 flex flex-col items-center justify-center text-center p-10"
                    style={{ minHeight: 380 }}>
                    <div className="w-12 h-12 flex items-center justify-center mb-4 text-xl"
                      style={{ background: `${BB}10`, color: BB }}>◈</div>
                    <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: BB }}>
                      Select a Location
                    </p>
                    <p className="text-gray-300 text-xs">Click any pin on the radar map or a row in the list to view billboard details.</p>
                  </motion.div>
                )}
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ delay: 0.3 }}
          className="mt-6 flex flex-col sm:flex-row items-center justify-between border border-gray-100 bg-white p-5 gap-4">
          <div>
            <p className="text-xs font-black uppercase tracking-widest mb-0.5" style={{ color: BB }}>
              Don't see your ideal city?
            </p>
            <p className="text-xs text-gray-400">We're expanding. Tell us where you need coverage and we'll make it happen.</p>
          </div>
          <Link to="/contact">
            <button className="flex-shrink-0 px-8 py-3 text-xs font-extrabold uppercase tracking-widest text-white transition-all whitespace-nowrap"
              style={{ background: BB }}
              onMouseEnter={e => { e.currentTarget.style.background = BG; e.currentTarget.style.color = BB }}
              onMouseLeave={e => { e.currentTarget.style.background = BB; e.currentTarget.style.color = '#fff' }}>
              Request a Location →
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default LocationsMap
