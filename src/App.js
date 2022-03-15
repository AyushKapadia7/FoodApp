import { useContext } from 'react';

import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals';
import Cart from './components/Cart/Cart';
// import CartProvider from './store/CartProvider';
import AuthContext, { AuthContextProvider } from './store/auth-context';

function App() {
const ctx = useContext(AuthContext)

  return (
    <AuthContextProvider>
      {ctx.cartIsShown && <Cart onClose={ctx.hideCartHandler} />}
      <Header onShowCart={ctx.showCartHandler} />
      <main>
        <Meals />
      </main>
    </AuthContextProvider>
  );
}

export default App;
