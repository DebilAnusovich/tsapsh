/*:
 * @plugindesc Allows tracking of items bought by and sold to the player in shops.
 * @author Feldherren
 * @help Bought and Sold Item Tracker v1.0.0, by Feldherren (rpaliwoda AT googlemail.com)
 
Changelog:
1.0: initial commit
 
Tracks items bought and sold to shops, under specified labels.
To use, prior to using a Shop Processing event command, use the
TRACKSHOP [label] plugin command and provide some kind of label
to identify this shop with. All purchases made until the 
UNTRACKSHOP or TRACKSHOP [label] commands are used again (the
latter with a different label).

Data for a given label can be reset with the 
RESETTRACKEDSHOP [label] command.

Stored data can be retrieved to specified variables with the
GETTRACKEDDATA command.

Plugin commands:
TRACKSHOP [label]
Sets the plugin to track all items bought and sold under the label supplied.
The label may be a string.
UNTRACKSHOP
Stops tracking items bought and sold.
RESETTRACKEDSHOP [label]
Resets tracked items for label.
GETTRACKEDDATA [label] [item|weapon|armor] [bought|sold] [id] [variable]
Outputs the number of copies of an item, weapon or armour that have been 
bought or sold whilst tracking was active with the specified label to the
specified variable.

Free for use with commercial projects, though I'd appreciate being
contacted if you do use it in any games, just to know.
 */ 
(function(){
	var parameters = PluginManager.parameters('FELD_BoughtSoldItemTracking');
	
	var trackingLabel = null;
	
	var shops = Object();

	var FELD_BoughtSoldItemTracking_aliasPluginCommand = Game_Interpreter.prototype.pluginCommand;

	var oldDoBuy = Scene_Shop.prototype.doBuy;
	Scene_Shop.prototype.doBuy = function(number) {
		oldDoBuy.call(this, number);
		
		if (trackingLabel != null)
		{
			if (!(trackingLabel in shops))
			{
				shops[trackingLabel] = Object();
				shops[trackingLabel].itemsBought = Object();
				shops[trackingLabel].weaponsBought = Object();
				shops[trackingLabel].armourBought = Object();
				shops[trackingLabel].itemsSold = Object();
				shops[trackingLabel].weaponsSold = Object();
				shops[trackingLabel].armourSold = Object();
			}
		
			if (DataManager.isItem(this._item)) // item
			{
				if (!(this._item.id in shops[trackingLabel].itemsBought))
				{
					shops[trackingLabel].itemsBought[this._item.id] = 0;
				}
				shops[trackingLabel].itemsBought[this._item.id] += number;
			}
			else if (DataManager.isWeapon(this._item)) // weapon
			{
				if (!(this._item.id in shops[trackingLabel].weaponsBought))
				{
					shops[trackingLabel].weaponsBought[this._item.id] = 0;
				}
				shops[trackingLabel].weaponsBought[this._item.id] += number;
			}
			else if (DataManager.isArmor(this._item)) // armor
			{
				if (!(this._item.id in shops[trackingLabel].armourBought))
				{
					shops[trackingLabel].armourBought[this._item.id] = 0;
				}
				shops[trackingLabel].armourBought[this._item.id] += number;
			}
			console.log(shops);
		}
	};

	var oldDoSell = Scene_Shop.prototype.doSell;
	Scene_Shop.prototype.doSell = function(number) {
		oldDoSell.call(this, number);
		
		if (trackingLabel != null)
		{
			if (!(trackingLabel in shops))
			{
				shops[trackingLabel] = Object();
				shops[trackingLabel].itemsBought = Object();
				shops[trackingLabel].weaponsBought = Object();
				shops[trackingLabel].armourBought = Object();
				shops[trackingLabel].itemsSold = Object();
				shops[trackingLabel].weaponsSold = Object();
				shops[trackingLabel].armourSold = Object();
			}
		
			if (DataManager.isItem(this._item)) // item
			{
				if (!(this._item.id in shops[trackingLabel].itemsSold))
				{
					shops[trackingLabel].itemsSold[this._item.id] = 0;
				}
				shops[trackingLabel].itemsSold[this._item.id] += number;
			}
			else if (DataManager.isWeapon(this._item)) // weapon
			{
				if (!(this._item.id in shops[trackingLabel].weaponsSold))
				{
					shops[trackingLabel].weaponsSold[this._item.id] = 0;
				}
				shops[trackingLabel].weaponsSold[this._item.id] += number;
			}
			else if (DataManager.isArmor(this._item)) // armor
			{
				if (!(this._item.id in shops[trackingLabel].armourSold))
				{
					shops[trackingLabel].armourSold[this._item.id] = 0;
				}
				shops[trackingLabel].armourSold[this._item.id] += number;
			}
			console.log(shops);
		}
	};

	Game_Interpreter.prototype.pluginCommand = function(command, args)
	{

		FELD_BoughtSoldItemTracking_aliasPluginCommand.call(this,command,args);
		if(command == "TRACKSHOP" && args[0] != null)
		{
			trackingLabel = args[0];
		}
		else if(command == "UNTRACKSHOP")
		{
			trackingLabel = null;
		}
		else if(command == "RESETTRACKEDSHOP" && args[0] != null)
		{
			if (args[0] in shops)
			{
				delete shops[args[0]];
			}
		}
		else if (command == "GETTRACKEDDATA" && args[0] != null && args[1] != null && args[2] != null && args[3] != null && args[4] != null)
		{
			// GETTRACKEDDATA [label] [item|weapon|armor] [bought|sold] [id] [variable]
			if (args[0] in shops)
			{
				if (args[2] == 'bought')
				{
					if (args[1] == 'item')
					{
						if (parseInt(args[3]) in shops[args[0]].itemsBought)
						{
							$gameVariables.setValue(args[4], shops[args[0]].itemsBought[parseInt(args[3])]);
						}
						else
						{
							$gameVariables.setValue(args[4], 0);
						}
					}
					else if (args[1] == 'weapon')
					{
						if (parseInt(args[3]) in shops[args[0]].weaponsBought)
						{
							$gameVariables.setValue(args[4], shops[args[0]].weaponsBought[parseInt(args[3])]);
						}
						else
						{
							$gameVariables.setValue(args[4], 0);
						}
					}
					else if (args[1] == 'armor')
					{
						if (parseInt(args[3]) in shops[args[0]].armourBought)
						{
							$gameVariables.setValue(args[4], shops[args[0]].armourBought[parseInt(args[3])]);
						}
						else
						{
							$gameVariables.setValue(args[4], 0);
						}
					}
				}
				else if (args[2] == 'sold')
				{
					if (args[1] == 'item')
					{
						if (parseInt(args[3]) in shops[args[0]].itemsSold)
						{
							$gameVariables.setValue(args[4], shops[args[0]].itemsSold[parseInt(args[3])]);
						}
						else
						{
							$gameVariables.setValue(args[4], 0);
						}
					}
					else if (args[1] == 'weapon')
					{
						if (parseInt(args[3]) in shops[args[0]].weaponsSold)
						{
							$gameVariables.setValue(args[4], shops[args[0]].weaponsSold[parseInt(args[3])]);
						}
						else
						{
							$gameVariables.setValue(args[4], 0);
						}
					}
					else if (args[1] == 'armor')
					{
						if (parseInt(args[3]) in shops[args[0]].armourSold)
						{
							$gameVariables.setValue(args[4], shops[args[0]].armourSold[parseInt(args[3])]);
						}
						else
						{
							$gameVariables.setValue(args[4], 0);
						}
					}
				}
			}
			else
			{
				$gameVariables.setValue(args[4], 0);
			}
		}
	}
})();