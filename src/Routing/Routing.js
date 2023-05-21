import React from 'react';
import { Route } from 'react-router-dom';
import Layout from './../Components/Layout/Layout';
import Category from './../Pages/Category/Category';

const Routing = ({mainPath,path}) => {
    return (
        <div>
             <Route
                exact
                path="/category"
                element={
                  <Layout>
                    <Category />
                  </Layout>
                }
              ></Route>

           <Route
                exact
                path={`/${mainPath}/${path}`}
                element={
                  <Layout>
                    <Category />
                  </Layout>
                }
              ></Route>
        </div>
    );
};

export default Routing;