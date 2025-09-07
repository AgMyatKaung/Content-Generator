
// --- DOM Elements ---
const contentForm = document.getElementById('contentForm');
const generateBtn = document.getElementById('generateBtn');
const outputActions = document.getElementById('outputActions');
const saveBtn = document.getElementById('saveBtn');
const copyBtn = document.getElementById('copyBtn');
const generatedText = document.getElementById('generatedText');
const languageSelector = document.getElementById('language');
const historyContainer = document.getElementById('historyContainer');
const historyPlaceholder = document.getElementById('historyPlaceholder');
const viewModal = document.getElementById('viewModal');
const viewModalBackdrop = document.getElementById('viewModalBackdrop');
const viewModalTitle = document.getElementById('viewModalTitle');
const viewModalContent = document.getElementById('viewModalContent');
const closeViewModalBtn = document.getElementById('closeViewModalBtn');
const placeholder = document.getElementById('placeholder');
const loader = document.getElementById('loader');
const messageBox = document.getElementById('messageBox');
const messageText = document.getElementById('messageText');
const darkModeToggle = document.getElementById('darkModeToggle');
const sunIcon = document.querySelector('#darkModeToggle [data-lucide="sun"]');
const moonIcon = document.querySelector('#darkModeToggle [data-lucide="moon"]');

// --- Theme Management ---
function applyTheme(theme) {
    if (theme === 'dark') {
        document.documentElement.classList.add('dark');
        sunIcon.classList.remove('hidden');
        moonIcon.classList.add('hidden');
    } else {
        document.documentElement.classList.remove('dark');
        sunIcon.classList.add('hidden');
        moonIcon.classList.remove('hidden');
    }
}

function toggleTheme() {
    const currentTheme = localStorage.getItem('color-theme') || (document.documentElement.classList.contains('dark') ? 'dark' : 'light');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('color-theme', newTheme);
    applyTheme(newTheme);
}

