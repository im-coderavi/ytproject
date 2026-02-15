# AI YouTube Thumbnail Generator

A powerful MERN stack application that leverages Google's Gemini AI to generate professional, click-worthy YouTube thumbnails. Create stunning visual assets tailored to your video's content with customizable styles, color schemes, and overlay text.

![Project Banner](assets/project-banner.png)

## 🚀 Features

-   **AI-Powered Generation**: Utilizes `gemini-3-pro` to create high-quality, relevant thumbnails from text prompts.
-   **Customizable Styles**: Choose from various artistic styles such as:
    -   **Bold & Graphic**: High contrast, vibrant colors.
    -   **Tech/Futuristic**: Sleek, cyber-tech aesthetics.
    -   **Photorealistic**: DSLR-style realism.
    -   **Minimalist**: Clean layouts with negative space.
    -   **Illustrated**: Custom digital illustrations.
-   **Smart Customization**: Define Aspect Ratio, Color Schemes (Neon, Sunset, etc.), and Overlay Text.
-   **Real-time Preview**: Visualize how your thumbnail will look on YouTube before downloading (`/preview`).
-   **Management Dashboard**: Save, view, and manage your generated thumbnails in the "My Generation" gallery.
-   **Cloud Storage**: Seamless integration with Cloudinary for secure and fast image hosting.
-   **Secure Authentication**: robust user authentication system.

## 🛠️ Tech Stack

### Frontend
-   **React 19**: Modern UI library for building interactive interfaces.
-   **Vite**: Next-generation frontend tooling for fast builds.
-   **TailwindCSS 4**: Utility-first CSS framework for rapid UI development.
-   **Framer Motion**: Production-ready animation library for React.
-   **Lucide React**: Beautiful & consistent icons.
-   **Axios**: Promise based HTTP client.

### Backend
-   **Node.js & Express**: Fast, unopinionated web framework for Node.js.
-   **TypeScript**: Typed superset of JavaScript for better code quality.
-   **MongoDB & Mongoose**: rigorous data modeling for the database.
-   **Google GenAI SDK**: Interface for Gemini AI models.
-   **Cloudinary**: Media management service for image uploads.

## 🔧 Installation & Setup

### Prerequisites
-   Node.js (v18+ recommended)
-   MongoDB (Local or Atlas URL)
-   Cloudinary Account
-   Google Gemini API Key

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/ytproject.git
cd ytproject
```

### 2. Backend Setup
Navigate to the server directory and install dependencies:
```bash
cd server
npm install
```

Create a `.env` file in the `server` directory based on `.env.example`:
```env
SESSION_SECRET=your_secret_session_key
MONGODB_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_google_gemini_api_key
CLOUDINARY_URL=cloudinary://api_key:api_secret@cloud_name
NODE_ENV=development
```

Start the backend server:
```bash
npm run server
```
The server will run on `http://localhost:3000` (or your configured port).

### 3. Frontend Setup
Open a new terminal, navigate to the client directory, and install dependencies:
```bash
cd client
npm install
```

Start the development server:
```bash
npm run dev
```
The application will be available at `http://localhost:5173`.

## 📂 Project Structure

```
ytproject/
├── client/                 # React Frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Application pages (Home, Generate, etc.)
│   │   ├── sections/       # Landing page sections
│   │   └── context/        # React Context (Auth, etc.)
├── server/                 # Express Backend
│   ├── controllers/        # Request handlers (Thumbnail, Auth)
│   ├── models/             # Mongoose models (User, Thumbnail)
│   ├── routes/             # API routes
│   └── configs/            # Configuration files (AI, Database)
└── README.md
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1.  Fork the project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
