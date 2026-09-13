# Secret Style BD — E-Commerce Web Application

A modern, responsive e-commerce web platform for **Secret Style BD**, featuring export-quality women's sleepwear, loungewear, pajama sets, and comfort essentials in Bangladesh.

Built with **React 19**, **Vite**, **TypeScript**, **Tailwind CSS**, and **Motion**.

---

## Features

- **Storefront & Catalog**: Category-based filtering (Pajama Shirts, Summer Shorts, Long Pajamas, Panties), live search, size and color selectors, instant buy, and dynamic shopping cart.
- **Order Management & Checkout**: Multi-district delivery options (Dhaka Inside, Sub-Dhaka, Outside Dhaka), cash-on-delivery, and order confirmation invoice generator.
- **Customer Order Tracking**: Real-time parcel tracking code lookup with visual status timeline (Steadfast / Pathao / RedX integration ready).
- **Admin Management Portal**: Passcode-secured (`1234` default) dashboard for inventory tracking, order status updates, courier code assignment, customer directory, and catalog management.
- **Bilingual Support**: Instant toggle between Bengali (বাংলা) and English.

---

## Getting Started Locally

### Prerequisites
- Node.js 18+ or 20+
- npm (comes with Node.js)

### Installation
```bash
# Clone the repository
git clone https://github.com/<your-username>/<your-repo-name>.git
cd <your-repo-name>

# Install dependencies
npm install

# Start the local development server
npm run dev
```

The application will be accessible at `http://localhost:3000`.

---

## GitHub Deployment Guide

This project is pre-configured for automated **GitHub Actions CI/CD** and **GitHub Pages**.

### 1. Push to Your GitHub Repository

Initialize and push to your new GitHub repository:

```bash
git init
git add .
git commit -m "Initial commit: Secret Style BD production build"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo-name>.git
git push -u origin main
```

### 2. Enable GitHub Pages via GitHub Actions

1. Go to your repository on **GitHub**.
2. Click on **Settings** (top navigation tab).
3. In the left sidebar, click on **Pages**.
4. Under **Build and deployment** > **Source**, select **GitHub Actions**.
5. Once selected, every push to `main` (or manual trigger from the **Actions** tab) will automatically build and deploy your live site!

Your site will be live at:
`https://<your-username>.github.io/<your-repo-name>/`

---

## Available Scripts

- `npm run dev`: Starts the Vite development server on port 3000.
- `npm run build`: Compiles TypeScript and builds production-ready static assets into `dist/`.
- `npm run preview`: Previews the built production app locally.
- `npm run lint`: Runs TypeScript compiler check (`tsc --noEmit`).

---

## License
MIT
