import type { LucideIcon } from 'lucide-react'
import {
  ArrowUpRight,
  Beef,
  Blocks,
  Boxes,
  Building2,
  Clock3,
  Fish,
  Flower2,
  Mail,
  MapPin,
  Phone,
  ShoppingCart,
  Scale,
  Sprout,
  Store,
  Truck,
  Utensils,
  Warehouse,
} from 'lucide-react'

import freshFruit from '../assets/images/market/fresh-fruit.jpg'
import freshMeat from '../assets/images/market/fresh-meat.jpg'
import freshSeafood from '../assets/images/market/fresh-seafood.jpg'
import marketPayment from '../assets/images/market/market-payment.jpg'
import marketStalls from '../assets/images/market/market-stalls.jpg'
import marketVideoPoster from '../assets/images/market/market-video-poster.jpg'
import marketVendor from '../assets/images/market/market-vendor.jpg'
import riceStaple from '../assets/images/market/staple-rice.jpg'
import vegetables from '../assets/images/market/market-3.jpg'
import bgVideo from '../assets/videos/bg.mp4'
import marketStoryVideo from '../assets/videos/video-compro.mp4'

export type NavItem = {
  label: string
  href: string
}

export type StatsItem = {
  value: string
  label: string
  icon: LucideIcon
}

export type CommodityCard = {
  title: string
  description: string
  image: string
  badge: string
  icon: LucideIcon
}

export type FacilityItem = {
  title: string
  description: string
  icon: LucideIcon
}

export type ActivityItem = {
  title: string
  caption: string
  image: string
}

export type AdvantageItem = {
  title: string
  description: string
  icon: LucideIcon
}

export const navItems: NavItem[] = [
  { label: 'Beranda', href: '#beranda' },
  { label: 'Tentang Kami', href: '#tentang' },
  { label: 'Video Pasar', href: '#video' },
  { label: 'Komoditas', href: '#komoditas' },
  { label: 'Fasilitas', href: '#fasilitas' },
  { label: 'Aktivitas', href: '#aktivitas' },
  { label: 'Kontak', href: '#kontak' },
]

export const stats: StatsItem[] = [
  { value: '120+', label: 'pedagang aktif', icon: Store },
  { value: '10+', label: 'blok perdagangan', icon: Blocks },
  { value: '600+', label: 'lapak tersedia', icon: Warehouse },
  { value: '100+', label: 'jenis komoditas', icon: Sprout },
]

export const marketImages = {
  heroPoster: marketVendor,
  marketTrade: marketPayment,
  videoPoster: marketVideoPoster,
  marketVendor,
  marketStalls,
} as const

export { bgVideo }
export { marketStoryVideo }

export const commodityCards: CommodityCard[] = [
  {
    title: 'Buah Segar',
    description: 'Pilihan hasil panen untuk memenuhi kebutuhan niaga dan pasokan harian.',
    image: freshFruit,
    badge: 'Hasil panen',
    icon: Sprout,
  },
  {
    title: 'Sayuran',
    description: 'Sayuran pilihan yang hadir dalam perputaran pasokan setiap hari.',
    image: vegetables,
    badge: 'Pasokan harian',
    icon: Flower2,
  },
  {
    title: 'Daging',
    description: 'Ragam komoditas protein yang menjadi bagian dari aktivitas perdagangan pasar.',
    image: freshMeat,
    badge: 'Komoditas protein',
    icon: Beef,
  },
  {
    title: 'Ikan & Hasil Laut',
    description: 'Hasil laut untuk melengkapi kebutuhan dagang dan distribusi pangan.',
    image: freshSeafood,
    badge: 'Hasil laut',
    icon: Fish,
  },
  {
    title: 'Bahan Pangan Pokok',
    description: 'Kebutuhan pokok dengan peran penting dalam menjaga ketersediaan pangan.',
    image: riceStaple,
    badge: 'Bahan pokok',
    icon: ShoppingCart,
  },
  {
    title: 'Komoditas Lainnya',
    description: 'Beragam kebutuhan lain yang melengkapi ekosistem perdagangan Sidotopo.',
    image: marketVendor,
    badge: 'Ragam komoditas',
    icon: Boxes,
  },
]

