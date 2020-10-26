//=============================================================================
// Crafting System, ver0.0.1
// Add-on to Ammunition System
//   by Unconnected42
// UNCO_X_Crafting.js
// Last Updated : 2015/11/15
//=============================================================================


//=============================================================================
//=============================================================================
// Only try to do anthing is Ammunition System is there !!!
if (Imported && Imported.UNCO_AmmunitionSystem === true) {
Unco.CS = Unco.CS || {};
//=============================================================================
//=============================================================================


//=============================================================================
 /*:
 * @plugindesc  Allows skills to produce items or equipment.
 * <Unco Craft>
 * @author Unconnected42
 *
 * @param Crafting Skill Types
 * @desc Put the list of Crafting Skill Type Ids, separated by commas.
 * @default 0
 *
 * @param Default Products Text
 * @desc  The text introducing the skill's products in Info window.
 * @default Product(s)
 *
 * @param Default Stock Text
 * @desc  The text introducing the skill's products & components amounts introductory text in Info window.
 * @default in stock
 *
 * @param Default Components Text
 * @desc  The text introducing the skill's components (i.e., costs) in Info window.
 * @default Component(s)
 *
 * @param Display Products And Components Names
 * @desc  If set at true, the names of products/components will be displayed. If not, only icons will be displayed.
 * @default false
 *
 * @param Craft Text Font Size
 * @desc  The text font size when drawing components & products info.
 * @default 24
 *
 * @param Craft Text Font Color Normal
 * @desc  The text font color when drawing components & products info.
 * @default 0
 *
 * @param Craft Text Font Color Crisis
 * @desc  The text font color when drawing components & products info, when ammo is insufficient.
 * @default 18
 *
 *
 * @help
 * ============================================
 * Introduction
 * ============================================
 *
 * This plug-in provides a skill-based crafting system.
 * 
 * ============================================
 * Known Compatibility Issues
 * ============================================
 *
 * This plug-in is an extension of Ammunition System.
 * It will not work if Ammunition System is not installed.
 *
 * If you are using Bobstah's BattleCommandList plug-in,
 * you will probably have to manually remove from your actors'battle command 
 * lists the crafting skill types (see below).
 * 
 * ============================================
 * Use
 * ============================================
 * 
 * This plug-in functions by allowing skills to produce items of any kind.
 * The crafting skills (i.e., skills producing items) can consume items
 * according to the rules of Ammunition System, with some specific tweaks.
 * Note that crafting skills are not supposed to be used during battle.
 *
 * For the crafting skills to work properly, they must be given special
 * skill types that are to be listed inside the plug-in parameter 
 * 'Crafting Skill Types'.
 * Example : create a skill type named 'Alchemy' with number 6 and
 * put '6' as the value for parameter 'Crafting Skill Types'. Then, give
 * the skill type Alchemy to some skills that you want to produce items.
 * Later, if for example you create another crafting skill type named 
 * 'Cooking' (number 7), put '6,7' as the value for parameter 
 * 'Crafting Skill Types'.
 * 
 * When a skill type is listed in the Crafting Skill Types, there are two
 * consequences:
 * - the skill type will not appear during battle (only if you don't use
 *   any plug-ins altering the actor battle command list)
 * - when in main skill menu, when a crafting skill type is selected, the 
 *   normal item window will be replaced. Instead, you will have two windows:
 *   the one at left will display the list of skills corresponding to the 
 *   selected skill type (all those skills should be crafting skills),
 *   the one at right will display a list of products and components of
 *   the currently selected skill. Current amounts of products/components
 *   will also be displayed.
 *
 * Here are the tags to put in crafting skills notebox for defining production :
 * <Make i Item: n>
 * <Make i Armor: n>
 * <Make i Weapon: n>
 * ... where 'i' is the index of the desired item/armour/weapon and 'n' is the desired
 * amount.
 *
 * As for the components, use the same tags as seen in Ammunition System.
 * However, there is a little difference regarding item consumption.
 * Weapon and armour-type items will be considered as normal items:
 * that is, they do not need to be equipped, only the items in inventory will
 * be accounted for to estimate the available amount (not the ones being equipped), 
 * and all the listed equip-type ammo will be consumed, and not only the one 
 * equipped.
 *
 * It is possible to customize the texts introducing the products and components
 * in the craft information window with the following tag to put in the skill's
 * notebox:
 * <Craft Product Text: xxx>
 * <Craft Component Text: xxx>
 * 
 */
//=============================================================================

//=============================================================================
// Parameter Variables
//=============================================================================

Unco.Parameters = $plugins.filter(function(p) {
        return p.description.contains('<Unco Craft>');
    })[0].parameters; //Copied from Ellye, who thanks Iavra
Unco.Param = Unco.Param || {};

Unco.Param.craftDefProdText = String(Unco.Parameters['Default Products Text']);
Unco.Param.craftDefCompText = String(Unco.Parameters['Default Components Text']);
Unco.Param.craftDefStocText = String(Unco.Parameters['Default Stock Text']);
Unco.Param.craftDispNames = String(Unco.Parameters['Display Products And Components Names']).toLowerCase();
Unco.Param.craftSkillTypes = String(Unco.Parameters['Crafting Skill Types']).split(',');
Unco.Param.craftFontSize = parseInt(String(Unco.Parameters['Craft Text Font Size']));
Unco.Param.craftFontColorNorm = parseInt(String(Unco.Parameters['Craft Text Font Color Normal']));
Unco.Param.craftFontColorCris = parseInt(String(Unco.Parameters['Craft Text Font Color Crisis']));

Unco.CS.isCraftSkillType = function(stid) { 
   stid = String(stid);   
   for(var i = 0; i < Unco.Param.craftSkillTypes.length; i++) {
      if (Unco.Param.craftSkillTypes[i] === stid) {
         return true;
      }
   }
   return false;
}


//=============================================================================
// DataManager
//=============================================================================

Unco.CS.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
    if (!Unco.CS.DataManager_isDatabaseLoaded.call(this)) return false;
    this.processUncoCraftNotetags($dataSkills);
    return true;
};

