const root = document.getElementById('root');

class DataItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.hasIcon) {
            var icon = <i class={this.props.iconClass}></i>;
        }
        else {
            var icon = "";
        }

        return(
            <span id={this.props.id} className="dataItem">
                {icon}&nbsp;
                {this.props.value}
            </span>
        );
    }
}

function updateUI(data) {
    var renderData = data.map((i) =>
        <DataItem id={i[0]} value={i[1]} hasIcon={i[2]} iconClass={i[3]} />
    );
    ReactDOM.render(renderData, root);
}

function errorMessage(className, message) {
    ReactDOM.render(
        <div className={className} dangerouslySetInnerHTML={{__html: message}} />,
        root);
}
