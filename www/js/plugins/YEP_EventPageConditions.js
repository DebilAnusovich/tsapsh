//=============================================================================
// Yanfly Engine Plugins - Event Page Conditions
// YEP_EventPageConditions.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_EventPageConditions = true;

var Yanfly = Yanfly || {};
Yanfly.EvPageCon = Yanfly.EvPageCon || {};
Yanfly.EvPageCon.version = 1.00;

//=============================================================================
 /*:
 * @plugindesc vWIP Add more conditions for each event page through the use
 * of comment tags to bypass the default limitations of RPG Maker MV.
 * @author Yanfly Engine Plugins
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * RPG Maker MV's editor doesn't give you much to work with when setting an
 * event's page conditions. All you get are two switches that only check if
 * they are in the ON position, a variable that can only check for greater than
 * or equal to against a single number, a self switch that's only in the ON
 * position, the possession of an item in your inventory, and the presence of
 * an actor. Getting any other kind of condition or even multiple of the same
 * kind can be difficult to accomplish.
 *
 * This plugin will help solve these issues by providing comment tags that can
 * be placed on each page to make for a variety of page conditions that aren't
 * possible with just the default editor alone. Add as many checks as you want
 * in flexible ways to fit your liking to expand the ways your game's events
 * can operate.
 *
 * ============================================================================
 * Comment Tags
 * ============================================================================
 *
 * To make use of this plugin's custom Event Page Conditions, insert comment
 * tags into the respective event page that you wish to give a custom Event
 * Page Condition(s) for.
 *
 * Make a comment with the following tags. If there is not enough room in the
 * comment, use multiple comments to chain them together to extend the custom
 * Event Page Condition(s) you wish to use.
 *
 * If there are multiple page conditions, then ALL page conditions must be met
 * in order for the page to become active.
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * Custom Page Condition Main Tag
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * <Page Conditions>
 * condition
 * condition
 * </Page Conditions>
 *
 * This will cause the event page with this comment tag to check through each
 * of the listed conditions. Replace 'condition' in the comment tag above with
 * any of the following conditions listed below. All conditions must be met in
 * order for the page condition to be met.
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * Conditions
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * ---
 *
 * Switch x ON
 * Switch x OFF
 * - Replace 'x' with an integer value that will refer to the switch ID you
 * wish to check as ON or OFF for this page condition.
 *
 * *Note: If you are using YEP_SelfSwVar and the ID belongs to a self switch,
 * it will check the Self Switch instead.
 *
 * ---
 *
 * Variable x > y
 * Variable x >= y
 * Variable x === y
 * Variable x !== y
 * Variable x <= y
 * Variable x < y
 * - Replace 'x' with an integer value that will refer to the variable ID you
 * wish to grab information from. Replace 'y' with either a numeric value or
 * JavaScript code to gather data from such as '$gameParty.steps()'.
 *
 * *Note: If you are using YEP_SelfSwVar and the ID belongs to a self variable,
 * it will check the Self Variable instead.
 *
 * ---
 *
 * Self Switch A ON
 * Self Switch B OFF
 * Self Switch C ON
 * Self Switch D OFF
 * - Check if a certain self switch is ON or OFF for this page condition.
 *
 * *Note: If you are using YEP_SelfSwVar, use regular switches and variables to
 * associate with the related self switches and self variables instead.
 *
 * ---
 *
 * Timer > x
 * Timer >= x
 * Timer === x
 * Timer !=== x
 * Timer <= x
 * Timer < x
 * - Replace 'x' with an integer value that will be used to check against the
 * currently active timer in seconds. If the timer is off, this will return as
 * a true value. If the timer is on, it will return a check based on the 'x'
 * value of the condition.
 *
 * ---
 *
 * Actor x: y
 * Actor name: y
 * - Replace 'x' with the ID of the actor you wish to make a check for this
 * event's page conditions. If you wish to enter the name of the actor instead,
 * enter the database version of it. Replace 'y' with one of the following:
 *
 * Actor x: Name Is string
 * Actor x: Name Is Not string
 * - Makes a check to see if actor x's current name ingame is 'string' or not.
 *
 * Actor x: Class Is Class z
 * Actor x: Class Is Not Class z
 * Actor x: Class Is string
 * Actor x: Class Is Not string
 * - Replace 'z' with the ID of the class you wish to check or 'string' with
 * the name of the class you wish to check. This will check if the actor x's
 * current class is the checked class or not.
 *
 * Actor x: Learned Skill z
 * Actor x: Not Learned Skill z
 * Actor x: Learned Skill string
 * Actor x: Not Learned Skill string
 * - Replace 'z' with the ID of the skill you wish to check or 'string' with
 * the name of the skill you wish to check. This will check if the actor x has
 * the checked skill learned or not.
 *
 * Actor x: Equipped Weapon z
 * Actor x: Not Equipped Weapon z
 * Actor x: Equipped Weapon string
 * Actor x: Not Equipped Weapon string
 * - Replace 'z' with the ID of the weapon you wish to check or 'string' with
 * the name of the weapon you wish to check. This will check if the actor x has
 * that weapon currently equipped or not.
 *
 * Actor x: Equipped Armor z
 * Actor x: Not Equipped Armor z
 * Actor x: Equipped Armor string
 * Actor x: Not Equipped Armor string
 * - Replace 'z' with the ID of the armor you wish to check or 'string' with
 * the name of the armor you wish to check. This will check if the actor x has
 * that armor currently equipped or not.
 *
 * Actor x: State z
 * Actor x: Not State z
 * Actor x: State string
 * Actor x: Not State string
 * - Replace 'z' with the ID of the state you wish to check or 'string' with
 * the name of the state you wish to check. This will check if the actor x has
 * that state currently applied or not.
 *
 * ---
 *
 * Player Is Facing string
 * Player Is Not Facing string
 * - Replace 'string' with either 'down', 'left', 'right', 'up', 'down-left',
 * 'down-right', 'up-left', or 'up-right'. This will check if the player on the
 * map is currently facing that direction or not.
 *
 * ---
 *
 * This Event Is Facing string
 * This Event Is Not Facing string
 * - Replace 'string' with either 'down', 'left', 'right', 'up', 'down-left',
 * 'down-right', 'up-left', or 'up-right'. This will check if the event this
 * comment tag is on is currently facing that direction or not.
 *
 * ---
 *
 * Event x Is Facing string
 * Event x Is Not Facing string
 * - Replace 'x' with the ID of the event on the current map that you wish to
 * check for. Replace 'string' with either 'down', 'left', 'right', 'up',
 * 'down-left', 'down-right', 'up-left', or 'up-right'. This will check if the
 * event x is on is currently facing that direction or not.
 *
 * ---
 *
 * Boat Is Driven
 * Boat Is Not Driven
 * Ship Is Driven
 * Ship Is Not Driven
 * Airship Is Driven
 * Airship Is Not Driven
 * - Check to see if a specific vehicle is currently being driven or not.
 *
 * ---
 *
 * And that's all for the custom conditions that can be used for the
 * <Page Conditions> comment tag available with this plugin.
 *
 * ============================================================================
 * Lunatic Mode - Eval Page Conditions
 * ============================================================================
 *
 * For those with JavaScript experience, you can insert custom page conditions
 * handled through the usage of JavaScript using the following comment tag.
 *
 * Make a comment with the following tags. If there is not enough room in the
 * comment, use multiple comments to chain them together to extend the custom
 * Event Page Condition(s) you wish to use.
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Eval Page Condition
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 * <Eval Page Conditions>
 * if ($gameActors.actor(1).level >= 10) {
 *   condition = true;
 * } else {
 *   condition = false;
 * }
 * </Eval Page Conditions>
 *
 * The 'condition' variable will be used to determine if the page condition is
 * met (if it is 'true') or unmet (if it is 'false'). Replace the code inside
 * the <Eval Page Conditions> comment tags to your liking.
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * The tricky thing about custom Event Page Conditions is that they don't
 * automatically update themselves upon changes that happen to the party (such
 * as leveling up or moving to a certain area). This is because RPG Maker MV
 * does not do real time checks to reduce potential lag.
 *
 * Instead, it only makes a check for each event page to see if new conditions
 * have to be met upon fulfilling certain actions such as changing a switch,
 * variable, self switches, adding/removing actors, and gaining items.
 *
 * However, we can forcefully make an update by using the following plugin
 * command to force a map refresh and check for new page conditions.
 *
 * --------------
 * Plugin Command
 * --------------
 *
 *   RefreshMap
 *   - This plugin command will force the map to refresh itself, allowing for
 *   potentially new page conditions to be updated.
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version BETA:
 * - Started Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 */
