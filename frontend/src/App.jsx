import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ListManufacturers from './ListManufacturers'
import ListModels from './ListModels'
import ListAutos from './ListAutos'
import MainPage from './MainPage';
import Nav from './Nav';
import ListEmployees from './ListEmployees';
import ListAppointments from './ListAppointments';
import ListPendingSales from './ListPendingSales';

export default function App () {

  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="manufacturers">
            <Route index element={ <ListManufacturers/> }/>
          </Route>
          <Route path="models">
            <Route index element={ <ListModels/> }/>
          </Route>
          <Route path="automobiles">
            <Route index element={ <ListAutos /> } />
          </Route>
          <Route path="employees">
            <Route index element={ <ListEmployees/> } />
          </Route>
          <Route path="appointments">
            <Route index element={ <ListAppointments/> }/>
          </Route>
          <Route path="pending-sales">
            <Route index element={ <ListPendingSales /> }/>
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}


