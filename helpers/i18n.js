import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    translation: {
      'thanks.order': 'GIVE US A REVIEW',
      'help.us': 'Help us to become even better. Leave your feedback',
      'wallet': 'Wallet',
      'all': 'All',
      'news.promotion': 'NEWS & PROMOTIONS',
      'member.card': 'MEMBER CARD',
      'book.a.table': 'BOOK A TABLE',
      'gifts.for.point': 'GIFTS FOR POINT'
    },
  },
  gr: {
    translation: {
      'thanks.order': 'GEBEN SIE UNS EINE BEWERTUNG',
      'help.us': 'Helfen Sie uns, noch besser zu werden. Hinterlassen Sie Ihr Feedback',
      'wallet': 'Geldbörse',
      'all': 'Alle',
      'news.promotion': 'NEUIGKEITEN & AKTIONEN',
      'member.card': 'MITGLIEDSKARTE',
      'book.a.table': 'EINEN TISCH RESERVIEREN',
      'gifts.for.point': 'GESCHENKE FÜR PUNKT'
    },
  },
  ru: {
    translation: {
      'thanks.order': 'ДАЙТЕ НАМ ОБЗОР',
      'help.us': 'Помогите нам стать еще лучше. Оставьте свой отзыв',
      'wallet': 'кошелек',
      'all': 'Все',
      'news.promotion': 'НОВОСТИ И АКЦИИ',
      'member.card': 'ЧЛЕНСКАЯ КАРТА',
      'book.a.table': 'БРОНИРОВАТЬ СТОЛИК',
      'gifts.for.point': 'ПОДАРКИ ЗА БАЛЛЫ'
    },
  },
  ar: {
    translation: {
      'thanks.order': 'أعطنا مراجعة',
      'help.us': 'ساعدنا لنصبح أفضل. اترك ملاحظاتك',
      'wallet': 'محفظة',
      'all': 'الجميع',
      'news.promotion': 'الأخبار والعروض الترويجية',
      'member.card': 'بطاقة عضوية',
      'book.a.table': 'احجز طاولة',
      'gifts.for.point': 'هدايا للنقاط'
    },
  },
  id: {
    translation: {
      'thanks.order': 'BERIKAN REVIEW',
      'help.us': 'Bantu kami untuk menjadi lebih baik lagi. Tinggalkan umpan balik Anda',
      'wallet': 'Dompet',
      'all': 'Semua',
      'news.promotion': 'BERITA & PROMOSI',
      'member.card': 'KARTU ANGGOTA',
      'book.a.table': 'MEMESAN MEJA',
      'gifts.for.point': 'HADIAH DENGAN POIN'
    },
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    compatibilityJSON: 'v3',
    resources,
    lng: 'en', // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option
    fallbackLng: false,
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
