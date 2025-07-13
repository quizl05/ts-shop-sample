import { Link } from "react-router-dom"

export default function Footer() {
    return (
        <footer className="flex flex-col px-11 justify-between w-full bg-stone-950 h-fit">
            <div className="text-gray-300 flex gap-8 mt-2 optional-font">
                <Link to={'/privacy'}>Privacy policy</Link>
                <Link to={'/terms'}>Terms of service</Link>
                <Link to={'/contact'}>Contact Information</Link>
            </div>
                <p className="text-white text-xl text-center mt-10">This project is created for demonstration and educational purposes only. It is not intended for use in entrepreneurial activities related to trade, commerce or exchange of goods and services.<br/>
                    All images, logos and brand references presented are used for demonstration purposes only. The rights belong to their rightful owners.
                </p>
        </footer>
    )
}