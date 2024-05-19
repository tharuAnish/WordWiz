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
  const [keyword, setKeyword] = useState<string>("")
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

  const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value)
  }

  const vigenereCipher = (text: string, key: string, decrypt = false) => {
    const charset =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    const shift = (char: string, shiftAmount: number) => {
      const index = charset.indexOf(char)
      if (index === -1) return char
      const newIndex = (index + shiftAmount + charset.length) % charset.length
      return charset[newIndex]
    }

    key = key.toLowerCase()
    let keyIndex = 0
    return text
      .split("")
      .map((char) => {
        if (charset.includes(char)) {
          const shiftAmount = charset.indexOf(key[keyIndex % key.length])
          keyIndex++
          return shift(char, decrypt ? -shiftAmount : shiftAmount)
        }
        return char
      })
      .join("")
  }

  const base64Encode = (text: string) => {
    return btoa(text)
  }

  const base64Decode = (text: string) => {
    return atob(text)
  }

  const handleEncrypt = () => {
    if (!keyword) {
      toast.error("Please enter a keyword for encryption!", toastOptions)
      return
    }
    const encrypted = vigenereCipher(text, keyword)
    setConvertedText(base64Encode(encrypted))
    toast.success("Text encrypted!", toastOptions)
  }

  const handleDecrypt = () => {
    if (!keyword) {
      toast.error("Please enter a keyword for decryption!", toastOptions)
      return
    }
    const decrypted = vigenereCipher(base64Decode(text), keyword, true)
    setConvertedText(decrypted)
    toast.success("Text decrypted!", toastOptions)
  }

  const handleClearText = () => {
    setText("")
    setConvertedText("")
    setKeyword("")
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
      <div className="mb-4 relative">
        <Input
          className="p-5"
          type={showPassword ? "text" : "password"}
          value={keyword}
          onChange={handleKeywordChange}
          placeholder="Enter keyword for encryption/decryption"
        />
        <button
          onClick={() => setShowPassword(!showPassword)}
          className="absolute top-2 right-2 p-1 "
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
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

      <h4 className="text-xl font-semibold mb-2 ">Preview:</h4>
      <div className="relative">
        <Textarea
          value={convertedText}
          readOnly
          rows={6}
          className="p-3 rounded-md border h-36 cursor-text"
        />
        <Button
          onClick={handleCopyText}
          variant="outline"
          className="absolute top-2 right-2"
        >
          <FaRegCopy />
        </Button>
      </div>
      <ToastContainer />
    </div>
  )
}
