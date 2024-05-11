import { BrowserRouter as Router ,Routes, Route, useLocation } from 'react-router-dom';
import {publicRoutes} from './routes';
import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query';

import './App.css';

function App() {
  const client = new QueryClient();
  return (
    <QueryClientProvider client={client}>
      <Router>
        <div className='bg-black'>
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
    </QueryClientProvider>
  );
}

export default App;
