import GedcomEnum from "./GedcomEnum";
import EventsEnum from "./EventsEnum";


// GEDCOM v7 - v5.5.1 are supported here
// https://gedcom.io/specifications/FamilySearchGEDCOMv7.html
// https://gedcom.io/specifications/FamilySearchGEDCOMv7.pdf
// https://gedcom.io/specs/


class JsGEDCOM {


  constructor() {
    // TODO handle options lineBreak and version

    // Official objects
    this._head = {};
    this._submissions = {};    
    this._submitters = {};    
    this._individuals = {};
    this._families = {};
    this._notes = {};
    this._sources = {};
    this._repositories = {};
    this._objects = {};
    // Additionnal, unspecified ones
    this._events = {};
    this._places = {};
    this._citations = {};
    // Raw gedcom data
    this._gedcom = null;
    this._lines = [];
  }


  /* GEDCOM partsing */


  loadGedcom(gedcom) {
    this._parseGedcom(gedcom);
    console.log(this)
  }


  _parseGedcom(gedcom) {
    // GEDCOM parsing occur in few steps :
    // Sanitize line breaks, split raw data into lines to be read
    // Then we opted for recurive parsing :
    // For each level-0 structure met, we call __newStructure()
    // method, which will return the next line index leading to
    // the next level 0 structure.
    // In te meantime, we parse this level 0 structure, by splitting
    // interval into bound, for each levels deeper than 0, and recusively to each
    // level deeper etc.

    // Sanitize line by removing chariot returns and splitting by lines
    this.__formatRawGedcom(gedcom);
    // Iterate through all lines to detect items
    for (let i = 0; i < this._lines.length; ++i) {
      const lineElements = this._lines[i].split(' ');
      // New item detected, inner iterate to retrieve all info for current item
      if (lineElements[0] === '0') {
        i = this.__newStructure(this._lines, i);
      }
    }
  }


  __formatRawGedcom(gedcom) {
    if (gedcom.indexOf('\r\n') !== -1) { // CR LF
      this._gedcom = gedcom.replace(/[\r]+/g, '');
      this._lines = this._gedcom.split('\n');
    } else if (gedcom.indexOf('\r') === -1 && gedcom.indexOf('\n') !== -1) { // LF
      this._gedcom = gedcom;
      this._lines = this._gedcom.split('\n');
    } else { // CR
      this._gedcom = gedcom;
      this._lines = this._gedcom.split('\r');
    }
  }


  __newStructure(lines, startIdx) {
    // The startx id correspond to the level line

    // This method must return the next id to parse
    const splittedLine = lines[startIdx].split(' ');
    const endIdx = this.__getNextElementIndex(lines, startIdx, '0');
    const elements = this.__extractItemValuesFromLines(lines, 1, startIdx, endIdx); // Create individual object;

    if (splittedLine[1] === 'HEAD') {
      this._head = elements;
    } else if (splittedLine[2] === 'SUBN') {
      this._submissions = elements;
    } else if (splittedLine[2] === 'SUBM') {
      this._submitters[`${splittedLine[1]}`] = elements;
    }  else if (splittedLine[2] === 'INDI') {
      this._individuals[`${splittedLine[1]}`] = elements;
    } else if (splittedLine[2] === 'FAM') {
      this._families[`${splittedLine[1]}`] = elements;
    } else if (splittedLine[2] === 'NOTE') {
      this._notes[`${splittedLine[1]}`] = elements;
    } else if (splittedLine[2] === 'SOUR') {
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


  __getNextElementIndex(lines, startIdx, depth) {
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


  __extractItemValuesFromLines(lines, depth, startIdx, endIdx) {
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
      const itemValue = line.split(`${itemRawKey} `)[1];
      let itemKey = GedcomEnum[itemRawKey];

      if (itemKey === undefined) {
        console.warn(`Non-standard item tag met on line ${boundIdx[i] + 1} : ${itemRawKey}`);
        itemKey = itemRawKey;
      }

      if (boundIdx[i + 1] - boundIdx[i] === 1 || boundIdx[i + 1] === undefined) { // No deeper child element, creating and assigning value
        this.__setItemValue(item, itemKey, itemValue);
      } else { // Element as deeper child, recursive call
        item[itemKey] = {};
        // Well OK, no recursive call until CONT/CONC found on next line
        let nextItemRawKey = lines[boundIdx[i] + 1].split(' ')[1];
        if (nextItemRawKey === 'CONT' || nextItemRawKey === 'CONC') {
          item[itemKey] = itemValue;
          let iterator = 1;
          while (nextItemRawKey === 'CONT' || nextItemRawKey === 'CONC') {
            let nextItemValue = lines[boundIdx[i] + iterator].split(`${nextItemRawKey} `)[1];
            item[itemKey] += `${(nextItemRawKey === 'CONT') ? '' : '\n'}${nextItemValue}`;
            ++iterator;
            nextItemRawKey = lines[boundIdx[i] + iterator].split(' ')[1];
          }
        } else {
          if (itemValue !== undefined) { // Create children item if current level as a value
            item[itemKey][itemKey] = itemValue;
          }
  
          // Recursive call, one depth further, between bounds
          const subElement = this.__extractItemValuesFromLines(lines, depth + 1, boundIdx[i], boundIdx[i + 1]);
          Object.assign(item[itemKey], subElement);
          // Met a place sub element, check in saved places
          if (itemRawKey === 'PLAC') {
            item[itemKey] = this.__appendNonStandardElement(item[itemKey], this._places, 'P');
          } else if (itemRawKey === 'SOUR') {
            item[itemKey] = this.__appendNonStandardElement(item[itemKey], this._citations, 'C');
          } else if (EventsEnum.indexOf(itemRawKey) !== -1) {
            item[itemKey] = this.__appendNonStandardElement(item[itemKey], this._events, 'E');
          }
        }
      }
    }

    return item;
  }


  __setItemValue(item, itemKey, itemValue) {
    if (item[itemKey] === undefined) {
      item[itemKey] = itemValue;
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


  __appendNonStandardElement(subElement, target, indicator) {
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


  /* GEDCOM exporting */


  exportGedcom() {
    if (this._gedcom) {
      // TODO
    }
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
