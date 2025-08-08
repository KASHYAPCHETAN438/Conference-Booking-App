1. Project Title & Description 
    - MEETING ROOM BOOKING APP
    - A full-stack web application that allows users and admins to book conference rooms based on available time slots.
    - The system prevents double booking and sends email confirmations on successful booking, updates, and cancellations.

2. Team Details
    - Team - tech Titans
    - Members
    - Kapil Sharma (Center Manager) : Kapil.sharma@anudip.org
    - Naresh Singh Mahara (Mentor)  : Naresh.mahara@anudip.org
    - Chetan kashyap                : Chetankashyap951@gmail.com
    - Pushpa Mehta                  : mehtapushpa2k1@gmail.com
      
3.Tech Stack 

    - Backend
        Java 17
        Spring Boot
        Spring Security (JWT)
        Hibernate & JPA
        MySQL
        JavaMailSender

    - Frontend
        React.js
        Axios
        React Router
        React DatePicker
        Moment.js

4. Project Description 
        Register and Login (JWT Auth)
        View all rooms with details and images
        Book a room by selecting check-in date and time slots
        Check existing bookings for that room and date
        Get instant booking confirmation with unique code
        Receive email confirmation on booking
        Update or cancel own bookings
        🛠 Admin Features
        View all bookings
        Cancel any user’s booking
        View booked time slots for any room and date
        Manage users and roles (if extended)

    ----------------------------- 📅 Time Slot Management -----------------------------
   
    Each day is divided into 30-minute slots (e.g., 08:00–08:30, 08:30–09:00)
    Users can select a range of slots (start time to end time)
    Already booked slots are disabled
    Prevents overlapping bookings
    is_booked flag updated automatically based on presence in booking_time_slot table
   
    -----------------------------  📨 Email Notifications -----------------------------
   
    Booking Confirmation – sent when a user books a room
    Booking Update – sent after booking is updated
    Booking Cancellation – sent if admin or user cancels the booking

     -----------------------------  🔐 Authentication -----------------------------
   
    JWT-based secure login system
    Role-based access control:
    USER – book/manage own bookings
    ADMIN – manage all bookings

    ----------------------------- Setup Introduction -----------------------------
   

                        ⚙️ How to Run the Project & Set up Manually 

    --🛠 Backend (Spring Boot)--

    # Database Config
    Configure your application.properties:
   
    spring.datasource.url=jdbc:mysql://localhost:3306/conference_booking
   
    spring.datasource.username=root
   
    spring.datasource.password=yourpassword
   
    # Mail Config
   
    spring.mail.host=smtp.gmail.com
   
    spring.mail.port=587
   
    spring.mail.username=youremail@gmail.com
   
    spring.mail.password=your-app-password
   
    spring.mail.properties.mail.smtp.auth=true
   
    spring.mail.properties.mail.smtp.starttls.enable=true


    # JPA Config
   
    spring.jpa.hibernate.ddl-auto=update
   

    # AWS S3 Config
   
    aws.s3.secret.key  =Enter your secret key
         
    aws.s3.access.key  =Enter your access key
   
    aws.s3.bucket.name =Enter Bucket name
   
    aws.s3.region      =Enter region

    cd backend
    ./mvnw spring-boot:run

    --Frontend (React.js)--
    cd frontend
    npm install
    npm start

6. ------------------------- Setup Introduction  -----------------------------
   
    Follow the steps below to set up and run the Conference Room Booking App locally:
   
        Prerequisites:
   
        Node.js (v18 or above)
        npm or yarn
        Git installed
        MySQL database
   
    a. Clone the Repository
   
        in Terminal type
        git clone https://github.com/KASHYAPCHETAN438/Conference-Booking-App.git
        cd conference-room-booking-app

       
    b. Install Dependencies
   
        npm install
        # or
        yarn install

       
    c. Environment Variables
   
        application.properties add necessary variables (example below):
        Add DB config, secret keys, etc.

       
    d. Run the App
   
        To start the frontend:
        npm start
        cd backend
        npm install

       
    e. Access the Application
   
        Open your browser and visit:
        http://localhost:7070

   

