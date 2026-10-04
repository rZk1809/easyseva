import type { Language } from './types';

type TranslationMap = Record<string, Record<Language, string>>;

export const t: TranslationMap = {
  // Navigation
  'nav.home': { en: 'Home', ta: 'முகப்பு', hi: 'होम' },
  'nav.services': { en: 'Services', ta: 'சேவைகள்', hi: 'सेवाएं' },
  'nav.applications': { en: 'My Applications', ta: 'என் விண்ணப்பங்கள்', hi: 'मेरे आवेदन' },
  'nav.help': { en: 'Help', ta: 'உதவி', hi: 'सहायता' },
  'nav.profile': { en: 'Profile', ta: 'சுயவிவரம்', hi: 'प्रोफाइल' },
  'nav.track': { en: 'Track Application', ta: 'விண்ணப்பம் கண்காணி', hi: 'आवेदन ट्रैक करें' },
  'nav.notifications': { en: 'Notifications', ta: 'அறிவிப்புகள்', hi: 'सूचनाएं' },
  'nav.accessibility': { en: 'Accessibility', ta: 'அணுகல்தன்மை', hi: 'अभिगम्यता' },

  // Common
  'common.continue': { en: 'Continue', ta: 'தொடர்', hi: 'जारी रखें' },
  'common.back': { en: 'Back', ta: 'பின்', hi: 'वापस' },
  'common.save': { en: 'Save', ta: 'சேமி', hi: 'सहेजें' },
  'common.cancel': { en: 'Cancel', ta: 'ரத்துசெய்', hi: 'रद्द करें' },
  'common.submit': { en: 'Submit', ta: 'சமர்ப்பி', hi: 'जमा करें' },
  'common.edit': { en: 'Edit', ta: 'திருத்து', hi: 'संपादित करें' },
  'common.loading': { en: 'Loading…', ta: 'ஏற்றுகிறது…', hi: 'लोड हो रहा है…' },
  'common.required': { en: 'Required', ta: 'தேவை', hi: 'आवश्यक' },
  'common.optional': { en: 'Optional', ta: 'விருப்பம்', hi: 'वैकल्पिक' },
  'common.yes': { en: 'Yes', ta: 'ஆம்', hi: 'हाँ' },
  'common.no': { en: 'No', ta: 'இல்லை', hi: 'नहीं' },
  'common.notsure': { en: 'Not Sure', ta: 'தெரியவில்லை', hi: 'निश्चित नहीं' },
  'common.saving': { en: 'Saving…', ta: 'சேமிக்கிறது…', hi: 'सहेज रहे हैं…' },
  'common.saved': { en: 'Changes saved', ta: 'மாற்றங்கள் சேமிக்கப்பட்டன', hi: 'परिवर्तन सहेजे गए' },
  'common.tryAgain': { en: 'Try Again', ta: 'மீண்டும் முயற்சி', hi: 'पुनः प्रयास करें' },
  'common.download': { en: 'Download', ta: 'பதிவிறக்கம்', hi: 'डाउनलोड' },

  // Landing
  'landing.hero': { en: 'Government services, made easier.', ta: 'அரசு சேவைகள், எளிமையாக.', hi: 'सरकारी सेवाएं, आसान बनाई गईं।' },
  'landing.subHero': { en: 'Find, apply, and track government services in your language, at your pace.', ta: 'உங்கள் மொழியில், உங்கள் வேகத்தில் அரசு சேவைகளை கண்டுபிடிக்கவும், விண்ணப்பிக்கவும், கண்காணிக்கவும்.', hi: 'अपनी भाषा में, अपनी गति से सरकारी सेवाएं खोजें, आवेदन करें और ट्रैक करें।' },
  'landing.getStarted': { en: 'Get Started', ta: 'தொடங்குங்கள்', hi: 'शुरू करें' },
  'landing.trackApp': { en: 'Track Existing Application', ta: 'தற்போதைய விண்ணப்பத்தை கண்காணி', hi: 'मौजूदा आवेदन ट्रैक करें' },
  'landing.chooseLanguage': { en: 'Choose your language', ta: 'உங்கள் மொழியை தேர்வு செய்யுங்கள்', hi: 'अपनी भाषा चुनें' },

  // Home
  'home.greeting': { en: 'How can we help you today?', ta: 'இன்று நாங்கள் உங்களுக்கு எவ்வாறு உதவலாம்?', hi: 'आज हम आपकी कैसे मदद कर सकते हैं?' },
  'home.subGreeting': { en: 'Choose what you need. We\'ll guide you step by step.', ta: 'உங்களுக்கு தேவையானதை தேர்வு செய்யுங்கள். நாங்கள் படிப்படியாக வழிகாட்டுவோம்.', hi: 'आपको क्या चाहिए वह चुनें। हम आपको चरण दर चरण मार्गदर्शन करेंगे।' },
  'home.recentApps': { en: 'Recent Applications', ta: 'சமீபத்திய விண்ணப்பங்கள்', hi: 'हाल के आवेदन' },
  'home.noApps': { en: 'No applications yet', ta: 'இன்னும் விண்ணப்பங்கள் இல்லை', hi: 'अभी तक कोई आवेदन नहीं' },
  'home.exploreServices': { en: 'Explore Services', ta: 'சேவைகளை ஆராயுங்கள்', hi: 'सेवाएं देखें' },

  // Application status
  'status.draft': { en: 'Draft', ta: 'வரைவு', hi: 'ड्राफ्ट' },
  'status.submitted': { en: 'Submitted', ta: 'சமர்ப்பிக்கப்பட்டது', hi: 'जमा किया गया' },
  'status.under_review': { en: 'Under Review', ta: 'மதிப்பாய்வில் உள்ளது', hi: 'समीक्षाधीन' },
  'status.action_required': { en: 'Action Required', ta: 'நடவடிக்கை தேவை', hi: 'कार्रवाई आवश्यक' },
  'status.approved': { en: 'Approved', ta: 'அங்கீகரிக்கப்பட்டது', hi: 'स्वीकृत' },
  'status.rejected': { en: 'Rejected', ta: 'நிராகரிக்கப்பட்டது', hi: 'अस्वीकृत' },

  // Accessibility
  'a11y.title': { en: 'Accessibility Settings', ta: 'அணுகல்தன்மை அமைப்புகள்', hi: 'अभिगम्यता सेटिंग्स' },
  'a11y.textSize': { en: 'Text Size', ta: 'உரை அளவு', hi: 'टेक्स्ट आकार' },
  'a11y.contrast': { en: 'Contrast', ta: 'வேறுபாடு', hi: 'कंट्रास्ट' },
  'a11y.language': { en: 'Language', ta: 'மொழி', hi: 'भाषा' },
};

export function tr(key: string, lang: Language, vars?: Record<string, string | number>): string {
  const entry = t[key];
  if (!entry) return key;
  let text = entry[lang] ?? entry.en;
  if (vars) {
    Object.entries(vars).forEach(([k, v]) => {
      text = text.replace(`{${k}}`, String(v));
    });
  }
  return text;
}

/* ------------------------------------------------------------------ */
/*  Translate-by-source dictionary.                                   */
/*  trx(englishText, lang) returns the Tamil/Hindi translation of an  */
/*  exact English string, or the English text if no entry exists.     */
/*  This lets every page and component be translated without inventing */
/*  a key per string.                                                 */
/* ------------------------------------------------------------------ */
type Pair = { ta: string; hi: string };

