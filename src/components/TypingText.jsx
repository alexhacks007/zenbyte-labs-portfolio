import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const TypingText = ({ texts }) => {
  const [index, setIndex] = useState(0)
  const [displayedText, setDisplayedText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const period = 2000
  const delta = isDeleting ? 50 : 100

  useEffect(() => {
    let ticker = setInterval(() => {
      tick()
    }, delta)

    return () => clearInterval(ticker)
  }, [displayedText, isDeleting])

  const tick = () => {
    let fullText = texts[index % texts.length]
    let updatedText = isDeleting 
      ? fullText.substring(0, displayedText.length - 1) 
      : fullText.substring(0, displayedText.length + 1)

    setDisplayedText(updatedText)

    if (!isDeleting && updatedText === fullText) {
      setTimeout(() => setIsDeleting(true), period)
    } else if (isDeleting && updatedText === '') {
      setIsDeleting(false)
      setIndex(index + 1)
    }
  }

  return (
    <span className="text-primary font-mono ml-2">
      {displayedText}
      <motion.span
        animate={{ opacity: [0, 1] }}
        transition={{ repeat: Infinity, duration: 0.6 }}
        className="w-1 h-8 bg-primary inline-block align-middle ml-1"
      />
    </span>
  )
}

export default TypingText
