import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import arrowdown from '../../assets/down-arrow.png';
import { motion } from 'framer-motion';
import addtocart from '../../assets/add-to-cart.png'

type Item = {
    name: string;
    mainimage: string;
    price: number;
    currency: string;
    instock: boolean;
    images: {
        pic1: string;
        pic2: string;
        pic3: string
    }
};

type FilterProps = {
    jsonlink: string;
};

export default function Filter({ jsonlink }: FilterProps) {
    const [isAvailabilityActive, setAvailabilityActive] = useState<boolean>(false);
    const [isSortActive, setSortActive] = useState<boolean>(false);
    const [items, setItems] = useState<Item[]>([]);
    const [filteredItems, setFilteredItems] = useState<Item[]>([]);
    const [isAlphabeticallyAsc, setAlphabeticallyAsc] = useState<boolean>(false);
    const [isAlphabeticallyDesc, setAlphabeticallyDesc] = useState<boolean>(false);
    const [isPriceAsc, setPriceAsc] = useState<boolean>(false);
    const [isPriceDesc, setPriceDesc] = useState<boolean>(false);
    const [inStockOnly, setInStockOnly] = useState<boolean>(false);
    const [outOfStockOnly, setOutOfStockOnly] = useState<boolean>(false);

    const navigate = useNavigate();

    function setFalseSort() {
        setAlphabeticallyAsc(false);
        setAlphabeticallyDesc(false);
        setPriceAsc(false);
        setPriceDesc(false)
    }



    useEffect(() => {
        async function getItems(link: string) {
            const response = await fetch(link);
            const data = await response.json();
            setItems(data);
            setFilteredItems(data);
        }

        getItems(jsonlink);
    }, [jsonlink]);

    useEffect(() => {
        let result = [...items];
        if (inStockOnly && !outOfStockOnly) {
            result = result.filter(item => item.instock);
        } else if (!inStockOnly && outOfStockOnly) {
            result = result.filter(item => !item.instock);
        }
    
        if (isAlphabeticallyAsc) {
            result.sort((a, b) => a.name.localeCompare(b.name));
        } else if (isAlphabeticallyDesc) {
            result.sort((a, b) => b.name.localeCompare(a.name));
        } else if (isPriceAsc) {
            result.sort((a, b) => a.price - b.price);
        } else if (isPriceDesc) {
            result.sort((a, b) => b.price - a.price);
        }
    
        setFilteredItems(result);
    }, [
        items,
        isAlphabeticallyAsc,
        isAlphabeticallyDesc,
        isPriceAsc,
        isPriceDesc,
        inStockOnly,
        outOfStockOnly
    ]);

    function filterList(type: string) {
        setFalseSort();
        switch(type){
            case('a-z'):
                return setAlphabeticallyAsc(true);
            case('z-a'):
                return setAlphabeticallyDesc(true);
            case('price-asc'):
                return setPriceAsc(true);
            case('price-desc'):
                return setPriceDesc(true)
            default: 
                return
        }
    }

    return (
        <>
            <div className="h-[200px] py-9 flex justify-between items-start relative">
                <div
                    onClick={() => setAvailabilityActive(!isAvailabilityActive)}
                    className="border-2 border-white flex-wrap text-center border-solid rounded-lg pl-2 py-2 cursor-pointer select-none w-[145px] h-fit flex text-lg text-white"
                >
                    Availability
                    <motion.img
                        animate={isAvailabilityActive ? { rotate: '180deg' } : { rotate: '0deg' }}
                        className="mt-1 w-[22px] h-[22px]"
                        src={arrowdown}
                        alt="arrowdownimg"
                    />
                    <div 
                    onClick={(e) => e.stopPropagation()} 
                    className={isAvailabilityActive ? 'block z-20 text-sm' : 'hidden text-sm'}
                    >
                        <div className='w-inherit flex items-center'>
                        <input 
                            type="checkbox"
                            checked={inStockOnly}
                            onChange={() => setInStockOnly(prev => !prev)}
                            className="w-4 h-4 mr-2 appearance-none border-2 border-black checked:bg-slate-800 bg-white cursor-pointer rounded-sm"
                            id="instock"
                        />
                        <label htmlFor="instock">In stock</label>
                        </div>
                        <div className='w-inherit flex items-center'>
                        <input 
                            type="checkbox"
                            checked={outOfStockOnly}
                            onChange={() => setOutOfStockOnly(prev => !prev)}
                            className="w-4 h-4 mr-2 appearance-none border-2 border-black checked:bg-slate-800 bg-white cursor-pointer rounded-sm"
                            id="outofstock"
                        />
                        <label htmlFor="outofstock">Out of stock</label>
                        </div>
                    </div>
                </div>
                <div className="flex flex-wrap gap-4 text-lg text-center text-white">
                    <p className="h-fit mr-10 pt-2">{filteredItems.length > 1 ? `${filteredItems.length} items`: `${filteredItems.length} item`}</p>
                    <div
                        onClick={() => setSortActive(!isSortActive)}
                        className="border-2 border-white flex-wrap flex-col text-center border-solid rounded-lg p-2 cursor-pointer select-none w-fit h-fit flex text-lg text-white"
                    >
                        <div className='flex w-inherit self-end'>
                            Sort
                            <motion.img
                                animate={isSortActive ? { rotate: '180deg' } : { rotate: '0deg' }}
                                className="mt-1 w-[22px] h-[22px]"
                                src={arrowdown}
                                alt="arrowdownimg"
                            />
                        </div>
                        <div 
                        onClick={(e) => e.stopPropagation()} 
                        className={isSortActive ? 'flex flex-col gap-2 z-20 text-black font-extralight text-xs' : 'hidden'}
                        >
                        <div
                        onClick={() => filterList('a-z')}
                        className={isAlphabeticallyAsc ? 'bg-white w-36 rounded-sm' : 'bg-gray-500 w-36 rounded-sm'}>
                            Alphabetically, A-Z
                        </div>
                        <div
                        onClick={() => filterList('z-a')}
                        className={isAlphabeticallyDesc ? 'bg-white w-36 rounded-sm' : 'bg-gray-500 w-36 rounded-sm'}>
                            Alphabetically, Z-A
                        </div>
                        <div
                        onClick={() => filterList('price-asc')}
                        className={isPriceAsc ? 'bg-white w-36 rounded-sm' : 'bg-gray-500 w-36 rounded-sm'}>
                            Price, low to high
                        </div>
                        <div
                        onClick={() => filterList('price-desc')}
                        className={isPriceDesc ? 'bg-white w-36 rounded-sm' : 'bg-gray-500 w-36 rounded-sm'}>
                            Price, high to low
                        </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mb-5 grid grid-cols-3 gap-4 p-4">
                {filteredItems.map((item, idx) => (
                    <div 
                    onClick={() =>
                    navigate(
                        encodeURIComponent(item.name.toLowerCase().replace(/\s+/g, '-'))
                    )
                    }
                    key={idx} 
                    className="bg-white p-4 flex flex-col justify-between rounded-xl shadow-lg">
                        <img
                            className="w-full h-[250px] object-contain"
                            src={item.mainimage}
                            alt={item.name}
                        />
                        <p className="text-black mt-2 h-[50px]">{item.name}</p>
                        <p className="text-black flex justify-between items-end font-bold">
                            <span>{item.price} {item.currency}</span><span>{item.instock ? 
                            <motion.img
                            whileHover={{
                                scale: 1.1
                            }}
                            whileTap={{
                                scale: 0.9
                            }}
                            className='w-8 rounded-full border-2 border-gray-600 p-1 border-solid' src={addtocart}/>: 'Not in stock'}</span>
                        </p>
                    </div>
                ))}
            </div>
            
        </>
    );
}