DataManager.processUncoCraftNotetags = function(group) {
   for (var n = 1; n < group.length; n++) {
      var obj = group[n];
      var notedata = obj.note.split(/[\r\n]+/);

      obj.makeItem = [];
      obj.makeArmor = [];
      obj.makeWeapon = [];

      for (var i = 0; i < notedata.length; i++) {
         var line = notedata[i];
         if (line.match(/<(?:MAKE)[ ](\d+)[ ](?:ITEM):[ ](\d+)>/i)) {
            var index = parseInt(RegExp.$1);
            var value = parseInt(RegExp.$2);
            if ( (!isNaN(index)) && (!isNaN(value)) ) {
               obj.makeItem[index] = value;
               obj.isCraft = true;
            }
         }
         if (line.match(/<(?:MAKE)[ ](\d+)[ ](?:ARMOR):[ ](\d+)>/i)) {
            var index = parseInt(RegExp.$1);
            var value = parseInt(RegExp.$2);
            if ( (!isNaN(index)) && (!isNaN(value)) ) {
               obj.makeArmor[index] = value;
               obj.isCraft = true;
            }
         }
         if (line.match(/<(?:MAKE)[ ](\d+)[ ](?:WEAPON):[ ](\d+)>/i)) {
            var index = parseInt(RegExp.$1);
            var value = parseInt(RegExp.$2);
            if ( (!isNaN(index)) && (!isNaN(value)) ) {
               obj.makeWeapon[index] = value;
               obj.isCraft = true;
            }
         }
         if (line.match(/<(?:CRAFT)[ ](?:PRODUCT)[ ](?:TEXT):[ ](.*)>/i)) {
            obj.craftProdText = String(RegExp.$1);
         }
         if (line.match(/<(?:CRAFT)[ ](?:COMPONENT)[ ](?:TEXT):[ ](.*)>/i)) {
            obj.craftCompText = String(RegExp.$1);
         }
      }
   }
}



//=============================================================================
// Window_ActorCommand
//=============================================================================

if (!Imported.BOB_BattleCommandList) {
   Window_ActorCommand.prototype.addSkillCommands = function() {
      var skillTypes = this._actor.addedSkillTypes();
      skillTypes.sort(function(a, b) {
         return a - b;
      });
      skillTypes.forEach(function(stypeId) {
         if (Unco.CS.isCraftSkillType(stypeId) === false) {
            var name = $dataSystem.skillTypes[stypeId];
            this.addCommand(name, 'skill', true, stypeId);
         }
      }, this);
   };
}
//=============================================================================
// Game_BattlerBase
//=============================================================================

