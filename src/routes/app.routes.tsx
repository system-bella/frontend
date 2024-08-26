import { Switch, Route, useHistory } from 'react-router-dom';
import Layout from '../layout';
//pages
import Login from '../pages/Login';
import Product from '../pages/Product';
import Orders from '../pages/Orders';
import Customer from '../pages/Customer';
import Report from '../pages/Report';
import CreateOrders from '../components/ModalOrder/Create';
import PageTest from '../pages/PageTest';
import User from '../pages/User';
import Supplier from '../pages/Supplier';
import { useUser } from '../api/contextApi/userContext';
import { useEffect } from 'react';

export default function AppRoutes() {
  const user = useUser();
  const history = useHistory();

  return (
    <Switch>
      <Route path="/" exact component={Login} />
      <Route path="/PageTest" exact component={PageTest} />
      {
        user.user &&
        <Layout>
          <Route path="/Orders" exact component={Orders} />
          <Route path="/Client" exact component={Customer} />
          <Route path="/Product" exact component={Product} />
          <Route path="/usuario" exact component={User} />
          <Route path="/Orders/Create" exact component={CreateOrders} />
          <Route path="/Report" exact component={Report} />
          <Route path="/Supplier" exact component={Supplier} />
        </Layout>
      }
    </Switch>
  )
}
