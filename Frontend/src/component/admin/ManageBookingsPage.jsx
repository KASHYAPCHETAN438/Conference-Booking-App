import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiService from '../../service/ApiService';
import Pagination from '../common/Pagination';

const ManageBookingsPage = () => {
    const [groupedBookings, setGroupedBookings] = useState({});
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(3);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    // ✅ Fetch admin user info from localStorage
    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            try {
                const parsedUser = JSON.parse(userData);
                setUser(parsedUser);
            } catch (e) {
                console.error("Invalid user data in localStorage");
            }
        }
    }, []);

    // ✅ Fetch all bookings
    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await ApiService.getAllBookings();
                const allBookings = response.bookingList || [];
                groupBookingsByUser(allBookings);
            } catch (error) {
                console.error('Error fetching bookings:', error.message);
            }
        };

        fetchBookings();
    }, []);

    // ✅ Group bookings by user name or email
    const groupBookingsByUser = (bookings) => {
        const grouped = bookings.reduce((acc, booking) => {
            const userName = booking.user?.name || booking.userEmail || 'Unknown';
            if (!acc[userName]) acc[userName] = [];
            acc[userName].push(booking);
            return acc;
        }, {});
        setGroupedBookings(grouped);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value.toLowerCase());
        setCurrentPage(1);
    };

    // ✅ Filter by Booking Confirmation Code only
    const filteredGroupedBookings = Object.entries(groupedBookings).reduce((result, [userName, bookings]) => {
        const filtered = bookings.filter(b =>
            b.bookingConfirmationCode?.toLowerCase().includes(searchTerm)
        );
        if (filtered.length > 0) {
            result[userName] = filtered;
        }
        return result;
    }, {});

    const userNames = Object.keys(filteredGroupedBookings);
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUserNames = userNames.slice(indexOfFirstUser, indexOfLastUser);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className='bookings-container' style={{ padding: '20px' }}>
            {user && <h2>Welcome, {user.name}</h2>}

            <h3>All Bookings </h3>

            <div className='search-div' style={{ marginBottom: '20px' }}>
                <label htmlFor="searchInput"><strong>Search by Booking Code:</strong></label>
                <input
                    id="searchInput"
                    type="text"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    placeholder="Enter booking code"
                    style={{
                        marginLeft: '10px',
                        padding: '8px',
                        borderRadius: '5px',
                        border: '1px solid #ccc'
                    }}
                />
            </div>

            {currentUserNames.map((userName) => (
                <div
                    key={userName}
                    style={{
                        marginBottom: '30px',
                        padding: '20px',
                        border: '1px solid #ccc',
                        borderRadius: '10px',
                        backgroundColor: '#f0f8ff'
                    }}
                >
                    <h4>User : {userName}</h4><br />
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
                        {filteredGroupedBookings[userName].map((booking) => (
                            <div
                                key={booking.id}
                                style={{
                                    backgroundColor: '#fff',
                                    padding: '15px',
                                    borderRadius: '8px',
                                    boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
                                }}
                            >
                                <p><strong>Booking Code:</strong> {booking.bookingConfirmationCode || 'N/A'}</p>
                                <p><strong>Date:</strong> {booking.checkInDate || 'N/A'}</p>
                                <p><strong>Time Slots:</strong><br />
                                    {(booking.timeSlots && booking.timeSlots.length > 0)
                                        ? booking.timeSlots.map((slot, index) =>
                                            <span key={index}>
                                                {slot.startTime} - {slot.endTime}<br />
                                            </span>
                                        )
                                        : 'No slots'}
                                </p>
                                <button
                                    className="edit-room-button"
                                    onClick={() => navigate(`/admin/edit-booking/${booking.bookingConfirmationCode}`)}
                                    style={{
                                        marginTop: '10px',
                                        padding: '8px 16px',
                                        backgroundColor: '#2980b9',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '5px',
                                        cursor: 'pointer'
                                    }}
                                >
                                    View
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            ))}

            <Pagination
                roomsPerPage={usersPerPage}
                totalRooms={userNames.length}
                currentPage={currentPage}
                paginate={paginate}
            />
        </div>
    );
};

export default ManageBookingsPage;
