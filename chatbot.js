// ============================================
// دستیار راهنمای کاربر (FAQ)
// ============================================

const FAQ = [
    {
        question: "ساخت کلاس",
        answer: "۱. روی دکمه «افزودن کلاس جدید» در صفحه اصلی کلیک کنید.\n۲. نام کلاس و نام درس را وارد کنید.\n۳. دکمه «ساختن کلاس» را بزنید.\n۴. سپس روی دکمه «مدیریت» کلاس کلیک کنید تا دانش‌آموزان را اضافه کنید."
    },
    {
        question: "افزودن دانش‌آموز",
        answer: "۱. ابتدا یک کلاس را انتخاب کنید.\n۲. روی دکمه «مدیریت» کلیک کنید.\n۳. نام دانش‌آموز را وارد کنید و دکمه «افزودن دانش‌آموز» را بزنید.\n۴. سیستم به صورت خودکار یک رمز اختصاصی برای او تولید می‌کند.\n\nنکته: می‌توانید چند دانش‌آموز را با هم و به صورت گروهی اضافه کنید."
    },
    {
        question: "ثبت نمره",
        answer: "۱. روی دکمه «نمرات» کلاس کلیک کنید.\n۲. در صفحه مدیریت نمرات، دانش‌آموز را انتخاب کنید.\n۳. نمره را وارد کنید (۰ تا ۲۰) و دکمه «ثبت نمره» را بزنید.\n۴. سیستم به صورت خودکار قبول یا مردود بودن را نشان می‌دهد."
    },
    {
        question: "حضور و غیاب",
        answer: "۱. روی دکمه «حضور» کلاس کلیک کنید.\n۲. تاریخ را انتخاب کنید.\n۳. برای هر دانش‌آموز، یکی از سه دکمه را بزنید:\n   • ✅ حاضر\n   • ❌ غایب\n   • 🟡 مرخصی\n۴. برای تشویق و تنبیه، از دکمه‌های ➕ و ➖ استفاده کنید."
    },
    {
        question: "گزارش‌گیری",
        answer: "سه نوع گزارش داریم:\n\n• 📆 گزارش روزانه: بر اساس تاریخ انتخابی\n• 📊 گزارش ماهانه: بر اساس ماه انتخابی\n• 📋 گزارش کل: تمام دوره\n\nهمچنین می‌توانید گزارش را با دکمه «چاپ» روی کاغذ بگیرید."
    },
    {
        question: "پشتیبان",
        answer: "در پنل معلم یا مدیر:\n\n📥 گرفتن پشتیبان:\n۱. روی دکمه «تهیه نسخه پشتیبان» بزنید.\n۲. یک فایل JSON ذخیره می‌شود.\n\n📤 بازیابی:\n۱. روی «بازیابی نسخه پشتیبان» بزنید.\n۲. فایل ذخیره‌شده را انتخاب کنید."
    },
    {
        question: "رمز معلم",
        answer: "رمز معلم توسط مدیر مدرسه تعیین می‌شود. برای دریافت رمز، از مدیر مدرسه بخواهید شما را در سامانه بسازد."
    },
    {
        question: "تغییر رمز دانش‌آموز",
        answer: "۱. وارد پنل معلم شوید.\n۲. یک کلاس را انتخاب کنید و روی «مدیریت» بزنید.\n۳. روی دکمه «تولید رمز جدید برای همه» کلیک کنید.\n۴. سیستم برای همه دانش‌آموزان رمز جدید تولید می‌کند."
    },
    {
        question: "حذف کلاس",
        answer: "۱. وارد پنل معلم شوید.\n۲. کنار کلاس مورد نظر، روی دکمه «حذف» (🗑️) بزنید.\n۳. تأیید کنید.\n\n⚠️ توجه: با حذف کلاس، تمام دانش‌آموزان و نمرات آن کلاس هم حذف می‌شوند."
    },
    {
        question: "اینترنت",
        answer: "خیر. سامانه کاملاً آفلاین کار می‌کند و نیازی به اینترنت ندارد. تمام داده‌ها روی همان دستگاه ذخیره می‌شوند.\n\nبرای انتقال داده‌ها به دستگاه دیگر، از فایل پشتیبان JSON استفاده کنید."
    },
    {
        question: "ورود دانش‌آموز",
        answer: "۱. دانش‌آموز روی نقش «دانش‌آموز» بزند.\n۲. نام کلاس خود را وارد کند.\n۳. نام و نام خانوادگی کامل خود را بنویسد.\n۴. رمزی که معلم به او داده را وارد کند.\n۵. روی «ورود به داشبورد» بزند."
    },
    {
        question: "چاپ گزارش",
        answer: "۱. در صفحه گزارش، دکمه «چاپ گزارش» را بزنید.\n۲. پیش‌نمایش چاپ باز می‌شود.\n۳. اگر چاپگر دارید، چاپ کنید.\n۴. اگر ندارید، از منوی چاپ گزینه «Save as PDF» را انتخاب کنید تا فایل PDF بگیرید."
    },
    {
        question: "ورود معلم",
        answer: "۱. روی نقش «معلم» بزنید.\n۲. نام کاربری که مدیر به شما داده را وارد کنید.\n۳. رمز عبور را وارد کنید.\n۴. روی «ورود به داشبورد» بزنید.\n\nاگر رمز ندارید، از مدیر مدرسه بخواهید شما را در سامانه بسازد."
    },
    {
        question: "ورود مدیر",
        answer: "۱. روی نقش «مدیر» بزنید.\n۲. کد اشتراک سالانه را وارد کنید و روی «فعال‌سازی اشتراک» بزنید.\n۳. نام کاربری و رمز مدیر را وارد کنید.\n۴. روی «ورود به داشبورد» بزنید."
    },
    {
        question: "افزودن رویداد",
        answer: "۱. در پنل معلم، روی دکمه «رویدادها» بزنید.\n۲. عنوان رویداد را وارد کنید.\n۳. تاریخ را انتخاب کنید.\n۴. توضیحات را بنویسید.\n۵. دکمه «ثبت رویداد» را بزنید."
    },
    {
        question: "ثبت تکلیف",
        answer: "۱. در پنل معلم، روی دکمه «تکلیف و آزمون» بزنید.\n۲. عنوان تکلیف را وارد کنید.\n۳. تاریخ تحویل را انتخاب کنید.\n۴. نام کلاس را وارد کنید.\n۵. توضیحات را بنویسید و «ثبت تکلیف» را بزنید."
    }
];

