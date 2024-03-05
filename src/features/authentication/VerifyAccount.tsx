import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { LuLoader2 } from 'react-icons/lu'

const VerifyAccount = ({
  isOpen,
  setIsOpen,
  email,
}: {
  isOpen: boolean
  setIsOpen?: (value: boolean) => void
  email?: string
}) => {
  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      {/* <DialogTrigger>Open</DialogTrigger> */}
      <DialogContent>
        <DialogHeader>
          <DialogTitle className=" text-md leading-6">
            Please verify your account, {email}.
          </DialogTitle>
          <DialogDescription className="flex items-center gap-1 ">
            Verify <LuLoader2 className=" animate-spin" size={12} />
            {/* <p>Please don't upload any weird stuff into the site.</p>
            <div>
              <strong>Email:</strong> <span>admin1@yahoo.com</span>
            </div>
            <div>
              <strong>Password:</strong> <span>admin123456789</span>
            </div> */}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default VerifyAccount
