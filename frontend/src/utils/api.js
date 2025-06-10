const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const api = {
  // Get all grievances
  getGrievances: async (department = null) => {
    const url = department
      ? `${API_BASE_URL}/grievances?department=${encodeURIComponent(department)}`
      : `${API_BASE_URL}/grievances`

    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return response.json()
  },

  // Get grievance by ID
  getGrievanceById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/grievance/${id}`)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return response.json()
  },

  // Submit new grievance
  submitGrievance: async (grievanceData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/grievance/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(grievanceData),
      })

      // Check if response is ok (status 200-299)
      if (!response.ok) {
        const errorText = await response.text()
        console.error("Response not ok:", response.status, errorText)
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      // Try to parse JSON response
      const result = await response.json()
      console.log("Submit response:", result)
      return result
    } catch (error) {
      console.error("Submit error:", error)
      throw error
    }
  },

  // Update grievance
  updateGrievance: async (id, updateData) => {
    const response = await fetch(`${API_BASE_URL}/grievance/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateData),
    })
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return response.json()
  },

  // Delete grievance
  deleteGrievance: async (id) => {
    const response = await fetch(`${API_BASE_URL}/grievance/${id}`, {
      method: "DELETE",
    })
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return response.status === 204
  },
}
