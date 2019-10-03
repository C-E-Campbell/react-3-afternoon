import React, { Component } from "react";
import axios from "axios";
import "./App.css";
import Post from "./Post/Post";
import Header from "./Header/Header";
import Compose from "./Compose/Compose";

class App extends Component {
	constructor() {
		super();

		this.state = {
			posts: []
		};

		this.updatePost = this.updatePost.bind(this);
		this.deletePost = this.deletePost.bind(this);
		this.createPost = this.createPost.bind(this);
	}

	componentDidMount() {
		axios
			.get("https://practiceapi.devmountain.com/api/posts")
			.then(response => this.setState({ posts: response.data }))
			.catch(err => console.log(`Error coming from getPosts ${err}`));
	}

	updatePost(id, text) {
		axios
			.put(`https://practiceapi.devmountain.com/api/posts?id=${id}`, {
				text
			})
			.then(response => {
				console.log(response);
				this.setState({ posts: response.data });
			})
			.catch(err => console.log(`Error coming from getPosts ${err}`));
	}

	deletePost(id) {
		axios
			.delete(`https://practiceapi.devmountain.com/api/posts?id=${id}`)
			.then(response => this.setState({ posts: response.data }))
			.catch(err => console.log(err));
	}

	createPost(text) {
		axios
			.post("https://practiceapi.devmountain.com/api/posts", { text })
			.then(response => this.setState({ posts: response.data }));
	}

	render() {
		const { posts } = this.state;
		const mappedPosts = posts.map(({ text, date, id }) => {
			return (
				<Post
					updatePostFn={this.updatePost}
					deletePostFn={this.deletePost}
					id={id}
					text={text}
					date={date}
					key={id}
				></Post>
			);
		});
		return (
			<div className='App__parent'>
				<Header />

				<section className='App__content'>
					<Compose createPostFn={this.createPost} />
					{mappedPosts}
				</section>
			</div>
		);
	}
}

export default App;
