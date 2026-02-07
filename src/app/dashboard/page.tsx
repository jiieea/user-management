import { LogoutButton } from "./components/LogoutButton";
const page = () => {
    return (
        <div className="flex items-center flex-col justify-center mt-5">
            <div className='font-bold '>
                This is dashboard page
            </div>

            {/* // button for logout */}
            <LogoutButton />
        </div>
    )
}

export default page;
