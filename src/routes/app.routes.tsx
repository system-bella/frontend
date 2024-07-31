import { Switch, Route } from 'react-router-dom';
import Layout from '../layout';
//pages
import Login from '../pages/Login';
import Product from '../pages/Product';
import Orders from '../pages/Orders';
import Customer from '../pages/Customer';
import Report from '../pages/Report';
import CreateProduct from '../components/CreateProduct';
import CreateOrders from '../components/CreateOrders';
import CreateClient from '../components/CreateClient';

const AppRoutes = () => (
  <Switch>
    <Route path="/" exact component={Login} />
    <Layout>
      <Route path="/Orders" exact component={Orders} />
      <Route path="/Customer" exact component={Customer} />
      <Route path="/Product" exact component={Product} />
      <Route path="/Orders/Create" exact component={CreateOrders} />
      <Route path="/Product/Create" exact component={CreateProduct} />
      <Route path="/Client/Create" exact component={CreateClient} />
      <Route path="/Report" exact component={Report} />
    </Layout>
  </Switch>
);

export default AppRoutes;
