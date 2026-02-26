"use client"

import {useRouter} from "next/navigation";
import React, {useState} from "react";
import {useForm, SubmitHandler, FieldValues} from "react-hook-form";
import {toast} from "sonner";
import {SignUpPayload} from "@/app/types/interfaces";
import {useAuth} from "@/app/hook/useAuth";

const CreateUserForm = () => {
    const router = useRouter();
    const {signupService} = useAuth();
    const [ error , setError ] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const {register, reset, handleSubmit} = useForm<SignUpPayload>({
        defaultValues: {
            username: "",
            password: "",
            name: "",
        }
    });

    const handleCreateUser: SubmitHandler<SignUpPayload> = async (values) => {
        setIsLoading(true);
        try {
            await signupService(values);
            toast.success("User successfully created!");
            router.push("/login");
            reset()
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            }
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div
                className="max-w-md w-full relative flex flex-col p-4 rounded-md items-center justify-center text-black bg-white">
                <div className="text-2xl font-bold mb-2 text-[#1e0e4b] text-center">Welcome back to <span
                    className="text-[#7747ff]">App</span></div>
                <div className="text-sm font-normal mb-4 text-center text-[#1e0e4b]">Log in to your account</div>
                <form className="flex flex-col gap-3" onSubmit={handleSubmit(handleCreateUser)}>
                    <div className="block relative">
                        <label htmlFor="username"
                               className="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2">Username</label>
                        <input type="text" id="username" placeholder="Enter your username"
                               className="rounded border border-gray-200 text-sm w-full font-normal leading-4.5 text-black tracking-[0px] appearance-none block h-11 m-0 p-2.75 focus:ring-2 ring-offset-2  ring-gray-900 outline-0"
                               {...register('username', {required: true})}
                        />
                    </div>
                    <div className="block relative">
                        <label htmlFor="password"
                               className="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2">Password</label>
                        <input type="text" id="password" placeholder="Enter your password"
                               {...register('password', {required: true})}
                               className="rounded border border-gray-200 text-sm w-full font-normal leading-4.5
                           text-black tracking-[0px] appearance-none block h-11 m-0 p-2.75 focus:ring-2
                           ring-offset-2 ring-gray-900 outline-0"/>
                    </div>
                    <div className="block relative">
                        <label htmlFor="name"
                               className="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2">Name</label>
                        <input type="text" id="name" placeholder="Enter your name"
                               {...register('name', {required: true})}
                               className="rounded border border-gray-200 text-sm w-full font-normal leading-4.5
                           text-black tracking-[0px] appearance-none block h-11 m-0 p-2.75 focus:ring-2
                           ring-offset-2 ring-gray-900 outline-0"/>
                    </div>
                    {
                        error && (
                            <p className="text-[12px] font-semibold text-red-600">{error}</p>

                        )
                    }
                    <div>
                        <a className="text-sm text-[#7747ff]" href="#">Forgot your password?
                        </a></div>
                    <button type="submit"
                            className="bg-[#7747ff] w-max m-auto px-6 py-2 rounded text-white text-sm font-normal">{
                        isLoading ? "Signing..." : "SignUp"
                    }
                    </button>
                </form>
                <div className="text-sm text-center mt-[1.6rem]">Already have an account ? <a
                    className="text-sm text-[#7747ff] cursor-pointer" onClick={() => router.push('/login')}>Login!</a>
                </div>
            </div>
        </div>
    );
};

export default CreateUserForm;
