
# Lotto Number Generator

## Overview

This project is a modern web application that generates random lottery numbers. It features a clean, responsive UI with dark/light mode support, built using native Web Components for modularity and performance.

## Features

*   **Lottery Number Generation:** Generates 6 unique random numbers between 1 and 45 with a smooth "pop-in" animation.
*   **Partnership Inquiry Form:** A clean form connected to Formspree for handling business inquiries.
*   **Theme Switching:** Support for Dark Mode and Light Mode with persistence via `localStorage`.
*   **Modern Aesthetics:** Uses Pretendard font, smooth transitions, and a vibrant color palette with elevation effects.
*   **Web Components:** Encapsulated logic and styling using Custom Elements and Shadow DOM.

## Project Details

### HTML (`index.html`)
*   Main entry point with `<theme-toggle>`, `<lotto-generator>`, and `<partnership-form>` components.
*   Responsive meta tags and link to external styles.

### CSS (`style.css`)
*   **Theming:** Implemented using CSS variables (`:root` and `[data-theme="dark"]`).
*   **Layout:** Flexbox-based vertical layout with smooth transitions.
*   **Typography:** Modern system fonts for clarity and style.

### JavaScript (`main.js`)
*   `ThemeToggle` Component: Handles theme logic, attribute toggling on the `html` element, and persistence.
*   `LottoGenerator` Component: Manages random number generation, sorting, and animated rendering of lottery balls.
*   `PartnershipForm` Component: A form that sends partnership inquiries to Formspree using the `fetch` API.
