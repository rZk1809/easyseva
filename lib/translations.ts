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
  'common.optional': { en: 'Optional', ta: 'விருப்பத்திற்குரிய', hi: 'वैकल्पिक' },
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

  // Services
  'services.certificate': { en: 'Get a Certificate', ta: 'சான்றிதழ் பெறுங்கள்', hi: 'प्रमाण पत्र प्राप्त करें' },
  'services.benefits': { en: 'Find Government Benefits', ta: 'அரசு சலுகைகள் கண்டுபிடி', hi: 'सरकारी लाभ खोजें' },
  'services.education': { en: 'Education Services', ta: 'கல்வி சேவைகள்', hi: 'शिक्षा सेवाएं' },
  'services.family': { en: 'Family Services', ta: 'குடும்ப சேவைகள்', hi: 'पारिवारिक सेवाएं' },
  'services.senior': { en: 'Senior Citizen Services', ta: 'மூத்த குடிமக்கள் சேவைகள்', hi: 'वरिष्ठ नागरिक सेवाएं' },
  'services.documents': { en: 'Update Documents', ta: 'ஆவணங்கள் புதுப்பி', hi: 'दस्तावेज़ अपडेट करें' },
  'services.track': { en: 'Track My Application', ta: 'என் விண்ணப்பம் கண்காணி', hi: 'मेरा आवेदन ट्रैक करें' },
  'services.findService': { en: 'Help Me Find a Service', ta: 'சேவை கண்டுபிடிக்க உதவுங்கள்', hi: 'सेवा खोजने में मदद करें' },

  // Application status
  'status.draft': { en: 'Draft', ta: 'வரைவு', hi: 'ड्राफ्ट' },
  'status.submitted': { en: 'Submitted', ta: 'சமர்ப்பிக்கப்பட்டது', hi: 'जमा किया गया' },
  'status.under_review': { en: 'Under Review', ta: 'மதிப்பாய்வில் உள்ளது', hi: 'समीक्षाधीन' },
  'status.action_required': { en: 'Action Required', ta: 'நடவடிக்கை தேவை', hi: 'कार्रवाई आवश्यक' },
  'status.approved': { en: 'Approved', ta: 'அங்கீகரிக்கப்பட்டது', hi: 'स्वीकृत' },
  'status.rejected': { en: 'Rejected', ta: 'நிராகரிக்கப்பட்டது', hi: 'अस्वीकृत' },

  // Form
  'form.stepOf': { en: 'Step {n} of {total}', ta: '{total} இல் படி {n}', hi: 'चरण {n} / {total}' },
  'form.saveAndContinue': { en: 'Save & Continue', ta: 'சேமி & தொடர்', hi: 'सहेजें और जारी रखें' },
  'form.saveAndExit': { en: 'Save & Finish Later', ta: 'சேமி & பிறகு முடி', hi: 'सहेजें और बाद में पूरा करें' },
  'form.allFieldsRequired': { en: 'Fields marked * are required', ta: '* குறிக்கப்பட்ட புலங்கள் தேவை', hi: '* से चिह्नित फ़ील्ड आवश्यक हैं' },

  // Document
  'doc.upload': { en: 'Upload Document', ta: 'ஆவணம் பதிவேற்று', hi: 'दस्तावेज़ अपलोड करें' },
  'doc.takePhoto': { en: 'Take Photo', ta: 'புகைப்படம் எடு', hi: 'फ़ोटो लें' },
  'doc.replace': { en: 'Replace', ta: 'மாற்று', hi: 'बदलें' },
  'doc.remove': { en: 'Remove', ta: 'அகற்று', hi: 'हटाएं' },
  'doc.uploaded': { en: 'Uploaded successfully', ta: 'வெற்றிகரமாக பதிவேற்றப்பட்டது', hi: 'सफलतापूर्वक अपलोड किया गया' },
  'doc.uploading': { en: 'Uploading…', ta: 'பதிவேற்றுகிறது…', hi: 'अपलोड हो रहा है…' },
  'doc.whatCanIUse': { en: 'What can I use?', ta: 'நான் என்ன பயன்படுத்தலாம்?', hi: 'मैं क्या उपयोग कर सकता हूं?' },
  'doc.ready': { en: 'Ready', ta: 'தயார்', hi: 'तैयार' },
  'doc.missing': { en: 'Not uploaded', ta: 'பதிவேற்றப்படவில்லை', hi: 'अपलोड नहीं हुआ' },

  // Accessibility
  'a11y.title': { en: 'Accessibility Settings', ta: 'அணுகல்தன்மை அமைப்புகள்', hi: 'अभिगम्यता सेटिंग्स' },
  'a11y.textSize': { en: 'Text Size', ta: 'உரை அளவு', hi: 'टेक्स्ट आकार' },
  'a11y.contrast': { en: 'Contrast', ta: '明暗', hi: 'कंट्रास्ट' },
  'a11y.language': { en: 'Language', ta: 'மொழி', hi: 'भाषा' },
  'a11y.reduceMotion': { en: 'Reduce Motion', ta: 'இயக்கம் குறை', hi: 'गति कम करें' },
  'a11y.default': { en: 'Default', ta: 'இயல்புநிலை', hi: 'डिफ़ॉल्ट' },
  'a11y.large': { en: 'Large', ta: 'பெரிய', hi: 'बड़ा' },
  'a11y.xlarge': { en: 'Extra Large', ta: 'மிகவும் பெரிய', hi: 'बहुत बड़ा' },
  'a11y.highContrast': { en: 'High Contrast', ta: 'அதிக வேறுபாடு', hi: 'उच्च कंट्रास्ट' },

  // Help
  'help.title': { en: 'Help & Support', ta: 'உதவி & ஆதரவு', hi: 'मदद और सहायता' },
  'help.faq': { en: 'Frequently Asked Questions', ta: 'அடிக்கடி கேட்கப்படும் கேள்விகள்', hi: 'अक्सर पूछे जाने वाले प्रश्न' },
  'help.contact': { en: 'Contact Support', ta: 'ஆதரவை தொடர்பு கொள்', hi: 'सहायता से संपर्क करें' },
  'help.report': { en: 'Report a Problem', ta: 'சிக்கலை அறிவி', hi: 'समस्या की रिपोर्ट करें' },
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
