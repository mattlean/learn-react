var CommentBox = React.createClass({
	render: function() {
		return (
			<div className="commentBox">
				<h1>Comments</h1>
				<CommentAdd />
			</div>
		);
	}
});

var CommentList = React.createClass({
	getDefaultProps: function() {
		return {data: []};
	},

	render: function() {
		var commentNodes = this.props.data.map(function(comment) {
				return (
					<Comment author={comment.author}>
					{comment.text}
					</Comment>
					);
			});
		
		return (
			<div className="commentList">
				{commentNodes}
			</div>
		);
	}
});

var CommentAdd = React.createClass({
	getInitialState: function() {
		return {data: [
			{author: 'Peter Hunt', text: 'First comment'},
			{author: 'Jordan Walke', text: '2nd comment'}
		]};
	},

	handleClick: function(e) {
		e.preventDefault();
		var newData = this.state.data;
		newData.push({author: 'lol', text: 'lolol'});
		console.log(newData);
		this.setState({data: newData});
	},

	render: function() {
		return (
			<div className="commentAdd">
				<CommentList data={this.state.data} />
				<button onClick={this.handleClick}>Add new</button>
			</div>
		);
	}
});

var Comment = React.createClass({
	render: function() {
		return (
			<div className="comment">
				<h2 className="commentAuthor">
					{this.props.author}
				</h2>
				{this.props.children}
			</div>
		);
	}
});

React.render(
	<CommentBox />,
	document.getElementById('content')
);
