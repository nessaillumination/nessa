import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom';
import { ProductProvider } from './context/ProductContext.jsx';

createRoot(document.getElementById('root')).render(
  <ProductProvider>

    <BrowserRouter>
      <App />
    </BrowserRouter>

  </ProductProvider>


)
