# LUT Statistical Portal - Web Programming v.2024

## Introduction

This project is developed as part of **LUT University's** course **Introduction to Web Programming (v.2024)**. The goal of this project is to create a **statistical data portal** that visualizes open data from portals such as [Tilastokeskus](https://statfin.stat.fi/PxWeb/pxweb/en/StatFin/), using **Leaflet.js** for interactive maps and **Frappe.js** for charts.

The application allows users to visualize and compare datasets, such as election results, unemployment rates, and other municipal statistics, in a user-friendly and responsive interface.

## Features

- Interactive map visualization using **Leaflet.js** to show data by municipality (e.g., election results, unemployment rates).
- Dynamic charts powered by **Frappe.js** to display time-series data and comparisons.
- A sidebar for users to select datasets, years, and filter options.
- Exportable visualizations (PNG or SVG).
- Fully responsive design that works across desktop and mobile devices.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Technologies](#technologies)
- [Project Structure](#project-structure)
- [Acknowledgements](#acknowledgements)
- [License](#license)

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/) installed on your system.
- Basic knowledge of HTML, CSS, and JavaScript.

### Steps to Install

1. Clone the repository:

   ```bash
   git clone https://github.com/YOUR_USERNAME/lut-stat-portal-webprog2024.git
   ```

2. Navigate to the project directory:

   ```bash
   cd lut-stat-portal-webprog2024
   ```

3. Install the required dependencies:

   ```bash
   npm install
   ```

4. Start a local development server:

   ```bash
   npm start
   ```

5. Open the project in your browser at `http://localhost:3000`.

## Usage

1. Upon starting the application, you'll see an interactive map of municipalities.
2. Use the **dropdown menus** in the sidebar to select datasets (e.g., election results, unemployment rates).
3. The **map** and **chart** will update dynamically based on your selections.
4. You can **export the visualizations** using the "Download" button to save them as PNG or SVG files.
5. The interface adapts to both desktop and mobile, providing a smooth experience on all devices.

## Technologies

- **[Leaflet.js](https://leafletjs.com/)**: For interactive maps.
- **[Frappe.js](https://frappe.io/charts)**: For chart visualizations.
- **[Bootstrap 5](https://getbootstrap.com/)**: For responsive design and layout.
- **[Node.js](https://nodejs.org/)** and **npm**: For managing dependencies and running the development server.

## Project Structure

```
|-- /public                  # Static files (index.html, stylesheets)
|-- /src
|   |-- /components           # Reusable UI components (Map, Charts, Sidebar)
|   |-- /data                 # Functions for fetching and handling data from the API
|   |-- /assets               # Custom styles and images
|   |-- /js                   # Custom JavaScript files
|-- README.md                 # Project documentation
|-- package.json              # Node.js dependencies and scripts
```

## Acknowledgements

- **LUT University** for offering the course **Introduction to Web Programming**.
- Open data provided by [Tilastokeskus](https://statfin.stat.fi/PxWeb/pxweb/en/StatFin/).
- Libraries:
  - **Leaflet.js** for map visualizations.
  - **Frappe.js** for interactive charts.
  - **Bootstrap 5** for responsive design.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
