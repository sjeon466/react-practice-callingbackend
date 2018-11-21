import React, { Component } from "react";
import "./App.css";
import axios from "axios";

const apiEndPoint = "http://jsonplaceholder.typicode.com/posts";
class App extends Component {
  state = {
    posts: []
  };

  async componentDidMount() {
    // pending -> resolved (success) OR rejected (failure)

    //const promise = axios.get("http://jsonplaceholder.typicode.com/posts");

    //console.log(promise);
    //promise.then()  // old way

    //const response = await promise;
    //console.log(response);

    //const response = await axios.get("http://jsonplaceholder.typicode.com/posts");
    const { data: posts } = await axios.get(apiEndPoint);
    this.setState({ posts });
  }

  handleAdd = async () => {
    console.log("Add");
    const obj = { title: "a", body: "b" };
    const { data: post } = await axios.post(apiEndPoint, obj);
    console.log(post);

    const posts = [post, ...this.state.posts];
    this.setState({ posts });
  };

  handleUpdate = async post => {
    post.title = "UPDATED";
    await axios.put(apiEndPoint + "/" + post.id, post);
    //console.log(data);

    //axios.patch(apiEndPoint + "/" + post.id, {title : post.title});
    //console.log("Update", post);
    const posts = [...this.state.posts];
    const index = posts.indexOf(post);

    posts[index] = { ...post };
    this.setState({ posts });
  };

  handleDelete = post => {
    console.log("Delete", post);
  };

  render() {
    return (
      <React.Fragment>
        <button className="btn btn-primary" onClick={this.handleAdd}>
          Add
        </button>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.state.posts.map(post => (
              <tr key={post.id}>
                <td>{post.title}</td>
                <td>
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => this.handleUpdate(post)}
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => this.handleDelete(post)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default App;
