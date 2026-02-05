import GedcomEnum from './GedcomEnum';
import EventsEnum from './EventsEnum';


const VERSION = '0.1.0'; // Beta candidate on 2026-02-05, must be tested at least a year before 1.0.0 is released
const DEBUG = true;


// - GEDCOM v7 (100% support on stress test file - 2026-02-05)
// https://gedcom.io/specifications/FamilySearchGEDCOMv7.pdf
// - GEDCOM v5.5.1 (100% support on stress test file - 2026-02-05)
// https://gedcom.io/specifications/ged551.pdf
// - GEDCOM v5.5 (100% support on stress test file - 2026-02-05)
// https://gedcom.io/specifications/ged55.pdf
//
// https://gedcom.io/specs/


class JsGEDCOM {


  /** 
   * @class
   * @constructor
   * @summary <h1>JsGEDCOM to handle GEDCOM documents</h1>
   * @author Arthur Beaulieu
   * @since February 2025
   * @licence GPL-v3.0
   * @description <blockquote>
   * This class is a generic gedcom handler ; it serve three main purposes :
   * 1. Read and store a .ged file as a gedcom structure
   * 2. Create a gedcom structure, and allow manipulation on it
   * 3. Export this structure or build an output file to be downloaded
   * So far, GEDCOM versions v5.5, v5.5.1 and v7.0 are supported and are
   * implemented here following the official GEDCOM specification .
   * </blockquote>
   **/
  constructor() {
    if (DEBUG === true) { console.log(`JsGEDCOM v${VERSION}`); }
    // Official objects
    this._head = {};
    this._submissions = {};    
    this._submitters = {};    
    this._individuals = {};
    this._families = {};
    this._notes = {};
    this._snotes = {}; // v7 only
    this._sources = {};
    this._repositories = {};
    this._objects = {};
    // Additionnal, unspecified ones
    this._events = {};
    this._places = {};
    this._citations = {};
  }


  // ======================================================================== //
  // ---------------------- GEDCOM Loading & Parsing ------------------------ //
  // ======================================================================== //
  

  /**
   * @method
   * @name loadGedcom
   * @public
   * @memberof JsGEDCOM
   * @author Arthur Beaulieu
   * @since February 2025
   * @description <blockquote>
   * With a GEDCOM input as a string, this method will parse its content and
   * store all its informations as a structured object that can be manipulated
   * easily in an app.
   * </blockquote>
   * @param {string} gedcom - The gedcom input string
   **/
  loadGedcom(gedcom) {
    if (DEBUG === true) { console.log(`JsGEDCOM.loadGedcom() called`); }
    this._parseGedcom(gedcom);
    if (DEBUG === true) { console.log(`JsGEDCOM.loadGedcom() GEDCOM file loaded`, this); }
  }


  _parseGedcom(gedcom) {
    if (DEBUG === true) { console.log(`JsGEDCOM._parseGedcom() called`); }
    // GEDCOM parsing occur in few steps :
    // Sanitize line breaks, split raw data into lines to be read
    // Then we opted for recurive parsing :
    // For each level-0 structure met, we call __newStructure()
    // method, which will return the next line index leading to
    // the next level 0 structure.
    // In the meantime, we parse this level 0 structure, by splitting
    // interval into bound, for each levels deeper than 0, and recusively to each
    // level deeper etc.

    // Sanitize line by removing chariot returns and splitting by lines
    const lines = this.__formatRawGedcom(gedcom);
    // Iterate through all lines to detect items
    for (let i = 0; i < lines.length; ++i) {
      const lineElements = lines[i].split(' ');
      // New item detected, inner iterate to retrieve all info for current item
      if (lineElements[0] === '0') {
        i = this.__newStructure(lines, i);
      }
    }

    //TODO check validity wit mand elements (last line, head etc)
  }


  __formatRawGedcom(rawGedcom) {
    let gedcom = rawGedcom;
    if (rawGedcom.indexOf('\r\n') !== -1) { // CR LF
      gedcom = rawGedcom.replace(/[\r]+/g, '');
      return gedcom.split('\n');
    } else if (rawGedcom.indexOf('\r') === -1 && rawGedcom.indexOf('\n') !== -1) { // LF
      return gedcom.split('\n');
    }
    // CR
    return gedcom.split('\r');
  }