Game_BattlerBase.prototype.canPaySkillEquipAmmoCost = function(skill) {
   if (skill.stypeId && Unco.CS.isCraftSkillType(skill.stypeId)) {
      for (var ammoId in skill.equipAmmoCost) {
         ammoId = parseInt(ammoId);
         if (!isNaN(ammoId) && (ammoId > 0)) {
            var nbOwned = $gameParty.getItemAmount($dataArmors[ammoId]);
            if (skill.equipAmmoCost[ammoId] > nbOwned) {
               return false;
            }
         }
      }
      for (var ammoId in skill.weaponAmmoCost) {
         ammoId = parseInt(ammoId);
         if (!isNaN(ammoId) && (ammoId > 0)) {
            var nbOwned = $gameParty.getItemAmount($dataWeapons[ammoId]);
            if (skill.weaponAmmoCost[ammoId] > nbOwned) {
               return false;
            }
         }
      }
      return true;
   }
   if (!this.canPaySkillArmorAmmoCost(skill)) return false;
   if (!this.canPaySkillWeaponAmmoCost(skill)) return false;
   return true;
};

Unco.CS.Game_BattlerBase_paySkillEquipAmmoCost = Game_BattlerBase.prototype.paySkillEquipAmmoCost;
Game_BattlerBase.prototype.paySkillEquipAmmoCost = function(skill) {
   if (skill.stypeId && Unco.CS.isCraftSkillType(skill.stypeId)) {
      for (var ammoId in skill.equipAmmoCost) {
         ammoId = parseInt(ammoId);
         if (!isNaN(ammoId) && (ammoId > 0)) {
            $gameParty.gainItem($dataArmors[ammoId],-skill.equipAmmoCost[ammoId]);
         }
      }
      for (var ammoId in skill.weaponAmmoCost) {
         ammoId = parseInt(ammoId);
         if (!isNaN(ammoId) && (ammoId > 0)) {
            $gameParty.gainItem($dataWeapons[ammoId],-skill.weaponAmmoCost[ammoId]);
         }
      }
   } else {
      Unco.CS.Game_BattlerBase_paySkillEquipAmmoCost.call(this,skill);
   }
};

Unco.CS.Game_BattlerBase_paySkillAmmoCost = Game_BattlerBase.prototype.paySkillAmmoCost;
Game_BattlerBase.prototype.paySkillAmmoCost = function(skill) {
   Unco.CS.Game_BattlerBase_paySkillAmmoCost.call(this,skill);
   if (skill.id === this.attackSkillId()) {
      return;
   }
   for (var makeId in skill.makeItem) {
      makeId = parseInt(makeId);
      if (!isNaN(makeId) && (makeId > 0)) {
         var makeAmount = parseInt(skill.makeItem[makeId]);
         if (!isNaN(makeAmount) &&  (makeAmount > 0)) {
            $gameParty.gainItem($dataItems[makeId],makeAmount);
         }
      }
   }
   for (var makeId in skill.makeArmor) {
      makeId = parseInt(makeId);
      if (!isNaN(makeId) && (makeId > 0)) {
         var makeAmount = parseInt(skill.makeArmor[makeId]);
         if (!isNaN(makeAmount) &&  (makeAmount > 0)) {
            $gameParty.gainItem($dataArmors[makeId],makeAmount);
         }
      }
   }
   for (var makeId in skill.makeWeapon) {
      makeId = parseInt(makeId);
      if (!isNaN(makeId) && (makeId > 0)) {
         var makeAmount = parseInt(skill.makeWeapon[makeId]);
         if (!isNaN(makeAmount) &&  (makeAmount > 0)) {
            $gameParty.gainItem($dataWeapons[makeId],makeAmount);
         }
      }
   }
};

//-----------------------------------------------------------------------------
// Window_CraftList
//
// The window for selecting a skill on the skill screen, for craft skills.

function Window_CraftList() {
    this.initialize.apply(this, arguments);
}

Window_CraftList.prototype = Object.create(Window_SkillList.prototype);
Window_CraftList.prototype.constructor = Window_CraftList;

Window_CraftList.prototype.initialize = function(x, y, width, height) {
    Window_SkillList.prototype.initialize.call(this, x, y, width, height);
    this._infoWindow = null;
};

Window_CraftList.prototype.maxCols = function() {
    return 1;
};

