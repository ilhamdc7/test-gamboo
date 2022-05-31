import axios from "axios"


export default async function getItem(){
    return await axios.get(`https://tap.efgroup.az/api/products/`)
}