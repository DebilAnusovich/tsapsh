//=============================================================================
// Yanfly Engine Plugins - Template
// YEP_Template.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_Template = true;

var Yanfly = Yanfly || {};
Yanfly.Template = Yanfly.Template || {};
Yanfly.Template.version = 1.00;

//=============================================================================
 /*:
 * @plugindesc vBETA --------------------------------------------------
 * @author Yanfly Engine Plugins
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin requires YEP_PluginName.
 * Make sure this plugin is located under YEP_PluginName in the plugin list.
 *
 * Text
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * Text
 *
 * ============================================================================
 * Main Menu Manager - Positioning the Row Command
 * ============================================================================
 *
 * For those using the Main Menu Manager and would like to position the Row
 * command in a place you'd like, use the following format:
 *
 *       Name: 
 *     Symbol: 
 *       Show: 
 *    Enabled: 
 *        Ext: 
 *  Main Bind: 
 * Actor Bind: 
 *
 * Insert the above setup within a Main Menu Manager slot. Provided you copy
 * the exact settings to where you need it, it will appear there while using
 * all of the naming, enabling, disabling, hiding, and showing effects done by
 * the plugin parameters.
 *
 * Remember to turn off 'Auto Add Menu' from the plugin parameters.
 *
 * ============================================================================
 * Options Core Settings - Adding the New Options
 * ============================================================================
 *
 * If you are using YEP_OptionsCore.js, you can add a new Option using this
 * plugin. Here's the following code/parameter settings you can use with it.
 *
 * ---------
 * Settings:
 * ---------
 * 
 * Name:
 * \i[87]Name
 *
 * Help Description:
 * Line1
 * Line2
 *
 * Symbol:
 * symbol
 *
 * Show/Hide:
 * show = true;
 *
 * Enable:
 * enabled = true;
 *
 * Ext:
 * ext = 0;
 *
 * ----------
 * Functions:
 * ----------
 * 
 * Make Option Code:
 * this.addCommand(name, symbol, enabled, ext);
 *
 * Draw Option Code:
 * var rect = this.itemRectForText(index);
 * var statusWidth = this.statusWidth();
 * var titleWidth = rect.width - statusWidth;
 * this.resetTextColor();
 * this.changePaintOpacity(this.isCommandEnabled(index));
 * this.drawOptionsName(index);
 * this.drawOptionsOnOff(index);
 *
 * Process OK Code:
 * var index = this.index();
 * var symbol = this.commandSymbol(index);
 * var value = this.getConfigValue(symbol);
 * this.changeValue(symbol, !value);
 *
 * Cursor Right Code:
 * var index = this.index();
 * var symbol = this.commandSymbol(index);
 * var value = this.getConfigValue(symbol);
 * this.changeValue(symbol, true);
 * 
 * Cursor Left Code:
 * var index = this.index();
 * var symbol = this.commandSymbol(index);
 * var value = this.getConfigValue(symbol);
 * this.changeValue(symbol, false);
 *
 * Default Config Code:
 * // Empty. Provided by this plugin.
 *
 * Save Config Code:
 * // Empty. Provided by this plugin.
 *
 * Load Config Code:
 * // Empty. Provided by this plugin.
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * Text
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.01:
 * - Updated for RPG Maker MV version 1.5.0.
 *
 * Version 1.00:
 * - Finished Plugin!
 *
 * Version BETA:
 * - Started Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @param ---General---
 * @default
 *
 * @param General Parameter
 * @parent ---General---
 * @desc Description
 * @default 0
 *
 * @param Boolean Parameter
 * @parent ---General---
 * @type boolean
 * @on YES
 * @off NO
 * @desc Description
 * @default true
 *
 * @param Boolean Parameter
 * @parent ---General---
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Description
 * @default 0
 *
 * @param Boolean Parameter
 * @parent ---General---
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Description
 * @default 0
 *
 * @param Number Parameter
 * @parent ---General---
 * @type number
 * @min 0
 * @max 31
 * @desc Description
 * @default 0
 *
 * @param Decimal Parameter
 * @parent ---General---
 * @type number
 * @decimals 2
 * @min 0
 * @max 31
 * @desc Description
 * @default 0.1
 *
 * @param Combo Parameter
 * @parent ---General---
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Description
 * @default 0
 *
 * @param Complex Select Parameter
 * @parent ---General---
 * @type select
 * @option XP
 * @value 1.0
 * @option VX
 * @value 2.0
 * @option VX Ace
 * @value 2.1
 * @option MV
 * @value 3.0
 * @desc Description
 * @default 0
 *
 * @param File Parameter
 * @parent ---Sound---
 * @type file
 * @dir audio/se/
 * @require 1
 * @desc Description
 * @default Twine
 *
 * @param Database Parameter
 * @parent ---General---
 * @type animation
 * @type actor
 * @type class
 * @type skill
 * @type item
 * @type weapon
 * @type armor
 * @type enemy
 * @type troop
 * @type state
 * @type tileset
 * @type common_event
 * @type switch
 * @type variable
 * @desc Description
 * @default Twine
 *
 * @param Note Parameter
 * @parent ---General---
 * @type note
 * @desc Description
 * @default "Test1\nTest2\nTest3"
 *
 */
