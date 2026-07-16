import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api from '../../services/api';

const InventoryManager = () => {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    location: '',
    size: '',
    traffic_level: '',
    status: 'Available'
  });

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      const response = await api.get('/inventory');
      if (response.data.success) {
        setInventory(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching inventory:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingItem) {
        await api.put(`/admin/inventory/${editingItem.id}`, formData);
      } else {
        await api.post('/admin/inventory', formData);
      }
      
      fetchInventory();
      resetForm();
    } catch (error) {
      console.error('Error saving inventory:', error);
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      location: item.location,
      size: item.size,
      traffic_level: item.traffic_level,
      status: item.status
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this item?')) {
      try {
        await api.delete(`/admin/inventory/${id}`);
        fetchInventory();
      } catch (error) {
        console.error('Error deleting inventory:', error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      location: '',
      size: '',
      traffic_level: '',
      status: 'Available'
    });
    setEditingItem(null);
    setShowForm(false);
  };

  if (loading) {
    return <div className="text-white">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Inventory Management</h2>
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Add New Item
        </button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="bg-gray-800 p-6 rounded-lg w-full max-w-md"
          >
            <h3 className="text-xl font-bold text-white mb-4">
              {editingItem ? 'Edit' : 'Add'} Inventory Item
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-white mb-2">Location</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  className="w-full p-2 bg-gray-700 text-white rounded"
                  required
                />
              </div>
              
              <div>
                <label className="block text-white mb-2">Size</label>
                <input
                  type="text"
                  value={formData.size}
                  onChange={(e) => setFormData({...formData, size: e.target.value})}
                  className="w-full p-2 bg-gray-700 text-white rounded"
                  placeholder="e.g., 10x12m"
                  required
                />
              </div>
              
              <div>
                <label className="block text-white mb-2">Traffic Level</label>
                <select
                  value={formData.traffic_level}
                  onChange={(e) => setFormData({...formData, traffic_level: e.target.value})}
                  className="w-full p-2 bg-gray-700 text-white rounded"
                  required
                >
                  <option value="">Select Traffic Level</option>
                  <option value="Low Traffic">Low Traffic</option>
                  <option value="Medium Traffic">Medium Traffic</option>
                  <option value="High Traffic">High Traffic</option>
                </select>
              </div>
              
              <div>
                <label className="block text-white mb-2">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                  className="w-full p-2 bg-gray-700 text-white rounded"
                  required
                >
                  <option value="Available">Available</option>
                  <option value="Booked">Booked</option>
                </select>
              </div>
              
              <div className="flex gap-2 pt-4">
                <button
                  type="submit"
                  className="flex-1 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                >
                  {editingItem ? 'Update' : 'Create'}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}

      {/* Inventory Table */}
      <div className="bg-gray-800 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-700">
            <tr>
              <th className="px-4 py-3 text-left text-white">Location</th>
              <th className="px-4 py-3 text-left text-white">Size</th>
              <th className="px-4 py-3 text-left text-white">Traffic Level</th>
              <th className="px-4 py-3 text-left text-white">Status</th>
              <th className="px-4 py-3 text-left text-white">Actions</th>
            </tr>
          </thead>
          <tbody>
            {inventory.map((item) => (
              <tr key={item.id} className="border-t border-gray-700">
                <td className="px-4 py-3 text-white">{item.location}</td>
                <td className="px-4 py-3 text-white">{item.size}</td>
                <td className="px-4 py-3 text-white">{item.traffic_level}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded text-xs ${
                    item.status === 'Available' 
                      ? 'bg-green-600 text-white' 
                      : 'bg-red-600 text-white'
                  }`}>
                    {item.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {inventory.length === 0 && (
          <div className="p-8 text-center text-gray-400">
            No inventory items found. Add your first item to get started.
          </div>
        )}
      </div>
    </div>
  );
};

export default InventoryManager;