const modules = import.meta.globEager("./language/**/*.js");
function getLanguages(langs, prefix = "language") {
  let obj = {
    cn: {},
    en: {},
  };
  Object.keys(langs).forEach((key) => {
    const mod = langs[key].default;
    let k = key
      .replace(`./${prefix}/`, "")
      .replace(/^\.\//, "")
      .replace("/index", "");
    const lastIndex = k.lastIndexOf(".");
    k = k.substring(0, lastIndex);
    const keyList = k.split("/");
    const lang = keyList.pop(); 

    

    if (obj[lang]) {
      obj[lang][keyList[0]] = { ...mod };
    }
  });
  return obj;
}
const language = getLanguages(modules);

console.log(language)

export default language;
