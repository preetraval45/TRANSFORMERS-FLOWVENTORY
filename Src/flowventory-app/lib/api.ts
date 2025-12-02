const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost/api';

export const api = {
  // Users
  getUsers: async () => {
    const response = await fetch(`${API_BASE_URL}/users/`);
    return response.json();
  },

  createUser: async (userData: Record<string, unknown>) => {
    const response = await fetch(`${API_BASE_URL}/users/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error('Failed to create user');
    }

    return response.json();
  },

  getUser: async (id: number) => {
    const response = await fetch(`${API_BASE_URL}/users/${id}`);
    return response.json();
  },

  updateUser: async (id: number, userData: Record<string, unknown>) => {
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    return response.json();
  },

  deleteUser: async (id: number) => {
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: 'DELETE',
    });
    return response.json();
  },

  // Orders
  getOrders: async () => {
    const response = await fetch(`${API_BASE_URL}/orders`);
    return response.json();
  },

  createOrder: async (orderData: Record<string, unknown>) => {
    const response = await fetch(`${API_BASE_URL}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData),
    });
    return response.json();
  },

  // Shipments
  getShipments: async () => {
    const response = await fetch(`${API_BASE_URL}/shipments/`);
    return response.json();
  },

  createShipment: async (shipmentData: Record<string, unknown>) => {
    const response = await fetch(`${API_BASE_URL}/shipments/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(shipmentData),
    });
    return response.json();
  },

  getShipment: async (id: number) => {
    const response = await fetch(`${API_BASE_URL}/shipments/${id}`);
    if (!response.ok) throw new Error(`Failed to fetch shipment ${id}`);
    return response.json();
  },

  updateShipment: async (id: number, shipmentData: Record<string, unknown>) => {
    const response = await fetch(`${API_BASE_URL}/shipments/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(shipmentData),
    });
    if (!response.ok) throw new Error(`Failed to update shipment ${id}`);
    return response.json();
  },

  deleteShipment: async (id: number) => {
    const response = await fetch(`${API_BASE_URL}/shipments/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error(`Failed to delete shipment ${id}`);
    return response.json();
  },

  // Inventory
  getInventory: async () => {
    const response = await fetch(`${API_BASE_URL}/inventory`);
    return response.json();
  },

  addInventoryItem: async (itemData: Record<string, unknown>) => {
    const response = await fetch(`${API_BASE_URL}/inventory`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(itemData),
    });
    return response.json();
  },

  updateInventoryItem: async (id: number, itemData: Record<string, unknown>) => {
    const response = await fetch(`${API_BASE_URL}/inventory/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(itemData),
    });
    return response.json();
  },

  deleteInventoryItem: async (id: number) => {
    const response = await fetch(`${API_BASE_URL}/inventory/${id}`, {
      method: 'DELETE',
    });
    return response.json();
  },

  // Packing Slips
  getPackingSlips: async () => {
    const response = await fetch(`${API_BASE_URL}/packing_slips/`);
    return response.json();
  },

  uploadPackingSlip: async (slipData: Record<string, unknown>) => {
    const response = await fetch(`${API_BASE_URL}/packing_slips/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(slipData),
    });
    return response.json();
  },

  // Fetch a single packing slip by id
  getPackingSlip: async (id: number) => {
    const response = await fetch(`${API_BASE_URL}/packing_slips/${id}`);
    if (!response.ok) throw new Error(`Failed to fetch packing slip ${id}`);
    return response.json();
  },

  // Update an existing packing slip
  updatePackingSlip: async (id: number, slipData: Record<string, unknown>) => {
    const response = await fetch(`${API_BASE_URL}/packing_slips/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(slipData),
    });
    if (!response.ok) throw new Error(`Failed to update packing slip ${id}`);
    return response.json();
  },

  // Delete a packing slip
  deletePackingSlip: async (id: number) => {
    const response = await fetch(`${API_BASE_URL}/packing_slips/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error(`Failed to delete packing slip ${id}`);
    return response.json();
  },
};

export default api;
