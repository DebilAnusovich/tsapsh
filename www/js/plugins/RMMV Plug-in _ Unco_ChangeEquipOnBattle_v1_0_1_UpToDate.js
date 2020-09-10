//=============================================================================
// Change Equip On Battle, ver1.0.1
//   by Unconnected42
// Based on ChangeWeaponOnBattle, by Kannazuki Sasuke
//
// UNCO_ChangeEquipOnBattle.js
// Last Updated : 2016/12/05
//=============================================================================

var Imported = Imported || {};
Imported.UNCO_ChangeEquip = true;

var Unco = Unco || {};
Unco.CEB = Unco.CEB || {};

//=============================================================================
 /*:
 * @plugindesc  Allows player to change certain slots of equipment during battle.
 * <Unco Equip>
 * @author Unconnected42
 *
 * @param Equip Command Name
 * @desc  Name of the equip command in actor battle menu.
 * @default Equip
 *
 * @param Equip Command Icon
 * @desc  Id of the icon to be displayed in front of Equip command when Bobstah's
 * Battle Command List is present.
 * @default 76
 *
 * @param Default Battle Equip Slots
 * @desc  The equip slots that can be changed by all classes by default (separated by commas ',').
 * @default 1
 *
 * @param Equip Skip Turn
 * @desc  'full'=turn skipped as soon as one equip changed. 'half'=turn skipped when leaving equip menu. 'none'=no skip.
 * @default full
 *
 * @param Equip Skill Id
 * @desc  The Id of the dummy skill that the actor will use after changing equipment, when turn is consumed.
 * @default 7
 *
 * @param No Equip Icon Id
 * @desc  Id of the icon to use for equip slots currently without equipment.
 * @default 16
 *
 * @param No Equip Text
 * @desc  Text to use for equip slots currently without equipment.
 * @default <Empty>
 *
 * @param No Change Icon Id
 * @desc  Id of the icon to use for equip slots with no changes planned.
 * @default 16
 *
 * @param No Change Text
 * @desc  Text to use for equip slots with no changes planned.
 * @default <No Changes>
 *
 * @help
 * ============================================
 * Introduction
 * ============================================
 * 
 * This plug-in is based on the official plug-in ChangeWeaponOnBattle,
 * with the following differences:
 * - allow maker to decide each equipments may be changed, for each class.
 * - guarantees a minimum level of compatibility with Bobstah's Battle
 *   Command List plug-in (equip command can have an icon, but cannot
 *   currently be moved freely at any place in the command list).
 * - guarantee compatibility with Ammunition System.
 * - also provide some compatibility with EquipCore.
 * - changing equipment can consume actor's turn.
 * 
 * ============================================
 * Known Compatibility Issues
 * ============================================
 *
 * This plug-in should be placed below any other plug-in that it
 * interacts with, namely: Battle Command List, EquipCore,
 * Ammunition System.
 * 
 * ============================================
 * Use
 * ============================================
 *
 * Some very important points that must be understood before using 
 * this plug-in:
 * - because this plug-in aims to allow turn skipping when changing
 *   equipment, the actual equip change is done *NOT* while into equip
 *   menu, but when the actor performs the equip action.
 * - therefore, an equip skill must be defined (its id must be set 
 *   in plug-in's parameters). This skill will be automatically 
 *   selected as the actor's next action when equip
 *   change is decided through battle equip menu.
 * - the equip skill must have the following requirements:
 *   + the scope must be 'the user'
 *   + if Yanfly's action sequences are used, be sure that the 
 *     'target action' section allows the actor to actually use
 *     the skill and apply its effects. Otherwise, equip changes
 *     will not be made.
 * However, if you put 'Equip Skip Turn' at 'none', equip changes will
 * be made normally in the battle equip menu.
 *
 * Enabling equipment change during battle is class-based: you have to 
 * put notetags inside a class notebox.
 * Lines to put in class notebox :
 *    <Battle Change Equip: s1,s2,...>
 * ...where 's1,s2,...' are the equip slots that the actor will be
 * able to change during battle.
 * For ex. : <Battle Change Equip: 1,2,5> will allow any actor having 
 * the class where the tag is put to change the three listed equip slots 
 * (in that case, probably weapon, shield and some accessory).
 *
 */
