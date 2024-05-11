import "./App.css";
import { Homepage } from "./views/homepage/";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from "react-router-dom";
import { LoginPage } from "./views/login";
import ContextProvider from "./lib/Providers";
import SignupPage from "./views/signup/Signup";
import { PrivateRoute } from "./smartComponents/PrivateRote";
import { MyPages } from "./views/myPages";
import { DesignPage } from "./views/page";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<ContextProvider />}>
      <Route path="" element={<Homepage />} />
      <Route path="login" element={<LoginPage />} exact />
      <Route path="signup" element={<SignupPage />} exact />
      <Route path="/designer" element={<PrivateRoute />}>
        <Route path="" element={<Navigate to="/my-websites" />}></Route>
      </Route>
      <Route path="/my-websites" element={<PrivateRoute />}>
        <Route path="" element={<MyPages />}></Route>
      </Route>
      <Route path="/page/:pageId" element={<PrivateRoute />}>
        <Route path="" element={<DesignPage />}></Route>
      </Route>
    </Route>,
  ),
);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
