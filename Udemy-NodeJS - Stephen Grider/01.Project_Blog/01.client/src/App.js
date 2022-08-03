import React, { Component } from 'react';
import PostCreate from './PostCreate';

class App extends Component {
    render() {
        return (
            <div className='container'>
                <h1>Create Post</h1>
                <PostCreate></PostCreate>
            </div>
        );
    }
};
export default App;