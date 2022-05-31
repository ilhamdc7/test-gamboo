import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { authUser,logout } from '../store/userSlice'
import { useRouter } from 'next/router'

const dashboard = () => {

const router = useRouter()

const user = useSelector(authUser)

const dispatch = useDispatch()

const profilelogout = () => {
  dispatch(logout())
  router.push('/')
}



  return (
    <>
      <div>
        Xos geldin {user?.userData?.first_name}
        <button onClick={() => profilelogout()}> Logout </button>
      </div>
    </>
  )
}

export default dashboard