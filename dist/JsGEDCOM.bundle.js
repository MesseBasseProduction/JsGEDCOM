!function(){"use strict";var e={d:function(t,n){for(var i in n)e.o(n,i)&&!e.o(t,i)&&Object.defineProperty(t,i,{enumerable:!0,get:n[i]})},o:function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}},t={};e.d(t,{default:function(){return o}});var n=Object.freeze({ABBR:"abbreviation",ADDR:"address",ADR1:"address1",ADR2:"address2",ADR3:"address3",ADOP:"adoption",AFN:"ancestralFileNumber",AGE:"ageAtEvent",AGNC:"responsibleAgency",ALIA:"alias",ANCE:"ancestors",ANCI:"ancestorInterest",ANUL:"annulment",ASSO:"associates",AUTH:"author",BAPL:"baptismLDS",BAPM:"baptism",BARM:"barMitzvah",BASM:"basMitzvah",BIRT:"birth",BLES:"blessing",BLOB:"binaryObject",BURI:"burial",CALN:"callNumber",CAST:"caste",CAUS:"cause",CENS:"census",CHAN:"change",CHAR:"character",CHIL:"child",CHR:"christening",CHRA:"adultChristening",CITY:"city",CONC:"concatenation",CONF:"confirmation",CONL:"confirmationLDS",CONT:"continued",COPR:"copyright",CORP:"corporate",CREA:"creation",CREM:"cremation",CROP:"crop",CTRY:"country",DATA:"data",DATE:"date",DEAT:"death",DESC:"descendants",DESI:"descendantInterest",DEST:"destination",DIV:"divorce",DIVF:"divorceFiling",DSCR:"physicalDescription",EDUC:"education",EMAIL:"email",EMIG:"emigration",ENDL:"endowment",ENGA:"engagement",EVEN:"event",EXID:"externalIdentifier",FACT:"fact",FAM:"family",FAMC:"familyChild",FAMF:"familyFile",FAMS:"familySpouse",FAX:"facsimile",FCOM:"firstCommunion",FILE:"file",FORM:"format",GEDC:"gedcom",GIVN:"givenName",GRAD:"graduation",HEAD:"header",HEIGHT:"heightInPixels",HUSB:"husband",IDNO:"identificationNumber",IMMI:"immigration",INDI:"individual",INIL:"initiatoryLatterDay",LANG:"language",LEFT:"leftCropWidth",LEGA:"legatee",LATI:"lat",LONG:"lng",MAP:"map",MARB:"marriageBans",MARC:"marriageContract",MARL:"marriageLicense",MARR:"marriage",MARS:"marriageSettlement",MEDI:"medium",MIME:"mediaType",NAME:"name",NATI:"nationality",NATU:"naturalization",NCHI:"childrenNumber",NICK:"nickname",NMR:"marriageCount",NO:"didNotHappen",NOTE:"note",NPFX:"namePrefix",NSFX:"nameSuffix",OBJE:"object",OCCU:"occupation",ORDI:"ordinance",ORDN:"ordination",PAGE:"page",PEDI:"pedigree",PHON:"phone",PHRASE:"phrase",PLAC:"place",POST:"postalCode",PROB:"probate",PROP:"property",PUBL:"publication",QUAY:"quality",REFN:"reference",RELA:"relationship",RELI:"religion",REPO:"repository",RESI:"residence",RESN:"restriction",RETI:"retirement",RFN:"recordFileNumber",RIN:"recordIdNumber",ROLE:"role",SCHMA:"schema",SDATE:"sortDate",SEX:"sex",SLGC:"sealingChild",SLGS:"sealingSpouse",SNOTE:"sharedNote",SOUR:"source",SPFX:"surnamePrefix",SSN:"socialSecurityNumber",STAE:"state",STAT:"status",SUBM:"submiter",SUBN:"submission",SURN:"surname",TAG:"tag",TEMP:"temple",TEXT:"text",TIME:"time",TITL:"title",TOP:"topCropWidth",TRAN:"translation",TRLR:"trailer",TYPE:"type",UID:"uniqueIdentifier",VERS:"version",WIDTH:"widthInPixel",WIFE:"wife",WILL:"will",WWW:"webAddress"}),i=Object.freeze(["ADOP","ANUL","BAPM","BARM","BASM","BIRT","BLES","BURI","CENS","CHR","CHRA","CONF","CREM","DEAT","DIV","DIVF","EMIG","ENGA","FCOM","GRAD","IMMI","MARB","MARC","MARL","MARR","MARS","NATU","ORDN","PROB","RETI","WILL"]);function s(e){return s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},s(e)}function r(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,a(i.key),i)}}function a(e){var t=function(e){if("object"!=s(e)||!e)return e;var t=e[Symbol.toPrimitive];if(void 0!==t){var n=t.call(e,"string");if("object"!=s(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e);return"symbol"==s(t)?t:t+""}var o=function(){return e=function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._head={},this._submissions={},this._submitters={},this._individuals={},this._families={},this._notes={},this._sources={},this._repositories={},this._objects={},this._events={},this._places={},this._citations={},this._gedcom=null,this._lines=[]},(t=[{key:"loadGedcom",value:function(e){this._parseGedcom(e),console.log(this)}},{key:"_parseGedcom",value:function(e){this.__formatRawGedcom(e);for(var t=0;t<this._lines.length;++t)"0"===this._lines[t].split(" ")[0]&&(t=this.__newStructure(this._lines,t))}},{key:"__formatRawGedcom",value:function(e){-1!==e.indexOf("\r\n")?(this._gedcom=e.replace(/[\r]+/g,""),this._lines=this._gedcom.split("\n")):-1===e.indexOf("\r")&&-1!==e.indexOf("\n")?(this._gedcom=e,this._lines=this._gedcom.split("\n")):(this._gedcom=e,this._lines=this._gedcom.split("\r"))}},{key:"__newStructure",value:function(e,t){var n=e[t].split(" "),i=this.__getNextElementIndex(e,t,"0"),s=this.__extractItemValuesFromLines(e,1,t,i);if("HEAD"===n[1])this._head=s;else if("SUBN"===n[2])this._submissions["".concat(n[1])]=s;else if("SUBM"===n[2])this._submitters["".concat(n[1])]=s;else if("INDI"===n[2])this._individuals["".concat(n[1])]=s;else if("FAM"===n[2])this._families["".concat(n[1])]=s;else if("NOTE"===n[2])this._notes["".concat(n[1])]=s,this._notes["".concat(n[1])].note=n.slice(3,n.length).join(" ");else if("SOUR"===n[2])this._sources["".concat(n[1])]=s;else if("REPO"===n[2])this._repositories["".concat(n[1])]=s;else if("OBJE"===n[2])this._objects["".concat(n[1])]=s;else if("TRLR"===n[1])return e.length;return i-1}},{key:"__getNextElementIndex",value:function(e,t,n){for(var i=t+1;i<e.length;++i){var s=e[i].split(" ");if(parseInt(s[0])<parseInt(n))return i-1;if(s[0]===n)return i}return t}},{key:"__extractItemValuesFromLines",value:function(e,t,s,r){for(var a=[],o=s;o<r;++o)parseInt(e[o].split(" ")[0])===t&&a.push(o);a[a.length-1]!==r&&a.push(r);for(var c={},l=0;l<a.length-1;++l){var u=e[a[l]],h=u.split(" ")[1],_=u.split("".concat(h," "))[1];u.split("".concat(h," ")).length>2&&(_=u.split("".concat(h," ")).slice(1).join("".concat(h," ")));var f=n[h];if(void 0===f&&(console.warn("Non-standard item tag met on line ".concat(a[l]+1," : ").concat(h)),f=h),a[l+1]-a[l]==1||void 0===a[l+1])this.__setItemValue(c,f,_);else{var d=e[a[l]+1].split(" ")[1];if("CONT"===d||"CONC"===d){var m={};void 0!==_&&(m[f]=_);for(var p=1;"CONT"===d||"CONC"===d;){var g=e[a[l]+p].split("".concat(d," "))[1];m[f]+="".concat("CONT"===d?"<I°_°I>":"(ツ)_/¯").concat(g),++p,d=e[a[l]+p].split(" ")[1]}if(a[l]+p<a[l+1]){var v=m[f];m[f]={},m[f][f]=v;var O=this.__extractItemValuesFromLines(e,t+1,a[l]+p,a[l+1]);Object.assign(m[f],O),"PLAC"===h?m[f]=this.__appendNonStandardElement(m[f],this._places,"P"):"SOUR"===h?m[f]=this.__appendNonStandardElement(m[f],this._citations,"C"):-1!==i.indexOf(h)&&(m[f]=this.__appendNonStandardElement(m[f],this._events,"E"))}if(c[f])if(!0===Array.isArray(c[f]))c[f].push(m[f]);else{var S=c[f];c[f]=[],c[f].push(S),c[f].push(m[f])}else c[f]=m[f]}else{var A={};void 0!==_&&(A[f]=_);var b=this.__extractItemValuesFromLines(e,t+1,a[l],a[l+1]);if(Object.assign(A,b),"PLAC"===h?A=this.__appendNonStandardElement(A,this._places,"P"):"SOUR"===h?A=this.__appendNonStandardElement(A,this._citations,"C"):-1!==i.indexOf(h)&&(A=this.__appendNonStandardElement(A,this._events,"E")),c[f])if(!0===Array.isArray(c[f]))c[f].push(A);else{var y=c[f];c[f]=[],c[f].push(y),c[f].push(A)}else c[f]=A}}}return c}},{key:"__setItemValue",value:function(e,t,n){if(void 0===e[t])e[t]=n;else if(Array.isArray(e[t]))e[t].push(n);else{var i=e[t];e[t]=[i,n]}}},{key:"__appendNonStandardElement",value:function(e,t,n){for(var i=Object.keys(t),s=!1,r="@".concat(n,"00000@"),a=0;a<i.length;++a)if(JSON.stringify(e)===JSON.stringify(t[i[a]])){s=!0,r=i[a];break}if(!s)if(i.length>0){var o=i[i.length-1].replace("@","").replace(n,"");o=parseInt(o)+1,t[r="@".concat(n).concat(("00000"+o).slice(-5),"@")]=e}else t[r]=e;return r}},{key:"exportGedcom",value:function(){if(this._gedcom){var e="0 HEAD";e+=this.__flattenObject(this._head,1);var t=Object.keys(this._submissions);if(this._submissions)for(var n=0;n<t.length;++n)e+="\n0 ".concat(t[n]," SUBN"),e+=this.__flattenObject(this._submissions[t[n]],1);t=Object.keys(this._submitters);for(var i=0;i<t.length;++i)e+="\n0 ".concat(t[i]," SUBM"),e+=this.__flattenObject(this._submitters[t[i]],1);t=Object.keys(this._individuals);for(var s=0;s<t.length;++s)e+="\n0 ".concat(t[s]," INDI"),e+=this.__flattenObject(this._individuals[t[s]],1);t=Object.keys(this._families);for(var r=0;r<t.length;++r)e+="\n0 ".concat(t[r]," FAM"),e+=this.__flattenObject(this._families[t[r]],1);t=Object.keys(this._sources);for(var a=0;a<t.length;++a)e+="\n0 ".concat(t[a]," SOUR"),e+=this.__flattenObject(this._sources[t[a]],1);t=Object.keys(this._repositories);for(var o=0;o<t.length;++o)e+="\n0 ".concat(t[o]," REPO"),e+=this.__flattenObject(this._repositories[t[o]],1);t=Object.keys(this._notes);for(var c=0;c<t.length;++c){var l="";""!==this._notes[t[c]].note&&(l=" ".concat(this._notes[t[c]].note)),e+="\n0 ".concat(t[c]," NOTE").concat(l),delete this._notes[t[c]].note,e+=this.__flattenObject(this._notes[t[c]],1)}t=Object.keys(this._objects);for(var u=0;u<t.length;++u)e+="\n0 ".concat(t[u]," OBJE"),e+=this.__flattenObject(this._objects[t[u]],1);return e+="\n0 TRLR\n",console.log(e),e}console.error("No GEDCOM loaded")}},{key:"__flattenObject",value:function(e,t){var i=this;if(!e)return"";for(var s="",r=Object.keys(e),a=function(a){var o=Object.keys(n).find((function(e){return n[e]===r[a]}));void 0===o&&(o=r[a]),"string"==typeof e[r[a]]?s+=i.__processStringElement(o,e[r[a]],r[a],t):!0===Array.isArray(e[r[a]])?s+=i.__processArrayElement(o,e[r[a]],r[a],t):s+=i.__processObjectElement(o,e,r[a],t)},o=0;o<r.length;++o)a(o);return s}},{key:"__isLinkedValue",value:function(e){return-1!==["SOUR","PLAC"].indexOf(e)||-1!==i.indexOf(e)}},{key:"__getLinkedValue",value:function(e,t,n,s){var r="";if("SOUR"===e)if(void 0!==this._citations[t]){var a=Object.assign({},this._citations[t]);a.source?(r+=this.__splitStringInSegments("SOUR",a.source,s),delete a.source):r+=this.__splitStringInSegments("SOUR",t,s),r+=this.__flattenObject(a,s+1)}else r+=this.__splitStringInSegments("SOUR",t,s);else if("PLAC"===e)if(void 0!==this._places[t]){var o=Object.assign({},this._places[t]);o.place?(r+=this.__splitStringInSegments("PLAC",o.place,s),delete o.place):r+="\n".concat(s," PLAC"),r+=this.__flattenObject(o,s+1)}else r+=this.__splitStringInSegments("PLAC",t,s);else if(-1!==i.indexOf(e))if(void 0!==this._events[t]){var c=Object.assign({},this._events[t]);c[n]?(r+=this.__splitStringInSegments(e,c[n],s),delete c[n]):r+="\n".concat(s," ").concat(e),r+=this.__flattenObject(c,s+1)}else r+=this.__splitStringInSegments(e,t,s);return r}},{key:"__processStringElement",value:function(e,t,n,i){return this.__isLinkedValue(e)?this.__getLinkedValue(e,t,n,i):this.__splitStringInSegments(e,t,i)}},{key:"__processArrayElement",value:function(e,t,n,i){for(var s="",r=0;r<t.length;++r)"string"==typeof t[r]||t[r]instanceof String?s+=this.__processStringElement(e,t[r],n,i):(t[r]&&t[r][n]?(s+=this.__splitStringInSegments(e,t[r][n],i),delete t[r][n]):s+="\n".concat(i," ").concat(e),s+=this.__flattenObject(t[r],i+1));return s}},{key:"__processObjectElement",value:function(e,t,n,i){var s="";return this.__isLinkedValue(e)?s+=this.__getLinkedValue(e,t[n],n,i):(t[n]&&t[n][n]?(s+=this.__splitStringInSegments(e,t[n][n],i),delete t[n][n]):s+="\n".concat(i," ").concat(e),s+=this.__flattenObject(t[n],i+1)),s}},{key:"__splitStringInSegments",value:function(e,t,n){var i=function(e,t,n,i){var s=e.split(t);if(s.length>1)for(var r=0;r<s.length;++r)i.push({segment:s[r],replacor:n})},s=[];i(t,"<I°_°I>","CONT",s),0===s.length&&i(t,"(ツ)_/¯","CONC",s);for(var r=0;!(r>=s.length);){var a=[];i(s[r].segment,"(ツ)_/¯","CONC",a),a.length>0?(a[0].replacor=s[r].replacor,s.splice(r,1),s.splice.apply(s,[r,0].concat(a)),r+=a.length):++r}var o="";if(0===s.length){var c=t.match(new RegExp(".{1,".concat(248,"}"),"gs"));if(""===t&&null===c)o+="\n".concat(n," ").concat(e);else if(1===c.length)o+="\n".concat(n," ").concat(e," ").concat(t);else for(var l=1;l<c.length;++l)o+="\n".concat(n+1," CONT ").concat(c[l])}else{o+="\n".concat(n," ").concat(e," ").concat(s[0].segment);for(var u=1;u<s.length;++u)o+="\n".concat(n+1," ").concat(s[u].replacor," ").concat(s[u].segment)}return o}},{key:"head",get:function(){return this._head}},{key:"submissions",get:function(){return this._submissions}},{key:"submitters",get:function(){return this._submitters}},{key:"individuals",get:function(){return this._individuals}},{key:"families",get:function(){return this._families}},{key:"notes",get:function(){return this._notes}},{key:"sources",get:function(){return this._sources}},{key:"repositories",get:function(){return this._repositories}},{key:"objects",get:function(){return this._objects}},{key:"citations",get:function(){return this._citations}},{key:"events",get:function(){return this._events}},{key:"places",get:function(){return this._places}}])&&r(e.prototype,t),Object.defineProperty(e,"prototype",{writable:!1}),e;var e,t}();window.JsGEDCOM=t.default}();