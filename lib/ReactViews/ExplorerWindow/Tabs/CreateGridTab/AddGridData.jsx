import React from 'react';
import Select from 'react-select';
import classNames from 'classnames';

import addUserCatalogMember from '../../../../Models/addUserCatalogMember';
import createCatalogItemFromFileOrUrl from '../../../../Models/createCatalogItemFromFileOrUrl';
import createCatalogMemberFromType from '../../../../Models/createCatalogMemberFromType';
import Dropdown from '../../../Generic/Dropdown';
import ObserveModelMixin from '../../../ObserveModelMixin';
import TerriaError from '../../../../Core/TerriaError';
import addUserFiles from '../../../../Models/addUserFiles';
import checkGridInput from '../../../../Models/checkGridInput';

import Styles from './add-grid-data.scss';
import Select from './dropdown.scss';

// Local and remote data have different dataType options
const GRID = require('./grids');
const baseURL = window.location.protocol + "//" + window.location.host + "/api/createGrid/";


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
            grid: 'grids',
            type: 'beckerhagens',
            disabled: false,
            searchable: this.props.searchable,
            selectGrid: 'beckerhagens',
            selectType: 'point',
            clearable: false,
            searchable: false,
            remoteUrl: baseURL + "0.0/0.0/0.0/" + "beckerhagens" + "/" + "point",
            xCoord: "0.0",
            yCoord: "0.0",
            angle: "0.0"
        };
    },

    switchType (newGrid) {
        //console.log('Type switched to ' + newGrid);
        this.setState({
            type: newGrid,
            selectType: 'point',
            remoteUrl: baseURL + this.state.xCoord + "/" + this.state.yCoord + "/" + this.state.angle + "/" + newGrid + "/" + this.state.selectType
        }); 
    },
    updateGrid (newGrid) {
        //console.log('Grid updated to ' + newGrid);
        this.setState({
            selectGrid: newGrid,
            remoteUrl: baseURL + this.state.xCoord + "/" + this.state.yCoord + "/" + this.state.angle + "/" + newGrid + "/" + this.state.selectType
        }); 
        this.switchType(newGrid);
    },
    updateType (newType) {
        //console.log('Type updated to ' + newType);
        this.setState({
            selectType: newType,
            remoteUrl: baseURL + this.state.xCoord + "/" + this.state.yCoord + "/" + this.state.angle + "/" + this.state.selectGrid + "/" + newType
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
            newItem.name = '[' + that.state.grid + '][' + that.state.xCoord + '][' + that.state.yCoord + '][' + that.state.angle + '][' + that.state.type + ']';
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
            remoteUrl: baseURL + event.target.value + "/" + this.state.yCoord + "/" + this.state.angle + "/" + this.state.selectGrid + "/" + this.state.selectType
        });
    },

    onYCoordChange(event) {
        this.setState({
            yCoord: event.target.value,
            remoteUrl: baseURL + this.state.xCoord + "/" + event.target.value + "/" + this.state.angle + "/" + this.state.selectGrid + "/" + this.state.selectType
        });
    },

    onAngleChange(event) {
        this.setState({
            angle: event.target.value,
            remoteUrl: baseURL + this.state.xCoord + "/" + this.state.yCoord + "/" + event.target.value + "/" + this.state.selectGrid + "/" + this.state.selectType
        });
    },

    renderPanels() {
        var gridOptions = GRID['grids'];
        var typeOptions = GRID[this.state.type];
        return (
            <div>
                <label className={Styles.label}><strong>Step 1:</strong> Select type of grid to add: </label>
                <Select options={gridOptions} simpleValue clearable={this.state.clearable} name="selected-grid" disabled={this.state.disabled} value={this.state.selectGrid} onChange={this.updateGrid} searchable={this.state.searchable} matchWidth={true} />
                <Select options={typeOptions} simpleValue clearable={this.state.clearable} name="selected-type" disabled={this.state.disabled} value={this.state.selectType} onChange={this.updateType} searchable={this.state.searchable} matchWidth={true} />
                <label className={Styles.label}><strong>Step 2:</strong> Enter latitude and longitude of the first point:</label>
                <input value={this.state.xCoord} onChange={this.onXCoordChange}
                       className={Styles.textInputTextBox}
                       type='number'
                       step='0.000001'
                       min="-90"
                       max="90"
                       pattern="[0-9.]*" />
                <input value={this.state.yCoord} onChange={this.onYCoordChange}
                       className={Styles.textInputTextBox}
                       type='number'
                       step='0.000001'
                       min="-180"
                       max="180"
                       pattern="[0-9.]*" />
                <label className={Styles.label}><strong>Step 3:</strong> Enter bearing in degrees:</label>
                <input value={this.state.angle} onChange={this.onAngleChange}
                       className={Styles.textInputTextBox}
                       type='number'
                       step='0.000001'
                       min="-360"
                       max="360"
                       pattern="[0-9.]*" />
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
