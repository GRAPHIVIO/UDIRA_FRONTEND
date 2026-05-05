const API_URL = 'http://127.0.0.1:8000/api/accounts';

export const fetchDashboardStats = async () => {
  try {
    const response = await fetch(`${API_URL}/dashboard-stats/`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return null;
  }
};
