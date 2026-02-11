# CortexCart Frontend

A modern, premium e-commerce frontend built with React, TypeScript, Zustand, and Tailwind CSS.

## 🚀 Tech Stack

- **React 18** - Modern UI library with hooks
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tool and dev server
- **Zustand** - Lightweight state management
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API calls
- **Lucide React** - Beautiful icon library
- **React Router DOM** - Client-side routing

## 📁 Project Structure

```
Frontend/
├── src/
│   ├── components/        # Reusable UI components
│   ├── pages/            # Page components
│   ├── store/            # Zustand stores
│   │   ├── authStore.ts  # Authentication state
│   │   └── cartStore.ts  # Shopping cart state
│   ├── services/         # API services
│   │   ├── api.ts        # Axios instance with interceptors
│   │   └── auth.service.ts
│   ├── types/            # TypeScript interfaces
│   ├── utils/            # Utility functions
│   ├── hooks/            # Custom React hooks
│   ├── App.tsx           # Main app component
│   ├── main.tsx          # Entry point
│   └── index.css         # Global styles with Tailwind
├── public/               # Static assets
├── .env                  # Environment variables
├── .env.example          # Environment template
├── tailwind.config.js    # Tailwind configuration
├── postcss.config.js     # PostCSS configuration
├── tsconfig.json         # TypeScript configuration
├── vite.config.ts        # Vite configuration
└── package.json          # Dependencies
```

## 🎨 Design System

### Colors
- **Primary**: Blue gradient (`#0ea5e9` to `#0284c7`)
- **Secondary**: Purple gradient (`#d946ef` to `#c026d3`)
- **Background**: Dark slate with gradients
- **Text**: Slate shades for hierarchy

### Components
- **Buttons**: `.btn-primary`, `.btn-secondary` with hover effects
- **Cards**: `.card` with glassmorphism effect
- **Inputs**: `.input-field` with focus states
- **Glass Effect**: `.glass-effect` for modern UI

### Animations
- `animate-fade-in` - Smooth fade in
- `animate-slide-up` - Slide from bottom
- `animate-slide-down` - Slide from top
- `animate-scale-in` - Scale and fade in
- `animate-float` - Floating animation

## 🔧 Setup & Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Configure environment**:
   ```bash
   cp .env.example .env
   ```
   Update `VITE_API_URL` with your backend URL.

3. **Run development server**:
   ```bash
   npm run dev
   ```
   App will be available at `http://localhost:5173`

4. **Build for production**:
   ```bash
   npm run build
   ```

5. **Preview production build**:
   ```bash
   npm run preview
   ```

## 📦 State Management with Zustand

### Auth Store (`authStore.ts`)
Manages user authentication state with persistence:

```typescript
const { user, token, login, register, logout } = useAuthStore();

// Login
await login({ email, password });

// Register
await register({ email, password, name });

// Logout
logout();
```

### Cart Store (`cartStore.ts`)
Manages shopping cart with local storage persistence:

```typescript
const { items, addItem, removeItem, updateQuantity, getTotalPrice } = useCartStore();

// Add item to cart
addItem(product, quantity);

// Update quantity
updateQuantity(productId, newQuantity);

// Remove item
removeItem(productId);

// Get totals
const total = getTotalPrice();
const itemCount = getTotalItems();
```

## 🌐 API Integration

### Configuration
API client is configured in `src/services/api.ts` with:
- Automatic token injection
- Response/request interceptors
- Error handling
- 401 redirect to login

### Usage Example
```typescript
import api from './services/api';

// GET request
const products = await api.get('/products');

// POST request
const newProduct = await api.post('/products', data);

// PUT request
const updated = await api.put(`/products/${id}`, data);

// DELETE request
await api.delete(`/products/${id}`);
```

## 🎯 Features

- ✅ **Authentication** - Login, register, profile management
- ✅ **Shopping Cart** - Add, remove, update quantities
- ✅ **Persistent State** - Cart and auth persist across sessions
- ✅ **Type Safety** - Full TypeScript coverage
- ✅ **Modern UI** - Glassmorphism, gradients, animations
- ✅ **Responsive** - Mobile-first design
- ✅ **Dark Theme** - Premium dark mode by default
- ✅ **Error Handling** - Comprehensive error management

## 🔐 Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:8000
```

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎨 Customization

### Tailwind Theme
Edit `tailwind.config.js` to customize:
- Colors
- Fonts
- Spacing
- Animations
- Breakpoints

### Global Styles
Edit `src/index.css` for:
- Custom CSS classes
- Component styles
- Utility classes

## 🚀 Next Steps

1. **Add React Router** for multi-page navigation
2. **Create page components** (Home, Products, Cart, Checkout, Profile)
3. **Build UI components** (Navbar, ProductCard, CartItem, etc.)
4. **Implement product services** for CRUD operations
5. **Add order management** functionality
6. **Create admin dashboard** for product/user management
7. **Add image upload** for products and user profiles
8. **Implement search & filters** for products
9. **Add payment integration** (Stripe, PayPal, etc.)
10. **Set up testing** with Vitest and React Testing Library

## 📚 Resources

- [React Documentation](https://react.dev)
- [Zustand Documentation](https://docs.pmnd.rs/zustand)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [Vite Documentation](https://vitejs.dev)
- [TypeScript Documentation](https://www.typescriptlang.org)

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## 📄 License

MIT License - feel free to use this project for learning and development!

---

**Built with ❤️ using modern web technologies**
