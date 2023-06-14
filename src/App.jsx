import {BrowserRouter,Route} from "react-router-dom";
import {Routes} from "react-router-dom";
import Home from "./Pages/Home/Home";


const  App = () => {

    return(
        <>
            <BrowserRouter>
                <Routes>
                    <Route path='' element={<Home/>}/>
                </Routes>
            </BrowserRouter>
        </>
    )
}
export default App