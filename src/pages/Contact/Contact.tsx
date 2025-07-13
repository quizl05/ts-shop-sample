import {motion} from 'framer-motion';
import { useRef, useState } from 'react';

export default function Contact() {

    const [isSent, setIsSent] = useState<boolean>(false)
    const [warning, setWarning] = useState<string>('')

    const nameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const phoneRef = useRef<HTMLInputElement>(null);
    const commentRef = useRef<HTMLTextAreaElement>(null)

    function formSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const name = nameRef.current?.value ?? '';
        const email = emailRef.current?.value ?? '';
        const phone = phoneRef.current?.value ?? '';
        const comment = commentRef.current?.value ?? '';

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const phoneRegex = /^\+?[0-9\s\-()]{7,15}$/;

        if(name.length === 0) {
            setWarning('Name can`t be empty');
            setIsSent(false);
            return
        } 
        else if (name.length < 3) {
            setWarning('Name must be more than 3 characters');
            setIsSent(false);
            return
        }

        if(email.length === 0){
            setWarning('Email can`t be empty');
            setIsSent(false);
            return
        } else if(!emailRegex.test(email)) {
            setWarning('Enter correct email');
            setIsSent(false);
            return
        }

        if (phone.length === 0) {
            setWarning("Phone can`t be empty");
            setIsSent(false);
            return;
        } else if (!phoneRegex.test(phone)) {
            setWarning("Enter a valid phone number");
            setIsSent(false);
            return;
        }

        if(comment.length === 0){
            setWarning('Comment can`t be empty');
            return
        }

        setIsSent(true)
        setWarning('')
    }

    return(
        <section className="h-fit w-full">
            <h2 className="text-5xl font-thin text-white text-center py-9">Contact</h2>
            <form
            onSubmit={formSubmit} 
            className="grid grid-cols-2 gap-6 mx-auto w-4/6">
                <input className="w-full h-16 rounded-xl p-7 font-thin text-sm" ref={nameRef} type="text" autoComplete="name" placeholder="Name"/>
                <input className="w-full h-16 rounded-xl p-7 font-thin text-sm" ref={emailRef} type="email" placeholder="Email"/>
                <input className="col-span-2 h-16 rounded-xl p-7 font-thin text-sm" ref={phoneRef} type="tel" autoComplete="tel" placeholder="Phone"/>
                <div className="col-span-2 w-full">
                <textarea
                    className="h-48 w-full rounded-xl p-7 font-thin text-sm resize-none"
                    ref={commentRef}
                    placeholder="Comment"
                />
                </div>
                <motion.button 
                whileHover={{
                    backgroundColor: '#ababab'
                }}
                className="text-white w-fit px-6 py-4 rounded-xl text-start" type="submit">Submit</motion.button>
                {isSent ? 
                <motion.p
                        id="greeting-email"
                        className="text-right text-white"
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.4 }}
                    >
                        Thanks!
                </motion.p> : <p className='text-red-500 text-start px-6 py-4'>{warning}</p>}
            </form>
        </section>
    )
}