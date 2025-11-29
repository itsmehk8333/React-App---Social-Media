import { Route, Routes } from "react-router-dom";
import ItemsPage from "../Components/Items.Page";
import SingleItemPage from "../Components/SingleItemPage";

function RouterPage(){
    return<>
    <Routes>
        <Route path="/items" element={<ItemsPage />}  ></Route>
        <Route path="/item/:id"  element={<SingleItemPage/>}></Route>
    </Routes>
    
    </>
}

export default RouterPage;