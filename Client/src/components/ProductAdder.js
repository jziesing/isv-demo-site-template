import React from 'react';

class ProductAdder extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
        };
    }


    prodsMarkup() {
        if(this.props.products.length > 0) {
            return this.props.products.map((obb, index) => {
                return (
                    <div key={index} class="slds-box pdBox">
                        <div class="slds-clearfix">
                            <div class="slds-float_left">
                                <div class="slds-text-heading_small prodBoxHeader">{obb.name}</div>
                                <div class="slds-text-body_small">{obb.overview}</div>
                            </div>
                            <div class="slds-float_right">
                                <div class="slds-text-heading_small prodBoxHeader">logo image</div>
                            </div>
                        </div>
                    </div>
                );
            });
        } else {
            return (
                <div class="slds-text-heading_small prodBoxHeader">no products added</div>
            );
        }
    }


    render() {

        return (
            <div class="demo-only demo-only--sizing slds-grid slds-wrap">
                <div class="slds-size_1-of-2">
                    <div class="slds-box slds-box_x-small slds-text-align_center slds-m-around_x-small">
                        <div class="slds-form slds-form_compound" >
                            <fieldset class="slds-form-element">
                                <legend class="slds-form-element__label slds-text-title_caps">Add Product</legend>
                                <div class="slds-form-element__group">
                                    <div class="slds-form-element__row">
                                        <div class="slds-form-element slds-size_1-of-1">
                                            <label class="slds-form-element__label" for="ProductName">Product Name</label>
                                            <input type="text" id="ProductName" class="slds-input" onChange={this.props.handleProductFormChange} value={this.props.pendingProduct.name} />
                                        </div>
                                    </div>
                                    <div class="slds-form-element__row">
                                        <div class="slds-form-element slds-size_1-of-1">
                                            <label class="slds-form-element__label" for="ProductOverview">Product Overview</label>
                                            <textarea id="ProductOverview" class="slds-textarea" onChange={this.props.handleProductFormChange} value={this.props.pendingProduct.overview}></textarea>
                                        </div>
                                    </div>
                                    <div class="slds-form-element__row">
                                        <div class="slds-form-element slds-size_1-of-1">
                                            <label class="slds-form-element__label" for="ProductDetailLink">Product Detail Link</label>
                                            <input type="url" id="ProductDetailLink" class="slds-input" onChange={this.props.handleProductFormChange} value={this.props.pendingProduct.productDetailLink} />
                                        </div>
                                    </div>
                                    <div class="slds-form-element__row">
                                        <div class="slds-form-element slds-size_1-of-1">
                                            <label class="slds-form-element__label" for="ProductDemoLink">Product Demo Link</label>
                                            <input type="url" id="ProductDemoLink" class="slds-input" onChange={this.props.handleProductFormChange} value={this.props.pendingProduct.productDemoLink} />
                                        </div>
                                    </div>
                                    <div class="slds-form-element__row">
                                        <div class="slds-form-element slds-size_1-of-1">
                                            <label class="slds-form-element__label" for="ProductInstructionsLink">Product Instructions Link</label>
                                            <input type="url" id="ProductInstructionsLink" class="slds-input" onChange={this.props.handleProductFormChange} value={this.props.pendingProduct.productInstructionsLink} />
                                        </div>
                                    </div>
                                    <div class="slds-form-element__row">
                                        <div class="slds-form-element slds-size_1-of-1">
                                            <button class="slds-button slds-button_brand" onClick={this.props.handleProductAddClick}>Add</button>
                                            <button class="slds-button slds-button_neutral" onClick={this.props.handleProductResetClick}>Reset</button>
                                        </div>
                                    </div>
                                </div>
                            </fieldset>
                        </div>
                    </div>
                </div>
                <div class="slds-size_1-of-2">
                    <div class="slds-box slds-box_x-small slds-text-align_center slds-m-around_x-small prodsBox">
                        <legend class="slds-form-element__label slds-text-title_caps">Products:</legend>
                        {this.prodsMarkup()}
                    </div>
                </div>
            </div>
        );
    }
}

export default ProductAdder;
