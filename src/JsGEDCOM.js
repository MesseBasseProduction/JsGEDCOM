import GedcomEnum from "./GedcomEnum";


// GEDCOM v7
// https://gedcom.io/specifications/FamilySearchGEDCOMv7.html
// https://gedcom.io/specifications/FamilySearchGEDCOMv7.pdf
// https://gedcom.io/specs/


class JsGEDCOM {


  constructor() {
    // Official objects
    this._head = {};
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
    // Raw gedcom data
    this._gedcom = null;
  }


  /* GEDCOM partsing */


  parseGedcom(gedcom) {
    // Sanitize line by removing chariot returns and splitting by lines
    this._gedcom = gedcom.replace(/[\r]+/g, '');
    const lines = this._gedcom.split('\n');
    // Iterate through all lines to detect items
    for (let i = 0; i < lines.length; ++i) {
      const lineElements = lines[i].split(' ');
      // New item detected, inner iterate to retrieve all info for current item
      if (lineElements[0] === '0') {
        i = this._newTopItem(lines, i);
      }
    }
    console.log(this)
  }


  _newTopItem(lines, startIdx) {
    // The startx id correspond to the level line

    // This method must return the next id to parse
    const splittedLine = lines[startIdx].split(' ');
    const endIdx = this.__getNextElementIndex(lines, startIdx, '0');
    const elements = this.__extractItemValuesFromLines(lines, 1, startIdx, endIdx); // Create individual object;

    if (splittedLine[1] === 'HEAD') {
      this._head = elements;
    } else if (splittedLine[2] === 'SUBM') {
      this._submitters = elements;
    }  else if (splittedLine[2] === 'INDI') {
      this._individuals[`${splittedLine[1].replaceAll('@', '')}`] = elements;
    } else if (splittedLine[2] === 'FAM') {
      this._families[`${splittedLine[1].replaceAll('@', '')}`] = elements;
    } else if (splittedLine[2] === 'NOTE') {
      this._notes[`${splittedLine[1].replaceAll('@', '')}`] = elements;
    } else if (splittedLine[2] === 'SOUR') {
      this._sources[`${splittedLine[1].replaceAll('@', '')}`]= elements;
    } else if (splittedLine[2] === 'REPO') {
      this._repositories[`${splittedLine[1].replaceAll('@', '')}`] = elements;
    } else if (splittedLine[2] === 'OBJE') {
      this._objects[`${splittedLine[1].replaceAll('@', '')}`] = elements;
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
      const itemKey = GedcomEnum[itemRawKey];
      const itemValue = line.split(`${itemRawKey} `)[1];

      if (itemKey === undefined) {
        console.log(itemRawKey, i)          
      }

      if (boundIdx[i + 1] - boundIdx[i] === 1 || boundIdx[i + 1] === undefined) { // No deeper child element, creating and assigning value
        this.__setItemValue(item, itemKey, itemValue);
      } else { // Element as deeper child, recursive call
        item[itemKey] = {};
        if (itemValue !== undefined) { // Create children item if current level as a value
          item[itemKey][itemKey] = itemValue;
        }
        // Recursive call, one depth further, between bounds
        Object.assign(item[itemKey], this.__extractItemValuesFromLines(lines, depth + 1, boundIdx[i], boundIdx[i + 1]));
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


  /* GEDCOM exporting */


  exportGedcom() {
    if (this._gedcom) {
      // TODO
    }
  }


}


export default JsGEDCOM;
