import { memo } from 'react'
import {
  Bell,
  Copy,
  BookOpen,
  Brain,
  Building2,
  CheckCircle,
  ChevronRight,
  GraduationCap,
  Layers,
  LayoutDashboard,
  Medal,
  Menu,
  Sparkles,
  Trophy,
  X,
  Globe,
  Mail,
  Share2,
  User,
  Users,
  Settings,
  Search,
  LogOut,
  ArrowRight,
  ArrowLeft,
  ChevronDown,
  Clock,
  Flame,
  Palette,
  Video,
  Folder,
  Play,
  PlayCircle,
  FileText,
  Calculator,
  MoreHorizontal,
  Zap,
  Coins,
  Eye,
  EyeOff,
  Lock,
  Edit,
  Phone,
  Pause,
  Shield,
  MapPin,
  Sprout,
  Heart,
  Droplets,
  Leaf,
  HeartPulse,
  Church,
  Moon,
  Scroll,
  Landmark,
  Music,
  Briefcase,
  Umbrella,
  Archive,
  Mic,
  Pencil,
  Utensils,
  Scissors,
  Monitor,
  Database,
  TreePine,
  Hammer,
  Car,
  Building,
  Home,
  TrendingUp,
  Wallet,
  ShoppingCart,
  Receipt,
  MessageCircle,
  Award,
  Smartphone,
  WifiOff,
  PenTool,
  School
} from 'lucide-react'

import {
  IconChartBar,
  IconFlask,
  IconAtom,
  IconTarget,
  IconBook,
  IconChartLine,
  IconPercentage,
  IconTrophy,
  IconFlag,
  IconStar,
  IconGift,
  IconCrown,
  IconCalendar,
  IconMessage,
  IconDownload,
  IconExternalLink,
  IconCreditCard,
  IconCheck,
  IconChevronRight
} from '@tabler/icons-react'

// Icon mapping - use best icon from each library
export const ICONS = {
  // Navigation (Lucide - cleaner UI)
  bell: Bell,
  menu: Menu,
  user: User,
  settings: Settings,
  search: Search,
  logout: LogOut,
  arrowRight: ArrowRight,
  arrowLeft: ArrowLeft,
  chevronDown: ChevronDown,
  x: X,
  eye: Eye,
  eyeOff: EyeOff,
  lock: Lock,
  edit: Edit,
  phone: Phone,
  pause: Pause,
  
  // Brand/Edu (Lucide)
  copy: Copy,
  graduationCap: GraduationCap,
  bookOpen: BookOpen,
  sparkles: Sparkles,
  layers: Layers,
  layoutDashboard: LayoutDashboard,
  building2: Building2,
  brain: Brain,
  globe: Globe,
  mail: Mail,
  share2: Share2,
  users: Users,
  shield: Shield,
  mapPin: MapPin,
  
  // Subject Icons (Lucide)
  sprout: Sprout,
  heart: Heart,
  droplets: Droplets,
  leaf: Leaf,
  heartPulse: HeartPulse,
  church: Church,
  moon: Moon,
  scroll: Scroll,
  landmark: Landmark,
  music: Music,
  briefcase: Briefcase,
  umbrella: Umbrella,
  archive: Archive,
  mic: Mic,
  pencil: Pencil,
  utensils: Utensils,
  scissors: Scissors,
  monitor: Monitor,
  database: Database,
  tree: TreePine,
  hammer: Hammer,
  car: Car,
  building: Building,
  home: Home,
  trendingUp: TrendingUp,
  wallet: Wallet,
  shoppingCart: ShoppingCart,
  receipt: Receipt,
  messageCircle: MessageCircle,
  award: Award,
  smartphone: Smartphone,
  wifiOff: WifiOff,
  penTool: PenTool,
  school: School,
  
  // Achievement (Both available, choose preference)
  trophy: Trophy,           // Lucide
  trophyTabler: IconTrophy, // Tabler alternative
  medal: Medal,
  crown: IconCrown,
  star: IconStar,
  flag: IconFlag,
  
  // Assessment/Progress (Mix - best for each)
  checkCircle: CheckCircle,
  check: IconCheck,
  chevronRight: ChevronRight,
  chevronRightTabler: IconChevronRight,
  clock: Clock,
  flame: Flame,
  folder: Folder,
  play: Play,
  playCircle: PlayCircle,
  fileText: FileText,
  calculator: Calculator,
  moreHorizontal: MoreHorizontal,
  
  // Dashboard/Data (Tabler - better data viz)
  chartBar: IconChartBar,
  chartLine: IconChartLine,
  percentage: IconPercentage,
  target: IconTarget,
  zap: Zap,
  
  // Science/Education (Tabler - more specific)
  flask: IconFlask,
  atom: IconAtom,
  book: IconBook,
  palette: Palette,
  video: Video,
  
  // Gamification (Tabler + Lucide)
  coins: Coins,
  gift: IconGift,
  calendar: IconCalendar,
  message: IconMessage,
  
  // Actions (Tabler)
  download: IconDownload,
  externalLink: IconExternalLink,
  creditCard: IconCreditCard,
}

export type IconName = keyof typeof ICONS

interface IconProps {
  name: IconName
  size?: number
  className?: string
  style?: React.CSSProperties
}

export const Icon = memo(function Icon({ name, size = 20, className = '', style }: IconProps) {
  const IconComponent = ICONS[name]
  
  if (!IconComponent) {
    console.warn(`Icon "${name}" not found`)
    return null
  }

  // Tabler icons use 'size' prop, Lucide uses className with width/height
  return (
    <IconComponent 
      size={size}
      className={className}
      style={style}
    />
  )
})

// Preset icon combinations for common UI patterns
export function DashboardIcon({ className }: { className?: string }) {
  return <Icon name="layoutDashboard" className={className} />
}

export function StreakIcon({ className }: { className?: string }) {
  return <Icon name="flame" className={className} />
}

export function CoinIcon({ className }: { className?: string }) {
  return <Icon name="coins" className={className} />
}

export function ChemistryIcon({ className }: { className?: string }) {
  return <Icon name="flask" className={className} />
}
