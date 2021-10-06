import logo from './logo.svg';
import './App.css';
import PostList from './CheckIn';
import CheckOut from './CheckOut';
import IssueTracking from './IssueTracking';
import NavBar from './NavBar';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PostForm from './PostForm';

function App() {
  return (
    //  <div className="App">
    //  {/* <PostList/> */}
    //  <PostForm/>
    // </div> 
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route exact path="/" component={PostList} />
        <Route exact path="/checkout" component={CheckOut} />
        <Route exact path="/issuetrack" component={IssueTracking} />
        
      </Switch>
    </BrowserRouter>
  );
}

export default App;
