const root = document.getElementById('root');

class DataItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <span id={this.props.id} className="dataItem">
                {this.props.value}
            </span>
        );
    }
}

function updateUI(data) {
    var renderData = data.map((i) =>
        <DataItem id={i[0]} value={i[1]} />
    );
    ReactDOM.render(renderData, root);
}

function errorMessage(className, message) {
    ReactDOM.render(
        <div className={className} dangerouslySetInnerHTML={{__html: message}} />,
        root);
}
