import { Outlet, Routes, Route } from "react-router-dom";
import SignIn from "./components/sign-in/sign-in.component";

import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";

const Shop = () => {
  return <h1>I am the shop page</h1>;
};



// const Footer = () => {
//   return (
//     <h1>I am the footer page</h1>
//   )
// }

const App = () => {
  return (
    <Routes>
      {/* Nest routes */}
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop" element={<Shop />} />
        <Route path="signin" element={<SignIn />} />
      </Route>
      {/* <Route path='contact' element={<Footer />} /> */}
    </Routes>
  );
};

export default App;
