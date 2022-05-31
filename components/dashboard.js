import React, {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { authUser,logout } from '../store/userSlice'
import { useRouter } from 'next/router'
import styles from './dashboard.module.css'
import axios from 'axios'
import getItem from '../services/getItem'

const dashboard = () => {

const user = useSelector(authUser)
const [items, setItems] = useState([])

useEffect(() => {
  if(!user?.token){
    router.push('/')
  }



  

  getItem().then(res => {
    const {data, status} = res
    if(status >= 200, status <= 300){
      setItems(data)
    }
  })
},[])


const router = useRouter()
const dispatch = useDispatch()


const profilelogout = () => {
  dispatch(logout())
  router.push('/')
}



  return (
    <>
      <div>
        Welcome {user?.userData?.first_name}
        <button onClick={() => profilelogout()}> Logout </button>
      </div>

      {items?.map((item) => (
          <div className={styles.itemContainer}>
              {item.id}
          </div>
      ))}
      
    </>
  )
}

export default dashboard


// export async function getStaticProps(){
//   const resItem = await axios.get(`https://tap.efgroup.az/api/products`)
//   const item = await resItem.json()

//   return {
//     props: {
//       item,
//     },

//     revalidate: 1, 
//     // her 10 saniyeden bir request gondermesini teleb edir, gonderdiyi requestlere esasen html ve json fayllari yaradib static olaraq sehifede saxlayir.
//     // eger back-end serveri dayandirilarsa fayllar yene de sehifede gosterilir yeni her hansisa bir fetch error itemlerim yoxa cixmasina sebeb olmur.
//     //route zamani slug-lar ucun getStaticPatch-lardan istifade olunur ve dinamik slug tapilaraq, detailine baxilmasi teleb olunan itemin dinamik slugunu getirib, yeniden static patch ile request gonderir.

//   }
// }