// --- I18N Translations & Setup ---
const translations = {
    "English": {
        "formTitle": "Controls", "languageLabel": "Language", "contentTypeLabel": "Content Type", "toneLabel": "Tone",
        "maxLengthLabel": "Max Length (Words)", "titleLabel": "Title", "subjectLabel": "Subject / Topic", "descriptionLabel": "Description / Prompt",
        "generateBtnText": "Generate Content", "generatingBtnText": "Generating...", "outputTitle": "Generated Content",
        "historyTitle": "History", "historyPlaceholder": "No saved content yet. Generate and save something!",
        "titlePlaceholder": "e.g., The Future of Renewable Energy", "subjectPlaceholder": "e.g., Solar Power, Wind Turbines",
        "descriptionPlaceholder": "Provide details: points to cover, tone, audience...",
        "placeholderMain": "Your generated content will appear here.", "placeholderSub": "",
        "adviceTitle": "Advice for Better Results",
        "advice1": "<strong>Be Specific:</strong> The more detailed your prompt, the better the output. Instead of \"write about business,\" try \"write a blog post for new entrepreneurs on the top 3 marketing strategies.\"",
        "advice2": "<strong>Define Audience & Tone:</strong> Who are you writing for? Example: \"Write in a friendly, encouraging tone for an audience of college students.\"",
        "advice3": "<strong>Provide Context:</strong> Give the AI a role. Example: \"Act as a seasoned travel writer and describe the beauty of Bagan's temples at sunrise.\"",
        "advice4": "<strong>Use Keywords:</strong> Include important keywords you want in the text to improve relevance and SEO.",
        "advice5": "<strong>Experiment:</strong> Don't be afraid to try different content types, tones, and lengths. You might be surprised by what the AI can generate!",
        "contentTypes": ["Blog Post", "Email", "Social Media Post", "Advertisement", "Video Script", "Product Description"],
        "tones": ["Formal", "Casual", "Professional", "Friendly", "Humorous", "Inspirational"],
        "copySuccess": "Content copied to clipboard!", "copyError": "Failed to copy content.",
        "saveSuccess": "Content saved successfully!", "saveError": "Failed to save content.",
        "deleteSuccess": "Content deleted!", "deleteError": "Failed to delete content.",
        "fillFields": "Please fill in the Subject and Description fields."
    },
    "Burmese (Myanmar)": {
        "formTitle": "ထိန်းချုပ်မှုများ", "languageLabel": "ဘာသာစကား", "contentTypeLabel": "အကြောင်းအရာ အမျိုးအစား", "toneLabel": "လေသံ",
        "maxLengthLabel": "အများဆုံး စကားလုံး (လုံးရေ)", "titleLabel": "ခေါင်းစဉ်", "subjectLabel": "ဘာသာရပ်", "descriptionLabel": "အသေးစိတ်ဖော်ပြချက်",
        "generateBtnText": "အကြောင်းအရာ ဖန်တီးပါ", "generatingBtnText": "ဖန်တီးနေသည်...", "outputTitle": "ဖန်တီးထားသော အကြောင်းအရာ",
        "historyTitle": "မှတ်တမ်း", "historyPlaceholder": "သိမ်းဆည်းထားသော အကြောင်းအရာ မရှိသေးပါ။",
        "titlePlaceholder": "ဥပမာ၊ ပြန်လည်ပြည့်ဖြိုးမြဲစွမ်းအင်၏ အနာဂတ်", "subjectPlaceholder": "ဥပမာ၊ ဆိုလာစွမ်းအင်၊ လေတာဘိုင်များ",
        "descriptionPlaceholder": "အသေးစိတ်များ- ထည့်သွင်းရမည့်အချက်များ၊ လေသံ၊ ပရိသတ်...",
        "placeholderMain": "သင်၏ ဖန်တီးထားသော အကြောင်းအရာသည် ဤနေရာတွင် ပေါ်လာပါမည်။", "placeholderSub": "",
        "adviceTitle": "ပိုမိုကောင်းမွန်သောရလဒ်များအတွက် အကြံပြုချက်",
        "advice1": "<strong>တိကျပါစေ-</strong> သင်၏တောင်းဆိုချက်သည် အသေးစိတ်ကျလေ၊ ရလဒ်ကောင်းလေဖြစ်သည်။ \"စီးပွားရေးအကြောင်းရေးပါ\" အစား \"စီးပွားရေးလုပ်ငန်းငယ်များအတွက် ထိပ်တန်းစျေးကွက်ရှာဖွေရေးဗျူဟာ ၃ ခုအကြောင်း ဘလော့ဂ်ပို့စ်တစ်ခုရေးပါ\" ဟုကြိုးစားပါ။",
        "advice2": "<strong>ပရိသတ်နှင့် လေသံကို သတ်မှတ်ပါ-</strong> သင်သည် မည်သူ့အတွက် ရေးနေသနည်း။ ဥပမာ- \"ကောလိပ်ကျောင်းသားများအတွက် ဖော်ရွေပြီး အားပေးသည့်လေသံဖြင့် ရေးသားပါ။\"",
        "advice3": "<strong>ဆက်စပ်အကြောင်းအရာကို ပေးပါ-</strong> AI အား အခန်းကဏ္ဍတစ်ခုပေးပါ။ ဥပမာ- \"အတွေ့အကြုံရင့်ခရီးသွားစာရေးဆရာတစ်ဦးအဖြစ် ဆောင်ရွက်ပြီး နေထွက်ချိန်တွင် ပုဂံဘုရားပုထိုးများ၏ အလှကို ဖော်ပြပါ။\"",
        "advice4": "<strong>သော့ချက်စကားလုံးများသုံးပါ-</strong> ဆက်စပ်မှုနှင့် SEO ပိုမိုကောင်းမွန်စေရန် သင်ထည့်သွင်းလိုသော အရေးကြီးသောသော့ချက်စကားလုံးများကို ထည့်သွင်းပါ။",
        "advice5": "<strong>စမ်းသပ်ပါ-</strong> ကွဲပြားခြားနားသောအကြောင်းအရာအမျိုးအစားများ၊ လေသံများနှင့် အရှည်များကိုစမ်းသပ်ရန်မကြောက်ပါနှင့်။ AI က ဘာတွေထုတ်ပေးနိုင်လဲဆိုတာ သင်အံ့သြသွားနိုင်ပါတယ်။",
        "contentTypes": ["ဘလော့ဂ်ပို့စ်", "အီးမေးလ်", "ဆိုရှယ်မီဒီယာ ပို့စ်", "ကြော်ငြာ", "ဗီဒီယိုဇာတ်ညွှန်း", "ကုန်ပစ္စည်း ဖော်ပြချက်"],
        "tones": ["တရားဝင်", "ပေါ့ပေါ့ပါးပါး", "ကျွမ်းကျင်ပိုင်နိုင်သော", "ဖော်ရွေသော", "ဟာသဉာဏ်ရွှင်သော", "စိတ်အားထက်သန်စေသော"],
        "copySuccess": "Clipboard သို့ ကူးယူပြီးပါပြီ!", "copyError": "ကူးယူရန် မအောင်မြင်ပါ။",
        "saveSuccess": "အကြောင်းအရာကို အောင်မြင်စွာ သိမ်းဆည်းပြီးပါပြီ!", "saveError": "သိမ်းဆည်းရန် မအောင်မြင်ပါ။",
        "deleteSuccess": "အကြောင်းအရာကို ဖျက်လိုက်ပါပြီ!", "deleteError": "ဖျက်ရန် မအောင်မြင်ပါ။",
        "fillFields": "ကျေးဇူးပြု၍ ဘာသာရပ်နှင့် အသေးစိတ်ဖော်ပြချက်ကို ဖြည့်စွက်ပါ။"
    }
};

