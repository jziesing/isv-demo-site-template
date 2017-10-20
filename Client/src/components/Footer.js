import React from 'react';
import {Link} from 'react-router';


class Footer extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <footer class="footer">
                <div class="container">
                    <div class="row">
                        <div class="col-md-4">
                            <p class="text-muted">&copy; { new Date().getFullYear() + ' ' + this.props.appName }</p>
                        </div>
                        <div class="col-md-4 col-md-offset-4 navBtn">
                            <Link to={this.props.btnInfo.path}>{this.props.btnInfo.label}</Link>
                        </div>
                    </div>
                </div>
            </footer>
        );
    }
}

export default Footer;
