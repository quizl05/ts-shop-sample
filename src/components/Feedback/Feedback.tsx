import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Feedback() {
    const [isSent, setIsSent] = useState<boolean>(false);
    const [warning, setWarning] = useState<string>("");

    const emailRef = useRef<HTMLInputElement>(null);

    function onEmailSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const email = emailRef.current?.value ?? "";
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (email.length === 0) {
            setWarning("Enter your email");
            setIsSent(false);
        } else if (!emailRegex.test(email)) {
            setWarning("Enter correct email");
            setIsSent(false);
        } else {
            setWarning("");
            setIsSent(true);
            if (emailRef.current) emailRef.current.value = "";
        }
    }

    return (
        <section className="py-16 pb-5 px-8 h-[180px] w-full">
            <form id="feedback-form" className="relative flex justify-between items-center w-full" onSubmit={onEmailSubmit}>
                <label className="text-white text-xl w-[400px]" htmlFor="feedback">
                    Enter your email to be the first to know about new brands
                </label>

                <p className="optional-font w-[100px] text-lg ml-[400px] text-red-500 font-bold">{warning}</p>

                <input
                    ref={emailRef}
                    className="pl-3.5 h-[50px] rounded-2xl w-[500px] placeholder:text-gray-600 placeholder:pl-3.5 placeholder:text-sm"
                    type="email"
                    id="feedback"
                    placeholder="Email address"
                />

                <button
                    type="submit"
                    className="text-gray-400 bg-slate-800 opacity-70 absolute bottom-4 right-5 rounded-full w-fit px-2 h-fit text-center"
                >
                    send
                </button>
            </form>

            <AnimatePresence>
                {isSent && (
                    <motion.p
                        id="greeting-email"
                        className="text-right text-white"
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.4 }}
                    >
                        Thanks!
                    </motion.p>
                )}
            </AnimatePresence>
        </section>
    );
}
