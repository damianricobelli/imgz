import * as React from "react"

export const useCopyToClipboard = () => {
  const [copied, setCopied] = React.useState("")
  const timeoutRef = React.useRef<number>(null)

  const copyToClipboard = async (value: string) => {
    try {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }

      await navigator.clipboard.writeText(value)
      setCopied(value)

      timeoutRef.current = window.setTimeout(() => {
        setCopied("")
        timeoutRef.current = null
      }, 2000)
    } catch (error) {
      console.error("Failed to copy:", error)
    }
  }

  return { copied, copyToClipboard }
}
