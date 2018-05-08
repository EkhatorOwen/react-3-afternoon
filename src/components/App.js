import React, { Component } from 'react';
import axios from 'axios'; 

import './App.css';

import Header from './Header/Header';
import Compose from './Compose/Compose';
import Post from './Post/Post.js'

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: []
    };

    this.updatePost = this.updatePost.bind( this );
    this.deletePost = this.deletePost.bind( this );
    this.createPost = this.createPost.bind( this );
  }
  
  componentDidMount() {
    axios.get('https://practiceapi.devmountain.com/api/posts')
    .then((response)=>{
     // console.log(response.data)
      this.setState({posts: response.data})
    })
    .catch(console.log)

  }

  updatePost(id, text) {
  
    axios.put(`https://practiceapi.devmountain.com/api/posts?id=${id}`,{text})
          .then(request =>{
            this.setState({posts: request.data})
          })

  }

  deletePost(id) {

    axios.delete(`https://practiceapi.devmountain.com/api/posts?id=${id}`)
          .then(request=>{
            this.setState({posts: request.data})
          })
          .catch(console.log)
          

  }

  createPost(text) {

    axios.post(`https://practiceapi.devmountain.com/api/posts`,{text})
          .then(request=>{
            this.setState({posts: request.data})
          })
          .catch(console.log)

  }

 

  render() {
    const { posts } = this.state;

    return (
      <div className="App__parent">
        <Header />

        <section className="App__content">

          <Compose 
          createPostFn ={ this.createPost }
          />
          {posts.map(post=>(
            <Post 
            key={ post.id }
            text={ post.text }
            date={ post.date }
            updatePostFn= { this.updatePost }
            id = { post.id }
            deletePostFn ={ this.deletePost }
            
            />
          ))}
        </section>
      </div>
    );
  }
}

export default App;
