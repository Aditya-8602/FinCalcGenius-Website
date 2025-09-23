# FinCalcGenius

Welcome to FinCalcGenius, a comprehensive, user-friendly, and visually appealing finance calculator website tailored for everyday users.

## Technologies Used

*   **Framework:** [Next.js](https://nextjs.org/) (React)
*   **Language:** [TypeScript](https://www.typescriptlang.org/)
*   **Styling:** [Bootstrap](https://getbootstrap.com/) & Custom CSS
*   **Form Handling:** [Formik](https://formik.org/) & [Yup](https://github.com/jquense/yup) for validation
*   **Charting:** [Chart.js](https://www.chartjs.org/) with `react-chartjs-2`
*   **Data Export:** [jsPDF](https://github.com/parallax/jsPDF) for PDF & [exceljs](https://github.com/exceljs/exceljs) for Excel

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

# FinCalcGenius-Website
FinCalcGenius is your ultimate online resource for comprehensive and user-friendly financial calculators. Our mission is to empower individuals, from students and freelancers to working professionals, with the tools they need to make informed financial decisions. 

## Security

This project includes several security measures to protect against common vulnerabilities. Here's a summary of the security features and best practices:

### Implemented Security Measures

- **Dependency Management:** The `xlsx` package has been replaced with `exceljs` to mitigate a known vulnerability.
- **File Upload Validation:** The `src/utils/security.ts` file includes functions for validating file uploads:
    - **File Size and Row Limits:** Enforces limits on file size and row count to prevent resource exhaustion attacks.
    - **Virus Scanning:** Includes a placeholder for virus scanning uploaded files. To implement this, you'll need to sign up for a service like VirusTotal and use their API key.
    - **Input Validation:** Provides a function to validate and whitelist accepted columns/fields in uploaded data.
- **Authentication:** A basic authentication middleware is included in `src/utils/security.ts`. It's a placeholder that checks for an API key in the request headers.

### `.env` File and Secrets Management

A `.env.example` file has been provided to show how to set up your environment variables. To use it:

1.  Create a copy of `.env.example` and rename it to `.env`.
2.  Add your secret keys and other environment variables to the `.env` file.
3.  **Important:** Make sure to add the `.env` file to your `.gitignore` file to prevent it from being committed to version control.

### HTTPS

For production deployments, it is crucial to use HTTPS to encrypt all traffic between the client and the server. Most modern hosting platforms, including Hostinger, provide free SSL certificates and handle HTTPS automatically.

### Credentials Rotation and Log Monitoring

- **Credentials Rotation:** Regularly rotate all credentials, including API keys and database passwords. This limits the window of opportunity for an attacker if a key is compromised.
- **Log Monitoring:** Regularly monitor application and server logs for any suspicious activity or anomalies. This can help you detect and respond to security incidents in a timely manner.