  __newStructure(lines, startIdx) {
    // The startx id correspond to the level line

    // This method must return the next id to parse
    const splittedLine = lines[startIdx].split(' ');
    const endIdx = this.___getNextElementIndex(lines, startIdx, '0');
    const elements = this.___extractItemValuesFromLines(lines, 1, startIdx, endIdx); // Create individual object;

    if (splittedLine[1] === 'HEAD') {
      this._head = elements;
    } else if (splittedLine[2] === 'SUBN') {
      this._submissions[`${splittedLine[1]}`] = elements;
    } else if (splittedLine[2] === 'SUBM') {
      this._submitters[`${splittedLine[1]}`] = elements;
    }  else if (splittedLine[2] === 'INDI') {
      this._individuals[`${splittedLine[1]}`] = elements;
    } else if (splittedLine[2] === 'FAM') {
      this._families[`${splittedLine[1]}`] = elements;
    } else if (splittedLine[2] === 'NOTE') {
      this._notes[`${splittedLine[1]}`] = elements;
      // Note first line is written right after delimiter, must here parse it
      this._notes[`${splittedLine[1]}`][`note`] = splittedLine.slice(3, splittedLine.length).join(' ') || '';
    } else if (splittedLine[2] === 'SNOTE') {
      this._snotes[`${splittedLine[1]}`]= elements;
      // Note first line is written right after delimiter, must here parse it
      this._snotes[`${splittedLine[1]}`][`note`] = splittedLine.slice(3, splittedLine.length).join(' ') || '';
    }  else if (splittedLine[2] === 'SOUR') {
      this._sources[`${splittedLine[1]}`]= elements;
    } else if (splittedLine[2] === 'REPO') {
      this._repositories[`${splittedLine[1]}`] = elements;
    } else if (splittedLine[2] === 'OBJE') {
      this._objects[`${splittedLine[1]}`] = elements;
    } else if (splittedLine[1] === 'TRLR') {
      // EOF reached, returning length to break main loop
      return lines.length;
    }

    return endIdx - 1;
  }


  ___getNextElementIndex(lines, startIdx, depth) {
    for (let i = startIdx + 1; i < lines.length; ++i) {
      const lineElements = lines[i].split(' ');
      if (parseInt(lineElements[0]) < parseInt(depth)) { // We must break because level is going up
        return i - 1;
      } else if (lineElements[0] === depth) { // Found matching next item
        return i;
      }
    }

    return startIdx;
  }


