"use client"

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";

const CreateUserForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { register, reset, handleSubmit } = useForm<FieldValues>({
    defaultValues: {
      username: "",
      password: "",
      name: "",
    }
  });

  // 'data' here contains the values from your inputs
  const createUser: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    try {
      const api = process.env.NEXT_PUBLIC_CREATE_API!;

      const response = await fetch(api, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (!response.ok) {
        const errorMessage =
          response.status === 404
            ? result.errors
            : result.message || "Request failed.";
        alert(`Error: ${errorMessage}`);
        return;
      }

      alert(`Success: login ${result.data.username}!`);
      reset();
      router.refresh();
    } catch (e: unknown) {
      alert("Network error: Could not reach the server." + e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md w-full relative flex flex-col p-4 rounded-md items-center justify-center text-black bg-white">
          <div className="text-2xl font-bold mb-2 text-[#1e0e4b] text-center">Welcome back to <span
              className="text-[#7747ff]">App</span></div>
          <div className="text-sm font-normal mb-4 text-center text-[#1e0e4b]">Log in to your account</div>
          <form className="flex flex-col gap-3" onSubmit={handleSubmit(createUser)}>
            <div className="block relative">
              <label htmlFor="username"
                     className="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2">Username</label>
              <input type="text" id="text" placeholder="Enter your username"
                     className="rounded border border-gray-200 text-sm w-full font-normal leading-4.5 text-black tracking-[0px] appearance-none block h-11 m-0 p-2.75 focus:ring-2 ring-offset-2  ring-gray-900 outline-0"
                     {...register('username' , { required: true })}
              />
            </div>
            <div className="block relative">
              <label htmlFor="password"
                     className="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2">Password</label>
              <input type="text" id="password" placeholder="Enter your password"
                     {...register('password' , { required: true })}
                     className="rounded border border-gray-200 text-sm w-full font-normal leading-4.5
                           text-black tracking-[0px] appearance-none block h-11 m-0 p-2.75 focus:ring-2
                           ring-offset-2 ring-gray-900 outline-0"/>
            </div>
            <div className="block relative">
              <label htmlFor="name"
                     className="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2">Name</label>
              <input type="text" id="name" placeholder="Enter your name"
                     {...register('name' , { required: true })}
                     className="rounded border border-gray-200 text-sm w-full font-normal leading-4.5
                           text-black tracking-[0px] appearance-none block h-11 m-0 p-2.75 focus:ring-2
                           ring-offset-2 ring-gray-900 outline-0"/>
            </div>
            <div>
              <a className="text-sm text-[#7747ff]" href="#">Forgot your password?
              </a></div>
            <button type="submit"
                    className="bg-[#7747ff] w-max m-auto px-6 py-2 rounded text-white text-sm font-normal">{
              isLoading ? "Login-in" : "Login"
            }
            </button>
          </form>
          <div className="text-sm text-center mt-[1.6rem]">Already have an account ? <a
              className="text-sm text-[#7747ff] cursor-pointer" onClick={()=> router.push('/login')}>Login!</a></div>
        </div>
      </div>
  );
};

export default CreateUserForm;
