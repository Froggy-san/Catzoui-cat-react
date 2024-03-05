import { toast } from 'sonner'

interface ToastProps {
  title?: string
  icon?: () => JSX.Element
  descText?: string
  undoFn?: () => void
}

const ToastComp = ({ title, icon, descText, undoFn }: ToastProps) => {
  return toast(`${title}`, {
    description: (
      <div className="flex items-center space-x-2">
        <span>{icon?.()}</span>
        <span>{descText}</span>
      </div>
    ),
    action: {
      label: 'Undo',
      onClick: () => undoFn,
    },
    closeButton: true,
  })
}

export default ToastComp
