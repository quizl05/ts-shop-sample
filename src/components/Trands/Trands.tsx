import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import airforce from '/shoes/airforcekobe/airforcekobe.webp';
import jordan from '/shoes/jordanretrogrape/jordanretrogrape.webp';
import dunklow from '/shoes/sbdunklow/SB_Dunk_Low_The_Wizard_of_Oz_Poppy_Field.png';
import addcart from '../../assets/add-to-cart.png';

interface Shoe {
    name: string;
    image: string;
    price: number;
    currency: string
}

const TrendingItem: React.FC<Shoe> = ({ name, image, price, currency }) => {
    const [hovered, setHovered] = useState(false);

    const navigate = useNavigate()

    return (
        <div 
        onClick={() =>
            navigate(
                `catalog/${encodeURIComponent(name.toLowerCase().replace(/\s+/g, '-'))}`
            )
            }
        className='relative inline-block'>
            <img className='w-96 rounded-xl' src={image} alt={name} />
            
            <motion.button
                onHoverStart={() => setHovered(true)}
                onHoverEnd={() => setHovered(false)}
                animate={{ width: hovered ? 100 : 36 }}
                transition={{ duration: 0.2 }}
                className='overflow-hidden flex items-center justify-start px-2 origin-left rounded-full bg-zinc-400 absolute bottom-2 right-2 h-9'
            >
                <img className='w-6' src={addcart} alt='add-to-cart' />
                {hovered && (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ delay: 0.2 }}
                        className='text-black ml-2 text-[0.65rem]'
                    >
                        Add item
                    </motion.p>
                )}
            </motion.button>
            <div className='text-white text-sm absolute'>{name} <span className='font-light'>{price}</span>{currency}</div>
        </div>
    );
};

const shoes: Shoe[] = [
    { name: 'Nike Air Force 1 Low Protro Kobe Bryant Mamba Mentality', image: airforce, price: 180, currency: '$'},
    { name: "Air Jordan 5 Retro OG 'Grape'", image: jordan, price: 320, currency: '$'},
    { name: 'Nike SB Dunk Low The Wizard of Oz Poppy Field', image: dunklow, price: 150, currency: '$'},
];

export default function Trands() {
    return (
        <section className='mt-6 w-full h-[400px]'>
            <h2 className='text-white ml-14 text-2xl'>Trending:</h2>
            <div className='pt-5 flex justify-around items-start gap-4'>
                {shoes.map((shoe) => (
                    <TrendingItem key={shoe.name} name={shoe.name} image={shoe.image} price={shoe.price} currency={shoe.currency}/>
                ))}
            </div>
        </section>
    );
}
