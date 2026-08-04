import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Sidebar from './components/Sidebar';

import DashboardPage from './pages/DashboardPage';
import MovementsPage from './pages/MovementsPage';
import RacksPage from './pages/RacksPage';
import OptimizacionPage from './pages/OptimizacionPage';
import OrdenesTrabajoPage from './pages/OrdenesTrabajoPage';
import HistoryPage from './pages/HistoryPage';
import SettingsPage from './pages/SettingsPage';
import MontacargasPage from './pages/MontacargasPage';
import AccessControlPage from './pages/AccessControlPage';
import IntegrationLabPage from './pages/IntegrationLabPage';
import InventoryQueryPage from './pages/InventoryQueryPage';

import { WmsDataProvider } from './context/WmsDataContext';

function App() {

  return (
    <WmsDataProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-slate-100 text-slate-900">
          <div className="flex">
            <Sidebar />

            <main className="flex-1 p-5 lg:p-8">
              <Routes>
                <Route path="/" element={<DashboardPage />} />

                <Route
                  path="/access-control"
                  element={<AccessControlPage />}
                />

                <Route
                  path="/movements"
                  element={<MovementsPage />}
                />

                <Route
                  path="/racks"
                  element={<RacksPage />}
                />

                <Route
                  path="/inventory"
                  element={<InventoryQueryPage />}
                />

                <Route
                  path="/optimizacion"
                  element={<OptimizacionPage />}
                />

                <Route
                  path="/ordenes-trabajo"
                  element={<OrdenesTrabajoPage />}
                />

                <Route
                  path="/history"
                  element={<HistoryPage />}
                />

                <Route
                  path="/settings"
                  element={<SettingsPage />}
                />

                <Route
                  path="/montacargas"
                  element={<MontacargasPage />}
                />

                <Route
                  path="/integration-lab"
                  element={<IntegrationLabPage />}
                />

              </Routes>
            </main>
          </div>
        </div>
      </BrowserRouter>
    </WmsDataProvider>
  );
}

export default App;