import React, { useState } from 'react';
import {
  FileText,
  Copy,
  Check,
  Download,
  ExternalLink,
  Linkedin,
  Github,
  Terminal,
  Database,
  FolderTree,
  Sparkles,
  ShoppingBag,
  Cpu,
  ArrowRight,
  Code2,
  GitCommit,
  UserCheck,
  ShieldCheck,
  Layers,
  Search
} from 'lucide-react';

interface InventoryItem {
  id: number;
  product_name: string;
  category: string;
  stock_quantity: number;
  unit: string;
  unit_price_inr: number;
  reorder_level: number;
  last_updated: string;
}

const INITIAL_INVENTORY: InventoryItem[] = [
  { id: 1, product_name: 'Maggi 2-Minute Noodles (70g)', category: 'Packaged Food', stock_quantity: 42, unit: 'packets', unit_price_inr: 14, reorder_level: 20, last_updated: 'Today, 08:30 AM' },
  { id: 2, product_name: 'Parle-G Gold Biscuits (250g)', category: 'Biscuits & Snacks', stock_quantity: 18, unit: 'packs', unit_price_inr: 25, reorder_level: 15, last_updated: 'Today, 09:15 AM' },
  { id: 3, product_name: 'Tata Salt Vacuum Evaporated (1kg)', category: 'Groceries & Staples', stock_quantity: 8, unit: 'packets', unit_price_inr: 28, reorder_level: 10, last_updated: 'Yesterday' },
  { id: 4, product_name: 'Fortune Kachi Ghani Mustard Oil (1L)', category: 'Oils & Ghee', stock_quantity: 5, unit: 'bottles', unit_price_inr: 145, reorder_level: 12, last_updated: 'Today, 10:00 AM' },
  { id: 5, product_name: 'Amul Butter Salted (500g)', category: 'Dairy & Eggs', stock_quantity: 14, unit: 'blocks', unit_price_inr: 275, reorder_level: 8, last_updated: 'Today, 07:45 AM' },
  { id: 6, product_name: 'Britannia 100% Whole Wheat Bread (400g)', category: 'Bakery', stock_quantity: 6, unit: 'loaves', unit_price_inr: 45, reorder_level: 10, last_updated: 'Today, 06:30 AM' },
  { id: 7, product_name: 'Aashirvaad Superior MP Atta (10kg)', category: 'Groceries & Staples', stock_quantity: 11, unit: 'bags', unit_price_inr: 440, reorder_level: 5, last_updated: 'Oct 09' },
  { id: 8, product_name: 'MDH Deggi Mirch (100g)', category: 'Spices', stock_quantity: 26, unit: 'boxes', unit_price_inr: 88, reorder_level: 10, last_updated: 'Oct 08' },
  { id: 9, product_name: 'Brooke Bond Red Label Tea (500g)', category: 'Beverages', stock_quantity: 4, unit: 'packs', unit_price_inr: 260, reorder_level: 8, last_updated: 'Today, 11:20 AM' },
  { id: 10, product_name: 'Dettol Original Bathing Soap (125g x 3)', category: 'Personal Care', stock_quantity: 19, unit: 'bundles', unit_price_inr: 160, reorder_level: 6, last_updated: 'Oct 10' }
];

const RAW_README_CONTENT = `# 🛒 Amit's Portfolio | ChotuAI — Dukaan ka AI Assistant

[![Portfolio](https://img.shields.io/badge/Portfolio-Amit's%20Portfolio-blue?style=flat-square)](https://www.linkedin.com/in/amitbn1390/)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Amit%20B%20N-0A66C2?style=flat-square&logo=linkedin)](https://www.linkedin.com/in/amitbn1390/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)

**Built by Amit B N (aka the guy who thought kirana shops deserve their own Jarvis).**  
Featured in **Amit's Portfolio** — practical AI innovations built for real-world everyday problems.

---

## 🤖 What is ChotuAI?
Think of it as your shop’s *chhota dost* who:
* 💬 Answers inventory questions in plain Hinglish
* 📦 Tells you what’s left in stock
* 📉 Suggests reorders before you run out
* 🔌 Works offline (because WiFi ka bharosa nahi)
* 🤪 Cracks jokes when you’re bored

No dashboards, no enterprise nonsense, no ₹2999 setup fee.  
Bas ek laptop, thoda RAM, aur Chotu.

---

## ⚡ Why?
Because Excel feels like torture,  
Billing apps feel like scams,  
And shopkeepers just need something simple that talks back.

---

## 🛠️ Tech Chutney
* 🖥️ **Frontend**: Electron + Node.js with responsive Tailwind UI
* 🧠 **Backend**: Python FastAPI with local LLM (Llama 3.2)
* 🗄️ **Database**: PostgreSQL for dukaandari data & automated SQL query generation
* 🧪 **Testing**: Streamlit for rapid UI experimentation and prompt tuning

---

## 🚀 Future (if Amit doesn’t get lazy)
* 🎙️ Voice commands in Hindi and regional dialects
* 📑 CSV & photo upload for pen-paper logbooks
* 📊 Cute charts for sales & fast-moving items
* 📱 Maybe even an app for Android

---

## ❤️ Note from Amit B N
Not trying to build a unicorn 🦄  
Just trying to build something that even a kirana shop owner in Odisha can actually *use*.

---

## 👨‍💻 Connect with Amit B N
Explore more creations and get in touch via **Amit's Portfolio**:
* 💼 **LinkedIn Profile**: [https://www.linkedin.com/in/amitbn1390/](https://www.linkedin.com/in/amitbn1390/)
* 📂 **Project Showcase**: **Amit's Portfolio**
* 📬 **Collaborations & Inquiries**: Reach out on LinkedIn for discussions around AI engineering, local LLMs, and software systems.

---`;

