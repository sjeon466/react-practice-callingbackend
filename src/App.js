import React, { Component } from "react";
import "./App.css";
import axios from "axios";

axios.interceptors.response.use(null, error => {
  const expectedError =
    error.reponse &&
    error.response.status >= 400 &&
    error.response.status < 500;
  if (!expectedError) {
    console.log("logging the error", error);
    alert("an unexpected error occurred.");
  }
  return Promise.reject(error);
});

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

  handleDelete = async post => {
    const originalPosts = this.state.posts;

    const posts = this.state.posts.filter(p => p.id !== post.id);
    this.setState({ posts });
    try {
      //await axios.delete(apiEndPoint + "/999");
      await axios.delete("s" + apiEndPoint + "/" + post.id);
      throw new Error("");
    } catch (ex) {
      // Expected (404 : not found, 400: bad request) - Client ERRORS
      // Display a specific error message
      if (ex.response && ex.response.status === 404)
        alert("This post has already been deleted.");
      // Unexpected (network down, server down, db down, bug)
      // -Log them
      // -Display a generic and friendly error message

      this.setState({ posts: originalPosts });
    }
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
