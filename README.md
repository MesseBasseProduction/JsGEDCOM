# JsGEDCOM

A JavaScript GEDCOM parser, supporting GEDCOM v5.5 and v7.0.

It is able to parse an input according to the GEDCOM specification (see specifications on the official [GEDCOM website](https://gedcom.io/specs/)), and also enhance output by adding non-standard objects for internal treatment, such as citations, events, places (Gramps user might be familiar with such elements). One can also export again this parsed GEDCOM to a new `.ged` file.

## Usage

For standard usage, add in your HTML file the following include :

```html
<script type="text/javascript" src="https://messebasseproduction.github.io/JsGEDCOM/dist/JsGEDCOM.bundle.js"></script>
``` 

Then, in your JavaScript file, you can instantiate a new JsGEDCOM object using :
```Javascript
const jsGedcom = new JsGEDCOM({
  lineBreak: 'LF' // Linebreak type used when exporting GEDCOM in 'CR' or 'CR LF' or 'LF',
  version: '7' // GEDCOM output version in '7' or '5'
});
```

Finally, feed it with a GEDOM data as raw text (straight from reading a file), into the public method `jsGedcom.loadGedcom(rawGedcomData);`. You will now retrieve all standard elements using getters : 
- `jsGedcom.head` ;
- `jsGedcom.submissions` ;
- `jsGedcom.submitters` ;
- `jsGedcom.individuals` ;
- `jsGedcom.families` ;
- `jsGedcom.notes` ;
- `jsGedcom.sources` ;
- `jsGedcom.repositories` ;
- `jsGedcom.objects`.

 But also, non standard elements :
- `jsGedcom.citations` ;
- `jsGedcom.events` ;
- `jsGedcom.places`.

## Get Started locally

To run locally : `npm install && npm run build`. You can open the `index.html` file in your favorite browser ; it holds a very basic test bench. You can find stress test files in the `testfile` folder. These files are what we can call stress tests, which tries to cover the whole v5.5 and v7.0 GEDCOM specification. Open the debugger's console and check for output after file upload, and validate the parsed GEDCOM content.

## Disclaimer

Many tests must be performed yet before having a full insurance that the GEDCOM specifications are properly handled. Consider this library as a way to experiment. We can not be held accountable for any trouble you would encounter on your gedcom files using this tool.

Obviously, any feedback is welcome, either by feature request, issues, PRs :)
