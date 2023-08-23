import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import the Link component
import adminData from '../components/adminData.json';

const AdminPage = () => {
    const initialDataList = adminData.dataList;

    const [dataList, setDataList] = useState(initialDataList);
    const [editingItem, setEditingItem] = useState(null);

    const handleEdit = (id) => {
        const itemToEdit = dataList.find(item => item.id === id);
        setEditingItem(itemToEdit);
    };

    const handleSaveEdit = (editedItem) => {
        const updatedData = dataList.map(item =>
            item.id === editedItem.id ? editedItem : item
        );
        setDataList(updatedData);
        setEditingItem(null);
    };

    const handleDelete = (id) => {
        const updatedData = dataList.filter(item => item.id !== id);
        setDataList(updatedData);
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Administration Page</h1>
            <table style={{ width: '100%' }}>
                <thead>
                    <tr>
                        <th>Room ID</th>
                        <th>Name</th>
                        <th>Room Name</th>
                        <th>Number of Guests</th>
                        <th>Check-In</th>
                        <th>Check-Out</th>
                        <th>Total Amount</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {dataList.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.roomName}</td>
                            <td>{item.numGuests}</td>
                            <td>{item.checkIn}</td>
                            <td>{item.checkOut}</td>
                            <td>{item.totalAmount}</td>
                            <td>
                                <button
                                    style={{ backgroundColor: '#806043', color: 'white' }}
                                    onClick={() => handleEdit(item.id)}
                                >
                                    <i className="fas fa-edit"></i>
                                </button>
                                <button
                                    style={{ backgroundColor: '#806043', color: 'white' }}
                                    onClick={() => handleDelete(item.id)}
                                >
                                    <i className="fas fa-trash"></i>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {editingItem && (
                <div>
                    {/* Render edit form or modal */}
                    <button
                        style={{ backgroundColor: '#806043', color: 'white' }}
                        onClick={() => handleSaveEdit(editingItem)}
                    >
                        <i className="fas fa-save"></i>
                    </button>
                </div>
            )}
            <Link to="/" style={{ textDecoration: 'none' }}>
                <button
                    style={{ backgroundColor: '#806043', color: 'white', marginTop: '20px' }}
                >
                    Logout
                </button>
            </Link>
        </div>
    );
};

export default AdminPage;
