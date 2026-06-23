import React, { useState, useEffect, useRef } from 'react';
import { Home, List, Library, Bookmark, Users, ArrowRight, Copy, BookmarkMinus, PlusCircle, Trash2, LogOut, Loader2, Check, BookOpenText, ChevronLeft, ChevronRight, Search, ShieldAlert, Flag, Send, Reply, X, User as UserIcon, BookOpen, Trophy, PlayCircle, PauseCircle, StopCircle, MapPin, BarChart3, Globe2 } from 'lucide-react';

// --- البيانات الأساسية والميتا ---
const SURAHS_META = [
  { number: 1, name: "الفاتحة", type: "مكية", ayahs: 7 }, { number: 2, name: "البقرة", type: "مدنية", ayahs: 286 },
  { number: 3, name: "آل عمران", type: "مدنية", ayahs: 200 }, { number: 4, name: "النساء", type: "مدنية", ayahs: 176 },
  { number: 5, name: "المائدة", type: "مدنية", ayahs: 120 }, { number: 6, name: "الأنعام", type: "مكية", ayahs: 165 },
  { number: 7, name: "الأعراف", type: "مكية", ayahs: 206 }, { number: 8, name: "الأنفال", type: "مدنية", ayahs: 75 },
  { number: 9, name: "التوبة", type: "مدنية", ayahs: 129 }, { number: 10, name: "يونس", type: "مكية", ayahs: 109 },
  { number: 11, name: "هود", type: "مكية", ayahs: 123 }, { number: 12, name: "يوسف", type: "مكية", ayahs: 111 },
  { number: 13, name: "الرعد", type: "مدنية", ayahs: 43 }, { number: 14, name: "إبراهيم", type: "مكية", ayahs: 52 },
  { number: 15, name: "الحجر", type: "مكية", ayahs: 99 }, { number: 16, name: "النحل", type: "مكية", ayahs: 128 },
  { number: 17, name: "الإسراء", type: "مكية", ayahs: 111 }, { number: 18, name: "الكهف", type: "مكية", ayahs: 110 },
  { number: 19, name: "مريم", type: "مكية", ayahs: 98 }, { number: 20, name: "طه", type: "مكية", ayahs: 135 },
  { number: 21, name: "الأنبياء", type: "مكية", ayahs: 112 }, { number: 22, name: "الحج", type: "مدنية", ayahs: 78 },
  { number: 23, name: "المؤمنون", type: "مكية", ayahs: 118 }, { number: 24, name: "النور", type: "مدنية", ayahs: 64 },
  { number: 25, name: "الفرقان", type: "مكية", ayahs: 77 }, { number: 26, name: "الشعراء", type: "مكية", ayahs: 227 },
  { number: 27, name: "النمل", type: "مكية", ayahs: 93 }, { number: 28, name: "القصص", type: "مكية", ayahs: 88 },
  { number: 29, name: "العنكبوت", type: "مكية", ayahs: 69 }, { number: 30, name: "الروم", type: "مكية", ayahs: 60 },
  { number: 31, name: "لقمان", type: "مكية", ayahs: 34 }, { number: 32, name: "السجدة", type: "مكية", ayahs: 30 },
  { number: 33, name: "الأحزاب", type: "مدنية", ayahs: 73 }, { number: 34, name: "سبأ", type: "مكية", ayahs: 54 },
  { number: 35, name: "فاطر", type: "مكية", ayahs: 45 }, { number: 36, name: "يس", type: "مكية", ayahs: 83 },
  { number: 37, name: "الصافات", type: "مكية", ayahs: 182 }, { number: 38, name: "ص", type: "مكية", ayahs: 88 },
  { number: 39, name: "الزمر", type: "مكية", ayahs: 75 }, { number: 40, name: "غافر", type: "مكية", ayahs: 85 },
  { number: 41, name: "فصلت", type: "مكية", ayahs: 54 }, { number: 42, name: "الشورى", type: "مكية", ayahs: 53 },
  { number: 43, name: "الزخرف", type: "مكية", ayahs: 89 }, { number: 44, name: "الدخان", type: "مكية", ayahs: 59 },
  { number: 45, name: "الجاثية", type: "مكية", ayahs: 37 }, { number: 46, name: "الأحقاف", type: "مكية", ayahs: 35 },
  { number: 47, name: "محمد", type: "مدنية", ayahs: 38 }, { number: 48, name: "الفتح", type: "مدنية", ayahs: 29 },
  { number: 49, name: "الحجرات", type: "مدنية", ayahs: 18 }, { number: 50, name: "ق", type: "مكية", ayahs: 45 },
  { number: 51, name: "الذاريات", type: "مكية", ayahs: 60 }, { number: 52, name: "الطور", type: "مكية", ayahs: 49 },
  { number: 53, name: "النجم", type: "مكية", ayahs: 62 }, { number: 54, name: "القمر", type: "مكية", ayahs: 55 },
  { number: 55, name: "الرحمن", type: "مدنية", ayahs: 78 }, { number: 56, name: "الواقعة", type: "مكية", ayahs: 96 },
  { number: 57, name: "الحديد", type: "مدنية", ayahs: 29 }, { number: 58, name: "المجادلة", type: "مدنية", ayahs: 22 },
  { number: 59, name: "الحشر", type: "مدنية", ayahs: 24 }, { number: 60, name: "الممتحنة", type: "مدنية", ayahs: 13 },
  { number: 61, name: "الصف", type: "مدنية", ayahs: 14 }, { number: 62, name: "الجمعة", type: "مدنية", ayahs: 11 },
  { number: 63, name: "المنافقون", type: "مدنية", ayahs: 11 }, { number: 64, name: "التغابن", type: "مدنية", ayahs: 18 },
  { number: 65, name: "الطلاق", type: "مدنية", ayahs: 12 }, { number: 66, name: "التحريم", type: "مدنية", ayahs: 12 },
  { number: 67, name: "الملك", type: "مكية", ayahs: 30 }, { number: 68, name: "القلم", type: "مكية", ayahs: 52 },
  { number: 69, name: "الحاقة", type: "مكية", ayahs: 52 }, { number: 70, name: "المعارج", type: "مكية", ayahs: 44 },
  { number: 71, name: "نوح", type: "مكية", ayahs: 28 }, { number: 72, name: "الجن", type: "مكية", ayahs: 28 },
  { number: 73, name: "المزمل", type: "مكية", ayahs: 20 }, { number: 74, name: "المدثر", type: "مكية", ayahs: 56 },
  { number: 75, name: "القيامة", type: "مكية", ayahs: 40 }, { number: 76, name: "الإنسان", type: "مدنية", ayahs: 31 },
  { number: 77, name: "المرسلات", type: "مكية", ayahs: 50 }, { number: 78, name: "النبأ", type: "مكية", ayahs: 40 },
  { number: 79, name: "النازعات", type: "مكية", ayahs: 46 }, { number: 80, name: "عبس", type: "مكية", ayahs: 42 },
  { number: 81, name: "التكوير", type: "مكية", ayahs: 29 }, { number: 82, name: "الانفطار", type: "مكية", ayahs: 19 },
  { number: 83, name: "المطففين", type: "مكية", ayahs: 36 }, { number: 84, name: "الانشقاق", type: "مكية", ayahs: 25 },
  { number: 85, name: "البروج", type: "مكية", ayahs: 22 }, { number: 86, name: "الطارق", type: "مكية", ayahs: 17 },
  { number: 87, name: "الأعلى", type: "مكية", ayahs: 19 }, { number: 88, name: "الغاشية", type: "مكية", ayahs: 26 },
  { number: 89, name: "الفجر", type: "مكية", ayahs: 30 }, { number: 90, name: "البلد", type: "مكية", ayahs: 20 },
  { number: 91, name: "الشمس", type: "مكية", ayahs: 15 }, { number: 92, name: "الليل", type: "مكية", ayahs: 21 },
  { number: 93, name: "الضحى", type: "مكية", ayahs: 11 }, { number: 94, name: "الشرح", type: "مكية", ayahs: 8 },
  { number: 95, name: "التين", type: "مكية", ayahs: 8 }, { number: 96, name: "العلق", type: "مكية", ayahs: 19 },
  { number: 97, name: "القدر", type: "مكية", ayahs: 5 }, { number: 98, name: "البينة", type: "مدنية", ayahs: 8 },
  { number: 99, name: "الزلزلة", type: "مدنية", ayahs: 8 }, { number: 100, name: "العاديات", type: "مكية", ayahs: 11 },
  { number: 101, name: "القارعة", type: "مكية", ayahs: 11 }, { number: 102, name: "التكاثر", type: "مكية", ayahs: 8 },
  { number: 103, name: "العصر", type: "مكية", ayahs: 3 }, { number: 104, name: "الهمزة", type: "مكية", ayahs: 9 },
  { number: 105, name: "الفيل", type: "مكية", ayahs: 5 }, { number: 106, name: "قريش", type: "مكية", ayahs: 4 },
  { number: 107, name: "الماعون", type: "مكية", ayahs: 7 }, { number: 108, name: "الكوثر", type: "مكية", ayahs: 3 },
  { number: 109, name: "الكافرون", type: "مكية", ayahs: 6 }, { number: 110, name: "النصر", type: "مدنية", ayahs: 3 },
  { number: 111, name: "المسد", type: "مكية", ayahs: 5 }, { number: 112, name: "الإخلاص", type: "مكية", ayahs: 4 },
  { number: 113, name: "الفلق", type: "مكية", ayahs: 5 }, { number: 114, name: "الناس", type: "مكية", ayahs: 6 }
];