//=============================================================================

//=============================================================================
// DataManager
//=============================================================================

Yanfly.EvPageCon.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
  if (!Yanfly.EvPageCon.DataManager_isDatabaseLoaded.call(this)) return false;
  if (!Yanfly._loaded_YEP_EventPageConditions) {
    this.processEvPageConNotetagsAC($dataActors);
    this.processEvPageConNotetagsCL($dataClasses);
    this.processEvPageConNotetagsI($dataItems);
    this.processEvPageConNotetagsW($dataWeapons);
    this.processEvPageConNotetagsA($dataArmors);
    this.processEvPageConNotetagsS($dataSkills);
    this.processEvPageConNotetagsT($dataStates);
    this.processEvPageConNotetagsSys($dataSystem);
    Yanfly._loaded_YEP_EventPageConditions = true;
  }
  return true;
};

DataManager.processEvPageConNotetagsAC = function(group) {
  if (Yanfly.ActorIdRef) return;
  Yanfly.ActorIdRef = {};
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    if (obj.name.length <= 0) continue;
    Yanfly.ActorIdRef[obj.name.toUpperCase()] = n;
  }
};

DataManager.processEvPageConNotetagsCL = function(group) {
  if (Yanfly.ClassIdRef) return;
  Yanfly.ClassIdRef = {};
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    if (obj.name.length <= 0) continue;
    Yanfly.ClassIdRef[obj.name.toUpperCase()] = n;
  }
};

