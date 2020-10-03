var SOL = SOL || {};
/*:
 * @plugindesc v1.00 Allows you to use cheats in game
 * @author Soulrender
 *
 * @help You can use cheats in your game, cool huh?
 * How to use this plugin? Simple just install it and in game press
 * ~ key on keyboard (it's located under ESC key) and enter one of
 * following cheats:
 *
 * GodMode - makes entire party invincible, however you need to
 * setup your state in database that will make actors invincible
 *
 * ItsRainingCash - Gives X gold to the party, wich can be set in
 * plugin parameters, by default this cheat gives 99999999 gold
 *
 * IFearNoEvil - Revives all dead party members
 * SmokeWeed - Restore HP to full for all party members
 * DrinkBooze - Restore MP to full for all party members
 * KaneWasHere - Restore TP to full for all party members
 * IWantItAll - Restore All params for all.
 * AlphaOmega - Automaticly Win battle.
 *
 * @param --- God Mode ---
 * @default
 * 
 * @param God Mode Cheat
 * @parent --- God Mode ---
 * @default GodMode
 * @param God Mode State
 * @parent --- God Mode ---
 * @type number
 * @default 3
 *
 * @param --- Gold Mode ---
 * @default
 * 
 * @param Gold Cheat
 * @parent --- Gold Mode ---
 * @default ItsRainingCash
 * @param Gold amount
 * @parent --- Gold Mode ---
 * @type number
 * @default 99999999 
 *
 * @param --- Revival Mode ---
 * @default
 * 
 * @param Revival Cheat
 * @parent --- Revival Mode ---
 * @default IFearNoEvil
 *
 * @param HP Restore Cheat
 * @parent --- Revival Mode ---
 * @default SmokeWeed
 *
 * @param MP Restore Cheat
 * @parent --- Revival Mode ---
 * @default DrinkBooze
 *
 * @param TP Restore Cheat
 * @parent --- Revival Mode ---
 * @default KaneWasHere
 *
 * @param Restore All Cheat
 * @parent --- Revival Mode ---
 * @default IWantItAll
 *
 * @param --- Victory ---
 * @default
 *
 * @param Win Battle Cheat
 * @parent --- Victory ---
 * @default AlphaOmega
 *
 *
 */

SOL.Parameters = PluginManager.parameters('SOL_Cheats');
SOL.Cheat = SOL.Cheat || {};
SOL.Cheat.godMode = SOL.Parameters["God Mode Cheat"];
SOL.Cheat.godState = Number(SOL.Parameters["God Mode State"]);
SOL.Cheat.goldCheat = SOL.Parameters["Gold Cheat"];
SOL.Cheat.goldCheatCash = Number(SOL.Parameters["Gold amount"]);
SOL.Cheat.reviveCheat = SOL.Parameters["Revival Cheat"];
SOL.Cheat.HP_Cheat = SOL.Parameters["HP Restore Cheat"];
SOL.Cheat.MP_Cheat = SOL.Parameters["MP Restore Cheat"];
SOL.Cheat.TP_Cheat = SOL.Parameters["TP Restore Cheat"];
SOL.Cheat.restoreAllCheat = SOL.Parameters["Restore All Cheat"];
SOL.Cheat.winBattleCheat = SOL.Parameters["Win Battle Cheat"]; 

var $cheat = null;

Cheat.prototype = Object.create(Cheat.prototype);
Cheat.prototype.constructor = Cheat;

function Cheat(){
	this.initialize.apply(this, arguments);
}

Cheat.prototype.initialize = function() {
	return this;
};

Cheat.prototype.applyGodMode = function(state){
	$gameParty.members().forEach(function(member){
		if (member.isDead){
			member.removeState(1);
			member.recoverAll();
			member.addState(state);
			console.log(member.name() + " is now immortal and cannot be killed!");
		}
	});	
}

Cheat.prototype.applyGoldCheat = function(cash){
	if ($gameParty._gold > 0){
	$gameParty.gainGold(-$gameParty._gold);}
	$gameParty.gainGold(Number(cash));
	console.log(cash + " was set to party account");
}

Cheat.prototype.reviveParty = function(){
	$gameParty.members().forEach(function(member){
		if (member.isDead()){
			member.removeState(1);
			member.recoverAll();
			console.log(member.name() + " was revived!");			
		}
	});	
}

Cheat.prototype.recoverHp = function(){
	$gameParty.members().forEach(function(member){
		if (member.isAlive()){
			member.gainHp(member.mhp);
			console.log(member.name() + " is now at full HP");
		}

	});	
}

Cheat.prototype.recoverMp = function(){
	$gameParty.members().forEach(function(member){
		if (member.isAlive()){
			member.gainHp(member.mmp);
			console.log(member.name() + " is now at full MP");
		}

	});	
}

Cheat.prototype.recoverTp = function(){
	$gameParty.members().forEach(function(member){
		if (member.isAlive()){
			member.gainTp(99999);
			console.log(member.name() + " is now at full TP");
		}
	});	
}

Cheat.prototype.recoverAll = function(){
	$gameParty.members().forEach(function(member){
		if (member.isAlive){
			member.recoverAll();
			member.clearStates();
			console.log(member.name() + " is fully recovered");
		}		
	});	
}

Cheat.prototype.winBattle = function(){
	if (SceneManager._scene instanceof Scene_Battle){
		$gameTroop.members().forEach(function(enemy){
			if (!enemy.isStateAffected(1)){
				enemy.addState(1);
				if (enemy.isDead()){
					enemy.performCollapse();
				}
			}		
		});
		BattleManager.processVictory();
		console.log("You won a battle!");
	}
}

Graphics._onKeyDown = function(event) { 
	if (event.keyCode === 192){
		if (SceneManager._scene instanceof Scene_Battle || SceneManager._scene instanceof Scene_Map){
			var cheat = prompt("Please Enter your cheat", "Cheat");
			if (cheat === null){
				window.focus();
				return;
			} else {
				switch (cheat){
					case SOL.Cheat.godMode : 
					{
						$cheat.applyGodMode(SOL.Cheat.godState);
						break;
					}
					case SOL.Cheat.goldCheat :
					{
						$cheat.applyGoldCheat(SOL.Cheat.goldCheatCash);
						break;
					}
					case SOL.Cheat.reviveCheat :
					{
						$cheat.reviveParty();
						break;
					}
					case SOL.Cheat.HP_Cheat :
					{
						$cheat.recoverHp();
						break;
					}
					case SOL.Cheat.MP_Cheat :
					{
						$cheat.recoverMp();
						break;
					}					
					case SOL.Cheat.TP_Cheat :
					{
						$cheat.recoverTp();
						break;
					}	
					case SOL.Cheat.restoreAllCheat :
					{
						$cheat.recoverAll();
						break;
					}					
					case SOL.Cheat.winBattleCheat :
					{
						$cheat.winBattle();
						break;
					}
					default:
					{
						alert("Unrecognized Cheat, sorry.");
					}					
				}
				window.focus();
			}
		} 
		else 
		{ 
			alert("You cannot use cheats here!"); 
		}
	}
}
$cheat = new Cheat();