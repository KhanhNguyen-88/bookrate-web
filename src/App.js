import {BrowserRouter, Routes, Route} from 'react-router-dom';
import DefaultLayout from './layout/DefaultLayout';

import { publicRoutes } from './router';
function App() {
  return (
  <BrowserRouter>
      <div>
        <Routes>
          {publicRoutes.map((route, index)=>{
            const Page = route.com
            const Layout = route.layout || DefaultLayout
            return <Route key={index} path={route.path} element={<Layout><Page/></Layout>}></Route>
          })}
        </Routes>
      </div>
  </BrowserRouter>);
}

export default App;
