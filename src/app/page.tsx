'use client'

import { useState, useEffect } from 'react'
import {
  Shield, AlertTriangle, Mail, Link2, XCircle,
  ChevronDown, ChevronUp, Eye, EyeOff, Lock,
  Bug, Search, BookOpen, Flag, Key, FileWarning, ArrowRight,
  Sun, Moon, Home, ArrowLeft, ShieldCheck,
  Siren, BarChart3, Sparkles
} from 'lucide-react'
// Using regular img tag for better compatibility
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from '@/components/ui/table'
import { useTheme } from 'next-themes'
import {
  phishingSamples, redFlagChecklist, preventionPractices,
  type SectionKey, type PhishingSample
} from '@/components/phishing/data'

// ─── Icon map ───
const iconMap: Record<string, React.ElementType> = {
  Eye, Search, Lock, Key, AlertTriangle, Flag, Shield,
}

// ─── Dashboard cards config ───
const dashboardCards = [
  { key: 'samples' as SectionKey, title: 'Email Samples', subtitle: '5 Phishing Analyses', desc: 'Analyze realistic phishing emails with suspicious links, keywords, red flags, and explanations.', icon: Mail, iconBg: 'bg-emerald-100 dark:bg-emerald-900/60', iconColor: 'text-emerald-600 dark:text-emerald-400', stat: '5 Samples', statColor: 'text-emerald-700 dark:text-emerald-300', borderHover: 'hover:border-emerald-400' },
  { key: 'redflags' as SectionKey, title: 'Red Flags', subtitle: '16 Red Flag Indicators', desc: 'Comprehensive checklist categorized by Sender, Content, Links, and Structure with severity levels.', icon: Flag, iconBg: 'bg-red-100 dark:bg-red-900/60', iconColor: 'text-red-600 dark:text-red-400', stat: '16 Flags', statColor: 'text-red-700 dark:text-red-300', borderHover: 'hover:border-red-400' },
  { key: 'urls' as SectionKey, title: 'URL Analysis', subtitle: '6 Deception Techniques', desc: 'Learn how attackers manipulate URLs using subdomain tricks, typosquatting, homograph attacks, and more.', icon: Link2, iconBg: 'bg-amber-100 dark:bg-amber-900/60', iconColor: 'text-amber-600 dark:text-amber-400', stat: '6 Techniques', statColor: 'text-amber-700 dark:text-amber-300', borderHover: 'hover:border-amber-400' },
  { key: 'prevention' as SectionKey, title: 'Prevention', subtitle: '7 Best Practices', desc: 'Essential phishing prevention practices including MFA, password managers, and verification techniques.', icon: ShieldCheck, iconBg: 'bg-sky-100 dark:bg-sky-900/60', iconColor: 'text-sky-600 dark:text-sky-400', stat: '7 Practices', statColor: 'text-sky-700 dark:text-sky-300', borderHover: 'hover:border-sky-400' },
  { key: 'response' as SectionKey, title: 'If Phished', subtitle: '8 Emergency Steps', desc: 'Step-by-step emergency response guide if you fall victim to a phishing attack. Speed limits damage.', icon: Siren, iconBg: 'bg-purple-100 dark:bg-purple-900/60', iconColor: 'text-purple-600 dark:text-purple-400', stat: '8 Steps', statColor: 'text-purple-700 dark:text-purple-300', borderHover: 'hover:border-purple-400' },
  { key: 'summary' as SectionKey, title: 'Summary', subtitle: 'Key Takeaways & Stats', desc: 'Core lessons from this analysis with critical statistics and actionable recommendations.', icon: BarChart3, iconBg: 'bg-gray-100 dark:bg-gray-700/60', iconColor: 'text-gray-600 dark:text-gray-300', stat: '6 Takeaways', statColor: 'text-gray-700 dark:text-gray-300', borderHover: 'hover:border-gray-400' },
]

// ═══════════════════════════════════════════════════════════
// SMALL COMPONENTS
// ═══════════════════════════════════════════════════════════

