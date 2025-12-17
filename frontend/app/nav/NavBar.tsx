import Image from "next/image";
import Search from "./Search";
import Logo from "./Logo";

export default function NavBar() {
  return (
    <header className='sticky top-0 z-50 flex justify-between bg-white items-center p-4 text-gray-600 shadow-md'>
      <Logo />
      <Search />
      <div>login</div>
    </header>
  )
}