function setLanguage(lang) {
    const t = translations[lang];
    document.querySelectorAll('[data-i18n-key]').forEach(el => {
        const key = el.dataset.i18nKey;
        if (t[key]) {
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') el.placeholder = t[key];
            else if(el.classList.contains('advice-content')) el.innerHTML = t[key];
            else el.textContent = t[key];
        }
    });
    const contentTypeSelect = document.getElementById('contentType');
    const toneSelect = document.getElementById('tone');
    contentTypeSelect.innerHTML = t.contentTypes.map(o => `<option>${o}</option>`).join('');
    toneSelect.innerHTML = t.tones.map(o => `<option>${o}</option>`).join('');
    const elementsToStyle = document.querySelectorAll('[data-i18n-key], .advice-content');
    elementsToStyle.forEach(el => {
        if (lang === 'Burmese (Myanmar)') el.classList.add('font-myanmar');
        else el.classList.remove('font-myanmar');
    });
}

// --- Firebase History ---
function renderHistory() {
    if (typeof firebase === 'undefined') return; // Don't run if Firebase isn't configured
    const database = firebase.database();
    const historyRef = database.ref('history').orderByChild('createdAt');
    historyRef.on('value', (snapshot) => {
        historyContainer.innerHTML = '';
        if (snapshot.exists()) {
            historyPlaceholder.style.display = 'none';
            const history = [];
            snapshot.forEach((childSnapshot) => {
                history.push({ id: childSnapshot.key, ...childSnapshot.val() });
            });
            history.reverse().forEach(item => renderHistoryItem(item));
        } else {
            historyPlaceholder.style.display = 'block';
        }
    });
}

// --- UI Functions ---
function showMessage(message, isError = false) {
    messageText.textContent = message;
    messageBox.classList.remove('bg-green-500', 'bg-red-500', 'translate-x-[120%]');
    messageBox.classList.add(isError ? 'bg-red-500' : 'bg-green-500', 'translate-x-0');
    setTimeout(() => { messageBox.classList.add('translate-x-[120%]'); }, 3000);
}

function renderHistoryItem(data) {
    const item = document.createElement('div');
    item.className = 'p-3 bg-slate-50 rounded-lg flex justify-between items-center border hover:bg-slate-100 transition dark:bg-slate-800 dark:border-slate-700 dark:hover:bg-slate-700';
    const langClass = data.language.includes('Burmese') ? 'font-myanmar' : '';

    item.innerHTML = `
        <div class="flex-grow cursor-pointer" data-id="${data.id}">
            <p class="font-semibold text-slate-800 dark:text-slate-200 ${langClass}">${data.title || 'Untitled'}</p>
            <p class="text-xs text-slate-500 dark:text-slate-400">${new Date(data.createdAt).toLocaleString()}</p>
        </div>
        <div class="flex items-center space-x-1">
            <button class="view-btn p-2 rounded-md hover:bg-slate-200 dark:hover:bg-slate-600" title="View"><i data-lucide="eye" class="h-4 w-4 text-slate-600 dark:text-slate-300"></i></button>
            <button class="delete-btn p-2 rounded-md hover:bg-red-100 dark:hover:bg-red-900/50" title="Delete"><i data-lucide="trash-2" class="h-4 w-4 text-red-500"></i></button>
        </div>
    `;
    item.querySelector('.flex-grow').addEventListener('click', () => showViewModal(data));
    item.querySelector('.view-btn').addEventListener('click', () => showViewModal(data));
    item.querySelector('.delete-btn').addEventListener('click', () => {
        const database = firebase.database();
        database.ref('history/' + data.id).remove()
            .then(() => showMessage(translations[languageSelector.value].deleteSuccess))
            .catch((error) => showMessage(translations[languageSelector.value].deleteError, true));
    });
    historyContainer.appendChild(item);
    lucide.createIcons();
}

function showViewModal(data) {
    viewModalTitle.textContent = data.title || 'Untitled';
    viewModalContent.textContent = data.content;
    viewModalTitle.classList.toggle('font-myanmar', data.language.includes('Burmese'));
    viewModalContent.classList.toggle('font-myanmar', data.language.includes('Burmese'));
    viewModal.classList.add('show');
    viewModalBackdrop.classList.add('show');
}

function hideViewModal() {
    viewModal.classList.remove('show');
    viewModalBackdrop.classList.remove('show');
}