const TAFSIR_BOOKS = [
  { id: "sabouni", title: "صفوة التفاسير", author: "الشيخ محمد علي الصابوني" },
  { id: "razi", title: "التفسير الكبير", author: "الإمام فخر الدين الرازي" },
  { id: "nasafi", title: "مدارك التنزيل وحقائق التأويل", author: "الإمام حافظ الدين النسفي" },
  { id: "qurtubi", title: "الجامع لأحكام القرآن", author: "الإمام شمس الدين القرطبي" }
];

// --- قائمة الدول الموسعة ---
const LOCATIONS_LIST = [
  'سوريا', 'السعودية', 'الإمارات', 'مصر', 'الأردن', 'فلسطين', 'لبنان', 'العراق', 
  'المغرب', 'الجزائر', 'تونس', 'ليبيا', 'السودان', 'اليمن', 'سلطنة عمان', 'قطر', 
  'البحرين', 'الكويت', 'موريتانيا', 'الصومال', 'جيبوتي', 
  'تركيا', 'ألمانيا', 'السويد', 'إيطاليا', 'إنكلترا', 'الدنمارك', 'أخرى'
];

// إحداثيات معدلة ومتباعدة لمنع التداخل على خريطة أبعادها 1200x600 (X: left, Y: top)
const COUNTRY_COORDS = {
  'سوريا': { left: '57%', top: '35%' },
  'السعودية': { left: '59%', top: '44%' },
  'الإمارات': { left: '62.5%', top: '42%' },
  'مصر': { left: '54%', top: '42%' },
  'الأردن': { left: '57%', top: '39%' },
  'فلسطين': { left: '55%', top: '38.5%' },
  'لبنان': { left: '55.5%', top: '36.5%' },
  'العراق': { left: '59.5%', top: '36%' },
  'المغرب': { left: '46%', top: '38%' },
  'الجزائر': { left: '48.5%', top: '39%' },
  'تونس': { left: '51%', top: '36%' },
  'ليبيا': { left: '52.5%', top: '40%' },
  'السودان': { left: '56%', top: '49%' },
  'اليمن': { left: '59%', top: '49%' },
  'سلطنة عمان': { left: '62%', top: '45%' },
  'قطر': { left: '61.5%', top: '43.5%' },
  'البحرين': { left: '60.5%', top: '42.5%' },
  'الكويت': { left: '60%', top: '40.5%' },
  'موريتانيا': { left: '44%', top: '46%' },
  'الصومال': { left: '60%', top: '53%' },
  'جيبوتي': { left: '59%', top: '51%' },
  'تركيا': { left: '56%', top: '33%' },
  'ألمانيا': { left: '51.5%', top: '27%' },
  'السويد': { left: '53%', top: '19%' },
  'إيطاليا': { left: '52.5%', top: '32%' },
  'إنكلترا': { left: '48.5%', top: '27%' },
  'الدنمارك': { left: '51.5%', top: '23%' }
};

const MOCK_USERS = [
  { id: 'u_admin', email: 'admin@quran.com', name: 'مدير النظام', password: '123', role: 'ADMIN', location: 'سوريا' },
  { id: 'u_super', email: 'super@quran.com', name: 'أحمد المشرف', password: '123', role: 'SUPERVISOR', location: 'السعودية' },
  { id: 'u_user', email: 'user@quran.com', name: 'مستخدم تجريبي', password: '123', role: 'USER', location: 'مصر' },
  { id: 'u_test1', email: 't1@quran.com', name: 'عمر المسلم', password: '123', role: 'USER', location: 'ألمانيا' },
  { id: 'u_test2', email: 't2@quran.com', name: 'علي الدمشقي', password: '123', role: 'USER', location: 'تركيا' },
  { id: 'u_test3', email: 't3@quran.com', name: 'حسن الإماراتي', password: '123', role: 'USER', location: 'الإمارات' },
  { id: 'u_test4', email: 't4@quran.com', name: 'يوسف العراقي', password: '123', role: 'USER', location: 'العراق' },
  { id: 'u_test5', email: 't5@quran.com', name: 'سامي السويد', password: '123', role: 'USER', location: 'السويد' },
  { id: 'u_test6', email: 't6@quran.com', name: 'ماجد الأردني', password: '123', role: 'USER', location: 'الأردن' },
  { id: 'u_test7', email: 't7@quran.com', name: 'خالد الكويتي', password: '123', role: 'USER', location: 'الكويت' }
];

const initKhatmaJuzs = () => Array.from({length: 30}, (_, i) => ({
  id: i + 1, status: 'AVAILABLE', userId: null, userName: null
}));

const MOCK_GROUPS = [
  {
    id: 'g1', name: 'ختمة شهر رمضان', description: 'ختمة جماعية', inviteCode: 'RAMD12', 
    ownerId: 'u_super', completedKhatmas: 3,
    members: [{ userId: 'u_super', name: 'أحمد المشرف', role: 'SUPERVISOR' }, { userId: 'u_user', name: 'مستخدم تجريبي', role: 'USER' }],
    activeKhatma: { id: 'k1', juzs: initKhatmaJuzs() },
    messages: [ { id: 1, userId: 'sys', userName: 'النظام', text: 'تم إنشاء الختمة. توكلوا على الله.', time: '10:00 ص', reported: false, isSystem: true } ]
  }
];

const theme = {
  primary: '#062c1e', primaryLight: '#0d4a35', accent: '#D4AF37', accentLight: '#E8CA6D', cream: '#FCFBF7', dark: '#121212',
  pattern: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23d4af37\' fill-opacity=\'0.06\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'
};

