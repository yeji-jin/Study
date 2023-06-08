const React = require('react');
const {Component} = React;

class ResponseCheck extends Component {
    state = {
        test: 'test22'
    };
    render(){
        return (
            <React.Fragment>
                <h1>{this.state.test}</h1>
            </React.Fragment>
        )
    }
}

module.exports = ResponseCheck;