Window_CraftList.prototype.drawAmmoCost = function(skill, wx, wy, dw) {
   if (Unco.CS.isCraftSkillType(skill.stypeId) === false) {
      dw = Window_SkillList.prototype.drawAmmoCost.call(this,skill, wx, wy, dw);
   }
   return dw;
};

Window_CraftList.prototype.setInfoWindow = function(infoWindow) {
    this._infoWindow = infoWindow
    if (this.active && this._infoWindow) {
        this._infoWindow.setItem(this.item());
    }
};

Window_CraftList.prototype.updateHelp = function() {
    this.setHelpWindowItem(this.item());
    if (this._infoWindow) {
        this._infoWindow.setItem(this.item());
    }
};

//=============================================================================
// Window_CraftInfo
//=============================================================================

function Window_CraftInfo() {
    this.initialize.apply(this, arguments);
}

Window_CraftInfo.prototype = Object.create(Window_Base.prototype);
Window_CraftInfo.prototype.constructor = Window_CraftInfo;

Window_CraftInfo.prototype.initialize = function(x, y, width, height) {
    Window_Base.prototype.initialize.call(this, x, y, width, height);
    this._item = null;
    this.deactivate();
    this.refresh();
};

Window_CraftInfo.prototype.setItem = function(item) {
    if (this._item === item) return;
    this._item = item;
    this.refresh();
};

Window_CraftInfo.prototype.refresh = function() {
    this.contents.clear();
    var dy = 0;
    if (!this._item) return dy;
    dy = this.drawProducts(dy);
    dy = this.drawComponents(dy);
    return dy;
};

Window_CraftInfo.prototype.drawProducts = function(dy) {
   var skill = this._item;
   var indent = 24;
   var stockIndent = indent*3;
   var dx = this.textPadding();
   var dw = this.contents.width - this.textPadding() * 2;
   this.resetFontSettings();
   var text = ( (typeof skill.craftProdText !== 'undefined') ? skill.craftProdText : Unco.Param.craftDefProdText);
   this.drawDarkRect(dx-indent, dy, dw+indent, this.lineHeight());
   this.drawText(text, dx, dy, dw, 'left');
   dy += this.lineHeight();
   dx += indent;
   this.contents.fontSize = Unco.Param.craftFontSize;
   this.changeTextColor(this.textColor(Unco.Param.craftFontColorNorm));
   for (var makeId in skill.makeItem) {
      makeId = parseInt(makeId);
      if (!isNaN(makeId) && (makeId > 0)) {
         var makeAmount = parseInt(skill.makeItem[makeId]);
         if (!isNaN(makeAmount) &&  (makeAmount > 0)) {
            this.drawIcon($dataItems[makeId].iconIndex, dx, dy);
            if (Unco.Param.craftDispNames === 'true') {
               this.drawText($dataItems[makeId].name, dx + Window_Base._iconWidth + 2, dy, dw, 'left');
               dy += this.lineHeight();
            }
            text = 'x' + String(makeAmount);
            this.drawText(text, dx + Window_Base._iconWidth + 2, dy, dw, 'left');
            text = '(' + $gameParty.getItemAmount($dataItems[makeId]) + ' ' + Unco.Param.craftDefStocText + ')';
            this.drawText(text, dx + Window_Base._iconWidth + stockIndent, dy, dw, 'left');
            dy += this.lineHeight();
         }
      }
   }
   for (var makeId in skill.makeArmor) {
      makeId = parseInt(makeId);
      if (!isNaN(makeId) && (makeId > 0)) {
         var makeAmount = parseInt(skill.makeArmor[makeId]);
         if (!isNaN(makeAmount) &&  (makeAmount > 0)) {
            this.drawIcon($dataArmors[makeId].iconIndex, dx, dy);
            if (Unco.Param.craftDispNames === 'true') {
               this.drawText($dataArmors[makeId].name, dx + Window_Base._iconWidth + 2, dy, dw, 'left');
               dy += this.lineHeight();
            }
            text = 'x' + String(makeAmount);
            this.drawText(text, dx + Window_Base._iconWidth + 2, dy, dw, 'left');
            text = '(' + $gameParty.getItemAmount($dataArmors[makeId]) + ' ' + Unco.Param.craftDefStocText + ')';
            this.drawText(text, dx + Window_Base._iconWidth + stockIndent, dy, dw, 'left');
            dy += this.lineHeight();
         }
      }
   }
   for (var makeId in skill.makeWeapon) {
      makeId = parseInt(makeId);
      if (!isNaN(makeId) && (makeId > 0)) {
         var makeAmount = parseInt(skill.makeWeapon[makeId]);
         if (!isNaN(makeAmount) &&  (makeAmount > 0)) {
            this.drawIcon($dataWeapons[makeId].iconIndex, dx, dy);
            if (Unco.Param.craftDispNames === 'true') {
               this.drawText($dataWeapons[makeId].name, dx + Window_Base._iconWidth + 2, dy, dw, 'left');
               dy += this.lineHeight();
            }
            text = 'x' + String(makeAmount);
            this.drawText(text, dx + Window_Base._iconWidth + 2, dy, dw, 'left');
            text = '(' + $gameParty.getItemAmount($dataWeapons[makeId]) + ' ' + Unco.Param.craftDefStocText + ')';
            this.drawText(text, dx + Window_Base._iconWidth + stockIndent, dy, dw, 'left');
            dy += this.lineHeight();
         }
      }
   }
   this.resetFontSettings();
   return dy;
};