DataManager.processEvPageConNotetagsI = function(group) {
  if (Yanfly.ItemIdRef) return;
  Yanfly.ItemIdRef = {};
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    if (obj.name.length <= 0) continue;
    Yanfly.ItemIdRef[obj.name.toUpperCase()] = n;
  }
};

DataManager.processEvPageConNotetagsW = function(group) {
  if (Yanfly.WeaponIdRef) return;
  Yanfly.WeaponIdRef = {};
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    if (obj.name.length <= 0) continue;
    Yanfly.WeaponIdRef[obj.name.toUpperCase()] = n;
  }
};

DataManager.processEvPageConNotetagsA = function(group) {
  if (Yanfly.ArmorIdRef) return;
  Yanfly.ArmorIdRef = {};
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    if (obj.name.length <= 0) continue;
    Yanfly.ArmorIdRef[obj.name.toUpperCase()] = n;
  }
};

DataManager.processEvPageConNotetagsS = function(group) {
  if (Yanfly.SkillIdRef) return;
  Yanfly.SkillIdRef = {};
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    if (obj.name.length <= 0) continue;
    Yanfly.SkillIdRef[obj.name.toUpperCase()] = n;
  }
};

DataManager.processEvPageConNotetagsT = function(group) {
  if (Yanfly.StateIdRef) return;
  Yanfly.StateIdRef = {};
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    if (obj.name.length <= 0) continue;
    Yanfly.StateIdRef[obj.name.toUpperCase()] = n;
  }
};

DataManager.processEvPageConNotetagsSys = function(group) {
  Yanfly.STypeIdRef = {};
  for (var i = 1; i < group.skillTypes.length; ++i) {
    var name = group.skillTypes[i].toUpperCase();
    name = name.replace(/\\I\[(\d+)\]/gi, '');
    Yanfly.STypeIdRef[name] = i;
  }
  Yanfly.ElementIdRef = {};
  for (var i = 1; i < group.elements.length; ++i) {
    var name = group.elements[i].toUpperCase();
    name = name.replace(/\\I\[(\d+)\]/gi, '');
    Yanfly.ElementIdRef[name] = i;
  }
};

//=============================================================================
// Game_Event
//=============================================================================

Yanfly.EvPageCon.Game_Event_meetsConditions =
  Game_Event.prototype.meetsConditions;
