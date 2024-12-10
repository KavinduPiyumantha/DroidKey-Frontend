# DroidKey Android Security Analysis Tool

This project is a web application for analyzing the security of Android APK files. It allows users to upload APK files and receive detailed security analysis results.

---

## Project Structure

```
.env
.gitignore
Dockerfile
package.json
public/
    index.html
    manifest.json
    robots.txt
README.md
src/
    App.css
    App.js
    App.test.js
    components/
        AnalysisResults.js
        UploadForm.js
    index.css
    index.js
    reportWebVitals.js
    services/
    setupTests.js
```

---

## Available Scripts

In the project directory, you can run:

### `npm start`

- Runs the app in development mode.
- Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
- The page will reload when you make changes.
- You may also see lint errors in the console.

### `npm test`

- Launches the test runner in the interactive watch mode.
- See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

- Builds the app for production to the `build` folder.
- It correctly bundles React in production mode and optimizes the build for the best performance.
- The build is minified, and the filenames include hashes.
- Your app is ready to be deployed!
- See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: This is a one-way operation. Once you `eject`, you can't go back!**

- Copies all configuration files and dependencies into your project.
- Allows full control over tools like Webpack, Babel, ESLint, etc.

---

## Running the Project

1. **Download the Code Repository**:  
   Visit the following link to download the repository as a ZIP file:  
   Download DroidKey-Backend: [https://anonymous.4open.science/api/repo/DroidKey-Backend-A51A/](https://anonymous.4open.science/api/repo/DroidKey-Backend-A51A/zip)

2. **Extract the ZIP File**:  
   After downloading the ZIP file, extract its contents using any file extraction tool of your choice.

3. **Navigate to the Project Directory**:  
   Open the extracted folder and navigate to the `droidkey-backend` directory using cmd.

4. **Install the dependencies**:

   ```sh
   npm install
   ```

5. **Start the development server**:

   ```sh
   npm start
   ```

6. **Open the app**:  
   Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

---

## Docker Support

You can also run the project using Docker:

1. **Build the Docker image**:

   ```sh
   docker build -t droidkey-frontend .
   ```

2. **Run the Docker container**:

   ```sh
   docker run -p 80:80 droidkey-frontend
   ```

3. **Access the app**:  
   Open [http://localhost](http://localhost) in your browser.

---

## Learn More

To learn more about this project or tools used:

- [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started)
- [React documentation](https://reactjs.org/)

---

## Advanced Topics

### Code Splitting

Learn more about [code splitting](https://facebook.github.io/create-react-app/docs/code-splitting).

### Analyzing the Bundle Size

Learn more about [analyzing the bundle size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size).

### Making a Progressive Web App

Learn more about [progressive web apps](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app).

### Advanced Configuration

Learn more about [advanced configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration).

### Deployment

Learn more about [deployment](https://facebook.github.io/create-react-app/docs/deployment).

### `npm run build` fails to minify

Troubleshoot build errors by visiting [this guide](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify).
