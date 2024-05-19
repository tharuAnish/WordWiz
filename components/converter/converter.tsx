"use client"

import { useState, useEffect } from "react"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Textarea } from "../ui/textarea"
import { ToastContainer, toast, ToastOptions } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useTheme } from "next-themes"

import { FaRegCopy } from "react-icons/fa6"

export default function Converter() {
  const { resolvedTheme, setTheme } = useTheme()
  const [text, setText] = useState<string>("")
  const [convertedText, setConvertedText] = useState<string>("")
  const [wordCount, setWordCount] = useState<number>(0)
  const [letterCount, setLetterCount] = useState<number>(0)
  const [timeToRead, setTimeToRead] = useState<string>("")

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

  const handleConvertToLowercase = () => {
    setConvertedText(text.toLowerCase())
    toast.success("Converted to lowercase!", toastOptions)
  }

  const handleConvertToUppercase = () => {
    setConvertedText(text.toUpperCase())
    toast.success("Converted to uppercase!", toastOptions)
  }

  const handleClearText = () => {
    setText("")
    setConvertedText("")
    setWordCount(0)
    setLetterCount(0)
    setTimeToRead("")
    toast.success("Text cleared!", toastOptions)
  }

  const handleCopyText = () => {
    navigator.clipboard.writeText(convertedText)
    toast.success("Converted text copied to clipboard!", toastOptions)
  }

  const handleRemoveExtraSpaces = () => {
    const cleanedText = text.replace(/\s+/g, " ").trim()
    setConvertedText(cleanedText)
    toast.success("Extra spaces removed!", toastOptions)
  }

  useEffect(() => {
    const words = text
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0)
    setWordCount(words.length)
    setLetterCount(text.replace(/\s+/g, "").length)
    const wordsPerMinute = 200
    const minutes = words.length / wordsPerMinute
    setTimeToRead(
      minutes < 1 ? "< 1 minute" : `${Math.ceil(minutes)} minute(s)`
    )
  }, [text])

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
          <Button onClick={handleConvertToLowercase}>
            Convert to Lowercase
          </Button>
          <Button onClick={handleConvertToUppercase}>
            Convert to Uppercase
          </Button>
          <Button onClick={handleRemoveExtraSpaces}>Remove Extra Spaces</Button>
        </div>
        <Button onClick={handleClearText} variant="destructive">
          Clear Text
        </Button>
      </div>
      <div className="mb-4">
        <h4 className="mb-1">Your Text Summary</h4>
        <div className="text-sm font-extralight flex gap-5 p-4 dark:bg-slate-900 bg-stone-100 rounded-lg shadow-md">
          <p className="">Word count: {wordCount}</p>
          <p className="">Letter count: {letterCount}</p>
          <p className="">Time to read: {timeToRead}</p>
        </div>
      </div>
      <h4 className="text-xl  mb-2 ">Preview:</h4>
      <div className="relative">
        <p className="p-3 rounded-md border h-36 cursor-text">
          {convertedText}
        </p>
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
