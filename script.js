/*** GENERAL COMPONENTS ***/
// Button that moves to next page
var NextBtn = React.createClass({
	render: function() {
		return (
			<a href={this.props.href} className="button" onClick={this.props.navToPage}>Next &raquo;</a>
		);
	}
});

var PrevBtn = React.createClass({
	render: function() {
		return (
			<a href={this.props.href} className="button" onClick={this.props.navToPage}>&laquo; Prev</a>
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

// The content area of the page. Manages routing.
var Content = React.createClass({
	getInitialState: function() {
		return {currPage: <MenuPage navToPage={this.navToPage} />};
	},

	navToPage: function(event) {
		event.preventDefault();

		var shopPaths = ['/', '/delivery', '/payment', '/placeorder'];
		var newPath = event.target.pathname;

		history.pushState(null,null,newPath);

		for(var path in shopPaths) {
			if(newPath === shopPaths[0]) {
				this.setState({currPage: <MenuPage navToPage={this.navToPage} />});
				break;
			} else if(newPath === shopPaths[1]) {
				this.setState({currPage: <DeliveryPage navToPage={this.navToPage} />});
				break;
			} else if(newPath === shopPaths[2]) {
				this.setState({currPage: <PaymentPage navToPage={this.navToPage} />});
				break;
			} else if(newPath === shopPaths[3]) {
				this.setState({currPage: <PlaceOrderPage navToPage={this.navToPage} />});
				break;
			}
		}
	},

	render: function() {
		return (
			<div id="content">
				{this.state.currPage}
			</div>
		);
	}
});


/*** MENU PAGE ***/
var MenuPage = React.createClass({
	render: function() {
		return (
			<div className="fit">
				<h1>Menu</h1>
				<ProductList url="products.json" />
				<NextBtn href="delivery" navToPage={this.props.navToPage} />
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


/*** DELIVERY PAGE ***/
var DeliveryPage = React.createClass({
	render: function() {
		return (
			<div id="delivery-page" className="fit">
				<h1>When do you want your food?</h1>
				<ul>
					<li>
						<label>
							<input type="radio" name="delivery-time" />
							<p>As soon as possible!</p>
						</label>
					</li>
					<li>
						<label>
							<input type="radio" name="delivery-time" />
							<input type="date" />
							<input type="time" />
						</label>
					</li>
				</ul>
				<PrevBtn href="/" navToPage={this.props.navToPage} />
				<NextBtn href="/payment" navToPage={this.props.navToPage} />
			</div>
		);
	}
});


/** PAYMENT PAGE **/
var PaymentPage = React.createClass({
	render: function() {
		return (
			<div id="payment-page" className="fit">
				<h1>Select a payment method.</h1>
				<table>
					<thead>
						<tr>
							<td>Your Cards</td>
							<td>Name On Card</td>
							<td>Expires On</td>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>Visa ending in 1234</td>
							<td>Peregrine Robinson</td>
							<td>01/2020</td>
						</tr>
					</tbody>
				</table>
				<PrevBtn href="/delivery" navToPage={this.props.navToPage} />
				<NextBtn href="/placeorder" navToPage={this.props.navToPage} />
			</div>
		);
	}
});


/** PLACE ORDER PAGE **/
var PlaceOrderPage = React.createClass({
	render: function() {
		return (
			<div id="place-order-page" className="fit">
				<h1>Review your order.</h1>
				<PrevBtn href="/payment" navToPage={this.props.navToPage} />
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
