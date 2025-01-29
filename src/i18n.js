import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = { 
    
  en: {
    translation: {
      "dashboard": "Dashboard",
      "welcome": "Welcome to our website!",
      "language": "Choose your language",
      "انشاء حساب": "Create Account",
      "تسجيل دخول": "Sign In",
      "description": "Your trusted platform for customs clearance",
      "المخلصين": "Brokers",
      "العملاء": "Clients", 
      "الصلاحيات": "Permissions",
      "احصائيات": "Statistics",
      "المحظورين": "Blacklist",
      "الاعدادات": "Settings",
      "التواصل معنا": "Contact Us",
      "خدمه العملاء": "Customer Service",
      "تسجيل الخروج": "Sign Out",
      "لوحه التحكم": "Dashboard",
      "أدوات العملاء": "Client Tools",
      "البحث": "Search",
      "الاسم": "Name",
      "البريد الالكتروني": "Email",
      "رقم الهاتف": "Phone Number", 
      "رقم الهويه": "ID Number",
      "حظر": "Block",
      "إدارة الصلاحيات": "Permissions Management",
      "المستخدم": "User",
      "الدور": "Role",
      "عرض العملاء": "View Clients",
      "إدارة العملاء": "Manage Clients", 
      "إدارة الطلبات": "Manage Orders",
      "إدارة الصلاحيات": "Manage Permissions",
      "حفظ": "Save",
      "مدير": "Manager",
      "موظف": "Employee"
    }
  },
  ar: {
    translation: {
      "welcome": "مرحبًا بك في موقعنا!",
      "language": "اختر لغتك",
      "انشاء حساب": "انشاء حساب",
      "تسجيل دخول": "تسجيل دخول", 
      "description": "منصتك الموثوقة للتخليص الجمركي",
      "المخلصين": "المخلصين",
      "العملاء": "العملاء",
      "الصلاحيات": "الصلاحيات", 
      "احصائيات": "احصائيات",
      "المحظورين": "المحظورين",
      "الاعدادات": "الاعدادات",
      "التواصل معنا": "التواصل معنا",
      "خدمه العملاء": "خدمه العملاء",
      "تسجيل الخروج": "تسجيل الخروج",
      "لوحه التحكم": "لوحه التحكم",
      "أدوات العملاء": "أدوات العملاء",
      "البحث": "البحث",
      "الاسم": "الاسم",
      "البريد الالكتروني": "البريد الالكتروني",
      "رقم الهاتف": "رقم الهاتف",
      "رقم الهويه": "رقم الهويه",
      "حظر": "حظر",
      "إدارة الصلاحيات": "إدارة الصلاحيات",
      "المستخدم": "المستخدم", 
      "الدور": "الدور",
      "عرض العملاء": "عرض العملاء",
      "إدارة العملاء": "إدارة العملاء",
      "إدارة الطلبات": "إدارة الطلبات", 
      "إدارة الصلاحيات": "إدارة الصلاحيات",
      "حفظ": "حفظ",
      "مدير": "مدير",
      "موظف": "موظف"
    }
  },



};

i18n
  .use(LanguageDetector) // الكشف التلقائي عن اللغة
  .use(initReactI18next) // التكامل مع React
  .init({
    resources,
    fallbackLng: 'en', // اللغة الافتراضية
    interpolation: {
      escapeValue: false, // منع هروب النصوص
    },
  });

export default i18n;
