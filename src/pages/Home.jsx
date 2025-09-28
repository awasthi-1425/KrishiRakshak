import React, { useState } from "react";
import { motion } from "framer-motion";
import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";

// 1. All text content is now in a central translation object for all 22 official languages
const translations = {
  en: {
    nav: { home: "Home", about: "About", services: "Services", contact: "Contact", signIn: "Sign In", signUp: "Sign Up" },
    hero: { title: "KrishiRakshak", subtitle: "Smart Farming Solutions", desc: "The smartest friend your farm will ever have.", getStarted: "Get Started", learnMore: "Learn More" },
    services: {
      title: "Our Services",
      list: [
        { icon: "https://cdn-icons-png.flaticon.com/128/15394/15394984.png", title: "Disease Detection", desc: "Instantly identify plant diseases by simply taking a photo of affected leaves or stems.", link: "/cropdisease" },
        { icon: "https://cdn-icons-png.flaticon.com/128/8593/8593824.png", title: "Treatment Recommendations", desc: "Get personalized treatment plans and product recommendations for identified diseases.", link: "/treatment" },
        { icon: "https://cdn-icons-png.flaticon.com/512/1163/1163661.png", title: "Weather Alerts", desc: "Receive timely weather forecasts and alerts specific to your farming location.", link: "/weather" },
        { icon: "https://cdn-icons-png.flaticon.com/128/5455/5455723.png", title: "Farmer Community", desc: "Connect with other farmers to share knowledge, experiences, and best practices.", link: "/farmercommunity" },
        { icon: "https://cdn-icons-png.flaticon.com/128/16090/16090053.png", title: "Crop Calendar", desc: "Plan your farming activities with customized crop calendars and reminders.", link: "/cropcalendar" },
        { icon: "https://cdn-icons-png.flaticon.com/512/4149/4149670.png", title: "Knowledge Base", desc: "Access comprehensive information about crops, diseases, and farming techniques." },
        { icon: "https://cdn-icons-png.flaticon.com/128/3475/3475289.png", title: "Expert Consultation", desc: "Connect with agricultural experts for personalized advice and problem-solving." },
        { icon: "https://cdn-icons-png.flaticon.com/128/862/862819.png", title: "Marketplace", desc: "Buy and sell agricultural products directly through our integrated marketplace.", link: "/marketplace" },
        { icon: "https://cdn-icons-png.flaticon.com/128/1465/1465973.png", title: "Fertilizer Recommendation", desc: "Get to know the most suitable fertilizer for your crops.", link: "/fertilizerrecommendation" },
        { icon: "https://cdn-icons-png.flaticon.com/128/16834/16834613.png", title: "Crop Recommendation", desc: "Get to know the most suitable crop according to the soil and weather conditions.", link: "/croprecommendation" },
        { icon: "https://cdn-icons-png.flaticon.com/128/7315/7315208.png", title: "Labour Scheduling", desc: "Efficiently plan and assign farm labour to ensure timely sowing, harvesting, and daily tasks.", link: "/labourscheduling" },
      ],
    },
    about: { title: "About KrishiRakshak", desc: "KrishiRakshak is an AI-powered farming companion designed to empower farmers with smart, reliable, and timely solutions. From protecting crops against diseases to providing personalized recommendations, we combine technology with care for the hands that feed our nation. Our mission is to make farming safer, smarter, and more sustainable—helping every farmer grow with confidence and prosperity." },
    footer: { title: "Get in Touch", desc: "Have questions or need support? We're here to help you on your farming journey.", contact: "Email: support@krishirakshak.com | Phone: +91 98765 43210", copyright: "© 2025 KrishiRakshak. All rights reserved." },
  },
  hi: {
    nav: { home: "होम", about: "हमारे बारे में", services: "सेवाएँ", contact: "संपर्क", signIn: "साइन इन", signUp: "साइन अप" },
    hero: { title: "कृषि रक्षक", subtitle: "स्मार्ट खेती समाधान", desc: "आपके खेत का अब तक का सबसे स्मार्ट दोस्त।", getStarted: "शुरू करें", learnMore: "और जानें" },
    services: { title: "हमारी सेवाएँ", list: [] },
    about: { title: "कृषि रक्षक के बारे में", desc: "कृषि रक्षक एक AI-संचालित खेती साथी है जिसे किसानों को स्मार्ट, विश्वसनीय और समय पर समाधान के साथ सशक्त बनाने के लिए डिज़ाइन किया गया है।" },
    footer: { title: "संपर्क में रहें", desc: "प्रश्न हैं या समर्थन की आवश्यकता है? हम आपकी खेती की यात्रा में आपकी मदद करने के लिए यहां हैं।", contact: "ईमेल: support@krishirakshak.com | फ़ोन: +91 98765 43210", copyright: "© 2025 कृषि रक्षक। सर्वाधिकार सुरक्षित।" },
  },
  as: {
    nav: { home: "হোম", about: "বিষয়ে", services: "সেৱা", contact: "যোগাযোগ", signIn: "চাইন ইন", signUp: "চাইন আপ" },
    hero: { title: "কৃষি ৰক্ষক", subtitle: "স্মাৰ্ট কৃষি সমাধান", desc: "আপোনাৰ খেতিৰ বাবে এতিয়ালৈকে আটাইতকৈ স্মাৰ্ট বন্ধু।", getStarted: "আৰম্ভ কৰক", learnMore: "অধিক জানক" },
    services: { title: "আমাৰ সেৱাসমূহ", list: [] },
    about: { title: "কৃষি ৰক্ষকৰ বিষয়ে", desc: "কৃষি ৰক্ষক হৈছে এক AI-চালিত কৃষি সহায়ক যি কৃষকসকলক স্মাৰ্ট, নিৰ্ভৰযোগ্য আৰু সময়સર সমাধানৰ দ্বাৰা শক্তিশালী কৰিবলৈ ডিজাইন কৰা হৈছে।" },
    footer: { title: "যোগাযোগ কৰক", desc: "প্ৰশ্ন আছে বা সহায়ৰ প্ৰয়োজন? আমি আপোনাৰ কৃষি যাত্ৰাত সহায় কৰিবলৈ ইয়াত আছোঁ।", contact: "ইমেইল: support@krishirakshak.com | ফোন: +91 98765 43210", copyright: "© 2025 কৃষি ৰক্ষক। সকলো অধিকাৰ সংৰক্ষিত।" },
  },
  bn: {
    nav: { home: "হোম", about: "সম্পর্কে", services: "পরিষেবা", contact: "যোগাযোগ", signIn: "সাইন ইন", signUp: "সাইন আপ" },
    hero: { title: "কৃষি রক্ষক", subtitle: "স্মার্ট কৃষি সমাধান", desc: "আপনার খামারের জন্য সবচেয়ে স্মার্ট বন্ধু।", getStarted: "শুরু করুন", learnMore: "আরও জানুন" },
    services: { title: "আমাদের পরিষেবাসমূহ", list: [] },
    about: { title: "কৃষি রক্ষক সম্পর্কে", desc: "কৃষি রক্ষক একটি AI-চালিত কৃষি সঙ্গী যা কৃষকদের স্মার্ট, নির্ভরযোগ্য এবং সময়োপযোগী সমাধান দিয়ে ক্ষমতায়নের জন্য ডিজাইন করা হয়েছে।" },
    footer: { title: "যোগাযোগ করুন", desc: "প্রশ্ন আছে বা সমর্থন প্রয়োজন? আমরা আপনার কৃষি যাত্রায় আপনাকে সাহায্য করতে এখানে আছি।", contact: "ইমেল: support@krishirakshak.com | ফোন: +91 98765 43210", copyright: "© 2025 কৃষি রক্ষক। সর্বস্বত্ব সংরক্ষিত।" },
  },
  gu: {
    nav: { home: "ઘર", about: "વિશે", services: "સેવાઓ", contact: "સંપર્ક", signIn: "સાઇન ઇન", signUp: "સાઇન અપ" },
    hero: { title: "કૃષિ રક્ષક", subtitle: "સ્માર્ટ ખેતી ઉકેલો", desc: "તમારા ખેતરનો અત્યાર સુધીનો સૌથી સ્માર્ટ મિત્ર.", getStarted: "શરૂ કરો", learnMore: "વધુ જાણો" },
    services: { title: "અમારી સેવાઓ", list: [] },
    about: { title: "કૃષિ રક્ષક વિશે", desc: "કૃષિ રક્ષક એ AI-સંચાલિત ખેતીનો સાથી છે જે ખેડૂતોને સ્માર્ટ, ભરોસાપાત્ર અને સમયસર ઉકેલો સાથે સશક્ત બનાવવા માટે રચાયેલ છે." },
    footer: { title: "સંપર્કમાં રહો", desc: "પ્રશ્નો છે કે સમર્થનની જરૂર છે? અમે તમારી ખેતીની યાત્રામાં તમને મદદ કરવા માટે અહીં છીએ.", contact: "ઈમેલ: support@krishirakshak.com | ફોન: +91 98765 43210", copyright: "© 2025 કૃષિ રક્ષક। સર્વાધિકાર સુરક્ષિત।" },
  },
  kn: {
    nav: { home: "ಮುಖಪುಟ", about: "ಕುರಿತು", services: "ಸೇವೆಗಳು", contact: "ಸಂಪರ್ಕ", signIn: "ಸೈನ್ ಇನ್", signUp: "ಸೈನ್ ಅಪ್" },
    hero: { title: "ಕೃಷಿ ರಕ್ಷಕ", subtitle: "ಸ್ಮಾರ್ಟ್ ಕೃಷಿ ಪರಿಹಾರಗಳು", desc: "ನಿಮ್ಮ ಜಮೀನಿಗೆ ಇದುವರೆಗಿನ ಅತ್ಯಂತ ಸ್ಮಾರ್ಟ್ ಸ್ನೇಹಿತ.", getStarted: "ಪ್ರಾರಂಭಿಸಿ", learnMore: "ಇನ್ನಷ್ಟು ತಿಳಿಯಿರಿ" },
    services: { title: "ನಮ್ಮ ಸೇವೆಗಳು", list: [] },
    about: { title: "ಕೃಷಿ ರಕ್ಷಕ ಕುರಿತು", desc: "ಕೃಷಿ ರಕ್ಷಕವು ರೈತರನ್ನು ಸ್ಮಾರ್ಟ್, ವಿಶ್ವಾಸಾರ್ಹ ಮತ್ತು ಸಮಯೋಚಿತ ಪರಿಹಾರಗಳೊಂದಿಗೆ ಸಬಲೀಕರಣಗೊಳಿಸಲು ವಿನ್ಯಾಸಗೊಳಿಸಲಾದ AI-ಚಾಲಿತ ಕೃಷಿ ಸಂಗಾತಿಯಾಗಿದೆ." },
    footer: { title: "ಸಂಪರ್ಕದಲ್ಲಿರಿ", desc: "ಪ್ರಶ್ನೆಗಳಿವೆಯೇ ಅಥವಾ ಬೆಂಬಲ ಬೇಕೆ? ನಿಮ್ಮ ಕೃಷಿ ಪಯಣದಲ್ಲಿ ನಿಮಗೆ ಸಹಾಯ ಮಾಡಲು ನಾವು ಇಲ್ಲಿದ್ದೇವೆ.", contact: "ಇಮೇಲ್: support@krishirakshak.com | ಫೋನ್: +91 98765 43210", copyright: "© 2025 ಕೃಷಿ ರಕ್ಷಕ। ಎಲ್ಲಾ ಹಕ್ಕುಗಳನ್ನು ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ." },
  },
  ml: {
    nav: { home: "ഹോം", about: "ഞങ്ങളെക്കുറിച്ച്", services: "സേവനങ്ങൾ", contact: "ബന്ധപ്പെടുക", signIn: "സൈൻ ഇൻ", signUp: "സൈൻ അപ്പ്" },
    hero: { title: "കൃഷി രക്ഷക്", subtitle: "സ്മാർട്ട് കാർഷിക പരിഹാരങ്ങൾ", desc: "നിങ്ങളുടെ ഫാമിന് ലഭിക്കാവുന്ന ഏറ്റവും മികച്ച സുഹൃത്ത്.", getStarted: "തുടങ്ങുക", learnMore: "കൂടുതലറിയുക" },
    services: { title: "ഞങ്ങളുടെ സേവനങ്ങൾ", list: [] },
    about: { title: "കൃഷി രക്ഷക്കിനെക്കുറിച്ച്", desc: "കർഷകർക്ക് മികച്ചതും വിശ്വസനീയവും സമയബന്ധിതവുമായ പരിഹാരങ്ങൾ നൽകുന്നതിനായി രൂപകൽപ്പന ചെയ്ത ഒരു AI-പവർഡ് കാർഷിക കൂട്ടാളിയാണ് കൃഷി രക്ഷക്." },
    footer: { title: "ബന്ധപ്പെടുക", desc: "ചോദ്യങ്ങളുണ്ടോ അല്ലെങ്കിൽ പിന്തുണ ആവശ്യമുണ്ടോ? നിങ്ങളുടെ കാർഷിക യാത്രയിൽ നിങ്ങളെ സഹായിക്കാൻ ഞങ്ങൾ ഇവിടെയുണ്ട്.", contact: "ഇമെയിൽ: support@krishirakshak.com | ഫോൺ: +91 98765 43210", copyright: "© 2025 കൃഷി രക്ഷക്. എല്ലാ അവകാശങ്ങളും നിക്ഷിപ്തം." },
  },
  mr: {
    nav: { home: "मुख्यपृष्ठ", about: "बद्दल", services: "सेवा", contact: "संपर्क", signIn: "साइन इन", signUp: "साइन अप" },
    hero: { title: "कृषी रक्षक", subtitle: "स्मार्ट शेती उपाय", desc: "तुमच्या शेताचा आतापर्यंतचा सर्वात स्मार्ट मित्र.", getStarted: "सुरुवात करा", learnMore: "अधिक जाणून घ्या" },
    services: { title: "आमच्या सेवा", list: [] },
    about: { title: "कृषी रक्षक बद्दल", desc: "कृषी रक्षक हा एक AI-चालित शेती सोबती आहे जो शेतकऱ्यांना स्मार्ट, विश्वासार्ह आणि वेळेवर उपायांनी सक्षम करण्यासाठी डिझाइन केलेला आहे." },
    footer: { title: "संपर्कात रहा", desc: "प्रश्न आहेत किंवा समर्थनाची गरज आहे? आम्ही तुमच्या शेतीच्या प्रवासात तुम्हाला मदत करण्यासाठी येथे आहोत.", contact: "ईमेल: support@krishirakshak.com | फोन: +91 98765 43210", copyright: "© 2025 कृषी रक्षक। सर्व हक्क राखीव।" },
  },
  or: {
    nav: { home: "ମୂଳପୃଷ୍ଠା", about: "ବିଷୟରେ", services: "ସେବା", contact: "ଯୋଗାଯୋଗ", signIn: "ସାଇନ୍ ଇନ୍", signUp: "ସାଇନ୍ ଅପ୍" },
    hero: { title: "କୃଷି ରକ୍ଷକ", subtitle: "ସ୍ମାର୍ଟ କୃଷି ସମାଧାନ", desc: "ଆପଣଙ୍କ କ୍ଷେତର ଏପର୍ଯ୍ୟନ୍ତ ସବୁଠାରୁ ସ୍ମାର୍ଟ ବନ୍ଧୁ।", getStarted: "ଆରମ୍ଭ କରନ୍ତୁ", learnMore: "ଅଧିକ ଜାଣନ୍ତୁ" },
    services: { title: "ଆମର ସେବାଗୁଡିକ", list: [] },
    about: { title: "କୃଷି ରକ୍ଷକ ବିଷୟରେ", desc: "କୃଷି ରକ୍ଷକ ଏକ AI-ଚାଳିତ କୃଷି ସାଥୀ ଯାହା ଚାଷୀମାନଙ୍କୁ ସ୍ମାର୍ଟ, ନିର୍ଭରଯୋଗ୍ୟ ଏବଂ ସମୟୋଚିତ ସମାଧାନ ସହିତ ସଶକ୍ତ କରିବା ପାଇଁ ପରିକଳ୍ପିତ।" },
    footer: { title: "ଯୋଗାଯୋଗରେ ରୁହନ୍ତୁ", desc: "ପ୍ରଶ୍ନ ଅଛି କିମ୍ବା ସମର୍ଥନ ଆବଶ୍ୟକ? ଆମେ ଆପଣଙ୍କ କୃଷି ଯାତ୍ରାରେ ସାହାଯ୍ୟ କରିବାକୁ ଏଠାରେ ଅଛୁ।", contact: "ଇମେଲ୍: support@krishirakshak.com | ଫୋନ୍: +91 98765 43210", copyright: "© 2025 କୃଷି ରକ୍ଷକ। ସମସ୍ତ ଅଧିକାର ସଂରକ୍ଷିତ।" },
  },
  pa: {
    nav: { home: "ਮੁੱਖ ਪੰਨਾ", about: "ਬਾਰੇ", services: "ਸੇਵਾਵਾਂ", contact: "ਸੰਪਰਕ", signIn: "ਸਾਈਨ ਇਨ", signUp: "ਸਾਈਨ ਅੱਪ" },
    hero: { title: "ਕ੍ਰਿਸ਼ੀ ਰਕਸ਼ਕ", subtitle: "ਸਮਾਰਟ ਖੇਤੀਬਾੜੀ ਹੱਲ", desc: "ਤੁਹਾਡੇ ਖੇਤ ਦਾ ਹੁਣ ਤੱਕ ਦਾ ਸਭ ਤੋਂ ਸਮਾਰਟ ਦੋਸਤ।", getStarted: "ਸ਼ੁਰੂ ਕਰੋ", learnMore: "ਹੋਰ ਜਾਣੋ" },
    services: { title: "ਸਾਡੀਆਂ ਸੇਵਾਵਾਂ", list: [] },
    about: { title: "ਕ੍ਰਿਸ਼ੀ ਰਕਸ਼ਕ ਬਾਰੇ", desc: "ਕ੍ਰਿਸ਼ੀ ਰਕਸ਼ਕ ਇੱਕ AI-ਸੰਚਾਲਿਤ ਖੇਤੀਬਾੜੀ ਸਾਥੀ ਹੈ ਜੋ ਕਿਸਾਨਾਂ ਨੂੰ ਸਮਾਰਟ, ਭਰੋਸੇਯੋਗ ਅਤੇ ਸਮੇਂ ਸਿਰ ਹੱਲ ਪ੍ਰਦਾਨ ਕਰਨ ਲਈ ਤਿਆਰ ਕੀਤਾ ਗਿਆ ਹੈ।" },
    footer: { title: "ਸੰਪਰਕ ਵਿੱਚ ਰਹੋ", desc: "ਸਵਾਲ ਹਨ ਜਾਂ ਸਹਾਇਤਾ ਦੀ ਲੋੜ ਹੈ? ਅਸੀਂ ਤੁਹਾਡੀ ਖੇਤੀਬਾੜੀ ਯਾਤਰਾ ਵਿੱਚ ਤੁਹਾਡੀ ਮਦਦ ਕਰਨ ਲਈ ਇੱਥੇ ਹਾਂ।", contact: "ਈਮੇਲ: support@krishirakshak.com | ਫ਼ੋਨ: +91 98765 43210", copyright: "© 2025 ਕ੍ਰਿਸ਼ੀ ਰਕਸ਼ਕ। ਸਾਰੇ ਹੱਕ ਰਾਖਵੇਂ ਹਨ।" },
  },
  ta: {
    nav: { home: "முகப்பு", about: "பற்றி", services: "சேவைகள்", contact: "தொடர்பு", signIn: "உள்நுழை", signUp: "பதிவு செய்க" },
    hero: { title: "கிருஷி ரக்ஷக்", subtitle: "ஸ்மார்ட் விவசாய தீர்வுகள்", desc: "உங்கள் பண்ணையின் மிக புத்திசாலித்தனமான நண்பர்.", getStarted: "தொடங்கவும்", learnMore: "மேலும் அறிக" },
    services: { title: "எங்கள் சேவைகள்", list: [] },
    about: { title: "கிருஷி ரக்ஷக் பற்றி", desc: "கிருஷி ரக்ஷக் என்பது விவசாயிகளுக்கு ஸ்மார்ட், நம்பகமான மற்றும் சரியான நேரத்தில் தீர்வுகளை வழங்குவதற்காக வடிவமைக்கப்பட்ட ஒரு AI-இயங்கும் விவசாய துணை." },
    footer: { title: "தொடர்பில் இருங்கள்", desc: "கேள்விகள் உள்ளதா அல்லது ஆதரவு தேவையா? உங்கள் விவசாய பயணத்தில் உங்களுக்கு உதவ நாங்கள் இங்கே இருக்கிறோம்.", contact: "மின்னஞ்சல்: support@krishirakshak.com | தொலைபேசி: +91 98765 43210", copyright: "© 2025 கிருஷி ரக்ஷக்। அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை." },
  },
  te: {
    nav: { home: "హోమ్", about: "గురించి", services: "సేవలు", contact: "సంప్రదించండి", signIn: "సైన్ ఇన్", signUp: "సైన్ అప్" },
    hero: { title: "కృషి రక్షక్", subtitle: "స్మార్ట్ వ్యవసాయ పరిష్కారాలు", desc: "మీ పొలానికి అత్యంత తెలివైన స్నేహితుడు.", getStarted: "ప్రారంభించండి", learnMore: "మరింత తెలుసుకోండి" },
    services: { title: "మా సేవలు", list: [] },
    about: { title: "కృషి రక్షక్ గురించి", desc: "కృషి రక్షక్ అనేది రైతులకు స్మార్ట్, నమ్మకమైన మరియు సకాలంలో పరిష్కారాలను అందించడానికి రూపొందించబడిన AI-ఆధారిత వ్యవసాయ సహచరుడు." },
    footer: { title: "సంప్రదించండి", desc: "ప్రశ్నలు ఉన్నాయా లేదా మద్దతు కావాలా? మీ వ్యవసాయ ప్రయాణంలో మీకు సహాయం చేయడానికి మేము ఇక్కడ ఉన్నాము.", contact: "ఇమెయిల్: support@krishirakshak.com | ఫోన్: +91 98765 43210", copyright: "© 2025 కృషి రక్షక్। అన్ని హక్కులు ప్రత్యేకించబడ్డాయి." },
  },
  ur: {
    nav: { home: "ہوم", about: "ہمارے بارے میں", services: "خدمات", contact: "رابطہ", signIn: "سائن ان", signUp: "سائن اپ" },
    hero: { title: "کرشی رکشک", subtitle: "اسمارٹ کاشتکاری کے حل", desc: "آپ کے فارم کا اب تک کا سب سے ہوشیار دوست۔", getStarted: "شروع کریں", learnMore: "مزید جانیں" },
    services: { title: "ہماری خدمات", list: [] },
    about: { title: "کرشی رکشک کے بارے میں", desc: "کرشی رکشک ایک AI سے چلنے والا کاشتکاری کا ساتھی ہے جو کسانوں کو ہوشیار، قابل اعتماد اور بروقت حل کے ساتھ بااختیار بنانے کے لیے ڈیزائن کیا گیا ہے۔" },
    footer: { title: "رابطے میں رہیں", desc: "سوالات ہیں یا مدد کی ضرورت ہے؟ ہم آپ کے کاشتکاری کے سفر میں آپ کی مدد کے لیے حاضر ہیں۔", contact: "ای میل: support@krishirakshak.com | فون: +91 98765 43210", copyright: "© 2025 کرشی رکشک۔ جملہ حقوق محفوظ ہیں۔" },
  },
  bodo: {
    nav: { home: "न' ", about: "सोमोन्दै", services: "सेवा", contact: "जोग जोग", signIn: "साइन इन", signUp: "साइन अप" },
    hero: { title: "कृषि रक्षक", subtitle: "स्मार्टेस्ट फार्मिंग सोलुसन", desc: "नोंथांनि हाग्रा-हामानि बयनिख्रुइ स्मार्ट लोगो।", getStarted: "जागायहो", learnMore: "आरोबाव मिथिनो" },
    services: { title: "जोंनि सेवाफोर", list: [] },
    about: { title: "कृषि रक्षकनि सोमोन्दै", desc: "कृषि रक्षकआ मोनसे AI-जों सोलिग्रा आबादारि लोगो जाय आबादारिफोरनो स्मार्ट, फोथायथावना आरो सम-सम सोलुसन होनानै गोहो होनो थाखाय दिजाइन खालामनाय जादों।" },
    footer: { title: "जोग-जोग खालाम", desc: "सोंलु दङ' ना मदद नांगौ? जों नोंथांनि आबादारि जात्रायाव मदद होनो थाखाय दङ'।" , contact: "इमेल: support@krishirakshak.com | फोन: +91 98765 43210", copyright: "© 2025 कृषि रक्षक। गासै हक सुरक्षित।" },
  },
  dogri: {
    nav: { home: "घर", about: "बारे च", services: "सेवाएं", contact: "संपर्क", signIn: "साइन इन", signUp: "साइन अप" },
    hero: { title: "कृषि रक्षक", subtitle: "स्मार्ट खेती दे समाधान", desc: "तुंदे खेत दा हून तगर दा सबने थमां स्मार्ट दोस्त।", getStarted: "शुरू करो", learnMore: "होर जानो" },
    services: { title: "असां दیاں ਸੇਵਾਵਾਂ", list: [] },
    about: { title: "कृषि रक्षक दे बारे च", desc: "कृषि रक्षक इक AI-संचालित खेती दा साथी ऐ जेह्ड़ा किसानें गी स्मार्ट, भरोसेमंद ते समें पर समाधान कन्नै सशक्त बनाने आस्तै डिजाइन कीता गेदा ऐ।" },
    footer: { title: "संपर्क च रौह्", desc: "सवाल न जां समर्थन दी लोड़ ऐ? अस तुंदी खेती दी यात्रा च तुंदी मदद करने आस्तै इत्थें आं।", contact: "ईमेल: support@krishirakshak.com | फोन: +91 98765 43210", copyright: "© 2025 कृषि रक्षक। सारे अधिकार सुरक्षित।" },
  },
  kashmiri: {
    nav: { home: "گھر", about: "بارس منز", services: "خدمات", contact: "رابطہ", signIn: "साइन इन", signUp: "साइन अप" },
    hero: { title: "کرِشِی رکشک", subtitle: "سمارٹ کھیتی حل", desc: "ژھہ نِشہ وُنِہ تام سارِوٕے کھوتہٕ سمارٹ دوست۔", getStarted: "شروع کرِیو", learnMore: "مزید زانِیو" },
    services: { title: "اسہ ہٕنز خدمات", list: [] },
    about: { title: "کرِشِی رکشک بارس منز", desc: "کرِشِی رکشک چھُ اکھ AI-طاقتہٕ وول کھیتی سۭتھی یُس کسانن سمارٹ، قابل اعتماد تہٕ بروقت حل فراہم کرنہٕ خٲطرٕ ڈیزائن چھُ آمت کرنہٕ۔" },
    footer: { title: "رابطس منز روزِیو", desc: "سوال چھُ یا مددٕچ ضرورت؟ أسہ چھِ ژھہ کھیتی سفرس منز مدد کرنہٕ خٲطرٕ ییتہٕ۔", contact: "ای میل: support@krishirakshak.com | فون: +91 98765 43210", copyright: "© 2025 کرِشِی رکشک۔ تمام حقوق محفوظ۔" },
  },
  konkani: {
    nav: { home: "घर", about: "विषयांत", services: "सेवा", contact: "संपर्क", signIn: "साइन इन", signUp: "साइन अप" },
    hero: { title: "कृषि रक्षक", subtitle: "स्मार्ट शेती उपाय", desc: "तुमच्या शेताचो आता मेरेनचो सगळ्यांत स्मार्ट इश्ट.", getStarted: "सुरवात करात", learnMore: "आनीक जाणून घेयात" },
    services: { title: "आमच्यो सेवा", list: [] },
    about: { title: "कृषि रक्षक विषयांत", desc: "कृषि रक्षक एक AI-शक्त दिवपी शेतीचो सांगाती, जो शेतकऱ्यांक स्मार्ट, विश्वासार्ह आनी वेळार उपाय दिवन सशक्त करपा खातीर तयार केला." },
    footer: { title: "संपर्कांत रावात", desc: "प्रश्न आसात वा आधाराची गरज आса? आम्ही तुमच्या शेतीच्या प्रवासांत तुमकां मदत करपाक हांगा आसात.", contact: "ईमेल: support@krishirakshak.com | फोन: +91 98765 43210", copyright: "© 2025 कृषि रक्षक। सर्व हक्क राखीव।" },
  },
  maithili: {
    nav: { home: "घर", about: "बारेमे", services: "सेवा", contact: "सम्पर्क", signIn: "साइन इन", signUp: "साइन अप" },
    hero: { title: "कृषि रक्षक", subtitle: "स्मार्ट खेती समाधान", desc: "अहाँक खेतक सबसँ स्मार्ट मित्र।", getStarted: "शुरू करू", learnMore: "और जानू" },
    services: { title: "हमर सेवा", list: [] },
    about: { title: "कृषि रक्षकक बारेमे", desc: "कृषि रक्षक एकटा AI-संचालित खेतीक साथी अछि जे किसानकेँ स्मार्ट, विश्वसनीय आओर समय पर समाधानक संग सशक्त बनेबाक लेल डिजाइन कएल गेल अछि।" },
    footer: { title: "सम्पर्कमे रहू", desc: "प्रश्न अछि वा समर्थनक आवश्यकता अछि? हम अहाँक खेतीक यात्रामे अहाँकेँ मदत करबाक लेल एत' छी।", contact: "ईमेल: support@krishirakshak.com | फोन: +91 98765 43210", copyright: "© 2025 कृषि रक्षक। सर्व अधिकार सुरक्षित।" },
  },
  manipuri: {
    nav: { home: "মুখ্য পৃষ্ঠ", about: "মরমদা", services: "সেবা", contact: "যোগাযোগ", signIn: "সাইন ইন", signUp: "সাইন আপ" },
    hero: { title: "কৃষি রক্ষক", subtitle: "স্মার্ট লৌউ সমাধান", desc: "নহাক্কী লৌবুক্কী ওইরবদি, খ্বাইদগী স্মার্ট মরূপ।", getStarted: "হৌদোকপা", learnMore: "খঙহনবীয়ু" },
    services: { title: "ঐখোয়গী সেবাশিং", list: [] },
    about: { title: "কৃষি রক্ষক মরমদা", desc: "কৃষি রক্ষক অসি AI-না শক্তি পীরবা লৌউ মরূপ অমনি, মসিনা লৌউবোকশিংদা স্মার্ট, থাজবা য়াবা অমসুং মতম চানা সমাধানশিং পীরদুনা শক্তি পীনবগীদমক দিজাইন তৌবনি।" },
    footer: { title: "যোগাযোগ তৌবীয়ু", desc: "ৱাহং লৈবরা নত্ত্রগা মতেং দরকার লৈবরা? ঐখোয় নহাক্কী লৌউ খোঙচৎতা মতেং পাংনবগীদমক মফমসিদা লৈরি।", contact: "ইমেল: support@krishirakshak.com | ফোন: +91 98765 43210", copyright: "© 2025 কৃষি রক্ষক। হকশিং שמורים।" },
  },
  nepali: {
    nav: { home: "गृह", about: "बारेमा", services: "सेवाहरू", contact: "सम्पर्क", signIn: "साइन इन", signUp: "साइन अप" },
    hero: { title: "कृषि रक्षक", subtitle: "स्मार्ट कृषि समाधान", desc: "तपाईंको खेतको अहिलेसम्मकै सबैभन्दा स्मार्ट साथी।", getStarted: "सुरु गर्नुहोस्", learnMore: "थप जान्नुहोस्" },
    services: { title: "हाम्रा सेवाहरू", list: [] },
    about: { title: "कृषि रक्षक बारेमा", desc: "कृषि रक्षक एक एआई-संचालित कृषि साथी हो जुन किसानहरूलाई स्मार्ट, भरपर्दो र समयमै समाधानहरू प्रदान गर्न डिजाइन गरिएको हो।" },
    footer: { title: "सम्पर्कमा रहनुहोस्", desc: "प्रश्नहरू छन् वा समर्थन चाहिन्छ? हामी तपाईंको कृषि यात्रामा मद्दत गर्न यहाँ छौं।", contact: "इमेल: support@krishirakshak.com | फोन: +91 98765 43210", copyright: "© 2025 कृषि रक्षक। सबै अधिकार सुरक्षित छन्।" },
  },
  sanskrit: {
    nav: { home: "गृहम्", about: "विषये", services: "सेवाः", contact: "सम्पर्कः", signIn: "साइन इन", signUp: "साइन अप" },
    hero: { title: "कृषि रक्षकः", subtitle: "स्मार्ट् कृषि समाधानम्", desc: "भवतः क्षेत्रस्य अद्यावधि सर्वाधिकं स्मार्ट् मित्रम्।", getStarted: "आरम्भं करोतु", learnMore: "अधिकं जानातु" },
    services: { title: "अस्माकं सेवाः", list: [] },
    about: { title: "कृषि रक्षकस्य विषये", desc: "कृषि रक्षकः एकः AI-चालितः कृषि-सहायकः अस्ति यः कृषकेभ्यः स्मार्ट्, विश्वसनीयानि, समये समाधानप्रदानाय च रचितः अस्ति।" },
    footer: { title: "सम्पर्के भवतु", desc: "प्रश्नाः सन्ति वा समर्थनस्य आवश्यकता अस्ति? वयं भवतः कृषि-यात्रायां साहाय्यार्थम् अत्र स्मः।", contact: "ई-मेल: support@krishirakshak.com | दूरवाणी: +91 98765 43210", copyright: "© 2025 कृषि रक्षकः। सर्वे अधिकाराः सुरक्षिताः।" },
  },
  santali: {
    nav: { home: "ᱚᱲᱟᱜ", about: "ᱤᱫᱤ ᱠᱟᱛᱮ", services: "ᱥᱮᱣᱟ", contact: "ᱡᱚ𝘨ᱟᱡᱚᱜ", signIn: "साइन इन", signUp: "साइन अप" },
    hero: { title: "कृषि रक्षक", subtitle: "स्मार्ट चास समाधान", desc: "आमাঃ খেতরেনাঃ এ কালরে সবচেয়ে স্মার্ট গাতি।", getStarted: "ᱮᱛᱚᱦᱚᱵ ᱢᱮ", learnMore: "ᱟᱨᱦᱚᱸ ᱵᱟᱰᱟᱭ ᱢᱮ" },
    services: { title: "आलेयाः सेवा को", list: [] },
    about: { title: "कृषि रक्षक रेयाঃ", desc: "कृषि रक्षक दो AI-ते चालाओ चास गाती काना जे चासी को स्मार्ट, भरोसा आर सही समय रे समाधान एम काते गोड़ो एम लागिं डिजाइन होए अकाना।" },
    footer: { title: "ᱡᱚ𝘨ᱟᱡᱚᱜ ᱨᱮ ᱛᱟᱦᱮᱱ ᱢᱮ", desc: "सवाल मेनाঃ आ বা সহায়তা দরকার? आले दो आमাঃ चास यात्रा रे गोड़ो एम लागिं नोडे मेनाঃ लेया।", contact: "ईमेल: support@krishirakshak.com | फोन: +91 98765 43210", copyright: "© 2025 कृषि रक्षक। सभी अधिकार सुरक्षित। " }
  },
  sindhi: {
    nav: { home: "گھر", about: "بابت", services: "خدمتون", contact: "رابطو", signIn: "साइन इन", signUp: "साइन अप" },
    hero: { title: "ڪرشي رکشک", subtitle: "اسمارٽ فارمنگ حل", desc: "توهان جي فارم جو سڀ کان هوشيار دوست.", getStarted: "شروع ڪريو", learnMore: "وڌيڪ ڄاڻو" },
    services: { title: "اسان جون خدمتون", list: [] },
    about: { title: "ڪرشي رکشک بابت", desc: "ڪرشي رکشک هڪ AI-طاقتور فارمنگ ساٿي آهي جيڪو هارين کي هوشيار، قابل اعتماد ۽ بروقت حل فراهم ڪرڻ لاءِ ٺاهيو ويو آهي." },
    footer: { title: "رابطي ۾ رهو", desc: "سوال آهن يا مدد جي ضرورت آهي؟ اسان هتي آهيون توهان جي فارمنگ جي سفر ۾ مدد ڪرڻ لاءِ.", contact: "اي ميل: support@krishirakshak.com | فون: +91 98765 43210", copyright: "© 2025 ڪرشي رکشک. سڀ حق محفوظ آهن." }
  },
};

