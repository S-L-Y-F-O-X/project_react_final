import {RouterProvider} from "react-router-dom";
import ReactDOM from 'react-dom/client';
import {Provider} from "react-redux";

import './index.css';
import {router} from "./router";
import {DarkModeProvider} from "./hoc/DarkModeProvider";
import store from "./redux/store";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <Provider store={store}>
    <DarkModeProvider>
        <RouterProvider router={router}/>
    </DarkModeProvider>
    </Provider>
);

