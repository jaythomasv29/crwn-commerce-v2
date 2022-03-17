import { Routes, Route } from "react-router-dom";
import Authentication from "./routes/authentication/authentication.component";

import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";
import Shop from "./routes/shop/shop.component";


const App = () => {
  return (
    <Routes>
      {/* Nest routes */}
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop" element={<Shop />} />
        <Route path="auth" element={<Authentication />} />
      </Route>
      {/* <Route path='contact' element={<Footer />} /> */}
    </Routes>
  );
};

export default App;
