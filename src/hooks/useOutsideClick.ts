import { useEffect, useRef, useCallback } from 'react'

export function useOutsideClick(
  handler: () => void,
  listenCapturing: boolean = true
) {
  const ref = useRef<HTMLDivElement>(null)
  // Wrap the listener function in a useCallback hook
  const handleClick = useCallback(
    function (e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) handler()
    },
    [handler, listenCapturing]
  )

  useEffect(
    function () {
      document.addEventListener('click', handleClick, listenCapturing)

      return () =>
        document.removeEventListener('click', handleClick, listenCapturing)
    },
    [handleClick, listenCapturing]
  )
  return ref
}