Window_CraftInfo.prototype.drawComponents = function(dy) {  
   var skill = this._item;
   var indent = 24;
   var stockIndent = indent*3;
   var dx = this.textPadding();
   var dw = this.contents.width - this.textPadding() * 2;
   this.resetFontSettings();
   this.drawDarkRect(dx-indent, dy, dw+indent, this.lineHeight());
   var text = ( (typeof skill.craftCompText !== 'undefined') ? skill.craftCompText : Unco.Param.craftDefCompText);
   this.drawText(text, dx, dy, dw, 'left');
   dy += this.lineHeight(); 
   dx += indent;
   this.contents.fontSize = Unco.Param.craftFontSize;
   var craftLineHeight = Math.max(Unco.Param.craftFontSize,Window_Base._iconHeight)+1;   
	if (typeof skill.goldCost === 'number') {
      this.drawIcon(Unco.Param.goldAmmoIconId, dx, dy);
      if (Unco.Param.craftDispNames === 'true') {
         this.drawText(TextManager.currencyUnit, dx + Window_Base._iconWidth + 2, dy, dw, 'left');
         dy += craftLineHeight;
      }
      var text = 'x' + String(skill.goldCost);
      this.drawText(text, dx + Window_Base._iconWidth + 2, dy, dw, 'left');
      if (skill.goldCost > $gameParty.gold()) this.changeTextColor(this.textColor(Unco.Param.craftFontColorCris));
      text = '(' + $gameParty.gold() + ' ' + Unco.Param.craftDefStocText + ')';
      this.drawText(text, dx + Window_Base._iconWidth + stockIndent, dy, dw, 'left');
      dy += craftLineHeight;
      this.changeTextColor(this.textColor(Unco.Param.craftFontColorNorm));
      this.resetFontSettings();
	}
   for (var ammoId in skill.itemAmmoCost) {
      ammoId = parseInt(ammoId);
      if (!isNaN(ammoId) && (ammoId > 0)) {
         var ammoAmount = parseInt(skill.itemAmmoCost[ammoId]);
         if (!isNaN(ammoAmount) &&  (ammoAmount > 0)) {
            this.drawIcon($dataItems[ammoId].iconIndex, dx, dy);
            if (Unco.Param.craftDispNames === 'true') {
               this.drawText($dataItems[ammoId].name, dx + Window_Base._iconWidth + 2, dy, dw, 'left');
               dy += craftLineHeight;
            }
            this.changeTextColor(this.textColor(Unco.Param.craftFontColorNorm));
            text = 'x' + String(ammoAmount);
            this.drawText(text, dx + Window_Base._iconWidth + 2, dy, dw, 'left');
            if (ammoAmount > $gameParty.getItemAmount($dataItems[ammoId])) this.changeTextColor(this.textColor(Unco.Param.craftFontColorCris));
            text = '(' + $gameParty.getItemAmount($dataItems[ammoId]) + ' ' + Unco.Param.craftDefStocText + ')';
            this.drawText(text, dx + Window_Base._iconWidth + stockIndent, dy, dw, 'left');
            dy += craftLineHeight;
            this.changeTextColor(this.textColor(Unco.Param.craftFontColorNorm));
         }
      }
   }
   for (var ammoId in skill.equipAmmoCost) {
      ammoId = parseInt(ammoId);
      if (!isNaN(ammoId) && (ammoId > 0)) {
         ammoAmount = parseInt(skill.equipAmmoCost[ammoId]);
         if (!isNaN(ammoAmount) && (ammoAmount > 0)) {
            this.drawIcon($dataArmors[ammoId].iconIndex, dx, dy);
            if (Unco.Param.craftDispNames === 'true') {
               this.drawText($dataArmors[ammoId].name, dx + Window_Base._iconWidth + 2, dy, dw, 'left');
               dy += craftLineHeight;
            }
            this.changeTextColor(this.textColor(Unco.Param.craftFontColorNorm));
            text = 'x' + String(ammoAmount);
            this.drawText(text, dx + Window_Base._iconWidth + 2, dy, dw, 'left');
            text = '(' + $gameParty.getItemAmount($dataArmors[ammoId]) + ' ' + Unco.Param.craftDefStocText + ')';
            if (ammoAmount > $gameParty.getItemAmount($dataArmors[ammoId])) this.changeTextColor(this.textColor(Unco.Param.craftFontColorCris));
            this.drawText(text, dx + Window_Base._iconWidth + stockIndent, dy, dw, 'left');
            dy += craftLineHeight;
            this.changeTextColor(this.textColor(Unco.Param.craftFontColorNorm));
         }
      }
   }
   for (var ammoId in skill.weaponAmmoCost) {
      ammoId = parseInt(ammoId);
      if (!isNaN(ammoId) && (ammoId > 0)) {
         ammoAmount = parseInt(skill.weaponAmmoCost[ammoId]);
         if (!isNaN(ammoAmount) && (ammoAmount > 0)) {
            this.drawIcon($dataWeapons[ammoId].iconIndex, dx, dy);
            if (Unco.Param.craftDispNames === 'true') {
               this.drawText($dataWeapons[ammoId].name, dx + Window_Base._iconWidth + 2, dy, dw, 'left');
               dy += craftLineHeight;
            }
            this.changeTextColor(this.textColor(Unco.Param.craftFontColorNorm));
            text = 'x' + String(ammoAmount);
            this.drawText(text, dx + Window_Base._iconWidth + 2, dy, dw, 'left');
            text = '(' + $gameParty.getItemAmount($dataWeapons[ammoId]) + ' ' + Unco.Param.craftDefStocText + ')';
            if (ammoAmount > $gameParty.getItemAmount($dataWeapons[ammoId])) this.changeTextColor(this.textColor(Unco.Param.craftFontColorCris));
            this.drawText(text, dx + Window_Base._iconWidth + stockIndent, dy, dw, 'left');
            dy += craftLineHeight;
            this.changeTextColor(this.textColor(Unco.Param.craftFontColorNorm));
         }
      }
   }
   return dy;
   this.resetFontSettings();
};