  ___extractItemValuesFromLines(lines, depth, startIdx, endIdx) {
    const boundIdx = [];
    // First iterate to get bound indexes of studied depth level
    for (let i = startIdx; i < endIdx; ++i) {
      if (parseInt(lines[i].split(' ')[0]) === depth) {
        boundIdx.push(i);
      }
    }
    // Must push the endIdx into bounds array if not already the latest element to consider last item depth
    if (boundIdx[boundIdx.length - 1] !== endIdx) {
      boundIdx.push(endIdx);
    }
    // Now, for each interval in boundIdx, either create element or recurse call to get all levels under 
    const item = {};
    for (let i = 0; i < boundIdx.length - 1; ++i) {
      const line = lines[boundIdx[i]];
      const itemRawKey = line.split(' ')[1];

      let itemValue = line.split(`${itemRawKey} `)[1];
      if (line.split(`${itemRawKey} `).length > 2) { // The line raw value contains the itemRawKey, avoid to remove it from saved value
        itemValue = line.split(`${itemRawKey} `).slice(1).join(`${itemRawKey} `);
      }

      let itemKey = GedcomEnum[itemRawKey];
      if (itemKey === undefined) {
        console.warn(`Non-standard item tag met on line ${boundIdx[i] + 1} : ${itemRawKey}`);
        itemKey = itemRawKey;
      }

      if (boundIdx[i + 1] - boundIdx[i] === 1 || boundIdx[i + 1] === undefined) { // No deeper child element, creating and assigning value
        // In case CONC/CONT, we store all following into one itemKey
        if (itemRawKey === 'CONT' || itemRawKey === 'CONC') {
          let nextItemRawKey = lines[boundIdx[i] + 1].split(' ')[1];
          let newItem = {};
          if (itemValue !== undefined) { // Create children item if current level as a value
            newItem[itemKey] = itemValue;
          } else {
            newItem[itemKey] = '';
          }

          let iterator = 1;
          while (nextItemRawKey === 'CONT' || nextItemRawKey === 'CONC') {
            let nextItemValue = lines[boundIdx[i] + iterator].split(`${nextItemRawKey} `)[1];
            newItem[itemKey] += `${(nextItemRawKey === 'CONT') ? '<I°_°I>' : '(ツ)_/¯'}${nextItemValue}`;
            ++iterator;
            nextItemRawKey = lines[boundIdx[i] + iterator].split(' ')[1];
          }

          i += (iterator - 1);
          item[itemKey] = newItem[itemKey];
        } else {
          this.____setItemValue(item, itemKey, itemValue);
        }
      } else { // Element as deeper child, recursive call
        // Well OK, no recursive call until CONT/CONC found on next line
        let nextItemRawKey = lines[boundIdx[i] + 1].split(' ')[1];
        if (nextItemRawKey === 'CONT' || nextItemRawKey === 'CONC') {
          let newItem = {};
          if (itemValue !== undefined) { // Create children item if current level as a value
            newItem[itemKey] = itemValue;
          } else {
            newItem[itemKey] = '';
          }

          let iterator = 1;
          while (nextItemRawKey === 'CONT' || nextItemRawKey === 'CONC') {
            let nextItemValue = lines[boundIdx[i] + iterator].split(`${nextItemRawKey} `)[1];
            newItem[itemKey] += `${(nextItemRawKey === 'CONT') ? '<I°_°I>' : '(ツ)_/¯'}${nextItemValue}`;
            ++iterator;
            nextItemRawKey = lines[boundIdx[i] + iterator].split(' ')[1];
          }

          // Item remaining on same level
          if (boundIdx[i] + iterator < boundIdx[i + 1]) {
            const tmpValue = newItem[itemKey];
            newItem[itemKey] = {};
            newItem[itemKey][itemKey] = tmpValue;
            // Recursive call, one depth further, between bounds
            const subElement = this.___extractItemValuesFromLines(lines, depth + 1, boundIdx[i] + iterator, boundIdx[i + 1]);
            Object.assign(newItem[itemKey], subElement);
            // Met a place sub element, check in saved places
            if (itemRawKey === 'PLAC') {
              newItem[itemKey] = this.____appendNonStandardElement(newItem[itemKey], this._places, 'P');
            } else if (itemRawKey === 'SOUR') {
              newItem[itemKey] = this.____appendNonStandardElement(newItem[itemKey], this._citations, 'C');
            } else if (EventsEnum.indexOf(itemRawKey) !== -1) {
              newItem[itemKey] = this.____appendNonStandardElement(newItem[itemKey], this._events, 'E');
            }
          }

          if (!item[itemKey]) { // Only create element if item not already exists
            item[itemKey] = newItem[itemKey];
          } else {
            if (Array.isArray(item[itemKey]) === true) {
              item[itemKey].push(newItem[itemKey]);
            } else {
              const saved = item[itemKey];
              item[itemKey] = [];
              item[itemKey].push(saved);
              item[itemKey].push(newItem[itemKey]);
            }
          }
        } else {
          let newItem = {};
          if (itemValue !== undefined) { // Create children item if current level as a value
            newItem[itemKey] = itemValue;
          }
  
          // Recursive call, one depth further, between bounds
          const subElement = this.___extractItemValuesFromLines(lines, depth + 1, boundIdx[i], boundIdx[i + 1]);
          Object.assign(newItem, subElement);
          // Met a place sub element, check in saved places
          if (itemRawKey === 'PLAC') {
            newItem = this.____appendNonStandardElement(newItem, this._places, 'P');
          } else if (itemRawKey === 'SOUR') {
            newItem = this.____appendNonStandardElement(newItem, this._citations, 'C');
          } else if (EventsEnum.indexOf(itemRawKey) !== -1) {
            newItem = this.____appendNonStandardElement(newItem, this._events, 'E');
          }
          // Determine wether the newItem is added straight as-is, or inserted in existing array
          if (!item[itemKey]) {
            item[itemKey] = newItem;
          } else if (Array.isArray(item[itemKey]) === true) {
            item[itemKey].push(newItem);
          } else {
            const saved = item[itemKey];
            item[itemKey] = [];
            item[itemKey].push(saved);
            item[itemKey].push(newItem);
          }
        }
      }
    }

    return item;
  }


