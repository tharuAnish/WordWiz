"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ToastContainer, toast, ToastOptions } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useTheme } from "next-themes"
import { FaRegCopy, FaEye, FaEyeSlash } from "react-icons/fa6"

export default function Converter() {
  const { resolvedTheme } = useTheme()
  const [text, setText] = useState<string>("")
  const [convertedText, setConvertedText] = useState<string>("")
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const toastOptions: ToastOptions = {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: resolvedTheme === "dark" ? "dark" : "light",
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value)
  }

  const shiftChar = (char: string, shift: number): string => {
    const charCode = char.charCodeAt(0)
    const shiftWrapped = (shift >= 0 ? shift : (shift % 26) + 26) % 26
    // Handle lowercase letters
    if (charCode >= 97 && charCode <= 122) {
      return String.fromCharCode(((charCode - 97 + shiftWrapped) % 26) + 97)
    }
    // Handle uppercase letters
    if (charCode >= 65 && charCode <= 90) {
      return String.fromCharCode(((charCode - 65 + shiftWrapped) % 26) + 65)
    }
    // Return the character as is if it's not a letter
    return char
  }

  const encryptText = (text: string): string => {
    const shift = text.length
    return text
      .split("")
      .map((char) => shiftChar(char, shift))
      .join("")
  }

  const decryptText = (text: string): string => {
    const shift = text.length
    return text
      .split("")
      .map((char) => shiftChar(char, -shift))
      .join("")
  }

  const handleEncrypt = () => {
    if (!text) {
      toast.error("Please enter a text for encryption!", toastOptions)
      return
    }

    const encrypted = encryptText(text)
    setConvertedText(encrypted)
    toast.success("Text encrypted!", toastOptions)
  }

  const handleDecrypt = () => {
    if (!text) {
      toast.error("Please enter a text for decryption!", toastOptions)
      return
    }

    const decrypted = decryptText(text)
    setConvertedText(decrypted)
    toast.success("Text decrypted!", toastOptions)
  }

  const handleClearText = () => {
    setText("")
    setConvertedText("")
    toast.success("Text cleared!", toastOptions)
  }

  const handleCopyText = () => {
    navigator.clipboard.writeText(convertedText)
    toast.success("Converted text copied to clipboard!", toastOptions)
  }

  return (
    <div className="mt-14 max-w-screen-lg mx-auto px-8 mb-10">
      <h1 className="text-2xl font-medium mb-6">
        Try WordWiz - Word Counter, Character Counter, Remove extra spaces
      </h1>
      <div className="mb-4">
        <Textarea
          value={text}
          onChange={handleInputChange}
          placeholder="Type some text here ..."
          rows={6}
        />
      </div>

      <div className="mb-6 flex justify-between">
        <div className="flex space-x-4">
          <Button onClick={handleEncrypt}>Encrypt Text</Button>
          <Button onClick={handleDecrypt}>Decrypt Text</Button>
        </div>
        <Button onClick={handleClearText} variant="destructive">
          Clear Text
        </Button>
      </div>

      <h4 className="text-xl font-semibold mb-2">Preview:</h4>
      <div className="relative">
        <Input
          value={convertedText}
          readOnly
          type={showPassword ? "text" : "password"}
          className="p-3 block rounded-md border h-36 cursor-text"
        />
        <Button
          onClick={handleCopyText}
          variant="outline"
          className="absolute top-2 right-2"
        >
          <FaRegCopy />
        </Button>
        <Button
          variant="outline"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute top-14 right-2 "
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </Button>
      </div>
      <ToastContainer />
    </div>
  )
}
