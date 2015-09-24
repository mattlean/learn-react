var Header = React.createClass({
	render: function() {
		return (
			<div id="header">
				<h1>React Restaurant Menu</h1>
			</div>
		);
	}
});

var Content = React.createClass({
	render: function() {
		return (
			<div id="content">
				<ProductList url="products.json"/>
			</div>
		);
	}
});

var ProductList = React.createClass({
	getInitialState: function() {
		return {data: []};
	},
	componentDidMount: function() {
		$.ajax({
			url: this.props.url,
			dataType: 'json',
			cache: false,
			success: function(data) {
				this.setState({data: data});
			}.bind(this),
			error: function(xhr, status, err) {
				console.log(this.props.url, status, err.toString());
			}.bind(this)
		});
	},
	render: function() {
		var productNodes = this.state.data.map(function (product) {
			return (
				<Product name={product.name}>
					{product.desc}
				</Product>
			);
		});
		return (
			<div id="menu">
				<ProductFilter />
				<div className="product-list">
					{productNodes}
				</div>
			</div>
		);
	}
});

var Product = React.createClass({
	render: function() {
		return (
			<div className="product">
				<h2>{this.props.name}</h2>
				<p>{this.props.children}</p>
			</div>
		);
	}
});

var ProductFilter = React.createClass({
	render: function() {
		return (
			<div className="product-filter">
				<input placeholder="Search for food items..."></input>
			</div>
		);
	}
});

React.render(
	<div id="wrapper">
		<Header />
		<Content />
	</div>,
	document.querySelector('body')
);
