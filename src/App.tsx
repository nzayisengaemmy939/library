import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LibraryEntrance from './pages/entrancepage';
import LibraryAccountCreation from './pages/registerpage';
import LandingPage from './pages/landing_page';
import { ThemeProvider } from './context/useTheme';
import './i18n.js';

const App = () => {
  return (
    <div>
      <ThemeProvider>
      <Router>
       
       <main>
         <Routes>
         <Route path="/entrance" element={<LibraryEntrance />} />
           <Route path="/" element={<LandingPage />} />
           <Route path="/register" element={<LibraryAccountCreation />} />
         </Routes>
       </main>
      
     </Router>
      </ThemeProvider>
   
    </div>
  );
};

export default App;
