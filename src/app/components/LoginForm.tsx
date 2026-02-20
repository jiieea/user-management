"use client"
import {useRouter} from 'next/navigation';
import React, {useState} from 'react'
import Cookies from "js-cookie";
import {useForm, SubmitHandler, FieldValues} from 'react-hook-form'
import {toast} from "sonner";

const LoginForm = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const router = useRouter()
    const {reset, handleSubmit, register} = useForm<FieldValues>({
        defaultValues: {
            username: "",
            password: "",
        }
    })

    const handleUserLogin: SubmitHandler<FieldValues> = async (values) => {
        setIsLoading(true);
        try {
            const response = await fetch(`https://nestjs-restful-api.vercel.app/api/users/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify(values)
            })
            const result = await response.json();
            // store the token once user login is success
            if (response.ok) {
                Cookies.set('token', result.data.token, {expires: 7});
            }
            console.debug(result)
            if (response.status == 404 || response.status == 401) {
                toast.error(result.errors);
                return;
            }

            toast.success(`Welcome aboard ${result.data.username}`)
            router.push('/dashboard')
            reset();
            setIsLoading(false);
        } catch (e: unknown) {
            if (e instanceof Error) {
                toast.error(e.message)
            }
        }finally {
            setIsLoading(false)
        }
    }
    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div
                className="max-w-md w-full relative flex flex-col p-4 rounded-md items-center justify-center text-black bg-white">
                <div className="text-2xl font-bold mb-2 text-[#1e0e4b] text-center">Welcome back to <span
                    className="text-[#7747ff]">App</span></div>
                <div className="text-sm font-normal mb-4 text-center text-[#1e0e4b]">Log in to your account</div>
                <form className="flex flex-col gap-3" onSubmit={handleSubmit(handleUserLogin)}>
                    <div className="block relative">
                        <label htmlFor="username"
                               className="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2">Username</label>
                        <input type="text" id="text" placeholder="Enter your username"
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
                    <div>
                        <a className="text-sm text-[#7747ff]" href="#">Forgot your password?
                        </a></div>
                    <button type="submit"
                            className="bg-[#7747ff] w-max m-auto px-6 py-2 rounded text-white text-sm font-normal">{
                        isLoading ? <div
                            className="w-5 h-5 border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin"
                        ></div> : "Login"
                    }
                    </button>
                </form>
                <div className="text-sm text-center mt-[1.6rem]">Don’t have an account yet? <a
                    className="text-sm text-[#7747ff] cursor-pointer" onClick={() => router.push('/signup')}>Sign up for
                    free!</a></div>
            </div>
        </div>
    )
}

export default LoginForm