Game_Event.prototype.meetsConditions = function(page) {
  // Original Condition
  var condition = Yanfly.EvPageCon.Game_Event_meetsConditions.call(this, page);
  // Self Switch/Var Compatibility
  if (Imported.YEP_SelfSwVar) {
    $gameTemp.setSelfSwVarEvent(this._mapId, this._eventId);
  }
  if (condition && this.hasCustomPageConditions(page)) {
    var condition = this.checkCustomPageConditions(page);
  }
  // Self Switch/Var Compatibility
  if (Imported.YEP_SelfSwVar) $gameTemp.clearSelfSwVarEvent();
  // Finish
  return condition;
};

Game_Event.prototype.hasCustomPageConditions = function(page) {
  if (!page) return false;
  var index = this.event().pages.indexOf(page) + 1;
  this._customPageConditions = this._customPageConditions || {};
  if (this._customPageConditions[index]) {
    return this._customPageConditions[index];
  }
  var condition = false;
  var comment = '';
  var list = page.list;
  var length = list.length;
  for (var i = 0; i < length; ++i) {
    var ev = list[i];
    if ([108, 408].contains(ev.code)) comment += ev.parameters[0] + '\n';
  }
  comment = comment.trim();
  if (this.getCustomPageConditions(comment).length > 0) condition = true;
  if (this._customPageConditionsEval.length > 0) condition = true;
  this._customPageConditions[index] = condition;
  return this._customPageConditions[index];
};

Game_Event.prototype.getCustomPageConditions = function(comment) {
  this._customPageConditions = [];
  this._customPageConditionsEval = '';
  var notedata = comment.split(/[\r\n]+/);
  var length = notedata.length;
  var evalMode = 'none';

  for (var i = 0; i < length; ++i) {
    var line = notedata[i];
    if (line.match(/<(?:PAGE CONDITION|PAGE CONDITIONS)>/i)) {
      var evalMode = 'event page condition';
    } else if (line.match(/<\/(?:PAGE CONDITION|PAGE CONDITIONS)>/i)) {
      var evalMode = 'none';
    } else if (evalMode === 'event page condition') {
      this._customPageConditions.push(line);
    } else if (line.match(/<(?:EVAL PAGE CONDITION|EVAL PAGE CONDITIONS)>/i)) {
      var evalMode = 'eval event page condition';
    } else if (line.match(/<\/(?:EVAL PAGE CONDITION|EVAL PAGE CONDITIONS)>/i)) {
      var evalMode = 'none';
    } else if (evalMode === 'eval event page condition') {
      this._customPageConditionsEval += line + '\n';
    }
  }

  return this._customPageConditions;
};

Game_Event.prototype.checkCustomPageConditions = function(page) {
  var comment = '';
  var list = page.list;
  var length = list.length;
  for (var i = 0; i < length; ++i) {
    var ev = list[i];
    if ([108, 408].contains(ev.code)) comment += ev.parameters[0] + '\n';
  }
  comment = comment.trim();
  var checks = this.getCustomPageConditions(comment);
  if (!this.checkAllCustomPageConditions(checks)) return false;
  if (!this.checkCustomEvalPageConditions(page)) return false;
  return true;
};

Game_Event.prototype.checkCustomEvalPageConditions = function(page) {
  if (this._customPageConditionsEval.length <= 0) return true;
  var condition = true;
  var index = this.event().pages.indexOf(page) + 1;
  var code = this._customPageConditionsEval;
  try {
    eval(code);
  } catch (e) {
    Yanfly.Util.displayError(e, code, 'EVENT PAGE CONDITION EVAL CODE ERROR');
  }
  return condition;
};

Game_Event.prototype.checkAllCustomPageConditions = function(checks) {
  var length = checks.length;
  for (var i = 0; i < length; ++i) {
    var check = checks[i];
    if (!check) continue;
    if (!this.checkCustomPageCondition(check)) return false;
  }
  return true;
};