Window_CraftInfo.prototype.drawDarkRect = function(dx, dy, dw, dh) {
    var color = this.gaugeBackColor();
    this.changePaintOpacity(false);
    this.contents.fillRect(dx + 1, dy + 1, dw - 2, dh - 2, color);
    this.changePaintOpacity(true);
};

//=============================================================================
// Window_SkillType
//=============================================================================
Unco.CS.Window_SkillType_initialize = Window_SkillType.prototype.initialize;
Window_SkillType.prototype.initialize = function(x, y) {
    Unco.CS.Window_SkillType_initialize.call(this, x, y);
    this._craftWindow = null;
    this._infoWindow = null;
};

Window_SkillType.prototype.setCraftWindows = function(craftWindow,infoWindow) {
    this._craftWindow = craftWindow;
    this._infoWindow  = infoWindow;
    this.update();
};

Unco.CS.Window_SkillType_update = Window_SkillType.prototype.update
Window_SkillType.prototype.update = function() {
    Unco.CS.Window_SkillType_update.call(this);
    if (this._craftWindow) {
        this._craftWindow.setStypeId(this.currentExt());
    }
};

Unco.CS.Window_SkillType_select = Window_SkillType.prototype.select;
Window_SkillType.prototype.select = function(index) {
    Unco.CS.Window_SkillType_select.call(this,index);
    if (this._skillWindow) {
        if (Unco.CS.isCraftSkillType(this.currentExt()) === true) {
           this._skillWindow.hide();
           this._craftWindow.show();
           this._infoWindow.show();
        } else {
           this._skillWindow.show();
           this._craftWindow.hide();
           this._infoWindow.hide();
        }
    }
    console.log('Select:');
    console.log(this._list);
};

