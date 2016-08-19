import React from 'react';
import classNames from 'classnames';

import addUserCatalogMember from '../../../../Models/addUserCatalogMember';
import createCatalogItemFromFileOrUrl from '../../../../Models/createCatalogItemFromFileOrUrl';
import createCatalogMemberFromType from '../../../../Models/createCatalogMemberFromType';
import Dropdown from '../../../Generic/Dropdown';
import getGridType from './getGridType.js';
import ObserveModelMixin from '../../../ObserveModelMixin';
import TerriaError from '../../../../Core/TerriaError';
import addUserFiles from '../../../../Models/addUserFiles';

import Styles from './add-data.scss';

// Local and remote data have different dataType options
const gridType = getGridType().gridType;
const baseURL = window.location.protocol + "//" + window.location.host + "/api/createGrid/";

/**
 * Add data panel in modal window -> Create Grid tab
 */
const AddData = React.createClass({
    mixins: [ObserveModelMixin],

    propTypes: {
        terria: React.PropTypes.object,
        viewState: React.PropTypes.object
    },

    getInitialState() {
        return {
            gridType: gridType[0], // By default select the first item (auto)
            remoteUrl: baseURL,
            xCoord: undefined,
            yCoord: undefined,
            angle: undefined
        };
    },

    selectGridOption(option) {
        this.setState({
            gridType: option,
            remoteUrl: baseURL + this.state.xCoord + "/" + this.state.yCoord + "/" + this.state.angle + "/" + option.value + "/1"
        });
    },

    handleUrl(e) {
        const url = this.state.remoteUrl;
        e.preventDefault();
        this.props.terria.analytics.logEvent('addDataUrl', url);
        const that = this;
        let promise;
        const newItem = createCatalogMemberFromType('czml', that.props.terria);
        newItem.name = '[' + that.state.gridType.value + '][' + that.state.xCoord + '][' + that.state.yCoord + '][' + that.state.angle + ']';
        newItem.url = url;
        promise = newItem.load().then(function () {
            return newItem;
        });
        addUserCatalogMember(this.props.terria, promise).then(addedItem => {
            if (addedItem && !(addedItem instanceof TerriaError)) {
                this.props.viewState.myDataIsUploadView = false;
            }
        });
    },

    onXCoordChange(event) {
        this.setState({
            xCoord: event.target.value,
            remoteUrl: baseURL + event.target.value + "/" + this.state.yCoord + "/" + this.state.angle + "/" + this.state.gridType.value + "/1"
        });
    },

    onYCoordChange(event) {
        this.setState({
            yCoord: event.target.value,
            remoteUrl: baseURL + this.state.xCoord + "/" + event.target.value + "/" + this.state.angle + "/" + this.state.gridType.value + "/1"
        });
    },

    onAngleChange(event) {
        this.setState({
            angle: event.target.value,
            remoteUrl: baseURL + this.state.xCoord + "/" + this.state.yCoord + "/" + event.target.value + "/" + this.state.gridType.value + "/1"
        });
    },

    onFinishDroppingFile() {
        this.props.viewState.isDraggingDroppingFile = false;
    },

    renderPanels() {
        const dropdownTheme = {
            dropdown: Styles.dropdown,
            list: Styles.dropdownList,
            isOpen: Styles.dropdownListIsOpen
        };
        return (
            <div>
                <label className={Styles.label}><strong>Step 1:</strong> Select type of Grid to add: </label>
                <Dropdown options={gridType} selected={this.state.gridType}
                      selectOption={this.selectGridOption} matchWidth={true} theme={dropdownTheme}/>
                <label className={Styles.label}><strong>Step 2:</strong> Enter the coordinates of the first point:</label>
                <input value={this.state.xCoord} onChange={this.onXCoordChange}
                       className={Styles.textInputTextBox}
                       type='number'
                       step='0.001'
                       min="-90"
                       max="90"
                       pattern="[0-9.]*"
                       placeholder='1'/>
                <input value={this.state.yCoord} onChange={this.onYCoordChange}
                       className={Styles.textInputTextBox}
                       type='number'
                       pattern="[0-9.]*"
                       placeholder='2'/>
                <label className={Styles.label}><strong>Step 3:</strong> Enter the angle in degrees:</label>
                <input value={this.state.angle} onChange={this.onAngleChange}
                       className={Styles.textInputTextBox}
                       type='number'
                       pattern="[0-9.]*"
                       placeholder='3'/>
                <label className={Styles.label}><strong>Step 4:</strong> Greate Grid:</label>
                <form className={Styles.urlInput} onSubmit={this.handleUrl}>
                    <input value={this.state.remoteUrl}
                           className={Styles.urlInputTextBox}
                           type='text'
                           readOnly
                           placeholder='e.g. http://data.gov.au/geoserver/wms'/>
                    <button type='submit' onClick={this.handleUrl} className={Styles.urlInputBtn}>
                        Add
                    </button>
                </form>
            </div>
        );
    },

    render() {
        return (
            <div className={Styles.inner}>
                {this.renderPanels()}
            </div>
        );
    }
});

/**
 * Loads a catalog item from a file.
 */
function loadFile(viewModel) {
    return createCatalogItemFromFileOrUrl(viewModel.props.terria, viewModel.props.viewState, viewModel.state.remoteUrl, viewModel.state.remoteDataType.value, true);
}

module.exports = AddData;
