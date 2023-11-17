// third party
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
// internal source
import Menu from './components/Menu';
import Home from './pages/Home';
import Movies from './pages/Movies';
import ShowMovie from './pages/Movies/show';
import Genres from './pages/Genres';
import ShowMoviesGenre from './pages/Genres/Show';
import Admin from './pages/Admin';
import MovieForm from './components/movies/MovieForm';
import Login from './pages/Login';
import Register from './pages/Register';

// style
import './App.css';

function App() {
  return (
    <Router>
      <div className='container'>
        <div className='row'>
          <h1 className='mt-3'>
            Go React Movie Project
          </h1>
          <hr className='mb-3'/>
        </div>
        <div className='row'>
          <div className='col-2'>
            <Menu />
          </div>
          <div className='col-10'>
            <Routes>
              <Route path='/login' element={<Login/>}></Route>
              <Route path='/register' element={<Register/>}></Route>
              <Route path='/' element={<Home />}></Route>
              <Route exact path='/movies/:id' element={<ShowMovie />}></Route>
              <Route path='/movies' element={<Movies />}></Route>
              <Route exact path='/movie-genre/:id' element={<ShowMoviesGenre />}></Route>
              <Route path='/genres' element={<Genres/>}></Route>
              <Route exact path='/admin/movies/:id/edit' element={<MovieForm/>}></Route>
              <Route exact path='/admin/movies/create' element={<MovieForm/>}></Route>
              <Route path='/admin' element={<Admin/>}></Route>
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
