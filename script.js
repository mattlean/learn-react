/*** GENERAL COMPONENTS ***/
// Button that moves to next page
var NextBtn = React.createClass({
	render: function() {
		return (
			<a href="#" className="button" onClick={this.props.nextPage}>Next &raquo;</a>
		);
	}
});

var PrevBtn = React.createClass({
	render: function() {
		return (
			<a href="#" className="button" onClick={this.props.prevPage}>&laquo; Prev</a>
		);
	}
});

/*** CORE COMPONENTS ***/
// The top header area of the page
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

// The content area of the page
var Content = React.createClass({
	getInitialState: function() {
		return {currPage: <MenuPage nextPage={this.nextPage} />};
	},

	nextPage: function() {
		this.setState({currPage: <DeliveryPage prevPage={this.prevPage} />});
	},

	prevPage: function() {
		this.setState({currPage: <MenuPage nextPage={this.nextPage} />});
	},

	render: function() {
		return (
			<div id="content">
				{this.state.currPage}
			</div>
		);
	}
});


/*** MENU PAGE COMPONENTS ***/
var MenuPage = React.createClass({
	render: function() {
		return (
			<div className="fit">
				<ProductList url="products.json" />
				<NextBtn nextPage={this.props.nextPage} />
			</div>
		);
	}
});

// The list of products
var ProductList = React.createClass({
	getInitialState: function() {
		return {data: []};
	},

	// Download the products from server's JSON through AJAX
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

// An individual product
var Product = React.createClass({
	getInitialState: function() {
		var initIsOrdered = localStorage.getItem(this.props.name);
		var initHighlightState = '';

		// Load the stored values from localStorage,
		// otherwise start every product as unhighlighted
		if(initIsOrdered === 'true') {
			initIsOrdered = true;
			initHighlightState = 'highlight';
		} else {
			initIsOrdered = false;
		}

		return {
			isOrdered: initIsOrdered,
			highlightState: initHighlightState
		};
	},

	// Controls style of button depending on its highlightState
	highlightCtrl: function(event) {
		this.setState({isOrdered: !this.state.isOrdered}, function() {
			if(this.state.isOrdered) {
				this.setState({highlightState: 'highlight'});
			} else {
				this.setState({highlightState: ''});
			}

			localStorage.setItem(this.props.name, this.state.isOrdered);
		});
	},

	render: function() {
		return (
			<li className={this.state.highlightState} onClick={this.highlightCtrl}>
				<h2>{this.props.name}</h2>
				<p>{this.props.desc}</p>
			</li>
		);
	}
});

// Filter that shows and hides products
var ProductFilter = React.createClass({
	render: function() {
		return (
			<div id="product-filter">
				<input placeholder="Search for food items..."></input>
			</div>
		);
	}
});


/*** DELIVERY PAGE COMPONENTS ***/
var DeliveryPage = React.createClass({
	render: function() {
		return (
			<div className="fit">
				<p>Hello world!</p>
				<PrevBtn prevPage={this.props.prevPage} />
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