function SeverityBadge({ severity }: { severity: string }) {
  const c: Record<string, { color: string; icon: React.ElementType }> = {
    critical: { color: 'bg-red-100 text-red-800 border-red-300 dark:bg-red-900/50 dark:text-red-300 dark:border-red-700', icon: XCircle },
    high: { color: 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-900/50 dark:text-amber-300 dark:border-amber-700', icon: AlertTriangle },
    medium: { color: 'bg-sky-100 text-sky-800 border-sky-300 dark:bg-sky-900/50 dark:text-sky-300 dark:border-sky-700', icon: AlertTriangle },
  }
  const cfg = c[severity] || c.medium
  const Icon = cfg.icon
  return <Badge className={`${cfg.color} border text-xs font-semibold flex items-center gap-1`}><Icon className="w-3 h-3" />{severity.toUpperCase()}</Badge>
}

function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])
  if (!mounted) return <Button variant="outline" size="icon" className="border-gray-600"><Sun className="w-4 h-4" /></Button>
  return (
    <Button variant="outline" size="icon" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="border-gray-600 dark:border-gray-500 bg-transparent hover:bg-gray-700 dark:hover:bg-gray-600 text-white">
      {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
    </Button>
  )
}

function SectionHeader({ title, icon: Icon, description, onBack }: { title: string; icon: React.ElementType; description: string; onBack: () => void }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <Button variant="outline" size="sm" onClick={onBack} className="flex items-center gap-1 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700">
        <ArrowLeft className="w-4 h-4" />Dashboard
      </Button>
      <div className="flex-1">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2"><Icon className="w-5 h-5" />{title}</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5">{description}</p>
      </div>
    </div>
  )
}

