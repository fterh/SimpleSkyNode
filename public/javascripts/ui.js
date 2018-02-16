const root = document.getElementById('root');

class InitialStructure extends React.Component {
    render() {
        return(
            <div>
                <div id="block-1"></div>
                <div id="block-2"></div>
                <div id="block-3"></div>
                <div id="block-4"></div>
            </div>
        );
    }
}

class DataItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.iconClass) {
            var icon = <i className={this.props.iconClass}></i>;
        }

        else { var icon = ''; }

        if (this.props.customClass) {
            var customClass = this.props.customClass;
        }
        else { var customClass = ''; }

        return(
            <span id={this.props.id} className={"dataItem " + this.props.customClass}>
                {icon}&nbsp;
                {this.props.value}
            </span>
        );
    }
}

function initializeStructure() {
    ReactDOM.render(<InitialStructure />, root);
}

function updateUI(data) {
    if (typeof(data) == 'object') {
        renderData = {}
        data.forEach((item) => {
            var renderTo = item['renderTo'];
            if (!renderData[renderTo]) {
                renderData[renderTo] = [];
            }

            renderData[renderTo].push(
                <DataItem id={item['name']}
                    value={item['value']}
                    iconClass={item['iconClass']}
                    customClass={item['customClass']}
                />
            );
        });

        Object.keys(renderData).forEach((blockID) => {
            ReactDOM.render(
                renderData[blockID],
                document.getElementById(blockID)
            );
        });
    }
}

function errorMessage(className, message) {
    ReactDOM.render(
        <div className={className} dangerouslySetInnerHTML={{__html: message}} />,
        root);
}
