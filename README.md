# 📦 Food Barcode Scanner

A React web application that lets you scan product barcodes and fetch detailed nutritional, allergen, and dietary information using the [OpenFoodFacts API](https://world.openfoodfacts.org/).

The app visually highlights important tags such as vegan, vegetarian, palm oil presence, and displays comprehensive nutritional values.

---

## Features

- Scan barcodes using your device camera.
- Fetch product details from OpenFoodFacts API.
- Display product name, brand, quantity, and image.
- Show allergens and dietary tags with color-coded highlights:
  - **Green**: Positive (Vegan, Palm Oil Free, Vegetarian)
  - **Yellow**: Uncertain (Maybe Vegan, May Contain Palm Oil)
  - **Red**: Negative (Non-Vegan, Contains Palm Oil)
- Detailed nutritional information per 100g (energy, fat, sugar, protein, fiber, salt, etc.)
- Seamless navigation between scanner and product pages.

---

## Technologies Used

- React
- React Router
- ZXing Barcode Scanner (`@zxing/library`)
- Tailwind CSS (for styling)
- OpenFoodFacts API

---

## Usage

1. Open the app in a browser.
2. Allow camera access.
3. Scan a barcode.
4. View product information, allergens, tags, and nutritional data.
5. Navigate back to scan another product.
