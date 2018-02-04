const root = document.getElementById('root');

class DataItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.hasIcon) {
            var icon = React.createElement("i", { "class": this.props.iconClass });
        } else {
            var icon = "";
        }

        return React.createElement(
            "span",
            { id: this.props.id, className: "dataItem" },
            icon,
            "\xA0",
            this.props.value
        );
    }
}

function updateUI(data) {
    var renderData = data.map(i => React.createElement(DataItem, { id: i[0], value: i[1], hasIcon: i[2], iconClass: i[3] }));
    ReactDOM.render(renderData, root);
}

function errorMessage(className, message) {
    ReactDOM.render(React.createElement("div", { className: className, dangerouslySetInnerHTML: { __html: message } }), root);
}
