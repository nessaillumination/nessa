import { useEffect, useState } from 'react'
import { Search } from 'lucide-react'
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts'
import MapComponent from './MapComponent'
// import Pagination from '@mui/material/Pagination'
import { fetchVisitorLocation } from '../../service/apiService'

const IPAnalyticsDashboard = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const [apiData, setApiData] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const rowsPerPage = 5

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetchVisitorLocation()
            setApiData(response.data)
        }
        fetchData()
    }, [])

    // Aggregate data for visualizations
    const countryStats = apiData.reduce((acc, curr) => {
        acc[curr.countryName] = (acc[curr.countryName] || 0) + 1
        return acc
    }, {})

    const pieData = Object.entries(countryStats).map(([name, value]) => ({
        name,
        value
    }))

    const COLORS = ['#60A5FA', '#34D399', '#F472B6', '#FBBF24', '#A78BFA']

    const filteredData = apiData.filter(
        (item) =>
            item.ipAddress?.includes(searchTerm) ||
            item.cityName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.countryName?.toLowerCase().includes(searchTerm.toLowerCase())
    )

    // Pagination logic
    const indexOfLastRow = currentPage * rowsPerPage
    const indexOfFirstRow = indexOfLastRow - rowsPerPage
    const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow)

    const handleChangePage = (event, newPage) => {
        setCurrentPage(newPage)
    }

    return (
        <div className="min-h-screen bg-white text-gray-900 p-6">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                        Analytics Dashboard
                    </h1>
                    <div className="relative w-full md:w-auto">
                        <Search
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                            size={20}
                        />
                        <input
                            type="text"
                            placeholder="Search IP, City, or Country"
                            className="w-full md:w-80 bg-gray-100 text-gray-900 pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 shadow-md">
                        <h3 className="text-gray-700 text-lg font-semibold mb-2">Total Visitors</h3>
                        <p className="text-4xl font-bold text-blue-400">{apiData.length}</p>
                    </div>
                    <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 shadow-md">
                        <h3 className="text-gray-700 text-lg font-semibold mb-2">Unique Countries</h3>
                        <p className="text-4xl font-bold text-purple-400">{Object.keys(countryStats).length}</p>
                    </div>
                    <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 shadow-md">
                        <h3 className="text-gray-700 text-lg font-semibold mb-2">Active Sessions</h3>
                        <p className="text-4xl font-bold text-green-400">{Math.floor(apiData.length * 0.4)}</p>
                    </div>
                    <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 shadow-md">
                        <h3 className="text-gray-700 text-lg font-semibold mb-2">Last Country</h3>
                        <p className="text-4xl font-bold text-pink-400">{apiData.length > 0 ? apiData[apiData.length - 1].countryName : 'N/A'}</p>
                    </div>
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 shadow-md">
                        <h2 className="text-xl font-semibold text-gray-700 mb-4">Visitors by Country</h2>
                        <div className="h-80">
                            <ResponsiveContainer
                                width="100%"
                                height="100%">
                                <PieChart>
                                    <Pie
                                        data={pieData}
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="value">
                                        {pieData.map((entry, index) => (
                                            <Cell
                                                key={`cell-${index}`}
                                                fill={COLORS[index % COLORS.length]}
                                            />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: 'rgba(17, 24, 39, 0.9)',
                                            border: '1px solid rgba(255, 255, 255, 0.1)',
                                            borderRadius: '8px',
                                            color: '#fff'
                                        }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                        <h2 className="text-xl font-semibold text-gray-700 mb-4">Visitor Locations</h2>
                        <div className="h-80">
                            <MapComponent data={apiData} />
                        </div>
                    </div>
                </div>

                {/* Data Table */}
                {/* <div className="bg-gray-50 border border-gray-200 rounded-xl overflow-hidden shadow-md">
                    <div className="p-6 border-b border-gray-200">
                        <h2 className="text-xl font-semibold text-gray-700">Visitor Details</h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-200">
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">IP Address</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Location</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Country</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Time Zone</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Currency</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {currentRows.map((item, index) => (
                                    <tr
                                        key={index}
                                        className="text-gray-700 hover:bg-gray-100 transition-colors">
                                        <td className="px-6 py-4 text-sm">{item.ipAddress}</td>
                                        <td className="px-6 py-4 text-sm">{`${item.cityName}, ${item.regionName}`}</td>
                                        <td className="px-6 py-4 text-sm">{item.countryName}</td>
                                        <td className="px-6 py-4 text-sm">{item.timeZone}</td>
                                        <td className="px-6 py-4 text-sm">{`${item.currency.code} (${item.currency.name})`}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="p-6 flex justify-center">
                        <Pagination
                            count={Math.ceil(filteredData.length / rowsPerPage)}
                            page={currentPage}
                            onChange={handleChangePage}
                            color="primary"
                        />
                    </div>
                </div> */}
            </div>
        </div>
    )
}

export default IPAnalyticsDashboard