  ____setItemValue(item, itemKey, itemValue) {
    if (item[itemKey] === undefined) {
      item[itemKey] = itemValue || '';
    } else {
      // Item is alreay an array
      if (Array.isArray(item[itemKey])) {
        item[itemKey].push(itemValue);
      } else {
        const existingValue = item[itemKey];
        item[itemKey] = [existingValue, itemValue];
      }
    }

  }


  ____appendNonStandardElement(subElement, target, indicator) {
    const keys = Object.keys(target);
    let hasMatch = false;
    let reference = `@${indicator}00000@`; // Defaults to first value
    for (let i = 0; i < keys.length; ++i) {
      if (JSON.stringify(subElement) === JSON.stringify(target[keys[i]])) {
        hasMatch = true;
        reference = keys[i];
        break;
      }
    }
    // No matching element, place can be added into saved ones
    if (!hasMatch) {
      // Some places already exists
      if (keys.length > 0) {
        let key = keys[keys.length - 1].replace('@', '').replace(indicator, '');
        key = parseInt(key) + 1;
        reference = `@${indicator}${('00000' + key).slice(-5)}@`;
        target[reference] = subElement;
      } else {
        target[reference] = subElement;
      }
    }

    return reference;
  }


  // ======================================================================== //
  // --------------------- GEDCOM Saving & Exporting ------------------------ //
  // ======================================================================== //
  // TODO validatrs for objects types for ex ADDRESS_STRUCTURE (see 3.2 Structure Organization)


  /**
   * @method
   * @name exportGedcom
   * @public
   * @memberof JsGEDCOM
   * @author Arthur Beaulieu
   * @since February 2026
   * @description <blockquote>
   * This method is made to export the loaded GEDCOM and save it to the user's
   * disk as a .ged file.
   * </blockquote>
   **/
  exportGedcom() {
    if (DEBUG === true) { console.log(`JsGEDCOM.exportGedcom() called`); }
    const gedcom = this.buildGedcom();
    const blob = new Blob([ gedcom ], {
      type: 'text/plain'
    });
    // Virtual button to download GEDCOM file
    const virtualLink = document.createElement('a');
    virtualLink.setAttribute('href', URL.createObjectURL(blob));
    virtualLink.setAttribute('download', 'Output.ged'); /* TODO rename output file with gedcom name if exists */
    virtualLink.click();
  }


