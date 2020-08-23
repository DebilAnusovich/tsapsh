//=============================================================================
// Yanfly Engine Plugins - Optimize Script Calls
// YEP_OptimizeScriptCalls.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_OptimizeScriptCalls = true;

var Yanfly = Yanfly || {};
Yanfly.OptSC = Yanfly.OptSC || {};
Yanfly.OptSC.version = 1.00;

//=============================================================================
 /*:
 * @plugindesc v1.00 Optimize script calls in common events to run better.
 * @author Yanfly Engine Plugins
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * Script Calls, whether they're for setting variables, conditional branches,
 * or actual script calls themselves, can run into performance issues when a
 * lot of them are ran in succession. This plugin will optimize script call
 * usage found inside common events and make them dedicated functions instead
 * for better performance.
 *
 * This is only done for Common Events, as with Map Events and Troop Events,
 * the event list would be generated on the spot and not something that will
 * continue to be stored in cache the moment the player leaves the map or ends
 * the battle. This also doesn't apply to Move Route script calls to maintain
 * compatibility with Move Route Core.
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
 */
//=============================================================================

//=============================================================================
// DataManager
//=============================================================================

Yanfly.OptSC.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
  if (!Yanfly.OptSC.DataManager_isDatabaseLoaded.call(this)) return false;

  if (!Yanfly._loaded_YEP_OptimizeScriptCalls) {
    this.processOptimizeScriptCalls();
    Yanfly._loaded_YEP_OptimizeScriptCalls = true;
  }
  
  return true;
};

DataManager.processOptimizeScriptCalls = function() {
  var commonEvents = $dataCommonEvents;
  var length = commonEvents.length;
  for (var i = 1; i < length; ++i) {
    var commonEvent = commonEvents[i];
    var list = commonEvent.list;
    this.prepareOptimizedScriptCalls(list);
  }
};

DataManager.prepareOptimizedScriptCalls = function(list) {
  var length = list.length;
  for (var i = 0; i < length; ++i) {
    var ev = list[i];
    // Conditional Branch
    if (ev._cachedFunction) continue;
    if (ev.code === 111 && ev.parameters[0] === 12) {
      ev._cachedFunction = new Function('return ' + ev.parameters[1]);
    // Control Variable
    } else if (ev.code === 122 && ev.parameters[3] === 4) {
      ev._cachedFunction = new Function('return ' + ev.parameters[4]);
    // Script Call
    } else if (ev.code === 355) {
      var script = ev.parameters[0] + '\n';
      var j = i + 1;
      while (list[j].code === 655) {
        script += list[j].parameters[0] + '\n';
        ++j;
      }
      ev._cachedFunction = new Function(script);
    }
  }
};

//=============================================================================
// Game_Interpreter
//=============================================================================

// Conditional Branch
Yanfly.OptSC.Game_Interpreter_command111 =
    Game_Interpreter.prototype.command111;
Game_Interpreter.prototype.command111 = function() {
  if (this.currentCommand()._cachedFunction) {
    var result = false;
    result = !!this.currentCommand()._cachedFunction.call(this);
    this._branch[this._indent] = result;
    if (this._branch[this._indent] === false) this.skipBranch();
    return true;
  } else {
    return Yanfly.OptSC.Game_Interpreter_command111.call(this);
  }
};

// Control Variable
Yanfly.OptSC.Game_Interpreter_command122 =
    Game_Interpreter.prototype.command122;
Game_Interpreter.prototype.command122 = function() {
  if (this.currentCommand()._cachedFunction) {
    var value = this.currentCommand()._cachedFunction.call(this);
    for (var i = this._params[0]; i <= this._params[1]; i++) {
      this.operateVariable(i, this._params[2], value);
    }
    return true;
  } else {
    return Yanfly.OptSC.Game_Interpreter_command122.call(this);
  }
};

// Script Call
Yanfly.OptSC.Game_Interpreter_command355 = 
    Game_Interpreter.prototype.command355;
Game_Interpreter.prototype.command355 = function() {
  if (this.currentCommand()._cachedFunction) {
    this.currentCommand()._cachedFunction.call(this);
    return true;
  } else {
    return Yanfly.OptSC.Game_Interpreter_command355.call(this);
  }
};

//=============================================================================
// End of File
//=============================================================================