//=============================================================================

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_Template');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.Variables = String(Yanfly.Parameters['Variables']);

Yanfly.SetupParameters = function() {
  var data = JSON.parse(Yanfly.Parameters['List']);
  for (var i = 0; i < data.length; ++i) {
    var id = parseInt(data[i]);
    if (id <= 0) continue;
    if (somehugearrayname.contains(id)) continue;
    somehugearrayname.push(id);
  }
};
Yanfly.SetupParameters();

//=============================================================================
// DataManager
//=============================================================================

Yanfly.Template.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
  if (!Yanfly.Template.DataManager_isDatabaseLoaded.call(this)) return false;

  if (!Yanfly._loaded_YEP_Template) {
    this.processTemplateNotetags1($dataActors);
    Yanfly._loaded_YEP_Template = true;
  }
  
  return true;
};

DataManager.processTemplateNotetags1 = function(group) {
  var note1 = /<(?:TEMPLATE):[ ](\d+)([%％])>/i;
  var note2 = /<(?:TEMPLATE):[ ]([\+\-]\d+)>/i;
  var note3 = /<(?:TEMPLATE):[ ](.*)>/i;
  var note4 = /<(?:TEMPLATE):[ ]*(\d+(?:\s*,\s*\d+)*)>/i;
  var note5 = /<(?:TEMPLATE):[ ](\d+)[ ](?:THROUGH|to)[ ](\d+)>/i;
  var note6 = /<(?:TEMPLATE)>/i;
  var note7 = /<\/(?:TEMPLATE)>/i;
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    obj.blah = false;

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(note1)) {
        obj.blah = false;
      } else if (line.match(note4)) {
        var array = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
        obj.objarray = obj.objarray.concat(array);
      } else if (line.match(note5)) {
        var range = Yanfly.Util.getRange(parseInt(RegExp.$1),
          parseInt(RegExp.$2));
        obj.objarray = obj.objarray.concat(range);
      }
    }
  }
};

DataManager.processTemplateNotetags1 = function(group) {
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    obj.blah = false;

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(note1)) {
        obj.blah = false;
      } else if (line.match(note4)) {
        var array = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
        obj.objarray = obj.objarray.concat(array);
      }
    }
  }
};

//=============================================================================
// MainCode
//=============================================================================

//=============================================================================
// Game_Temp
//=============================================================================

Game_Temp.prototype.hasStoredBattleSpriteset = function() {
  return this._battleSpriteset;
};

Game_Temp.prototype.storeBattleSpriteset = function() {
  this._battleSpriteset = SceneManager._scene._spriteset;
};

Game_Temp.prototype.restoreBattleSpriteset = function() {
  if (this._battleSpriteset) {
    SceneManager._scene._spriteset = this._battleSpriteset;
    SceneManager._scene.addChild(SceneManager._scene._spriteset);
    this._battleSpriteset = undefined;
  }
};