// ============================================
// توابع دستیار
// ============================================

function normalizeText(text) {
    return String(text).trim().toLowerCase()
        .replace(/[۰-۹]/g, d => String.fromCharCode(d.charCodeAt(0) - 1728))
        .replace(/[٠-٩]/g, d => String.fromCharCode(d.charCodeAt(0) - 1584))
        .replace(/[يى]/g, 'ی')
        .replace(/ك/g, 'ک')
        .replace(/\u200c/g, ' ')
        .replace(/[؟?!.,،؛:؛]/g, '')
        .replace(/\s+/g, ' ')
        .trim();
}

function getAnswer(question) {
    const q = normalizeText(question);
    
    if (!q || q.length < 2) {
        return "لطفاً سوال خود را کامل‌تر بنویسید.";
    }
    
    // مرحله ۱: جستجوی دقیق
    for (let i = 0; i < FAQ.length; i++) {
        const faqQ = normalizeText(FAQ[i].question);
        if (faqQ === q || faqQ.includes(q) || q.includes(faqQ)) {
            return FAQ[i].answer;
        }
    }
    
    // مرحله ۲: جستجوی کلمه‌ای
    const words = q.split(/\s+/).filter(w => w.length > 1);
    let bestMatch = null;
    let bestScore = 0;
    
    for (let i = 0; i < FAQ.length; i++) {
        const faqQ = normalizeText(FAQ[i].question);
        const faqWords = faqQ.split(/\s+/);
        let score = 0;
        
        for (const w of words) {
            for (const fw of faqWords) {
                if (fw === w) {
                    score += 3;
                } else if (fw.includes(w) || w.includes(fw)) {
                    score += 1;
                }
            }
        }
        
        if (score > bestScore) {
            bestScore = score;
            bestMatch = FAQ[i];
        }
    }
    
    if (bestMatch && bestScore >= 1) {
        return bestMatch.answer;
    }
    
    return "متأسفانه پاسخ سوال شما را پیدا نکردم.\n\nموضوعات پیشنهادی:\n• ساخت کلاس\n• افزودن دانش‌آموز\n• ثبت نمره\n• حضور و غیاب\n• گزارش‌گیری\n• پشتیبان\n• ورود دانش‌آموز\n• چاپ گزارش";
}

