!function(){"use strict";var e={d:function(t,i){for(var n in i)e.o(i,n)&&!e.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:i[n]})},o:function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}},t={};e.d(t,{default:function(){return o}});var i=Object.freeze({ABBR:"abbreviation",ADDR:"address",ADR1:"address1",ADR2:"address2",ADR3:"address3",ADOP:"adoption",AFN:"ancestralFileNumber",AGE:"ageAtEvent",AGNC:"responsibleAgency",ALIA:"alias",ANCE:"ancestors",ANCI:"ancestorInterest",ANUL:"annulment",ASSO:"associates",AUTH:"author",BAPL:"baptismLDS",BAPM:"baptism",BARM:"barMitzvah",BASM:"basMitzvah",BIRT:"birth",BLES:"blessing",BLOB:"binaryObject",BURI:"burial",CALN:"callNumber",CAST:"caste",CAUS:"cause",CENS:"census",CHAN:"change",CHAR:"character",CHIL:"child",CHR:"christening",CHRA:"adultChristening",CITY:"city",CONC:"concatenation",CONF:"confirmation",CONL:"confirmationLDS",CONT:"continued",COPR:"copyright",CORP:"corporate",CREA:"creation",CREM:"cremation",CROP:"crop",CTRY:"country",DATA:"data",DATE:"date",DEAT:"death",DESC:"descendants",DESI:"descendantInterest",DEST:"destination",DIV:"divorce",DIVF:"divorceFiling",DSCR:"physicalDescription",EDUC:"education",EMAIL:"email",EMIG:"emigration",ENDL:"endowment",ENGA:"engagement",EVEN:"event",EXID:"externalIdentifier",FACT:"fact",FAM:"family",FAMC:"familyChild",FAMF:"familyFile",FAMS:"familySpouse",FAX:"facsimile",FCOM:"firstCommunion",FILE:"file",FORM:"format",GEDC:"gedcom",GIVN:"givenName",GRAD:"graduation",HEAD:"header",HEIGHT:"heightInPixels",HUSB:"husband",IDNO:"identificationNumber",IMMI:"immigration",INDI:"individual",INIL:"initiatoryLatterDay",LANG:"language",LEFT:"leftCropWidth",LEGA:"legatee",LATI:"lat",LONG:"lng",MAP:"map",MARB:"marriageBans",MARC:"marriageContract",MARL:"marriageLicense",MARR:"marriage",MARS:"marriageSettlement",MEDI:"medium",MIME:"mediaType",NAME:"name",NATI:"nationality",NATU:"naturalization",NCHI:"childrenNumber",NICK:"nickname",NMR:"marriageCount",NO:"didNotHappen",NOTE:"note",NPFX:"namePrefix",NSFX:"nameSuffix",OBJE:"object",OCCU:"occupation",ORDI:"ordinance",ORDN:"ordination",PAGE:"page",PEDI:"pedigree",PHON:"phone",PHRASE:"phrase",PLAC:"place",POST:"postalCode",PROB:"probate",PROP:"property",PUBL:"publication",QUAY:"quality",REFN:"reference",RELA:"relationship",RELI:"religion",REPO:"repository",RESI:"residence",RESN:"restriction",RETI:"retirement",RFN:"recordFileNumber",RIN:"recordIdNumber",ROLE:"role",SCHMA:"schema",SDATE:"sortDate",SEX:"sex",SLGC:"sealingChild",SLGS:"sealingSpouse",SNOTE:"sharedNote",SOUR:"source",SPFX:"surnamePrefix",SSN:"socialSecurityNumber",STAE:"state",STAT:"status",SUBM:"submiter",SUBN:"submission",SURN:"surname",TAG:"tag",TEMP:"temple",TEXT:"text",TIME:"time",TITL:"title",TOP:"topCropWidth",TRAN:"translation",TRLR:"trailer",TYPE:"type",UID:"uniqueIdentifier",VERS:"version",WIDTH:"widthInPixel",WIFE:"wife",WILL:"will",WWW:"webAddress"}),n=Object.freeze(["ADOP","ANUL","BAPM","BARM","BASM","BIRT","BLES","BURI","CENS","CHR","CHRA","CONF","CREM","DEAT","DIV","DIVF","EMIG","ENGA","FCOM","GRAD","IMMI","MARB","MARC","MARL","MARR","MARS","NATU","ORDN","PROB","RETI","WILL"]);function s(e){return s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},s(e)}function r(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,a(n.key),n)}}function a(e){var t=function(e){if("object"!=s(e)||!e)return e;var t=e[Symbol.toPrimitive];if(void 0!==t){var i=t.call(e,"string");if("object"!=s(i))return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e);return"symbol"==s(t)?t:t+""}var o=function(){return e=function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._head={},this._submissions={},this._submitters={},this._individuals={},this._families={},this._notes={},this._sources={},this._repositories={},this._objects={},this._events={},this._places={},this._citations={},this._gedcom=null,this._lines=[]},(t=[{key:"loadGedcom",value:function(e){this._parseGedcom(e),console.log(this)}},{key:"_parseGedcom",value:function(e){this.__formatRawGedcom(e);for(var t=0;t<this._lines.length;++t)"0"===this._lines[t].split(" ")[0]&&(t=this.__newStructure(this._lines,t))}},{key:"__formatRawGedcom",value:function(e){-1!==e.indexOf("\r\n")?(this._gedcom=e.replace(/[\r]+/g,""),this._lines=this._gedcom.split("\n")):-1===e.indexOf("\r")&&-1!==e.indexOf("\n")?(this._gedcom=e,this._lines=this._gedcom.split("\n")):(this._gedcom=e,this._lines=this._gedcom.split("\r"))}},{key:"__newStructure",value:function(e,t){var i=e[t].split(" "),n=this.__getNextElementIndex(e,t,"0"),s=this.__extractItemValuesFromLines(e,1,t,n);if("HEAD"===i[1])this._head=s;else if("SUBN"===i[2])this._submissions=s;else if("SUBM"===i[2])this._submitters["".concat(i[1])]=s;else if("INDI"===i[2])this._individuals["".concat(i[1])]=s;else if("FAM"===i[2])this._families["".concat(i[1])]=s;else if("NOTE"===i[2])this._notes["".concat(i[1])]=s;else if("SOUR"===i[2])this._sources["".concat(i[1])]=s;else if("REPO"===i[2])this._repositories["".concat(i[1])]=s;else if("OBJE"===i[2])this._objects["".concat(i[1])]=s;else if("TRLR"===i[1])return e.length;return n-1}},{key:"__getNextElementIndex",value:function(e,t,i){for(var n=t+1;n<e.length;++n){var s=e[n].split(" ");if(parseInt(s[0])<parseInt(i))return n-1;if(s[0]===i)return n}return t}},{key:"__extractItemValuesFromLines",value:function(e,t,s,r){for(var a=[],o=s;o<r;++o)parseInt(e[o].split(" ")[0])===t&&a.push(o);a[a.length-1]!==r&&a.push(r);for(var c={},l=0;l<a.length-1;++l){var u=e[a[l]],f=u.split(" ")[1],h=u.split("".concat(f," "))[1],d=i[f];if(void 0===d&&(console.warn("Non-standard item tag met on line ".concat(a[l]+1," : ").concat(f)),d=f),a[l+1]-a[l]==1||void 0===a[l+1])this.__setItemValue(c,d,h);else{c[d]={};var _=e[a[l]+1].split(" ")[1];if("CONT"===_||"CONC"===_){c[d]=h;for(var m=1;"CONT"===_||"CONC"===_;){var p=e[a[l]+m].split("".concat(_," "))[1];c[d]+="".concat("CONT"===_?"":"\n").concat(p),++m,_=e[a[l]+m].split(" ")[1]}}else{void 0!==h&&(c[d][d]=h);var O=this.__extractItemValuesFromLines(e,t+1,a[l],a[l+1]);Object.assign(c[d],O),"PLAC"===f?c[d]=this.__appendNonStandardElement(c[d],this._places,"P"):"SOUR"===f?c[d]=this.__appendNonStandardElement(c[d],this._citations,"C"):-1!==n.indexOf(f)&&(c[d]=this.__appendNonStandardElement(c[d],this._events,"E"))}}}return c}},{key:"__setItemValue",value:function(e,t,i){if(void 0===e[t])e[t]=i;else if(Array.isArray(e[t]))e[t].push(i);else{var n=e[t];e[t]=[n,i]}}},{key:"__appendNonStandardElement",value:function(e,t,i){for(var n=Object.keys(t),s=!1,r="@".concat(i,"00000@"),a=0;a<n.length;++a)if(JSON.stringify(e)===JSON.stringify(t[n[a]])){s=!0,r=n[a];break}if(!s)if(n.length>0){var o=n[n.length-1].replace("@","").replace(i,"");o=parseInt(o)+1,t[r="@".concat(i).concat(("00000"+o).slice(-5),"@")]=e}else t[r]=e;return r}},{key:"exportGedcom",value:function(){if(this._gedcom){var e="0 HEAD";e+=this.__flattenObject(this._head,1);for(var t=Object.keys(this._submissions),i=0;i<t.length;++i)e+="\n0 ".concat(t[i]," SUBN"),e+=this.__flattenObject(this._submissions[t[i]],1);t=Object.keys(this._submitters);for(var n=0;n<t.length;++n)e+="\n0 ".concat(t[n]," SUBM"),e+=this.__flattenObject(this._submitters[t[n]],1);t=Object.keys(this._individuals);for(var s=0;s<t.length;++s)e+="\n0 ".concat(t[s]," INDI"),e+=this.__flattenObject(this._individuals[t[s]],1);t=Object.keys(this._families);for(var r=0;r<t.length;++r)e+="\n0 ".concat(t[r]," FAM"),e+=this.__flattenObject(this._families[t[r]],1);t=Object.keys(this._notes);for(var a=0;a<t.length;++a)e+="\n0 ".concat(t[a]," NOTE"),e+=this.__flattenObject(this._notes[t[a]],1);t=Object.keys(this._sources);for(var o=0;o<t.length;++o)e+="\n0 ".concat(t[o]," SOUR"),e+=this.__flattenObject(this._sources[t[o]],1);t=Object.keys(this._repositories);for(var c=0;c<t.length;++c)e+="\n0 ".concat(t[c]," REPO"),e+=this.__flattenObject(this._repositories[t[c]],1);t=Object.keys(this._objects);for(var l=0;l<t.length;++l)e+="\n0 ".concat(t[l]," OBJE"),e+=this.__flattenObject(this._objects[t[l]],1);return e+="\n0 TRLR\n",console.log(e),e}console.error("No GEDCOM loaded")}},{key:"__flattenObject",value:function(e,t){for(var s=this,r=function(e){return-1!==["SOUR"].indexOf(e)||-1!==n.indexOf(e)},a=function(e,i){var r="";if("SOUR"===e){var a=s._citations[i];void 0!==a?(a.source?(r+="\n".concat(t," SOUR ").concat(a.source),delete a.source):r+="\n".concat(t," SOUR"),r+=s.__flattenObject(a,t+1)):r+="\n".concat(t," SOUR ").concat(i)}else if(-1!==n.indexOf(e)){var o=s._events[i];void 0!==o?(r+="\n".concat(t," ").concat(e),r+=s.__flattenObject(o,t+1)):r+="\n".concat(t," ").concat(e," ").concat(i)}return r},o="",c=Object.keys(e),l=function(n){var l=Object.keys(i).find((function(e){return i[e]===c[n]}));"string"==typeof e[c[n]]?r(l)?o+=a(l,e[c[n]]):o+="\n".concat(t," ").concat(l," ").concat(e[c[n]]):r(l)?o+=a(l,e[c[n]]):(e[c[n]][c[n]]?(o+="\n".concat(t," ").concat(l," ").concat(e[c[n]][c[n]]),delete e[c[n]][c[n]]):o+="\n".concat(t," ").concat(l),o+=s.__flattenObject(e[c[n]],t+1))},u=0;u<c.length;++u)l(u);return o}},{key:"head",get:function(){return this._head}},{key:"submissions",get:function(){return this._submissions}},{key:"submitters",get:function(){return this._submitters}},{key:"individuals",get:function(){return this._individuals}},{key:"families",get:function(){return this._families}},{key:"notes",get:function(){return this._notes}},{key:"sources",get:function(){return this._sources}},{key:"repositories",get:function(){return this._repositories}},{key:"objects",get:function(){return this._objects}},{key:"citations",get:function(){return this._citations}},{key:"events",get:function(){return this._events}},{key:"places",get:function(){return this._places}}])&&r(e.prototype,t),Object.defineProperty(e,"prototype",{writable:!1}),e;var e,t}();window.JsGEDCOM=t.default}();