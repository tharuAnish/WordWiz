import Image from "next/image"
import { ModeToggle } from "../theme/toggle"

import logo from "../../assets/logo.png"
import Link from "next/link"

export default function Nav() {
  return (
    <nav className="  border-b shadow-sm">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between h-14 mx-auto">
        <Link
          href="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <Image src={logo} className="h-10 w-10" alt="Flowbite Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            WordWiz
          </span>
        </Link>

        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ModeToggle />
        </div>
      </div>
    </nav>
  )
}