export default function App() {
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Amiri+Quran&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  const [activeTab, setActiveTab] = useState('home');
  const [currentUser, setCurrentUser] = useState(null);
  const [readingItem, setReadingItem] = useState(null);
  const [users, setUsers] = useState(MOCK_USERS);
  const [groups, setGroups] = useState(MOCK_GROUPS);
  const [bookmarks, setBookmarks] = useState([]);
  const [toast, setToast] = useState(null);
  
  const showToast = (msg) => {
      setToast(msg);
      setTimeout(() => setToast(null), 3000);
  };

  const toggleBookmark = (surah, ayah, surahName) => {
    const exists = bookmarks.find(b => b.surah === surah && b.ayah === ayah);
    if (exists) {
      setBookmarks(bookmarks.filter(b => b !== exists));
      showToast("تم إزالة العلامة المرجعية");
    } else {
      setBookmarks([{ surah, ayah, surahName }, ...bookmarks]);
      showToast("تم حفظ العلامة بنجاح");
    }
  };

  return (
    <div dir="rtl" className="min-h-screen flex flex-col mx-auto max-w-md shadow-2xl relative overflow-hidden" style={{ backgroundColor: theme.cream, color: theme.dark, fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {toast && (
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-[250] text-white px-5 py-2.5 rounded-full text-sm font-bold shadow-xl transition-all animate-in fade-in slide-in-from-top-4 border border-[#D4AF37]/30" style={{ backgroundColor: theme.primary }}>
              {toast}
          </div>
      )}

      <div className="flex-1 overflow-y-auto pb-20 bg-white/60">
        {readingItem !== null ? (
          <ReadingScreen 
            readingItem={readingItem} theme={theme} onBack={() => setReadingItem(null)}
            bookmarks={bookmarks} toggleBookmark={toggleBookmark} currentUser={currentUser} showToast={showToast}
          />
        ) : (
          <>
            {activeTab === 'home' && <JuzIndexScreen theme={theme} onOpenJuz={(juzId) => setReadingItem({ type: 'juz', id: juzId })} />}
            {activeTab === 'index' && <SurahIndexScreen theme={theme} onOpenSurah={(surahId) => setReadingItem({ type: 'surah', id: surahId })} />}
            {activeTab === 'search' && <SearchScreen theme={theme} onOpenSurah={(surahId, ayahNum) => setReadingItem({ type: 'surah', id: surahId, targetAyah: ayahNum })} showToast={showToast} />}
            {activeTab === 'tafsir' && <TafsirScreen theme={theme} showToast={showToast} />}
            {activeTab === 'bookmarks' && <BookmarksScreen theme={theme} bookmarks={bookmarks} onOpenSurah={(surahId, ayahNum) => setReadingItem({ type: 'surah', id: surahId, targetAyah: ayahNum })} toggleBookmark={toggleBookmark} />}
            {activeTab === 'groups' && (
              <GroupsTab 
                theme={theme} currentUser={currentUser} setCurrentUser={setCurrentUser}
                users={users} setUsers={setUsers} groups={groups} setGroups={setGroups} showToast={showToast}
              />
            )}
          </>
        )}
      </div>

      {readingItem === null && (
          <div className="fixed bottom-0 w-full max-w-md mx-auto bg-white border-t flex justify-between items-center h-16 px-2 pb-1 shadow-[0_-10px_25px_rgba(6,44,30,0.1)] z-50 rounded-t-3xl border-[#D4AF37]/20">
            <NavItem icon={<Home size={20} />} label="الرئيسية" isActive={activeTab === 'home'} onClick={() => setActiveTab('home')} theme={theme} />
            <NavItem icon={<List size={20} />} label="الفهرس" isActive={activeTab === 'index'} onClick={() => setActiveTab('index')} theme={theme} />
            <NavItem icon={<Search size={20} />} label="البحث" isActive={activeTab === 'search'} onClick={() => setActiveTab('search')} theme={theme} />
            <NavItem icon={<Library size={20} />} label="التفسير" isActive={activeTab === 'tafsir'} onClick={() => setActiveTab('tafsir')} theme={theme} />
            <NavItem icon={<Bookmark size={20} />} label="العلامات" isActive={activeTab === 'bookmarks'} onClick={() => setActiveTab('bookmarks')} theme={theme} />
            <NavItem icon={<Users size={20} />} label="المجموعات" isActive={activeTab === 'groups'} onClick={() => setActiveTab('groups')} theme={theme} />
          </div>
      )}
    </div>
  );
}

function NavItem({ icon, label, isActive, onClick, theme }) {
  return (
    <button onClick={onClick} className="flex flex-col items-center justify-center w-full h-full space-y-1 transition-all" style={{ color: isActive ? theme.primary : '#9CA3AF' }}>
      <div className={`p-1.5 rounded-full transition-all duration-300 ${isActive ? 'bg-[#062c1e] bg-opacity-10 text-[#062c1e] transform -translate-y-1 shadow-sm' : ''}`}>{icon}</div>
      <span className={`text-[9px] ${isActive ? 'font-bold' : 'font-medium'}`}>{label}</span>
    </button>
  );
}

function HeaderBanner({ theme, title, subtitle }) {
  return (
    <div className="flex flex-col items-center justify-center pt-10 pb-6 shadow-lg rounded-b-[40px] mb-6 relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.primaryLight} 100%)` }}>
      <div className="absolute inset-0 opacity-100" style={{ backgroundImage: theme.pattern }}></div>
      <h1 className="text-3xl font-bold font-serif tracking-wider z-10" style={{ color: theme.accent, textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>{title}</h1>
      {subtitle && <p className="text-[#E8CA6D] opacity-90 mt-2 text-sm z-10 font-medium tracking-wide">{subtitle}</p>}
    </div>
  );
}

function JuzIndexScreen({ theme, onOpenJuz }) {
  const juzs = Array.from({length: 30}, (_, i) => i + 1);
  return (
    <div>
      <HeaderBanner theme={theme} title="القرآن الكريم" subtitle="تقسيم الأجزاء" />
      <div className="p-4 grid grid-cols-3 gap-3">
        {juzs.map((juzNum) => (
          <div key={juzNum} onClick={() => onOpenJuz(juzNum)} className="flex flex-col items-center justify-center py-6 bg-white rounded-[24px] shadow-sm border border-gray-100 cursor-pointer hover:shadow-lg transition-all" style={{ borderBottom: `3px solid ${theme.accent}30` }}>
            <span className="text-lg font-bold" style={{ color: theme.primary }}>الجزء</span>
            <div className="w-12 h-12 mt-2 flex items-center justify-center rounded-full font-bold text-lg shadow-inner" style={{ backgroundColor: theme.cream, color: theme.accent, border: `2px solid ${theme.accentLight}` }}>{juzNum.toLocaleString('ar-EG')}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SurahIndexScreen({ theme, onOpenSurah }) {
  return (
    <div>
      <HeaderBanner theme={theme} title="فهرس السور" />
      <div className="p-4 space-y-3">
        {SURAHS_META.map((surah) => (
          <div key={surah.number} onClick={() => onOpenSurah(surah.number)} className="flex items-center p-4 bg-white rounded-2xl shadow-sm border border-gray-100 cursor-pointer hover:border-[#D4AF37] relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-1.5 opacity-0 hover:opacity-100 transition-opacity" style={{ backgroundColor: theme.accent }}></div>
            <div className="w-12 h-12 flex items-center justify-center rounded-full font-bold relative shadow-inner" style={{ backgroundColor: theme.cream, color: theme.primary, border: `2px solid ${theme.accentLight}` }}><span className="text-sm">{surah.number.toLocaleString('ar-EG')}</span></div>
            <div className="mr-4 flex-1"><h2 className="text-lg font-bold font-serif" style={{ color: theme.primary }}>{surah.name}</h2><p className="text-xs text-gray-500 mt-1 font-medium">{surah.type} • {surah.ayahs.toLocaleString('ar-EG')} آية</p></div>
            <ArrowRight size={20} style={{ color: theme.accentLight }} />
          </div>
        ))}
      </div>
    </div>
  );
}

function SearchScreen({ theme, onOpenSurah, showToast }) {
  const [query, setQuery] = useState(''); const [results, setResults] = useState([]); const [loading, setLoading] = useState(false); const [hasSearched, setHasSearched] = useState(false);
  const handleSearch = async () => {
    if (!query.trim()) return; setLoading(true); setHasSearched(true);
    try {
      const res = await fetch(`https://api.alquran.cloud/v1/search/${encodeURIComponent(query)}/all/quran-simple-clean`);
      const data = await res.json();
      if (data.code === 200 && data.data && data.data.matches) setResults(data.data.matches); else setResults([]);
    } catch (error) { showToast("حدث خطأ أثناء البحث."); setResults([]); }
    setLoading(false);
  };
  return (
    <div>
      <HeaderBanner theme={theme} title="البحث في القرآن" subtitle="ابحث عن أي كلمة أو آية" />
      <div className="p-5">
        <div className="flex gap-2 mb-6">
          <input type="text" placeholder="اكتب كلمة للبحث..." value={query} onChange={(e) => setQuery(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSearch()} className="flex-1 p-4 rounded-2xl border-2 focus:outline-none font-bold text-lg" style={{ borderColor: theme.accentLight, color: theme.primary }} />
          <button onClick={handleSearch} className="p-4 rounded-2xl text-white flex items-center justify-center transition-all shadow-md" style={{ backgroundColor: theme.primary }}>{loading ? <Loader2 size={24} className="animate-spin" /> : <Search size={24} />}</button>
        </div>
        {hasSearched && !loading && results.length === 0 && <div className="text-center mt-10 opacity-50"><p className="font-bold">لا توجد نتائج مطابقة</p></div>}
        {results.length > 0 && (
          <div className="space-y-4">
            <p className="font-bold mb-4" style={{ color: theme.primary }}>تم العثور على {results.length} نتيجة:</p>
            {results.map((res, idx) => (
              <div key={idx} onClick={() => onOpenSurah(res.surah.number, res.numberInSurah)} className="p-5 bg-white rounded-[24px] shadow-sm border border-gray-100 cursor-pointer">
                <div className="flex justify-between items-center mb-3"><h3 className="font-bold font-serif text-lg" style={{ color: theme.primary }}>سورة {res.surah.name.replace('سُورَةُ ', '')}</h3><span className="text-xs font-bold px-3 py-1 rounded-full" style={{ backgroundColor: theme.cream, color: theme.accent, border: `1px solid ${theme.accentLight}` }}>الآية {res.numberInSurah.toLocaleString('ar-EG')}</span></div>
                <p className="text-base leading-relaxed text-gray-800 font-serif">{res.text}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function TafsirScreen({ theme, showToast }) {
  return (
    <div>
      <HeaderBanner theme={theme} title="كتب التفسير" />
      <div className="p-5 space-y-4">
        <div className="bg-[#FAF8F5] border border-[#D4AF37]/30 p-4 rounded-2xl mb-6 text-center shadow-inner"><p className="text-sm font-bold" style={{color: theme.primary}}>لقراءة التفسير، افتح أي سورة واضغط مطولاً على الآية.</p></div>
        {TAFSIR_BOOKS.map((tafsir) => (
            <div key={tafsir.id} onClick={() => showToast(`انتقل للقرآن واضغط على الآية لقراءة ${tafsir.title}`)} className="flex flex-col p-6 bg-white rounded-[24px] shadow-sm border border-gray-100 cursor-pointer relative"><div className="absolute right-0 top-0 bottom-0 w-2" style={{ backgroundColor: theme.accent }}></div><h2 className="text-xl font-bold mb-2 font-serif relative z-10" style={{ color: theme.primary }}>{tafsir.title}</h2><p className="text-sm font-bold text-gray-500 relative z-10">{tafsir.author}</p></div>
        ))}
      </div>
    </div>
  );
}

function BookmarksScreen({ theme, bookmarks, onOpenSurah, toggleBookmark }) {
  return (
    <div>
      <HeaderBanner theme={theme} title="العلامات المحفوظة" />
      <div className="p-4">
        {bookmarks.length === 0 ? <div className="flex flex-col items-center mt-20 opacity-40"><p className="font-bold text-lg" style={{ color: theme.primary }}>لا توجد علامات</p></div> : (
          bookmarks.map((b, idx) => (
            <div key={idx} className="flex items-center p-6 bg-white rounded-[24px] shadow-sm border border-gray-100 mb-4 cursor-pointer" style={{ borderRight: `4px solid ${theme.accent}` }}>
              <div className="flex-1" onClick={() => onOpenSurah(b.surah, b.ayah)}><h3 className="font-bold text-xl mb-2 font-serif" style={{ color: theme.primary }}>سورة {b.surahName}</h3><p className="text-sm font-bold" style={{ color: theme.accent }}>الآية {b.ayah.toLocaleString('ar-EG')}</p></div>
              <button onClick={() => toggleBookmark(b.surah, b.ayah, b.surahName)} className="p-4 bg-red-50 text-red-500 rounded-full hover:bg-red-100"><Trash2 size={22} /></button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

const RECITERS = [
    { id: 'ar.alafasy', name: 'مشاري العفاسي' },
    { id: 'ar.mahermuaiqly', name: 'ماهر المعيقلي' },
    { id: 'ar.abdulbasitmurattal', name: 'عبد الباسط عبد الصمد' }
];

function ReadingScreen({ readingItem, theme, onBack, bookmarks, toggleBookmark, showToast }) {
  const [pagesList, setPagesList] = useState([]);
  const [ayahsByPage, setAyahsByPage] = useState({});
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedAyah, setSelectedAyah] = useState(null);
  
  // Tafsir
  const [isTafsirMode, setIsTafsirMode] = useState(false);
  const [selectedTafsirBook, setSelectedTafsirBook] = useState(TAFSIR_BOOKS[0].id);
  const [tafsirText, setTafsirText] = useState("");
  const [isTafsirLoading, setIsTafsirLoading] = useState(false);
  const [title, setTitle] = useState("");
  
  // Swipe
  const [touchStart, setTouchStart] = useState({x: null, y: null});
  const [touchEnd, setTouchEnd] = useState({x: null, y: null});
  
  // Audio Player State
  const [reciter, setReciter] = useState(RECITERS[0].id);
  const [playback, setPlayback] = useState({
      isActive: false, currentGlobalAyah: null, endGlobalAyah: null, isPaused: false
  });
  const audioRef = useRef(null);
  if (!audioRef.current) audioRef.current = new Audio();

  useEffect(() => {
    setLoading(true);
    const endpoint = readingItem.type === 'surah' ? `https://api.alquran.cloud/v1/surah/${readingItem.id}/quran-uthmani` : `https://api.alquran.cloud/v1/juz/${readingItem.id}/quran-uthmani`;
    setTitle(readingItem.type === 'surah' ? `سُورَةُ ${SURAHS_META.find(s=>s.number === readingItem.id)?.name}` : `الجُزْءُ ${readingItem.id.toLocaleString('ar-EG')}`);

    fetch(endpoint).then(res => res.json()).then(data => {
        let fetchedAyahs = data.data.ayahs || [];
        let surahNum = readingItem.type === 'surah' ? readingItem.id : null;
        let surahNm = readingItem.type === 'surah' ? SURAHS_META.find(s=>s.number===surahNum).name : null;

        const pagesObj = {};
        fetchedAyahs.forEach(a => {
            const sNum = a.surah ? a.surah.number : surahNum;
            const sName = a.surah ? a.surah.name : surahNm;
            const normA = { ...a, surahNumber: sNum, surahName: sName.replace('سُورَةُ ', ''), page: a.page || 1 };
            if(!pagesObj[normA.page]) pagesObj[normA.page] = [];
            pagesObj[normA.page].push(normA);
        });
        
        const pList = Object.keys(pagesObj).map(Number).sort((a,b)=>a-b);
        setPagesList(pList); setAyahsByPage(pagesObj);
        
        let initialPageIndex = 0;
        if (readingItem.targetAyah) {
            const targetPageStr = Object.keys(pagesObj).find(pageNum => pagesObj[pageNum].some(a => a.surahNumber === readingItem.id && a.numberInSurah === readingItem.targetAyah));
            if (targetPageStr) initialPageIndex = pList.indexOf(Number(targetPageStr));
        }
        
        setCurrentPageIndex(initialPageIndex !== -1 ? initialPageIndex : 0);
        setLoading(false);

        if (readingItem.targetAyah) {
            setTimeout(() => {
                const element = document.getElementById(`ayah-${readingItem.id}-${readingItem.targetAyah}`);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    element.style.backgroundColor = '#D4AF3740';
                    setTimeout(() => { element.style.backgroundColor = 'transparent'; }, 2000);
                }
            }, 500);
        }
      }).catch(err => { showToast("حدث خطأ في التحميل."); setLoading(false); });

      return () => { if(audioRef.current) { audioRef.current.pause(); audioRef.current.src = ""; } };
  }, [readingItem]);

  const getSurahGlobalRange = (surahNumber) => {
      let start = 1;
      for (let i = 0; i < surahNumber - 1; i++) { start += SURAHS_META[i].ayahs; }
      let end = start + SURAHS_META[surahNumber - 1].ayahs - 1;
      return { start, end };
  };

  const startPlayback = (startGlobal, endGlobal) => {
      setPlayback({ isActive: true, currentGlobalAyah: startGlobal, endGlobalAyah: endGlobal, isPaused: false });
      setSelectedAyah(null);
  };

  const stopPlayback = () => {
      setPlayback({ isActive: false, currentGlobalAyah: null, endGlobalAyah: null, isPaused: false });
      if(audioRef.current) audioRef.current.pause();
  };

  useEffect(() => {
      if (!playback.isActive || !playback.currentGlobalAyah) return;
      const audio = audioRef.current;

      if (Object.keys(ayahsByPage).length > 0) {
          for (const [pageNum, ayahs] of Object.entries(ayahsByPage)) {
              if (ayahs.some(a => a.number === playback.currentGlobalAyah)) {
                  const newIndex = pagesList.indexOf(Number(pageNum));
                  if (newIndex !== -1 && newIndex !== currentPageIndex) setCurrentPageIndex(newIndex);
                  break;
              }
          }
          setTimeout(() => {
             const elements = document.querySelectorAll(`[data-global="${playback.currentGlobalAyah}"]`);
             if (elements.length > 0) elements[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
          }, 100);
      }

      audio.src = `https://cdn.islamic.network/quran/audio/128/${reciter}/${playback.currentGlobalAyah}.mp3`;
      if (!playback.isPaused) {
          audio.play().catch(e => { showToast("تعذر تشغيل الصوت."); setPlayback(p => ({...p, isPaused: true})); });
      } else { audio.pause(); }

      const handleEnded = () => {
          if (playback.currentGlobalAyah < playback.endGlobalAyah) {
              setPlayback(prev => ({ ...prev, currentGlobalAyah: prev.currentGlobalAyah + 1 }));
          } else { stopPlayback(); showToast("صدق الله العظيم."); }
      };

      audio.addEventListener('ended', handleEnded);
      return () => audio.removeEventListener('ended', handleEnded);
  }, [playback.currentGlobalAyah, playback.isPaused, reciter, ayahsByPage, pagesList]);


  const handleCopy = (text) => {
      try {
          const tArea = document.createElement("textarea"); tArea.value = text;
          tArea.style.position = "fixed"; document.body.appendChild(tArea);
          tArea.select(); document.execCommand('copy'); document.body.removeChild(tArea);
          showToast("تم نسخ الآية!");
      } catch (err) { showToast("تم النسخ"); }
      setSelectedAyah(null);
  };

  useEffect(() => {
    if (isTafsirMode && selectedAyah) {
      setIsTafsirLoading(true);
      const edition = selectedTafsirBook === 'qurtubi' ? 'ar.qurtubi' : 'ar.muyassar'; 
      fetch(`https://api.alquran.cloud/v1/ayah/${selectedAyah.surahNumber}:${selectedAyah.numberInSurah}/${edition}`)
        .then(res => res.json()).then(data => {
          if(data.data && data.data.text) setTafsirText(data.data.text);
          else setTafsirText(`(عفواً، التفسير غير متصل حالياً).`);
          setIsTafsirLoading(false);
        }).catch(err => { setTafsirText("حدث خطأ."); setIsTafsirLoading(false); });
    }
  }, [isTafsirMode, selectedTafsirBook, selectedAyah]);

  const handleTouchEnd = () => {
    if (!touchStart.x || !touchEnd.x) return;
    const distanceX = touchStart.x - touchEnd.x;
    const distanceY = touchStart.y - touchEnd.y;
    
    if (Math.abs(distanceX) > Math.abs(distanceY) && Math.abs(distanceX) > 50) {
      if (distanceX < 0 && currentPageIndex < pagesList.length - 1) setCurrentPageIndex(i => i + 1); 
      if (distanceX > 0 && currentPageIndex > 0) setCurrentPageIndex(i => i - 1); 
    }
    setTouchStart({ x: null, y: null }); setTouchEnd({ x: null, y: null });
  };

  const pageAyahs = ayahsByPage[pagesList[currentPageIndex]] || [];
  const groupedBySurah = [];
  let currentGroup = null;
  pageAyahs.forEach(a => {
      if(!currentGroup || currentGroup.surahNumber !== a.surahNumber) {
          currentGroup = { surahNumber: a.surahNumber, surahName: a.surahName, ayahs: [] }; groupedBySurah.push(currentGroup);
      }
      currentGroup.ayahs.push(a);
  });

  return (
    <div className="min-h-full relative flex flex-col" style={{ backgroundColor: theme.cream }}>
      <div className="sticky top-0 z-10 flex items-center h-16 px-4 shadow-md rounded-b-3xl relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.primaryLight} 100%)`, color: theme.accent }}>
        <div className="absolute inset-0" style={{ backgroundImage: theme.pattern }}></div>
        <button onClick={onBack} className="p-2 -mr-2 bg-white/10 rounded-full z-10"><ArrowRight size={24} /></button>
        <h1 className="flex-1 text-center text-xl font-bold mr-6 font-serif z-10">{title}</h1>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center mt-40"><Loader2 size={48} className="animate-spin mb-4" style={{ color: theme.accent }} /><p className="font-bold text-lg" style={{ color: theme.primary }}>جاري تحميل الرسم العثماني...</p></div>
      ) : (
        <div className="flex-1 p-5 pt-6 flex flex-col" onTouchStart={e => setTouchStart({x: e.targetTouches[0].clientX, y: e.targetTouches[0].clientY})} onTouchMove={e => setTouchEnd({x: e.targetTouches[0].clientX, y: e.targetTouches[0].clientY})} onTouchEnd={handleTouchEnd}>
          <div className="flex-1 space-y-12 pb-24">
            {groupedBySurah.map((group, idx) => {
               const surahRange = getSurahGlobalRange(group.surahNumber);
               return (
               <div key={`${group.surahNumber}-${idx}`}>
                  {group.ayahs.some(a => a.numberInSurah === 1) && (
                     <div className="flex flex-col items-center justify-center py-4 mb-8 bg-white border-2 rounded-2xl shadow-sm relative overflow-hidden" style={{ borderColor: theme.accent }}>
                        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: theme.pattern }}></div>
                        <span className="text-2xl font-bold font-serif z-10 mb-2" style={{color: theme.primary}}>سُورَةُ {group.surahName}</span>
                        <button onClick={() => startPlayback(surahRange.start, surahRange.end)} className="z-10 flex items-center gap-2 text-xs font-bold px-4 py-1.5 rounded-full text-white shadow-md" style={{backgroundColor: theme.primary}}><PlayCircle size={16}/> تشغيل السورة كاملة</button>
                     </div>
                  )}

                  {(() => {
                      const ayah1 = group.ayahs.find(a => a.numberInSurah === 1);
                      if (!ayah1) return null;
                      if (group.surahNumber === 1) {
                          const isPlayingThis = playback.isActive && playback.currentGlobalAyah === ayah1.number;
                          return (
                              <div className="text-center mb-12">
                                  <span id={`ayah-${group.surahNumber}-1`} data-global={ayah1.number} onClick={() => setSelectedAyah(ayah1)} className={`inline-block text-[32px] font-bold tracking-widest px-4 py-2 cursor-pointer rounded-lg transition-colors duration-500`} style={{ color: theme.primary, fontFamily: "'Amiri Quran', serif", backgroundColor: isPlayingThis ? '#D4AF3740' : 'transparent' }}>
                                      بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ <span className="text-[24px] mx-1" style={{ color: theme.accent }}>﴿١﴾</span>
                                  </span>
                              </div>
                          );
                      } else if (group.surahNumber !== 9) {
                          return <div className="text-center text-[32px] mb-12 font-bold tracking-widest" style={{ color: theme.primary, fontFamily: "'Amiri Quran', serif" }}>بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ</div>;
                      }
                      return null;
                  })()}

                  <div className="text-justify leading-[3.8rem] tracking-wide" dir="rtl">
                    {group.ayahs.map((ayah) => {
                      if (group.surahNumber === 1 && ayah.numberInSurah === 1) return null;
                      const isPlayingThis = playback.isActive && playback.currentGlobalAyah === ayah.number;
                      const isBookmarked = bookmarks.some(b => b.surah === group.surahNumber && b.ayah === ayah.numberInSurah);
                      let text = ayah.text;
                      if (group.surahNumber !== 1 && ayah.numberInSurah === 1) text = text.replace(/^بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ\s*/, "");
                      return (
                        <span key={`${group.surahNumber}-${ayah.number}`} id={`ayah-${group.surahNumber}-${ayah.numberInSurah}`} data-global={ayah.number} onClick={() => setSelectedAyah(ayah)} className={`inline text-[30px] px-1.5 cursor-pointer rounded-lg transition-colors duration-500`} style={{ fontFamily: "'Amiri Quran', serif", color: theme.dark, backgroundColor: isPlayingThis ? '#D4AF3740' : (isBookmarked ? '#062c1e10' : 'transparent') }}>
                          {text} <span className="text-[24px] mx-1 font-bold" style={{ color: theme.accent }}>﴿{ayah.numberInSurah.toLocaleString('ar-EG')}﴾</span>{' '}
                        </span>
                      );
                    })}
                  </div>
               </div>
            )})}
          </div>

          <div className="flex items-center justify-between pt-6 mt-8 border-t border-[#D4AF37]/30 mb-8" dir="rtl">
            <button disabled={currentPageIndex === 0} onClick={() => setCurrentPageIndex(i => i - 1)} className="flex items-center gap-2 px-4 py-2 font-bold rounded-xl disabled:opacity-30 shadow-sm border" style={{ backgroundColor: theme.cream, color: theme.primary, borderColor: theme.accentLight }}><ChevronRight size={20} />السابق</button>
            <span className="font-bold font-serif text-lg" style={{ color: theme.primary }}>{pagesList[currentPageIndex]}</span>
            <button disabled={currentPageIndex === pagesList.length - 1} onClick={() => setCurrentPageIndex(i => i + 1)} className="flex items-center gap-2 px-4 py-2 font-bold rounded-xl disabled:opacity-30 shadow-sm border" style={{ backgroundColor: theme.cream, color: theme.primary, borderColor: theme.accentLight }}>التالي<ChevronLeft size={20} /></button>
          </div>
        </div>
      )}

      {/* Floating Audio Player */}
      {playback.isActive && (
         <div className="fixed bottom-0 w-full max-w-md bg-[#062c1e] text-white p-4 shadow-[0_-15px_30px_rgba(0,0,0,0.3)] rounded-t-[32px] flex items-center justify-between z-[200] border-t-4 border-[#D4AF37] animate-in slide-in-from-bottom-full duration-500">
             <div className="flex items-center gap-3">
                 <div className="relative">
                    <div className="w-10 h-10 rounded-full border-2 border-[#D4AF37] flex items-center justify-center bg-white/10"><PlayCircle size={20} className="text-[#D4AF37]" /></div>
                    {!playback.isPaused && <span className="absolute top-0 right-0 flex h-3 w-3"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E8CA6D] opacity-75"></span><span className="relative inline-flex rounded-full h-3 w-3 bg-[#D4AF37]"></span></span>}
                 </div>
                 <div>
                    <p className="text-sm font-bold text-[#E8CA6D]">التلاوة مستمرة</p>
                    <p className="text-xs opacity-80 font-bold">بصوت {RECITERS.find(r => r.id === reciter)?.name}</p>
                 </div>
             </div>
             <div className="flex gap-4">
                 <button onClick={() => setPlayback({...playback, isPaused: !playback.isPaused})} className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-all">{playback.isPaused ? <PlayCircle size={24}/> : <PauseCircle size={24}/>}</button>
                 <button onClick={stopPlayback} className="p-3 bg-red-500/80 rounded-full text-white hover:bg-red-600 transition-all shadow-md"><StopCircle size={24}/></button>
             </div>
         </div>
      )}

      {/* Modal - Ayah Options */}
      {selectedAyah && (
        <div className="fixed inset-0 z-[300] flex items-end bg-black/60 backdrop-blur-sm animate-in fade-in" onClick={() => {setSelectedAyah(null); setIsTafsirMode(false);}}>
          <div className="w-full max-w-md mx-auto bg-white rounded-t-[40px] p-6 shadow-2xl relative overflow-hidden" onClick={e => e.stopPropagation()} style={{ borderTop: `4px solid ${theme.accent}` }}>
            <div className="w-16 h-1.5 bg-gray-300 rounded-full mx-auto mb-6 relative z-10"></div>
            <h3 className="text-xl font-bold mb-6 text-center border-b pb-4 relative z-10 font-serif" style={{ color: theme.primary }}>سورة {selectedAyah.surahName} - الآية {selectedAyah.numberInSurah}</h3>
            
            <div className="relative z-10">
              {!isTafsirMode ? (
                <div className="space-y-3">
                  <div className="bg-gray-50 p-3 rounded-2xl border flex items-center justify-between mb-4">
                     <label className="text-sm font-bold text-[#062c1e]">القارئ:</label>
                     <select value={reciter} onChange={e => setReciter(e.target.value)} className="bg-transparent font-bold text-[#D4AF37] outline-none text-left" dir="ltr">
                         {RECITERS.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
                     </select>
                  </div>
                  <button onClick={() => startPlayback(selectedAyah.number, selectedAyah.number)} className="flex items-center justify-center w-full p-4 rounded-2xl font-bold text-white shadow-md transition-all bg-[#062c1e] hover:bg-[#0d4a35]">
                    <PlayCircle className="ml-3 text-[#D4AF37]" size={24} /> استماع لهذه الآية فقط
                  </button>
                  <button onClick={() => {
                      const range = getSurahGlobalRange(selectedAyah.surahNumber);
                      startPlayback(selectedAyah.number, range.end);
                  }} className="flex items-center justify-center w-full p-4 rounded-2xl font-bold text-[#062c1e] shadow-md transition-all bg-[#D4AF37] hover:bg-[#E8CA6D]">
                    <Library className="ml-3 text-[#062c1e]" size={24} /> استماع من هنا لآخر السورة
                  </button>
                  <button onClick={() => setIsTafsirMode(true)} className="flex items-center justify-center w-full p-4 rounded-2xl font-bold text-[#062c1e] bg-gray-50 border hover:bg-gray-100"><BookOpenText className="ml-3 text-[#D4AF37]" size={24} /> قراءة تفسير الآية</button>
                  <button onClick={() => { toggleBookmark(selectedAyah.surahNumber, selectedAyah.numberInSurah, selectedAyah.surahName); setSelectedAyah(null); }} className="flex items-center w-full p-4 rounded-2xl hover:bg-gray-50 border font-bold text-gray-700">{bookmarks.some(b => b.surah === selectedAyah.surahNumber && b.ayah === selectedAyah.numberInSurah) ? <><BookmarkMinus className="ml-4 text-red-500" size={24} /> إزالة العلامة المرجعية</> : <><Bookmark className="ml-4 text-[#062c1e]" size={24} /> حفظ كعلامة مرجعية</>}</button>
                  <button onClick={() => handleCopy(selectedAyah.text)} className="flex items-center w-full p-4 rounded-2xl hover:bg-gray-50 border font-bold text-gray-700"><Copy className="ml-4 text-gray-500" size={24} /> نسخ نص الآية</button>
                </div>
              ) : (
                <div className="animate-in slide-in-from-right-4">
                  <div className="flex justify-between mb-4"><label className="text-sm font-bold text-[#062c1e]">اختر التفسير:</label><button onClick={()=>setIsTafsirMode(false)} className="text-xs text-gray-500">العودة للخيارات</button></div>
                  <select value={selectedTafsirBook} onChange={(e) => setSelectedTafsirBook(e.target.value)} className="w-full mb-4 p-4 rounded-xl border focus:outline-none focus:border-[#D4AF37] font-bold shadow-sm text-[#062c1e] bg-[#FCFBF7]">{TAFSIR_BOOKS.map(b => <option key={b.id} value={b.id}>{b.title} - {b.author}</option>)}</select>
                  <div className="p-4 rounded-2xl border bg-white max-h-64 overflow-y-auto mb-4 shadow-inner">{isTafsirLoading ? <div className="flex flex-col items-center py-6"><Loader2 size={32} className="animate-spin mb-3 text-[#D4AF37]" /><p className="text-sm font-bold text-[#062c1e]">جاري جلب التفسير...</p></div> : <p className="text-lg leading-relaxed text-gray-800 font-serif text-justify">{tafsirText}</p>}</div>
                  <button onClick={() => {setIsTafsirMode(false); setSelectedAyah(null);}} className="w-full py-3 text-white rounded-xl font-bold shadow-md bg-[#062c1e]">إغلاق</button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function GroupsTab({ theme, currentUser, setCurrentUser, users, setUsers, groups, setGroups, showToast }) {
  const [activeGroupId, setActiveGroupId] = useState(null);
  const [groupTab, setGroupTab] = useState('khatma'); 
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'register'
  const [adminTab, setAdminTab] = useState('groups'); // 'groups' or 'stats'
  const [selectedLocation, setSelectedLocation] = useState(null); // لعرض مستخدمي دولة معينة
  
  // Login fields
  const [emailInput, setEmailInput] = useState("");
  const [passInput, setPassInput] = useState("");
  
  // Register fields
  const [regData, setRegData] = useState({ name: '', email: '', password: '', location: 'سوريا' });

  const [msgInput, setMsgInput] = useState("");
  const [showJoinDialog, setShowJoinDialog] = useState(false);
  const [inviteInput, setInviteInput] = useState("");

  const handleLogin = () => {
      const user = users.find(u => u.email === emailInput && u.password === passInput);
      if(user) { setCurrentUser(user); showToast(`مرحباً ${user.name}`); } 
      else showToast('بيانات الدخول غير صحيحة');
  };

  const handleRegister = () => {
      if(!regData.name || !regData.email || !regData.password) {
          showToast("يرجى تعبئة جميع الحقول"); return;
      }
      if(users.some(u => u.email === regData.email)) {
          showToast("البريد الإلكتروني مسجل مسبقاً"); return;
      }
      const newUser = { id: `u_${Date.now()}`, ...regData, role: 'USER' };
      setUsers([...users, newUser]);
      setCurrentUser(newUser);
      showToast("تم إنشاء الحساب بنجاح!");
  };

  const handleJoin = () => {
    const g = groups.find(x => x.inviteCode === inviteInput.toUpperCase());
    if(g) {
      if(g.members.length >= 30) { showToast('عذراً، المجموعة ممتلئة (30 عضو).'); } 
      else if (!g.members.some(m=>m.userId===currentUser.id)) {
        setGroups(groups.map(x => x.id === g.id ? {...x, members: [...x.members, {userId: currentUser.id, name: currentUser.name, role: 'USER'}]} : x));
        showToast('تم الانضمام بنجاح.');
      } else { showToast('أنت عضو بالفعل في هذه المجموعة.'); }
    } else { showToast('رمز الدعوة غير صحيح.'); }
    setShowJoinDialog(false); setInviteInput("");
  };

  const createKhatma = (groupId) => {
    setGroups(groups.map(g => {
      if (g.id === groupId) {
        return {
          ...g, activeKhatma: { id: Date.now().toString(), juzs: initKhatmaJuzs() },
          messages: [...g.messages, { id: Date.now(), userId: 'sys', userName: 'النظام', text: 'تم إنشاء ختمة جديدة، بادر بتثبيت جزئك!', time: 'الآن', isSystem: true }]
        };
      }
      return g;
    }));
    showToast("تم فتح ختمة جديدة!");
  };

  const reserveJuz = (groupId, juzId) => {
    const g = groups.find(x => x.id === groupId);
    const alreadyReserved = g.activeKhatma.juzs.some(j => j.userId === currentUser.id && j.status === 'RESERVED');
    if (alreadyReserved) { showToast("أنت تقرأ جزءاً بالفعل، أتمه أولاً."); return; }

    setGroups(groups.map(g => g.id === groupId ? {
      ...g, activeKhatma: { ...g.activeKhatma, juzs: g.activeKhatma.juzs.map(j => j.id === juzId ? { ...j, status: 'RESERVED', userId: currentUser.id, userName: currentUser.name } : j) }
    } : g));
  };

  const completeJuz = (groupId, juzId) => {
    let allCompleted = false;
    setGroups(groups.map(g => {
      if (g.id === groupId) {
        const updatedJuzs = g.activeKhatma.juzs.map(j => j.id === juzId ? { ...j, status: 'COMPLETED' } : j);
        allCompleted = updatedJuzs.every(j => j.status === 'COMPLETED');
        
        if (allCompleted) {
          return {
            ...g, activeKhatma: null, completedKhatmas: g.completedKhatmas + 1,
            messages: [...g.messages, { id: Date.now(), userId: 'sys', userName: 'النظام', text: '🎉 تقبل الله، تم إتمام الختمة بنجاح!', time: 'الآن', isSystem: true }]
          };
        }
        return { ...g, activeKhatma: { ...g.activeKhatma, juzs: updatedJuzs } };
      }
      return g;
    }));
    if(allCompleted) showToast("ما شاء الله، تم ختم القرآن بالكامل!");
    else showToast("تقبل الله قراءتك.");
  };

  const sendChat = (groupId) => {
    if(!msgInput.trim()) return;
    setGroups(groups.map(g => g.id === groupId ? {
      ...g, messages: [...g.messages, { id: Date.now(), userId: currentUser.id, userName: currentUser.name, text: msgInput, time: 'الآن', reported: false }]
    } : g));
    setMsgInput("");
  };
  const reportMsg = (groupId, msgId) => {
    setGroups(groups.map(g => g.id === groupId ? {...g, messages: g.messages.map(m => m.id === msgId ? {...m, reported: true} : m)} : g));
    showToast("تم الإبلاغ للإدارة");
  };
  const deleteMsg = (groupId, msgId) => {
    setGroups(groups.map(g => g.id === groupId ? {...g, messages: g.messages.filter(m => m.id !== msgId)} : g));
  };

  if (!currentUser) {
    return (
      <div className="p-6 pt-12 text-center flex flex-col items-center min-h-full">
        <div className="w-24 h-24 rounded-full flex items-center justify-center mb-6 shadow-xl border-4 relative overflow-hidden" style={{ backgroundColor: theme.primary, borderColor: theme.accent }}>
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: theme.pattern }}></div><ShieldAlert size={48} style={{color: theme.accent}} className="relative z-10" />
        </div>
        <h2 className="text-2xl font-bold mb-6 font-serif" style={{color: theme.primary}}>مجتمع القرآن الكريم</h2>
        
        <div className="w-full text-right bg-white p-6 rounded-[32px] shadow-lg border border-gray-100">
            {/* Toggle Login / Register */}
            <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
                <button onClick={() => setAuthMode('login')} className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${authMode === 'login' ? 'bg-white shadow text-[#062c1e]' : 'text-gray-500'}`}>تسجيل الدخول</button>
                <button onClick={() => setAuthMode('register')} className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${authMode === 'register' ? 'bg-white shadow text-[#062c1e]' : 'text-gray-500'}`}>حساب جديد</button>
            </div>

            {authMode === 'login' ? (
                <div className="animate-in fade-in slide-in-from-left-4">
                    <div className="mb-4">
                      <label className="text-sm font-bold mb-2 block" style={{ color: theme.primary }}>البريد الإلكتروني (جرب: admin@quran.com)</label>
                      <input type="email" value={emailInput} onChange={e=>setEmailInput(e.target.value)} className="w-full p-3 rounded-xl bg-gray-50 border focus:border-[#D4AF37] outline-none" dir="ltr" />
                    </div>
                    <div className="mb-4">
                      <label className="text-sm font-bold mb-2 block" style={{ color: theme.primary }}>كلمة المرور (جرب: 123)</label>
                      <input type="password" value={passInput} onChange={e=>setPassInput(e.target.value)} className="w-full p-3 rounded-xl bg-gray-50 border focus:border-[#D4AF37] outline-none" dir="ltr" />
                    </div>
                    <button onClick={handleLogin} className="w-full py-4 text-white rounded-xl font-bold mt-4 shadow-md" style={{ background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.primaryLight} 100%)` }}>دخول</button>
                </div>
            ) : (
                <div className="animate-in fade-in slide-in-from-right-4">
                    <div className="mb-4">
                      <label className="text-sm font-bold mb-2 block" style={{ color: theme.primary }}>الاسم الكريم</label>
                      <input type="text" value={regData.name} onChange={e=>setRegData({...regData, name: e.target.value})} className="w-full p-3 rounded-xl bg-gray-50 border focus:border-[#D4AF37] outline-none" />
                    </div>
                    <div className="mb-4">
                      <label className="text-sm font-bold mb-2 block" style={{ color: theme.primary }}>البريد الإلكتروني</label>
                      <input type="email" value={regData.email} onChange={e=>setRegData({...regData, email: e.target.value})} className="w-full p-3 rounded-xl bg-gray-50 border focus:border-[#D4AF37] outline-none" dir="ltr" />
                    </div>
                    <div className="mb-4">
                      <label className="text-sm font-bold mb-2 block" style={{ color: theme.primary }}>كلمة المرور</label>
                      <input type="password" value={regData.password} onChange={e=>setRegData({...regData, password: e.target.value})} className="w-full p-3 rounded-xl bg-gray-50 border focus:border-[#D4AF37] outline-none" dir="ltr" />
                    </div>
                    <div className="mb-4">
                      <label className="text-sm font-bold mb-2 block" style={{ color: theme.primary }}>مكان التواجد (البلد)</label>
                      <div className="relative">
                          <MapPin size={18} className="absolute right-3 top-3.5 text-gray-400" />
                          <select value={regData.location} onChange={e=>setRegData({...regData, location: e.target.value})} className="w-full p-3 pr-10 rounded-xl bg-gray-50 border focus:border-[#D4AF37] outline-none font-bold text-[#062c1e]">
                              {LOCATIONS_LIST.map(loc => <option key={loc} value={loc}>{loc}</option>)}
                          </select>
                      </div>
                    </div>
                    <button onClick={handleRegister} className="w-full py-4 text-[#062c1e] bg-[#D4AF37] rounded-xl font-bold mt-4 shadow-md hover:bg-[#E8CA6D] transition-colors">إنشاء الحساب</button>
                </div>
            )}
        </div>
      </div>
    );
  }

  if (activeGroupId) {
    const group = groups.find(g => g.id === activeGroupId);
    const myRole = group.members.find(m => m.userId === currentUser.id)?.role || (currentUser.role === 'ADMIN' ? 'ADMIN' : null);
    const canManage = myRole === 'ADMIN' || myRole === 'SUPERVISOR';
    const isMember = !!myRole;

    return (
      <div className="min-h-full flex flex-col pb-16">
        <div className="sticky top-0 z-10 bg-[#062c1e] text-white p-4 shadow-md flex items-center h-16">
          <button onClick={() => setActiveGroupId(null)} className="ml-4"><ArrowRight /></button>
          <div className="flex-1">
            <h1 className="font-bold text-lg leading-tight">{group.name}</h1>
            <p className="text-[10px] text-[#D4AF37]">الختمات المنجزة: {group.completedKhatmas} | الأعضاء: {group.members.length}/30</p>
          </div>
        </div>

        {isMember ? (
          <div className="flex-1 flex flex-col">
            <div className="flex bg-white border-b">
               <button onClick={()=>setGroupTab('khatma')} className={`flex-1 py-3 text-sm font-bold border-b-2 ${groupTab==='khatma' ? 'border-[#062c1e] text-[#062c1e]' : 'border-transparent text-gray-400'}`}>الختمة الحالية</button>
               <button onClick={()=>setGroupTab('chat')} className={`flex-1 py-3 text-sm font-bold border-b-2 ${groupTab==='chat' ? 'border-[#062c1e] text-[#062c1e]' : 'border-transparent text-gray-400'}`}>الدردشة</button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
               {groupTab === 'khatma' ? (
                 <div className="space-y-4 pb-16">
                    {!group.activeKhatma ? (
                       <div className="text-center bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                          <Trophy size={64} className="mx-auto mb-4 text-[#D4AF37]" />
                          <h3 className="font-bold text-xl mb-2 text-[#062c1e]">لا توجد ختمة نشطة حالياً</h3>
                          {canManage ? (
                             <button onClick={() => createKhatma(group.id)} className="mt-6 w-full py-3 bg-[#062c1e] text-white rounded-xl font-bold shadow-md">إنشاء ختمة جديدة</button>
                          ) : (
                             <p className="text-sm text-gray-500">ننتظر مشرف المجموعة لفتح ختمة جديدة.</p>
                          )}
                       </div>
                    ) : (
                       <div>
                          <div className="mb-4 flex items-center justify-between">
                            <h3 className="font-bold text-[#062c1e]">أجزاء الختمة</h3>
                            <span className="text-xs bg-[#D4AF37]/20 text-[#062c1e] px-2 py-1 rounded-md font-bold">باقي {group.activeKhatma.juzs.filter(j=>j.status !== 'COMPLETED').length}</span>
                          </div>
                          <div className="grid grid-cols-3 gap-3">
                             {group.activeKhatma.juzs.map(juz => (
                                <div key={juz.id} className={`flex flex-col items-center justify-center p-3 rounded-2xl shadow-sm border transition-all
                                   ${juz.status === 'COMPLETED' ? 'bg-gray-100 border-gray-200 opacity-60' : 
                                     juz.status === 'RESERVED' && juz.userId === currentUser.id ? 'bg-[#D4AF37]/10 border-[#D4AF37]' :
                                     juz.status === 'RESERVED' ? 'bg-orange-50 border-orange-200' : 'bg-white border-green-200 hover:border-green-500 cursor-pointer'}`}
                                     onClick={() => { if (juz.status === 'AVAILABLE') reserveJuz(group.id, juz.id); }}
                                >
                                   <span className="text-sm font-bold mb-1 text-[#062c1e]">الجزء {juz.id}</span>
                                   {juz.status === 'COMPLETED' ? <span className="text-[10px] flex items-center text-green-700 font-bold"><Check size={12}/> تمت</span> :
                                    juz.status === 'RESERVED' && juz.userId === currentUser.id ? <button onClick={(e) => {e.stopPropagation(); completeJuz(group.id, juz.id);}} className="text-[10px] bg-[#062c1e] text-white px-2 py-1 rounded w-full font-bold">إتمام القراءة</button> :
                                    juz.status === 'RESERVED' ? <span className="text-[9px] text-orange-600 font-bold text-center leading-tight">حجزه<br/>{juz.userName.split(' ')[0]}</span> :
                                    <span className="text-[10px] text-green-600 font-bold">تثبيت</span>}
                                </div>
                             ))}
                          </div>
                       </div>
                    )}
                 </div>
               ) : (
                 <div className="space-y-4 pb-20">
                    {group.messages.map(m => (
                      <div key={m.id} className={`p-4 rounded-2xl shadow-sm border ${m.reported ? 'bg-red-50 border-red-200' : m.isSystem ? 'bg-blue-50 border-blue-200 text-center' : 'bg-white'}`}>
                          {!m.isSystem && (
                            <div className="flex justify-between items-center mb-2">
                                <span className="font-bold text-xs text-[#062c1e] flex items-center gap-1"><UserIcon size={12}/> {m.userName}</span>
                                <span className="text-[10px] text-gray-400">{m.time}</span>
                            </div>
                          )}
                          <p className={`text-sm leading-relaxed ${m.isSystem ? 'text-blue-800 font-bold' : 'text-gray-800'}`}>{m.text}</p>
                          {!m.isSystem && (
                            <div className="flex gap-4 mt-3 pt-2 border-t border-gray-50">
                                <button onClick={() => reportMsg(group.id, m.id)} className="text-gray-400 hover:text-red-500 text-[11px] flex items-center gap-1 font-bold"><Flag size={13}/> إبلاغ</button>
                                {canManage && <button onClick={() => deleteMsg(group.id, m.id)} className="text-red-800 text-[11px] font-bold"><Trash2 size={13}/></button>}
                            </div>
                          )}
                          {m.reported && canManage && <p className="text-[10px] text-red-600 mt-2 font-bold">⚠️ تم الإبلاغ عن هذه الرسالة</p>}
                      </div>
                    ))}
                 </div>
               )}
            </div>
            {groupTab === 'chat' && (
              <div className="bg-white p-3 border-t shadow-[0_-5px_10px_rgba(0,0,0,0.05)] flex gap-2">
                  <input value={msgInput} onChange={e => setMsgInput(e.target.value)} className="flex-1 p-3 bg-gray-50 rounded-full text-sm outline-none border border-gray-200" placeholder="اكتب رسالتك للمجموعة..." />
                  <button onClick={() => sendChat(group.id)} className="bg-[#062c1e] text-white p-3 rounded-full shadow-lg"><Send size={18}/></button>
              </div>
            )}
          </div>
        ) : (
          <div className="p-8 text-center mt-20">
             <ShieldAlert size={64} className="mx-auto mb-4 text-gray-300" />
             <h2 className="text-xl font-bold mb-2 text-[#062c1e]">أنت لست عضواً</h2>
             <p className="text-gray-500 mb-6 text-sm">يجب أن تنضم للمجموعة لتتمكن من رؤية تفاصيل الختمة والدردشة.</p>
             <button onClick={() => setActiveGroupId(null)} className="w-full py-3 bg-[#062c1e] text-white rounded-xl font-bold shadow-md">العودة للقائمة</button>
          </div>
        )}
      </div>
    );
  }

  const myGroups = groups.filter(g => g.members.some(m => m.userId === currentUser.id) || currentUser.role === 'ADMIN');
  const otherGroups = groups.filter(g => !g.members.some(m => m.userId === currentUser.id) && currentUser.role !== 'ADMIN');
  const isManagement = currentUser.role === 'ADMIN' || currentUser.role === 'SUPERVISOR';
  
  const getAdminStats = () => {
      const stats = users.reduce((acc, u) => {
          acc[u.location] = (acc[u.location] || 0) + 1;
          return acc;
      }, {});
      return Object.entries(stats).sort((a, b) => b[1] - a[1]);
  };

  return (
    <div className="pb-16">
      <div className="flex items-center justify-between h-20 px-5 shadow-md rounded-b-[32px] mb-6 relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.primaryLight} 100%)`, color: theme.accent }}>
        <div className="absolute inset-0" style={{ backgroundImage: theme.pattern }}></div>
        <h1 className="text-2xl font-bold font-serif z-10">{adminTab === 'stats' ? 'لوحة الإدارة' : 'المجموعات والختمات'}</h1>
        <button onClick={() => setCurrentUser(null)} className="p-2.5 bg-white/10 rounded-full z-10"><LogOut size={22} /></button>
      </div>
      
      <div className="p-5">
        {currentUser.role === 'ADMIN' && (
           <div className="flex bg-gray-100 rounded-xl p-1 mb-6 shadow-inner border border-gray-200">
               <button onClick={() => setAdminTab('groups')} className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all flex items-center justify-center gap-2 ${adminTab === 'groups' ? 'bg-white shadow text-[#062c1e]' : 'text-gray-500'}`}><Users size={16}/> المجموعات</button>
               <button onClick={() => setAdminTab('stats')} className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all flex items-center justify-center gap-2 ${adminTab === 'stats' ? 'bg-[#062c1e] text-[#D4AF37] shadow-md' : 'text-gray-500'}`}><Globe2 size={16}/> الإحصائيات</button>
           </div>
        )}

        {adminTab === 'stats' && currentUser.role === 'ADMIN' ? (
            <div className="animate-in fade-in slide-in-from-right-4">
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-6 pb-4 border-b">
                        <h2 className="font-bold text-lg text-[#062c1e] flex items-center gap-2"><MapPin size={20} className="text-[#D4AF37]"/> توزع المشتركين</h2>
                        <span className="text-xs bg-[#062c1e]/10 text-[#062c1e] px-3 py-1.5 rounded-full font-bold">إجمالي: {users.length}</span>
                    </div>
                    
                    {/* خريطة العالم التفاعلية للمدير (مكبرة ومنسقة) */}
                    <div className="w-full overflow-x-auto bg-[#F4F9F9] rounded-2xl border border-gray-200 shadow-inner p-2 relative mb-6" dir="ltr">
                        <div className="relative w-[1200px] h-[600px] mx-auto bg-no-repeat bg-center" style={{ backgroundImage: 'url("https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg")', backgroundSize: 'contain' }}>
                            {getAdminStats().map(([loc, count]) => {
                                const coords = COUNTRY_COORDS[loc];
                                if (!coords) return null; // لا تظهر الدول التي ليس لها إحداثيات صريحة
                                const percentage = Math.round((count / users.length) * 100);
                                return (
                                    <div key={loc} 
                                         onClick={() => setSelectedLocation(loc)}
                                         className="absolute flex flex-col items-center group cursor-pointer hover:z-50 transition-all hover:scale-110" 
                                         style={{ top: coords.top, left: coords.left, transform: 'translate(-50%, -100%)' }}>
                                        <div className="bg-[#062c1e] text-[#D4AF37] text-[11px] px-2 py-1.5 rounded-lg shadow-xl whitespace-nowrap mb-1 z-10 font-bold border border-[#D4AF37]/50 text-center leading-tight opacity-90 group-hover:opacity-100 transition-opacity" dir="rtl">
                                            {loc} <span className="text-white">({count})</span> <br/> <span className="text-[#E8CA6D]">{percentage}%</span>
                                        </div>
                                        <MapPin size={24} className="text-[#D4AF37] fill-[#062c1e] drop-shadow-md group-hover:text-[#E8CA6D] transition-colors" />
                                    </div>
                                )
                            })}
                        </div>
                        <p className="text-center text-[10px] text-gray-400 mt-2 font-bold" dir="rtl">يمكنك التمرير يميناً ويساراً لرؤية كامل الخريطة. <span className="text-[#062c1e]">اضغط على أي دولة لرؤية مشتركيها.</span></p>
                    </div>

                    {/* قائمة المشتركين عند الضغط على الدولة */}
                    {selectedLocation && (
                        <div className="bg-[#FCFBF7] border-2 border-[#D4AF37]/50 p-4 rounded-xl mb-6 animate-in slide-in-from-bottom-2">
                            <div className="flex justify-between items-center mb-3 pb-2 border-b border-[#D4AF37]/30">
                                <h3 className="font-bold text-[#062c1e] text-lg">مشتركو {selectedLocation}</h3>
                                <button onClick={() => setSelectedLocation(null)} className="bg-gray-200 p-1 rounded-full text-gray-600 hover:bg-red-100 hover:text-red-600 transition-colors"><X size={16} /></button>
                            </div>
                            <div className="max-h-48 overflow-y-auto space-y-2 pr-2">
                                {users.filter(u => u.location === selectedLocation).map((user, idx) => (
                                    <div key={idx} className="flex justify-between items-center bg-white p-3 rounded-lg border border-gray-100 shadow-sm">
                                        <div className="flex items-center gap-2">
                                            <div className="bg-[#062c1e]/10 p-2 rounded-full"><UserIcon size={16} className="text-[#062c1e]" /></div>
                                            <div>
                                                <p className="font-bold text-sm text-[#062c1e]">{user.name}</p>
                                                <p className="text-[10px] text-gray-500">{user.email}</p>
                                            </div>
                                        </div>
                                        <span className="text-[10px] bg-[#D4AF37]/20 text-[#062c1e] px-2 py-1 rounded font-bold">
                                            {user.role === 'ADMIN' ? 'مدير' : user.role === 'SUPERVISOR' ? 'مشرف' : 'عضو'}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* قائمة تفصيلية أسفل الخريطة */}
                    <div className="flex flex-wrap gap-2">
                        {getAdminStats().map(([loc, count]) => {
                            const percentage = Math.round((count / users.length) * 100);
                            return (
                                <span key={loc} onClick={() => setSelectedLocation(loc)} className={`text-xs font-bold px-3 py-1.5 border rounded-lg cursor-pointer transition-colors ${selectedLocation === loc ? 'bg-[#062c1e] text-white border-[#062c1e]' : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'}`}>
                                    {loc}: {percentage}% ({count})
                                </span>
                            )
                        })}
                    </div>
                </div>
            </div>
        ) : (
            <div className="space-y-8 animate-in fade-in">
                <div className="flex gap-4">
                  <button onClick={() => setShowJoinDialog(true)} className="flex-1 py-4 border-2 rounded-2xl text-sm font-bold transition-all shadow-sm" style={{borderColor: theme.accent, color: theme.primary}}>انضمام برمز</button>
                  {isManagement && (
                    <button onClick={() => showToast("سيتم تفعيل ميزة الإضافة قريباً")} className="flex-1 flex justify-center items-center py-4 rounded-2xl text-white text-sm font-bold shadow-md" style={{backgroundColor: theme.primary}}><PlusCircle size={18} className="ml-2" /> مجموعة جديدة</button>
                  )}
                </div>

                <div>
                  <h2 className="font-bold text-lg mb-4 text-[#062c1e] border-b pb-2">مجموعاتي ({myGroups.length})</h2>
                  {myGroups.length === 0 ? <p className="text-center text-gray-400 text-sm">لا توجد مجموعات</p> : (
                    <div className="space-y-4">
                      {myGroups.map(g => {
                        const isSuper = g.members.some(m => m.userId === currentUser.id && m.role === 'SUPERVISOR') || currentUser.role === 'ADMIN';
                        return (
                          <div key={g.id} onClick={() => setActiveGroupId(g.id)} className="p-5 bg-white rounded-2xl shadow-sm border border-gray-100 cursor-pointer relative overflow-hidden">
                            <div className="absolute left-0 top-0 bottom-0 w-1.5" style={{ backgroundColor: theme.accent }}></div>
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="font-bold text-lg text-[#062c1e]">{g.name}</h3>
                              {isSuper && <span className="text-[10px] font-bold px-2 py-1 rounded bg-yellow-50 text-yellow-700 border border-yellow-200">إدارة</span>}
                            </div>
                            <div className="flex justify-between items-center text-sm">
                              <span className="text-gray-500 flex items-center gap-1"><Users size={14}/> {g.members.length}/30</span>
                              <span className="font-bold text-[#D4AF37] flex items-center gap-1"><Trophy size={14}/> {g.completedKhatmas} ختمات</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {otherGroups.length > 0 && (
                  <div>
                    <h2 className="font-bold text-lg mb-4 text-gray-500 border-b pb-2 flex items-center gap-2"><Trophy size={20}/> لوحة الشرف</h2>
                    <div className="space-y-3">
                      {otherGroups.sort((a,b)=>b.completedKhatmas - a.completedKhatmas).map(g => (
                        <div key={g.id} className="p-4 bg-gray-50 rounded-2xl border border-gray-100 flex justify-between items-center opacity-80">
                          <h3 className="font-bold text-gray-600">{g.name}</h3>
                          <span className="font-bold text-[#D4AF37] bg-white px-3 py-1 rounded-full shadow-sm">{g.completedKhatmas} ختمات</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
            </div>
        )}
      </div>

      {showJoinDialog && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 px-4">
              <div className="bg-white p-8 rounded-3xl w-full max-w-sm shadow-2xl">
                  <h3 className="font-bold text-xl mb-6 text-center text-[#062c1e]">الانضمام لمجموعة</h3>
                  <input type="text" placeholder="أدخل رمز الدعوة" value={inviteInput} onChange={(e) => setInviteInput(e.target.value)} className="w-full p-4 rounded-xl border-2 border-gray-200 mb-6 text-center font-bold" />
                  <div className="flex gap-4">
                      <button onClick={() => setShowJoinDialog(false)} className="flex-1 py-3 bg-gray-100 rounded-xl font-bold">إلغاء</button>
                      <button onClick={handleJoin} className="flex-1 py-3 bg-[#062c1e] text-white rounded-xl font-bold">تأكيد</button>
                  </div>
              </div>
          </div>
      )}
    </div>
  );
}