Game_Event.prototype.checkCustomPageCondition = function(line) {
  // Switch Check ON/OFF
  if (line.match(/SWITCH[ ](\d+)/i)) {
    if (!this.EvPageConSwitchCheck(line)) return false;
  }
  // Variable Check
  if (line.match(/VARIABLE[ ](\d+)/i)) {
    if (!this.EvPageConVariableCheck(line)) return false;
  }
  // Self Switch
  if (line.match(/(?:SELF SWITCH|SELFSWITCH)[ ](.*)/i)) {
    if (!this.EvPageConSelfSwitchCheck(line)) return false;
  }
  // Timer
  if (line.match(/TIMER[ ](.*)/i)) {
    if (!this.EvPageConTimerCheck(line)) return false;
  }
  // Actor
  if (line.match(/ACTOR[ ](.*)/i)) {
    if (!this.EvPageConActorCheck(line)) return false;
  }
  // Player
  if (line.match(/PLAYER[ ](.*)/i)) {
    if (!this.EvPageConPlayerCheck(line)) return false;
  }
  // Event
  if (line.match(/EVENT[ ](.*)/i)) {
    if (!this.EvPageConEventCheck(line)) return false;
  }
  // VEHICLE
  if (line.match(/BOAT[ ](.*)/i)) {
    if (!this.EvPageConVehicleCheck(line, 0)) return false;
  } else if (line.match(/AIRSHIP[ ](.*)/i)) {
    if (!this.EvPageConVehicleCheck(line, 1)) return false;
  } else if (line.match(/SHIP[ ](.*)/i)) {
    if (!this.EvPageConVehicleCheck(line, 2)) return false;
  }
  return true;
};

Game_Event.prototype.EvPageConSwitchCheck = function(line) {
  if (line.match(/SWITCH[ ](\d+)[ ](?:ON|TRUE)/i)) {
    var switchId = parseInt(RegExp.$1);
    return $gameSwitches.value(switchId);
  } else if (line.match(/SWITCH[ ](\d+)[ ](?:OFF|FALSE)/i)) {
    var switchId = parseInt(RegExp.$1);
    return !$gameSwitches.value(switchId);
  }
  return false;
};

Game_Event.prototype.EvPageConVariableCheck = function(line) {
  line = line.replace(/VARIABLE[ ](\d+)/gi, function() {
    return $gameVariables.value(parseInt(arguments[1]));
  }.bind(this));
  line = 'condition = ' + line;
  var condition = false;
  try {
    eval(line);
  } catch (e) {
    Yanfly.Util.displayError(e, line, 'EVENT PAGE CONDITION VARIABLE ERROR');
  }
  return condition;
};

Game_Event.prototype.EvPageConSelfSwitchCheck = function(line) {
  if (Imported.YEP_SelfSwVar && line.match(/SWITCH[ ](\d+)/)) {
    var variableId = parseInt(RegExp.$1);
    var key = [this._mapId, this._eventId, 'SELF VARIABLE ' + variableId];
  } else if (line.match(/SWITCH[ ](.*)/)) {
    var letter = String(RegExp.$1).toUpperCase();
    var key = [this._mapId, this._eventId, letter];
  } else {
    return false;
  }
  if (line.match(/SWITCH[ ](.*)[ ](?:ON|TRUE)/i)) {
    return $gameSelfSwitches.value(key);
  } else if (line.match(/SWITCH[ ](.*)[ ](?:OFF|FALSE)/i)) {
    return !$gameSelfSwitches.value(key);
  }
  return false;
};

Game_Event.prototype.EvPageConTimerCheck = function(line) {
  if ($gameTimer.isWorking()) {
    line = 'condition = ' + line;
    line = line.replace(/TIMER[ ](\d+)/gi, '$gameTimer.seconds()');
    var condition = false;
    try {
      eval(line);
    } catch (e) {
      Yanfly.Util.displayError(e, line, 'EVENT PAGE CONDITION VARIABLE ERROR');
    }
    return condition;
  } else {
    return true;
  }
};

