import {
  BuildingLibraryIcon,
  BuildingStorefrontIcon,
  DocumentCurrencyDollarIcon,
  HomeModernIcon,
  UserGroupIcon,
  UsersIcon,
  WrenchScrewdriverIcon,
} from '@heroicons/react/16/solid';
import {
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

function Dashboard() {
  const data1 = [
    { name: 'Page A', uv: 20, pv: 2400 },
    { name: 'Page B', uv: 50, pv: 2400 },
    { name: 'Page C', uv: 40, pv: 2400 },
    { name: 'Page D', uv: 200, pv: 2400 },
    { name: 'Page E', uv: 300, pv: 2400 },
    { name: 'Page F', uv: 400, pv: 2400 },
    { name: 'Page G', uv: 350, pv: 2400 },
    { name: 'Page A', uv: 400, pv: 2400 },
    { name: 'Page A', uv: 800, pv: 2400 },
  ];

  const data = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
  ];
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="space-y-12 text-boxdark">
      <section className="space-y-6 rounded-sm bg-body px-6 py-4">
        <p>
          <span className="block text-xl font-semibold text-slate-50">
            Overview
          </span>
          <span className="text-slate-200">Apartment data overview</span>
        </p>
        <div className="flex flex-wrap gap-4 [&>*]:min-w-30 [&>*]:flex-1 [&>*]:basis-14">
          <div className="flex flex-col gap-1.5 rounded-md bg-grey-3 px-4 py-2 text-left text-graydark">
            <span>
              <BuildingLibraryIcon className="h-14 w-14 fill-meta-5" />
            </span>
            <h1 className="text-lg font-bold">004</h1>
            <p className="text-base">Apartments</p>
            <span className="text-xs font-medium text-meta-5">
              Total Number
            </span>
          </div>
          <div className="flex flex-col gap-1.5 rounded-md bg-grey-3 px-4 py-2 text-left text-graydark">
            <span>
              <BuildingStorefrontIcon className="h-14 w-14 fill-indigo-400" />
            </span>
            <h1 className="text-lg font-bold">200</h1>
            <p className="text-base">Units</p>
            <span className="text-xs font-medium text-indigo-400">
              Total Number of units
            </span>
          </div>
          <div className="flex flex-col gap-1.5 rounded-md bg-grey-3 px-4 py-2 text-left text-graydark">
            <span>
              <BuildingStorefrontIcon className="h-14 w-14 fill-green-300" />
            </span>
            <h1 className="text-lg font-bold">004</h1>
            <p className="text-base">Occupied</p>
            <span className="text-xs font-medium text-green-500">
              Units occupied
            </span>
          </div>
          <div className="flex flex-col gap-1.5 rounded-md bg-grey-3 px-4 py-2 text-left text-graydark">
            <span>
              <HomeModernIcon className="h-14 w-14 fill-red-400" />
            </span>
            <h1 className="text-lg font-bold">80</h1>
            <p className="text-base">Vacant</p>
            <span className="text-xs font-medium text-red-400">
              Vacant units
            </span>
          </div>
          <div className="flex flex-col gap-1.5 rounded-md bg-grey-3 px-4 py-2 text-left text-graydark">
            <span>
              <UsersIcon className="h-14 w-14 fill-slate-500" />
            </span>
            <h1 className="text-lg font-bold">150</h1>
            <p className="text-base">Tenants</p>

            <span className="text-xs font-medium text-slate-500">
              Number of Tenants
            </span>
          </div>
          <div className="flex flex-col gap-1.5 rounded-md bg-grey-3 px-4 py-2 text-left text-graydark">
            <span>
              <UserGroupIcon className="h-14 w-14 fill-slate-500" />
            </span>
            <h1 className="text-lg font-bold">500</h1>
            <p className="text-base">Users</p>
            <span className="text-xs font-medium text-slate-500">
              System Users
            </span>
          </div>
          <div className="flex flex-col gap-1.5 rounded-md bg-grey-3 px-4 py-2 text-left text-graydark">
            <span>
              <DocumentCurrencyDollarIcon className="h-14 w-14 fill-meta-5" />
            </span>
            <h1 className="text-lg font-bold">004</h1>
            <p className="text-base">Invoices</p>
            <span className="text-xs font-medium text-meta-5">
              Total Number of invoices
            </span>
          </div>
          <div className="flex flex-col gap-1.5 rounded-md bg-grey-3 px-4 py-2 text-left text-graydark">
            <span>
              <WrenchScrewdriverIcon className="h-14 w-14 fill-meta-5" />
            </span>
            <h1 className="text-lg font-bold">10 </h1>
            <p className="text-base">Maintenance</p>
            <span className="text-xs font-medium text-meta-5">
              Maintenance requests
            </span>
          </div>
        </div>
      </section>

      <section className="rounded-sm bg-body px-6 py-4">
        <div className="grid grid-cols-2 gap-12">
          <div className="bg-orange-200">
            <div className="flex justify-between px-2 py-4.5">
              <p>Apartment Occupancy Rate</p>
              <form>
                <select>
                  <option>Filter by</option>
                  <option>Location</option>
                  <option>Month</option>
                  <option>Type</option>
                </select>
              </form>
            </div>
            <div>
              <div className="h-[300px] w-full">
                <ResponsiveContainer>
                  <PieChart>
                    <Pie
                      data={data}
                      cx="50%" // Center horizontally
                      cy="50%" // Center vertically
                      innerRadius={60} // Optional: Donut chart effect
                      outerRadius={90}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                      label={({ name, percent }) =>
                        `${name} (${(percent * 100).toFixed(0)}%)`
                      }
                    >
                      {data.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="bg-red-500 text-slate-100">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart width={600} height={400} data={data1}>
                <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      <section>Section Maintenance requests </section>
      <section>Section Quick reports and actions </section>
    </div>
  );
}

export default Dashboard;
