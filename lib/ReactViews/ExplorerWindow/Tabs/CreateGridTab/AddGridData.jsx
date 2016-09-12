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
import checkGridInput from '../../../../Models/checkGridInput';

import Styles from './add-grid-data.scss';

// Local and remote data have different dataType options
const gridType = getGridType().gridType;
const baseURL = window.location.protocol + "//" + window.location.host + "/api/createGrid/";
var gridLevel = [{ value: 'points', name: 'Points' },{ value: '1', name: 'Level 1' }, { value: 'area', name: 'Areas' } ]


/**
 * Add data panel in modal window -> Create Grid tab
 */
const AddGridData = React.createClass({
    mixins: [ObserveModelMixin],

    propTypes: {
        terria: React.PropTypes.object,
        viewState: React.PropTypes.object
    },

    getInitialState() {
        return {
            gridType: gridType[0], // By default select the first item (auto)
            gridLevel: gridLevel[0],
            remoteUrl: baseURL,
            xCoord: 0.0,
            yCoord: 0.0,
            angle: 0.0
        };
    },

    selectGridType(option) {
        this.setState({
            gridType: option,
            remoteUrl: baseURL + this.state.xCoord + "/" + this.state.yCoord + "/" + this.state.angle + "/" + option.value + "/" + this.state.gridLevel.value
        });
    },

    selectGridLevel(option) {
        this.setState({
            gridLevel: option,
            remoteUrl: baseURL + this.state.xCoord + "/" + this.state.yCoord + "/" + this.state.angle + "/" + this.state.gridType.value + "/" + option.value
        });
    },


    handleUrl(e) {
        const url = this.state.remoteUrl;
        e.preventDefault();
        this.props.terria.analytics.logEvent('addDataUrl', url);
        const that = this;
        if (checkGridInput(that.props, that.state)) {
            let promise;
            const newItem = createCatalogMemberFromType('czml', that.props.terria);
            newItem.name = '[' + that.state.gridType.value + '][' + that.state.xCoord + '][' + that.state.yCoord + '][' + that.state.angle + '][' + that.state.gridLevel.value + ']';
            newItem.url = url;
            promise = newItem.load().then(function () {
                return newItem;
            });
            addUserCatalogMember(this.props.terria, promise).then(addedItem => {
                if (addedItem && !(addedItem instanceof TerriaError)) {
                    this.props.viewState.myDataIsUploadView = false;
                }
            });
        }
    },

    onXCoordChange(event) {
        this.setState({
            xCoord: event.target.value,
            remoteUrl: baseURL + event.target.value + "/" + this.state.yCoord + "/" + this.state.angle + "/" + this.state.gridType.value + "/" + this.state.gridLevel.value
        });
    },

    onYCoordChange(event) {
        this.setState({
            yCoord: event.target.value,
            remoteUrl: baseURL + this.state.xCoord + "/" + event.target.value + "/" + this.state.angle + "/" + this.state.gridType.value + "/" + this.state.gridLevel.value
        });
    },

    onAngleChange(event) {
        this.setState({
            angle: event.target.value,
            remoteUrl: baseURL + this.state.xCoord + "/" + this.state.yCoord + "/" + event.target.value + "/" + this.state.gridType.value + "/" + this.state.gridLevel.value
        });
    },

    renderPanels() {
        const dropdownTheme = {
            dropdown: Styles.dropdown,
            list: Styles.dropdownList,
            isOpen: Styles.dropdownListIsOpen
        };
        return (
            <div>
                <label className={Styles.label}><strong>Step 1:</strong> Select type of grid to add: </label>
                <Dropdown options={gridType} selected={this.state.gridType}
                      selectOption={this.selectGridType} matchWidth={true} theme={dropdownTheme}/>
                <Dropdown options={gridLevel} selected={this.state.gridLevel}
                      selectOption={this.selectGridLevel} matchWidth={true} theme={dropdownTheme}/>
                <label className={Styles.label}><strong>Step 2:</strong> Enter latitude and longitude of the first point:</label>
                <input value={this.state.xCoord} onChange={this.onXCoordChange}
                       className={Styles.textInputTextBox}
                       type='number'
                       step='0.000001'
                       min="-90"
                       max="90"
                       pattern="[0-9.]*"
                       placeholder='0'/>
                <input value={this.state.yCoord} onChange={this.onYCoordChange}
                       className={Styles.textInputTextBox}
                       type='number'
                       step='0.000001'
                       min="-180"
                       max="180"
                       pattern="[0-9.]*"
                       placeholder='0'/>
                <label className={Styles.label}><strong>Step 3:</strong> Enter bearing in degrees:</label>
                <input value={this.state.angle} onChange={this.onAngleChange}
                       className={Styles.textInputTextBox}
                       type='number'
                       step='0.000001'
                       min="-360"
                       max="360"
                       pattern="[0-9.]*"
                       placeholder='0'/>
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

module.exports = AddGridData;
