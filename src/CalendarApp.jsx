import {AppRouter} from "./router/index.js";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import { store } from './store';

export const CalendarApp = () => {
    return (
        <Provider store={ store }>
            <BrowserRouter>
                <AppRouter />
            </BrowserRouter>
        </Provider>
    );
}