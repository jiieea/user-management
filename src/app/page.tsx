import CreateUserForm from "@/CreateUserForm";


export default function Home() {
  return (
    <div className=" min-h-screen items-center justify-center flex flex-col bg-zinc-50 font-sans dark:bg-white">
      <h1 className="font-bold">Hello world</h1>
      <CreateUserForm />
    </div>
  );
}
