var Header = React.createClass({
	render: function() {
		return (
			<div id="header">
				<div className="fit">
					<h1>React Pizzaria</h1>
				</div>
			</div>
		);
	}
});

var Content = React.createClass({
	render: function() {
		return (
			<div id="content">
				<div className="fit">
					<ProductList url="products.json"/>
				</div>
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
				<Product name={product.name} desc={product.desc} />
			);
		});
		return (
			<div id="menu">
				<ProductFilter />
				<ul id="product-list">
					{productNodes}
				</ul>
			</div>
		);
	}
});

var Product = React.createClass({
	getInitialState: function() {
		return {
			isOrdered: false,
			highlightState: ''
		};
	},

	handleClick: function(event) {
		this.state.isOrdered = !this.state.isOrdered;
		
		if(this.state.isOrdered) {
			this.setState({highlightState: 'highlight'});
		} else {
			this.setState({highlightState: ''});
		}
	},
	
	render: function() {
		return (
			<li className={this.state.highlightState} onClick={this.handleClick}>
				<h2>{this.props.name}</h2>
				<p>{this.props.desc}</p>
			</li>
		);
	}
});

var ProductFilter = React.createClass({
	render: function() {
		return (
			<div id="product-filter">
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