// --- Event Listeners ---
languageSelector.addEventListener('change', (e) => setLanguage(e.target.value));
darkModeToggle.addEventListener('click', toggleTheme);

contentForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(contentForm);
    const data = Object.fromEntries(formData.entries());

    if (!data.subject || !data.description) {
        showMessage(translations[languageSelector.value].fillFields, true);
        return;
    }

    let prompt = `Act as an expert content creator. Generate a "${data.contentType}" in ${data.language}. The tone should be ${data.tone}.`;
    if (data.maxLength) prompt += ` The content should be approximately ${data.maxLength} words.`;
    prompt += ` The title is: "${data.title}". The main subject is: "${data.subject}".
    Here is a detailed description: "${data.description}".
    Ensure the output is well-structured, engaging, and directly addresses the prompt.
    The language of your response MUST be ${data.language}.`;

    placeholder.classList.add('hidden');
    loader.classList.remove('hidden');
    generatedText.textContent = '';
    outputActions.classList.add('hidden');
    generateBtn.disabled = true;

    const t = translations[languageSelector.value];
    generateBtn.innerHTML = `<svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg><span class="${languageSelector.value === 'Burmese (Myanmar)' ? 'font-myanmar' : ''}">${t.generatingBtnText}</span>`;
    
    try {
        const apiKey = "AIzaSyChYUdEU30E7mUpVlJ4cCfQU94nsX9EvFg";
        const apiUrl = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
        const payload = { contents: [{ parts: [{ text: prompt }] }] };
        const response = await fetch(apiUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
        if (!response.ok) {
             const errorBody = await response.json();
             throw new Error(errorBody.error.message || `API Error: ${response.status}`);
        }
        const result = await response.json();
        const text = result.candidates?.[0]?.content?.parts?.[0]?.text;
        if (!text) throw new Error("No content generated.");
        
        generatedText.textContent = text;
        generatedText.dataset.fullContent = text;
        generatedText.dataset.title = data.title;
        generatedText.dataset.language = data.language;
        generatedText.classList.toggle('font-myanmar', data.language.includes('Burmese'));
        outputActions.classList.remove('hidden');
        outputActions.classList.add('flex');
    } catch (error) {
        console.error('Error:', error);
        generatedText.textContent = `An error occurred: ${error.message}`;
        showMessage(error.message, true);
    } finally {
        loader.classList.add('hidden');
        generateBtn.disabled = false;
        generateBtn.innerHTML = `<i data-lucide="sparkles" class="mr-2 h-5 w-5"></i><span id="generateBtnText" data-i18n-key="generateBtnText">${t.generateBtnText}</span>`;
        lucide.createIcons();
    }
});

copyBtn.addEventListener('click', () => {
    const textToCopy = generatedText.dataset.fullContent;
    navigator.clipboard.writeText(textToCopy).then(() => {
        showMessage(translations[languageSelector.value].copySuccess);
    }, () => {
        showMessage(translations[languageSelector.value].copyError, true);
    });
});

saveBtn.addEventListener('click', () => {
    if (typeof firebase === 'undefined') {
         showMessage('Firebase is not configured. Cannot save history.', true);
         return;
    }
    const database = firebase.database();
    const newHistoryRef = database.ref('history').push();
    const contentToSave = {
        title: generatedText.dataset.title || 'Untitled',
        content: generatedText.dataset.fullContent,
        language: generatedText.dataset.language,
        createdAt: new Date().toISOString()
    };
    newHistoryRef.set(contentToSave)
        .then(() => showMessage(translations[languageSelector.value].saveSuccess))
        .catch((error) => showMessage(translations[languageSelector.value].saveError, true));
});

closeViewModalBtn.addEventListener('click', hideViewModal);
viewModalBackdrop.addEventListener('click', hideViewModal);

// --- Initial Load & PWA Registration ---
document.addEventListener('DOMContentLoaded', () => {
    const initialTheme = localStorage.getItem('color-theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    applyTheme(initialTheme);

    setLanguage(languageSelector.value);
    if (typeof firebase !== 'undefined') {
        renderHistory();
    }
    lucide.createIcons();
    
    const detailsElement = document.querySelector('details');
    detailsElement.addEventListener('toggle', () => {
        const summaryIcon = detailsElement.querySelector('summary .lucide-chevron-down');
        if (summaryIcon) {
            summaryIcon.style.transform = detailsElement.open ? 'rotate(180deg)' : 'rotate(0deg)';
        }
    });
    
    // Register Service Worker
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('./service-worker.js').then(registration => {
                console.log('ServiceWorker registration successful with scope: ', registration.scope);
            }, err => {
                console.log('ServiceWorker registration failed: ', err);
            });
        });
    }
});
