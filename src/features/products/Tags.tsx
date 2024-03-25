import { Badge } from '@/components/ui/badge'

import { IoIosClose } from 'react-icons/io'

const Tags = ({
  fieldType,
  showField,
  fieldChange,
  tags,
}: {
  fieldType: string
  tags: string
  fieldChange: (value: string) => void
  showField: (value: boolean) => void
}) => {
  return (
    <div
      style={{ width: '100%' }}
      onClick={() => showField(true)}
      className="flex h-fit cursor-pointer   flex-wrap gap-1  overscroll-contain rounded-md border border-input bg-background px-3 py-2 text-sm"
    >
      {tags.length
        ? tags
            .trim()
            .split(',')
            .filter((el) => el !== '')
            .map((badge, i) => (
              <Badge
                style={{
                  backgroundColor: badge,
                  width: 'fit-content',
                }}
                className={`leading-0 flex items-center `}
                key={i}
              >
                <span className="mb-[.5px]"> {badge}</span>
                <IoIosClose
                  className=" cursor-pointer"
                  size={20}
                  onClick={(e) => {
                    e.stopPropagation()
                    const result = tags
                      .split(',')
                      .filter((str) => str !== badge)
                      .join(',')
                    fieldChange(result)
                  }}
                />
              </Badge>
            ))
        : fieldType === 'colors'
          ? 'red,green,#ffff,blue'
          : 'm,xl,120cm,'}
    </div>
  )
}

export default Tags
