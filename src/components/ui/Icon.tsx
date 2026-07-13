import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Check,
  ChevronRight,
  CreditCard,
  EyeOff,
  GitBranch,
  LineChart,
  Mail,
  Menu,
  Radar,
  RefreshCw,
  Route,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  TrendingUp,
  X,
  Zap,
  type LucideProps,
} from 'lucide-react'

/** Curated Lucide set (2px stroke, the brand's default icon system). */
const map = {
  activity: Activity,
  'arrow-right': ArrowRight,
  'arrow-up-right': ArrowUpRight,
  'bar-chart': BarChart3,
  check: Check,
  'chevron-right': ChevronRight,
  'credit-card': CreditCard,
  'eye-off': EyeOff,
  'git-branch': GitBranch,
  'line-chart': LineChart,
  mail: Mail,
  menu: Menu,
  radar: Radar,
  'refresh-cw': RefreshCw,
  route: Route,
  search: Search,
  'shield-check': ShieldCheck,
  'sliders-horizontal': SlidersHorizontal,
  'trending-up': TrendingUp,
  x: X,
  zap: Zap,
} as const

export type IconName = keyof typeof map

export function Icon({ name, ...props }: { name: IconName } & LucideProps) {
  const Cmp = map[name]
  return <Cmp strokeWidth={2} {...props} />
}