//=============================================================================
// Game_System
//=============================================================================

Yanfly.Template.Game_System_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
  Yanfly.Template.Game_System_initialize.call(this);
  this.initTemplateSettings();
};

Game_System.prototype.initTemplateSettings = function() {
};

//=============================================================================
// Game_Actor
//=============================================================================

Game_Actor.prototype.isLearnedSkillRaw = function(skillId) {
  return this._skills.contains(skillId);
};

//=============================================================================
// Game_Interpreter
//=============================================================================

Yanfly.Template.Game_Interpreter_pluginCommand =
  Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
  Yanfly.Template.Game_Interpreter_pluginCommand.call(this, command, args);
  if (command === 'template') {
    // Do something
  }
};

Game_Interpreter.prototype.argsToString = function(args) {
  var str = '';
  var length = args.length;
  for (var i = 0; i < length; ++i) {
    str += args[i] + ' ';
  }
  return str.trim();
};

//=============================================================================
// Game_Action
//=============================================================================

Game_Action.prototype.customEval = function(target, eval) {
  var value = 0;
  var item = this.item();
  var skill = this.item();
  var a = this.subject();
  var user = this.subject();
  var subject = this.subject();
  var b = target;
  var s = $gameSwitches._data;
  var v = $gameVariables._data;
  eval(eval);
  return value;
};

// return setTimeout(this.drawItem.bind(this, index), 5);

/*
Window_ItemStatus.prototype.readyItemPictureImage = function (item) {
    if (item !== this._item)return;
    var bitmap = ItemManager.getItemPictureImage(item);
    bitmap.addLoadListener(function () {
        this.drawItemPictureImage(bitmap);
    }
        .bind(this));
};
/*

//=============================================================================
// Common Copy/Pastes
//=============================================================================

/*

var random = items[Math.floor(Math.random() * items.length)];
var member = members[Math.floor(Math.random() * members.length)];

*/

//=============================================================================
// Utilities
//=============================================================================

Yanfly.Util = Yanfly.Util || {};

Yanfly.Util.displayError = function(e, code, message) {
  console.log(message);
  console.log(code || 'NON-EXISTENT');
  console.error(e);
  if (Utils.isNwjs() && Utils.isOptionValid('test')) {
    if (!require('nw.gui').Window.get().isDevToolsOpen()) {
      require('nw.gui').Window.get().showDevTools();
    }
  }
};

/*

  var code = line;
  try {
    eval(code);
  } catch (e) {
    Yanfly.Util.displayError(e, code, 'CUSTOM SCRIPT ERROR');
  }

    var code = line;
    try {
      eval(code);
    } catch (e) {
      Yanfly.Util.displayError(e, code, 'CUSTOM SCRIPT ERROR');
    }

*/

if (!Yanfly.Util.toGroup) {

Yanfly.Util.toGroup = function(inVal) {
  return inVal;
}

}; // Yanfly.Util.toGroup

Yanfly.Util.getRange = function(n, m) {
  var result = [];
  for (var i = n; i <= m; ++i) result.push(i);
  return result;
};

Yanfly.Util.onlyUnique = function(value, index, self) {
  return self.indexOf(value) === index;
};

Yanfly.Util.getUnique = function(array) {
  var result = [];
  var length = array.length;
  for (var i = 0; i < length; ++i) {
    var element = array[i];
    if (result.contains(element)) continue;
    result.push(element);
  }
  return result;
};

Yanfly.Util.isEmptyObj = function(obj) {
  var key;
  for (key in obj) {
    return false;
  }
  return true;
};

Yanfly.Util.extend = function (mainArray, otherArray) {
  otherArray.forEach(function(i) {
    mainArray.push(i)
  }, this);
}

Yanfly.Util.getCommonElements = function(array1, array2) {
  var elements = [];
  var length = array1.length;
  for (var i = 0; i < length; ++i) {
    var element = array1[i];
    if (array2.contains(element)) elements.push(element);
  }
  return elements;
};

Yanfly.Util.randomIntBetween = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

//=============================================================================
// End of File
//=============================================================================