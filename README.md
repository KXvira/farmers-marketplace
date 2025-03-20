# A Digital Market Place (E-Comerce# Farmer Marketplace)

A digital marketplace connecting farmers directly with buyers, ensuring fair pricing and secure transactions.

## 🚀 Features
- **Direct Market Access**: Eliminates middlemen for fair pricing.
- **Secure Transactions**: Mobile money integration and escrow services.
- **Real-Time Communication**: Direct messaging between farmers and buyers.
- **Market Insights**: Provides pricing trends and demand analytics.

## 🛠 Tech Stack
- **Frontend**: React.js
- **Backend**: Node.js with Express
- **Database**: MongoDB
- **Authentication**: JWT & Cookies
- **Deployment**: Vercel (Frontend), TBD (Backend)

## 📦 Installation & Setup
1. **Clone the repository:**
   ```sh
   git clone https://github.com/KXvira/farmers-marketplace.git
   cd farmer-marketplace
   ```
2. **Install dependencies:**
   ```sh
   # Install backend dependencies
   cd backend
   npm install
   
   # Install frontend dependencies
   cd ../frontend
   npm install
   ```
3. **Run the development server:**
   ```sh
   # Start backend
   cd backend
   npm run dev

   # Start frontend
   cd ../frontend
   npm start
   ```
4. **Environment Variables:** Create a `.env` file in the backend directory with:
   ```env
   PORT=3000
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_secret_key
   ```

## 🔥 API Endpoints
### Auth
- `POST /api/v1/farmer/register` - Register a farmer
- `POST /api/v1/buyer/register` - Register a buyer
- `POST /api/v1/farmer/login` - Farmer login
- `POST /api/v1/buyer/login` - Buyer login
- `DELETE /api/v1/logout` - Logout

### Products
- `POST /api/v1/farmer/addproduct` - Add a product
- `GET /api/v1/buyer/getproducts?page=1&limit=10&search=query&category=fruit` - Get all products
- `GET /api/v1/buyer/viewdetails/:id` - View product details
- `DELETE /api/v1/farmer/deleteproduct/:id` - Delete product
- `POST /api/v1/farmer/updateproduct/:id` - Update product

### Profile
- `GET /api/v1/buyer/viewprofile/:userID` - View buyer profile
- `POST /api/v1/buyer/editprofile` - Edit buyer profile
- `GET /api/v1/farmer/viewprofile/:userID` - View farmer profile
- `POST /api/v1/farmer/editprofile` - Edit farmer profile

### Cart
- `POST /api/v1/buyer/cart` - Add to cart
- `GET /api/v1/buyer/cart/:buyerId` - View cart

## 🚀 Deployment
- **Frontend:** Deployed on Vercel
- **Backend:** TBD (e.g., AWS, Render, DigitalOcean)

## 🛠 CI/CD
- **Vercel** handles automatic deployment for frontend
- **Backend** deployment strategy to be finalized

## 📝 Contribution Guidelines
1. **Fork the repo & create a branch**
   ```sh
   git checkout -b feature-branch
   ```
2. **Make changes & commit**
   ```sh
   git commit -m "Added new feature"
   ```
3. **Push changes & create a PR**
   ```sh
   git push origin feature-branch
   ```

## 📄 License
This project is licensed under the MIT License.

---
Made with ❤️ by the team 🚀
