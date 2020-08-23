//-----------------------------------------------------------------------------
//  Galv's Crit States
//-----------------------------------------------------------------------------
//  For: RPGMAKER MV
//  Galv_CritStates.js
//-----------------------------------------------------------------------------
//  2016-09-29 - Version 1.0 - release
//-----------------------------------------------------------------------------
// Terms can be found at:
// galvs-scripts.com
//-----------------------------------------------------------------------------

var Imported = Imported || {};
Imported.Galv_CritStates = true;

var Galv = Galv || {};          // Galv's main object
Galv.CRITS = Galv.CRITS || {};        // Galv's stuff

//-----------------------------------------------------------------------------
/*:
 * @plugindesc (v.1.0) Apply states during battle when a crit is caused or missing.
 * 
 * @author Galv - galvs-scripts.com
 *
 * @param
 * @desc
 * @default
 *
 * @help
 *   Galv's Crit States
 * ----------------------------------------------------------------------------
 * This plugin allows you to apply states to battlers if they critical or
 * miss an attack/skill in combat.
 * The below note tags control these states. Only one state per action will be
 * applied, in priority order: skill, weapon (attack only), class, actor/enemy
 *
 * ----------------------------------------------------------------------------
 *   NOTE TAGS FOR - Skill, Weapon, Class, Actor, Enemy
 * ----------------------------------------------------------------------------
 *
 *   <critStateT:x>   // state x applied to target on critical hit
 *   <critStateU:x>   // state x applied to user when target is crit
 *
 *   <missStateT:x>   // state x applied to target when missed
 *   <missStateU:x>   // state x applied to user when skill misses
 * 
 * ----------------------------------------------------------------------------
 * Adding a crit/miss state to a weapon will mean any skill used that has a
 * hit type 'physical' and does not have a note tag will use the note tag from
 * the weapon instead to get the crit/miss state. In case of dual weilding it
 * will random between both weapons if both have a crit/miss state.
 */

//-----------------------------------------------------------------------------
//  CODE STUFFS
//-----------------------------------------------------------------------------


(function() {

//-----------------------------------------------------------------------------
//  GAME ACTION
//-----------------------------------------------------------------------------

Game_Action.prototype.doCritApplyState = function(target, state) {
	if (!state || !target) return;
	var stateId = state;
	var chance = 1;

	chance *= target.stateRate(stateId);
	chance *= this.lukEffectRate(target);
	  
	if (Math.random() < chance) {
		if (stateId === target.deathStateId()) {
			if (target.isImmortal()) target.removeImmortal();
		}
		target.addState(stateId);
		
		if (target == this.subject()) {
			target._attackingState = state;  // set variable on attacker
		};
	}
};

Game_Action.prototype.getCritStateId = function(item,type) {
	var targetState = 0;
	var subject = this.subject();

	if (item.meta[type]) {
		var targetState = item.meta[type];
	} else {
		if (subject.isActor()) {
			var weapon1 = subject._equips[0] && subject._equips[0].isWeapon() ? subject._equips[0].object() : 0;
			var weapon2 = subject._equips[1] && subject._equips[1].isWeapon() ? subject._equips[1].object() : 0;
			
			var state1 = weapon1 ? weapon1.meta[type] : 0;
			var state2 = weapon2 ? weapon2.meta[type] : 0;

			if (this.isPhysical() && (state1 || state2)) {
				// weapon
				if (state1 && state2) {
					// if both weapons have state, random
					var array = [state1,state2];
					var targetState = array[Math.floor(Math.random() * array.length)];
					
				} else {
					var targetState = state1 || state2;
				}
			} else {
				// class or actor
				var targetState = subject.currentClass().meta[type] || $dataActors[subject.actorId()].meta[type];
			}
		} else {
			// enemy
			var targetState = $dataEnemies[subject.enemyId()].meta[type];
		}
	}
	
	return targetState;
};

// Check for crit state
Galv.CRITS.Game_Action_makeDamageValue = Game_Action.prototype.makeDamageValue;
Game_Action.prototype.makeDamageValue = function(target, critical) {
	if (critical) this.doCritStateCheck(target);
	return Galv.CRITS.Game_Action_makeDamageValue.call(this,target,critical);
};

Game_Action.prototype.doCritStateCheck = function(target) {
	var item = this.item();
	
	// Get Target State
	var targetState = this.getCritStateId(item,'critStateT');
	// Get User State
	var userState = this.getCritStateId(item,'critStateU');

	this.doCritApplyState(target,targetState);           // apply target state
	this.doCritApplyState(this.subject(),userState);     // apply user state
};

// Check for miss state
Galv.CRITS.Game_Action_apply = Game_Action.prototype.apply;
Game_Action.prototype.apply = function(target) {
	Galv.CRITS.Game_Action_apply.call(this,target);
	var result = target.result();
	if (!result.isHit()) this.doMissStateCheck(target);
};

Game_Action.prototype.doMissStateCheck = function(target) {
	var item = this.item();

	// Get Target State
	var targetState = this.getCritStateId(item,'missStateT');
	// Get User State
	var userState = this.getCritStateId(item,'missStateU');
	
	this.doCritApplyState(target,targetState);           // apply target state
	this.doCritApplyState(this.subject(),userState);     // apply user state
};


//-----------------------------------------------------------------------------
//  GAME ACTION
//-----------------------------------------------------------------------------

Window_BattleLog.prototype.displayAddSpecifcState = function(subject,state) {
	if (!state || !subject) return;
    var stateText = subject.isActor() ? $dataStates[state].message1 : $dataStates[state].message2;
    if (stateText) {
        this.push('addText', subject.name() + stateText);
        this.push('wait');
    }
};

Galv.CRITS.Window_BattleLog_displayActionResults = Window_BattleLog.prototype.displayActionResults;
Window_BattleLog.prototype.displayActionResults = function(subject, target) {
	this._subjectHasState = [subject,subject._attackingState]; // set attacker and attacker crit state
	Galv.CRITS.Window_BattleLog_displayActionResults.call(this,subject,target);
	this._subjectHasState = null;
};

Window_BattleLog.prototype.displayCritMissSelfStateTxt = function(target) {
	// Add state text for critical effect for self target
	if (this._subjectHasState) {
		var selfTarget = this._subjectHasState[0];
		selfTarget._attackingState = null;
		var state = this._subjectHasState[1];
        this.displayAddSpecifcState(selfTarget,state);
    }
};

// Display crit state in log
Galv.CRITS.Window_BattleLog_displayCritical = Window_BattleLog.prototype.displayCritical;
Window_BattleLog.prototype.displayCritical = function(target) {
	Galv.CRITS.Window_BattleLog_displayCritical.call(this,target);
	if (target.result().critical) this.displayCritMissSelfStateTxt(target);
};

// Display miss state in log
Galv.CRITS.Window_BattleLog_displayDamage = Window_BattleLog.prototype.displayDamage;
Window_BattleLog.prototype.displayDamage = function(target) {
	Galv.CRITS.Window_BattleLog_displayDamage.call(this,target);
	if (target.result().missed) this.displayCritMissSelfStateTxt(target);
};

})();