export const dict: Record<string, Pair> = {
  // ---- Generic words / fragments ----
  'services': { ta: 'சேவைகள்', hi: 'सेवाएं' },
  'documents': { ta: 'ஆவணங்கள்', hi: 'दस्तावेज़' },
  'documents needed': { ta: 'ஆவணங்கள் தேவை', hi: 'दस्तावेज़ आवश्यक' },
  'min': { ta: 'நிமிடம்', hi: 'मिनट' },
  'View details': { ta: 'விவரங்களைக் காண்க', hi: 'विवरण देखें' },
  'Continue': { ta: 'தொடர்', hi: 'जारी रखें' },
  'Back': { ta: 'பின்', hi: 'वापस' },
  'View all': { ta: 'அனைத்தையும் காண்க', hi: 'सभी देखें' },
  'Get Help': { ta: 'உதவி பெறு', hi: 'मदद लें' },
  'Sign in': { ta: 'உள்நுழை', hi: 'साइन इन करें' },
  'Sign out': { ta: 'வெளியேறு', hi: 'साइन आउट' },
  'Profile': { ta: 'சுயவிவரம்', hi: 'प्रोफाइल' },
  'Save': { ta: 'சேமி', hi: 'सहेजें' },
  'Cancel': { ta: 'ரத்துசெய்', hi: 'रद्द करें' },
  'Saving…': { ta: 'சேமிக்கிறது…', hi: 'सहेज रहे हैं…' },
  'Apply Now': { ta: 'இப்போது விண்ணப்பிக்கவும்', hi: 'अभी आवेदन करें' },
  'Learn More': { ta: 'மேலும் அறிக', hi: 'और जानें' },
  'Question': { ta: 'கேள்வி', hi: 'प्रश्न' },
  'of': { ta: '/', hi: '/' },
  'Step': { ta: 'படி', hi: 'चरण' },
  'Go back': { ta: 'பின் செல்', hi: 'वापस जाएं' },

  // ---- Status labels (StatusBadge) ----
  'Draft': { ta: 'வரைவு', hi: 'ड्राफ्ट' },
  'Submitted': { ta: 'சமர்ப்பிக்கப்பட்டது', hi: 'जमा किया गया' },
  'Documents Verified': { ta: 'ஆவணங்கள் சரிபார்க்கப்பட்டன', hi: 'दस्तावेज़ सत्यापित' },
  'Under Review': { ta: 'மதிப்பாய்வில் உள்ளது', hi: 'समीक्षाधीन' },
  'Action Required': { ta: 'நடவடிக்கை தேவை', hi: 'कार्रवाई आवश्यक' },
  'Approved': { ta: 'அங்கீகரிக்கப்பட்டது', hi: 'स्वीकृत' },
  'Rejected': { ta: 'நிராகரிக்கப்பட்டது', hi: 'अस्वीकृत' },
  'Completed': { ta: 'முடிந்தது', hi: 'पूर्ण' },
  'In Progress': { ta: 'செயலில் உள்ளது', hi: 'प्रगति में' },
  'Pending': { ta: 'நிலுவையில்', hi: 'लंबित' },

  // ---- Timeline (buildTimeline) ----
  'Application Received': { ta: 'விண்ணப்பம் பெறப்பட்டது', hi: 'आवेदन प्राप्त हुआ' },
  'Your application has been successfully submitted and received by the department.': { ta: 'உங்கள் விண்ணப்பம் வெற்றிகரமாக சமர்ப்பிக்கப்பட்டு துறையால் பெறப்பட்டது.', hi: 'आपका आवेदन सफलतापूर्वक जमा हो गया है और विभाग द्वारा प्राप्त कर लिया गया है।' },
  'Document Verification': { ta: 'ஆவண சரிபார்ப்பு', hi: 'दस्तावेज़ सत्यापन' },
  'Your uploaded documents will be checked by a document verification officer.': { ta: 'நீங்கள் பதிவேற்றிய ஆவணங்கள் ஆவண சரிபார்ப்பு அதிகாரியால் சரிபார்க்கப்படும்.', hi: 'आपके अपलोड किए गए दस्तावेज़ दस्तावेज़ सत्यापन अधिकारी द्वारा जांचे जाएंगे।' },
  'Officer Verification': { ta: 'அதிகாரி சரிபார்ப்பு', hi: 'अधिकारी सत्यापन' },
  'A Revenue Officer will verify your application details.': { ta: 'ஒரு வருவாய் அதிகாரி உங்கள் விண்ணப்ப விவரங்களை சரிபார்ப்பார்.', hi: 'एक राजस्व अधिकारी आपके आवेदन विवरण का सत्यापन करेगा।' },
  'Final Decision': { ta: 'இறுதி முடிவு', hi: 'अंतिम निर्णय' },
  'The final certificate or approval will be issued once all checks are complete.': { ta: 'அனைத்து சரிபார்ப்புகளும் முடிந்ததும் இறுதி சான்றிதழ் அல்லது அனுமதி வழங்கப்படும்.', hi: 'सभी जांच पूरी होने पर अंतिम प्रमाण पत्र या स्वीकृति जारी की जाएगी।' },
  'No action required from you right now.': { ta: 'இப்போது உங்களிடமிருந்து எந்த நடவடிக்கையும் தேவையில்லை.', hi: 'अभी आपसे किसी कार्रवाई की आवश्यकता नहीं है।' },
  'View required action': { ta: 'தேவையான நடவடிக்கையைக் காண்க', hi: 'आवश्यक कार्रवाई देखें' },

  // ---- ServiceCard / list ----
  'Help Me Find a Service': { ta: 'சேவையைக் கண்டுபிடிக்க உதவுங்கள்', hi: 'सेवा खोजने में मदद करें' },
  'Not sure what you need? Answer a few questions.': { ta: 'உங்களுக்கு என்ன தேவை என்று தெரியவில்லையா? சில கேள்விகளுக்கு பதிலளியுங்கள்.', hi: 'पता नहीं क्या चाहिए? कुछ प्रश्नों के उत्तर दें।' },

  // ---- ApplicationCard ----
  'An action is needed from you. Tap to see what\'s required.': { ta: 'உங்களிடமிருந்து ஒரு நடவடிக்கை தேவை. என்ன தேவை என்பதைக் காண தட்டவும்.', hi: 'आपसे एक कार्रवाई आवश्यक है। क्या आवश्यक है यह देखने के लिए टैप करें।' },
  'Last edited': { ta: 'கடைசியாக திருத்தியது', hi: 'अंतिम बार संपादित' },
  'Last updated': { ta: 'கடைசியாக புதுப்பிக்கப்பட்டது', hi: 'अंतिम बार अपडेट किया गया' },

  // ---- Services page ----
  'Government Services': { ta: 'அரசு சேவைகள்', hi: 'सरकारी सेवाएं' },
  'Choose a category to find the service you need.': { ta: 'உங்களுக்குத் தேவையான சேவையைக் கண்டுபிடிக்க ஒரு வகையைத் தேர்ந்தெடுக்கவும்.', hi: 'अपनी आवश्यक सेवा खोजने के लिए एक श्रेणी चुनें।' },
  'More services coming soon.': { ta: 'மேலும் சேவைகள் விரைவில் வரும்.', hi: 'और सेवाएं जल्द ही आ रही हैं।' },
  'Check back later or explore other categories.': { ta: 'பின்னர் மீண்டும் பார்க்கவும் அல்லது பிற வகைகளை ஆராயவும்.', hi: 'बाद में फिर देखें या अन्य श्रेणियां देखें।' },
  'Category not found.': { ta: 'வகை காணப்படவில்லை.', hi: 'श्रेणी नहीं मिली।' },
  'Service not found.': { ta: 'சேவை காணப்படவில்லை.', hi: 'सेवा नहीं मिली।' },

  // ---- Home extras ----
  'What do you need help with?': { ta: 'உங்களுக்கு எதில் உதவி தேவை?', hi: 'आपको किसमें मदद चाहिए?' },
  'Choose a service above to start your first application.': { ta: 'உங்கள் முதல் விண்ணப்பத்தைத் தொடங்க மேலே உள்ள சேவையைத் தேர்ந்தெடுக்கவும்.', hi: 'अपना पहला आवेदन शुरू करने के लिए ऊपर एक सेवा चुनें।' },

  // ---- Service detail ----
  'What is this service?': { ta: 'இந்த சேவை என்ன?', hi: 'यह सेवा क्या है?' },
  'What you\'ll get': { ta: 'நீங்கள் பெறுவது', hi: 'आपको क्या मिलेगा' },
  'You may need this for:': { ta: 'இதற்கு உங்களுக்கு இது தேவைப்படலாம்:', hi: 'आपको इसकी आवश्यकता इनके लिए हो सकती है:' },
  'Documents you will need': { ta: 'உங்களுக்குத் தேவையான ஆவணங்கள்', hi: 'आपको आवश्यक दस्तावेज़' },
  'Collect these before you start. It will make the process much faster.': { ta: 'தொடங்குவதற்கு முன் இவற்றைச் சேகரிக்கவும். இது செயல்முறையை மிக வேகமாக்கும்.', hi: 'शुरू करने से पहले इन्हें इकट्ठा करें। इससे प्रक्रिया बहुत तेज़ हो जाएगी।' },
  'How it works': { ta: 'இது எப்படி வேலை செய்கிறது', hi: 'यह कैसे काम करता है' },
  'Review & Submit': { ta: 'மதிப்பாய்வு & சமர்ப்பி', hi: 'समीक्षा करें और जमा करें' },
  'Check your information before sending.': { ta: 'அனுப்புவதற்கு முன் உங்கள் தகவலைச் சரிபார்க்கவும்.', hi: 'भेजने से पहले अपनी जानकारी जांचें।' },
  'Quick Information': { ta: 'விரைவு தகவல்', hi: 'त्वरित जानकारी' },
  'Estimated time': { ta: 'மதிப்பிடப்பட்ட நேரம்', hi: 'अनुमानित समय' },
  'Documents needed': { ta: 'தேவையான ஆவணங்கள்', hi: 'आवश्यक दस्तावेज़' },
  'Application fee': { ta: 'விண்ணப்பக் கட்டணம்', hi: 'आवेदन शुल्क' },
  'Processing time': { ta: 'செயலாக்க நேரம்', hi: 'प्रसंस्करण समय' },
  'Issued by': { ta: 'வழங்கியவர்', hi: 'जारीकर्ता' },
  'Helpline': { ta: 'உதவி எண்', hi: 'हेल्पलाइन' },
  'Ready to begin? We\'ll guide you through every step and check your eligibility first.': { ta: 'தொடங்கத் தயாரா? நாங்கள் ஒவ்வொரு படியிலும் வழிகாட்டி, முதலில் உங்கள் தகுதியைச் சரிபார்ப்போம்.', hi: 'शुरू करने के लिए तैयार हैं? हम आपको हर चरण में मार्गदर्शन देंगे और पहले आपकी पात्रता जांचेंगे।' },
  'Start Application': { ta: 'விண்ணப்பத்தைத் தொடங்கு', hi: 'आवेदन शुरू करें' },
  'You can save and continue later.': { ta: 'நீங்கள் சேமித்து பின்னர் தொடரலாம்.', hi: 'आप सहेजकर बाद में जारी रख सकते हैं।' },
  'This is a demo.': { ta: 'இது ஒரு டெமோ.', hi: 'यह एक डेमो है।' },
  'Frequently asked questions': { ta: 'அடிக்கடி கேட்கப்படும் கேள்விகள்', hi: 'अक्सर पूछे जाने वाले प्रश्न' },
  'Related services': { ta: 'தொடர்புடைய சேவைகள்', hi: 'संबंधित सेवाएं' },
  'See all {n} documents': { ta: 'அனைத்து {n} ஆவணங்களையும் காண்க', hi: 'सभी {n} दस्तावेज़ देखें' },
  'Show fewer': { ta: 'குறைவாகக் காட்டு', hi: 'कम दिखाएं' },

  // ---- Breadcrumbs ----
  'Home': { ta: 'முகப்பு', hi: 'होम' },
  'Services': { ta: 'சேவைகள்', hi: 'सेवाएं' },

  // ---- Eligibility ----
  'Eligibility Check': { ta: 'தகுதி சரிபார்ப்பு', hi: 'पात्रता जांच' },
  'Let\'s quickly check if this service is right for you.': { ta: 'இந்த சேவை உங்களுக்கு சரியானதா என்பதை விரைவாகச் சரிபார்ப்போம்.', hi: 'आइए जल्दी से जांचें कि यह सेवा आपके लिए सही है या नहीं।' },
  'Why are we asking this?': { ta: 'நாங்கள் ஏன் இதைக் கேட்கிறோம்?', hi: 'हम यह क्यों पूछ रहे हैं?' },
  'Next Question': { ta: 'அடுத்த கேள்வி', hi: 'अगला प्रश्न' },
  'See Result': { ta: 'முடிவைக் காண்க', hi: 'परिणाम देखें' },
  'You appear to be eligible': { ta: 'நீங்கள் தகுதியுடையவராகத் தெரிகிறீர்கள்', hi: 'आप पात्र प्रतीत होते हैं' },
  'Based on the information you provided, you may be eligible for this service.': { ta: 'நீங்கள் வழங்கிய தகவலின் அடிப்படையில், இந்த சேவைக்கு நீங்கள் தகுதியுடையவராக இருக்கலாம்.', hi: 'आपके द्वारा दी गई जानकारी के आधार पर, आप इस सेवा के लिए पात्र हो सकते हैं।' },
  'Your actual eligibility will be assessed by a government officer after submission.': { ta: 'சமர்ப்பித்த பிறகு உங்கள் உண்மையான தகுதி ஒரு அரசு அதிகாரியால் மதிப்பிடப்படும்.', hi: 'जमा करने के बाद आपकी वास्तविक पात्रता का आकलन एक सरकारी अधिकारी द्वारा किया जाएगा।' },
  'Continue to Documents': { ta: 'ஆவணங்களுக்குத் தொடரவும்', hi: 'दस्तावेज़ों पर जारी रखें' },
  'Skip document check and go directly to form': { ta: 'ஆவண சரிபார்ப்பைத் தவிர்த்து நேரடியாகப் படிவத்திற்குச் செல்லவும்', hi: 'दस्तावेज़ जांच छोड़ें और सीधे फ़ॉर्म पर जाएं' },
  'You may not be eligible': { ta: 'நீங்கள் தகுதியற்றவராக இருக்கலாம்', hi: 'आप पात्र नहीं हो सकते' },
  'If you believe this is incorrect, you can still continue with your application and a government officer will make the final decision.': { ta: 'இது தவறு என்று நீங்கள் நம்பினால், நீங்கள் உங்கள் விண்ணப்பத்தைத் தொடரலாம், ஒரு அரசு அதிகாரி இறுதி முடிவை எடுப்பார்.', hi: 'यदि आपको लगता है कि यह गलत है, तो भी आप अपना आवेदन जारी रख सकते हैं और एक सरकारी अधिकारी अंतिम निर्णय लेगा।' },
  'Continue Anyway': { ta: 'எப்படியும் தொடரவும்', hi: 'फिर भी जारी रखें' },
  'Help me find a different service': { ta: 'வேறு சேவையைக் கண்டுபிடிக்க உதவுங்கள்', hi: 'मुझे दूसरी सेवा खोजने में मदद करें' },

  // ---- Documents page ----
  'Check Your Documents': { ta: 'உங்கள் ஆவணங்களைச் சரிபார்க்கவும்', hi: 'अपने दस्तावेज़ जांचें' },
  'Let\'s make sure you have everything ready before filling the form.': { ta: 'படிவத்தை நிரப்புவதற்கு முன் உங்களிடம் எல்லாம் தயாராக உள்ளதா என்பதை உறுதிப்படுத்துவோம்.', hi: 'फ़ॉर्म भरने से पहले सुनिश्चित करें कि आपके पास सब कुछ तैयार है।' },
  'Back to eligibility': { ta: 'தகுதிக்குத் திரும்பு', hi: 'पात्रता पर वापस' },
  'All required documents are ready.': { ta: 'தேவையான அனைத்து ஆவணங்களும் தயாராக உள்ளன.', hi: 'सभी आवश्यक दस्तावेज़ तैयार हैं।' },
  'You can now continue to the application form.': { ta: 'இப்போது நீங்கள் விண்ணப்பப் படிவத்திற்குத் தொடரலாம்.', hi: 'अब आप आवेदन फ़ॉर्म पर जारी रख सकते हैं।' },
  'Continue to Application Form': { ta: 'விண்ணப்பப் படிவத்திற்குத் தொடரவும்', hi: 'आवेदन फ़ॉर्म पर जारी रखें' },
  'Continue (upload documents later)': { ta: 'தொடரவும் (ஆவணங்களைப் பின்னர் பதிவேற்றவும்)', hi: 'जारी रखें (दस्तावेज़ बाद में अपलोड करें)' },
  'Save and Finish Later': { ta: 'சேமித்து பின்னர் முடிக்கவும்', hi: 'सहेजें और बाद में पूरा करें' },
  'Your progress is automatically saved. You can return to this step anytime.': { ta: 'உங்கள் முன்னேற்றம் தானாகவே சேமிக்கப்படுகிறது. நீங்கள் எந்த நேரத்திலும் இந்தப் படிக்குத் திரும்பலாம்.', hi: 'आपकी प्रगति स्वचालित रूप से सहेजी जाती है। आप किसी भी समय इस चरण पर लौट सकते हैं।' },

  // ---- Document upload component ----
  'Upload Document': { ta: 'ஆவணம் பதிவேற்று', hi: 'दस्तावेज़ अपलोड करें' },
  'Uploading…': { ta: 'பதிவேற்றுகிறது…', hi: 'अपलोड हो रहा है…' },
  'Take Photo': { ta: 'புகைப்படம் எடு', hi: 'फ़ोटो लें' },
  'Uploaded successfully': { ta: 'வெற்றிகரமாக பதிவேற்றப்பட்டது', hi: 'सफलतापूर्वक अपलोड किया गया' },
  'Accepted documents:': { ta: 'ஏற்றுக்கொள்ளப்பட்ட ஆவணங்கள்:', hi: 'स्वीकृत दस्तावेज़:' },
  'Required': { ta: 'தேவை', hi: 'आवश्यक' },
  'Optional': { ta: 'விருப்பம்', hi: 'वैकल्पिक' },
  'Please choose a PDF, JPG, or PNG file.': { ta: 'PDF, JPG அல்லது PNG கோப்பைத் தேர்ந்தெடுக்கவும்.', hi: 'कृपया PDF, JPG या PNG फ़ाइल चुनें।' },

  // ---- Form page ----
  'Fields marked': { ta: 'குறிக்கப்பட்ட புலங்கள்', hi: 'चिह्नित फ़ील्ड' },
  'are required': { ta: 'தேவை', hi: 'आवश्यक हैं' },
  'Choose one…': { ta: 'ஒன்றைத் தேர்ந்தெடுக்கவும்…', hi: 'एक चुनें…' },
  'Saved': { ta: 'சேமிக்கப்பட்டது', hi: 'सहेजा गया' },
  'Review': { ta: 'மதிப்பாய்வு', hi: 'समीक्षा' },
  'Review Application': { ta: 'விண்ணப்பத்தை மதிப்பாய்வு செய்', hi: 'आवेदन की समीक्षा करें' },
  'Save & Continue': { ta: 'சேமி & தொடர்', hi: 'सहेजें और जारी रखें' },
  'Save & Exit': { ta: 'சேமி & வெளியேறு', hi: 'सहेजें और बाहर निकलें' },
  'Need help with this step?': { ta: 'இந்தப் படியில் உதவி தேவையா?', hi: 'इस चरण में मदद चाहिए?' },
  'Leave this application?': { ta: 'இந்த விண்ணப்பத்தை விட்டு வெளியேறவா?', hi: 'यह आवेदन छोड़ें?' },
  'Your progress will be saved. You can continue from \'My Applications\' whenever you\'re ready.': { ta: 'உங்கள் முன்னேற்றம் சேமிக்கப்படும். நீங்கள் தயாராகும்போது \'என் விண்ணப்பங்கள்\' இலிருந்து தொடரலாம்.', hi: 'आपकी प्रगति सहेजी जाएगी। आप तैयार होने पर \'मेरे आवेदन\' से जारी रख सकते हैं।' },
  'Save & Leave': { ta: 'சேமித்து வெளியேறு', hi: 'सहेजें और छोड़ें' },
  'Stay Here': { ta: 'இங்கேயே இரு', hi: 'यहीं रहें' },

  // ---- Common step titles / descriptions (service forms) ----
  'Personal Details': { ta: 'தனிப்பட்ட விவரங்கள்', hi: 'व्यक्तिगत विवरण' },
  'Tell us about yourself. This helps us process your application.': { ta: 'உங்களைப் பற்றி சொல்லுங்கள். இது உங்கள் விண்ணப்பத்தைச் செயலாக்க உதவுகிறது.', hi: 'हमें अपने बारे में बताएं। इससे हमें आपका आवेदन संसाधित करने में मदद मिलती है।' },
  'Contact Information': { ta: 'தொடர்பு தகவல்', hi: 'संपर्क जानकारी' },
  'We\'ll use these details to send updates about your application.': { ta: 'உங்கள் விண்ணப்பம் குறித்த புதுப்பிப்புகளை அனுப்ப இந்த விவரங்களைப் பயன்படுத்துவோம்.', hi: 'हम आपके आवेदन के बारे में अपडेट भेजने के लिए इन विवरणों का उपयोग करेंगे।' },
  'Address': { ta: 'முகவரி', hi: 'पता' },
  'Your current residential address in Tamil Nadu.': { ta: 'தமிழ்நாட்டில் உங்கள் தற்போதைய குடியிருப்பு முகவரி.', hi: 'तमिलनाडु में आपका वर्तमान आवासीय पता।' },
  'Income Details': { ta: 'வருமான விவரங்கள்', hi: 'आय विवरण' },
  'Bank Account Details': { ta: 'வங்கிக் கணக்கு விவரங்கள்', hi: 'बैंक खाता विवरण' },

  // ---- Common field labels ----
  'Full Name': { ta: 'முழுப் பெயர்', hi: 'पूरा नाम' },
  'Date of Birth': { ta: 'பிறந்த தேதி', hi: 'जन्म तिथि' },
  'Gender': { ta: 'பாலினம்', hi: 'लिंग' },
  'Aadhaar Number': { ta: 'ஆதார் எண்', hi: 'आधार संख्या' },
  'Mobile Number': { ta: 'கைபேசி எண்', hi: 'मोबाइल नंबर' },
  'Email Address': { ta: 'மின்னஞ்சல் முகவரி', hi: 'ईमेल पता' },
  'District': { ta: 'மாவட்டம்', hi: 'जिला' },
  'PIN Code': { ta: 'அஞ்சல் குறியீடு', hi: 'पिन कोड' },
  'City / Town': { ta: 'நகரம் / ஊர்', hi: 'शहर / कस्बा' },
  'Bank Name': { ta: 'வங்கியின் பெயர்', hi: 'बैंक का नाम' },
  'Account Number': { ta: 'கணக்கு எண்', hi: 'खाता संख्या' },
  'IFSC Code': { ta: 'IFSC குறியீடு', hi: 'आईएफएससी कोड' },
  'Female': { ta: 'பெண்', hi: 'महिला' },
  'Male': { ta: 'ஆண்', hi: 'पुरुष' },
  'Other': { ta: 'மற்றவை', hi: 'अन्य' },

  // ---- Review page ----
  'Review Your Application': { ta: 'உங்கள் விண்ணப்பத்தை மதிப்பாய்வு செய்யுங்கள்', hi: 'अपने आवेदन की समीक्षा करें' },
  'Please check everything carefully before submitting.': { ta: 'சமர்ப்பிப்பதற்கு முன் எல்லாவற்றையும் கவனமாகச் சரிபார்க்கவும்.', hi: 'जमा करने से पहले सब कुछ ध्यान से जांचें।' },
  'Back to form': { ta: 'படிவத்திற்குத் திரும்பு', hi: 'फ़ॉर्म पर वापस' },
  'Once submitted, some details may not be editable. Please review everything carefully.': { ta: 'சமர்ப்பித்த பிறகு, சில விவரங்களைத் திருத்த முடியாமல் போகலாம். தயவுசெய்து எல்லாவற்றையும் கவனமாக மதிப்பாய்வு செய்யவும்.', hi: 'जमा करने के बाद, कुछ विवरण संपादित नहीं किए जा सकते। कृपया सब कुछ ध्यान से देखें।' },
  'You must be signed in to submit.': { ta: 'சமர்ப்பிக்க நீங்கள் உள்நுழைந்திருக்க வேண்டும்.', hi: 'जमा करने के लिए आपको साइन इन होना चाहिए।' },
  'Sign in here': { ta: 'இங்கே உள்நுழையவும்', hi: 'यहां साइन इन करें' },
  'Documents': { ta: 'ஆவணங்கள்', hi: 'दस्तावेज़' },
  'uploaded': { ta: 'பதிவேற்றப்பட்டது', hi: 'अपलोड किया गया' },
  'Not uploaded': { ta: 'பதிவேற்றப்படவில்லை', hi: 'अपलोड नहीं हुआ' },
  'Manage Documents': { ta: 'ஆவணங்களை நிர்வகி', hi: 'दस्तावेज़ प्रबंधित करें' },
  'By submitting this application, you confirm that all information provided is accurate to the best of your knowledge.': { ta: 'இந்த விண்ணப்பத்தைச் சமர்ப்பிப்பதன் மூலம், வழங்கப்பட்ட அனைத்து தகவல்களும் உங்களுக்குத் தெரிந்த வரையில் துல்லியமானவை என்பதை உறுதிப்படுத்துகிறீர்கள்.', hi: 'इस आवेदन को जमा करके, आप पुष्टि करते हैं कि दी गई सभी जानकारी आपकी जानकारी के अनुसार सही है।' },
  'Submit Application': { ta: 'விண்ணப்பத்தைச் சமர்ப்பி', hi: 'आवेदन जमा करें' },
  'Submitting…': { ta: 'சமர்ப்பிக்கிறது…', hi: 'जमा हो रहा है…' },
  'Save & Finish Later': { ta: 'சேமித்து பின்னர் முடி', hi: 'सहेजें और बाद में पूरा करें' },
  'Submit your application?': { ta: 'உங்கள் விண்ணப்பத்தைச் சமர்ப்பிக்கவா?', hi: 'अपना आवेदन जमा करें?' },
  'You are about to submit your application. Once submitted, you will receive a reference number. You cannot undo this action.': { ta: 'நீங்கள் உங்கள் விண்ணப்பத்தைச் சமர்ப்பிக்கப் போகிறீர்கள். சமர்ப்பித்தவுடன், உங்களுக்கு ஒரு குறிப்பு எண் கிடைக்கும். இந்தச் செயலைச் செயல்தவிர்க்க முடியாது.', hi: 'आप अपना आवेदन जमा करने वाले हैं। जमा करने के बाद, आपको एक संदर्भ संख्या मिलेगी। आप इस क्रिया को पूर्ववत नहीं कर सकते।' },
  'Yes, Submit Now': { ta: 'ஆம், இப்போதே சமர்ப்பி', hi: 'हाँ, अभी जमा करें' },
  'Not Yet': { ta: 'இன்னும் இல்லை', hi: 'अभी नहीं' },

  // ---- Confirmation ----
  'Application Submitted!': { ta: 'விண்ணப்பம் சமர்ப்பிக்கப்பட்டது!', hi: 'आवेदन जमा हो गया!' },
  'Your Reference Number': { ta: 'உங்கள் குறிப்பு எண்', hi: 'आपकी संदर्भ संख्या' },
  'Copy number': { ta: 'எண்ணை நகலெடு', hi: 'नंबर कॉपी करें' },
  'Copied!': { ta: 'நகலெடுக்கப்பட்டது!', hi: 'कॉपी हो गया!' },
  'Save this number to track your application. You\'ll receive SMS updates on your registered mobile number.': { ta: 'உங்கள் விண்ணப்பத்தைக் கண்காணிக்க இந்த எண்ணைச் சேமிக்கவும். பதிவுசெய்த கைபேசி எண்ணில் SMS புதுப்பிப்புகளைப் பெறுவீர்கள்.', hi: 'अपना आवेदन ट्रैक करने के लिए यह नंबर सहेजें। आपको अपने पंजीकृत मोबाइल नंबर पर एसएमएस अपडेट मिलेंगे।' },
  'What happens next?': { ta: 'அடுத்து என்ன நடக்கும்?', hi: 'आगे क्या होगा?' },
  'Track My Application': { ta: 'என் விண்ணப்பத்தைக் கண்காணி', hi: 'मेरा आवेदन ट्रैक करें' },
  'Download Acknowledgement': { ta: 'ஒப்புகையைப் பதிவிறக்கு', hi: 'पावती डाउनलोड करें' },
  'Return to Home': { ta: 'முகப்புக்குத் திரும்பு', hi: 'होम पर लौटें' },

  // ---- Track ----
  'Track Your Application': { ta: 'உங்கள் விண்ணப்பத்தைக் கண்காணியுங்கள்', hi: 'अपना आवेदन ट्रैक करें' },
  'Enter your application reference number to see the current status.': { ta: 'தற்போதைய நிலையைக் காண உங்கள் விண்ணப்ப குறிப்பு எண்ணை உள்ளிடவும்.', hi: 'वर्तमान स्थिति देखने के लिए अपना आवेदन संदर्भ संख्या दर्ज करें।' },
  'Reference Number': { ta: 'குறிப்பு எண்', hi: 'संदर्भ संख्या' },
  'Your reference number was shown after submitting. It starts with ES-.': { ta: 'சமர்ப்பித்த பிறகு உங்கள் குறிப்பு எண் காட்டப்பட்டது. இது ES- உடன் தொடங்குகிறது.', hi: 'जमा करने के बाद आपकी संदर्भ संख्या दिखाई गई थी। यह ES- से शुरू होती है।' },
  'Searching…': { ta: 'தேடுகிறது…', hi: 'खोज रहे हैं…' },
  'Track Application': { ta: 'விண்ணப்பம் கண்காணி', hi: 'आवेदन ट्रैक करें' },
  'Application not found.': { ta: 'விண்ணப்பம் காணப்படவில்லை.', hi: 'आवेदन नहीं मिला।' },
  'Application Progress': { ta: 'விண்ணப்ப முன்னேற்றம்', hi: 'आवेदन प्रगति' },
  'What this means for you': { ta: 'இது உங்களுக்கு எதைக் குறிக்கிறது', hi: 'इसका आपके लिए क्या मतलब है' },
  'View all my applications': { ta: 'என் விண்ணப்பங்கள் அனைத்தையும் காண்க', hi: 'मेरे सभी आवेदन देखें' },
  'Your application has been received. We will start processing it soon.': { ta: 'உங்கள் விண்ணப்பம் பெறப்பட்டது. நாங்கள் விரைவில் அதைச் செயலாக்கத் தொடங்குவோம்.', hi: 'आपका आवेदन प्राप्त हो गया है। हम जल्द ही इसे संसाधित करना शुरू करेंगे।' },
  'Your application is being reviewed by an officer. No action is needed from you right now.': { ta: 'உங்கள் விண்ணப்பம் ஒரு அதிகாரியால் மதிப்பாய்வு செய்யப்படுகிறது. இப்போது உங்களிடமிருந்து எந்த நடவடிக்கையும் தேவையில்லை.', hi: 'आपके आवेदन की समीक्षा एक अधिकारी द्वारा की जा रही है। अभी आपसे किसी कार्रवाई की आवश्यकता नहीं है।' },

  // ---- Applications list ----
  'My Applications': { ta: 'என் விண்ணப்பங்கள்', hi: 'मेरे आवेदन' },
  'Track and manage all your government service applications.': { ta: 'உங்கள் அனைத்து அரசு சேவை விண்ணப்பங்களையும் கண்காணித்து நிர்வகிக்கவும்.', hi: 'अपने सभी सरकारी सेवा आवेदनों को ट्रैक और प्रबंधित करें।' },
  'Active': { ta: 'செயலில்', hi: 'सक्रिय' },
  'Drafts': { ta: 'வரைவுகள்', hi: 'ड्राफ्ट' },
  'Browse Services': { ta: 'சேவைகளை உலாவு', hi: 'सेवाएं ब्राउज़ करें' },
  'No active applications': { ta: 'செயலில் விண்ணப்பங்கள் இல்லை', hi: 'कोई सक्रिय आवेदन नहीं' },
  'No saved drafts': { ta: 'சேமித்த வரைவுகள் இல்லை', hi: 'कोई सहेजा गया ड्राफ्ट नहीं' },
  'No completed applications yet': { ta: 'இன்னும் முடிக்கப்பட்ட விண்ணப்பங்கள் இல்லை', hi: 'अभी तक कोई पूर्ण आवेदन नहीं' },
  'Browse services to start a new application.': { ta: 'புதிய விண்ணப்பத்தைத் தொடங்க சேவைகளை உலாவுங்கள்.', hi: 'नया आवेदन शुरू करने के लिए सेवाएं ब्राउज़ करें।' },
  'Sign in to view your applications': { ta: 'உங்கள் விண்ணப்பங்களைக் காண உள்நுழையவும்', hi: 'अपने आवेदन देखने के लिए साइन इन करें' },

  // ---- Notifications ----
  'Notifications': { ta: 'அறிவிப்புகள்', hi: 'सूचनाएं' },
  'Updates about your applications.': { ta: 'உங்கள் விண்ணப்பங்கள் பற்றிய புதுப்பிப்புகள்.', hi: 'आपके आवेदनों के बारे में अपडेट।' },
  'Mark all as read': { ta: 'அனைத்தையும் படித்ததாகக் குறி', hi: 'सभी को पढ़ा हुआ चिह्नित करें' },
  'No notifications yet': { ta: 'இன்னும் அறிவிப்புகள் இல்லை', hi: 'अभी तक कोई सूचना नहीं' },
  'Application updates will appear here.': { ta: 'விண்ணப்ப புதுப்பிப்புகள் இங்கே தோன்றும்.', hi: 'आवेदन अपडेट यहां दिखाई देंगे।' },
  'View application': { ta: 'விண்ணப்பத்தைக் காண்க', hi: 'आवेदन देखें' },

  // ---- Profile ----
  'Profile & Settings': { ta: 'சுயவிவரம் & அமைப்புகள்', hi: 'प्रोफ़ाइल और सेटिंग्स' },
  'Profile updated successfully.': { ta: 'சுயவிவரம் வெற்றிகரமாக புதுப்பிக்கப்பட்டது.', hi: 'प्रोफ़ाइल सफलतापूर्वक अपडेट हो गई।' },
  'Phone Number': { ta: 'தொலைபேசி எண்', hi: 'फ़ोन नंबर' },
  'Edit Profile': { ta: 'சுயவிவரத்தைத் திருத்து', hi: 'प्रोफ़ाइल संपादित करें' },
  'Not signed in': { ta: 'உள்நுழையவில்லை', hi: 'साइन इन नहीं है' },
  'Total': { ta: 'மொத்தம்', hi: 'कुल' },
  'Accessibility Settings': { ta: 'அணுகல்தன்மை அமைப்புகள்', hi: 'अभिगम्यता सेटिंग्स' },
  'Text size, contrast, language': { ta: 'உரை அளவு, வேறுபாடு, மொழி', hi: 'टेक्स्ट आकार, कंट्रास्ट, भाषा' },
  'Notification Preferences': { ta: 'அறிவிப்பு விருப்பங்கள்', hi: 'सूचना प्राथमिकताएं' },
  'Manage how you receive updates': { ta: 'புதுப்பிப்புகளை எவ்வாறு பெறுவது என்பதை நிர்வகிக்கவும்', hi: 'आप अपडेट कैसे प्राप्त करते हैं इसे प्रबंधित करें' },
  'Language': { ta: 'மொழி', hi: 'भाषा' },
  'Change interface language': { ta: 'இடைமுக மொழியை மாற்று', hi: 'इंटरफ़ेस भाषा बदलें' },
  'Privacy & Data': { ta: 'தனியுரிமை & தரவு', hi: 'गोपनीयता और डेटा' },
  'How your data is used': { ta: 'உங்கள் தரவு எவ்வாறு பயன்படுத்தப்படுகிறது', hi: 'आपका डेटा कैसे उपयोग किया जाता है' },

  // ---- Accessibility page ----
  'Adjust the display to make EasySeva easier for you to use.': { ta: 'EasySeva-வை நீங்கள் எளிதாகப் பயன்படுத்த காட்சியை சரிசெய்யுங்கள்.', hi: 'EasySeva को उपयोग में आसान बनाने के लिए डिस्प्ले समायोजित करें।' },
  'Text Size': { ta: 'உரை அளவு', hi: 'टेक्स्ट आकार' },
  'Choose a text size that is comfortable for you.': { ta: 'உங்களுக்கு வசதியான உரை அளவைத் தேர்ந்தெடுக்கவும்.', hi: 'अपने लिए आरामदायक टेक्स्ट आकार चुनें।' },
  'Default': { ta: 'இயல்புநிலை', hi: 'डिफ़ॉल्ट' },
  'Large': { ta: 'பெரிய', hi: 'बड़ा' },
  'Extra Large': { ta: 'மிகப் பெரிய', hi: 'बहुत बड़ा' },
  'Display Contrast': { ta: 'காட்சி வேறுபாடு', hi: 'डिस्प्ले कंट्रास्ट' },
  'Increase contrast to make text stand out more.': { ta: 'உரை மேலும் தனித்து தெரிய வேறுபாட்டை அதிகரிக்கவும்.', hi: 'टेक्स्ट को अधिक उभारने के लिए कंट्रास्ट बढ़ाएं।' },
  'Standard colours': { ta: 'நிலையான நிறங்கள்', hi: 'मानक रंग' },
  'High Contrast': { ta: 'அதிக வேறுபாடு', hi: 'उच्च कंट्रास्ट' },
  'Maximum text visibility': { ta: 'அதிகபட்ச உரை தெரிவு', hi: 'अधिकतम टेक्स्ट दृश्यता' },
  'Sample text': { ta: 'மாதிரி உரை', hi: 'नमूना टेक्स्ट' },
  'Reduce Motion': { ta: 'இயக்கத்தைக் குறை', hi: 'गति कम करें' },
  'Minimise animations and transitions.': { ta: 'அசைவூட்டங்கள் மற்றும் மாற்றங்களைக் குறைக்கவும்.', hi: 'एनिमेशन और ट्रांज़िशन कम करें।' },
  'Choose the language for the interface.': { ta: 'இடைமுகத்திற்கான மொழியைத் தேர்ந்தெடுக்கவும்.', hi: 'इंटरफ़ेस के लिए भाषा चुनें।' },
  'Reset to defaults': { ta: 'இயல்புநிலைக்கு மீட்டமை', hi: 'डिफ़ॉल्ट पर रीसेट करें' },

  // ---- Login / Verify ----
  'Sign in to EasySeva': { ta: 'EasySeva-வில் உள்நுழையவும்', hi: 'EasySeva में साइन इन करें' },
  'We\'ll send a one-time code to your email': { ta: 'உங்கள் மின்னஞ்சலுக்கு ஒரு முறை குறியீட்டை அனுப்புவோம்', hi: 'हम आपके ईमेल पर एक बार का कोड भेजेंगे' },
  'Email address': { ta: 'மின்னஞ்சல் முகவரி', hi: 'ईमेल पता' },
  'Send OTP': { ta: 'OTP அனுப்பு', hi: 'ओटीपी भेजें' },
  'Sending OTP…': { ta: 'OTP அனுப்புகிறது…', hi: 'ओटीपी भेजा जा रहा है…' },
  'Enter your OTP': { ta: 'உங்கள் OTP-ஐ உள்ளிடவும்', hi: 'अपना ओटीपी दर्ज करें' },
  'Verify & Sign In': { ta: 'சரிபார்த்து உள்நுழை', hi: 'सत्यापित करें और साइन इन करें' },
  'Verifying…': { ta: 'சரிபார்க்கிறது…', hi: 'सत्यापित हो रहा है…' },
  'Verified!': { ta: 'சரிபார்க்கப்பட்டது!', hi: 'सत्यापित!' },
  'Redirecting you to the dashboard…': { ta: 'உங்களை டாஷ்போர்டுக்கு திருப்பிவிடுகிறது…', hi: 'आपको डैशबोर्ड पर भेजा जा रहा है…' },
  'Resend OTP': { ta: 'OTP-ஐ மீண்டும் அனுப்பு', hi: 'ओटीपी पुनः भेजें' },

  // ---- Find a service ----
  'Not sure which service you need? Answer a few quick questions.': { ta: 'உங்களுக்கு எந்த சேவை தேவை என்று தெரியவில்லையா? சில விரைவு கேள்விகளுக்கு பதிலளியுங்கள்.', hi: 'पता नहीं कौन सी सेवा चाहिए? कुछ त्वरित प्रश्नों के उत्तर दें।' },
  'What do you need help with today?': { ta: 'இன்று உங்களுக்கு எதில் உதவி தேவை?', hi: 'आज आपको किसमें मदद चाहिए?' },
  'Based on your answers, these services may be right for you.': { ta: 'உங்கள் பதில்களின் அடிப்படையில், இந்த சேவைகள் உங்களுக்குச் சரியானதாக இருக்கலாம்.', hi: 'आपके उत्तरों के आधार पर, ये सेवाएं आपके लिए सही हो सकती हैं।' },
  'Start over with different answers': { ta: 'வேறு பதில்களுடன் மீண்டும் தொடங்கு', hi: 'अलग उत्तरों के साथ फिर से शुरू करें' },

  // ---- Nav / misc words ----
  'Applications': { ta: 'விண்ணப்பங்கள்', hi: 'आवेदन' },
  'Settings': { ta: 'அமைப்புகள்', hi: 'सेटिंग्स' },
  'Guest User': { ta: 'விருந்தினர் பயனர்', hi: 'अतिथि उपयोगकर्ता' },

  // ---- Landing marketing ----
  'HCI Academic Prototype · Tamil Nadu': { ta: 'HCI கல்வி முன்மாதிரி · தமிழ்நாடு', hi: 'एचसीआई शैक्षणिक प्रोटोटाइप · तमिलनाडु' },
  'Designed for real people': { ta: 'உண்மையான மக்களுக்காக வடிவமைக்கப்பட்டது', hi: 'वास्तविक लोगों के लिए डिज़ाइन किया गया' },
  'EasySeva is built around how citizens think about services, not how departments are organised.': { ta: 'துறைகள் எவ்வாறு ஒழுங்கமைக்கப்பட்டுள்ளன என்பதை அல்ல, குடிமக்கள் சேவைகளைப் பற்றி எப்படி நினைக்கிறார்கள் என்பதை மையமாகக் கொண்டு EasySeva கட்டமைக்கப்பட்டுள்ளது.', hi: 'EasySeva इस आधार पर बनाया गया है कि नागरिक सेवाओं के बारे में कैसे सोचते हैं, न कि विभाग कैसे संगठित हैं।' },
  'Secure & Private': { ta: 'பாதுகாப்பான & தனிப்பட்ட', hi: 'सुरक्षित और निजी' },
  'Available in 3 Languages': { ta: '3 மொழிகளில் கிடைக்கிறது', hi: '3 भाषाओं में उपलब्ध' },
  'Save & Resume Anytime': { ta: 'எப்போது வேண்டுமானாலும் சேமித்து தொடரவும்', hi: 'कभी भी सहेजें और जारी रखें' },
  'Step-by-Step Guidance': { ta: 'படிப்படியான வழிகாட்டுதல்', hi: 'चरण-दर-चरण मार्गदर्शन' },
  'Plain Language': { ta: 'எளிய மொழி', hi: 'सरल भाषा' },
  'No confusing government jargon. Everything explained simply.': { ta: 'குழப்பமான அரசு சொற்கள் இல்லை. எல்லாம் எளிமையாக விளக்கப்பட்டுள்ளது.', hi: 'कोई भ्रमित करने वाली सरकारी शब्दावली नहीं। सब कुछ सरलता से समझाया गया।' },
  'Step-by-Step Forms': { ta: 'படிப்படியான படிவங்கள்', hi: 'चरण-दर-चरण फ़ॉर्म' },
  'Never face a 30-field form again. We guide you one step at a time.': { ta: '30 புலங்கள் கொண்ட படிவத்தை மீண்டும் சந்திக்க வேண்டாம். ஒவ்வொரு படியாக வழிகாட்டுகிறோம்.', hi: 'फिर कभी 30-फ़ील्ड वाला फ़ॉर्म न देखें। हम आपको एक-एक चरण मार्गदर्शन देते हैं।' },
  'Save & Continue Later': { ta: 'சேமித்து பின்னர் தொடரவும்', hi: 'सहेजें और बाद में जारी रखें' },
  'Not ready? Save your progress and return whenever you are.': { ta: 'தயாராக இல்லையா? உங்கள் முன்னேற்றத்தைச் சேமித்து, தயாராகும்போது திரும்பவும்.', hi: 'तैयार नहीं हैं? अपनी प्रगति सहेजें और जब तैयार हों तब लौटें।' },
  'Always know what is happening with your application, in clear terms.': { ta: 'உங்கள் விண்ணப்பத்தில் என்ன நடக்கிறது என்பதை தெளிவான வார்த்தைகளில் எப்போதும் அறியுங்கள்.', hi: 'स्पष्ट शब्दों में हमेशा जानें कि आपके आवेदन के साथ क्या हो रहा है।' },
  'Try the demo experience': { ta: 'டெமோ அனுபவத்தை முயற்சிக்கவும்', hi: 'डेमो अनुभव आज़माएं' },
  'Walk through applying for an Income Certificate as Lakshmi, a first-time user who needs step-by-step guidance.': { ta: 'படிப்படியான வழிகாட்டுதல் தேவைப்படும் முதல்முறை பயனரான லட்சுமியாக வருமான சான்றிதழுக்கு விண்ணப்பிப்பதை அனுபவியுங்கள்.', hi: 'चरण-दर-चरण मार्गदर्शन चाहने वाली पहली बार की उपयोगकर्ता लक्ष्मी के रूप में आय प्रमाण पत्र के लिए आवेदन करके देखें।' },
  'Explore EasySeva': { ta: 'EasySeva-வை ஆராயுங்கள்', hi: 'EasySeva देखें' },
  'Academic Prototype:': { ta: 'கல்வி முன்மாதிரி:', hi: 'शैक्षणिक प्रोटोटाइप:' },
  'This is a demonstration application for an HCI research project. Do not enter real personal information. All application submissions are simulated.': { ta: 'இது ஒரு HCI ஆராய்ச்சித் திட்டத்திற்கான செயல்விளக்க பயன்பாடு. உண்மையான தனிப்பட்ட தகவலை உள்ளிட வேண்டாம். அனைத்து விண்ணப்பச் சமர்ப்பிப்புகளும் போலியானவை.', hi: 'यह एक एचसीआई शोध परियोजना के लिए एक प्रदर्शन अनुप्रयोग है। वास्तविक व्यक्तिगत जानकारी दर्ज न करें। सभी आवेदन सबमिशन सिम्युलेटेड हैं।' },

  // ---- Help page ----
  'Help & Support': { ta: 'உதவி & ஆதரவு', hi: 'मदद और सहायता' },
  'Find answers to common questions or get in touch with us.': { ta: 'பொதுவான கேள்விகளுக்கான பதில்களைக் கண்டறியவும் அல்லது எங்களைத் தொடர்பு கொள்ளவும்.', hi: 'सामान्य प्रश्नों के उत्तर खोजें या हमसे संपर्क करें।' },

  // ---- Home alerts / misc ----
  'Tamil Nadu': { ta: 'தமிழ்நாடு', hi: 'तमिलनाडु' },
  'View': { ta: 'காண்க', hi: 'देखें' },
  'Action needed:': { ta: 'நடவடிக்கை தேவை:', hi: 'कार्रवाई आवश्यक:' },
  'Please check your application — a response is required.': { ta: 'உங்கள் விண்ணப்பத்தைச் சரிபார்க்கவும். ஒரு பதில் தேவை.', hi: 'कृपया अपना आवेदन जांचें। एक प्रतिक्रिया आवश्यक है।' },
  'Continue your draft:': { ta: 'உங்கள் வரைவைத் தொடரவும்:', hi: 'अपना ड्राफ्ट जारी रखें:' },
  'You saved': { ta: 'நீங்கள் சேமித்தது', hi: 'आपने सहेजा' },
  'of your application. Continue where you left off.': { ta: 'உங்கள் விண்ணப்பத்தில். நிறுத்திய இடத்திலிருந்து தொடரவும்.', hi: 'आपके आवेदन का। जहां छोड़ा था वहीं से जारी रखें।' },
  'No real application will be submitted. Use test data only.': { ta: 'உண்மையான விண்ணப்பம் எதுவும் சமர்ப்பிக்கப்படாது. சோதனைத் தரவை மட்டும் பயன்படுத்தவும்.', hi: 'कोई वास्तविक आवेदन जमा नहीं किया जाएगा। केवल परीक्षण डेटा का उपयोग करें।' },
  'required documents ready': { ta: 'தேவையான ஆவணங்கள் தயார்', hi: 'आवश्यक दस्तावेज़ तैयार' },

  // ---- Income Certificate form: field labels ----
  'Relationship to Applicant': { ta: 'விண்ணப்பதாரருடன் உறவு', hi: 'आवेदक से संबंध' },
  'Door / Flat Number': { ta: 'கதவு / பிளாட் எண்', hi: 'दरवाज़ा / फ्लैट नंबर' },
  'Street / Colony Name': { ta: 'தெரு / காலனி பெயர்', hi: 'गली / कॉलोनी का नाम' },
  'Your Occupation': { ta: 'உங்கள் தொழில்', hi: 'आपका व्यवसाय' },
  'Estimated Annual Income of Household (in ₹)': { ta: 'குடும்பத்தின் மதிப்பிடப்பட்ட ஆண்டு வருமானம் (₹ இல்)', hi: 'परिवार की अनुमानित वार्षिक आय (₹ में)' },
  'Why do you need this certificate?': { ta: 'இந்தச் சான்றிதழ் உங்களுக்கு ஏன் தேவை?', hi: 'आपको यह प्रमाण पत्र क्यों चाहिए?' },
  // ---- Options: relation ----
  'Self (Applying for myself)': { ta: 'சுயமாக (எனக்காக விண்ணப்பிக்கிறேன்)', hi: 'स्वयं (अपने लिए आवेदन)' },
  'Parent (Applying for child)': { ta: 'பெற்றோர் (குழந்தைக்காக விண்ணப்பிக்கிறேன்)', hi: 'माता-पिता (बच्चे के लिए आवेदन)' },
  'Spouse': { ta: 'வாழ்க்கைத் துணை', hi: 'जीवनसाथी' },
  'Legal Guardian': { ta: 'சட்டப்பூர்வ பாதுகாவலர்', hi: 'कानूनी अभिभावक' },
  // ---- Options: districts ----
  'Chennai': { ta: 'சென்னை', hi: 'चेन्नई' },
  'Coimbatore': { ta: 'கோயம்புத்தூர்', hi: 'कोयंबटूर' },
  'Madurai': { ta: 'மதுரை', hi: 'मदुरै' },
  'Tiruchirappalli': { ta: 'திருச்சிராப்பள்ளி', hi: 'तिरुचिरापल्ली' },
  'Salem': { ta: 'சேலம்', hi: 'सलेम' },
  'Tirunelveli': { ta: 'திருநெல்வேலி', hi: 'तिरुनेलवेली' },
  'Vellore': { ta: 'வேலூர்', hi: 'वेल्लोर' },
  'Erode': { ta: 'ஈரோடு', hi: 'इरोड' },
  // ---- Options: occupation ----
  'Self-employed / Business owner': { ta: 'சுயதொழில் / வணிக உரிமையாளர்', hi: 'स्व-रोज़गार / व्यवसाय स्वामी' },
  'Salaried (Private sector)': { ta: 'சம்பளம் (தனியார் துறை)', hi: 'वेतनभोगी (निजी क्षेत्र)' },
  'Salaried (Government)': { ta: 'சம்பளம் (அரசு)', hi: 'वेतनभोगी (सरकारी)' },
  'Daily wage worker': { ta: 'தினக்கூலி தொழிலாளர்', hi: 'दैनिक मज़दूर' },
  'Farmer': { ta: 'விவசாயி', hi: 'किसान' },
  'Homemaker': { ta: 'இல்லத்தரசி', hi: 'गृहिणी' },
  'Retired': { ta: 'ஓய்வுபெற்றவர்', hi: 'सेवानिवृत्त' },
  'Student': { ta: 'மாணவர்', hi: 'छात्र' },
  // ---- Options: purpose ----
  'Scholarship application': { ta: 'உதவித்தொகை விண்ணப்பம்', hi: 'छात्रवृत्ति आवेदन' },
  'School/College fee waiver': { ta: 'பள்ளி/கல்லூரி கட்டண விலக்கு', hi: 'स्कूल/कॉलेज शुल्क माफी' },
  'Government welfare scheme': { ta: 'அரசு நலத்திட்டம்', hi: 'सरकारी कल्याण योजना' },
  'Housing scheme': { ta: 'வீட்டுவசதி திட்டம்', hi: 'आवास योजना' },
  'Medical assistance': { ta: 'மருத்துவ உதவி', hi: 'चिकित्सा सहायता' },
  'Other purpose': { ta: 'வேறு நோக்கம்', hi: 'अन्य उद्देश्य' },
  'Your progress is saved automatically. You can continue later from "My Applications".': { ta: 'உங்கள் முன்னேற்றம் தானாகவே சேமிக்கப்படுகிறது. "என் விண்ணப்பங்கள்" இலிருந்து நீங்கள் பின்னர் தொடரலாம்.', hi: 'आपकी प्रगति स्वचालित रूप से सहेजी जाती है। आप "मेरे आवेदन" से बाद में जारी रख सकते हैं।' },

  // ---- Confirmation next steps ----
  'Documents Checked': { ta: 'ஆவணங்கள் சரிபார்க்கப்பட்டன', hi: 'दस्तावेज़ जांचे गए' },
  'Your application has been recorded and assigned a reference number.': { ta: 'உங்கள் விண்ணப்பம் பதிவு செய்யப்பட்டு ஒரு குறிப்பு எண் வழங்கப்பட்டது.', hi: 'आपका आवेदन दर्ज कर लिया गया है और एक संदर्भ संख्या दी गई है।' },
  'A document verification officer will check your uploaded files.': { ta: 'ஒரு ஆவண சரிபார்ப்பு அதிகாரி நீங்கள் பதிவேற்றிய கோப்புகளைச் சரிபார்ப்பார்.', hi: 'एक दस्तावेज़ सत्यापन अधिकारी आपकी अपलोड की गई फ़ाइलें जांचेगा।' },
  'A Revenue Officer will review the details of your application.': { ta: 'ஒரு வருவாய் அதிகாரி உங்கள் விண்ணப்ப விவரங்களை மதிப்பாய்வு செய்வார்.', hi: 'एक राजस्व अधिकारी आपके आवेदन के विवरण की समीक्षा करेगा।' },
  'You will be notified when a decision has been made.': { ta: 'ஒரு முடிவு எடுக்கப்படும்போது உங்களுக்கு அறிவிக்கப்படும்.', hi: 'निर्णय होने पर आपको सूचित किया जाएगा।' },
  'Your application for': { ta: 'உங்கள் விண்ணப்பம்', hi: 'आपका आवेदन' },
  'has been successfully submitted.': { ta: 'வெற்றிகரமாக சமர்ப்பிக்கப்பட்டது.', hi: 'सफलतापूर्वक जमा हो गया है।' },
  'We will contact you if anything is needed. Track your application anytime with your reference number.': { ta: 'ஏதேனும் தேவைப்பட்டால் நாங்கள் உங்களைத் தொடர்பு கொள்வோம். உங்கள் குறிப்பு எண்ணுடன் எந்த நேரத்திலும் உங்கள் விண்ணப்பத்தைக் கண்காணிக்கவும்.', hi: 'यदि कुछ भी आवश्यक होगा तो हम आपसे संपर्क करेंगे। अपनी संदर्भ संख्या से किसी भी समय अपना आवेदन ट्रैक करें।' },
  'Your application is recorded. Keep your reference number safe, you will need it to track your application.': { ta: 'உங்கள் விண்ணப்பம் பதிவு செய்யப்பட்டுள்ளது. உங்கள் குறிப்பு எண்ணைப் பத்திரமாக வைத்திருங்கள், விண்ணப்பத்தைக் கண்காணிக்க இது தேவைப்படும்.', hi: 'आपका आवेदन दर्ज हो गया है। अपनी संदर्भ संख्या सुरक्षित रखें, आवेदन ट्रैक करने के लिए आपको इसकी आवश्यकता होगी।' },

  // ---- Track status explanations ----
  'Last Updated': { ta: 'கடைசியாக புதுப்பிக்கப்பட்டது', hi: 'अंतिम बार अपडेट' },
  'Your action is needed.': { ta: 'உங்கள் நடவடிக்கை தேவை.', hi: 'आपकी कार्रवाई आवश्यक है।' },
  'Please review the timeline below for details.': { ta: 'விவரங்களுக்கு கீழே உள்ள காலவரிசையைப் பார்க்கவும்.', hi: 'विवरण के लिए नीचे दी गई समयरेखा देखें।' },
  'Your documents have been checked and are in order.': { ta: 'உங்கள் ஆவணங்கள் சரிபார்க்கப்பட்டு சரியாக உள்ளன.', hi: 'आपके दस्तावेज़ जांचे गए हैं और सही हैं।' },
  'We need something from you. Please check the timeline above for details.': { ta: 'உங்களிடமிருந்து எங்களுக்கு ஏதோ தேவை. விவரங்களுக்கு மேலே உள்ள காலவரிசையைப் பார்க்கவும்.', hi: 'हमें आपसे कुछ चाहिए। विवरण के लिए ऊपर दी गई समयरेखा देखें।' },
  'Congratulations! Your application has been approved.': { ta: 'வாழ்த்துக்கள்! உங்கள் விண்ணப்பம் அங்கீகரிக்கப்பட்டது.', hi: 'बधाई हो! आपका आवेदन स्वीकृत हो गया है।' },
  'Unfortunately, your application was not approved. See the reason in the timeline above.': { ta: 'துரதிர்ஷ்டவசமாக, உங்கள் விண்ணப்பம் அங்கீகரிக்கப்படவில்லை. மேலே உள்ள காலவரிசையில் காரணத்தைப் பார்க்கவும்.', hi: 'दुर्भाग्य से, आपका आवेदन स्वीकृत नहीं हुआ। कारण के लिए ऊपर दी गई समयरेखा देखें।' },

  // ---- Login / verify / profile extras ----
  'This is an HCI academic prototype. No real government data is stored.': { ta: 'இது ஒரு HCI கல்வி முன்மாதிரி. உண்மையான அரசு தரவு எதுவும் சேமிக்கப்படவில்லை.', hi: 'यह एक एचसीआई शैक्षणिक प्रोटोटाइप है। कोई वास्तविक सरकारी डेटा संग्रहीत नहीं है।' },
  'This is an HCI academic prototype for Tamil Nadu government services. Your data is stored securely and used only for this demonstration.': { ta: 'இது தமிழ்நாடு அரசு சேவைகளுக்கான ஒரு HCI கல்வி முன்மாதிரி. உங்கள் தரவு பாதுகாப்பாக சேமிக்கப்பட்டு இந்த செயல்விளக்கத்திற்கு மட்டுமே பயன்படுத்தப்படுகிறது.', hi: 'यह तमिलनाडु सरकारी सेवाओं के लिए एक एचसीआई शैक्षणिक प्रोटोटाइप है। आपका डेटा सुरक्षित रूप से संग्रहीत है और केवल इस प्रदर्शन के लिए उपयोग किया जाता है।' },

  // ---- Applications list extras ----
  'Search by service name or reference number…': { ta: 'சேவை பெயர் அல்லது குறிப்பு எண் மூலம் தேடுங்கள்…', hi: 'सेवा नाम या संदर्भ संख्या से खोजें…' },
  'No applications match your search': { ta: 'உங்கள் தேடலுக்கு பொருந்தும் விண்ணப்பங்கள் இல்லை', hi: 'आपकी खोज से मेल खाने वाला कोई आवेदन नहीं' },
  'Try a different search term.': { ta: 'வேறு தேடல் சொல்லை முயற்சிக்கவும்.', hi: 'कोई अन्य खोज शब्द आज़माएं।' },
  'Start an application and save it to continue later.': { ta: 'ஒரு விண்ணப்பத்தைத் தொடங்கி, பின்னர் தொடர அதைச் சேமிக்கவும்.', hi: 'एक आवेदन शुरू करें और बाद में जारी रखने के लिए इसे सहेजें।' },
  'Your submitted applications will appear here.': { ta: 'நீங்கள் சமர்ப்பித்த விண்ணப்பங்கள் இங்கே தோன்றும்.', hi: 'आपके जमा किए गए आवेदन यहां दिखाई देंगे।' },

  // ---- Verify demo banner ----
  'Demo Mode — Your OTP': { ta: 'டெமோ முறை — உங்கள் OTP', hi: 'डेमो मोड — आपका ओटीपी' },
  'This is shown here because email is not configured.': { ta: 'மின்னஞ்சல் அமைக்கப்படாததால் இது இங்கே காட்டப்படுகிறது.', hi: 'ईमेल कॉन्फ़िगर न होने के कारण यह यहां दिखाया गया है।' },

  // ---- Find a service: questions and options ----
  'What kind of education support are you looking for?': { ta: 'எந்த வகையான கல்வி ஆதரவை நீங்கள் தேடுகிறீர்கள்?', hi: 'आप किस प्रकार का शिक्षा समर्थन खोज रहे हैं?' },
  'Tell us a little about yourself.': { ta: 'உங்களைப் பற்றி சிறிது சொல்லுங்கள்.', hi: 'हमें अपने बारे में थोड़ा बताएं।' },
  "Proof of my family's income": { ta: 'என் குடும்பத்தின் வருமானத்திற்கான சான்று', hi: 'मेरे परिवार की आय का प्रमाण' },
  'Financial support for my education': { ta: 'என் கல்விக்கான நிதி ஆதரவு', hi: 'मेरी शिक्षा के लिए वित्तीय सहायता' },
  'Financial help for an elderly family member': { ta: 'வயதான குடும்ப உறுப்பினருக்கு நிதி உதவி', hi: 'किसी बुज़ुर्ग परिवार सदस्य के लिए वित्तीय मदद' },
  "I'm not sure — help me find out": { ta: 'எனக்குத் தெரியவில்லை — கண்டறிய உதவுங்கள்', hi: 'मुझे यकीन नहीं है — पता लगाने में मदद करें' },
  'Scholarship for school or college fees': { ta: 'பள்ளி அல்லது கல்லூரி கட்டணத்திற்கான உதவித்தொகை', hi: 'स्कूल या कॉलेज फीस के लिए छात्रवृत्ति' },
  'Fee waiver or exemption': { ta: 'கட்டண விலக்கு அல்லது தள்ளுபடி', hi: 'शुल्क माफी या छूट' },
  'Hostel accommodation support': { ta: 'விடுதி தங்குமிட ஆதரவு', hi: 'छात्रावास आवास सहायता' },
  'I am a student': { ta: 'நான் ஒரு மாணவன்', hi: 'मैं एक छात्र हूं' },
  'I am 60 years or older': { ta: 'எனக்கு 60 வயது அல்லது அதற்கு மேல்', hi: 'मैं 60 वर्ष या उससे अधिक का हूं' },
  "I need to prove my family's income": { ta: 'என் குடும்பத்தின் வருமானத்தை நிரூபிக்க வேண்டும்', hi: 'मुझे अपने परिवार की आय साबित करनी है' },
  'These suggestions are based on your answers and are not official eligibility decisions.': { ta: 'இந்த பரிந்துரைகள் உங்கள் பதில்களின் அடிப்படையிலானவை, இவை அதிகாரப்பூர்வ தகுதி முடிவுகள் அல்ல.', hi: 'ये सुझाव आपके उत्तरों पर आधारित हैं और आधिकारिक पात्रता निर्णय नहीं हैं।' },

  // ---- Income Certificate service content (showcased service) ----
  'minutes': { ta: 'நிமிடங்கள்', hi: 'मिनट' },
  'An Income Certificate is an official government document that confirms the annual income of an individual or their family. It is commonly required for availing various government schemes, scholarships, educational fee concessions, and other welfare benefits.': { ta: 'வருமான சான்றிதழ் என்பது ஒரு தனிநபர் அல்லது அவரது குடும்பத்தின் ஆண்டு வருமானத்தை உறுதிப்படுத்தும் அதிகாரப்பூர்வ அரசு ஆவணமாகும். பல்வேறு அரசுத் திட்டங்கள், உதவித்தொகைகள், கல்விக் கட்டண விலக்குகள் மற்றும் பிற நலன் பலன்களைப் பெற இது பொதுவாகத் தேவைப்படுகிறது.', hi: 'आय प्रमाण पत्र एक आधिकारिक सरकारी दस्तावेज़ है जो किसी व्यक्ति या उसके परिवार की वार्षिक आय की पुष्टि करता है। यह विभिन्न सरकारी योजनाओं, छात्रवृत्तियों, शैक्षणिक शुल्क रियायतों और अन्य कल्याणकारी लाभों का लाभ उठाने के लिए सामान्यतः आवश्यक होता है।' },
  "A digitally-signed Income Certificate (PDF) stating your family's annual income, downloadable and valid for official use.": { ta: 'உங்கள் குடும்பத்தின் ஆண்டு வருமானத்தைக் குறிப்பிடும், பதிவிறக்கம் செய்யக்கூடிய மற்றும் அதிகாரப்பூர்வ பயன்பாட்டிற்கு செல்லுபடியாகும் டிஜிட்டல் கையொப்பமிடப்பட்ட வருமான சான்றிதழ் (PDF).', hi: 'आपके परिवार की वार्षिक आय बताने वाला एक डिजिटल रूप से हस्ताक्षरित आय प्रमाण पत्र (PDF), जो डाउनलोड करने योग्य और आधिकारिक उपयोग के लिए मान्य है।' },
  'Applying for scholarships': { ta: 'உதவித்தொகைகளுக்கு விண்ணப்பித்தல்', hi: 'छात्रवृत्ति के लिए आवेदन' },
  'School or college fee waivers': { ta: 'பள்ளி அல்லது கல்லூரி கட்டண விலக்குகள்', hi: 'स्कूल या कॉलेज शुल्क माफी' },
  'Government welfare benefits': { ta: 'அரசு நலன் பலன்கள்', hi: 'सरकारी कल्याण लाभ' },
  'Housing schemes': { ta: 'வீட்டுவசதி திட்டங்கள்', hi: 'आवास योजनाएं' },
  'Medical assistance programs': { ta: 'மருத்துவ உதவித் திட்டங்கள்', hi: 'चिकित्सा सहायता कार्यक्रम' },
  'Free (No application fee)': { ta: 'இலவசம் (விண்ணப்பக் கட்டணம் இல்லை)', hi: 'निःशुल्क (कोई आवेदन शुल्क नहीं)' },
  '7–15 working days': { ta: '7–15 வேலை நாட்கள்', hi: '7–15 कार्य दिवस' },
  'Revenue Department, Government of Tamil Nadu': { ta: 'வருவாய்த் துறை, தமிழ்நாடு அரசு', hi: 'राजस्व विभाग, तमिलनाडु सरकार' },
  '1100 (Tamil Nadu e-Sevai Helpline)': { ta: '1100 (தமிழ்நாடு இ-சேவை உதவி எண்)', hi: '1100 (तमिलनाडु ई-सेवई हेल्पलाइन)' },
  'A document that confirms your identity.': { ta: 'உங்கள் அடையாளத்தை உறுதிப்படுத்தும் ஆவணம்.', hi: 'एक दस्तावेज़ जो आपकी पहचान की पुष्टि करता है।' },
  'A document confirming your current residential address.': { ta: 'உங்கள் தற்போதைய குடியிருப்பு முகவரியை உறுதிப்படுத்தும் ஆவணம்.', hi: 'आपके वर्तमान आवासीय पते की पुष्टि करने वाला दस्तावेज़।' },
  "A document showing your or your family's income.": { ta: 'உங்கள் அல்லது உங்கள் குடும்பத்தின் வருமானத்தைக் காட்டும் ஆவணம்.', hi: 'आपकी या आपके परिवार की आय दर्शाने वाला दस्तावेज़।' },
  'Your Tamil Nadu family card listing household members.': { ta: 'வீட்டு உறுப்பினர்களை பட்டியலிடும் உங்கள் தமிழ்நாடு குடும்ப அட்டை.', hi: 'घर के सदस्यों की सूची वाला आपका तमिलनाडु परिवार कार्ड।' },
  'A recent passport-size photograph of the applicant.': { ta: 'விண்ணப்பதாரரின் சமீபத்திய கடவுச்சீட்டு அளவு புகைப்படம்.', hi: 'आवेदक की हाल की पासपोर्ट आकार की तस्वीर।' },
  'How is "family income" calculated?': { ta: '"குடும்ப வருமானம்" எவ்வாறு கணக்கிடப்படுகிறது?', hi: '"पारिवारिक आय" की गणना कैसे की जाती है?' },
  'It is the combined annual income of all earning members living in the same household, from all sources (salary, business, agriculture, pension, etc.).': { ta: 'இது ஒரே வீட்டில் வசிக்கும் அனைத்து சம்பாதிக்கும் உறுப்பினர்களின், அனைத்து ஆதாரங்களிலிருந்தும் (சம்பளம், வணிகம், விவசாயம், ஓய்வூதியம் போன்றவை) கிடைக்கும் ஒருங்கிணைந்த ஆண்டு வருமானமாகும்.', hi: 'यह एक ही घर में रहने वाले सभी कमाने वाले सदस्यों की सभी स्रोतों (वेतन, व्यवसाय, कृषि, पेंशन आदि) से संयुक्त वार्षिक आय है।' },
  'How long is an Income Certificate valid?': { ta: 'வருமான சான்றிதழ் எவ்வளவு காலத்திற்கு செல்லுபடியாகும்?', hi: 'आय प्रमाण पत्र कितने समय तक मान्य है?' },
  'An Income Certificate is generally valid for one year from the date of issue. You will need a fresh certificate after that.': { ta: 'வருமான சான்றிதழ் பொதுவாக வழங்கப்பட்ட தேதியிலிருந்து ஒரு வருடத்திற்கு செல்லுபடியாகும். அதன் பிறகு உங்களுக்கு புதிய சான்றிதழ் தேவைப்படும்.', hi: 'आय प्रमाण पत्र आमतौर पर जारी होने की तिथि से एक वर्ष के लिए मान्य होता है। उसके बाद आपको एक नया प्रमाण पत्र चाहिए होगा।' },
  'Do I need to pay anything?': { ta: 'நான் ஏதேனும் கட்டணம் செலுத்த வேண்டுமா?', hi: 'क्या मुझे कुछ भुगतान करना होगा?' },
  'No. Applying for an Income Certificate through the government portal is free of cost.': { ta: 'இல்லை. அரசு இணையதளம் மூலம் வருமான சான்றிதழுக்கு விண்ணப்பிப்பது இலவசம்.', hi: 'नहीं। सरकारी पोर्टल के माध्यम से आय प्रमाण पत्र के लिए आवेदन करना निःशुल्क है।' },
};

export function trx(text: string, lang: Language): string {
  if (lang === 'en' || !text) return text;
  return dict[text]?.[lang] ?? text;
}
