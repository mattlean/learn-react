var CommentBox = React.createClass({
	render: function() {
		return (
			<div className="commentBox">
				<h1>Comments</h1>
				<CommentList />
				<CommentForm />
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

var CommentForm = React.createClass({
	render: function() {
		var data = [
			{author: 'Peter Hunt', text: 'First comment'},
			{author: 'Jordan Walke', text: '2nd comment'}
		];

		return (
			<div className="commentForm">
				<CommentList data={data} />
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
