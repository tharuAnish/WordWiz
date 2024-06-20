import Link from "next/link"
import React from "react"
import {
  FaInstagram,
  FaLinkedin,
  FaSquareFacebook,
  FaSquareTwitter,
} from "react-icons/fa6"

export default function Footer() {
  return (
    <footer className=" pb-11 pt-14 mt-32 sm:pt-10 border-t border-gray-200 dark:border-gray-900 mx-14 sm:mx-5 ">
      <div className="container mx-auto text-center ">
        {/* <div className="mb-6 flex justify-center gap-6 text-gray-700 dark:text-gray-400">
          <Link
            href="facebook.com"
            className="  hover:text-gray-900 dark:hover:text-gray-200"
          >
            <FaSquareFacebook size="32" />
          </Link>
          <Link
            href="instagram.com"
            className=" hover:text-gray-900  dark:hover:text-gray-200"
          >
            <FaInstagram size="32" />
          </Link>
          <Link
            href="twitter.com"
            className=" hover:text-gray-900 dark:hover:text-gray-200"
          >
            <FaSquareTwitter size="32" />
          </Link>
          <Link
            href="https://www.linkedin.com/in/tharuanish/"
            className=" hover:text-gray-900 dark:hover:text-gray-200"
          >
            <FaLinkedin size="32 " />
          </Link>
        </div> */}
        <p className="text-sm dark:text-gray-700 text-gray-400">
          &copy; {new Date().getFullYear()} All rights reserved to{" "}
          <Link
            className="dark:hover:text-gray-100 hover:text-gray-900 font-bold  "
            target="_blank"
            href="https://www.linkedin.com/in/tharuanish/"
          >
            Namo
          </Link>
        </p>
      </div>
    </footer>
  )
}
