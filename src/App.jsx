import { BrowserRouter as Router ,Routes, Route, useLocation } from 'react-router-dom';
import {publicRoutes} from './routes';
import { useEffect } from 'react';
import './App.css';

function App() {
  const ScrollToTop = (props) => {
    const location = useLocation();
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [location]);
    return <>{props.children}</>;
  };

  return (
    <Router>
      <div className='bg-black'>
        <ScrollToTop />
          <Routes>
            {publicRoutes.map((route, index) => {
              const Page = route.component;
              return (
                <Route key={index} path={route.path} element={<Page />}/>
              )
            })}
          </Routes>
      </div>
    </Router>
  );
}

export default App;
