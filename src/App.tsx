import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import BlogPost from './components/BlogPost';

const DummyComponent: React.FC = () => {
    return <p>hey</p>;
}
const App: React.FC = () => {
    return (
        <Router>
            <Route exact path="/post/:title" component={BlogPost} />
            <Route exact path="/" component={DummyComponent} />
        </Router>
    );
};

export default App;
