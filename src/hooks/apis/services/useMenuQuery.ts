import axios from "axios"
import { useQuery } from "react-query"
import { MenuList } from "../../../interfaces/MenuItemInterface"
import { QuriesKeys } from "../QueriesKeys"

const fetchMenuAPI = async () => {
  const res = await axios.get<MenuList>("https://foodbukka.herokuapp.com/api/v1/menu")
    
  return res.data
 
}

export const useMenuQuery = () => {
  return useQuery([QuriesKeys.GET_MENU], fetchMenuAPI)
}