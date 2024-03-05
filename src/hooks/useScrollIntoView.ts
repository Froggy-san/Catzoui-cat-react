import { useEffect, useRef } from 'react'

const useScrollIntoView = () => {
  const ref = useRef<HTMLDivElement>(null)
  function handleScrollIntoView() {
    ref.current?.scrollIntoView({ behavior: 'smooth' })
  }
  useEffect(() => {
    handleScrollIntoView()
  }, [])

  return ref
}

export default useScrollIntoView
