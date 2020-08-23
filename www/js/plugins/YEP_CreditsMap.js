//=============================================================================
// Yanfly Engine Plugins - Credits Map
// YEP_CreditsMap.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_CreditsMap = true;

var Yanfly = Yanfly || {};
Yanfly.CreditsMap = Yanfly.CreditsMap || {};
Yanfly.CreditsMap.version = 1.00;

//=============================================================================
 /*:
 * @plugindesc Sample Project's Credit Page
 * @author Yanfly Engine Plugins
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * Made to thank everybody who's been a Patron of mine in the past!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @param Command Text
 * @desc Text displayed on the title command window.
 * @default Credits
 *
 * @param Map ID
 * @desc ID of the map to teleport the player to.
 * @type map
 * @default 0
 */
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_CreditsMap');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.CreditsMapCommand = String(Yanfly.Parameters['Command Text']);
Yanfly.Param.CreditsMapID = Number(Yanfly.Parameters['Map ID']);

//=============================================================================
// Window_Command
//=============================================================================

Window_Command.prototype.addCommandAt = function(index, name, symbol, en, ext) {
  if (en === undefined) enabled = true;
  if (ext === undefined) ext = null;
  var obj = { name: name, symbol: symbol, enabled: en, ext: ext};
  this._list.splice(index, 0, obj);
};

//=============================================================================
// Window_TitleCommand
//=============================================================================

Yanfly.CreditsMap.Window_TitleCommand_makeCommandList =
  Window_TitleCommand.prototype.makeCommandList;
Window_TitleCommand.prototype.makeCommandList = function() {
  Yanfly.CreditsMap.Window_TitleCommand_makeCommandList.call(this);
  var index = this.findSymbol('options');
  var text = Yanfly.Param.CreditsMapCommand;
  var enabled = true;
  this.addCommandAt(index, text, 'credits', enabled);
};

//=============================================================================
// Scene_Title
//=============================================================================

Yanfly.CreditsMap.Scene_Title_createCommandWindow =
  Scene_Title.prototype.createCommandWindow;
Scene_Title.prototype.createCommandWindow = function() {
  Yanfly.CreditsMap.Scene_Title_createCommandWindow.call(this);
  this._commandWindow.setHandler('credits',  this.commandCredits.bind(this));
};

Scene_Title.prototype.commandCredits = function() {
  this._commandWindow.close();
  DataManager.setupNewGame();
  $gamePlayer.reserveTransfer(Yanfly.Param.CreditsMapID, 0, 0);
  this.fadeOutAll();
  $gamePlayer.setTransparent(true);
  SceneManager.goto(Scene_Map);
};

//=============================================================================
// End of File
//=============================================================================