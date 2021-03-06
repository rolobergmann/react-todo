import React from "react";
import "./todoInput.css";

export default class TodoInput extends React.Component {
	constructor(props) {
		super(props);
		this.itemInput = React.createRef();
		this.state = {
			value: "",
			list: [
				{ id: 0, text: "Make dinner tonight!" },
				{ id: 1, text: "Fold the laundry." },
				{ id: 2, text: "Learn to make a React app!" }
			],
			nextId: 3,
			isHovering: false
		};
		this.mhandleMouseHover = this.handleMouseHover.bind(this);
		this.addItem = this.addItem.bind(this);
		this.removeItem = this.removeItem.bind(this);
		this.addValue = this.addValue.bind(this);
		this.handleMouseHover = this.handleMouseHover.bind(this);
	}

	handleMouseHover() {
		this.setState(this.toggleHoverState);
	}

	toggleHoverState(state) {
		return {
			isHovering: !state.isHovering
		};
	}

	addItem(newText) {
		newText.preventDefault();
		let b = this.state.list.slice();
		console.log(b);
		b.push({
			id: this.state.nextId,
			text: this.itemInput.current.value
		});
		this.setState({
			isHovering: false,
			list: b,
			nextId: b.length + 1
		});
		this.itemInput.current.value = "";
	}

	addValue = event => {
		this.setState({
			value: event.target.value
		});
	};

	removeItem(id) {
		console.log("hello", id);

		this.setState({
			list: this.state.list.filter((item, index) => item.id !== id)
		});
	}

	render() {
		return (
			<div>
				<ul className="list-group">
					<li className="list-group-item">
						<br />
						<form onSubmit={this.addItem}>
							<input
								type="text"
								className="form-control-plaintext"
								placeholder="What needs to be done?"
								onChange={this.addValue}
								ref={this.itemInput}
							/>
						</form>
					</li>
					{this.state.list.map(item => {
						return (
							<li
								onMouseEnter={this.handleMouseHover}
								onMouseLeave={this.handleMouseHover}
								className="list-group-item"
								key={item.id}
								id={item.id}>
								<p className="itemText">{item.text}</p>

								{this.state.isHovering && (
									<a
										className="removeItem"
										href="#"
										onClick={() =>
											this.removeItem(item.id)
										}>
										X
									</a>
								)}
							</li>
						);
					})}
				</ul>
			</div>
		);
	}
}
