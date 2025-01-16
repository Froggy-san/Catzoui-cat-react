import React, { FC, useState } from 'react'

interface Props {
  src: string
  className?: string
  magnifierHeight?: number
  magnifierWidth?: number
  zoomLevel?: number
  allowZoom?: boolean
}

const ImageMagnifier: FC<Props> = ({
  src,
  className,
  allowZoom = true,
  magnifierWidth = 200,
  magnifierHeight = 200,
  zoomLevel = 1.4,
}) => {
  const [showMagnifier, setShowMagnifier] = useState(false)
  const [[imgWidth, imgHeight], setSize] = useState([0, 0])
  const [[x, y], setXY] = useState([0, 0])

  const handleMouseEnter = (e: React.MouseEvent<HTMLImageElement>) => {
    if (!allowZoom) return
    const el = e.currentTarget
    const { width, height } = el.getBoundingClientRect()
    setSize([width, height])
    setShowMagnifier(true)
  }

  const handleMosueLeave = (e: React.MouseEvent<HTMLImageElement>) => {
    e.preventDefault()
    setShowMagnifier(false)
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLImageElement>) => {
    const el = e.currentTarget
    const { top, left } = el.getBoundingClientRect()

    const x = e.pageX - left - window.scrollX
    const y = e.pageY - top - window.scrollY

    setXY([x, y])
  }

  return (
    <div className="  h-full w-full">
      <img
        src={src}
        className={`h-full w-full object-cover  ${className}`}
        onMouseEnter={(e) => handleMouseEnter(e)}
        onMouseLeave={(e) => handleMosueLeave(e)}
        onMouseMove={(e) => handleMouseMove(e)}
      />

      <div
        style={{
          display: showMagnifier ? '' : 'none',
          position: 'absolute',
          pointerEvents: 'none',
          height: `${magnifierHeight}px`,
          width: `${magnifierWidth}px`,
          opacity: allowZoom ? '1' : '0',
          border: '1px solid lightgrey',
          backgroundColor: 'transparent',
          borderRadius: '5px',
          backgroundImage: `url('${src}')`,
          backgroundRepeat: 'no-repeat',
          top: `${y - magnifierHeight / 2}px`,
          left: `${x - magnifierWidth / 2}px`,
          backgroundSize: `${imgWidth * zoomLevel}px ${
            imgHeight * zoomLevel
          }px`,
          backgroundPositionX: `${-x * zoomLevel + magnifierWidth / 2}px`,
          backgroundPositionY: `${-y * zoomLevel + magnifierHeight / 2}px`,
        }}
      />
    </div>
  )
}

export default ImageMagnifier
