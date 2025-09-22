# FinCalcGenius

Welcome to FinCalcGenius, a comprehensive, user-friendly, and visually appealing finance calculator website tailored for everyday users.

## Technologies Used

*   **Framework:** [Next.js](https://nextjs.org/) (React)
*   **Language:** [TypeScript](https://www.typescriptlang.org/)
*   **Styling:** [Bootstrap](https://getbootstrap.com/) & Custom CSS
*   **Form Handling:** [Formik](https://formik.org/) & [Yup](https://github.com/jquense/yup) for validation
*   **Charting:** [Chart.js](https://www.chartjs.org/) with `react-chartjs-2`
*   **Data Export:** [jsPDF](https://github.com/parallax/jsPDF) for PDF & [SheetJS (xlsx)](https://sheetjs.com/) for Excel

## Folder Structure

The project follows a structure conventional for Next.js applications using the App Router.

```
C:\Users\Desktop\calculator
├── src
│   ├── app
│   │   ├── api
│   │   │   └── newsletter
│   │   │       └── route.ts      # API endpoint for newsletter
│   │   ├── calculators
│   │   │   └── [slug]
│   │   │       └── page.tsx      # Dynamic page for calculators
│   │   ├── globals.css           # Global styles
│   │   ├── layout.tsx            # Root layout
│   │   └── page.tsx              # Homepage
│   ├── components
│   │   ├── layout
│   │   │   ├── Footer.tsx
│   │   │   └── Header.tsx
│   │   └── calculators
│   │       ├── EmiCalculator.tsx
│   │       └── SipCalculator.tsx
│   └── ...
├── public/                     # Static assets
├── package.json
└── ...
```

## Getting Started

To run the development server locally:

1.  **Install Dependencies:**
    ```bash
    npm install
    ```
2.  **Run the Server:**
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## How to Add a New Calculator

1.  **Create the Component:** Create a new `.tsx` file in `src/components/calculators/` (e.g., `FdCalculator.tsx`). Use `EmiCalculator.tsx` as a template for the form, calculations, and results display.
2.  **Update the Map:** Open `src/app/calculators/[slug]/page.tsx` and add your new calculator to the `calculatorMap` object.
    ```javascript
    const calculatorMap = {
      'emi': { /* ... */ },
      'sip': { /* ... */ },
      'fd': { // Add this
        component: dynamic(() => import('@/components/calculators/FdCalculator')),
        title: 'Fixed Deposit Calculator'
      },
    };
    ```
3.  **Update Homepage:** Open `src/app/page.tsx` and add the new calculator to the `calculators` array to make it appear on the homepage.

## Deployment on Hostinger

This Next.js application is ready for deployment on any platform that supports Node.js, including Hostinger.

1.  **Build the Application:** Before deploying, you need to create a production build.
    ```bash
    npm run build
    ```
    This will create an optimized build in the `.next` folder.

2.  **Deploy via Hostinger's hPanel:**
    a. Log in to your Hostinger account and navigate to your hPanel.
    b. Go to **Websites** → **Manage** for the domain you want to use.
    c. In the sidebar, find **Advanced** and click on **Node.js**.
    d. Click **Create Application**.
    e. **Application startup file:** Set this to `node_modules/.bin/next`.
    f. **Application root:** This should be the root of your project directory.
    g. Click **Create**.
    h. **Upload Your Files:** Use Hostinger's **File Manager** to upload your entire project (including `node_modules` and the `.next` folder) to the application directory you just configured. Alternatively, you can set up deployment via a private Git repository.
    i. **Set up the `start` script:** Ensure your `package.json` has a `start` script:
        ```json
        "scripts": {
          "dev": "next dev",
          "build": "next build",
          "start": "next start",
          "lint": "next lint"
        }
        ```
    j. **Install and Build on Server (Alternative to uploading `node_modules`):** A better practice is to upload only your source code (not `node_modules` or `.next`). Then, open the **Terminal** in hPanel, navigate to your project root, and run `npm install` and `npm run build`.
    k. **Start the App:** In the Node.js section of hPanel, click **Start / Restart** to run your application.
