import API from ".";

export const getStudents = async () => {
  try {
    const res = await API.get("/api/Students", {});
    return res.data;
  } catch (error) {
    console.error("Fetch data failed", error);
    throw error;
  }
};

export const getSingleStudent = async (id) => {
  try {
    const res = await API.get(`/api/Students/${id}`);
    return res.data;
  } catch (error) {
    window.alert(`Error fetching student with ID ${id}: ${error.message}`);
    throw error;
  }
};

export const addStudent = async (payload) => {
  try {
    const res = await API.post(`/api/Students`, payload);
    window.alert("User added successfully");
    return res.data;
  } catch (error) {
    window.alert(`Error creating student: ${error.message}`);
    throw error;
  }
};

export const updateStudent = async (id, payload) => {
  if (window.confirm("Are you sure you want to add this user?")) {
    try {
      const res = await API.put(`/api/Students/${id}`, payload);
      return res.data;
    } catch (error) {
      console.error("Failed to add user", error);
      window.alert(`Error updating student with ID ${id}: ${error.message}`);
      throw error;
    }
  }
};

export const deleteStudent = async (id) => {
  try {
    const res = await API.delete(`/api/Students/${id}`);
    window.alert(`Student with ID ${id} deleted successfully`);
    return res.data;
  } catch (error) {
    window.alert(`Error deleting student with ID ${id}: ${error.message}`);
    throw error;
  }
};
