import { BrowserRouter , Route, Routes } from "react-router-dom";
import MainLayout from "./pages/MainLayout/MainLayout";

import {Home, Catalog, Contact} from './pages'
import Privacy from "./components/Privacy/Privacy";
import Terms from "./components/Terms/Terms";
import ItemPreview from "./pages/ItemPreview/ItemPreview";
// import UserPage from "./pages/UserPage/UserPage";

import { CartProvider } from './context/CardContext';



export default function App() {


    return (
        <CartProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<MainLayout />}>
                        <Route index element={
                            <Home/>
                        } />
                        <Route path="catalog" element={<Catalog />} />
                        <Route path="contact" element={<Contact />} />
                        <Route path="privacy" element={<Privacy/>} />
                        <Route path="terms" element={<Terms/>}/>
                        <Route path="catalog/:name" element={<ItemPreview/>}/>
                        {/* <Route path="userpage" element={
                                <UserPage />
                        }/> */}
                    </Route>
                </Routes>
            </BrowserRouter>
        </CartProvider>
    );
}