//=============================================================================
// Scene_Skill
//=============================================================================

Unco.CS.Scene_Skill_createItemWindow = Scene_Skill.prototype.createItemWindow;
Scene_Skill.prototype.createItemWindow = function() {
    Unco.CS.Scene_Skill_createItemWindow.call(this);
    var wx = 0;
    var wy = this._statusWindow.y + this._statusWindow.height;
    var ww = Graphics.boxWidth/2;
    var wh = Graphics.boxHeight - wy;
    this._craftWindow = new Window_CraftList(wx, wy, ww, wh);
    this._infoWindow  = new Window_CraftInfo(ww, wy, Graphics.boxWidth-ww, wh);
    this._craftWindow.setHelpWindow(this._helpWindow);
    this._craftWindow.setInfoWindow(this._infoWindow);
    this._craftWindow.setHandler('ok',     this.onItemOk.bind(this));
    this._craftWindow.setHandler('cancel', this.onItemCancel.bind(this));
    this._skillTypeWindow.setCraftWindows(this._craftWindow,this._infoWindow);
    this.addWindow(this._craftWindow);
    this.addWindow(this._infoWindow);
    this._craftWindow.hide();
    this._infoWindow.hide();
};

Unco.CS.Scene_Skill_commandSkill = Scene_Skill.prototype.commandSkill;
Scene_Skill.prototype.commandSkill = function() {
    console.log('Command:');
    console.log(this._skillTypeWindow.currentExt());
    if (Unco.CS.isCraftSkillType(this._skillTypeWindow.currentExt())) {
       this._craftWindow.activate();
       this._craftWindow.selectLast();
    } else {
       Unco.CS.Scene_Skill_commandSkill.call(this);       
    }
};

Scene_Skill.prototype.item = Scene_Skill.prototype.item;
Scene_Skill.prototype.item = function() {
    if (this._craftWindow) {
       if (Unco.CS.isCraftSkillType(this._skillTypeWindow.currentExt()) === true) {
          return this._craftWindow.item();
       }       
    }
    return this._itemWindow.item();
};

Unco.CS.Scene_Skill_refreshActor = Scene_Skill.prototype.refreshActor;
Scene_Skill.prototype.refreshActor = function() {
    Unco.CS.Scene_Skill_refreshActor.call(this);
    var actor = this.actor();
    this._craftWindow.setActor(actor);
};

Unco.CS.Scene_Skill_onItemCancel = Scene_Skill.prototype.onItemCancel;
Scene_Skill.prototype.onItemCancel = function() {
    if (Unco.CS.isCraftSkillType(this._skillTypeWindow.currentExt()) === true) {
       this._craftWindow.deselect();
       this._infoWindow.contents.clear();
       this._skillTypeWindow.activate();
    } else {
       Unco.CS.Scene_Skill_onItemCancel.call(this);       
    }
};

Unco.CS.Scene_Skill_useItem = Scene_Skill.prototype.useItem;
Scene_Skill.prototype.useItem = function() {
    Unco.CS.Scene_Skill_useItem.call(this);
    this._infoWindow.refresh();
    this._craftWindow.refresh();
};

Unco.CS.Scene_Skill_activateItemWindow = Scene_Skill.prototype.activateItemWindow;
Scene_Skill.prototype.activateItemWindow = function() {
   if (Unco.CS.isCraftSkillType(this._skillTypeWindow.currentExt()) === true) {
      this._craftWindow.refresh();
      this._craftWindow.activate();
   } else {
      Unco.CS.Scene_Skill_activateItemWindow.call(this);
   }
};

//=============================================================================
// Window_Help
//=============================================================================
Unco.CS.Window_Help_getAmmoAmountText = Window_Help.prototype.getAmmoAmountText;
Window_Help.prototype.getAmmoAmountText = function(item) {
   if (typeof item !== 'undefined') {
      if ((typeof item.ammoText !== "undefined") && (item.ammoText !== "")) {
         return Unco.CS.Window_Help_getAmmoAmountText.call(this,item);
      }
      if (Unco.CS.isCraftSkillType(item.stypeId)) {
         return '';
      }
      return Unco.CS.Window_Help_getAmmoAmountText.call(this,item);
   }
   return '';
};

//=============================================================================
//=============================================================================
// Only try to do anything is Ammunition System is there !!!
}
//=============================================================================
//=============================================================================