
import './App.css';
import { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { NavBar } from './Components';
import loadable from '@loadable/component';

const NoMatch = loadable(() => import('./Components/NoMatch'));
const Home = loadable(() => import('./Pages/Home'));
const About = loadable(() => import('./Pages/About'));
const Models = loadable(() => import('./Pages/Models'));
const ModelDetails = loadable(() => import('./Pages/ModelDetails'));


const App = () => {

  return (
    <>
      <NavBar />
      <Suspense fallback={<div className="container">Loading...</div>}>
        <Routes>
          <Route index path="/" element={<Home />} />
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
