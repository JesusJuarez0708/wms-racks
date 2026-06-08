import { NavLink } from 'react-router-dom';

const menuItems = [
  {
    label: 'Dashboard',
    path: '/',
  },
  {
    label: 'Movimientos',
    path: '/movements',
  },
  {
    label: 'Racks',
    path: '/racks',
  },
  {
    label: 'Optimización',
    path: '/optimizacion',
  },
  {
    label: 'Órdenes de trabajo',
    path: '/ordenes-trabajo',
  },
  {
    label: 'Historial',
    path: '/history',
  },
  {
    label: 'Configuración',
    path: '/settings',
  },
  {
    label: 'Montacargas',
    path: '/montacargas',
  },
];

function Sidebar() {
  return (
    <aside className="hidden min-h-screen w-72 bg-slate-950 p-6 text-white lg:block">
      <h2 className="text-xl font-bold">
        WMS Racks
      </h2>

      <p className="mt-1 text-sm text-slate-400">
        Control inteligente
      </p>

      <nav className="mt-8 space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.path}
            className={({ isActive }) =>
              `block w-full rounded-xl px-4 py-3 text-sm font-medium transition ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;