# Eco-Explorer 🌿

An immersive nature exploration game built with React, TypeScript, and modern web technologies.

## 🎮 About

Eco-Explorer is an interactive web application that allows players to explore different biomes, discover wildlife, and conduct field research in a beautifully rendered natural environment. The game combines educational content with engaging gameplay mechanics.

## ✨ Features

- **Immersive Exploration**: Navigate through detailed biome environments
- **Real-time Status Display**: Monitor time, weather, and environmental conditions
- **Interactive Gameplay**: Discover and interact with various ecosystem elements
- **Responsive Design**: Optimized for desktop and mobile devices
- **Modern Architecture**: Built with React 18, TypeScript, and Vite

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd eco
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run test` - Run test suite
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## 🏗️ Architecture

The application follows a layered architecture pattern:

- **Component Layer**: React components with container/presentational pattern
- **State Management**: React Context with useReducer for centralized state
- **Type Safety**: Comprehensive TypeScript interfaces and discriminated unions
- **Build System**: Vite for fast development and optimized production builds

### Project Structure

```
src/
├── components/
│   └── containers/          # Container components
├── context/                 # React Context providers
├── types/                   # TypeScript type definitions
├── test/                    # Test setup files
└── App.tsx                  # Main application component
```

## 🧪 Testing

The project includes comprehensive testing with:

- **Vitest** for unit testing
- **React Testing Library** for component testing
- **100% test coverage** for core functionality

Run tests with:
```bash
npm test
```

## 📦 Production Build

To build for production:

```bash
npm run build
```

The optimized build will be available in the `dist/` directory.

## 🤝 Contributing

This project follows conventional commits and requires:

- All code changes to be tested
- ESLint compliance (zero warnings)
- TypeScript type safety
- PR review before merging

## 📄 License

This project is licensed under the MIT License.

## 🎯 Current Status

**Story 1.1: Basic UI Layout & Status Display** ✅ **COMPLETE & DEPLOYED**
- Foundation UI layer implemented
- Status panel with time/weather display
- Exploration interface with background rendering
- Comprehensive state management
- Production-ready with full test coverage
- **Live at**: https://raphaelguerra.github.io/eco/

---

Built with ❤️ for nature exploration and education. 