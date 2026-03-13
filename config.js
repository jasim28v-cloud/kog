// إعدادات Firebase العامة (بدون تسجيل دخول)
const firebaseConfig = { databaseURL: "https://project-717e4-default-rtdb.firebaseio.com/" };
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// روابط الإعلانات الموزعة
const ADS = [
    "https://www.effectivegatecpm.com/ywn2a0wz7?key=7433561eca4a0920fafc9d653809bab2", // لايك
    "https://www.effectivegatecpm.com/f1rpr4x6na?key=3f71d8641b99c667506687ede5ebac90", // مشاركة
    "https://www.effectivegatecpm.com/t3rvmzpu?key=26330eef1cb397212db567d1385dc0b9", // تعليق
    "https://www.effectivegatecpm.com/w6ejwgptb?key=b77b52a8f4f7e4cdd1ac7bccc1b04a4d"  // اسم الموقع
];

function fireAd(index) { window.open(ADS[index-1], '_blank'); }
