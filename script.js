/*React.render(
	<h1>Hello world!</h1>,
	document.getElementById('example')
);*/

var ProductTable = React.createClass({
	render: function() {
		return (
			<div className="product-table">
				I am the Product Table
			</div>
		);
	}
});

React.render(
	<ProductTable />,
	document.getElementById('content')
);
