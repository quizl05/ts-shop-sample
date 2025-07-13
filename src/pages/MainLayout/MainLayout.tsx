import { Outlet } from "react-router-dom"

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Feedback from "../../components/Feedback/Feedback";

export default function MainLayout() {
    return (
        <>
            <Header/>
            <main>
                <Outlet/>
            </main>
            <Feedback />
            <Footer />
        </>
    )
}