function EmailCard({ sample }: { sample: PhishingSample }) {
  const [showAnalysis, setShowAnalysis] = useState(false)
  const [linkRevealed, setLinkRevealed] = useState(false)
  const sc: Record<string, string> = { critical: 'border-l-red-500', high: 'border-l-amber-500', medium: 'border-l-sky-500' }
  return (
    <Card className={`border-l-4 ${sc[sample.severity]} shadow-md hover:shadow-lg transition-shadow dark:bg-gray-800/50 dark:border-gray-700`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <CardTitle className="text-lg font-bold text-gray-900 dark:text-gray-100">{sample.title}</CardTitle>
            <CardDescription className="flex items-center gap-2 mt-1">
              <Badge variant="outline" className="text-xs dark:border-gray-600">{sample.type}</Badge>
              <SeverityBadge severity={sample.severity} />
            </CardDescription>
          </div>
          <Button variant={showAnalysis ? 'default' : 'outline'} size="sm" onClick={() => setShowAnalysis(!showAnalysis)} className="flex items-center gap-1 shrink-0">
            {showAnalysis ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            {showAnalysis ? 'Hide' : 'Analyze'}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-gray-50 dark:bg-gray-900/60 rounded-lg border dark:border-gray-700 p-4 space-y-2 text-sm">
          <div className="flex gap-2"><span className="font-semibold text-gray-500 dark:text-gray-400 w-16">From:</span><span className="text-red-600 dark:text-red-400 font-mono">{sample.from}</span></div>
          <div className="flex gap-2"><span className="font-semibold text-gray-500 dark:text-gray-400 w-16">To:</span><span className="text-gray-700 dark:text-gray-300 font-mono">{sample.to}</span></div>
          <div className="flex gap-2"><span className="font-semibold text-gray-500 dark:text-gray-400 w-16">Subject:</span><span className="text-red-700 dark:text-red-400 font-semibold">{sample.subject}</span></div>
          <hr className="my-2 dark:border-gray-700" />
          <div className="space-y-1.5 text-gray-700 dark:text-gray-300">{sample.body.map((line, i) => <p key={i}>{line}</p>)}</div>
          <div className="mt-3 p-2 bg-red-50 dark:bg-red-950/40 rounded border border-red-200 dark:border-red-800">
            <div className="flex items-center gap-2 text-sm"><Link2 className="w-4 h-4 text-red-500 dark:text-red-400" /><span className="font-semibold text-red-700 dark:text-red-400">Suspicious Link:</span></div>
            <button onClick={() => setLinkRevealed(!linkRevealed)} className="mt-1 flex items-center gap-1 text-xs text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 font-mono break-all">
              {linkRevealed ? sample.link : sample.link.substring(0, 50) + '...'}
              {linkRevealed ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>
          </div>
        </div>
        {showAnalysis && (
          <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
            <div>
              <h4 className="font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2 mb-2"><Search className="w-4 h-4 text-amber-600 dark:text-amber-400" />Suspicious Links & Keywords</h4>
              <div className="rounded-lg border dark:border-gray-700 overflow-hidden">
                <Table>
                  <TableHeader><TableRow className="bg-gray-100 dark:bg-gray-700/50"><TableHead className="font-bold dark:text-gray-300">Element</TableHead><TableHead className="font-bold dark:text-gray-300">Details</TableHead><TableHead className="font-bold dark:text-gray-300">Why Suspicious</TableHead></TableRow></TableHeader>
                  <TableBody>{sample.suspiciousElements.map((el, i) => (
                    <TableRow key={i}><TableCell className="font-semibold text-amber-800 dark:text-amber-300 whitespace-nowrap">{el.element}</TableCell><TableCell className="font-mono text-xs text-red-600 dark:text-red-400">{el.details}</TableCell><TableCell className="text-gray-700 dark:text-gray-300">{el.reason}</TableCell></TableRow>
                  ))}</TableBody>
                </Table>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2 mb-2"><Flag className="w-4 h-4 text-red-600 dark:text-red-400" />Red Flags Found</h4>
              <div className="bg-red-50 dark:bg-red-950/30 rounded-lg border border-red-200 dark:border-red-800 p-4 space-y-2">
                {sample.redFlags.map((flag, i) => <div key={i} className="flex gap-2 text-sm"><XCircle className="w-4 h-4 text-red-500 dark:text-red-400 mt-0.5 shrink-0" /><span className="text-gray-800 dark:text-gray-200">{flag}</span></div>)}
              </div>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2 mb-2"><FileWarning className="w-4 h-4 text-red-700 dark:text-red-400" />Why This Message Is Unsafe</h4>
              <div className="bg-gray-50 dark:bg-gray-900/40 rounded-lg border dark:border-gray-700 p-4 space-y-3">
                {sample.whyUnsafe.map((reason, i) => <div key={i} className="flex gap-2 text-sm"><ArrowRight className="w-4 h-4 text-red-500 dark:text-red-400 mt-0.5 shrink-0" /><span className="text-gray-800 dark:text-gray-200">{reason}</span></div>)}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function RedFlagsSection() {
  const cc: Record<string, string> = { Sender: 'bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300', Content: 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300', Links: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300', Structure: 'bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-300' }
  return (
    <div className="rounded-lg border dark:border-gray-700 overflow-hidden">
      <Table>
        <TableHeader><TableRow className="bg-gray-100 dark:bg-gray-700/50"><TableHead className="font-bold dark:text-gray-300">Category</TableHead><TableHead className="font-bold dark:text-gray-300">Red Flag</TableHead><TableHead className="font-bold dark:text-gray-300">Severity</TableHead><TableHead className="font-bold dark:text-gray-300">Description</TableHead></TableRow></TableHeader>
        <TableBody>{redFlagChecklist.map((item, i) => (
          <TableRow key={i}><TableCell><Badge className={`${cc[item.category]} text-xs font-semibold`}>{item.category}</Badge></TableCell><TableCell className="font-semibold text-gray-900 dark:text-gray-100">{item.flag}</TableCell><TableCell><SeverityBadge severity={item.severity} /></TableCell><TableCell className="text-gray-700 dark:text-gray-300 text-sm">{item.description}</TableCell></TableRow>
        ))}</TableBody>
      </Table>
    </div>
  )
}

function URLSection() {
  const techniques = [
    { technique: 'Subdomain Deception', how: 'The legitimate brand name is placed as a subdomain of a different domain. The actual domain is the rightmost part before the TLD.', example: 'bankk-of-america.com.verify-account.secure-login-now.net → actual domain: secure-login-now.net' },
    { technique: 'Typosquatting', how: 'Deliberate misspelling of a legitimate domain name, relying on users not noticing small differences.', example: 'fedx-delivery.com instead of fedex.com; bankk-of-america.com instead of bankofamerica.com' },
    { technique: 'Homograph Attack', how: 'Using characters from different character sets that look identical (e.g., Cyrillic "a" instead of Latin "a").', example: 'Using Cyrillic "o" in "g00gle.com" to mimic google.com' },
    { technique: 'Path Manipulation', how: 'Using the URL path to include legitimate-looking terms that make the URL appear authentic.', example: 'fedx-delivery.com/track/package?id=FDX-8847291 mimics a real tracking URL' },
    { technique: 'URL Shortening', how: 'Using services like bit.ly or TinyURL to hide the true destination URL behind a shortened link.', example: 'bit.ly/3xK9mP2 - no way to determine destination without using an expander tool' },
    { technique: 'HTTP vs HTTPS', how: 'Using unencrypted HTTP instead of HTTPS for pages that should be secure (login, payment).', example: 'http://bankk-of-america.com... instead of https:// for a banking page' },
  ]
  const steps = [
    { step: 1, title: 'Read the URL from right to left', desc: 'The actual domain is the rightmost part before the TLD (.com, .org, .net). Everything to the left is either a subdomain or path.' },
    { step: 2, title: 'Check for HTTPS', desc: 'Legitimate organizations use HTTPS for any page requiring login or personal information.' },
    { step: 3, title: 'Look for misspellings', desc: 'Compare the domain to the known legitimate domain letter by letter. Watch for character substitutions (0 for O, l for I, rn for m).' },
    { step: 4, title: 'Hover without clicking', desc: 'On a desktop, hover over the link to see the actual URL in the browser\'s status bar.' },
    { step: 5, title: 'Use a URL expander', desc: 'For shortened links, use tools like urlexpander.net or checkshorturl.com to reveal the full destination.' },
    { step: 6, title: 'Verify independently', desc: 'Navigate to the organization\'s website directly by typing the known URL in your browser.' },
  ]
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2"><Bug className="w-5 h-5 text-amber-600 dark:text-amber-400" />URL Deception Techniques</h3>
        <div className="grid gap-4 md:grid-cols-2">{techniques.map((t, i) => (
          <Card key={i} className="border-l-4 border-l-amber-500 dark:bg-gray-800/50 dark:border-gray-700"><CardHeader className="pb-2"><CardTitle className="text-sm font-bold dark:text-gray-100">{t.technique}</CardTitle></CardHeader><CardContent className="space-y-2"><p className="text-xs text-gray-700 dark:text-gray-300">{t.how}</p><p className="text-xs font-mono text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/40 p-2 rounded">{t.example}</p></CardContent></Card>
        ))}</div>
      </div>
      <div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2"><BookOpen className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />How to Analyze a Suspicious URL</h3>
        <div className="space-y-3">{steps.map((s) => (
          <div key={s.step} className="flex gap-4 items-start bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 border dark:border-gray-700"><div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-sm shrink-0">{s.step}</div><div><h4 className="font-bold text-gray-900 dark:text-gray-100 text-sm">{s.title}</h4><p className="text-xs text-gray-700 dark:text-gray-300 mt-1">{s.desc}</p></div></div>
        ))}</div>
      </div>
    </div>
  )
}

function ResponseSection() {
  const steps = [
    { step: 1, title: 'Disconnect and Isolate', desc: 'Immediately disconnect from the internet to prevent further data transmission.', icon: Shield },
    { step: 2, title: 'Change Compromised Passwords', desc: 'Using a different, clean device, change the password for the compromised account.', icon: Key },
    { step: 3, title: 'Enable Multi-Factor Authentication', desc: 'Enable MFA on the compromised account and all other important accounts.', icon: Lock },
    { step: 4, title: 'Contact the Impersonated Organization', desc: 'Call the legitimate organization directly using a phone number from their official website.', icon: Mail },
    { step: 5, title: 'Monitor for Unauthorized Activity', desc: 'Check bank statements, credit card transactions, and account activity for unauthorized charges.', icon: Eye },
    { step: 6, title: 'Report the Phishing Attack', desc: 'Forward the phishing email to reportfraud.ftc.gov and your email provider.', icon: Flag },
    { step: 7, title: 'Scan Your Device for Malware', desc: 'Run a full system scan using updated antivirus software.', icon: Bug },
    { step: 8, title: 'Document Everything', desc: 'Save the phishing email, take screenshots, and note the date and time.', icon: FileWarning },
  ]
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">{steps.map((s) => {
        const Icon = s.icon
        return (
          <div key={s.step} className="flex gap-3 bg-white dark:bg-gray-800/50 rounded-lg p-4 border dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-400 flex items-center justify-center font-bold shrink-0">{s.step}</div>
            <div><div className="flex items-center gap-2"><Icon className="w-4 h-4 text-red-600 dark:text-red-400" /><h4 className="font-bold text-gray-900 dark:text-gray-100 text-sm">{s.title}</h4></div><p className="text-xs text-gray-700 dark:text-gray-300 mt-1">{s.desc}</p></div>
          </div>
        )
      })}</div>
      <div className="bg-red-50 dark:bg-red-950/30 border-2 border-red-300 dark:border-red-800 rounded-lg p-5">
        <div className="flex items-center gap-2 mb-2"><AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" /><h4 className="font-bold text-red-800 dark:text-red-300">Critical: Financial and Identity Theft Response</h4></div>
        <p className="text-sm text-red-900 dark:text-red-300">If you provided financial information to a phishing site, contact your bank immediately to freeze the account. If you provided your SSN or government ID, place a fraud alert with major credit bureaus. Time is critical: the faster you act, the more effectively you can limit the damage.</p>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════
// LANDING / FRONT PAGE
// ═══════════════════════════════════════════════════════════

function LandingPage({ onGetStarted }: { onGetStarted: () => void }) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-br from-gray-950 via-emerald-950 to-gray-950 dark:from-gray-950 dark:via-emerald-950 dark:to-gray-950">

      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-600/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Theme toggle */}
      <div className="absolute top-5 right-5 z-10">
        {mounted && (
          <Button
            variant="outline"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="border-emerald-700/50 bg-emerald-950/50 hover:bg-emerald-900/50 text-emerald-300"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </Button>
        )}
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-2xl mx-auto">

        {/* Logo */}
        <div className="mb-8 relative">
          <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-full border-4 border-emerald-500/40 shadow-2xl shadow-emerald-500/20 overflow-hidden bg-gradient-to-br from-emerald-900/50 to-teal-900/50 flex items-center justify-center backdrop-blur-sm">
            <img
              src="/tanias-logo.png"
              alt="Tania's Cybersecurity Services Logo"
              width={140}
              height={140}
              className="object-contain p-2"
            />
          </div>
          {/* Glowing ring */}
          <div className="absolute inset-0 w-36 h-36 sm:w-44 sm:h-44 rounded-full border-2 border-emerald-400/30 animate-ping" style={{ animationDuration: '3s' }} />
        </div>

        {/* Name */}
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-3">
          Build Your Future with Cybersecurity
        </h1>

        {/* Decorative line */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-emerald-500" />
          <Sparkles className="w-5 h-5 text-emerald-400" />
          <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-emerald-500" />
        </div>

        {/* Bold Tagline */}
        <p className="text-2xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-300 to-emerald-300 mb-6 leading-tight tracking-wide">
          Secure Yourself With Tania
        </p>

        {/* Description */}
        <p className="text-emerald-200/70 text-sm sm:text-base max-w-md mb-10 leading-relaxed">
          Learn to identify, analyze, and defend against phishing attacks through interactive real-world email analysis and comprehensive security training.
        </p>

        {/* Get Started Button */}
        <Button
          onClick={onGetStarted}
          size="lg"
          className="group relative px-10 py-6 text-lg font-bold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-2xl shadow-xl shadow-emerald-600/30 hover:shadow-emerald-500/40 transition-all duration-300 hover:scale-105 border-0"
        >
          <span className="flex items-center gap-2">
            Get Started
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </span>
        </Button>

        {/* Quick stats */}
        <div className="flex items-center gap-6 mt-12 text-emerald-300/60 text-xs sm:text-sm">
          <div className="flex items-center gap-1.5"><Shield className="w-4 h-4" /><span>5 Email Samples</span></div>
          <div className="w-1 h-1 rounded-full bg-emerald-500/40" />
          <div className="flex items-center gap-1.5"><Flag className="w-4 h-4" /><span>16 Red Flags</span></div>
          <div className="w-1 h-1 rounded-full bg-emerald-500/40" />
          <div className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4" /><span>7 Prevention Tips</span></div>
        </div>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════
// MAIN PAGE
// ═══════════════════════════════════════════════════════════

export default function PhishingAwarenessApp() {
  const [section, setSection] = useState<SectionKey | 'landing'>('landing')

  // Landing page mode
  if (section === 'landing') {
    return <LandingPage onGetStarted={() => setSection('dashboard')} />
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      {/* Header */}
      <header className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 text-white shadow-lg">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => setSection('dashboard')}>
              <div className="w-11 h-11 rounded-xl bg-emerald-500 flex items-center justify-center"><Shield className="w-6 h-6 text-white" /></div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight">Phishing Awareness</h1>
                <p className="text-gray-400 text-xs sm:text-sm">Tania&apos;s Cybersecurity Services</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {section !== 'dashboard' && (
                <Button variant="outline" size="sm" onClick={() => setSection('dashboard')} className="hidden sm:flex items-center gap-1 border-gray-600 dark:border-gray-500 bg-transparent hover:bg-gray-700 dark:hover:bg-gray-600 text-white">
                  <Home className="w-4 h-4" />Dashboard
                </Button>
              )}
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-6">

        {/* ── DASHBOARD ── */}
        {section === 'dashboard' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="bg-gradient-to-r from-emerald-600 to-teal-700 dark:from-emerald-800 dark:to-teal-900 rounded-2xl p-6 sm:p-8 text-white shadow-lg">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-sm"><Shield className="w-8 h-8 text-white" /></div>
                <div className="flex-1">
                  <h2 className="text-2xl sm:text-3xl font-bold">Phishing Awareness Analysis</h2>
                  <p className="text-emerald-100 mt-1 text-sm sm:text-base">Learn to identify, analyze, and defend against phishing attacks through interactive analysis.</p>
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
                {[{ label: 'Email Samples', value: '5', icon: Mail }, { label: 'Red Flags', value: '16', icon: Flag }, { label: 'URL Tricks', value: '6', icon: Link2 }, { label: 'Prevention Tips', value: '7', icon: ShieldCheck }].map((s, i) => {
                  const Icon = s.icon
                  return <div key={i} className="bg-white/15 backdrop-blur-sm rounded-xl p-3 text-center"><Icon className="w-5 h-5 mx-auto mb-1 text-emerald-200" /><p className="text-xl font-bold">{s.value}</p><p className="text-xs text-emerald-200">{s.label}</p></div>
                })}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2"><BarChart3 className="w-5 h-5 text-gray-600 dark:text-gray-400" />Explore Sections</h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {dashboardCards.map((card) => {
                  const Icon = card.icon
                  return (
                    <Card key={card.key} className={`cursor-pointer group transition-all duration-300 hover:scale-[1.02] hover:shadow-xl ${card.borderHover} dark:border-gray-700 border-2 bg-white dark:bg-gray-800/50`} onClick={() => setSection(card.key)}>
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <div className={`w-12 h-12 rounded-xl ${card.iconBg} flex items-center justify-center transition-transform group-hover:scale-110`}><Icon className={`w-6 h-6 ${card.iconColor}`} /></div>
                          <span className={`text-xs font-bold ${card.statColor}`}>{card.stat}</span>
                        </div>
                        <CardTitle className="text-base font-bold mt-3 text-gray-900 dark:text-gray-100">{card.title}</CardTitle>
                        <CardDescription className="text-xs text-gray-500 dark:text-gray-400 font-medium">{card.subtitle}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">{card.desc}</p>
                        <div className={`mt-3 inline-flex items-center gap-1 text-xs font-semibold ${card.iconColor} group-hover:gap-2 transition-all`}>Open Section <ArrowRight className="w-3 h-3" /></div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>
          </div>
        )}

        {/* ── EMAIL SAMPLES ── */}
        {section === 'samples' && (
          <div className="animate-in fade-in slide-in-from-right-2 duration-300">
            <SectionHeader title="Sample Phishing Email Analysis" icon={Mail} description="Analyze 5 realistic phishing email samples. Click 'Analyze' to reveal suspicious links, red flags, and explanations." onBack={() => setSection('dashboard')} />
            <div className="flex items-center gap-4 mb-4 text-xs bg-white dark:bg-gray-800/50 rounded-lg border dark:border-gray-700 p-3">
              <span className="font-semibold text-gray-700 dark:text-gray-300">Severity:</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-red-500" /> Critical</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-amber-500" /> High</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-sky-500" /> Medium</span>
            </div>
            <div className="space-y-6">{phishingSamples.map((s) => <EmailCard key={s.id} sample={s} />)}</div>
          </div>
        )}

        {/* ── RED FLAGS ── */}
        {section === 'redflags' && (
          <div className="animate-in fade-in slide-in-from-right-2 duration-300">
            <SectionHeader title="Comprehensive Red Flag Checklist" icon={Flag} description="Use this checklist when evaluating suspicious emails. One 'Critical' red flag = treat as phishing." onBack={() => setSection('dashboard')} />
            <RedFlagsSection />
          </div>
        )}

        {/* ── URL ANALYSIS ── */}
        {section === 'urls' && (
          <div className="animate-in fade-in slide-in-from-right-2 duration-300">
            <SectionHeader title="URL Deception & Analysis" icon={Link2} description="Understand how attackers manipulate URLs and learn the step-by-step analysis process." onBack={() => setSection('dashboard')} />
            <URLSection />
          </div>
        )}

        {/* ── PREVENTION ── */}
        {section === 'prevention' && (
          <div className="animate-in fade-in slide-in-from-right-2 duration-300">
            <SectionHeader title="Phishing Prevention Best Practices" icon={ShieldCheck} description="The most effective defense combines technical controls with human awareness." onBack={() => setSection('dashboard')} />
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {preventionPractices.map((p, i) => {
                const Icon = iconMap[p.icon] || Shield
                return (
                  <Card key={i} className="hover:shadow-md transition-shadow border-t-4 border-t-emerald-500 dark:bg-gray-800/50 dark:border-gray-700">
                    <CardHeader className="pb-2"><div className="flex items-center gap-2"><div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center"><Icon className="w-4 h-4 text-emerald-700 dark:text-emerald-400" /></div><CardTitle className="text-sm font-bold dark:text-gray-100">{p.title}</CardTitle></div></CardHeader>
                    <CardContent><p className="text-xs text-gray-700 dark:text-gray-300">{p.description}</p></CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        )}

        {/* ── IF PHISHED ── */}
        {section === 'response' && (
          <div className="animate-in fade-in slide-in-from-right-2 duration-300">
            <SectionHeader title="What To Do If You Are Phished" icon={Siren} description="Speed of response is the single most important factor in limiting damage." onBack={() => setSection('dashboard')} />
            <ResponseSection />
          </div>
        )}

        {/* ── SUMMARY ── */}
        {section === 'summary' && (
          <div className="animate-in fade-in slide-in-from-right-2 duration-300 space-y-6">
            <SectionHeader title="Key Takeaways" icon={BarChart3} description="Phishing is the most prevalent attack vector, but it can be defeated through awareness." onBack={() => setSection('dashboard')} />
            <div className="grid gap-4 md:grid-cols-2">
              {[{ title: 'Phishing exploits human psychology', action: 'Always pause and verify before acting on any email request, especially those creating urgency.', color: 'border-l-emerald-500' }, { title: 'Domain analysis reveals the truth', action: 'Read URLs from right to left; check sender domains against known legitimate domains.', color: 'border-l-amber-500' }, { title: 'Red flags are always present', action: 'Use the comprehensive checklist as a reference when evaluating suspicious messages.', color: 'border-l-red-500' }, { title: 'MFA is your safety net', action: 'Enable multi-factor authentication on all important accounts as a critical second layer of defense.', color: 'border-l-sky-500' }, { title: 'Reporting protects everyone', action: 'Report phishing attempts to your IT team, email provider, and organizations like APWG and FTC.', color: 'border-l-purple-500' }, { title: 'Speed limits damage', action: 'If phished, act immediately: change passwords, enable MFA, contact the organization, scan for malware.', color: 'border-l-red-500' }].map((item, i) => (
                <Card key={i} className={`border-l-4 ${item.color} dark:bg-gray-800/50 dark:border-gray-700`}><CardHeader className="pb-2"><CardTitle className="text-sm font-bold dark:text-gray-100">{item.title}</CardTitle></CardHeader><CardContent><p className="text-xs text-gray-700 dark:text-gray-300">{item.action}</p></CardContent></Card>
              ))}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[{ label: 'Data Breaches via Phishing', value: '36%', desc: 'of all breaches' }, { label: 'Phishing Attacks (2024)', value: '5M+', desc: 'attacks reported' }, { label: 'Lottery Scam Losses', value: '$150M+', desc: 'in 2024 alone' }, { label: 'Recovery Success', value: '94%', desc: 'if reported within 1hr' }].map((stat, i) => (
                <Card key={i} className="dark:bg-gray-800/50 dark:border-gray-700"><CardContent className="pt-4 text-center"><p className="text-2xl font-bold text-emerald-700 dark:text-emerald-400">{stat.value}</p><p className="text-xs font-semibold text-gray-900 dark:text-gray-200 mt-1">{stat.label}</p><p className="text-xs text-gray-500 dark:text-gray-400">{stat.desc}</p></CardContent></Card>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-gray-950 text-gray-400 text-center py-4 text-sm mt-auto border-t border-gray-800 dark:border-gray-800">
        <p>Tania&apos;s Cybersecurity Services | Phishing Awareness Analysis</p>
      </footer>
    </div>
  )
}
