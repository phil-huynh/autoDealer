import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AddManufacturer from './AddManufacturer';
import AddModel from './AddModel';
import AddVehicle from './AddVehicle';
import ListManufacturers from './ListManufacturers'
import ListModels from './ListModels'
import ListAutos from './ListAutos'
import MainPage from './MainPage';
import Nav from './Nav';

function App(props) {
  let {manufacturers, models, autos, loadManufacturers, loadModels, loadAutos, updateData} = props
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="manufacturers">
            <Route
              index
              element={<ListManufacturers
                manufacturers={manufacturers}
              />}
            />
            <Route
              path="new"
              element={<AddManufacturer
                manufacturers={manufacturers}
                models={models}
                autos={autos}
                loadManufacturers={loadManufacturers}
                updateData={updateData}
              />}
            />
          </Route>
          <Route path="models">
            <Route
              index
              element={<ListModels
                models={models}
              />}
            />
            <Route
              path="new"
              element={<AddModel
                manufacturers={manufacturers}
                models={models}
                autos={autos}
                loadModels={loadModels}
                updateData={updateData}
              />}
            />
          </Route>
          <Route path="automobiles">
            <Route
              index
              element={<ListAutos
                autos={autos}
              />}
            />
            <Route
              path="new"
              element={<AddVehicle
                manufacturers={manufacturers}
                models={models}
                autos={autos}
                loadAutos={loadAutos}
                updateData={updateData}
              />}
            />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
