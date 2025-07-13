import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import addtocart from '../../assets/add-to-cart.png';
import { motion } from 'framer-motion';
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

import { CartContext } from "../../context/CardContext";

type Item = {
    name: string;
    mainimage: string;
    price: number;
    currency: string;
    instock: boolean;
    images: {
        pic1: string;
        pic2: string;
        pic3: string;
    };
};

export default function ItemPreview() {
const { name } = useParams();
const [item, setItem] = useState<Item | null>(null);
const [loading, setLoading] = useState(true);
const [size, setSize] = useState<number | null>(null);
const { addToCart } = useContext(CartContext);

const [sliderRef, instanceRef] = useKeenSlider({
loop: true,
mode: "snap",
slides: {
    perView: 1,
},
});

useEffect(() => {
async function fetchItem() {
    try {
    const res = await fetch("/products.json");
    const data: Item[] = await res.json();
    const urlName = decodeURIComponent(name || '');
    const foundItem = data.find(i =>
        i.name.toLowerCase().replace(/\s+/g, '-') === urlName.toLowerCase()
    );
    setItem(foundItem || null);
    } catch (err) {
    console.error( err);
    setItem(null);
    } finally {
    setLoading(false);
    }
}
fetchItem();
}, [name]);

useEffect(() => {
if (item?.name) {
    document.title = `${item.name}`;
}
}, [item]);

if (loading) return <p className="text-center">Loading...</p>;
if (!item) return <p className="text-center">Item not found</p>;

const images = [item.images.pic1, item.images.pic2, item.images.pic3];

return (
<div className="my-20 flex justify-between items-center mx-6">
    <div className="w-3/5">
    <div ref={sliderRef} className="keen-slider rounded-lg overflow-hidden h-[500px]">
        {images.map((src, index) => (
        <div key={index} className="keen-slider__slide flex justify-center items-center">
            <img
            src={src}
            alt={`Slide ${index + 1}`}
            className="object-cover w-full h-[500px]"
            />
        </div>
        ))}
    </div>

    <div className="flex justify-center mt-4 gap-4">
        <button
        className="px-4 py-2 bg-white rounded border"
        onClick={() => instanceRef.current?.prev()}
        >
        Prev
        </button>
        <button
        className="px-4 py-2 bg-white rounded border"
        onClick={() => instanceRef.current?.next()}
        >
        Next
        </button>
    </div>
    </div>

    <div className="w-1/3 ml-6">
    <h2 className="text-white text-2xl">{item.name}</h2>
    <p className="text-white text-2xl">Price: {item.price} {item.currency}</p>

    <p className="text-white text-2xl font-thin mt-8 mb-4">Size:</p>
    <div className="grid grid-cols-4 gap-2 w-[400px] optional-font">
        {[38, 39, 40, 41, 42, 43].map(s => (
        <motion.div
            key={s}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
                setSize(s)
            }}
            className={`sizeselect-button ${size === s ? 'bg-purple-400' : ''}`}
        >
            {s}
        </motion.div>
        ))}
    </div>

    <div className="my-6">
        {item.instock ? (
        <motion.button
        onClick={() => {
        if (size === null) {
            alert("Please select a size");
            return;
        }

        addToCart({
            name: item.name,
            price: item.price,
            currency: item.currency,
            size: size,
            image: item.mainimage,
        });
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-[170px] flex h-[60px] items-center justify-between px-2 text-lg text-black bg-white rounded-xl border-purple-500 border-solid border-2"
        >
        <img className="w-8 h-8" src={addtocart} alt="addtocart" />
        Add to cart
        </motion.button>
        ) : (
        <p className="text-red-500">Out of stock</p>
        )}
    </div>
    </div>
</div>
);
}