export default function App() {
  const [activeTab, setActiveTab] = useState<'readme' | 'assistant' | 'inventory' | 'code' | 'diff'>('readme');
  const [copied, setCopied] = useState(false);
  const [inventory] = useState<InventoryItem[]>(INITIAL_INVENTORY);
  const [searchTerm, setSearchTerm] = useState('');

  // Assistant Chat State
  const [chatMessages, setChatMessages] = useState<Array<{
    id: string;
    role: 'user' | 'bot';
    text: string;
    sql?: string;
    results?: any[];
  }>>([
    {
      id: '1',
      role: 'bot',
      text: 'Namaste Sethji! 🙏 Main hoon Chotu. Puchiye dukaan mein kya stock dekhna hai, ya boliyega toh Maggi aur Parle-G ka hisaab nikal deta hoon!'
    }
  ]);
  const [userQuery, setUserQuery] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCopyReadme = () => {
    navigator.clipboard.writeText(RAW_README_CONTENT);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadReadme = () => {
    const element = document.createElement('a');
    const file = new Blob([RAW_README_CONTENT], { type: 'text/markdown' });
    element.href = URL.createObjectURL(file);
    element.download = 'README.md';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const executeSimulatedQuery = (queryText: string) => {
    if (!queryText.trim()) return;
    const qLower = queryText.toLowerCase();

    const newUserMsg = {
      id: Date.now().toString(),
      role: 'user' as const,
      text: queryText
    };

    setChatMessages(prev => [...prev, newUserMsg]);
    setUserQuery('');
    setIsProcessing(true);

    setTimeout(() => {
      let botResponse = '';
      let generatedSql = '';
      let matchedResults: any[] = [];

      if (qLower.includes('joke') || qLower.includes('bore') || qLower.includes('masti')) {
        botResponse = 'Ek customer dukaan pe aaya aur bola: "Bhaiya, thoda dimaag do na!"\nSethji bole: "Bhaiya dimaag nahi milta, Maggi le jao 2 minute mein pakao aur socho!" 😂';
        generatedSql = '-- No SQL required (Chotu Entertainment Module Activated)';
      } else if (qLower.includes('maggi')) {
        const item = inventory.find(i => i.product_name.toLowerCase().includes('maggi'));
        generatedSql = `SELECT product_name, stock_quantity, unit_price_inr \nFROM inventory \nWHERE product_name ILIKE '%maggi%';`;
        if (item) {
          matchedResults = [item];
          botResponse = `Sethji, Maggi ke **${item.stock_quantity} packets** bache hain shelf pe! Price ₹${item.unit_price_inr} per packet hai.`;
        }
      } else if (qLower.includes('parle') || qLower.includes('biscuit')) {
        const item = inventory.find(i => i.product_name.toLowerCase().includes('parle'));
        generatedSql = `SELECT product_name, stock_quantity, unit_price_inr \nFROM inventory \nWHERE product_name ILIKE '%parle%';`;
        if (item) {
          matchedResults = [item];
          botResponse = `Parle-G ke **${item.stock_quantity} packs** available hain. Reorder level 15 hai, abhi safe zone mein hain!`;
        }
      } else if (qLower.includes('oil') || qLower.includes('tel') || qLower.includes('mustard')) {
        const item = inventory.find(i => i.product_name.toLowerCase().includes('oil'));
        generatedSql = `SELECT product_name, stock_quantity, reorder_level \nFROM inventory \nWHERE category = 'Oils & Ghee';`;
        if (item) {
          matchedResults = [item];
          botResponse = `⚠️ Mustard Oil ka stock critical hai! Sirf **${item.stock_quantity} bottles** bachi hain (Reorder level ${item.reorder_level} hai). Turant distributor ko phone lagao!`;
        }
      } else if (qLower.includes('reorder') || qLower.includes('low') || qLower.includes('khatam') || qLower.includes('short')) {
        const lowItems = inventory.filter(i => i.stock_quantity <= i.reorder_level);
        generatedSql = `SELECT product_name, stock_quantity, reorder_level \nFROM inventory \nWHERE stock_quantity <= reorder_level \nORDER BY stock_quantity ASC;`;
        matchedResults = lowItems;
        botResponse = `Sethji, ye 3 items khatam hone ki kagaar par hain: **${lowItems.map(i => i.product_name.split('(')[0].trim()).join(', ')}**. Distributor order sheet ready kar doon?`;
      } else if (qLower.includes('tea') || qLower.includes('chai') || qLower.includes('red label')) {
        const item = inventory.find(i => i.product_name.toLowerCase().includes('tea'));
        generatedSql = `SELECT product_name, stock_quantity, unit_price_inr \nFROM inventory \nWHERE product_name ILIKE '%tea%';`;
        if (item) {
          matchedResults = [item];
          botResponse = `Red Label Tea ke sirf **${item.stock_quantity} packs** bache hain! Subah chai ke shaukeen customers aane wale hain, reorder karna padega.`;
        }
      } else {
        // Generic search match
        const matches = inventory.filter(i =>
          i.product_name.toLowerCase().includes(qLower) ||
          i.category.toLowerCase().includes(qLower)
        );
        generatedSql = `SELECT * FROM inventory \nWHERE product_name ILIKE '%${queryText.replace(/'/g, "''")}%' \nLIMIT 5;`;
        if (matches.length > 0) {
          matchedResults = matches;
          botResponse = `Yeh lijiye aapke inventory records: ${matches.length} item(s) mile hain dukaan ke register mein.`;
        } else {
          generatedSql = `SELECT * FROM inventory WHERE product_name ILIKE '%${queryText.replace(/'/g, "''")}%';`;
          botResponse = `Sethji, "${queryText}" ka entry nahi mila database mein. Ek baar naam check kijiye ya naya stock add kar lijiye.`;
        }
      }

      setChatMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'bot',
          text: botResponse,
          sql: generatedSql,
          results: matchedResults
        }
      ]);
      setIsProcessing(false);
    }, 600);
  };

  const filteredInventory = inventory.filter(item =>
    item.product_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Top Header / Branding Bar */}
      <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur sticky top-0 z-30 px-4 lg:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-amber-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/20 text-white font-black text-xl">
              🛒
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  Amit&apos;s Portfolio
                </span>
                <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                  <Check className="w-3 h-3" /> Cloned &amp; Updated
                </span>
              </div>
              <h1 className="text-base sm:text-lg font-bold text-white tracking-tight flex items-center gap-2 mt-0.5">
                ChotuAI — Dukaan ka AI Assistant
              </h1>
            </div>
          </div>

          {/* Social & Contact Actions */}
          <div className="flex items-center flex-wrap gap-2.5">
            <a
              href="https://www.linkedin.com/in/amitbn1390/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0A66C2] hover:bg-[#084e96] text-white text-xs font-medium transition shadow-sm"
            >
              <Linkedin className="w-3.5 h-3.5" />
              <span>Amit B N on LinkedIn</span>
              <ExternalLink className="w-3 h-3 opacity-80" />
            </a>

            <a
              href="https://github.com/PikDic/ChotuAI"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-medium transition"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub Repo</span>
            </a>

            <button
              onClick={handleCopyReadme}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-medium transition"
              title="Copy Updated README.md"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy README'}</span>
            </button>

            <button
              onClick={handleDownloadReadme}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium transition shadow-sm"
              title="Download README.md"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Tabs Navigation */}
      <div className="border-b border-slate-800 bg-slate-900/40 px-4 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center space-x-1 sm:space-x-2 overflow-x-auto py-2">
          <button
            onClick={() => setActiveTab('readme')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium transition whitespace-nowrap ${
              activeTab === 'readme'
                ? 'bg-indigo-600 text-white shadow'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Updated README.md</span>
          </button>

          <button
            onClick={() => setActiveTab('diff')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium transition whitespace-nowrap ${
              activeTab === 'diff'
                ? 'bg-indigo-600 text-white shadow'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <UserCheck className="w-4 h-4 text-emerald-400" />
            <span>Identity Updates &amp; Diff</span>
          </button>

          <button
            onClick={() => setActiveTab('assistant')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium transition whitespace-nowrap ${
              activeTab === 'assistant'
                ? 'bg-indigo-600 text-white shadow'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Live Chotu Assistant Simulator</span>
          </button>

          <button
            onClick={() => setActiveTab('inventory')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium transition whitespace-nowrap ${
              activeTab === 'inventory'
                ? 'bg-indigo-600 text-white shadow'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Database className="w-4 h-4 text-sky-400" />
            <span>Kirana Inventory DB (Postgres)</span>
          </button>

          <button
            onClick={() => setActiveTab('code')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium transition whitespace-nowrap ${
              activeTab === 'code'
                ? 'bg-indigo-600 text-white shadow'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <FolderTree className="w-4 h-4 text-purple-400" />
            <span>Cloned Repo Architecture</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-4 lg:p-8">
        {/* TAB 1: UPDATED README VIEW */}
        {activeTab === 'readme' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left 2 Cols: Formatted Documentation */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

                {/* Hero section */}
                <div className="border-b border-slate-800 pb-6 mb-6">
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-blue-500/20 text-blue-300 text-xs font-semibold border border-blue-500/30">
                      Portfolio: Amit&apos;s Portfolio
                    </span>
                    <a
                      href="https://www.linkedin.com/in/amitbn1390/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#0A66C2]/20 text-sky-300 text-xs font-semibold border border-[#0A66C2]/40 hover:bg-[#0A66C2]/30 transition"
                    >
                      <Linkedin className="w-3 h-3" /> LinkedIn: Amit B N
                    </a>
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-amber-500/20 text-amber-300 text-xs font-semibold border border-amber-500/30">
                      MIT License
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-3">
                    🛒 Amit&apos;s Portfolio | ChotuAI — Dukaan ka AI Assistant
                  </h2>
                  <p className="mt-3 text-base text-slate-300 leading-relaxed font-medium">
                    Built by <strong className="text-white">Amit B N</strong> (aka the guy who thought kirana shops deserve their own Jarvis).
                  </p>
                  <p className="text-sm text-slate-400 mt-1">
                    Featured in <strong className="text-indigo-300 font-semibold">Amit&apos;s Portfolio</strong> — practical AI innovations built for real-world everyday problems.
                  </p>
                </div>

                {/* Section: What is ChotuAI? */}
                <div className="space-y-4 mb-8">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    🤖 What is ChotuAI?
                  </h3>
                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                    Think of it as your shop’s <em className="text-amber-300 font-medium">chhota dost</em> who:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-3.5 flex items-start gap-3">
                      <span className="text-xl">💬</span>
                      <div>
                        <div className="font-semibold text-slate-200 text-sm">Hinglish Natural Speech</div>
                        <div className="text-xs text-slate-400">Answers inventory questions in plain Hinglish</div>
                      </div>
                    </div>
                    <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-3.5 flex items-start gap-3">
                      <span className="text-xl">📦</span>
                      <div>
                        <div className="font-semibold text-slate-200 text-sm">Real-time Stock Count</div>
                        <div className="text-xs text-slate-400">Tells you what’s left in stock in milliseconds</div>
                      </div>
                    </div>
                    <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-3.5 flex items-start gap-3">
                      <span className="text-xl">📉</span>
                      <div>
                        <div className="font-semibold text-slate-200 text-sm">Smart Reorders</div>
                        <div className="text-xs text-slate-400">Suggests reorders before items run out</div>
                      </div>
                    </div>
                    <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-3.5 flex items-start gap-3">
                      <span className="text-xl">🔌</span>
                      <div>
                        <div className="font-semibold text-slate-200 text-sm">Works 100% Offline</div>
                        <div className="text-xs text-slate-400">Because WiFi ka bharosa nahi</div>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-200 text-xs flex items-center gap-2">
                    <span>🤪</span>
                    <span>Cracks witty jokes when you&apos;re bored between afternoon footfalls.</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-400 italic pt-1">
                    No dashboards, no enterprise nonsense, no ₹2999 setup fee. Bas ek laptop, thoda RAM, aur Chotu.
                  </p>
                </div>

                {/* Section: Why? */}
                <div className="space-y-3 mb-8 border-t border-slate-800 pt-6">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    ⚡ Why?
                  </h3>
                  <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4 space-y-1.5 text-sm text-slate-300 font-mono">
                    <p className="text-rose-400">• Because Excel feels like torture,</p>
                    <p className="text-rose-400">• Billing apps feel like scams,</p>
                    <p className="text-emerald-400">• And shopkeepers just need something simple that talks back.</p>
                  </div>
                </div>

                {/* Section: Tech Chutney */}
                <div className="space-y-4 mb-8 border-t border-slate-800 pt-6">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    🛠️ Tech Chutney
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700/50">
                      <div className="text-xs font-semibold text-indigo-400 uppercase tracking-wider mb-1">🖥️ Frontend</div>
                      <div className="text-sm font-medium text-slate-200">Electron + Node.js</div>
                      <div className="text-xs text-slate-400 mt-0.5">Desktop packaging with fast Tailwind CSS interface</div>
                    </div>
                    <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700/50">
                      <div className="text-xs font-semibold text-purple-400 uppercase tracking-wider mb-1">🧠 Backend</div>
                      <div className="text-sm font-medium text-slate-200">Python FastAPI + Llama 3.2</div>
                      <div className="text-xs text-slate-400 mt-0.5">Local LLM inference via llama-cpp-python</div>
                    </div>
                    <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700/50">
                      <div className="text-xs font-semibold text-sky-400 uppercase tracking-wider mb-1">🗄️ Database</div>
                      <div className="text-sm font-medium text-slate-200">PostgreSQL</div>
                      <div className="text-xs text-slate-400 mt-0.5">Dukaandari relational schema with automatic SQL queries</div>
                    </div>
                    <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700/50">
                      <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1">🧪 Prototyping</div>
                      <div className="text-sm font-medium text-slate-200">Streamlit &amp; Batch Tests</div>
                      <div className="text-xs text-slate-400 mt-0.5">Rapid UI tests and prompt evaluation suite</div>
                    </div>
                  </div>
                </div>

                {/* Section: Future */}
                <div className="space-y-3 mb-8 border-t border-slate-800 pt-6">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    🚀 Future (if Amit doesn’t get lazy)
                  </h3>
                  <ul className="space-y-2 text-sm text-slate-300">
                    <li className="flex items-center gap-2">
                      <span className="text-base">🎙️</span> Voice commands in Hindi &amp; regional dialects
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-base">📑</span> CSV &amp; photo upload for pen-paper logbooks
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-base">📊</span> Cute charts for sales &amp; fast-moving items
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-base">📱</span> Maybe even an app for Android
                    </li>
                  </ul>
                </div>

                {/* Section: Note from Amit */}
                <div className="mb-8 border-t border-slate-800 pt-6">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-3">
                    ❤️ Note from Amit B N
                  </h3>
                  <div className="p-4 rounded-xl bg-gradient-to-r from-rose-500/10 via-amber-500/10 to-indigo-500/10 border border-rose-500/20 text-slate-200 text-sm leading-relaxed">
                    <p className="font-medium text-slate-100">Not trying to build a unicorn 🦄</p>
                    <p className="mt-1 text-slate-300">Just trying to build something that even a kirana shop owner in Odisha can actually <em>use</em>.</p>
                  </div>
                </div>

                {/* Section: Connect with Amit B N */}
                <div className="border-t border-slate-800 pt-6">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-3">
                    👨‍💻 Connect with Amit B N
                  </h3>
                  <p className="text-sm text-slate-400 mb-4">
                    Explore more creations and get in touch via <strong className="text-indigo-300 font-semibold">Amit&apos;s Portfolio</strong>:
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <a
                      href="https://www.linkedin.com/in/amitbn1390/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3.5 rounded-xl bg-[#0A66C2]/15 border border-[#0A66C2]/40 hover:bg-[#0A66C2]/25 transition flex items-center gap-3 text-white flex-1"
                    >
                      <div className="p-2 bg-[#0A66C2] rounded-lg text-white">
                        <Linkedin className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-xs text-sky-300 font-semibold">LinkedIn Profile</div>
                        <div className="text-sm font-bold text-white">linkedin.com/in/amitbn1390</div>
                      </div>
                    </a>

                    <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-center gap-3 flex-1">
                      <div className="p-2 bg-indigo-600 rounded-lg text-white">
                        <Layers className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-xs text-indigo-300 font-semibold">Portfolio Branding</div>
                        <div className="text-sm font-bold text-white">Amit&apos;s Portfolio</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Raw Markdown and Metadata Info */}
            <div className="space-y-6">
              {/* Quick Actions Card */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-bold text-white text-sm flex items-center gap-2">
                    <FileText className="w-4 h-4 text-indigo-400" />
                    README.md Source Code
                  </h4>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleCopyReadme}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs flex items-center gap-1 transition"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? 'Copied' : 'Copy'}</span>
                    </button>
                    <button
                      onClick={handleDownloadReadme}
                      className="p-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs flex items-center gap-1 transition"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Save</span>
                    </button>
                  </div>
                </div>
                <div className="relative">
                  <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 text-xs text-slate-300 font-mono overflow-auto max-h-[500px] leading-relaxed whitespace-pre-wrap select-all">
                    {RAW_README_CONTENT}
                  </pre>
                </div>
              </div>

              {/* Verified Checklist */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-3">
                <h4 className="font-bold text-white text-sm flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  Documentation Standards Met
                </h4>
                <div className="space-y-2 text-xs">
                  <div className="flex items-start gap-2 text-slate-300">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Real name <strong>Amit B N</strong> added replacing alias Pratik.</span>
                  </div>
                  <div className="flex items-start gap-2 text-slate-300">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>LinkedIn <strong>https://www.linkedin.com/in/amitbn1390/</strong> linked with badges and contact section.</span>
                  </div>
                  <div className="flex items-start gap-2 text-slate-300">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Every &quot;PicDic&quot; / &quot;PikDic&quot; updated to <strong>Amit&apos;s Portfolio</strong> in headers and descriptions.</span>
                  </div>
                  <div className="flex items-start gap-2 text-slate-300">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Existing conversational Hinglish style, emojis, and humor fully preserved.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: IDENTITY UPDATES & DIFF */}
        {activeTab === 'diff' && (
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <UserCheck className="w-5 h-5 text-emerald-400" />
                    Summary of Identity &amp; Branding Changes
                  </h3>
                  <p className="text-sm text-slate-400 mt-1">
                    Accurate diff comparing original repository metadata with updated presentation standards.
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 text-xs font-semibold">
                  100% In Sync
                </span>
              </div>

              {/* Comparison Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="p-5 rounded-xl bg-rose-950/20 border border-rose-900/40 space-y-3">
                  <div className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-rose-500"></span> Previous Alias &amp; Handle
                  </div>
                  <div className="space-y-2 text-sm text-slate-300 font-mono">
                    <div className="p-2.5 rounded bg-rose-950/50 border border-rose-900/50">
                      <span className="text-xs text-rose-400 block font-sans">Author Alias:</span>
                      &quot;Pratik&quot; / &quot;pasta&quot;
                    </div>
                    <div className="p-2.5 rounded bg-rose-950/50 border border-rose-900/50">
                      <span className="text-xs text-rose-400 block font-sans">Brand / Title Handle:</span>
                      &quot;PicDic&quot; / &quot;PikDic&quot;
                    </div>
                    <div className="p-2.5 rounded bg-rose-950/50 border border-rose-900/50">
                      <span className="text-xs text-rose-400 block font-sans">Social Profiles:</span>
                      Missing LinkedIn ID link
                    </div>
                    <div className="p-2.5 rounded bg-rose-950/50 border border-rose-900/50">
                      <span className="text-xs text-rose-400 block font-sans">Badges &amp; Presentation:</span>
                      Plain text header, no shields badges
                    </div>
                  </div>
                </div>

                <div className="p-5 rounded-xl bg-emerald-950/20 border border-emerald-900/40 space-y-3">
                  <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Updated Presentation (Current)
                  </div>
                  <div className="space-y-2 text-sm text-slate-300 font-mono">
                    <div className="p-2.5 rounded bg-emerald-950/50 border border-emerald-900/50">
                      <span className="text-xs text-emerald-400 block font-sans">Real Author Name:</span>
                      <strong className="text-emerald-300">&quot;Amit B N&quot;</strong>
                    </div>
                    <div className="p-2.5 rounded bg-emerald-950/50 border border-emerald-900/50">
                      <span className="text-xs text-emerald-400 block font-sans">Brand / Portfolio Rebrand:</span>
                      <strong className="text-emerald-300">&quot;Amit&apos;s Portfolio&quot;</strong> (all headers &amp; descriptions)
                    </div>
                    <div className="p-2.5 rounded bg-emerald-950/50 border border-emerald-900/50">
                      <span className="text-xs text-emerald-400 block font-sans">LinkedIn Integration:</span>
                      <a href="https://www.linkedin.com/in/amitbn1390/" target="_blank" rel="noopener noreferrer" className="text-sky-300 underline font-sans text-xs">
                        https://www.linkedin.com/in/amitbn1390/
                      </a>
                    </div>
                    <div className="p-2.5 rounded bg-emerald-950/50 border border-emerald-900/50">
                      <span className="text-xs text-emerald-400 block font-sans">Professional Presentation:</span>
                      Portfolio, LinkedIn &amp; MIT License badges + Connect section
                    </div>
                  </div>
                </div>
              </div>

              {/* Side by side diff snippet */}
              <div className="mt-6 border-t border-slate-800 pt-6">
                <h4 className="text-sm font-semibold text-white mb-3">Line-by-Line README Diff:</h4>
                <div className="bg-slate-950 rounded-xl border border-slate-800 p-4 font-mono text-xs overflow-x-auto space-y-1">
                  <div className="text-rose-400 bg-rose-950/30 px-2 py-1 rounded">
                    - # 🛒 ChotuAI — Dukaan ka AI Assistant
                  </div>
                  <div className="text-emerald-400 bg-emerald-950/30 px-2 py-1 rounded">
                    + # 🛒 Amit&apos;s Portfolio | ChotuAI — Dukaan ka AI Assistant
                  </div>
                  <div className="text-emerald-400 bg-emerald-950/30 px-2 py-1 rounded">
                    + [![Portfolio](https://img.shields.io/badge/Portfolio-Amit&apos;s%20Portfolio-blue?style=flat-square)](https://www.linkedin.com/in/amitbn1390/)
                  </div>
                  <div className="text-emerald-400 bg-emerald-950/30 px-2 py-1 rounded">
                    + [![LinkedIn](https://img.shields.io/badge/LinkedIn-Amit%20B%20N-0A66C2?style=flat-square&logo=linkedin)](https://www.linkedin.com/in/amitbn1390/)
                  </div>
                  <div className="text-rose-400 bg-rose-950/30 px-2 py-1 rounded">
                    - **Built by Pratik (aka the guy who thought kirana shops deserve their own Jarvis).**
                  </div>
                  <div className="text-emerald-400 bg-emerald-950/30 px-2 py-1 rounded">
                    + **Built by Amit B N (aka the guy who thought kirana shops deserve their own Jarvis).**
                  </div>
                  <div className="text-emerald-400 bg-emerald-950/30 px-2 py-1 rounded">
                    + Featured in **Amit&apos;s Portfolio** — practical AI innovations built for real-world everyday problems.
                  </div>
                  <div className="text-rose-400 bg-rose-950/30 px-2 py-1 rounded">
                    - ## 🚀 Future (if Pratik doesn’t get lazy)
                  </div>
                  <div className="text-emerald-400 bg-emerald-950/30 px-2 py-1 rounded">
                    + ## 🚀 Future (if Amit doesn’t get lazy)
                  </div>
                  <div className="text-rose-400 bg-rose-950/30 px-2 py-1 rounded">
                    - ## ❤️ Note from Pratik
                  </div>
                  <div className="text-emerald-400 bg-emerald-950/30 px-2 py-1 rounded">
                    + ## ❤️ Note from Amit B N
                  </div>
                  <div className="text-emerald-400 bg-emerald-950/30 px-2 py-1 rounded">
                    + ## 👨‍💻 Connect with Amit B N [LinkedIn: https://www.linkedin.com/in/amitbn1390/]
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: LIVE CHOTU ASSISTANT SIMULATOR */}
        {activeTab === 'assistant' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Chat Conversation Window */}
            <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col h-[650px] shadow-xl overflow-hidden">
              {/* Header */}
              <div className="p-4 border-b border-slate-800 bg-slate-900/80 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center font-bold">
                    🤖
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-sm flex items-center gap-2">
                      ChotuAI Assistant Engine
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    </h3>
                    <p className="text-xs text-slate-400">Offline Llama 3.2 + PostgreSQL NL-to-SQL Pipeline</p>
                  </div>
                </div>
                <div className="text-xs text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-full border border-indigo-500/20 font-medium">
                  Amit&apos;s Portfolio
                </div>
              </div>

              {/* Message List */}
              <div className="flex-1 p-4 overflow-y-auto space-y-4">
                {chatMessages.map(msg => (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
                  >
                    <div className="text-xs text-slate-500 mb-1 px-1">
                      {msg.role === 'user' ? 'You (Shopkeeper)' : 'Chotu AI (Assistant)'}
                    </div>
                    <div
                      className={`max-w-[85%] rounded-2xl p-4 text-sm leading-relaxed ${
                        msg.role === 'user'
                          ? 'bg-indigo-600 text-white rounded-tr-none'
                          : 'bg-slate-800/80 border border-slate-700/60 text-slate-100 rounded-tl-none space-y-3'
                      }`}
                    >
                      <div className="whitespace-pre-wrap">{msg.text}</div>

                      {msg.sql && (
                        <div className="mt-2 pt-2 border-t border-slate-700/50">
                          <div className="text-xs font-semibold text-amber-400 mb-1 flex items-center gap-1 font-mono">
                            <Terminal className="w-3.5 h-3.5" /> Generated SQL Query:
                          </div>
                          <pre className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs text-sky-300 overflow-x-auto whitespace-pre-wrap">
                            {msg.sql}
                          </pre>
                        </div>
                      )}

                      {msg.results && msg.results.length > 0 && (
                        <div className="mt-2 pt-2 border-t border-slate-700/50">
                          <div className="text-xs font-semibold text-emerald-400 mb-1.5 flex items-center gap-1">
                            <Database className="w-3.5 h-3.5" /> Database Result:
                          </div>
                          <div className="overflow-x-auto rounded-lg border border-slate-700 bg-slate-950/60">
                            <table className="w-full text-xs text-left">
                              <thead className="bg-slate-900 text-slate-400 uppercase text-[10px]">
                                <tr>
                                  <th className="px-3 py-1.5">Product</th>
                                  <th className="px-3 py-1.5">Stock</th>
                                  <th className="px-3 py-1.5">Reorder Level</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-800">
                                {msg.results.map((r, idx) => (
                                  <tr key={idx} className="hover:bg-slate-900/50">
                                    <td className="px-3 py-1.5 font-medium text-slate-200">{r.product_name}</td>
                                    <td className="px-3 py-1.5">
                                      <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                                        r.stock_quantity <= r.reorder_level ? 'bg-rose-500/20 text-rose-300' : 'bg-emerald-500/20 text-emerald-300'
                                      }`}>
                                        {r.stock_quantity} {r.unit}
                                      </span>
                                    </td>
                                    <td className="px-3 py-1.5 text-slate-400">{r.reorder_level}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {isProcessing && (
                  <div className="flex items-center gap-2 text-xs text-indigo-400 p-2">
                    <div className="w-2 h-2 rounded-full bg-indigo-500 animate-ping"></div>
                    Chotu is thinking and generating SQL...
                  </div>
                )}
              </div>

              {/* Chat Input Bar */}
              <div className="p-3 border-t border-slate-800 bg-slate-900/90">
                <form
                  onSubmit={e => {
                    e.preventDefault();
                    executeSimulatedQuery(userQuery);
                  }}
                  className="flex gap-2"
                >
                  <input
                    type="text"
                    value={userQuery}
                    onChange={e => setUserQuery(e.target.value)}
                    placeholder="Ask something like: How many packets of Maggi are left? or Parle-G ka stock batao..."
                    className="flex-1 bg-slate-950 border border-slate-700/80 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  />
                  <button
                    type="submit"
                    disabled={!userQuery.trim() || isProcessing}
                    className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-medium px-5 py-2.5 rounded-xl text-sm transition flex items-center gap-1.5 shadow-sm"
                  >
                    <span>Ask</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </div>

            {/* Right Column: Pre-baked Prompt Chips & Architecture */}
            <div className="space-y-4">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg">
                <h4 className="font-bold text-white text-sm flex items-center gap-2 mb-3">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  Try Sample Kirana Questions
                </h4>
                <p className="text-xs text-slate-400 mb-3">
                  Click any question to see how ChotuAI translates Hinglish queries into PostgreSQL statements:
                </p>
                <div className="space-y-2">
                  {[
                    'How many packets of Maggi are left?',
                    'Parle-G ka stock batao',
                    'What items are low in stock and need reorder?',
                    'Mustard Oil kitna bacha hai?',
                    'Red Label Tea stock check karo',
                    'Chotu, bore ho raha hoon koi joke sunao'
                  ].map((chip, idx) => (
                    <button
                      key={idx}
                      onClick={() => executeSimulatedQuery(chip)}
                      className="w-full text-left p-2.5 rounded-xl bg-slate-800/60 hover:bg-indigo-600/20 hover:border-indigo-500/40 border border-slate-700/60 text-xs text-slate-200 transition flex items-center justify-between group"
                    >
                      <span>{chip}</span>
                      <ArrowRight className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 transition text-indigo-400" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-3">
                <h4 className="font-bold text-white text-sm flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-indigo-400" />
                  How ChotuAI Works Under the Hood
                </h4>
                <div className="space-y-2.5 text-xs text-slate-300">
                  <div className="flex gap-2">
                    <span className="font-bold text-indigo-400">1.</span>
                    <span>Shopkeeper speaks or types in everyday colloquial Hinglish.</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-bold text-indigo-400">2.</span>
                    <span>FastAPI local backend prompts Llama 3.2 with the PostgreSQL schema.</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-bold text-indigo-400">3.</span>
                    <span>Safe parameterized SQL runs on local PostgreSQL without cloud dependencies.</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-bold text-indigo-400">4.</span>
                    <span>Electron UI renders clean data tables and Hinglish friendly answers.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: KIRANA INVENTORY DB */}
        {activeTab === 'inventory' && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Database className="w-5 h-5 text-sky-400" />
                  PostgreSQL Kirana Inventory Table (`inventory_db`)
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Relational table schema queried by ChotuAI backend (`backend/test_db.py`).
                </p>
              </div>

              {/* Search Bar */}
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="Filter inventory products..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            {/* Inventory Table */}
            <div className="overflow-x-auto rounded-xl border border-slate-800">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-950 text-slate-400 text-xs uppercase font-semibold">
                  <tr>
                    <th className="px-4 py-3">ID</th>
                    <th className="px-4 py-3">Product Name</th>
                    <th className="px-4 py-3">Category</th>
                    <th className="px-4 py-3">Stock Quantity</th>
                    <th className="px-4 py-3">Price (₹)</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Last Sync</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80 bg-slate-900/60">
                  {filteredInventory.map(item => {
                    const isLow = item.stock_quantity <= item.reorder_level;
                    return (
                      <tr key={item.id} className="hover:bg-slate-800/40 transition">
                        <td className="px-4 py-3 text-xs text-slate-500 font-mono">#{item.id}</td>
                        <td className="px-4 py-3 font-semibold text-slate-200">{item.product_name}</td>
                        <td className="px-4 py-3 text-xs text-slate-400">
                          <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                            {item.category}
                          </span>
                        </td>
                        <td className="px-4 py-3 font-bold text-slate-200">
                          {item.stock_quantity} {item.unit}
                        </td>
                        <td className="px-4 py-3 font-mono text-emerald-400">₹{item.unit_price_inr}</td>
                        <td className="px-4 py-3">
                          {isLow ? (
                            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                              ⚠️ Reorder Needed
                            </span>
                          ) : (
                            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                              ✅ In Stock
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-xs text-slate-500">{item.last_updated}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 5: CLONED REPO ARCHITECTURE */}
        {activeTab === 'code' && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <FolderTree className="w-5 h-5 text-purple-400" />
                Cloned Repository Architecture (`ChotuAI`)
              </h3>
              <p className="text-sm text-slate-400 mt-1">
                Repository successfully cloned from <code>https://github.com/PikDic/ChotuAI.git</code> and updated under <strong>Amit&apos;s Portfolio</strong>.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-indigo-400 font-semibold text-sm">
                  <Code2 className="w-4 h-4" />
                  <span>main.js</span>
                </div>
                <p className="text-xs text-slate-400">
                  Electron desktop application lifecycle manager. Spawns FastAPI backend subprocess on port 8000 and creates BrowserWindow (980x720).
                </p>
                <div className="text-[11px] font-mono text-slate-500">Electron 28.0.0</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
                  <Terminal className="w-4 h-4" />
                  <span>backend/</span>
                </div>
                <p className="text-xs text-slate-400">
                  Contains <code>requirements.txt</code> (fastapi, uvicorn, pydantic, llama-cpp-python, psycopg2-binary), <code>run_backend.bat</code>, and <code>test_db.py</code>.
                </p>
                <div className="text-[11px] font-mono text-slate-500">Python 3.10+ / Llama 3.2</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-sky-400 font-semibold text-sm">
                  <ShoppingBag className="w-4 h-4" />
                  <span>frontend/</span>
                </div>
                <p className="text-xs text-slate-400">
                  Contains <code>src/index.html</code>, <code>src/script.js</code> (query caller &amp; table formatter), and <code>src/style.css</code> with Tailwind CDN.
                </p>
                <div className="text-[11px] font-mono text-slate-500">HTML5 / Vanilla JS / Tailwind</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm">
                  <FileText className="w-4 h-4" />
                  <span>README.md / README.MD</span>
                </div>
                <p className="text-xs text-slate-400">
                  Updated with real name <strong>Amit B N</strong>, LinkedIn URL, Amit&apos;s Portfolio branding, and preserved Hinglish humor.
                </p>
                <div className="text-[11px] font-mono text-slate-500">Markdown / Badges</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-rose-400 font-semibold text-sm">
                  <GitCommit className="w-4 h-4" />
                  <span>LICENSE</span>
                </div>
                <p className="text-xs text-slate-400">
                  Updated MIT License attribution from alias to <strong>Amit B N</strong> (2025).
                </p>
                <div className="text-[11px] font-mono text-slate-500">MIT Open Source</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-blue-400 font-semibold text-sm">
                  <Linkedin className="w-4 h-4" />
                  <span>Author Contact</span>
                </div>
                <p className="text-xs text-slate-400">
                  Direct LinkedIn profile integration:
                </p>
                <a
                  href="https://www.linkedin.com/in/amitbn1390/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-sky-400 hover:underline block truncate font-mono"
                >
                  https://www.linkedin.com/in/amitbn1390/
                </a>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-900/60 py-6 px-4 lg:px-8 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © 2025 <strong className="text-slate-300">Amit B N</strong>. Part of <strong className="text-indigo-400">Amit&apos;s Portfolio</strong>.
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://www.linkedin.com/in/amitbn1390/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky-400 hover:text-sky-300 flex items-center gap-1 transition"
            >
              <Linkedin className="w-3.5 h-3.5" /> LinkedIn: amitbn1390
            </a>
            <a
              href="https://github.com/PikDic/ChotuAI"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-slate-200 flex items-center gap-1 transition"
            >
              <Github className="w-3.5 h-3.5" /> ChotuAI Repository
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
