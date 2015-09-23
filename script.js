var data = [
  {name: 'Pesto Chicken', desc: 'grilled chicken, monterey jack cheese, roasted red peppers, tomato, mixed greens, pesto'},
  {name: 'Bay Shrimp Melt', desc: 'bay shrimp salad, monterey jack cheese, tomato, avocado'},
  {name: 'Margherita al Fresco', desc: 'mozzarella, tomato, pesto, balsamic vinaigrette'}
];

var ProductList = React.createClass({
	render: function() {
		var productNodes = this.props.data.map(function (product) {
			return (
				<Product name={product.name}>
					{product.desc}
				</Product>
			);
		});
		return (
			<div className="product-list">
				{productNodes}
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

React.render(
	<ProductList data={data}/>,
	document.getElementById('menu')
);
