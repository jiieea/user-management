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
      if(response.status == 404) {
        alert(result.errors);
      }
      if (!response.ok) {
        alert(`Error: ${result.message}`);
      } else {
        alert(`Success: login ${result.data.username}!`);
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
    <div className="flex flex-col gap-x-3 items-center m-5">
      <h1 className="items-center font-bold">
        SignUp
      </h1>
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
        <input
          type="name"
          {...register("name", { required: true })}
          placeholder="name"
          className="mt-4 py-3 px-4 rounded-md bg-neutral-700 text-white"
        />
        <button className="py-2 mt-2 bg-blue-600 rounded-md" type="submit" disabled={isLoading}>
          {isLoading ? "Uploading..." : "Create"}
        </button>
      </form>
    </div>
  );
};

export default CreateUserForm;