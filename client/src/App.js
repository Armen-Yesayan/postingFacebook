import React, {useEffect, useState} from "react";
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import Profile from "./components/Profile";
import CreatePost from "./components/CreatePost";
import SelectGroup from "./components/SelectGroup";

const App = () => {

    const [token, setToken] = useState(false);
    const [groups, setGroups] = useState('')

    useEffect(() => {
        if(localStorage.jwt_token) {
            setToken(true)
        }
    }, [localStorage])


    return (
        <Router>
            <div className="App">
                <Navbar token={token} setToken={setToken}/>
                <Route exact path='/' component={Home}/>
                <div className="container">
                    <Route exact path='/register' component={Register}/>
                    <Route exact path='/login'>
                        <Login setToken={setToken}/>
                    </Route>
                    <Route exact path='/profile'>
                        <Profile setGroups={setGroups}/>
                    </Route>
                    <Route exact path='/create-post'>
                        <SelectGroup groups={groups} setGroups={setGroups} />
                    </Route>
                </div>
            </div>
        </Router>
    );
}

export default App;
