[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![Apache-2.0 License][license-shield]][license-url]

[![ko-fi](https://www.ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/S6S51HNJ6)

<!-- Leylines LOGO -->
<br />
<p align="center">
  <a href="https://www.leylines.net">
    <img src="https://www.leylines.net/img/leylines-sign.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">LeylinesJS</h3>

  <p align="center">
    leylines.net documents, researches and archives ley lines and places of high energy and tries to find a global network interconnectng local ley lines to a big energynet.
    <br />
    <a href="https://docs.leylines.net"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://www.leylines.net">Homepage</a>
    ·
    <a href="https://maps.leylines.net">The Map</a>
    ·
    <a href="https://hub.leylines.net">The Hub</a>
  </p>
</p>

<!-- TABLE OF CONTENTS -->
## Table of Contents

* [About](#about)
  * [Features](#features)
  * [Technical](#technical)
  * [Built With](#built-with)
* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
* [Usage](#usage)
* [Roadmap](#roadmap)
* [Contributing](#contributing)
* [License](#license)
* [Contact](#contact)
* [Acknowledgements](#acknowledgements)

<!-- ABOUT THE PROJECT -->
## About

LeylineJS is a library for building rich, web-based geospatial data explorers, used to drive [leylines.net](https://maps.leylines.net).  It uses [Cesium](https://cesiumjs.org) and WebGL for a full 3D globe in the browser with no plugins.  It gracefully falls back to 2D with [Leaflet](http://leafletjs.com/) on systems that can't run Cesium. It can handle catalogs of thousands of layers, with dozens of geospatial file and web service types supported. It is almost entirely JavaScript in the browser, meaning it can even be deployed as a static website, making it simple and cheap to host.

### Features
* Nested catalog of layers which can be independently enabled to create mashups of many layers.
* Supports GeoJSON, KML, CSV (point and region-mapped), GPX and CZML file types natively, and others including zipped shapefiles with an optional server-side conversion service.
* Supports WMS, WFS, Esri MapServer, ABS ITT, Bing Maps, OpenStreetMap-style raster tiles, Mapbox, Urthecast, and WMTS item types.
* Supports querying WMS, WFS, Esri MapServer, CSW, CKAN and Socrata services for groups of items.
* 3D globe (Cesium) or 2D mode (Leaflet). 3D objects supported in CZML format.
* Time dimensions supported for CSV, CZML, WMS. Automatically animate layers, or slide the time control forward and backward.
* Drag-and-drop files from your desktop to the browser, for instant visualisation (no file upload to server required).
* Wider range of file types supported through server-side OGR2OGR service (requires upload).
* All ASGS (Australian Statistical Geographic Standard) region types (LGA, SA2, commonwealth electoral district etc) supported for [CSV region mapping](https://github.com/TerriaJS/nationalmap/wiki/csv-geo-au), plus several others: Primary Health Networks, Statistical Local Areas, ISO 3 letter country codes, etc.
* Users can generate a reusable URL link of their current map view, to quickly share mashups of web-hosted data.

### Technical

* Built in ECMAScript 2015, compiled with Babel to ES5.
* Supports IE9 and later. A few features require IE11+.
* [TerriaJS Server component](https://github.com/TerriajS/TerriaJS-Server) runs in NodeJS and provides proxying for web services that don't support CORS or require authentication.
* Dependencies are [managed in NPM](https://www.npmjs.com/~terria) and assembled using WebPack.

### Built With

* [TerriaJS](https://www.terria.io/)
* [Cesium](https://cesiumjs.org/)
* [Leaflet](https://leafletjs.com/)

<!-- GETTING STARTED -->
## Getting Started

The easiest way to build your own Terria-based map is using the TerriaMap starting point. This gives you the HTML structure, server and build processes you need to get a site up and running immediately.

See [Getting Started](https://docs.leylines.net/guide/getting-started/) in the [Documentation](https://docs.leylines.net/guide/) for all the details.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* NPM
```sh
npm install npm@latest -g
```

### Installation

1. Clone the repo
```sh
git clone https://github.com/leylines/leylinesjs.git
```
2. Install NPM packages
```sh
npm install
```
3. Build Docs
```sh
npm run gulp
```

<!-- USAGE EXAMPLES -->
## Usage

_For more examples, please refer to the [Documentation](https://docs.leylines.net/getting-started)_


<!-- ROADMAP -->
## Roadmap

See the [open issues](https://github.com/leylines/leylinesjs/issues) for a list of proposed features (and known issues).


<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<!-- LICENSE -->
## License

Distributed under the Apache-2.0 License. See `LICENSE` for more information.

<!-- CONTACT -->
## Contact

Joerg Roth - [@earthanddata](https://twitter.com/earthanddata) - info@leylines.net

Project Link: [https://github.com/leylines/leylinesjs](https://github.com/leylines/leylinesjs)

<!-- ACKNOWLEDGEMENTS -->
## Acknowledgements

* **[Terria™](http://terria.io)** is the overall name for the spatial data platform and the team that built TerriaJS.
* **TerriaJS** is this JavaScript library consisting of the 2D/3D map, catalog management and many spatial data connectors.
* **[Cesium](https://github.com/TerriaJS/Cesium)** is the 3D WebGL rendering library used by TerriaJS, which provides many low-level functions for loading and displaying imagery and spatial formats such as GeoJSON and KML.
* **[TerriaMap](https://github.com/TerriaJS/TerriaMap)** is a complete website starting point, using TerriaJS.
* **[TerriaJS-Server](https://github.com/TerriaJS/TerriaJS-Server)** is a NodeJS-based server that provides proxying and support services for TerriaJS.
* **[NationalMap](https://github.com/NICTA/NationalMap)** is the flagship Terria deployment, and the origin of the TerriaJS library.
* [Choose an Open Source License](https://choosealicense.com)
* [Best-README-Template](https://github.com/othneildrew/Best-README-Template)

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/leylines/leylinesjs.svg?style=flat-square
[contributors-url]: https://github.com/leylines/leylinesjs/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/leylines/leylinesjs.svg?style=flat-square
[forks-url]: https://github.com/leylines/leylinesjs/network/members
[stars-shield]: https://img.shields.io/github/stars/leylines/leylinesjs.svg?style=flat-square
[stars-url]: https://github.com/leylines/leylinesjs/stargazers
[issues-shield]: https://img.shields.io/github/issues/leylines/leylinesjs.svg?style=flat-square
[issues-url]: https://github.com/leylines/leylinesjs/issues
[license-shield]: https://img.shields.io/github/license/leylines/leylinesjs.svg?style=flat-square
[license-url]: https://github.com/leylines/leylinesjs/blob/master/LICENSE.md