Game_Event.prototype.EvPageConActorCheck = function(line) {
  if (line.match(/ACTOR[ ](\d+):[ ](.*)/i)) {
    var actor = $gameActors.actor(parseInt(RegExp.$1));
    var line2 = String(RegExp.$2);
  } else if (line.match(/ACTOR[ ](.*):[ ](.*)/i)) {
    var name = String(RegExp.$1).toUpperCase();
    if (!Yanfly.ActorIdRef[name]) return false;
    var actorId = Yanfly.ActorIdRef[name];
    var actor = $gameActors.actor(actorId)
    var line2 = String(RegExp.$2);
  } else {
    return false;
  }
  if (!actor) return false;
  // Name Check
  if (line2.match(/NAME IS NOT (.*)/i)) {
    var name = String(RegExp.$1).toUpperCase();
    return actor.name().toUpperCase() !== name;
  } else if (line2.match(/NAME IS (.*)/i)) {
    var name = String(RegExp.$1).toUpperCase();
    return actor.name().toUpperCase() === name;
  }
  // Class Check
  if (line2.match(/CLASS IS NOT CLASS (\d+)/i)) {
    var classId = parseInt(RegExp.$1);
    return actor.class().id !== classId;
  } else if (line2.match(/CLASS IS NOT (.*)/i)) {
    var name = String(RegExp.$1).toUpperCase();
    if (!Yanfly.ClassIdRef[name]) return false;
    var classId = Yanfly.ClassIdRef[name];
    return actor.class().id !== classId;
  } else if (line2.match(/CLASS IS CLASS (\d+)/i)) {
    var classId = parseInt(RegExp.$1);
    return actor.class().id === classId;
  } else if (line2.match(/CLASS IS (.*)/i)) {
    var name = String(RegExp.$1).toUpperCase();
    if (!Yanfly.ClassIdRef[name]) return false;
    var classId = Yanfly.ClassIdRef[name];
    return actor.class().id === classId;
  }
  // Learned Skill
  if (line2.match(/NOT LEARNED SKILL (\d+)/i)) {
    var skillId = parseInt(RegExp.$1);
    return !actor.isLearnedSkill(skillId);
  } else if (line2.match(/NOT LEARNED SKILL (.*)/i)) {
    var name = String(RegExp.$1).toUpperCase();
    if (!Yanfly.SkillIdRef[name]) return false;
    var skillId = Yanfly.SkillIdRef[name];
    return !actor.isLearnedSkill(skillId);
  } else if (line2.match(/LEARNED SKILL (\d+)/i)) {
    var skillId = parseInt(RegExp.$1);
    return actor.isLearnedSkill(skillId);
  } else if (line2.match(/LEARNED SKILL (.*)/i)) {
    var name = String(RegExp.$1).toUpperCase();
    if (!Yanfly.SkillIdRef[name]) return false;
    var skillId = Yanfly.SkillIdRef[name];
    return actor.isLearnedSkill(skillId);
  }
  // Equipped Weapon
  if (line2.match(/NOT EQUIPPED WEAPON (\d+)/i)) {
    var weaponId = parseInt(RegExp.$1);
    var item = $dataWeapons[weaponId];
    return !actor.isEquipped(item);
  } else if (line2.match(/NOT EQUIPPED WEAPON (.*)/i)) {
    var name = String(RegExp.$1).toUpperCase();
    if (!Yanfly.WeaponIdRef[name]);
    var weaponId = Yanfly.WeaponIdRef[name];
    var item = $dataWeapons[weaponId];
    return !actor.isEquipped(item);
  } else if (line2.match(/EQUIPPED WEAPON (\d+)/i)) {
    var weaponId = parseInt(RegExp.$1);
    var item = $dataWeapons[weaponId];
    return actor.isEquipped(item);
  } else if (line2.match(/EQUIPPED WEAPON (.*)/i)) {
    var name = String(RegExp.$1).toUpperCase();
    if (!Yanfly.WeaponIdRef[name]);
    var weaponId = Yanfly.WeaponIdRef[name];
    var item = $dataWeapons[weaponId];
    return actor.isEquipped(item);
  }
  // Equipped Armor
  if (line2.match(/NOT EQUIPPED ARMOR (\d+)/i)) {
    var armorId = parseInt(RegExp.$1);
    var item = $dataArmors[armorId];
    return !actor.isEquipped(item);
  } else if (line2.match(/NOT EQUIPPED ARMOR (.*)/i)) {
    var name = String(RegExp.$1).toUpperCase();
    if (!Yanfly.ArmorIdRef[name]);
    var armorId = Yanfly.ArmorIdRef[name];
    var item = $dataArmors[armorId];
    return !actor.isEquipped(item);
  } else if (line2.match(/EQUIPPED ARMOR (\d+)/i)) {
    var armorId = parseInt(RegExp.$1);
    var item = $dataArmors[armorId];
    return actor.isEquipped(item);
  } else if (line2.match(/EQUIPPED ARMOR (.*)/i)) {
    var name = String(RegExp.$1).toUpperCase();
    if (!Yanfly.ArmorIdRef[name]);
    var armorId = Yanfly.ArmorIdRef[name];
    var item = $dataArmors[armorId];
    return actor.isEquipped(item);
  }
  // State
  if (line2.match(/NOT STATE (\d+)/i)) {
    var stateId = parseInt(RegExp.$1);
    var item = $dataStates[stateId];
    return !actor.isEquipped(item);
  } else if (line2.match(/NOT STATE (.*)/i)) {
    var name = String(RegExp.$1).toUpperCase();
    if (!Yanfly.StateIdRef[name]);
    var stateId = Yanfly.StateIdRef[name];
    var item = $dataStates[stateId];
    return !actor.isEquipped(item);
  } else if (line2.match(/STATE (\d+)/i)) {
    var stateId = parseInt(RegExp.$1);
    var item = $dataStates[stateId];
    return actor.isEquipped(item);
  } else if (line2.match(/STATE (.*)/i)) {
    var name = String(RegExp.$1).toUpperCase();
    if (!Yanfly.StateIdRef[name]);
    var stateId = Yanfly.StateIdRef[name];
    var item = $dataStates[stateId];
    return actor.isEquipped(item);
  }
  return false;
};

