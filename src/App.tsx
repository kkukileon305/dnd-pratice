import { Route, Routes } from 'react-router-dom';
import Main from './pages/Main';
import Search from './pages/Search';

const App = () => {
  return (
    <main className='bg-gray-200 min-h-[100vh]'>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/search' element={<Search />} />
      </Routes>
    </main>
  );
};

export default App;
