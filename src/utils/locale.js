let localeList = {
    en: require('./locale/en.js'),
    pl: require('./locale/pl.js'),
}
let localeCode = localStorage.getItem('DTYM_LocaleForce') in localeList ? localStorage.getItem('DTYM_LocaleForce') : (localStorage.getItem('DTYM_Locale') in localeList ? localStorage.getItem('DTYM_Locale') : "en");

export default (string, ...params) =>
typeof(localeList[localeCode][string]) === "function" ? (localeList[localeCode][string](params) || "string not found") : (typeof(localeList["en"][string]) === "function" ? (localeList["en"][string](params) || "string not found") : "string not found");


export const setLocale = (langtable) => {
    for(let lang of langtable) {
        if(localStorage.getItem('DTYM_Locale') !== lang.code && lang.code in localeList) {
            localStorage.setItem('DTYM_Locale',lang.code);
            localeCode = lang.code;
            location.reload();
            break;
        }
        else if(localStorage.getItem('DTYM_Locale') === lang.code) break;
    }
}