const root = document.getElementById('root');

class InitialStructure extends React.Component {
    render() {
        return React.createElement(
            "div",
            null,
            React.createElement("div", { id: "block-1" }),
            React.createElement("div", { id: "block-2" }),
            React.createElement("div", { id: "block-3" }),
            React.createElement("div", { id: "block-4" })
        );
    }
}

class DataItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.iconClass) {
            var icon = React.createElement("i", { className: this.props.iconClass });
        } else {
            var icon = '';
        }

        if (this.props.customClass) {
            var customClass = this.props.customClass;
        } else {
            var customClass = '';
        }

        return React.createElement(
            "span",
            { id: this.props.id, className: "dataItem " + this.props.customClass },
            icon,
            "\xA0",
            this.props.value
        );
    }
}

function initializeStructure() {
    ReactDOM.render(React.createElement(InitialStructure, null), root);
}

function updateUI(data) {
    if (typeof data == 'object') {
        renderData = {};
        data.forEach(item => {
            var renderTo = item['renderTo'];
            if (!renderData[renderTo]) {
                renderData[renderTo] = [];
            }

            renderData[renderTo].push(React.createElement(DataItem, { id: item['name'],
                value: item['value'],
                iconClass: item['iconClass'],
                customClass: item['customClass']
            }));
        });

        Object.keys(renderData).forEach(blockID => {
            ReactDOM.render(renderData[blockID], document.getElementById(blockID));
        });
    }
}

function errorMessage(className, message) {
    ReactDOM.render(React.createElement("div", { className: className, dangerouslySetInnerHTML: { __html: message } }), root);
}
