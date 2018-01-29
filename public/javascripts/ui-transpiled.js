const root = document.getElementById('root');

class DataItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return React.createElement(
            "span",
            { id: this.props.id, className: "dataItem" },
            this.props.value
        );
    }
}

function updateUI(data) {
    var renderData = data.map(i => React.createElement(DataItem, { id: i[0], value: i[1] }));
    ReactDOM.render(renderData, root);
}

function errorMessage(className, message) {
    ReactDOM.render(React.createElement("div", { className: className, dangerouslySetInnerHTML: { __html: message } }), root);
}
