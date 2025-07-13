import { NavLink, useNavigate} from "react-router-dom";
import shoppingbag from '../../assets/shopping-bag.png';
// import userlogo from '../../assets/user.png';
import { useState,useContext, useEffect } from "react";
import {motion} from 'framer-motion';

import { CartContext } from "../../context/CardContext";
import trashIcon from "../../assets/trash.png";


export default function Header() {
    const activePageStyle = ({ isActive }: { isActive: boolean }) => {
        return isActive ? 'header-link' : 'nonactive-link'
    };


    const catalogNavigate = useNavigate();
    // const userNavigate = useNavigate();


    const [isShopigBagActive, setShopingBagActive] = useState<boolean>(false);

    useEffect(() => {
        if (isShopigBagActive) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isShopigBagActive]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setShopingBagActive(false);
            }
        };
    
        if (isShopigBagActive) {
            window.addEventListener("keydown", handleKeyDown);
        }
    
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [isShopigBagActive]);
    

    const {
        //@ts-ignore
        cartItems,
        //@ts-ignore
        removeFromCart,
        //@ts-ignore
        total,
        //@ts-ignore
        clearCart
    } = useContext(CartContext);

    return (
        <>
        <header className="flex items-center justify-between w-full bg-stone-950 h-[75px]">
            <div className="ml-7 w-[250px] gap-3 flex justify-center items-center">
                <NavLink className={activePageStyle} to="/">Home</NavLink>
                <NavLink className={activePageStyle} to="/catalog">Catalog</NavLink>
                <NavLink className={activePageStyle} to="/contact">Contact</NavLink>
            </div>
            <h1 className="text-white text-left text-2xl">Sample E-commerce</h1>
            <div className="flex gap-4 justify-end mr-7 w-[250px]">
            {/* justify-center items-center */}
                <button 
                onClick={() => setShopingBagActive(!isShopigBagActive)}
                className="header-button">
                <img className="header-b-img" src={shoppingbag} alt="shoppingbag" />
                </button>
                {/* <button
                onClick={() => userNavigate('userpage')}
                className="header-button">
                <img className="header-b-img" src={userlogo} alt="userlogo" />
                </button> */}
            </div>
        </header>
        <motion.div
        transition={{ duration: 0.2 }}
        animate={{ right: isShopigBagActive ? "0px" : "-300px" }}
        id="sidebar"
        className="bg-stone-950 flex flex-col justify-start pt-6 pb-32 items-center h-5/6 mt-7 rounded-l-lg w-[300px] fixed z-10 text-white overflow-y-auto"
        >
        {cartItems.length === 0 ? (
            <p className="w-full flex items-center flex-col text-center px-4">
            <span className="text-xl">Your cart is empty</span>
            <br />
            <span
                onClick={() => {
                setShopingBagActive(false);
                catalogNavigate("/catalog");
                }}
                className="cursor-pointer look-for-items"
            >
                Fill it from the catalog
            </span>
            </p>
        ) : (
            <>
            <h3 className="text-xl font-semibold mb-4">Your Cart</h3>
            {cartItems.map((item: any, idx: any) => (
                <div
                key={`${item.name}-${item.size}-${idx}`}
                className="w-[90%] flex flex-col mb-4 border-b pb-2"
                >
                <div className="flex justify-between items-center">
                <p>{item.name}</p>
                <img
                    src={trashIcon}
                    alt="remove"
                    className="w-4 h-4 cursor-pointer"
                    onClick={() => removeFromCart(item.name, item.size)}
                />
                </div>
                <p className="text-sm">Size: {item.size}</p>
                <p className="text-sm">
                    {item.price} {item.currency}
                </p>
                </div>
            ))}
            <div className="w-[90%] border-t pt-4 mt-4">
                <p className="text-lg">Total: {total.toFixed(2)} USD</p>
                <div className="w-full flex justify-around gap-1">
                <motion.button
                whileHover={{
                    scale: 1.05
                }}
                whileTap={{
                    scale: 0.95
                }}
                onClick={clearCart}
                className="mt-2 bg-gray-500 text-white px-4 py-2 rounded"
            >
                Clear Cart
            </motion.button>
            <motion.button
                whileHover={{
                    scale: 1.05
                }}
                whileTap={{
                    scale: 0.95
                }}
                onClick={() => {
                    alert("Order placed!");
                    clearCart();
                    setShopingBagActive(false);
                }}
                className="mt-2 bg-gray-500 text-white px-4 py-2 rounded"
                >
                Checkout
                </motion.button>
                </div>
            </div>
        </>
        )}
        </motion.div>
        {isShopigBagActive && (
        <div
            onClick={() => setShopingBagActive(false)}
            className="fixed inset-0 bg-opacity-0 z-5"
        />
        )}
    </>
);
}

