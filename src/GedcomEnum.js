// GEDCOM 5.5 and GEDCOM 7.0 tags
export default Object.freeze({
  ABBR: 'abbreviation', // A short name of a title, description, or name.
  ADDR: 'address', // The contemporary place, usually required for postal purposes, of an individual, a submitter of information, a repository, a business, a school, or a company.
  ADR1: 'address1', // The first line of an address.
  ADR2: 'address2', // The second line of an address.
  ADR3: 'address3', // The third line of an address.
  ADOP: 'adoption', // Pertaining to creation of a child-parent relationship that does not exist biologically.
  AFN: 'ancestralFileNumber', // A unique permanent record file number of an individual record stored in Ancestral File.
  AGE: 'ageAtEvent', // The age of the individual at the time an event occurred, or the age listed in the document.
  AGNC: 'responsibleAgency', // The institution or individual having authority and/or responsibility to manage or govern.
  ALIA: 'alias', // An indicator to link different record descriptions of a person who may be the same person.
  ANCE: 'ancestors', // Pertaining to forbearers of an individual.
  ANCI: 'ancestorInterest', // Indicates an interest in additional research for ancestors of this individual.
  ANUL: 'annulment', // Declaring a marriage void from the beginning (never existed).
  ASSO: 'associates', // An indicator to link friends, neighbors, relatives, or associates of an individual.
  AUTH: 'author', // The name of the individual who created or compiled information.
  BAPL: 'baptismLDS', // The event of baptism performed at age eight or later by priesthood authority of the LDS Church.
  BAPM: 'baptism', // The event of baptism (not LDS), performed in infancy or later.
  BARM: 'barMitzvah', // The ceremonial event held when a Jewish boy reaches age 13.
  BASM: 'basMitzvah', // The ceremonial event held when a Jewish girl reaches age 13, also known as "Bat Mitzvah."
  BIRT: 'birth', // The event of entering into life.
  BLES: 'blessing', // A religious event of bestowing divine care or intercession. Sometimes given in connection with a naming ceremony.
  BLOB: 'binaryObject', // Binary media data 
  BURI: 'burial', // The event of the proper disposing of the mortal remains of a deceased person.
  CALN: 'callNumber', // The number used by a repository to identify the specific items in its collections.
  CAST: 'caste', // The name of an individual's rank or status in society, based on racial or religious differences, or differences in wealth, inherited rank, profession, occupation, etc.
  CAUS: 'cause', // A description of the cause of the associated event or fact, such as the cause of death.
  CENS: 'census', // The event of the periodic count of the population for a designated locality, such as a national or state Census.
  CHAN: 'change', // Indicates a change, correction, or modification. Typically used in connection with a DATE to specify when a change in information occurred.
  CHAR: 'character', // An indicator of the character set used in writing this automated information.
  CHIL: 'child', // The natural, adopted, or sealed (LDS) child of a father and a mother.
  CHR: 'christening', // The religious event (not LDS) of baptizing and/or naming a child.
  CHRA: 'adultChristening', // The religious event (not LDS) of baptizing and/or naming an adult person.
  CITY: 'city', // A lower level jurisdictional unit. Normally an incorporated municipal unit.
  CONC: 'concatenation', // An indicator that additional data belongs to the superior value. The information from the CONC value is to be connected to the value of the superior preceding line without a space and without a carriage return and/or new line character. Values that are split for a CONC tag must always be split at a non-space. If the value is split on a space the space will be lost when concatenation takes place. This is because of the treatment that spaces get as a GEDCOM delimiter, many GEDCOM values are trimmed of trailing spaces and some systems look for the first non-space starting after the tag to determine the beginning of the value.
  CONF: 'confirmation', // The religious event (not LDS) of conferring the gift of the Holy Ghost and, among protestants, full church membership.
  CONL: 'confirmationLDS', // The religious event by which a person receives membership in the LDS Church.
  CONT: 'continued', // An indicator that additional data belongs to the superior value. The information from the CONT value is to be connected to the value of the superior preceding line with a carriage return and/or new line character. Leading spaces could be important to the formatting of the resultant text. When importing values from CONT lines the reader should assume only one delimiter character following the CONT tag. Assume that the rest of the leading spaces are to be a part of the value.
  COPR: 'copyright', // A statement that accompanies data to protect it from unlawful duplication and distribution.
  CORP: 'corporate', // A name of an institution, agency, corporation, or company.
  CREA: 'creation', // The initial creation of the superstructure. This is metadata about the structure itself, not data about its subject.
  CREM: 'cremation', // Disposal of the remains of a person's body by fire.
  CROP: 'crop', // A subregion of an image to display. It is only valid when the superstructure links to a MULTIMEDIA_RECORD with at least 1 FILE substructure that refers to an external file with a defined pixel unit.
  CTRY: 'country', // The name or code of the country.
  DATA: 'data', // Pertaining to stored automated information.
  DATE: 'date', // The time of an event in a calendar format.
  DEAT: 'death', // The event when mortal life terminates.
  DESC: 'descendants', // Pertaining to offspring of an individual.
  DESI: 'descendantInterest', // Indicates an interest in research to identify additional descendants of this individual.
  DEST: 'destination', // A system receiving data.
  DIV: 'divorce', // An event of dissolving a marriage through civil action.
  DIVF: 'divorceFiling', // An event of filing for a divorce by a spouse.
  DSCR: 'physicalDescription', // The physical characteristics of a person, place, or thing.
  EDUC: 'education', // Indicator of a level of education attained.
  EMAIL: 'email', // An electronic mail address, as defined by any relevant standard such as RFC 3696, RFC 5321, or RFC 5322.
  EMIG: 'emigration', // An event of leaving one's homeland with the intent of residing elsewhere.
  ENDL: 'endowment', // A religious event where an endowment ordinance for an individual was performed by priesthood authority in an LDS temple.
  ENGA: 'engagement', // An event of recording or announcing an agreement between two people to become married.
  EVEN: 'event', // A noteworthy happening related to an individual, a group, or an organization.
  EXID: 'externalIdentifier', // An identifier for the subject of the superstructure. The identifier is maintained by some external authority; the authority owning the identifier is provided in the TYPE substructure.
  FACT: 'fact', // A noteworthy attribute or fact concerning an individual or family. If a specific attribute type exists, it should be used instead of a generic FACT structure.
  FAM: 'family', // Identifies a legal, common law, or other customary relationship of man and woman and their children, if any, or a family created by virtue of the birth of a child to its biological father and mother.
  FAMC: 'familyChild', // Identifies the family in which an individual appears as a child.
  FAMF: 'familyFile', // Pertaining to, or the name of, a family file. Names stored in a file that are assigned to a family for doing temple ordinance work.
  FAMS: 'familySpouse', // Identifies the family in which an individual appears as a spouse.
  FAX: 'facsimile', // A fax telephone number appropriate for sending data facsimiles.
  FCOM: 'firstCommunion', // A religious rite, the first act of sharing in the Lord's supper as part of church worship.
  FILE: 'file', // An information storage place that is ordered and arranged for preservation and reference.
  FORM: 'format', // An assigned name given to a consistent format in which information can be conveyed.
  GEDC: 'gedcom', // Information about the use of GEDCOM in a transmission.
  GIVN: 'givenName', // A given or earned name used for official identification of a person.
  GRAD: 'graduation', // An event of awarding educational diplomas or degrees to individuals.
  HEAD: 'header', // Identifies information pertaining to an entire GEDCOM transmission.
  HEIGHT: 'heightInPixels', // How many pixels to display vertically for the image.
  HUSB: 'husband', // An individual in the family role of a married man or father.
  IDNO: 'identificationNumber', // A number assigned to identify a person within some significant external system.
  IMMI: 'immigration', // An event of entering into a new locality with the intent of residing there.
  INDI: 'individual', // A person.
  INIL: 'initiatoryLatterDay', // A Latter-Day Saint Ordinance. See also LDS_INDIVIDUAL_ORDINANCE. Previously, GEDCOM versions 3.0 through 5.3 called this WAC; it was not part of 5.4 through 5.5.1. FamilySearch GEDCOM 7.0 reintroduced it with the name INIL for consistency with BAPL, CONL, and ENDL.
  LANG: 'language', // The name of the language used in a communication or transmission of information.
  LEFT: 'leftCropWidth', // Left is a number of pixels to not display from the left side of the image.
  LEGA: 'legatee', // A role of an individual acting as a person receiving a bequest or legal devise.
  LATI: 'lat', // A latitudinal coordinate.
  LONG: 'lng', // A longitudinal coordinate.
  MAP: 'map', // A representative point for a location, as defined by LATI and LONG substructures.
  MARB: 'marriageBans', // An event of an official public notice given that two people intend to marry.
  MARC: 'marriageContract', // An event of recording a formal agreement of marriage, including the prenuptial agreement in which marriage partners reach agreement about the property rights of one or both, securing property to their children.
  MARL: 'marriageLicense', // An event of obtaining a legal license to marry.
  MARR: 'marriage', // A legal, common-law, or customary event of creating a family unit of a man and a woman as husband and wife.
  MARS: 'marriageSettlement', // An event of creating an agreement between two people contemplating marriage, at which time they agree to release or modify property rights that would otherwise arise from the marriage.
  MEDI: 'medium', // Identifies information about the media or having to do with the medium in which information is stored.
  MIME: 'mediaType', // Indicates the media type of the payload of the superstructure.
  NAME: 'name', // A word or combination of words used to help identify an individual, title, or other item. More than one NAME line should be used for people who were known by multiple names.
  NATI: 'nationality', // The national heritage of an individual.
  NATU: 'naturalization', // The event of obtaining citizenship.
  NCHI: 'childrenNumber', // The number of children that this person is known to be the parent of (all marriages) when subordinate to an individual, or that belong to this family when subordinate to a FAM_RECORD.
  NICK: 'nickname', // A descriptive or familiar that is used instead of, or in addition to, one's proper name.
  NMR: 'marriageCount', // The number of times this person has participated in a family as a spouse or parent.
  NO: 'didNotHappen', // An enumerated value identifying an event type which did not occur to the superstructure’s subject. A specific payload NO XYZ should only appear where XYZ would be legal.
  NOTE: 'note', // Additional information provided by the submitter for understanding the enclosing data.
  NPFX: 'namePrefix', // Text which appears on a name line before the given and surname parts of a name.
  NSFX: 'nameSuffix', // Text which appears on a name line after or behind the given and surname parts of a name.
  OBJE: 'object', // Pertaining to a grouping of attributes used in describing something. Usually referring to the data required to represent a multimedia object, such an audio recording, a photograph of a person, or an image of a document.
  OCCU: 'occupation', // The type of work or profession of an individual.
  ORDI: 'ordinance', // Pertaining to a religious ordinance in general.
  ORDN: 'ordination', // A religious event of receiving authority to act in religious matters.
  PAGE: 'page', // A number or description to identify where information can be found in a referenced work.
  PEDI: 'pedigree', // Information pertaining to an individual to parent lineage chart.
  PHON: 'phone', // A unique number assigned to access a specific telephone.
  PHRASE: 'phrase', // Textual information that cannot be expressed in the superstructure due to the limitations of its data type.
  PLAC: 'place', // A jurisdictional name to identify the place or location of an event.
  POST: 'postalCode', // A code used by a postal service to identify an area to facilitate mail handling.
  PROB: 'probate', // An event of judicial determination of the validity of a will. May indicate several related court activities over several dates.
  PROP: 'property', // Pertaining to possessions such as real estate or other property of interest.
  PUBL: 'publication', // Refers to when and/or were a work was published or created.
  QUAY: 'quality', // An assessment of the certainty of the evidence to support the conclusion drawn from evidence.
  REFN: 'reference', // A description or number used to identify an item for filing, storage, or other reference purposes.
  RELA: 'relationship', // A relationship value between the indicated contexts.
  RELI: 'religion', // A religious denomination to which a person is affiliated or for which a record applies.
  REPO: 'repository', // An institution or person that has the specified item as part of their collection(s).
  RESI: 'residence', // The act of dwelling at an address for a period of time.
  RESN: 'restriction', // A processing indicator signifying access to information has been denied or otherwise restricted.
  RETI: 'retirement', // An event of exiting an occupational relationship with an employer after a qualifying time period.
  RFN: 'recordFileNumber', // A permanent number assigned to a record that uniquely identifies it within a known file.
  RIN: 'recordIdNumber', // A number assigned to a record by an originating automated system that can be used by a receiving system to report results pertaining to that record.
  ROLE: 'role', // A name given to a role played by an individual in connection with an event.
  SCHMA: 'schema', // A container for storing meta-information about the extension tags used in this document.
  SDATE: 'sortDate', // A date to be used as a sorting hint. It is intended for use when the actual date is unknown, but the display order may be dependent on date.
  SEX: 'sex', // Indicates the sex of an individual--male or female.
  SLGC: 'sealingChild', // A religious event pertaining to the sealing of a child to his or her parents in an LDS temple ceremony.
  SLGS: 'sealingSpouse', // A religious event pertaining to the sealing of a husband and wife in an LDS temple ceremony.
  SNOTE: 'sharedNote', // A pointer to a note that is shared by multiple structures. 
  SOUR: 'source', // The initial or original material from which information was obtained.
  SPFX: 'surnamePrefix', // A name piece used as a non-indexing pre-part of a surname.
  SSN: 'socialSecurityNumber', // A number assigned by the United States Social Security Administration. Used for tax identification purposes.
  STAE: 'state', // A geographical division of a larger jurisdictional area, such as a State within the United States of America.
  STAT: 'status', // An assessment of the state or condition of something.
  SUBM: 'submiter', // An individual or organization who contributes genealogical data to a file or transfers it to someone else.
  SUBN: 'submission', // Pertains to a collection of data issued for processing.
  SURN: 'surname', // A family name passed on or used by members of a family.
  TAG: 'tag', // Information relating to a single extension tag as used in this document.
  TEMP: 'temple', // The name or code that represents the name a temple of the LDS Church.
  TEXT: 'text', // The exact wording found in an original source document.
  TIME: 'time', // A time value in a 24-hour clock format, including hours, minutes, and optional seconds, separated by a colon (:). Fractions of seconds are shown in decimal notation.
  TITL: 'title', // A description of a specific writing or other work, such as the title of a book when used in a source context, or a formal designation used by an individual in connection with positions of royalty or other social status, such as Grand Duke.
  TOP: 'topCropWidth', // A number of pixels to not display from the top side of the image.
  TRAN: 'translation', // A representation of the superstructure’s data in a different format.
  TRLR: 'trailer', // At level 0, specifies the end of a GEDCOM transmission.
  TYPE: 'type', // A further qualification to the meaning of the associated superior tag. The value does not have any computer processing reliability. It is more in the form of a short one or two word note that should be displayed any time the associated data is displayed.
  UID: 'uniqueIdentifier', // A globally-unique identifier of the superstructure, to be preserved across edits. If a globally-unique identifier for the record already exists, it should be used without modification, not even whitespace or letter case normalization. New globally unique identifiers should be created and formatted as described in RFC 4122.
  VERS: 'version', // Indicates which version of a product, item, or publication is being used or referenced.
  WIDTH: 'widthInPixel', // How many pixels to display horizontally for the image.
  WIFE: 'wife', // An individual in the role as a mother and/or married woman.
  WILL: 'will', // A legal document treated as an event, by which a person disposes of his or her estate, to take effect after death. The event date is the date the will was signed while the person was alive.
  WWW: 'webAddress' // A URL or other locator for a World Wide Web page of the subject of the superstructure, as defined by any relevant standard such as whatwg/url, RFC 3986, RFC 3987, and so forth.
});