8. Usage Guide 

    🏠 Home Page
   
        Displays the main dashboard with a search form.
        Users can select date, time slot to search for available rooms.
    
    🔍 Search & Booking
   
        Select:Date
        Time Slot (e.g., 09:30 AM – 07:00 PM)
        Click on Search Rooms.
        A list of available conference rooms will be displayed.
        Click Book Now on a room.
        Select rooms date, and choose time slot for the meeting.
        Click Confirm Booking.


    📅 View My Bookings
   
    Users can view their bookings from the "Bookings History inside profile page " (if available).
    Each booking will show:
        Room name
        Date
        Time slot
        
    🛠 Admin Features (if available)
   
        Login as admin to:
        Add/edit/delete rooms
        View all user bookings
        cancel booking 

   
10. API Endpoints / Architecture
    
📊 System Architecture
    Frontend (ReactJS)
        |
        ↓
    Backend API (Spring API)
        |
        ↓
    Database (MySQL)
    Frontend: React app for users to book rooms.


    Backend: RESTful API built using Spring Boot.

    ----------------- API Endpoints E.g ------------------------
    
     -------------------------------------------------------------------------- 
    | Method   | Endpoint                       | Description                  |
    | -------- | ------------------------------ | -----------------------------|
    | `POST`   | `/auth/register'               | Register a new user          |
    | `POST`   | `/auth/login'                  | Login user/admin             |
    | `GET `   | `/rooms/all'                   | Get all rooms                |
    | `GET`    | `/rooms/room-by-id/{roomId}'   | Get room details by ID       |
    | `GET`    | `/rooms/all-available-rooms'   | Get all available rooms      | 
    | `POST`   | `/rooms/add'                   | Add a new room               |
    | `PUT`    | `/rooms/update/{roomId}`       | Update room details          |
    | `DELETE  | `/rooms/delete/{roomId}`       | Delete a room by Admin       |
    | `PUT`    | `//users/update/{id}`          | Update user details          |
    | `PosT`   | `/users/send-otp`              | Send OTP for password reset  |
    

Like we use these approach 
==========================

Database: Stores rooms, users, and bookings (MySQL).

    📊 Database Tables
        user: stores users, roles
        room: stores conference room info
        time_slot: all 30-minute intervals, is_booked flag
        booking: stores booking date, confirmation code, room/user mapping
        booking_time_slot: join table between booking and time_slot


    🔮 Future Improvements
        Admin dashboard UI
        Room filtering (by type, capacity)
        Weekly view calendar for bookings
        Recurring meeting support
        Email templates 



    👨‍💻 Author
        Developed by Chetan
        Email: Chetankashayap951@gmail.com



📘 Entity Relationships

        1. User ↔ Booking
        Relation: One User can have many Bookings
        Type: @OneToMany
        Mapped by: user
        Inverse side: Booking.user


        2. Room ↔ Booking
        Relation: One Room can have many Bookings
        Type: @OneToMany
        Mapped by: room
        Inverse side: Booking.room


        3. Booking ↔ TimeSlot
        Relation: One Booking can have many TimeSlots, and one TimeSlot can be associated with multiple Bookings
        Type: @ManyToMany
        Join Table: booking_time_slot


        4. Room ↔ TimeSlot
        Relation: One Room can have many TimeSlots
        Type: @ManyToOne (each TimeSlot belongs to a Room)
        Used For: Reference purpose (not for booking conflict, which is checked through booking_time_slot)

        
     
    -------------------------------------Demo Video LINK --------------------------------
    GOOGLE DRIVE LINK ARE HERE 
    https://drive.google.com/file/d/1OIf5E-DKD-E3mSojUthwxhuEC6Ia56KD/view?usp=drive_link
