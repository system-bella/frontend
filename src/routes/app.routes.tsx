import { Switch, Route } from 'react-router-dom';
import Layout from '../layout';
//pages
import Login from '../pages/Login';
import Product from '../pages/Product';
import Orders from '../pages/Orders';
import Customer from '../pages/Customer';
import Report from '../pages/Report';
import CreateProduct from '../components/CreateProduct';
import CreateOrders from '../components/ModalOrder/CreateOrders';
import CreateClient from '../components/ModalCustomer/CreateClient';
import PageTest from '../pages/PageTest';
import User from '../pages/User';
import EditClient from '../components/ModalCustomer/Update';

const AppRoutes = () => (
  <Switch>
    <Route path="/" exact component={Login} />
    <Route path="/PageTest" exact component={PageTest} />
    <Layout>
      <Route path="/Orders" exact component={Orders} />
      <Route path="/Client" exact component={Customer} />
      <Route path="/Product" exact component={Product} />
      <Route path="/usuario" exact component={User} />
      <Route path="/Orders/Create" exact component={CreateOrders} />
      <Route path="/Product/Create" exact component={CreateProduct} />
      <Route path="/Client/Create" exact component={CreateClient} />
      <Route path="/Report" exact component={Report} />
      <Route path="/Client/Update" exact component={EditClient} />
    </Layout>
  </Switch>
);

export default AppRoutes;
