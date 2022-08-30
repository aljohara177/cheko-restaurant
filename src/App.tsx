import "./App.css";
import "antd/dist/antd.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavigationMap from "./components/NavigationMap";
import { Home } from "./components/Home";
import { NavigationMenu } from "./components/NavigationMenu";
import { useMenuQuery } from "./hooks/apis/services/useMenuQuery";
import { SetStateAction, useState } from "react";
import { Menu } from "./interfaces/MenuItemInterface";

function App() {
  const menuQuery = useMenuQuery();
  const [menu, setMenu] = useState<Menu[]>([]);
  const [type, setSelectedType] = useState("breakfast");
  if (menuQuery.isSuccess) {
    menuQuery.data.Result.map((item: Menu) => {
      item.quantity = 0;
      if (item.menuname.includes("soup") || item.description.includes("soup")) {
        item.type = "soup";
      } else if (
        item.menuname.includes("rice") ||
        item.description.includes("rice") ||
        item.menuname.includes("sushi") ||
        item.description.includes("sushi")
      ) {
        item.type = "sushi";
      } else if (
        item.menuname.includes("drink") ||
        item.description.includes("drink")
      ) {
        item.type = "drink";
      } else {
        item.type = "breakfast";
      }
    });
  }

  const searchItems = (search: SetStateAction<any>) => {
    let menu = menuQuery?.data?.Result.filter(
        (item: Menu) =>
          (item.menuname.toLowerCase().includes(search.searchQuery) ||
          item.description.toLowerCase().includes(search.searchQuery))
      )

      if(search.type) {
        setSelectedType(search.type)
        menu = menu?.filter((item: Menu) => item.type === search.type)
      }
    if(menu !== undefined) {
      setMenu(menu)
    }
   
  };

  return (
    <div className="row App">
      <div className="col-24">
        <NavigationMenu setSearchQuery={(e) => searchItems(e)} />
        <BrowserRouter key="browseRouter">
          <Routes key="router">
            {menuQuery.isSuccess && (
              <Route key="home" path="/" element={(<Home selectedType={type} menuList={menu.length >0 ? menu : menuQuery.data.Result}/>)} />
            )}
            
            <Route key="map" path="/map" element={<NavigationMap />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