Game_Event.prototype.EvPageConPlayerCheck = function(line) {
  return this.EvPageConMapEvCheck(line, $gamePlayer);
};

Game_Event.prototype.EvPageConEventCheck = function(line) {
  if (line.match(/THIS EVENT/i)) {
    var ev = this;
  } else if (line.match(/EVENT (\d+)/i)) {
    var ev = $gameMap.event(parseInt(RegExp.$1));
  }
  return this.EvPageConMapEvCheck(line, ev);
};

Game_Event.prototype.EvPageConMapEvCheck = function(line, target) {
  // Facing Direction
  if (line.match(/IS FACING (.*)/i)) {
    var str = String(RegExp.$1).toUpperCase();
    var directions = [null, 'DOWN-LEFT', 'DOWN', 'DOWN-RIGHT', 'LEFT', 'RIGHT',
      'UP-LEFT', 'UP', 'UP-RIGHT'];
    var value = directions.indexOf(str);
    return value === target.direction();
  } else if (line.match(/IS NOT FACING (.*)/i)) {
    var str = String(RegExp.$1).toUpperCase();
    var directions = [null, 'DOWN-LEFT', 'DOWN', 'DOWN-RIGHT', 'LEFT', 'RIGHT',
      'UP-LEFT', 'UP', 'UP-RIGHT'];
    var value = directions.indexOf(str);
    return value !== target.direction();
  }
  return false;
};

Game_Event.prototype.EvPageConVehicleCheck = function(line, vehicleId) {
  if (line.match(/IS DRIVEN/i)) {
    return $gamePlayer.vehicle() === $gameMap.vehicle(vehicleId);
  } else if (line.match(/IS NOT DRIVEN/i)) {
    return $gamePlayer.vehicle() !== $gameMap.vehicle(vehicleId);
  }
};

//=============================================================================
// Game_Interpreter
//=============================================================================

Yanfly.EvPageCon.Game_Interpreter_pluginCommand =
  Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
  Yanfly.EvPageCon.Game_Interpreter_pluginCommand.call(this, command, args);
  if (command.match(/RefreshMap/i)) {
    if (!$gameParty.inBattle()) {
      $gameMap.requestRefresh($gameMap.mapId());
    }
  }
};

//=============================================================================
// Utilities
//=============================================================================

Yanfly.Util = Yanfly.Util || {};

Yanfly.Util.displayError = function(e, code, message) {
  console.log(message);
  console.log(code || 'NON-EXISTENT');
  console.error(e);
  if (Utils.RPGMAKER_VERSION && Utils.RPGMAKER_VERSION >= "1.6.0") return;
  if (Utils.isNwjs() && Utils.isOptionValid('test')) {
    if (!require('nw.gui').Window.get().isDevToolsOpen()) {
      require('nw.gui').Window.get().showDevTools();
    }
  }
};

//=============================================================================
// End of File
//=============================================================================