export default function Home() {
  const [language, setLanguage] = useState("en");
  const handleLanguageChange = (e) => setLanguage(e.target.value);
  const t = translations[language] || translations.en;

  return (
    <div className="bg-white text-gray-800">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full flex justify-between items-center px-6 md:px-12 py-3 bg-white/80 backdrop-blur-md shadow-sm z-50">
        <div className="flex items-center gap-2">
          <img src="https://cdn-icons-png.flaticon.com/128/8371/8371964.png" alt="Logo" className="w-12 h-12" />
          <h1 className="text-xl font-bold text-green-700">{t.hero.title}</h1>
        </div>
        <ul className="hidden md:flex items-center space-x-8 font-semibold text-gray-600">
          <li><a href="#home" className="hover:text-green-600 transition">{t.nav.home}</a></li>
          <li><a href="#about" className="hover:text-green-600 transition">{t.nav.about}</a></li>
          <li><a href="#services" className="hover:text-green-600 transition">{t.nav.services}</a></li>
          <li><a href="#contact" className="hover:text-green-600 transition">{t.nav.contact}</a></li>
        </ul>
        <div className="flex items-center gap-4">
          {/* Language Selector */}
          <select
            onChange={handleLanguageChange}
            value={language}
            className="bg-transparent font-semibold text-gray-600 border-none focus:ring-0"
          >
            <option value="en">English</option>
            <option value="hi">हिन्दी</option>
            <option value="bn">বাংলা</option>
            <option value="te">తెలుగు</option>
            <option value="mr">मराठी</option>
            <option value="ta">தமிழ்</option>
            <option value="ur">اردو</option>
            <option value="gu">ગુજરાતી</option>
            <option value="kn">ಕನ್ನಡ</option>
            <option value="ml">മലയാളം</option>
            <option value="pa">ਪੰਜਾਬੀ</option>
            <option value="or">ଓଡ଼ିଆ</option>
            <option value="as">অসমীয়া</option>
            <option value="bodo">बोड़ो</option>
            <option value="dogri">डोगरी</option>
            <option value="kashmiri">कॉशुर</option>
            <option value="konkani">कोंकणी</option>
            <option value="maithili">मैथिली</option>
            <option value="manipuri">মৈতৈলোন্</option>
            <option value="nepali">नेपाली</option>
            <option value="sanskrit">संस्कृतम्</option>
            <option value="santali">ᱥᱟᱱᱛᱟᱲᱤ</option>
            <option value="sindhi">सिन्धी</option>
          </select>

          {/* Clerk Authentication */}
          <SignedOut>
            <SignInButton mode="modal">
              <button className="font-semibold text-gray-600 hover:text-green-600">{t.nav.signIn}</button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className="px-5 py-2 bg-green-600 text-white rounded-lg font-semibold shadow-md hover:bg-green-700 transition">{t.nav.signUp}</button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-start">
        <div className="absolute inset-0">
          <video
            src="https://cdn.pixabay.com/video/2022/09/17/131615-750742396_large.mp4"
            autoPlay
            loop
            muted
            className="w-full h-full object-cover"
          ></video>
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 ml-12 md:ml-24 max-w-xl bg-white/90 backdrop-blur-md p-10 rounded-xl shadow-lg"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-green-800 leading-tight">{t.hero.title}</h1>
          <h2 className="text-2xl font-semibold text-green-600 mt-2">{t.hero.subtitle}</h2>
          <p className="mt-4 text-gray-700 leading-relaxed">{t.hero.desc}</p>
          <div className="mt-8 flex gap-4">
            <a href="/cropdisease" className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold shadow-lg hover:bg-green-700 transition">{t.hero.getStarted}</a>
            <a href="#about" className="px-6 py-3 border border-green-600 text-green-700 rounded-lg font-semibold hover:bg-green-600 hover:text-white transition">{t.hero.learnMore}</a>
          </div>
        </motion.div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-8 bg-gray-50">
        <motion.h2
          className="text-4xl font-bold text-center text-green-700 mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {t.services.title}
        </motion.h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {translations.en.services.list.map((service, i) => ( // Always map over English list to keep structure
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <a href={service.link || "#"} className="block p-8 rounded-xl bg-white shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 text-center h-full">
                <div className="flex justify-center items-center mb-4">
                  <img src={service.icon} alt={service.title} className="w-16 h-16" />
                </div>
                {/* Get translated title and desc */}
                <h3 className="text-xl font-semibold text-green-700">{(t.services.list[i] && t.services.list[i].title) || service.title}</h3>
                <p className="mt-2 text-gray-600 text-sm">{(t.services.list[i] && t.services.list[i].desc) || service.desc}</p>
              </a>
            </motion.div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-8 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold text-green-700 mb-4">{t.about.title}</h3>
            <p className="text-gray-700 leading-relaxed">{t.about.desc}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <img
              src="https://t4.ftcdn.net/jpg/03/71/78/01/360_F_371780100_WkaXKXsM20FBh5JmDJAEFG4ufeK4DSwa.jpg"
              alt="Farmer working in a field"
              className="rounded-xl shadow-lg w-full h-auto"
            />
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-green-800 text-white py-12 px-8">
        <div className="max-w-6xl mx-auto text-center">
          <h4 className="text-2xl font-bold mb-3">{t.footer.title}</h4>
          <p className="max-w-2xl mx-auto mb-6">{t.footer.desc}</p>
          <p>{t.footer.contact}</p>
          <p className="mt-8 text-sm text-green-200">{t.footer.copyright}</p>
        </div>
      </footer>
    </div>
  );
}

