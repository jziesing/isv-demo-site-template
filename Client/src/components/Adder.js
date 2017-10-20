/*
 *  @Adder.js
 *
 *      props:
 *          obj_params {
 *              fields: [{label, type, id, value}...]
 *              handleChange: function
 *              handleEnter: function
 *
 */

import React from 'react';

class Adder extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
        };
    }

    formElems() {
        if(this.props.fields.length > 0) {
            return this.props.fields.map((obj, index) => {
                return (
                    <div key={index} class="form-group">
                        <label for={obj.id}>{obj.label}</label>
                        <input type={obj.type} class="form-control" id={obj.id} placeholder={obj.label} value={obj.value} onChange={this.props.handleChange} />
                    </div>
                );
            });
        } else {
            return null;
        }
    }


    render() {

        return (
            <div>
                {this.formElems()}
                <button type="button" class="btn btn-sm btn-default" onClick={this.props.handleEnter}>{this.props.buttonLabel}</button>
            </div>
        );
    }
}

export default Adder;
