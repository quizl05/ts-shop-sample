import { useState, useRef } from "react";
import { Navigate } from "react-router-dom";

export default function UserPage() {
    const nameRef = useRef<HTMLInputElement>(null);
    const telRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);

    const [isInputFilled, setInputFilled] = useState<boolean>(() => localStorage.getItem('userinfo') === 'true');
    const [warning, setWarning] = useState('');

    function onFormSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const name = nameRef.current?.value ?? '';
        const tel = telRef.current?.value ?? '';
        const email = emailRef.current?.value ?? '';

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const phoneRegex = /^\+?[0-9\s\-()]{7,15}$/;

        if (name.length === 0) {
            setWarning('Name can`t be empty');
            return;
        } else if (name.length < 3) {
            setWarning('Name must be more than 3 characters');
            return;
        }

        if (email.length === 0) {
            setWarning('Email can`t be empty');
            return;
        } else if (!emailRegex.test(email)) {
            setWarning('Enter correct email');
            return;
        }

        if (tel.length === 0) {
            setWarning("Phone can`t be empty");
            return;
        } else if (!phoneRegex.test(tel)) {
            setWarning("Enter a valid phone number");
            return;
        }

        setWarning('');
        setInputFilled(true);
        localStorage.setItem('userinfo', 'true');
    }

    if (isInputFilled) {
        return <Navigate to="userpage/userprofile" />;
    }

    return (
        <section className="py-28 px-32 w-full flex-col flex gap-10">
            <h2 className="mx-auto relative z-[0] text-5xl text-white w-fit h-fit p-4 before:rounded-xl text-center mt-10 before:content-[''] before:absolute before:inset-0 before:z-0 before:opacity-30 before:bg-gradient-to-r before:from-gray-500 before:via-white before:to-gray-500">
                <span className="relative z-[1]">You have not registered yet.</span>
            </h2>
            <form 
                onSubmit={onFormSubmit}
                className="ml-48 w-1/3 flex flex-col gap-10"
            >
                <input ref={nameRef} className="h-10 rounded-lg p-5 bg-gray-700 text-white" type="text" autoComplete="name" placeholder="Name" />
                <input ref={telRef} className="h-10 rounded-lg p-5 bg-gray-700 text-white" type="tel" autoComplete="tel" placeholder="Phone" />
                <input ref={emailRef} className="h-10 rounded-lg p-5 bg-gray-700 text-white" type="email" autoComplete="email" placeholder="Email" />
                <button type="submit" className="text-white rounded-xl p-2 border-2 border-solid border-white w-1/2">Submit</button>
            </form>
            {warning && <p className="block mx-auto text-red-600">{warning}</p>}
        </section>
    );
}
