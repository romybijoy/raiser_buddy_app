import React from "react";
import "./App.css";

const Layout = React.lazy(() => import('./components/Layout/Layout'));
function App() {
  return <Layout/>
}

export default App;