//=============================================================================

//=============================================================================
// Parameter Variables
//=============================================================================


(function() {
   Unco.Parameters = $plugins.filter(function(p) {
          return p.description.contains('<Unco Equip>');
      })[0].parameters; //Copied from Ellye, who thanks Iavra
   Unco.Param = Unco.Param || {};

   Unco.Param.equipCommandName = String(Unco.Parameters['Equip Command Name']) || 'Equip';
   Unco.Param.equipConsumeTurn = String(Unco.Parameters['Equip Skip Turn']).toLowerCase() || 'full';
   Unco.Param.equipIconId = parseInt(Unco.Parameters['Equip Command Icon']) || 76;
   Unco.Param.equipSkillId = parseInt(Unco.Parameters['Equip Skill Id']) || 7;
   Unco.Param.equipNoEquipIconId = parseInt(Unco.Parameters['No Equip Icon Id']) || 16;
   Unco.Param.equipNoChangeIconId = parseInt(Unco.Parameters['No Change Icon Id']) || 16;
   Unco.Param.equipNoEquipText = String(Unco.Parameters['No Equip Text']) || '<Empty>';
   Unco.Param.equipNoChangeText = String(Unco.Parameters['No Change Text']) || '<No Changes>';
   Unco.Param.equipDefaultSlots = [];
   var prepareEquipDefaultSlots = String(Unco.Parameters['Default Battle Equip Slots']).split(',') || [];
   for (var i=0; i < prepareEquipDefaultSlots.length; i++) {
      var slot = parseInt(prepareEquipDefaultSlots[i]);
      if (!isNaN(slot) && (slot > 0)) Unco.Param.equipDefaultSlots.push(slot);
   }

  //=============================================================================
  // DataManager
  //  * Tags Processing
  //=============================================================================

   Unco.CEB.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
   DataManager.isDatabaseLoaded = function() {
      if (!Unco.CEB.DataManager_isDatabaseLoaded.call(this)) return false;
      this.processUncoEquipChangeNotetags($dataClasses);
      return true;
   };

   DataManager.processUncoEquipChangeNotetags = function(group) {
      for (var n = 1; n < group.length; n++) {
         var obj = group[n];
         var notedata = obj.note.split(/[\r\n]+/);
         obj.equipChangeSlots = Unco.Param.equipDefaultSlots.slice();
         for (var i = 0; i < notedata.length; i++) {
            var line = notedata[i];
            if (line.match(/<(?:BATTLE)[ ](?:CHANGE)[ ](?:EQUIP):[ ](.*)>/i)) {
				var slotList = String(RegExp.$1).split(',');
                for (var j in slotList) {
                   var slot = parseInt(slotList[j]);
                   if (!isNaN(slot) && (slot > 0) && (!obj.equipChangeSlots.contains(slot))) obj.equipChangeSlots.push(slot);
                }
            }
         }
      }
	  
   };

	

   //=============================================================================
   // Window_BattleEquipStatus
  //  * Display Equip Bonuses
   //=============================================================================
   function Window_BattleEquipStatus() {
      this.initialize.apply(this, arguments);
   }

   Window_BattleEquipStatus.prototype =
      Object.create(Window_EquipStatus.prototype);
   Window_BattleEquipStatus.prototype.constructor = Window_BattleEquipStatus;

   Window_BattleEquipStatus.prototype.initialize = function(x, y) {
      Window_EquipStatus.prototype.initialize.call(this, x, y);
   };

   Window_BattleEquipStatus.prototype.numVisibleRows = function() {
      return 7;
   };
   
   //=============================================================================
   // Window_BattleEquipItem
  //  * One-column Equip Item Window
   //=============================================================================
   function Window_BattleEquipItem() {
      this.initialize.apply(this, arguments);
   }

   Window_BattleEquipItem.prototype = Object.create(Window_EquipItem.prototype);
   Window_BattleEquipItem.prototype.constructor = Window_BattleEquipItem;

   Window_BattleEquipItem.prototype.initialize  = function(x, y, width, height) {
      Window_EquipItem.prototype.initialize.call(this, x, y, width, height);
   };

   Window_BattleEquipItem.prototype.maxCols = function() {
      return 1;
   };

   //=============================================================================
   // Window_BattleEquipSlot
   //  * Battle Equip Slot, with slot list based on the contents of Battle Change Equip Tag.
   //=============================================================================
   function Window_BattleEquipSlot() {
      this.initialize.apply(this, arguments);
   }

   Window_BattleEquipSlot.prototype = Object.create(Window_EquipSlot.prototype);
   Window_BattleEquipSlot.prototype.constructor = Window_BattleEquipSlot;

   Window_BattleEquipSlot.prototype.initialize  = function(x, y, width, height) {
      Window_EquipSlot.prototype.initialize.call(this, x, y, width, height);
   };
   
   Unco.CEB.Window_BattleEquipSlot_lineHeight = Window_BattleEquipSlot.prototype.lineHeight;
   Window_BattleEquipSlot.prototype.lineHeight = function() {
      if (Unco.Param.equipConsumeTurn === 'none') return Unco.CEB.Window_BattleEquipSlot_lineHeight.call(this);
      return Unco.CEB.Window_BattleEquipSlot_lineHeight.call(this)*2;
   };

   Window_BattleEquipSlot.prototype.maxItems = function() {
      return this._actor ? ($dataClasses[$dataActors[this._actor._actorId].classId].equipChangeSlots.length) : 0;
   };

   Window_BattleEquipSlot.prototype.drawRightArrow = function(x, y) {
      this.changeTextColor(this.systemColor());
      this.drawText('\u2192', x, y, 32, 'center');
   };
   Window_BattleEquipSlot.prototype.update = function() {
      Window_Selectable.prototype.update.call(this);
      if (this._itemWindow) {
         if ( this._actor) {
            if (Imported.YEP_EquipCore === true) {
               Yanfly.Equip.Window_EquipItem_setSlotId.call(this._itemWindow , $dataClasses[$dataActors[this._actor._actorId].classId].equipChangeSlots[this.index()]-1);
            } else {
               this._itemWindow.setSlotId( $dataClasses[$dataActors[this._actor._actorId].classId].equipChangeSlots[this.index()]-1 );
            }
         } else this._itemWindow.setSlotId( this.index() );
      }
   };

   Window_BattleEquipSlot.prototype.item = function() {
      return this._actor ? this._actor.equips()[ $dataClasses[$dataActors[this._actor._actorId].classId].equipChangeSlots[this.index()]-1 ] : null;
   };

   Window_BattleEquipSlot.prototype.drawItemName = function(item, x, y, width) {
      width = width || 312;
      var iconBoxWidth = this.lineHeight();
      var iconYpadding = (iconBoxWidth - Window_Base._iconWidth) / 2;
      var iconXpadding = (iconBoxWidth - Window_Base._iconWidth) / 2 - 8;
      this.resetTextColor();
      var icon = ( (item && item.iconIndex) ? item.iconIndex : Unco.Param.equipNoEquipIconId);
      var name = ( (item && item.name) ? item.name : Unco.Param.equipNoEquipText);
      this.drawIcon(icon, x + iconXpadding, y + iconYpadding);
      this.drawText(name, x + iconXpadding + Window_Base._iconWidth + 4, y, width - iconBoxWidth);
   };
   
   Window_BattleEquipSlot.prototype.drawUnchangedSlot = function(x, y, width) {
      width = width || 312;
      this.changePaintOpacity(false);
      var iconBoxWidth = this.lineHeight();
      var iconYpadding = (iconBoxWidth - Window_Base._iconWidth) / 2;
      var iconXpadding = (iconBoxWidth - Window_Base._iconWidth) / 2 - 8;
      this.resetTextColor();
      this.drawIcon(Unco.Param.equipNoChangeIconId, x + iconXpadding, y + iconYpadding);
      this.drawText(Unco.Param.equipNoChangeText, x + iconXpadding + Window_Base._iconWidth + 4, y, width - iconBoxWidth);
   };

   Window_BattleEquipSlot.prototype.drawItem = function(index) {
      if (this._actor) {
         var realIndex = $dataClasses[$dataActors[this._actor._actorId].classId].equipChangeSlots[index]-1;
         var rect = this.itemRectForText(index);
         this.changeTextColor(this.systemColor());
         this.changePaintOpacity(this.isEnabled(realIndex));
         var yOffset = ( (Unco.Param.equipConsumeTurn === 'none') ? 0 : this.lineHeight()/4);
         this.drawText(this.slotName(index), rect.x, rect.y - yOffset, 138, this.lineHeight());
         var itemCurrent = this._actor.equips()[realIndex];
         this.drawItemName(itemCurrent, rect.x + 138, rect.y - yOffset);
         if (Unco.Param.equipConsumeTurn !== 'none') {
            var itemChanged = this._actor.changedEquips()[realIndex];
            this.drawRightArrow(rect.x + 118, rect.y + yOffset);
            if (itemChanged !== itemCurrent) {
               this.drawItemName(itemChanged, rect.x + 138, rect.y + yOffset);
            } else {
               this.drawUnchangedSlot(rect.x + 138, rect.y + yOffset, rect.width - 138);
            }
         }
         this.changePaintOpacity(true);
      }
   };

   Window_BattleEquipSlot.prototype.slotName = function(index) {
      var slots = this._actor.equipSlots();
      return this._actor ? $dataSystem.equipTypes[slots[ $dataClasses[$dataActors[this._actor._actorId].classId].equipChangeSlots[index]-1 ]] : '';
   };

   Window_BattleEquipSlot.prototype.show = function() {
      Window_EquipSlot.prototype.show.call(this);
      this.showHelpWindow();
   };

   Window_BattleEquipSlot.prototype.hide = function() {
      Window_EquipSlot.prototype.hide.call(this);
      this.hideHelpWindow();
   };

   
   //=============================================================================
   // Scene_Battle
   //  * Adding the new windows to Scene_Battle, and managing turn skipping.
   //=============================================================================
   var _Scene_Battle_isAnyInputWindowActive = Scene_Battle.prototype.isAnyInputWindowActive;
   Scene_Battle.prototype.isAnyInputWindowActive = function() {
      if (_Scene_Battle_isAnyInputWindowActive.call(this)) {
         return true;
      }
      return (this._equipSlotWindow.active || this._equipItemWindow.active);
   };
   
   var _Scene_Battle_createAllWindows = Scene_Battle.prototype.createAllWindows;
   Scene_Battle.prototype.createAllWindows = function() {
      _Scene_Battle_createAllWindows.call(this);
      this.createEquipStatusWindow();
      this.createEquipSlotWindow();
      this.createEquipItemWindow();
   };

   Scene_Battle.prototype.createEquipStatusWindow = function() {
      this._equipStatusWindow = new Window_BattleEquipStatus(0, this._helpWindow.height);
      this._equipStatusWindow.hide();
      this.addWindow(this._equipStatusWindow);
   };

   Scene_Battle.prototype.createEquipSlotWindow = function() {
      var wx = this._equipStatusWindow.width;
      var wy = this._helpWindow.height;
      var ww = Graphics.boxWidth - this._equipStatusWindow.width;
      var wh = Window_Base.prototype.lineHeight()*3;
      this._equipSlotWindow = new Window_BattleEquipSlot(wx, wy, ww, wh);
      this._equipSlotWindow.setHelpWindow(this._helpWindow);
      this._equipSlotWindow.setStatusWindow(this._equipStatusWindow);
      this._equipSlotWindow.setHandler('ok', this.onEquipSlotOk.bind(this));
      this._equipSlotWindow.setHandler('cancel', this.onEquipSlotCancel.bind(this));
      this._equipSlotWindow.hide();
      this.addWindow(this._equipSlotWindow);
   };

   Scene_Battle.prototype.createEquipItemWindow = function() {
      var wx = this._equipStatusWindow.width;
      var wy = this._equipStatusWindow.y + Window_Base.prototype.lineHeight()*3;
      var ww = Graphics.boxWidth - wx;
      var wh = Graphics.boxHeight - wy - this._statusWindow.height;
      this._equipItemWindow = new Window_BattleEquipItem(wx, wy, ww, wh);
      this._equipItemWindow.setHelpWindow(this._helpWindow);
      this._equipItemWindow.setStatusWindow(this._equipStatusWindow);
      this._equipItemWindow.setHandler('ok',     this.onEquipItemOk.bind(this));
      this._equipItemWindow.setHandler('cancel', this.onEquipItemCancel.bind(this));
      this._equipSlotWindow.setItemWindow(this._equipItemWindow);
      this._equipItemWindow.hide();
      this.addWindow(this._equipItemWindow);
   };

   var _Scene_Battle_createActorCommandWindow = Scene_Battle.prototype.createActorCommandWindow;
   Scene_Battle.prototype.createActorCommandWindow = function() {
      _Scene_Battle_createActorCommandWindow.call(this);
      this._actorCommandWindow.setHandler('equip', this.commandEquip.bind(this));
   };

   var _Window_ActorCommand_makeCommandList = Window_ActorCommand.prototype.makeCommandList;
   Window_ActorCommand.prototype.makeCommandList = function() {
      _Window_ActorCommand_makeCommandList.call(this);
      if (this._actor && ($dataClasses[$dataActors[this._actor._actorId].classId].equipChangeSlots.length > 0) ) {
         this._actor.setChangedEquips();
         this.addEquipCommand();
      }
   };

   Window_ActorCommand.prototype.addEquipCommand = function() {
      if (Imported.BOB_BattleCommandList === true) {
         this.addCommand(Unco.Param.equipCommandName, 'equip', true, null, Unco.Param.equipIconId);
       } else {
         this.addCommand(Unco.Param.equipCommandName, 'equip');
       }
   };

   Scene_Battle.prototype.refreshActor = function() {
      var actor = BattleManager.actor();
      this._equipStatusWindow.setActor(actor);
      this._equipSlotWindow.setActor(actor);
      this._equipItemWindow.setActor(actor);
   };

   Scene_Battle.prototype.commandEquip = function() {
      this.refreshActor();
      if (Imported.UNCO_AmmunitionSystem === true) {
         this._ammoWindow.hide();
      }
      this._equipStatusWindow.show();
      this._equipItemWindow.refresh();
      this._equipItemWindow.show();
      this._equipSlotWindow.refresh();
      this._equipSlotWindow.show();
      this._equipSlotWindow.activate();
      this._equipSlotWindow.select(0);
      if (this._equipsChanged) delete this._equipsChanged;
   };

   Scene_Battle.prototype.onEquipSlotOk = function() {
      this._equipItemWindow.activate();
      this._equipItemWindow.select(0);
   };

   Scene_Battle.prototype.onEquipSlotCancel = function() {
      this._equipStatusWindow.hide();
      this._equipItemWindow.hide();
      this._equipSlotWindow.hide();
      if (Unco.Param.equipConsumeTurn === 'half' && this._equipsChanged) {
         var skill = $dataSkills[Unco.Param.equipSkillId];
         var action = BattleManager.inputtingAction();
         action.setSkill(skill.id);
         BattleManager.actor().setLastBattleSkill(skill);
         this.onSelectAction();
      } else {
         if (Imported.UNCO_AmmunitionSystem === true) {
            this.showAmmoWindow();
         }
         this._actorCommandWindow.activate();
         this._actorCommandWindow.select(0);
      }
   };

   Scene_Battle.prototype.onEquipItemOk = function() {
      SoundManager.playEquip();
      this._equipsChanged = true;
      if (Unco.Param.equipConsumeTurn === 'none') {
         BattleManager.actor().changeEquip(  $dataClasses[$dataActors[this._equipSlotWindow._actor._actorId].classId].equipChangeSlots[this._equipSlotWindow.index()]-1 , this._equipItemWindow.item());
      } else {
         BattleManager.actor().setBattleChangedEquip(  $dataClasses[$dataActors[this._equipSlotWindow._actor._actorId].classId].equipChangeSlots[this._equipSlotWindow.index()]-1 , this._equipItemWindow.item());
      }
      if (Unco.Param.equipConsumeTurn === 'full') {
         this._equipItemWindow.deselect();
         this._equipStatusWindow.hide();
         this._equipItemWindow.hide();
         this._equipSlotWindow.hide();
         var skill = $dataSkills[Unco.Param.equipSkillId];
         var action = BattleManager.inputtingAction();
         action.setSkill(skill.id);
         BattleManager.actor().setLastBattleSkill(skill);
         this.onSelectAction();
      } else {
         this._equipSlotWindow.activate();
         this._equipSlotWindow.refresh();
         this._equipItemWindow.deselect();
         this._equipItemWindow.refresh();
         this._equipStatusWindow.refresh();
      }
   };

   Scene_Battle.prototype.onEquipItemCancel = function() {
      this._equipSlotWindow.activate();
      this._equipItemWindow.deselect();
   };

   //=============================================================================
   // Game_Actor
   //  * Saving equip choices for delayed equip change.
   //=============================================================================

   Game_Actor.prototype.setChangedEquips = function() {
      var maxSlots = this.equipSlots().length;
      var equips = this.equips();
      if (typeof this._changedEquips === 'undefined') {
         this._changedEquips = [];
         for (var i = 0; i < maxSlots; i++) {
            this._changedEquips[i] = new Game_Item();
         }
      }
      for (var i = 0; i < maxSlots; i++) {
         this._changedEquips[i].setObject(equips[i]);
      }
   };

   Game_Actor.prototype.changedEquips = function() {
      return this._changedEquips.map(function(item) {
         return item.object();
      });
   };

   Game_Actor.prototype.setBattleChangedEquip = function(slotId, item) {
      this._changedEquips[slotId].setObject(item);
   };

   //=============================================================================
   // Game_Action
   //  * Application of equipment changes during actual skill use.
   //=============================================================================
   
   Unco.CEB.Game_Action_apply = Game_Action.prototype.apply;
   Game_Action.prototype.apply = function(target) {
      Unco.CEB.Game_Action_apply.call(this,target);
      if (this.isSkill() && (this._item._itemId === Unco.Param.equipSkillId)) {
         var actor = this.subject();
         var maxSlots = actor.equipSlots().length;
         var currentEquips = actor.equips();
         var changedEquips = actor.changedEquips();           
         for (var i = 0; i < maxSlots; i++) {
            if (currentEquips[i] !== changedEquips[i]) {
               actor.changeEquip( i , changedEquips[i] );
               if (changedEquips[i] === actor.equips()[i]) {
                  target.result().success = true;
               }
            }
         }
      }
   };
   
   
   
   
})();