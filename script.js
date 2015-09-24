/*** GENERAL COMPONENTS ***/
// Button that moves to next page
var NextBtn = React.createClass({
	navToPage: function(event) {
		event.preventDefault();
		this.props.navToPage();
	},

	render: function() {
		return (
			<form onSubmit={this.navToPage}>
				<input type="submit" value="Next &raquo;" />
			</form>
		);
	}
});

var PrevBtn = React.createClass({
	render: function() {
		return (
			<button onClick={this.props.navToPage}>&laquo; Prev</button>
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

	// Controls page navigation on next or prev button press
	navToPage: function(event) {
		var shopPaths = ['/', '/delivery', '/payment', '/placeorder'];
		var currPath = location.pathname;
		var newPath = '';

		if(event !== undefined) {
			event.preventDefault();

			// Navigate prev
			for(var path in shopPaths) {
				if(currPath === shopPaths[3]) {
					this.setState({currPage: <PaymentPage navToPage={this.navToPage} />});
					newPath = shopPaths[2];
					break;
				} else if(currPath === shopPaths[2]) {
					this.setState({currPage: <DeliveryPage navToPage={this.navToPage} />});
					newPath = shopPaths[1];
					break;
				} else if(currPath === shopPaths[1]) {
					this.setState({currPage: <MenuPage navToPage={this.navToPage} />});
					newPath = shopPaths[0];
					break;
				}
			}
		} else {
			// Navigate next
			for(var path in shopPaths) {
				if(currPath === shopPaths[0]) {
					this.setState({currPage: <DeliveryPage navToPage={this.navToPage} />});
					newPath = shopPaths[1];
					break;
				} else if(currPath === shopPaths[1]) {
					this.setState({currPage: <PaymentPage navToPage={this.navToPage} />});
					newPath = shopPaths[2];
					break;
				} else if(currPath === shopPaths[2]) {
					this.setState({currPage: <PlaceOrderPage navToPage={this.navToPage} />});
					newPath = shopPaths[3];
					break;
				}
			}
		}

		history.pushState(null,null,newPath);
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
			<div id="menu-page" className="fit">
				<div id="page-header"><h1>Menu</h1></div>
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
		var orders = JSON.parse(localStorage.getItem('orders'));
		var initHighlightState = '';
		var initIsOrdered = false;

		// Load the stored values from localStorage if there are any
		if(orders !== null && orders[this.props.name] !== undefined) {
			if(orders[this.props.name].ordered) {
				initIsOrdered = true;
				initHighlightState = 'highlight';
			}
		}

		return {
			isOrdered: initIsOrdered,
			highlightState: initHighlightState
		};
	},

	// Controls style of button depending on its highlightState
	highlightCtrl: function() {
		this.setState({isOrdered: !this.state.isOrdered}, function() {
			if(this.state.isOrdered) {
				this.setState({highlightState: 'highlight'});
			} else {
				this.setState({highlightState: ''});
			}

			// Creates JSON object to store all orders
			var orders = JSON.parse(localStorage.getItem('orders'));

			if(orders === null) {
				orders = {};
			}

			orders[this.props.name] = {'ordered': this.state.isOrdered};
			localStorage.setItem('orders', JSON.stringify(orders));
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
				<div id="page-header"><h1>Delivery</h1></div>
				<DeliveryForm navToPage={this.props.navToPage} />
			</div>
		);
	}
});

var DeliveryForm = React.createClass({
	getInitialState: function() {
		// Load the stored values from localStorage if there are any
		var initName = localStorage.getItem('name');
		var initPhone = localStorage.getItem('phone');
		var initAddressLine1 = localStorage.getItem('address-line-1');
		var initAddressLine2 = localStorage.getItem('address-line-2');
		var initCity = localStorage.getItem('city');
		var initState = localStorage.getItem('state');
		var initZip = localStorage.getItem('zip');

		return {
			name: initName,
			phone: initPhone,
			addressLine1: initAddressLine1,
			addressLine2: initAddressLine2,
			city: initCity,
			region: initState,
			zip: initZip
		};
	},

	addressSet: function(event) {
		localStorage.setItem(event.target.name, event.target.value);
	},

	timeSelect: function(event) {
		localStorage.setItem('time', event.target.value);
	},

	formValidate: function(event) {
		event.preventDefault();
		if (event.target.checkValidity()) {
			this.props.navToPage();
		}
	},

	render: function() {
		return (
			<form onSubmit={this.formValidate}>
				<h2>Who do we contact?</h2>
				<label>
					Name:
					<input type="text" name="name" onChange={this.addressSet} defaultValue={this.state.name} required />
				</label>
				<label> 
					Phone Number:
					<input type="tel" name="phone" onChange={this.addressSet} defaultValue={this.state.phone} required />
				</label>
				<h2>Where do you want your food?</h2>
				<label>
					Address line 1:
					<input type="text" name="address-line-1" onChange={this.addressSet} defaultValue={this.state.addressLine1} required />
				</label>
				<label>
					Address line 2:
					<input type="text" name="address-line-2" onChange={this.addressSet} defaultValue={this.state.addressLine2} />
				</label>
				<label>
					City:
					<input type="text" name="city" onChange={this.addressSet} defaultValue={this.state.city} required />
				</label>
				<label>
					State:
					<input type="text" name="state" onChange={this.addressSet} defaultValue={this.state.region} required />
				</label>
				<label>
					ZIP
					<input type="number" name="zip" onChange={this.addressSet} defaultValue={this.state.zip} required />
				</label>
				<h2>When do you want your food?</h2>
				<ul>
					<li>
						<label>
							<input type="radio" value="ASAP" name="delivery-time" onClick={this.timeSelect} required />
							<p>As soon as possible!</p>
						</label>
					</li>
					<li>
						<label>
							<input type="radio" value="set-time" name="delivery-time" onClick={this.timeSelect} required />
							<input type="date" />
							<input type="time" />
						</label>
					</li>
				</ul>
				<PrevBtn navToPage={this.props.navToPage} />
				<input type="submit" value="Next &raquo;" />
			</form>
		);
	}
});


/** PAYMENT PAGE **/
var PaymentPage = React.createClass({
	render: function() {
		return (
			<div id="payment-page" className="fit">
				<div id="page-header"><h1>Payment</h1></div>
				<PaymentForm navToPage={this.props.navToPage} />
			</div>
		);
	}
});

var PaymentForm = React.createClass({
	cardSelect: function(event) {
		localStorage.setItem('card', event.target.value)
	},

	formValidate: function(event) {
		event.preventDefault();
		if (event.target.checkValidity()) {
			this.props.navToPage();
		}
	},

	render: function() {
		return (
			<form onSubmit={this.formValidate}>
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
							<td><input type="radio" value="Visa 1234" name="card" onClick={this.cardSelect} required />Visa ending in 1234</td>
							<td>Peregrine Robinson</td>
							<td>01/2020</td>
						</tr>
						<tr>
							<td><input type="radio" value="Mastercard 4567" name="card" onClick={this.cardSelect} required />Mastercard ending in 4567</td>
							<td>Peregrine Robinson</td>
							<td>01/2020</td>
						</tr>
						<tr>
							<td><input type="radio" value="Discover 8901" name="card" onClick={this.cardSelect} required />Discover ending in 8901</td>
							<td>Peregrine Robinson</td>
							<td>01/2020</td>
						</tr>
					</tbody>
				</table>
				<PrevBtn navToPage={this.props.navToPage} />
				<input type="submit" value="Next &raquo;" />
			</form>
		);
	}
});


/** PLACE ORDER PAGE **/
var PlaceOrderPage = React.createClass({
	getInitialState: function() {
		var initOrders = JSON.parse(localStorage.getItem('orders'));
		var initName = localStorage.getItem('name');
		var initPhone = localStorage.getItem('phone');
		var initAddressLine1 = localStorage.getItem('address-line-1');
		var initAddressLine2 = localStorage.getItem('address-line-2');
		var initCity = localStorage.getItem('city');
		var initState = localStorage.getItem('state');
		var initZip = localStorage.getItem('zip');
		var initTime = localStorage.getItem('time');
		var initCard = localStorage.getItem('card');

		return {
			orders: initOrders,
			name: initName,
			phone: initPhone,
			addressLine1: initAddressLine1,
			addressLine2: initAddressLine2,
			city: initCity,
			region: initState,
			zip: initZip,
			time: initTime,
			card: initCard
		};
	},

	render: function() {
		var address = this.state.addressLine1;
		if(this.state.addressLine2 != '') {
			address += ', ' + this.state.addressLine2;
		}

		return (
			<div id="place-order-page" className="fit">
				<div id="page-header"><h1>Review Your Order</h1></div>
				<div id="order-summary">
					<h2>You ordered...</h2>
					<OrderList orders={this.state.orders} />
					<h2>We are delivering to...</h2>
					<p>{this.state.name} at {this.state.phone} at the following address at {this.state.time}:</p>
					<p>{address}, {this.state.city}, {this.state.region}, {this.state.zip}</p>
					<h2>You are paying with...</h2>
					<p>{this.state.card}</p>
					<PrevBtn href="/payment" navToPage={this.props.navToPage} />
				</div>
			</div>
		);
	}
});

// The list of orders
var OrderList = React.createClass({
	render: function() {
		orderArray = [];

		for(var order in this.props.orders) {
			if(this.props.orders[order].ordered === true) {
				var newObject = {
					'name': order,
					'data': this.props.orders[order]
				};
				orderArray.push(newObject);
			}
		}

		var orderNodes = orderArray.map(function (order) {
			return (
				<Order name={order.name} />
			);
		});
		return (
			<ul id="order-list">
				{orderNodes}
			</ul>
		);
	}
});

// An individual order
var Order = React.createClass({
	render: function() {
		return (
			<li>{this.props.name}</li>
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