  /**
   * @method
   * @name buildGedcom
   * @public
   * @memberof JsGEDCOM
   * @author Arthur Beaulieu
   * @since February 2025
   * @description <blockquote>
   * This method is made to convert the stored GEDCOM internal structure and
   * will build a typical .ged file content. The output string is a valid
   * .ged file content, as the specification request.
   * </blockquote>
   * @returns {string} The converted GEDCOM to match the .ged specification
   **/
  buildGedcom() {
    if (DEBUG === true) { console.log(`JsGEDCOM.buildGedcom() called`); }

    let output = '0 HEAD';
    // Build HEAD
    output += this.__flattenObject(this._head, 1); // TODO for head, see spec for ordering (3.2)
    // Only for v5 documents   
    let keys = Object.keys(this._submissions);
    if (this._submissions) {
      for (let i = 0; i < keys.length; ++i) { // No often used (ie FamilySearch)
        output += `\n0 ${keys[i]} SUBN`;
        output += this.__flattenObject(this._submissions[keys[i]], 1);
      }
    }
    keys = Object.keys(this._submitters);
    for (let i = 0; i < keys.length; ++i) {
      output += `\n0 ${keys[i]} SUBM`;
      output += this.__flattenObject(this._submitters[keys[i]], 1);
    }
    keys = Object.keys(this._individuals);
    for (let i = 0; i < keys.length; ++i) {
      output += `\n0 ${keys[i]} INDI`;
      output += this.__flattenObject(this._individuals[keys[i]], 1);
    }
    keys = Object.keys(this._families);
    for (let i = 0; i < keys.length; ++i) {
      output += `\n0 ${keys[i]} FAM`;
      output += this.__flattenObject(this._families[keys[i]], 1);
    }
    keys = Object.keys(this._sources);
    for (let i = 0; i < keys.length; ++i) {
      output += `\n0 ${keys[i]} SOUR`;
      output += this.__flattenObject(this._sources[keys[i]], 1);
    }
    keys = Object.keys(this._repositories);
    for (let i = 0; i < keys.length; ++i) {
      output += `\n0 ${keys[i]} REPO`;
      output += this.__flattenObject(this._repositories[keys[i]], 1);
    }
    keys = Object.keys(this._notes).sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }));
    for (let i = 0; i < keys.length; ++i) {
      let noteValue = '';
      if (this._notes[keys[i]].note !== undefined && this._notes[keys[i]].note !== '') {
        noteValue = ` ${this._notes[keys[i]].note}`;
      }
      output += `\n0 ${keys[i]} NOTE${noteValue}`;
      delete this._notes[keys[i]].note;
      output += this.__flattenObject(this._notes[keys[i]], 1);
    }
    keys = Object.keys(this._snotes).sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }));
    for (let i = 0; i < keys.length; ++i) { // v7 only
      let noteValue = '';
      if (this._snotes[keys[i]].note !== undefined && this._snotes[keys[i]].note !== '') {
        noteValue = ` ${this._snotes[keys[i]].note}`;
      }
      output += `\n0 ${keys[i]} SNOTE${noteValue}`;
      delete this._snotes[keys[i]].note;
      output += this.__flattenObject(this._snotes[keys[i]], 1);
    }
    keys = Object.keys(this._objects);
    for (let i = 0; i < keys.length; ++i) {
      output += `\n0 ${keys[i]} OBJE`;
      output += this.__flattenObject(this._objects[keys[i]], 1);
    }

    output += '\n0 TRLR\n';
    return output;
  }


  __flattenObject(inputObject, depth) {
    if (!inputObject) {
      return '';
    }
    // Here we force object cloning, to avoid altering the data held by inputObject
    const object = structuredClone(inputObject);
    // Actual output building (__flattenObject content)
    let output = '';
    const keys = Object.keys(object);
    for (let i = 0; i < keys.length; ++i) {
      // Extract GEDCOM key from base object
      let gedKey = Object.keys(GedcomEnum).find(key => GedcomEnum[key] === keys[i]);
      if (gedKey === undefined) { // Non-standard GEDCOM key found, replace by raw key
        gedKey = keys[i];
      }
      if (typeof object[keys[i]] === 'string') { // object[key] is a string, check if linked value or append to output
        output += this.__processStringElement(gedKey, object[keys[i]], keys[i], depth);
      } else if (Array.isArray(object[keys[i]]) === true) { // object[key] is an array, iterate through its elements
        output += this.__processArrayElement(gedKey, object[keys[i]], keys[i], depth);
      } else { // value[key] is an object, recursive call
        output += this.__processObjectElement(gedKey, object, keys[i], depth);       
      }
    }

    return output;
  }


  __isLinkedValue(key) {
    // Internal method to check if a given key requires a specific treatment to retrieve value
    // To be more specific, is a reference to an internal object that must be built again here
    if (['SOUR', 'PLAC'].indexOf(key) !== -1 || EventsEnum.indexOf(key) !== -1) {
      return true;
    }
    // False return by default
    return false;
  }


  __getLinkedValue(gedKey, val, key, depth) {
    // Internal method to retrieve all data from a linked value stored in an internal object on this
    let linkedValue = '';
    if (gedKey === 'SOUR') { // Reading from source and build specific object
      if (this._citations[val] !== undefined) { // Citation indeed pointing to a source
        const source = Object.assign({}, this._citations[val]);
        if (source.source) {
          linkedValue += this.__splitStringInSegments('SOUR', source.source, depth);
          delete source.source; // Deleting self key used right above this line
        } else {
          linkedValue += this.__splitStringInSegments('SOUR', val, depth);
        }
        linkedValue += this.__flattenObject(source, depth + 1);
      } else {
        linkedValue += this.__splitStringInSegments('SOUR', val, depth);
      }
    } else if (gedKey === 'PLAC') {
      if (this._places[val] !== undefined) { // Place indeed pointing to an existing one
        const place = Object.assign({}, this._places[val]);
        if (place.place) {
          linkedValue += this.__splitStringInSegments('PLAC', place.place, depth);
          delete place.place; // Deleting self key used right above this line
        } else {
          linkedValue += `\n${depth} PLAC`;
        }
        linkedValue += this.__flattenObject(place, depth + 1);
      } else {
        linkedValue += this.__splitStringInSegments('PLAC', val, depth);
      }
    } else if (EventsEnum.indexOf(gedKey) !== -1) {
      if (this._events[val] !== undefined) { // Event indeed pointing to an existing one
        const event = Object.assign({}, this._events[val]);
        if (event[key]) { // In case substructure had a super-name, set it at current level and delete substructure value
          linkedValue += this.__splitStringInSegments(gedKey, event[key], depth);
          delete event[key];
        } else { // Otherwise, just add getKey into line before recursing
          linkedValue += `\n${depth} ${gedKey}`;
        }
        linkedValue += this.__flattenObject(event, depth + 1);
      } else {
        linkedValue += this.__splitStringInSegments(gedKey, val, depth);
      }
    }

    return linkedValue;
  }


  __processStringElement(gedKey, object, key, depth) {
    if (this.__isLinkedValue(gedKey)) {
      return this.__getLinkedValue(gedKey, object, key, depth);
    } else {
      return this.__splitStringInSegments(gedKey, object, depth);
    }
  }


  __processArrayElement(gedKey, objects, key, depth) {
    let output = '';
    for (let i = 0; i < objects.length; ++i) {
      if (typeof objects[i] === 'string' || objects[i] instanceof String) { // object[key][j] is a string, check if linked value or append to output
        output += this.__processStringElement(gedKey, objects[i], key, depth);
      } else { // object[key][j] is an object, recursive call
        if (objects[i] && objects[i][key]) { // In case substructure had a super-name, set it at current level and delete substructure value
          output += this.__splitStringInSegments(gedKey, objects[i][key], depth);
          delete objects[i][key];
        } else { // Otherwise, just add getKey into line before recursing
          output += `\n${depth} ${gedKey}`;
        }
        // One depth bellow
        output += this.__flattenObject(objects[i], depth + 1);
      }
    }

    return output;
  }


  __processObjectElement(gedKey, object, key, depth) {
    let output = '';
    if (this.__isLinkedValue(gedKey)) { // Let linked value handle itself
      output += this.__getLinkedValue(gedKey, object[key], key, depth);
    } else { // Manually recurse call on object
      if (object[key] && object[key][key]) { // In case substructure had a super-name, set it at current level and delete substructure value
        output += this.__splitStringInSegments(gedKey, object[key][key], depth);
        delete object[key][key];
      } else { // Otherwise, just add getKey into line before recursing
        output += `\n${depth} ${gedKey}`;
      }
      // One depth bellow
      output += this.__flattenObject(object[key], depth + 1);
    }

    return output;
  }


  __splitStringInSegments(gedKey, str, depth) {
    // This method is responsible of several things : first being able to trim strings that
    // are above 255 char. Then, it must detect specific separators for either CONC and CONT 
    const polySplitter = input => {
      const contSep = '<I°_°I>';
      const concSep = '(ツ)_/¯';
      const result = [];
      let lastIdx = 0;
      let lastSep = null;
      let hasSep = false;

      while (true) {
        const idx1 = input.indexOf(contSep, lastIdx);
        const idx2 = input.indexOf(concSep, lastIdx);
        let nextSepIdx = -1;
        let nextSep = null;
        // Search and find the next closest separator
        if (idx1 !== -1 && (idx2 === -1 || idx1 < idx2)) {
          nextSepIdx = idx1;
          nextSep = contSep;
          hasSep = true;
        } else if (idx2 !== -1) {
          nextSepIdx = idx2;
          nextSep = concSep;
          hasSep = true;
        }
        // In case no separator found next, add remaining to output and break infinite loop
        if (nextSepIdx === -1) {
          if (lastIdx < input.length) {
            result.push({
              segment: input.slice(lastIdx),
              replacor: (lastSep === contSep) ? 'CONT' : (lastSep === concSep) ? 'CONC' : null
            });
          }
          break;
        }
        // Otherwise ad current segment (before the found separator
        result.push({
          segment: input.slice(lastIdx, nextSepIdx),
          replacor: (lastSep === contSep) ? 'CONT' : (lastSep === concSep) ? 'CONC' : null
        });
        // Update the latest found separator
        lastSep = nextSep;
        lastIdx = nextSepIdx + nextSep.length;
      }

      return hasSep ? result : [];
    };
    // Perform polysplit on input string to get its segments (CONT/CONC only)
    const target = polySplitter(str);
    let output = '';
    if (target.length === 0) { // Nothing has been splitted
      // Max 255 char, minus 7 is because depth is one digit, CONT/CONC is four chars and there is two spaces
      const segments = str.match(new RegExp(`.{1,${255 - 7}}`, 'gs'));
      if (str === '' && segments === null) { // No segment nor string to display, only disply line depth and key
        output += `\n${depth} ${gedKey}`;
      } else  if (segments.length === 1) { // Add text (standard use case, no need to split line into CONT)
        output += `\n${depth} ${gedKey} ${str}`;
      } else { // We need to split line into CONTINUATION child (text too long)
        for (let i = 1; i < segments.length; ++i) {
          output += `\n${depth + 1} CONT ${segments[i]}`;
        }
      }
    } else {
      output += `\n${depth} ${gedKey} ${target[0].segment}`;
      for (let i = 1; i < target.length; ++i) {
        if (gedKey === 'CONC' || gedKey === 'CONT') { // If the root gedKey is CONC/CONT, do not increment depth for child
          output += `\n${depth} ${target[i].replacor} ${target[i].segment}`;
        } else { // Otherwise, 
          output += `\n${depth + 1} ${target[i].replacor} ${target[i].segment}`;
        }
      }
    }

    return output;
  }


  // ======================================================================== //
  // --------------------- GEDCOM Creating & Editing ------------------------ //
  // ======================================================================== //


  /**
   * @method
   * @name createGedcom
   * @public
   * @memberof JsGEDCOM
   * @author Arthur Beaulieu
   * @since February 2026
   * @description <blockquote>
   * This method is made to create a GEDCOm internal structure from scratch.
   * </blockquote>
   * @param {object} [options={}] - An option object to give specific data
   * @param {string} [options.name='JsGEDCOM'] - The name for this new GEDCOM structure
   * @param {string} [options.version='7.0'] - The GEDCOM version
   * @param {string} [options.language='fr-FR'] - The document language
   * @param {object} [options.submitter={name: 'Messe Basse Production'}] - The submitter info matching the SUBMITTER_RECORD specification
   **/
  createGedcom(options = {}) {
    // The GEDCOM specification mention that a HEAD section is mandatory
    // This section must be unique.
    this._head.character = `UTF-8`;
    this._head.source = '@C00001@';
    this._head.file = `${options.name || 'JsGEDCOM'}.ged`
    this._head.gedcom = {
      version: options.version || '7.0',
      format: 'LINEAGE-LINKED'
    };
    this._head.language = options.language || 'fr-FR';
    const date = new Date();
    this._head.date = {
      date: date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase(),
      time: date.toTimeString().split(' ')[0]
    };
    // Save the HEAD.SOUR associated citation
    this._citations[`@C00001@`] = {
      source: 'JsGEDCOM',
      name: 'JsGEDCOM',
      version: VERSION,
      webAddress: 'https://github.com/MesseBasseProduction/JsGEDCOM',
      corporate: {
        name: 'Messe Basse Production',
        webAddress: 'https://messe-basse-production.com',
        email: 'contact@messe-basse-production.com'
      }
    };
    // The specification also mention that at least one submitter (SUBM) must be set
    this._head.submitter = '@U1@';
    this._submitters['@U1@'] = options.submitter || {
      name: 'Messe Basse Production'
    };
    // Now, this baseline GEDCOm is valid according to the specification
  }


  /* Getters */

  get head() {
    return this._head;
  }

  get submissions() {
    return this._submissions;
  }

  get submitters() {
    return this._submitters;
  }

  get individuals() {
    return this._individuals;
  }

  get families() {
    return this._families;
  }

  get notes() {
    return this._notes;
  }

  get sources() {
    return this._sources;
  }

  get repositories() {
    return this._repositories;
  }

  get objects() {
    return this._objects;
  }

  get citations() {
    return this._citations;
  }

  get events() {
    return this._events;
  }

  get places() {
    return this._places;
  }


}


export default JsGEDCOM;
