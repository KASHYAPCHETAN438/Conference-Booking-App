import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import ApiService from '../../service/ApiService';

// Convert HH:mm:ss to 12-hour format with AM/PM for display only
const formatTimeTo12Hour = (time) => {
  const [hour, minute] = time.split(':');
  const h = parseInt(hour, 10);
  const m = minute.padStart(2, '0');
  const suffix = h >= 12 ? 'PM' : 'AM';
  const adjustedHour = h % 12 === 0 ? 12 : h % 12;
  return `${adjustedHour.toString().padStart(2, '0')}:${m} ${suffix}`;
};

const areSlotsContinuous = (a, b) => a.endTime === b.startTime;

const BookingCalendar = ({ refresh }) => {
  const [events, setEvents] = useState([]);

  const fetchBookings = async () => {
    try {
      const response = await ApiService.getAllBookings();
      const bookings = response.bookingList;

      const calendarEvents = [];

      bookings.forEach((booking) => {
        const date = booking.checkInDate;
        const bookingCode = booking.bookingConfirmationCode;
        const userName = booking.user?.name || 'Unknown User';
        const userEmail = booking.user?.email || 'Unknown Email';
        const roomType = booking.room?.roomType || 'Room';
        const phone = booking.user?.phoneNumber || 'Unknown Phone'; 
        const timeSlots = Array.isArray(booking.timeSlots) ? booking.timeSlots : [];

        const sortedSlots = [...timeSlots].sort((a, b) =>
          a.startTime.localeCompare(b.startTime)
        );

        let merged = [];
        let current = null;

        for (let i = 0; i < sortedSlots.length; i++) {
          const slot = sortedSlots[i];
          if (!current) {
            current = { ...slot };
          } else if (areSlotsContinuous(current, slot)) {
            current.endTime = slot.endTime;
          } else {
            merged.push(current);
            current = { ...slot };
          }
        }

        if (current) merged.push(current);

        merged.forEach((slot) => {
          const isPast = new Date(date).setHours(0, 0, 0, 0) <
            new Date().setHours(0, 0, 0, 0);

          const startFormatted = formatTimeTo12Hour(slot.startTime);
          const endFormatted = formatTimeTo12Hour(slot.endTime);

          calendarEvents.push({
            title: `${startFormatted} - ${endFormatted}`,
            date: date,
            allDay: true,
            color: isPast ? '#ff4d4d' : '#0ee920ff',
            extendedProps: {
              confirmationCode: bookingCode,
              userName: userName,
              roomType: roomType,
              userEmail: userEmail,
              userPhone: phone 
            }
          });
        });
      });

      setEvents(calendarEvents);
    } catch (error) {
      console.error("❌ Failed to fetch bookings:", error);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [refresh]);

  return (
    <div className="booking-calendar-container">
      <h2>Booking Calendar</h2>
      <br />
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events}
        height="auto"
        eventContent={(arg) => {
          const { roomType } = arg.event.extendedProps;
          return (
            <div className="fc-event-title">
              {arg.event.title}
              <br />
              {roomType}
            </div>
          );
        }}
        eventDidMount={(info) => {
  const { userEmail, userPhone } = info.event.extendedProps;
  
  let tooltip = `
Name: ${info.event.extendedProps.userName}
Room: ${info.event.extendedProps.roomType}
Email: ${userEmail || 'N/A'}
Phone: ${userPhone || 'N/A'}`;
  
  info.el.setAttribute('title', tooltip);

  info.el.onclick = (e) => {
    alert(`Booking Details:\n\n${info.event.title}\n${tooltip}`);
    e.preventDefault();
  };
}}

      />
    </div>
  );
};

export default BookingCalendar;
