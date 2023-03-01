
import './App.css';
import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { NavBar } from './Components';

const NoMatch = lazy(() => import('./Components/NoMatch'));
const Home = lazy(() => import('./Pages/Home'));
const About = lazy(() => import('./Pages/About'));
const Models = lazy(() => import('./Pages/Models'));
const ModelDetails = lazy(() => import('./Pages/ModelDetails'));



const App = () => {

  return (
    <>
      <NavBar />
      <Suspense fallback={<div className="container">Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/models" element={<Models />} />
          <Route path="/models/:modelId" element={<ModelDetails />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
