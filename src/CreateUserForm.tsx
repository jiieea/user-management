"use client"

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";

const CreateUserForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { register, reset, handleSubmit } = useForm<FieldValues>({
    defaultValues: {
      username: "",
      password: "",
    }
  });

  // 'data' here contains the values from your inputs
  const createUser: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    try {
      // Use NEXT_PUBLIC_ prefix for client-side env vars
      const api ="https://nestjs-restful-api.vercel.app/api/users/login";
      
      const response = await fetch(api, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data), // Send the actual form data
      });

      const result = await response.json();
      console.log(result)

      // Use response.ok to check for 200-299 status codes
      if (!response.ok) {
        alert(`Error: ${result.message || "Failed to connect api"}`);
      } else {
        alert(`Success: login ${result.username }!`);
        reset();
        router.refresh();
      }
    } catch (e: unknown) {
      alert("Network error: Could not reach the server." + e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(createUser)} className="flex flex-col space-y-4">
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
         {isLoading ? "Uploading..." : "Create"}
       </button>
    </form>
  );
};

export default CreateUserForm;