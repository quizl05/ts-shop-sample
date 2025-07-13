import market from '../../assets/image.jpg'
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Preview() {
    return (
    <section className='relative'>
        <img className='w-full object-fill h-[600px]' src={market} alt="nike market" />
            <motion.button
            whileHover={{
                scale: 1.05,
                boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.35)',
                transition: { duration: 0.2 },
            }}
            whileTap={{
                scale: 0.95,
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
            }}
            className='absolute bottom-16 left-16 rounded-xl w-32 h-16 text-xl border-white bg-neutral-200 opacity-80 border-2 border-solid'
            >
                <Link to={'/catalog'}>Shop now</Link>
            </motion.button>
    </section>
    )
}