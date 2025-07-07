"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import {
  BarChart3,
  Users,
  Clock,
  CheckCircle,
  AlertCircle,
  Search,
  Filter,
  LogOut,
  MessageSquare,
  Download,
  Eye,
  Trash2,
  X,
} from "lucide-react"
import { useAuth } from "../contexts/AuthContext"
// Add import at the top
import { api } from "../utils/api"

const AdminDashboard = () => {
  const { isAuthenticated, logout, loading } = useAuth()
  const navigate = useNavigate()

  const [grievances, setGrievances] = useState([])
  const [filteredGrievances, setFilteredGrievances] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filters, setFilters] = useState({
    status: "",
    department: "",
    dateRange: "",
    priority: "",
  })
  const [isLoading, setIsLoading] = useState(true)
  const [selectedGrievance, setSelectedGrievance] = useState(null)
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    fetchGrievances()
  }, [])

  // Replace the fetchGrievances function:
  const fetchGrievances = async () => {
    setIsLoading(true)
    try {
      const data = await api.getGrievances()
      setGrievances(data)
      setFilteredGrievances(data)
    } catch (error) {
      console.error("Error fetching grievances:", error)
      alert("Failed to load grievances. Please check if the backend is running.")
    } finally {
      setIsLoading(false)
    }
  }

  // Replace the updateGrievanceStatus function:
  const updateGrievanceStatus = async (grievanceId, newStatus) => {
    try {
      await api.updateGrievance(grievanceId, { status: newStatus })
      // Refresh the grievances list
      fetchGrievances()
    } catch (error) {
      console.error("Error updating grievance:", error)
      alert("Failed to update grievance status")
    }
  }

  // Replace the deleteGrievance function:
  const deleteGrievanceHandler = async (grievanceId) => {
    if (window.confirm("Are you sure you want to delete this grievance?")) {
      try {
        await api.deleteGrievance(grievanceId)
        // Refresh the grievances list
        fetchGrievances()
      } catch (error) {
        console.error("Error deleting grievance:", error)
        alert("Failed to delete grievance")
      }
    }
  }

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate("/admin/login")
    }
  }, [isAuthenticated, loading, navigate])

  useEffect(() => {
    let filtered = grievances

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (grievance) =>
          grievance.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          grievance.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          grievance.complaint.toLowerCase().includes(searchTerm.toLowerCase()) ||
          grievance.id.toString().includes(searchTerm),
      )
    }

    // Apply status filter
    if (filters.status) {
      filtered = filtered.filter((grievance) => grievance.status === filters.status)
    }

    // Apply department filter
    if (filters.department) {
      filtered = filtered.filter((grievance) => grievance.department === filters.department)
    }

    // Apply priority filter
    if (filters.priority) {
      filtered = filtered.filter((grievance) => grievance.priority === filters.priority)
    }

    // Apply date range filter
    if (filters.dateRange) {
      const now = new Date()
      const filterDate = new Date()

      switch (filters.dateRange) {
        case "24h":
          const filterDate24 = new Date()
          filterDate24.setDate(now.getDate() - 1)
          filtered = filtered.filter((grievance) => new Date(grievance.submitted_at) >= filterDate24)
          break
        case "7d":
          const filterDate7 = new Date()
          filterDate7.setDate(now.getDate() - 7)
          filtered = filtered.filter((grievance) => new Date(grievance.submitted_at) >= filterDate7)
          break
        case "30d":
          const filterDate30 = new Date()
          filterDate30.setDate(now.getDate() - 30)
          filtered = filtered.filter((grievance) => new Date(grievance.submitted_at) >= filterDate30)
          break
        default:
          break
      }
    }

    setFilteredGrievances(filtered)
  }, [searchTerm, filters, grievances])

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-900 text-yellow-300 border-yellow-700"
      case "In Progress":
        return "bg-blue-900 text-blue-300 border-blue-700"
      case "Resolved":
        return "bg-green-900 text-green-300 border-green-700"
      default:
        return "bg-gray-900 text-gray-300 border-gray-700"
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "bg-red-900 text-red-300 border-red-700"
      case "Medium":
        return "bg-yellow-900 text-yellow-300 border-yellow-700"
      case "Low":
        return "bg-green-900 text-green-300 border-green-700"
      default:
        return "bg-gray-900 text-gray-300 border-gray-700"
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const analytics = {
    total: grievances.length,
    pending: grievances.filter((g) => g.status === "Pending").length,
    inProgress: grievances.filter((g) => g.status === "In Progress").length,
    resolved: grievances.filter((g) => g.status === "Resolved").length,
    avgResolutionTime: "2.5 days",
  }

  if (loading || isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-white">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <MessageSquare className="h-8 w-8 text-blue-400 mr-3" />
              <h1 className="text-xl font-bold">Admin Dashboard</h1>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <div className="flex items-center">
              <BarChart3 className="h-8 w-8 text-blue-400" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-400">Total Grievances</p>
                <p className="text-2xl font-bold text-white">{analytics.total}</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-yellow-400" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-400">Pending</p>
                <p className="text-2xl font-bold text-white">{analytics.pending}</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <div className="flex items-center">
              <AlertCircle className="h-8 w-8 text-blue-400" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-400">In Progress</p>
                <p className="text-2xl font-bold text-white">{analytics.inProgress}</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <div className="flex items-center">
              <CheckCircle className="h-8 w-8 text-green-400" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-400">Resolved</p>
                <p className="text-2xl font-bold text-white">{analytics.resolved}</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-purple-400" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-400">Avg Resolution</p>
                <p className="text-2xl font-bold text-white">{analytics.avgResolutionTime}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by ID, name, email, or complaint..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-700 border border-gray-600 rounded-md hover:bg-gray-600 transition-colors"
            >
              <Filter className="h-5 w-5" />
              <span>Filters</span>
            </button>

            {/* Export */}
            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md transition-colors">
              <Download className="h-5 w-5" />
              <span>Export</span>
            </button>
          </div>

          {/* Filter Options */}
          {showFilters && (
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <select
                value={filters.status}
                onChange={(e) => setFilters((prev) => ({ ...prev, status: e.target.value }))}
                className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Statuses</option>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
              </select>

              <select
                value={filters.department}
                onChange={(e) => setFilters((prev) => ({ ...prev, department: e.target.value }))}
                className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Departments</option>
                <option value="Customer Support">Customer Support</option>
                <option value="Technical Support">Technical Support</option>
                <option value="Quality Assurance (QA)">Quality Assurance</option>
                <option value="Returns, Refunds, and Warranty">Returns & Warranty</option>
                <option value="Shipping and Logistics">Shipping & Logistics</option>
              </select>

              <select
                value={filters.dateRange}
                onChange={(e) => setFilters((prev) => ({ ...prev, dateRange: e.target.value }))}
                className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Time</option>
                <option value="24h">Last 24 Hours</option>
                <option value="7d">Last 7 Days</option>
                <option value="30d">Last 30 Days</option>
              </select>

              <select
                value={filters.priority}
                onChange={(e) => setFilters((prev) => ({ ...prev, priority: e.target.value }))}
                className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Priorities</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
          )}
        </div>

        {/* Grievances Table */}
        <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Complainant
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Department
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Priority
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-800 divide-y divide-gray-700">
                {filteredGrievances.map((grievance) => (
                  <tr key={grievance.id} className="hover:bg-gray-700 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">#{grievance.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-white">{grievance.name}</div>
                        <div className="text-sm text-gray-400">{grievance.email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{grievance.department}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(grievance.status)}`}
                      >
                        {grievance.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getPriorityColor(grievance.priority)}`}
                      >
                        {grievance.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {formatDate(grievance.submitted_at)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setSelectedGrievance(grievance)}
                          className="text-blue-400 hover:text-blue-300 transition-colors"
                          title="View Details"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <select
                          value={grievance.status}
                          onChange={(e) => updateGrievanceStatus(grievance.id, e.target.value)}
                          className="text-xs bg-gray-700 border border-gray-600 rounded px-2 py-1 text-white"
                          title="Update Status"
                        >
                          <option value="Pending">Pending</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Resolved">Resolved</option>
                        </select>
                        <button
                          onClick={() => deleteGrievanceHandler(grievance.id)}
                          className="text-red-400 hover:text-red-300 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredGrievances.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400">No grievances found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>

      {/* Grievance Detail Modal */}
      {selectedGrievance && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-gray-700">
              <h2 className="text-xl font-bold text-white">Grievance #{selectedGrievance.id}</h2>
              <button
                onClick={() => setSelectedGrievance(null)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Name</label>
                  <p className="text-white">{selectedGrievance.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                  <p className="text-white">{selectedGrievance.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Department</label>
                  <p className="text-white">{selectedGrievance.department}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Status</label>
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(selectedGrievance.status)}`}
                  >
                    {selectedGrievance.status}
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Priority</label>
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getPriorityColor(selectedGrievance.priority)}`}
                  >
                    {selectedGrievance.priority}
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Submitted</label>
                  <p className="text-white">{formatDate(selectedGrievance.submitted_at)}</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Complaint Details</label>
                <div className="bg-gray-700 p-4 rounded-md">
                  <pre className="text-white whitespace-pre-wrap font-sans text-sm leading-relaxed">
                    {selectedGrievance.complaint}
                  </pre>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  onClick={() => setSelectedGrievance(null)}
                  className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
                >
                  Close
                </button>
                <select
                  value={selectedGrievance.status}
                  onChange={(e) => {
                    updateGrievanceStatus(selectedGrievance.id, e.target.value)
                    setSelectedGrievance({ ...selectedGrievance, status: e.target.value })
                  }}
                  className="bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminDashboard
