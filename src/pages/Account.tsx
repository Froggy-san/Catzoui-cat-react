import UpdateAccount from '@/features/authentication/UpdateAccount'
import UpdatePassword from '@/features/authentication/UpdatePassword'
import { MdOutlineSettingsAccessibility } from 'react-icons/md'
import { PiPasswordThin } from 'react-icons/pi'

const Account = () => {
  return (
    <div className=" mx-auto  w-[94%] max-w-[700px]">
      <div className="mb-9 mt-36 flex items-center justify-center gap-3">
        {' '}
        <MdOutlineSettingsAccessibility size={35} />{' '}
        <span className="text-2xl font-semibold">User Settings</span>
      </div>
      <UpdateAccount />

      <div className="mb-9 mt-36 flex items-center justify-center gap-3">
        {' '}
        <PiPasswordThin size={35} />{' '}
        <span className="text-2xl font-semibold">Update Password</span>
      </div>
      <UpdatePassword />
    </div>
  )
}

export default Account
