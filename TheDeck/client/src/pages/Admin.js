import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const adminData = {
    dataList: [
        {
            id: 1,
            name: 'John Doe',
            roomName: 'Room A',
            numGuests: 2,
            checkIn: '2023-10-16',
            checkOut: '2023-10-20',
            totalAmount: 500,
        },
        {
            id: 2,
            name: 'Jane Smith',
            roomName: 'Room B',
            numGuests: 3,
            checkIn: '2023-10-18',
            checkOut: '2023-10-22',
            totalAmount: 700,
        },
    ],
};

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

    // Edit Form JSX
    const renderEditForm = () => {
        return (
            <tr>
                <td>{editingItem.id}</td>
                <td>
                    <input
                        type="text"
                        value={editingItem.name}
                        onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                    />
                </td>
                <td>{editingItem.roomName}</td>
                <td>{editingItem.numGuests}</td>
                <td>{editingItem.checkIn}</td>
                <td>{editingItem.checkOut}</td>
                <td>{editingItem.totalAmount}</td>
                <td>
                    <button
                        style={{ backgroundColor: '#806043', color: 'white' }}
                        onClick={() => handleSaveEdit(editingItem)}
                    >
                        Save
                    </button>
                </td>
            </tr>
        );
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
                        item.id === editingItem?.id ? (
                            renderEditForm()
                        ) : (
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
                                        Edit
                                    </button>
                                    <button
                                        style={{ backgroundColor: '#806043', color: 'white' }}
                                        onClick={() => handleDelete(item.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        )
                    ))}
                </tbody>
            </table>
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
