import React from 'react';

const AdminPage = () => {
    return (
        <div style={{ padding: '20px' }}>
            <h1>Administration Page</h1>
            {/* Table component */}
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
                    {/* Populate table rows with data from the backend */}
                    {/* Sample row */}
                    <tr>
                        <td>1</td>
                        <td>Mahlatse</td>
                        <td>Suite</td>
                        <td>2</td>
                        <td>2023-08-21</td>
                        <td>2023-08-25</td>
                        <td>R1000</td>
                        <td>
                            <button>Edit</button>
                            <button>Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default AdminPage;
