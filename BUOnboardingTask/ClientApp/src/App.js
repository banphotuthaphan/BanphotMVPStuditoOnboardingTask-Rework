import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import Customers from './components/Customers';
import Sales from './components/Sales';
import Stores from './components/Stores';
import Products from './components/Products';
import NotFound from './components/notFound';

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <Layout>
                <Switch>
                    <Route  exact path='/' component={Home} />
                    <Route path='/customers' component={Customers} />
                    <Route path='/sales' component={Sales} />
                    <Route path='/stores' component={Stores} />
                    <Route path='/products' component={Products} />
                    <Route path='/not-found' component={NotFound} />
                    <Redirect to='/not-found' />
                </Switch>
            </Layout>
        );
    }
}
