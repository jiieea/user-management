"use client"
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { useForm, SubmitHandler ,FieldValues } from 'react-hook-form'
const LoginForm = () => {
    const  [ isLoading , setIsLoading ] = useState<boolean>(false);
    const router = useRouter()
    const { reset , handleSubmit , register} = useForm<FieldValues>({
        defaultValues : {
            username: "",
            password: "",
        }
    })


    const handleUserLogin : SubmitHandler<FieldValues> = async (values) => {
        setIsLoading(true);
        try{
            const api = process.env.NEXT_PUBLIC_LOGIN_API!;
            const response = await fetch(api , {
                method: 'POST',
                headers: {
                    'Content-Type' : "application/json"
                },
                body: JSON.stringify(values)
            })

            const result = await response.json();
            if(response.status == 404 || response.status == 401) {
                alert(result.errors);
            }

            alert(`Welcome aboard ${ result.data.username}`)
            router.push('/dashboard')
            reset();
            setIsLoading(false);
        }catch(e: unknown) {
            if(e instanceof Error) {
                throw new Error(e.message)
            }
        }
    }
  return (
    <div>
         <div className="flex flex-col gap-x-3 items-center m-5">
      <h1 className="items-center font-bold">
        Login
      </h1>
      <form onSubmit={handleSubmit(handleUserLogin)} className="flex flex-col space-y-4">
        {/* ... your inputs stay exactly the same ... */}
        <input
          {...register("username", { required: true })}
          placeholder="Username"
          className="mt-4 py-3 px-4 rounded-md bg-neutral-700 text-white"
        />
        <input
          type="password"
          {...register("password", { required: true })}
          placeholder="Password"
          className="mt-4 py-3 px-4 rounded-md bg-neutral-700 text-white"
        />
        <button className="py-2 mt-2 bg-blue-600 rounded-md" type="submit" disabled={isLoading}>
          {isLoading ? "Wait..." : "Login"}
        </button>
      </form>
    </div>
    </div>
  )
}

export default LoginForm
