/*
 * gmxBaseLayersManager - BaseLayers manager
 */
var gmxBaseLayersManager = L.Class.extend({
	includes: L.Mixin.Events,
	options: {
	},
    /**
     * BaseLayer class (extend `L.LayerGroup`).
     * @typedef {Object} BaseLayer
     * @property {String} id BaseLayer identifier.
     * @property {Object} options BaseLayer attributes.
     */

	initialize: function (map, options) {
        this._map = map;
        this._baseLayers = {};
        this._alias = {};
        this._currentID = null;
        this._activeIDs = [];
        
        var _this = this;
        this._baseLayer = L.LayerGroup.extend({
            addLayer: function(layer) {
                L.LayerGroup.prototype.addLayer.call(this, layer);
                _this.fire('baselayerlayerschange', this);
                return true;
            },

            removeLayer: function(layer) {
                L.LayerGroup.prototype.removeLayer.call(this, layer);
                _this.fire('baselayerlayerschange', this);
            }
        });
        // map.on('baselayerchange', function(ev) {
            // _this.setCurrentID(ev.name);
        // });
    },

    /** Add baseLayer
    * @memberOf gmxBaseLayersManager#
    * @param {String} id BaseLayer identifier.
    * @param {object} options BaseLayer attributes.
    * @param {String} options.rus - russian title(default = id).
    * @param {String} options.eng - english title(default = id).
    * @param {Layer[]} options.layers - layers array(default []).
    * @returns {BaseLayer|null} return BaseLayer or null if BaseLayer with this id exists.
    */
    add: function(id, options) {
        if(!id || this._baseLayers[id]) return null;
        if(!options) options = {};
        var baseLayer = new this._baseLayer(options.layers || []);
        delete options.layers;

        baseLayer.id = id || 'default';
        baseLayer.options = options;
        this._baseLayers[id] = baseLayer;
        this.fire('baselayeradd', baseLayer);
        return baseLayer;
    },
    /** Remove BaseLayer
    * @memberOf gmxBaseLayersManager#
    * @param {String} id BaseLayer identifier.
    * @returns {BaseLayer|null} return deleted BaseLayer or null.
    */
    remove: function(id) {
        var baseLayer = this._baseLayers[id] || null;
        if(id === this._currentID) {
            this._currentID = null;
        }
        if(baseLayer) {
            this._map.removeLayer(baseLayer);
            delete this._baseLayers[id];
            this.fire('baselayerremove', baseLayer);
        }
        return baseLayer;
    },
    /** Get BaseLayer
    * @memberOf gmxBaseLayersManager#
    * @param {String} id BaseLayer identifier.
    * @returns {BaseLayer|null} return BaseLayer or null.
    */
    get: function(id) {
        return this._baseLayers[id] || null;
    },
    /** Get all BaseLayers
    * @memberOf gmxBaseLayersManager#
    * @returns {BaseLayer{}} return hash all BaseLayers.
    */
    getAll: function() {
        return this._baseLayers;
    },
    /** Get active BaseLayer keys array
    * @memberOf gmxBaseLayersManager#
    * @returns {String[]} return active BaseLayer keys array.
    */
    getActiveIDs: function() {
        return this._activeIDs;
    },
    /** Set active BaseLayer keys array
    * @memberOf gmxBaseLayersManager#
    * @param {String[]} active BaseLayer keys array.
    */
    setActiveIDs: function(arr) {
        this._activeIDs = arr;
        this.fire('baselayeractiveids', this._activeIDs);
        return true;
    },
    /** Add active BaseLayer key
    * @memberOf gmxBaseLayersManager#
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
        this.fire('baselayeractiveids', this._activeIDs);
        return index;
    },
    /** Check BaseLayer active status
    * @memberOf gmxBaseLayersManager#
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
    * @memberOf gmxBaseLayersManager#
    * @param {String=} id BaseLayer identifier if BaseLayer not found unset current BaseLayer.
    * @returns {BaseLayer|null} return current BaseLayer or null.
    */
    setCurrentID: function(id) {
        if(this._currentID) {
            this._map.removeLayer(this._baseLayers[this._currentID]);
            this._currentID = null;
        }
        var baseLayer = this._baseLayers[id] || null;
        if(baseLayer) {
            if(this.isActiveID(id)) {
                this._currentID = id;
                this._map.addLayer(baseLayer);
            }
        }
        this.fire('baselayerchange', baseLayer);
        return baseLayer;
    },
    /** Get current BaseLayer identifier
    * @memberOf gmxBaseLayersManager#
    * @returns {String|null} return current BaseLayer identifier or null.
    */
    getCurrentID: function() {
        return this._currentID;
    }
});

L.Map.addInitHook(function () {
	// Check to see if BaseLayersManager has already been initialized.
    if (this._gmxBaseLayersManager) return;
	this.gmxBaseLayersManager = new gmxBaseLayersManager(this);
});
