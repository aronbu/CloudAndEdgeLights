import {BrowserRouter,Route} from "react-router-dom";
import {Routes} from "react-router-dom";
import Home from "./Pages/Home/Home";
import Security from "./Pages/Security/Security";


const  App = () => {

    return(
        <>
            <BrowserRouter>
                <Routes>
                    <Route path='' element={<Home/>}/>
                    <Route path='/security' element={<Security/>}/>
                </Routes>
            </BrowserRouter>
        </>
    )
}
export default App