//=============================================================================
// Yanfly Engine Plugins - Disable Auto Shadow Extended
// YEP_DisableAutoShadowExt.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_DisableAutoShadowExt = true;

var Yanfly = Yanfly || {};
Yanfly.AutoShadowExt = Yanfly.AutoShadowExt || {};
Yanfly.AutoShadowExt.version = 1.00;

//=============================================================================
 /*:
 * @plugindesc v1.00 Disable autoshadows for your game, specific maps, or even
 * specific tilesets.
 * @author Yanfly Engine Plugins and Archeia
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * RPG Maker MV automatically has shadows coming from certain wall tiles. There
 * is no way to turn them off by default. A plugin did come with the DLC pack
 * but it also turned off all shadows regardless. This plugin lets you decide
 * whether or not you want shadows to be on or off by default as well as give
 * you control over whether or not you want to enable/disable shadows for very
 * specific maps and/or tilesets.
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * Insert the following notetags into a map or tileset's notebox to change how
 * they affect shadows on their map.
 * 
 * Tileset and Map Notetags:
 * 
 *   <Hide Shadows>
 *   <Show Shadows>
 *   - This will hide/show shadows for that specific map or tileset. If a map
 *   has a shadow-related notetag while using a tileset with a shadow-related
 *   notetag, priority will be given to the notetag on the map. If neither the
 *   map nor the tileset has a shadow-related notetag, then the shadow state
 *   will depend on the setting in the plugin parameters.
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.00:
 * - Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @param DefaultShowShadows
 * @text Default Show Shadows
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show shadows by default?
 * YES - true     NO - false
 * @default true
 */
//=============================================================================

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_DisableAutoShadowExt');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.AutoShowShadows = eval(Yanfly.Parameters['DefaultShowShadows']);

Yanfly.AutoShadowExt.DrawShadow = function() {
  if ($dataMap && $dataMap.note) {
    if ($dataMap.note.match(/<HIDE SHADOWS>/i)) return false;
    if ($dataMap.note.match(/<SHOW SHADOWS>/i)) return true;
  }
  if ($gameMap && $gameMap.tileset() && $gameMap.tileset().note) {
    if ($gameMap.tileset().note.match(/<HIDE SHADOWS>/i)) return false;
    if ($gameMap.tileset().note.match(/<SHOW SHADOWS>/i)) return true;
  }
  return Yanfly.Param.AutoShowShadows;
};

//=============================================================================
// DataManager
//=============================================================================

Yanfly.AutoShadowExt.Tilemap_drawSh = Tilemap.prototype._drawShadow;
Tilemap.prototype._drawShadow = function(bitmap, shBits, dx, dy) {
  if (!Yanfly.AutoShadowExt.DrawShadow()) return;
  Yanfly.AutoShadowExt.Tilemap_drawSh.call(this, bitmap, shBits, dx, dy);
};

Yanfly.AutoShadowExt.ShTileMap_drawSh =
  ShaderTilemap.prototype._drawShadow;
ShaderTilemap.prototype._drawShadow = function(layer, shBits, dx, dy) {
  if (!Yanfly.AutoShadowExt.DrawShadow()) return;
  Yanfly.AutoShadowExt.ShTileMap_drawSh.call(this, layer, shBits, dx, dy);
};

//=============================================================================
// End of File
//=============================================================================