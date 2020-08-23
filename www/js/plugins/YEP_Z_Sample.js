//=============================================================================
// Yanfly Engine Plugins - Lunatic Pack - Skill Rewards
// YEP_Z_Sample.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_Z_Sample = true;

var Yanfly = Yanfly || {};
Yanfly.LunaticSample = Yanfly.LunaticSample || {};
Yanfly.LunaticSample.version = 1.00;

//=============================================================================
 /*:
 * @plugindesc vBETA (Lunatic Pack Example)
 * @author Yanfly Engine Plugins
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin requires the following plugins:
 * - Battle Engine Core
 * - Skill Core
 *
 * This is a sample plugin to show off the general idea of the Lunatic Packs.
 * The main idea of these Lunatic Packs is to create notetags with code that
 * can be easily modified.
 *
 * *NOTE*: This plugin is best used with RPG Maker MV version 1.5.0+. You can
 * still use this plugin with a lower version number, but you will have a much
 * harder time altering the plugin parameters without it.
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * Insert the following notetags into a skill or item's notebox to give it one
 * of these effects:
 *
 * Skill and Item Notetags:
 *
 *   <Defeat Reward: +x user HP>
 *   <Defeat Reward: -x user HP>
 *   - If the user defeats the target using this skill/item, then the user is
 *   rewarded with +/-x HP. Insert multiple copies of this notetag to make the
 *   effect occur multiple times.
 *
 *   <Defeat Reward: +x user MP>
 *   <Defeat Reward: -x user MP>
 *   - If the user defeats the target using this skill/item, then the user is
 *   rewarded with +/-x MP. Insert multiple copies of this notetag to make the
 *   effect occur multiple times.
 *
 *   <Defeat Reward: +x user TP>
 *   <Defeat Reward: -x user TP>
 *   - If the user defeats the target using this skill/item, then the user is
 *   rewarded with +/-x TP. Insert multiple copies of this notetag to make the
 *   effect occur multiple times.
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @param Effect Code
 * @type note
 * @desc This is the code used for each of the notetag effects.
 * @default "if (data.match(/([\\+\\-]\\d+)[ ]USER HP/i)) {\n  var value = parseInt(RegExp.$1);\n  user.gainHp(value);\n  user.startDamagePopup();\n} else if (data.match(/([\\+\\-]\\d+)[ ]USER MP/i)) {\n  var value = parseInt(RegExp.$1);\n  user.gainMp(value);\n  user.startDamagePopup();\n} else if (data.match(/([\\+\\-]\\d+)[ ]USER TP/i)) {\n  var value = parseInt(RegExp.$1);\n  user.gainTp(value);\n  user.startDamagePopup();\n}"
 *
 */
//=============================================================================

Yanfly.PluginRequirements = function() {
  return Imported.YEP_BattleEngineCore &&
         Imported.YEP_SkillCore;
};

if (Yanfly.PluginRequirements()) {

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_Z_Sample');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.LunSkRewEffect = JSON.parse(Yanfly.Parameters['Effect Code']);

//=============================================================================
// DataManager
//=============================================================================

Yanfly.LunaticSample.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
  if (!Yanfly.LunaticSample.DataManager_isDatabaseLoaded.call(this)) return false;

  if (!Yanfly._loaded_YEP_Z_Sample) {
    this.processLunSkRewNotetags1($dataSkills);
    this.processLunSkRewNotetags1($dataItems);
    Yanfly._loaded_YEP_Z_Sample = true;
  }
  
  return true;
};

DataManager.processLunSkRewNotetags1 = function(group) {
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    obj.defeatRewards = [];

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(/<(.*)[ ](?:REWARD|REWARDS):[ ](.*)>/i)) {
        var condition = String(RegExp.$1);
        var data = String(RegExp.$2);
        if (condition.match(/DEFEAT/i)) {
          obj.defeatRewards.push(data);
        }
      }
    }
  }
};

//=============================================================================
// Game_Action
//=============================================================================

Yanfly.LunaticSample.Game_Action_apply = Game_Action.prototype.apply;
Game_Action.prototype.apply = function(target) {
  var alive = target.hp > 0;
  Yanfly.LunaticSample.Game_Action_apply.call(this, target);
  if (alive) {
    if (target.hp <= 0 || target.isDead()) {
      this.processLunaticSkillReward(target, 'defeat');
    }
  }
};

Game_Action.prototype.processLunaticSkillReward = function(target, type) {
  switch (type) {
  case 'defeat':
    var dataInfo = this.item().defeatRewards;
    break;
  default:
    return;
  }
  var length = dataInfo.length;
  for (var i = 0; i < length; ++i) {
    var data = dataInfo[i];
    this.lunaticSkillRewardEval(target, type, data);
  }
};

Game_Action.prototype.lunaticSkillRewardEval = function(target, type, data) {
  var item = this.item();
  var skill = this.item();
  var user = this.subject();
  var a = user;
  var subject = user;
  var b = target;
  var s = $gameSwitches._data;
  var v = $gameVariables._data;
  var userPreviousResult = JsonEx.makeDeepCopy(user._result);
  var targetPreviousResult = JsonEx.makeDeepCopy(target._result);

  var code = Yanfly.Param.LunSkRewEffect;
  try {
    eval(code)
  } catch (e) {
    Yanfly.Util.displayError(e, code, 'LUNATIC SKILL REWARDS ERROR');
  }

  if (user.isDead()) user.performCollapse();
  if (target.isDead()) target.performCollapse();
  user._result = userPreviousResult;
  target._result = targetPreviousResult;
};

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

//=============================================================================
// End of File
//=============================================================================
} else {

var text = '';
text += 'You are getting this error because you are trying to run ';
text += 'YEP_Z_Sample without the required plugins. Please visit ';
text += 'Yanfly.moe and install the required plugins neede for this plugin ';
text += 'found in this plugin\'s help file before you can use it.';
console.log(text);
require('nw.gui').Window.get().showDevTools();

}; // Yanfly.PluginRequirements