export const facilityItems: FacilityItem[] = [
  {
    title: 'Lapak perdagangan',
    description: 'Lebih dari 600 lapak untuk mendukung aktivitas niaga para pedagang.',
    icon: Store,
  },
  {
    title: 'Timbangan komoditas',
    description: 'Mendukung proses penimbangan komoditas dalam aktivitas perdagangan.',
    icon: Scale,
  },
  {
    title: 'Kantor utama',
    description: 'Pusat layanan dan pengelolaan operasional kawasan pasar.',
    icon: Building2,
  },
  {
    title: 'Kantin & area istirahat',
    description: 'Ruang singgah untuk mendukung kenyamanan pedagang dan pengunjung.',
    icon: Utensils,
  },
  {
    title: 'Musholla & toilet',
    description: 'Fasilitas dasar yang menunjang kebutuhan pengunjung selama beraktivitas.',
    icon: Building2,
  },
  {
    title: 'Parkir & akses kendaraan',
    description: 'Area pendukung untuk mobilitas pengunjung dan kegiatan distribusi.',
    icon: Truck,
  },
]

export const activityItems: ActivityItem[] = [
  { title: 'Buah segar', caption: 'Hasil bumi untuk kebutuhan perdagangan harian.', image: freshFruit },
  { title: 'Sayuran', caption: 'Aneka sayuran segar dalam satu sentra pangan.', image: vegetables },
  { title: 'Komoditas daging', caption: 'Pilihan produk daging untuk rantai pasok pangan.', image: freshMeat },
  { title: 'Hasil laut', caption: 'Ikan segar sebagai bagian dari ragam komoditas pasar.', image: freshSeafood },
  { title: 'Bahan pokok', caption: 'Beras dan kebutuhan pokok untuk pasokan masyarakat.', image: riceStaple },
  { title: 'Perdagangan pasar', caption: 'Ruang niaga yang mempertemukan penjual dan pembeli.', image: marketPayment },
]

export const advantages: AdvantageItem[] = [
  {
    title: 'Satu kawasan, banyak peluang',
    description: 'Ruang bertemunya pedagang, pemasok, dan pembeli dalam satu ekosistem niaga.',
    icon: Boxes,
  },
  {
    title: 'Denyut perdagangan Surabaya',
    description: 'Aktivitas pasar yang ikut menggerakkan rantai pasok kebutuhan pangan.',
    icon: Store,
  },
  {
    title: 'Ruang usaha yang terhubung',
    description: 'Blok dan lapak membentuk lingkungan niaga yang aktif dan dinamis.',
    icon: Warehouse,
  },
  {
    title: 'Komoditas yang beragam',
    description: 'Lebih dari 100 jenis komoditas hadir dalam kehidupan pasar sehari-hari.',
    icon: ArrowUpRight,
  },
]

export const marketAddress =
  'Jl. Sidotopo Lor No.68A, Sidotopo, Kec. Semampir, Surabaya, Jawa Timur 60152'

export const mapsUrl = 'https://maps.app.goo.gl/nmYXCcYh5uYysMw56'

export const marketPhone = '+6285225057885'

export const marketEmail = 'pasarinduk.sidotopo@gmail.com'

export const socialLinks = [
  { label: 'Instagram', href: 'https://www.instagram.com/pasarinduksurabayasidotopo/' },
  { label: 'TikTok', href: 'https://www.tiktok.com/@pasarinduk.surabaya' },
]

export const contactDetails = [
  { icon: MapPin, label: 'Alamat', value: marketAddress },
  { icon: Phone, label: 'Telepon', value: '+62 852 2505 7885', href: `tel:${marketPhone}` },
  { icon: Mail, label: 'Email', value: marketEmail, href: `mailto:${marketEmail}` },
  { icon: Clock3, label: 'Jam Operasional', value: 'Setiap hari, 24 jam' },
]
