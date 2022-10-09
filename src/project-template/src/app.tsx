import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Provider from "./store/index";
import Routers from "./routes/index";

const App = () => {
  useEffect(() => {
    let a: number = 1;
    a = 22222;
    console.log(a);
    // console.log(add(1,a));
  }, []);
  // const onClick = () => {
  //   console.log(676767);
  //   import(/* webpackMode: "lazy" */ './tree-shaking').then((res) => {
  //     console.log(res);
  //   }).catch((err) => {
  //     console.log(err);
  //   })
  // }
  return (
    <BrowserRouter>
      <Provider>
        <Routers />
      </Provider>
    </BrowserRouter>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(<App />);
