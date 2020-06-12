import React from 'react';
import { Layout } from 'antd';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import MenuTop from "./components/menuTop/MenuTop";

// Pages
import Home from './pages/Home';
import Error404 from './pages/error404/Error404';
import Movie from './pages/movie/Movie';
import NewMovies from './pages/New-Movies';
import Popular from './pages/Popular';
import Search from './pages/search/Search';

function App() {
  const { Header, Content } = Layout;
  return (
    <Layout>   
      <Router>
        <Header style={{zIndex: 1}}>
          <MenuTop />
        </Header>
        
        <Content>
          <Switch>  {/* Sirve para cuando encuentra la página no siga buscando*/}
            <Route exact path="/" component={Home}/>
            <Route path="/popular" component={Popular}/>
            <Route path="/search" component={Search} />
            <Route path="/new-movies" component={NewMovies} />
            <Route path="/movie/:id" component={Movie} />        
            <Route component={Error404}/>
          </Switch>
        </Content>        
      </Router>   
    </Layout>    
  );
}

export default App;
