import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import BlogPost from './components/BlogPost';

const App: React.FC = () => {
    return (
        <Router>
            <Route exact path="/post/:title" component={BlogPost} />
        </Router>
    );
};

export default App;
