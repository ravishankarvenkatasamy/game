import { BrowserRouter, Routes, Route } from "react-router-dom";
import TableList from './TableList'
import App from './App'



function Routing() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={App}> </Route>
        <Route path="/TableList" Component={TableList}> </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default Routing