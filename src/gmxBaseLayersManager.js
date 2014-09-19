/*
 * gmxBaseLayersManager - BaseLayers manager
 */
var gmxBaseLayersManager = L.Class.extend({
	includes: L.Mixin.Events,
	options: {
	},
    /**
     * BaseLayer object.
     * @typedef {Object} BaseLayer
     * @property {String} id BaseLayer identifier.
     * @property {Object} options BaseLayer attributes.
     * @property {Layer[]} layers array attributes.
     * @property {function(layer:Layer)} addLayer - function for add layer to BaseLayer.
     * @property {function(layer:Layer)} removeLayer - function for remove layer from BaseLayer.
     */
    /**
     * BaseLayer options.
     * @typedef {Object} options
     * @param {String} options.rus - russian title.
     * @param {String} options.eng - english title.
     * @param {Layer[]} options.layers - layers array attributes.
     */

	initialize: function (map, options) {
        this._map = map;
        this._baseLayers = {};
        this._alias = {};
        this._currentID = null;
        this._activeIDs = [];

        this._lastLayer = null;
        this._lastId = null;
        var _this = this;

        this._setVisibleCurrentItem = function(flag) {
            var baseLayer = this._baseLayers[this._currentID] || null;
            if(baseLayer) {
                for(var i=0, len = baseLayer.layers.length; i<len; i++) {
                    var layer = baseLayer.layers[i];
                    //layer.setVisible(flag);
                    if(flag) {
                        _this._map.addLayer(layer);
                    } else {
                        _this._map.removeLayer(layer);
                    }
                }
            }
            return flag;
        }
    },

    /** Add baseLayer
    * @memberOf BaseLayersManager#
    * @param {String} id BaseLayer identifier.
    * @param {object} options BaseLayer attributes.
    * @param {String} options.rus - russian title(default = id).
    * @param {String} options.eng - english title(default = id).
    * @param {Layer[]} options.layers - layers array attributes(default []).
    * @returns {BaseLayer|null} return BaseLayer or null if BaseLayer with this id exists.
    */
    add: function(id, options) {
        if(!id || this._baseLayers[id]) return null;
        if(!options) options = {};
        //if(!options.layers) options.layersInfo = [];
        var _this = this;
        var baseLayer = {
            id: id || 'default'
            ,options: options
            ,layers: options.layers || []
            // ,rus: attr.rus || id
            // ,eng: attr.eng || id
            ,addLayer: function(layer) {
                this.removeLayer(layer);
                this.layers.push(layer);
                // layer.isBaseLayer = true;
                // layer.setVisible(false);
                // if(!layer.backgroundColor) layer.backgroundColor = 0xffffff;
                this.fire('onLayerChange', this);
                return true;
            }
            ,removeLayer: function(layer) {
                for(var i=0, len = this.layers.length; i<len; i++) {
                    if (layer === this.layers[i]) {
                        this.layers.splice(i, 1);
                        break;
                    }
                }
                this.fire('onLayerChange', this);
            }
        };
        // if(attr.rus) this._alias[attr.rus] = id;
        // if(attr.eng) this._alias[attr.eng] = id;
        // if(attr.style) pt.style = attr.style;   // стиль для контролов
        // if(attr.type) pt.type = attr.type;      // тип подложки для контролов имеющих типы подложек

        // pt.layers.forEach(function(item, i) {
            // item.isBaseLayer = true;
            // item.setVisible(false);
        // });

        this._baseLayers[id] = baseLayer;
        //manager.arr.push(pt);
        //manager.updateIndex(pt);
        this.fire('onAdd', baseLayer);
        return baseLayer;
    },
    /** Remove BaseLayer
    * @memberOf BaseLayersManager#
    * @param {String} id BaseLayer identifier.
    * @returns {BaseLayer|null} return deleted BaseLayer or null.
    */
    remove: function(id) {
        if(id === this._currentID) {
            this.setVisibleCurrentItem(false);
            this._currentID = null;
        }
        var item = this._baseLayers[id] || null;
        if(item) {
            delete this._baseLayers[id];
            // for(var i=0, len = manager.arr.length; i<len; i++) {
                // if(id === manager.arr[i].id) {
                    // manager.arr.splice(i, 1);
                    // break;
                // }
            // }
            this.fire('onRemove', item);
        }
        return item;
    },
    /** Get BaseLayer
    * @memberOf BaseLayersManager#
    * @param {String} id BaseLayer identifier.
    * @returns {BaseLayer|null} return BaseLayer or null.
    */
    get: function(id) {
        return this._baseLayers[id] || null;
    },
    /** Get all BaseLayers
    * @memberOf BaseLayersManager#
    * @returns {BaseLayer{}} return hash all BaseLayers.
    */
    getAll: function() {
        return this._baseLayers;
    },
    /** Get active BaseLayer keys array
    * @memberOf BaseLayersManager#
    * @returns {String[]} return active BaseLayer keys array.
    */
    getActiveIDs: function() {
        return this._activeIDs;
    },
    /** Set active BaseLayer keys array
    * @memberOf BaseLayersManager#
    * @param {String[]} active BaseLayer keys array.
    */
    setActiveIDs: function(arr) {
        this._activeIDs = arr;
        this.fire('onActiveChanged', this._activeIDs);
        return true;
    },
    /** Add active BaseLayer key
    * @memberOf BaseLayersManager#
    * @param {String} id BaseLayer identifier.
    * @param {number} index on active BaseLayer keys array.
    */
    addActiveID: function(id, index) {
        if(!id) return null;
        for(var i=0, len = this._activeIDs.length; i<len; i++) {
            if(id === this._activeIDs[i]) {
                this._activeIDs.splice(i, 1);
                break;
            }
        }
        var len = this._activeIDs.length;
        if(index === undefined || index > len - 1) {
            index = len;
            this._activeIDs.push(id);
        } else {
            this._activeIDs.splice(index, 0, id);
        }
        this.fire('onActiveChanged', this._activeIDs);
        return index;
    },
    /** Check BaseLayer active status
    * @memberOf BaseLayersManager#
    * @param {String} id BaseLayer identifier.
    * @returns {boolean} true if BaseLayer active or false
    */
    isActiveID: function(id) {
        for(var i=0, len = this._activeIDs.length; i<len; i++) {
            if(id === this._activeIDs[i]) {
                return true;
            }
        }
        return false;
    },
    /** Set current BaseLayer
    * @memberOf BaseLayersManager#
    * @param {String=} id BaseLayer identifier if BaseLayer not found unset current BaseLayer.
    * @returns {BaseLayer|null} return current BaseLayer or null.
    */
    setCurrentID: function(id) {
        var isActive = this.isActiveID(id);
        var item = this._baseLayers[id] || null;
        if(this._currentID) this._setVisibleCurrentItem(false);
        this._currentID = null;
        if(item) {
            if(isActive) {
                //manager.map.needSetMode = null;
                this._currentID = id;
                this._setVisibleCurrentItem(true);
            }
        }
        this.fire('onSetCurrent', item);
        return item;
    },
    /** Get current BaseLayer identifier
    * @memberOf BaseLayersManager#
    * @returns {String|null} return current BaseLayer identifier or null.
    */
    getCurrentID: function() {
        return this._currentID;
    },
    /** Get BaseLayer identifier by BaseLayer name
    * @memberOf BaseLayersManager#
    * @returns {String|null} return current BaseLayer identifier or null.
    */
    getIDByName: function(name) {
        return this._alias[name] || null;
    },
    /** Add layer to BaseLayer
    * @memberOf BaseLayersManager#
    * @param {String} id BaseLayer identifier.
    * @param {Layer} layer properties.
    * @returns {boolean} return true if BaseLayer exists or false.
    */
    addLayer: function(id, layer) {
        var baseLayer = this.get(id);
        if(!baseLayer) return false;
        baseLayer.addLayer(layer);
        return true;
    },
    /** Remove layer from BaseLayer
    * @memberOf BaseLayersManager#
    * @param {String} id BaseLayer identifier.
    * @param {Layer} layer properties.
    */
    removeLayer: function(id, layer) {
        var baseLayer = this.get(id);
        if(!baseLayer) return false;
        baseLayer.removeLayer(layer);
        if(id === this._currentID) {
            this._setVisibleCurrentItem(false);
        }
    },
    /** Get layers array from BaseLayer
    * @memberOf BaseLayersManager#
    * @param {String} id BaseLayer identifier.
    * @returns {Layer[]} return layers array.
    */
    getLayers: function(id) {
        return this.get(id).layers;
    }
});

L.Map.addInitHook(function () {
	// Check to see if BaseLayersManager has already been initialized.
    if (this._gmxBaseLayersManager) return;
	this.gmxBaseLayersManager = new gmxBaseLayersManager(this);
    //console.log('this._gmxBaseLayersManager', this.gmxBaseLayersManager);
	this.on('remove', function () {
		if (this.gmxBaseLayersManager) {
			this.gmxBaseLayersManager.remove();
		}
	});
});
