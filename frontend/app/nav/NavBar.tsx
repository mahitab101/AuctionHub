import Search from "./Search";
import Logo from "./Logo";
import LoginButton from "./LoginButton";
import { getCurrentUser } from "../actions/authActions";
import UserActions from "./UserActions";

export default async function NavBar() {
  const user = await getCurrentUser();
  return (
    <header className='sticky top-0 z-50 flex justify-between bg-white items-center p-4 text-gray-600 shadow-md'>
      <Logo />
      <Search />
      {user ?
        <UserActions user={user} />
        :
        <LoginButton />}
    </header>
  )
}