// ============================================
// رابط کاربری دستیار
// ============================================

function openChatbot() {
    const existing = document.getElementById('chatbotBox');
    if (existing) {
        existing.remove();
        return;
    }
    
    const box = document.createElement('div');
    box.id = 'chatbotBox';
    box.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 320px;
        max-width: calc(100vw - 40px);
        max-height: 500px;
        background: #161b22;
        border: 2px solid #58a6ff;
        border-radius: 16px;
        display: flex;
        flex-direction: column;
        z-index: 9999;
        box-shadow: 0 10px 40px rgba(0,0,0,0.6);
        overflow: hidden;
    `;
    
    box.innerHTML = `
        <div style="background:#1f6feb; color:white; padding:10px 15px; display:flex; justify-content:space-between; align-items:center;">
            <strong style="font-size:14px;">💬 راهنمای کاربر</strong>
            <button onclick="document.getElementById('chatbotBox').remove()" style="background:transparent; border:none; color:white; cursor:pointer; font-size:18px; padding:0; width:auto;">✕</button>
        </div>
        <div id="chatMessages" style="flex:1; overflow-y:auto; padding:10px; font-size:13px; line-height:1.7;"></div>
        <div style="padding:8px; border-top:1px solid #30363d; display:flex; gap:5px;">
            <input type="text" id="chatInput" placeholder="سوال خود را بنویسید..." 
                style="flex:1; padding:8px; background:#0d1117; color:#c9d1d9; border:1px solid #30363d; border-radius:6px; font-size:12px;"
                onkeypress="if(event.key==='Enter') sendChatMessage()">
            <button onclick="sendChatMessage()" style="width:auto; padding:8px 12px; background:#238636; color:white; border:none; border-radius:6px; font-size:12px; cursor:pointer;">📤</button>
        </div>
    `;
    
    document.body.appendChild(box);
    document.getElementById('chatInput').focus();
    
    addChatMessage('bot', 'سلام! 👋 من راهنمای سامانه هستم. هر سوالی داری بپرس.');
    addSuggestedQuestions();
}

function addChatMessage(sender, text) {
    const container = document.getElementById('chatMessages');
    if (!container) return;
    
    const msg = document.createElement('div');
    msg.style.cssText = `
        margin-bottom: 8px;
        padding: 8px 12px;
        border-radius: 12px;
        max-width: 90%;
        word-wrap: break-word;
        white-space: pre-line;
        ${sender === 'bot' 
            ? 'background:#0d1117; color:#c9d1d9; border-right:3px solid #58a6ff;' 
            : 'background:#238636; color:white; margin-right:auto; margin-left:0; border-left:3px solid #2ea043;'}
    `;
    msg.innerText = text;
    container.appendChild(msg);
    container.scrollTop = container.scrollHeight;
}

function addSuggestedQuestions() {
    const container = document.getElementById('chatMessages');
    if (!container) return;
    
    const suggestions = ['ساخت کلاس', 'افزودن دانش‌آموز', 'ثبت نمره', 'پشتیبان'];
    
    const box = document.createElement('div');
    box.style.cssText = 'margin: 8px 0; display:flex; flex-wrap:wrap; gap:5px;';
    
    suggestions.forEach(s => {
        const btn = document.createElement('button');
        btn.innerText = s;
        btn.style.cssText = 'background:#21262d; color:#58a6ff; border:1px solid #30363d; padding:4px 10px; border-radius:15px; font-size:11px; cursor:pointer; width:auto; margin:0;';
        btn.onclick = () => {
            document.getElementById('chatInput').value = s;
            sendChatMessage();
        };
        box.appendChild(btn);
    });
    
    container.appendChild(box);
    container.scrollTop = container.scrollHeight;
}

function sendChatMessage() {
    const input = document.getElementById('chatInput');
    const text = input.value.trim();
    if (!text) return;
    
    addChatMessage('user', text);
    input.value = '';
    
    setTimeout(() => {
        const answer = getAnswer(text);
        addChatMessage('bot', answer);
    }, 300);
}