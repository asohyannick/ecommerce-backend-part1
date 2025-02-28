import { createRoot } from 'react-dom/client'
import App from './App.tsx';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { store, persistor } from './store/store/store.tsx';
import './index.css';
import { disableReactDevTools } from '@fvilers/disable-react-devtools';
if (process.env.NODE_ENV as string === 'production') disableReactDevTools();
createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
            <App />
        </PersistGate>
    </Provider>
);

