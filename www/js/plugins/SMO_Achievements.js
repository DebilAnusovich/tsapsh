/*:
* @plugindesc v1.03 - Adds an achievements mechanic.
* @author SMO
*
* @param Range
* @type select
* @option Local
* @option Global
* @desc Local  -> resets data on new games.
* Global -> resets data only with a plugin command.
* @default Local
*
* @param Categories And Trophies
* @type struct<categories>[]
* @desc Add/edit the categories you want here. Leave it empty
* if you don't want to use categories.
* @default ["{\"Category Name\":\"Battle\",\"Cat Background\":\"\",\"Trophy\":\"----------\",\"Hide Trophy\":\"false\",\"Trophy Description\":\"\\\"This is a description.\\\"\",\"Trophy Image\":\"\",\"On Unlock\":\"\"}"]
*
* @param Achievements Data
* @type struct<data>[]
* @desc Create/edit the data of each achievement here.
* @default ["{\"Name\":\"Slime Slayer\",\"Category\":\"Battle\",\"Description\":\"\\\"Kill 10 Slimes.\\\"\",\"Visibility\":\"Visible from start\",\"Background Image\":\"\",\"Pop Up Image\":\"\",\"Requirements\":\"[\\\"{\\\\\\\"Type\\\\\\\":\\\\\\\"Switch\\\\\\\",\\\\\\\"Item ID\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"Comparison\\\\\\\":\\\\\\\"≥\\\\\\\",\\\\\\\"Required Value\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"Alias\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Alias Icon\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"Advanced\\\\\\\":\\\\\\\"------\\\\\\\",\\\\\\\"Current Value\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Final Value\\\\\\\":\\\\\\\"\\\\\\\"}\\\"]\",\"Rewards\":\"\",\"Icons\":\"------\",\"Locked Icon\":\"-2\",\"Unlocked Icon\":\"-2\",\"Secret Icon\":\"-2\"}"]
*
* @param Texts and Colors
* @type struct<texts>
* @desc Customize texts and it's colors using the parameters below.
* @default {"Menu Name":"Achievements","Progress":"Total Progress:","Trophies":"TROPHIES","None":"None","Requirements":"Requirements:","Rewards":"Rewards:","Locked":"LOCKED","Unlocked On":"Unlocked on <date> at <time>","Secret Sign":"???","Secret Achiev":"\"This is a secret achievement. \\nIt'll be revealed once it's\\nrequirements are met.\"","Trophies Description":"\"Unlock trophies by completing achievements. Each category unlocks a different trophy.\"","Unlocked Color":"#00FF00","Selector Color":"#FF9900","Gauge Color 1":"rgba(20,255,20,1)","Gauge Color 2":"rgba(100,255,100,1)"}
*
* @param On Unlock
* @type note
* @desc Use JS to write a script, this script will be called every
* time an achievement is unlocked.
* @default "AudioManager.playMe({\n  name: 'Fanfare1',\n  pan: 0,\n  pitch: 100,\n  volume: 30\n});"
*          
* @param Menu Background
* @type file
* @dir img/achievements
* @require 1
* @desc Choose a file on the img/achievements folder to be the background of the achievement's menu.
*
* @param Hide Totally
* @type boolean
* @desc If ON, "Hidden" achievements won't be part of the total progress calculation.
* @default false
*
* @param Global Rewards
* @type boolean
* @desc If ON, the player will gain all the unlocked achievements'
* rewards when starting a new game. (Global range only)
* @default true
*
* @param Locked Achiev Background
* @type file
* @dir img/achievements
* @require 1
* @desc Choose an image as background for all the locked (non secret) the achievemets.
* @default
*
* @param Secret Achiev Background
* @type file
* @dir img/achievements
* @require 1
* @desc Choose an image as background for all the secret the achievemets.
* @default
*
* @param Auto Refresh
* @type boolean
* @on YES
* @off NO
* @desc Do you wish to check for unlocked achievements 
* automatically?
* @default true
*
* @param Update Interval
* @parent Auto Refresh
* @type number
* @min 30
* @desc Defines the interval between updates, in frames. 
* (1 sec = 60 frames). A smaller interval may cause lag.
* @default 60
*
* @param Use Trophies
* @type boolean
* @desc If OFF, the Trophies window will instead show the latest
* achievements unlocked.
* @default true
*
* @param Trophy Selector
* @parent Use Trophies
* @type select
* @option Grow
* @option Cursor
* @desc Grow   -> The trophy will grow in size when selected.
* Cursor -> An image will appear around the trophy.
* @default Grow
*
* @param Trophies Lines
* @parent Use Trophies
* @type number
* @min 1
* @desc Choose the number of lines for the trophies.
* Default: 2
* @default 2
*
* @param Trophies Columns
* @parent Use Trophies
* @type number
* @min 1
* @desc Choose the number of columns for the trophies.
* Default: 2
* @default 2
*
* @param Menu Command
* @type boolean
* @on YES
* @off NO
* @desc Do you wish to add a command on the menu to show the achievements?
* @default true
*
* @param Show Command Switch
* @parent Menu Command
* @type switch
* @desc Use this switch to show/hide the menu command. If this switch is ON, the command is visible.
* @default 0
*
* @param Command Position
* @parent Menu Command
* @type number
* @min 1
* @desc Choose the menu command's position on the menu list.
* @default 4
*
* @param Command Name
* @parent Menu Command
* @desc This name will appear on the menu.
* @default Achievements
*
* @param Title Command
* @type boolean
* @on YES
* @off NO
* @desc Do you wish to add a command on the title to show the achievements? (Only for Global range)
* @default true
*
* @param Title Command Position
* @parent Title Command
* @type number
* @min 1
* @desc Choose the position for this command on the title.
* (Only for Global range)
* @default 3
*
* @param Title Command Name
* @parent Title Command
* @desc The command will appear on the title with this name.
* (Only for Global range)
* @default Achievements
*
* @param Default Icons
* @desc These icons will be drawn next to this achievement's name.
* @default ------
*
* @param Locked Icon
* @parent Default Icons
* @type number
* @min -1
* @desc This icon will be drawn if the achievement is locked.
* Set it to -1 if you don't want to use an icon.
* @default 160
*
* @param Unlocked Icon
* @parent Default Icons
* @type number
* @min -1
* @desc This icon will be drawn if the achievement is unlocked.
* Set it to -1 if you don't want to use an icon.
* @default 164
*
* @param Secret Icon
* @parent Default Icons
* @type number
* @min -1
* @desc This icon will be drawn if the achievement is secret.
* Set it to -1 if you don't want to use an icon.
* @default 166
*
* @param Gold Icon
* @parent Default Icons
* @type number
* @min -1
* @desc Choose an icon for your currency. Use -1 if you don't wanna
* use this.
* @default 314
*
* @param Recent Unlock
* @parent Default Icons
* @type number
* @min -1
* @desc This icon will be shown on recently unlocked achievements. 
* Use -1 if you don't wanna use it.
* @default 191
*
* @param Pop Up Window
* @type boolean
* @desc If ON, a pop up will appear everytime an achievement
* is unlocked.
* @default true
*
* @param Pop Up Button
* @parent Pop Up Window
* @type boolean
* @on YES
* @off NO
* @desc Do you wish to turn the Pop Up into a button so the
* player can click on it and go to the achievement's menu?
* @default true
*
* @param Pop Up Text
* @parent Pop Up Window
* @type note
* @desc The text shown on the pop up window, text codes are allowed.
* @default "<center>\\c[1]\\}Unlocked: \n<center>\\c[0]\\{<achievName>"
*
* @param Pop Up X
* @parent Pop Up Window
* @desc The X position for the Pop Up Window. You can use formulas.
* Default: Graphics.width - PopUp.width
* @default Graphics.width - PopUp.width
*
* @param Pop Up Y
* @parent Pop Up Window
* @desc The Y position for the Pop Up Window. You can use formulas.
* Default: 0
* @default 0
*
* @param Pop Up Width
* @parent Pop Up Window
* @desc The width for the Pop Up Window. You can use formulas.
* Default: 140
* @default 140
*
* @param Pop Up Heigth
* @parent Pop Up Window
* @desc The height for the Pop Up Window. You can use formulas.
* Default: 106
* @default 106
*
* @param Pop Up Borders
* @parent Pop Up Window
* @desc Choose a color for the pop up's borders. Leave it empty if you don't want borders.
* @default rgba(0,0,0,0.8)
*
* @param Sort Options
* @type struct<sort>[]
* @desc Erase all options if you don't want to use this.
* @default ["{\"Symbol\":\"A-z\",\"Script\":\"\\\"main = unlocked.concat(locked);\\\\nmain.sort((a, b) => a.Name.localeCompare(b.Name, 'en', { sensitivity: 'base' }));\\\\nmain.push(...secrets);\\\"\"}","{\"Symbol\":\"Locked\",\"Script\":\"\\\"unlocked.sort((a, b) => a.Name.localeCompare(b.Name, 'en', { sensitivity: 'base' }));\\\\nlocked.sort((a, b) => a.Name.localeCompare(b.Name, 'en', { sensitivity: 'base' }));\\\\nmain = locked.concat(unlocked, secrets);\\\"\"}","{\"Symbol\":\"Unlocked\",\"Script\":\"\\\"unlocked.sort((a, b) => a.Name.localeCompare(b.Name, 'en', { sensitivity: 'base' }));\\\\nlocked.sort((a, b) => a.Name.localeCompare(b.Name, 'en', { sensitivity: 'base' }));\\\\nmain = unlocked.concat(locked, secrets);\\\"\"}","{\"Symbol\":\"Recent\",\"Script\":\"\\\"unlocked.sort((a, b) => SMO.AM.compareAchievsDates(a, b));\\\\nlocked.sort((a, b) => a.Name.localeCompare(b.Name, 'en', { sensitivity: 'base' }));\\\\nmain = unlocked.concat(locked, secrets);\\\"\"}"]
*
* @param Sort X
* @parent Sort Options
* @type number
* @min 0
* @desc Choose the sort option's width. Default: 15
* @default 15
*
* @param Sort Y
* @parent Sort Options
* @type number
* @min 0
* @desc Choose the sort option's width. Default: 25
* @default 25
*
* @param Sort Width
* @parent Sort Options
* @type number
* @min 20
* @desc Choose the sort option's width. Default: 120
* @default 120
*
* @param Cell Height
* @parent Sort Options
* @type number
* @min 20
* @desc Choose the height for the each option on the sort option. Default: 30.
* @default 30
* 
*          
* @help
*==============================================================================
* SMO_Achievements.js
*==============================================================================
* Hi there!
*
* This plugin will help you create your own achievements menu! You'll find
* some helpful information about how to use it below.
*
*------------------------------------------------------------------------------
* THE BASICS
*------------------------------------------------------------------------------
* ACHIEVEMENTS
* To add/change your achievements use the parameter "Achievements Data". You
* can customize their name, description, icon, image, etc.
*
* CATEGORIES
* With the parameter "Categories And Trophies" you can customize your
* categories' names/images and the trophies' in general.
*
* If you don't want to use categories you can erase all data inside this
* parameter, but then the trophies window will also disappear.
*
* What's a Trophy?
* After completing all the achievements of a specific category the player
* unlocks a trophy, a custom image will be shown at the achievements menu
* with an also custom message.
*
* An achievement may have multiple categories, use the "Achievements Data"
* parameter edit it. Separate each category with a comma.
*
* CUSTOM IMAGES
* Any custom image shall be placed on "img/achievements". You can set custom
* images for each achievement, trophy and for the achievement menu. You can
* use the same image for different objects.
*
* IMPORTANT: Avoid naming two different achievements/categories with the 
* same name.
*
*------------------------------------------------------------------------------
* ACHIEVEMENTS DATA
*------------------------------------------------------------------------------
* Like said before, this parameter is where you add/change or remove your
* achievements.
*
* A simple setup for this parameter would be like:
* 1 {achievement data} -> this achievement will have ID 1
* 2 {achievement data} -> ID 2
* 3 {achievement data} -> ID 3
*
* The numbers on the left are the lines, if you don't add any custom line they
* will also match the achievement id. For organization pourposes you can add
* custom texts inside this structure (but only on this one), if you do so it'll
* look like this:
* 1 Custom text -> ignored by the plugin
* 2 Custom text -> ignored by the plugin
* 3 {achievement data} -> ID 1
* 4 {achievement data} -> ID 2
* 5 Custom text -> ignored by the plugin
* 6 {achievement data} -> ID 3
*
* As you can see the lines do not match the achievements' ids anymore, the
* id's are given based on the achievements order on the list ignoring the
* custom texts. Any line can be a custom text, as long as it doesn't start
* with a "{".
*
* Check this plugin's demo to see an example of setup for this parameter.
*
*------------------------------------------------------------------------------
* REQUIREMENTS and REWARDS
*------------------------------------------------------------------------------
* TYPE
* The first step is to select a Type (Switch, Variable, Steps, etc);
*
* ITEM ID
* The parameter "Item ID" is only necessary if the chosen type is Switch,
* Variable, Item, Weapon, Armor or Party Member, if the chosen type is not
* between the ones mentioned the "Item ID" will be ignored.
*
* COMPARISON
* It's recommended to leave the "Comparison" in "≥". 
* While using "≥", the achievement's unlock progress will be calculated based
* on this requirement's current/required value, when using other comparisons
* the progress will be based on whether the requirement has been met or not.
*
* Example:
* Requirement: Walk 10 steps.
* After walking 5 steps you'll have: Steps 5/10.
* This will show 50% if the comparison is "≥", but if it's not, it'll show 0%
* until the you reach the 10 steps, then it'll change to 100%.
*
* REQUIRED VALUE
* It's gonna be compared with the current value of the selected item. That's
* the target value.
*
* For example, let's say that you've chosen:
* Type           = Variable 
* Item ID        = 1
* Comparison     = ≥
* Required Value = 10
*
* This requirement will be met only when the variable 1's value is equal or 
* bigger than 10.
*
* ALIAS
* If you don't wanna show this requirement's default name you can give it a
* custom name using this parameter.
* You can make use of the following text codes:
* <CurrentValue>  -> replaced by this item's "Current Value";
* <RequiredValue> -> replaced by this item's "Required Value" (or by the
* "Final Value" if you're using a Custom(Advanced) type);
*
* Each item Type has a default word in case you don't use an Alias:
* Custom(Advanced): Custom
* Switch:           The switch's name
* Variable:         The variable's name
* Item:             The item's name
* Weapon:           The weapon's name
* Armor:            The armor's name
* Gold:             (Gold Icon)
* Party Member:     The party member's name
* All the others are replaced by the item type.
*
* You can also select an icon to be drawn next to your alias by using the
* parameter ALIAS ICON.
* 
* ADVANCED
* To have more control over the requirements you can use JavaScript codes
* to define the current and final values for this requirement.
*
* To create an advanced requirement choose the item type "Custom(Advanced)",
* then add a script to "Current Value", this script shall return the current
* value for this requirement, not the comparison.
* Examples of script on "Current Value":
* $gameVariables.value(1) -> Returns the variable 1's value.
* $gameSwitches.value(1) -> Returns the switch 1's value.
* $gameParty.gold() -> Returns the party's gold.
*
* The comparison is made based on the "Comparison" parameter, don't forget
* to check it out.
*
* Finally, the "Final Value" will be compared to the "Current Value" to unlock
* (or not) the achievement. Adding a script on "Final Value" is not required
* though, if you leave it empty the "Required Value" parameter will be used 
* instead.
*
* Example 1:
* Current Value: $gameVariables.value(1)
* Comparison:    ≥
* Final Value:   $gameVariables.value(2)
* This requirement will be met when the variable 1's value is equal or
* bigger than the variable 2's value.
*
* Example 2:
* Current Value: $gameMap.mapId()
* Comparison:    =
* Final Value:   12
* Met when the player arrives on the map with ID 12.
*
* Example 3
* Current Value: $gameSwitches.value(1) || $gameSwitches.value(2)
* Comparison:    =
* Final Value:   true
* Met when the switch 1 or the switch 2 is ON.
*
* Example 4 (using YEP_JobPoints):
* Current Value: $gameActors.actor(1).jp()
* Comparison:    ≥
* Final Value:   500
* Met at if the actor 1 has 500 JP or more on it's current class.
*
* It's recommended that you use the "Alias" parameter to customize this
* requirement's name. If you don't, the word "Custom" will be used as
* a default name.
*
* REWARDS
* The rewards are similar to the requirements with a few differences.
*
* The "Advanced" parameter is a script call called when the achievement is
* unlocked, it works with any item type not only with custom.
*
*------------------------------------------------------------------------------
* RANGE
*------------------------------------------------------------------------------
*  - Local:
* The Achievements must be unlocked on each playthrough, unlocked achievements
* are saved with the save file.
*
* - Global:
* Once unlocked, an achievement will only change it's state if you use a plugin
* command or a script call, unlocked achievements are saved on a json file.
* IMPORTANT: if you choose this mode make sure you have a file called
* Achievements.json inside your data folder data/Achievements.json), don't
* write anything on it, this plugin will automatically fill it with encrypted
* data when you start a playtest.
*
*------------------------------------------------------------------------------
* TEXTS AND COLORS
*------------------------------------------------------------------------------
* On this parameter you'll find most of texts drawn on the achievements menu,
* some colors may also be customized here, like the color of an unlocked
* achievement's text, which is green for default.
*
* UNLOCKED ON
* This plugin saves the date on which any achievement is unlocked and you
* can show it for the player by using this parameter, to do so use the following
* text codes:
* <Hour> or <HourA>   -> replaced by the hour (24h style);
* <HourB>  -> replaced by the hour (AM/PM style);
* <Phase>  -> replaced by the phase of the day (AM or PM);
* <Min>    -> replaced by the minutes;
* <Sec>    -> replaced by the seconds;
* <Day> or <DayA>     -> replaced by the day (number);
* <DayB>   -> replaced by the day of the week;
* <DayC>   -> replaced by the abbreviation of the day of the week;
* Examples: Saturday -> Sat, Sunday -> Sun, Monday -> Mon
* <Month> or <MonthA> -> replaced by the month (number);
* <MonthB> -> replaced by the month's name;
* <MonthC> -> replaced by the abbreviation of the month's name;
* Examples: January -> Jun, February -> Feb, December -> Dec
* <Year>   -> replaced by the year (number);
* <Date>   -> replaced by the date (day/month/year);
* <Time>   -> replaced by the time (hour:min:sec);
*
* Examples:
* Unlocked on <date> at <time> --> Unlocked on 19/05/2020 at 19:29:30
* Unlocked on <MonthC> <day>, at <HourB>:<min>:<sec> <phase> -->
*    Unlocked on May 19, at 07:29:30 PM
* Unlocked on <DayC> <MonthC> <year> --> Unlocked on Tue May 2020
*
* Notice that using upper/lower case is irrelevant, you can write
* <Date> or <date> or <DATE> or any other way you want.
*
*------------------------------------------------------------------------------
* USE TROPHIES
*------------------------------------------------------------------------------
* If you don't want to use trophies, you can deactivate this parameter, the
* trophies window will show the latest achievements unlocked instead. If you
* do so, you may also want to change the "Trophies" and the "Trophies
* Description" texts on the "Texts and Colors" parameter.
*
* In order to hide a specific trophy check the parameter "Hide Trophy"
* inside "Categories And Trophies".
*
* Selecting Trophies
* To select a trophy on the achievs menu make use of the left and right
* arrow keys, hold them to move the selector faster. It's also possible
* to click on the trophies to select them.
* 
*------------------------------------------------------------------------------
* POP UP WINDOW
*------------------------------------------------------------------------------
* This plugin allows you to show a Pop Up when an achievement is unlocked.
* When many achievements are unlocked at once they enter a queue.
* You can customize this window's properties using the plugin's parameters
* or even deactivate it changing the "Pop Up Window" parameter.
*
* Position
* When writing formulas for the X and Y coodinates, one can use PopUp.width and
* PopUp.height to refer to the Pop Up Window's width and height respectively.
*
* Button Pop Up
* This window may also become a button, if so, by clicking on it the player
* will be taken to the achievement's menu. This feature is also optional.
*
* Custom Images
* For default, achievements will show their background image (the same image
* you see on the menu) on the pop up, but you can make it show another image
* using the parameter "Pop Up Image" inside "Achievements Data". In any case,
* the image chosen will be resized to fit inside the pop up.
*
* Custom text
* It's also possible to write a text above the custom image using the parameter
* "Pop Up Text", this text allows text codes like \c[x] and \i[x] and others,
* but not only that, it have some customized text codes you may use:
* <AchievName>       -> replaced by the achievement's name;
* <AchievID>         -> replaced by the achievement's ID;
* <AchievIcon>       -> it'll draw the achievement's icon;
* <AchievCategory:n> -> replaced by the achievement's n-th category;
* <center>           -> centralizes this line of text;
* <right>            -> aligns this line of text to the right of the window;
* The left alignment is default, so there's no code for that.
*
* Example:
* Let's say you just unlocked the following achievement:
* Name:     "Beginner"
* Category: "All,Gameplay"
* ID:       6
*
* If you setup your pop up's text to:
* Unlocked: <AchievName> (<AchievID>)
* Cat: <AchievCategory:2>
* <center>Good Job!
*
* The pop up will show:
* Unlocked: Beginner (6)
* Cat: Gameplay
*      Good Job!
*
* These codes are case insensitive, which means that you can write <center>,
* <Center>, <CENTER> or any other way you want.
*
*------------------------------------------------------------------------------
* DEFAULT ICONS
*------------------------------------------------------------------------------
* These will be the icons used by default when no icon is specified on the
* achievement's data. Use -1 if you don't want to use an icon.
*
*------------------------------------------------------------------------------
* SORT OPTIONS
*------------------------------------------------------------------------------
* You may notice an option on the upper left corner of the achievements menu
* (A-z), this option may be used to order all the achievements in a specific
* way. To open this option you may just click on it, once open click in one of
* the options to re-order the achievements, clicking outside the box will
* cancel the selection.
*
* The keyboard and the gamepad may also be used to command the sort option,
* press "Shift" to open it, the arrow keys to select a new option and "Ok"
* (Z or Enter) to confirm or "Cancel" (X or Esc) to cancel.
*
* You can add/edit or even remove the sort options with this parameter.
* By removing all the options you'll deactivate it. You'll need some JavaScript
* knowledge to create or edit those options.
*
* In order to edit the file, one can make use of some variables:
*
* locked -> an array which stores all the locked (non secret) achievements;
*
* unlocked -> an array which stores all the unlocked achievements;
*
* secrets -> an array which stores all the secret achievements. Keep in mind
* that those are also locked, if a secret achievement is unlocked it'll be
* part of the unlocked array.
*
* main -> an empty array which will be returned as the new list of achievements
* for the achievements menu, so make sure to concat the other arrays into
* this one.
*
* all -> an array containing all the achievements, just like the other arrays,
* this one is filtered by the selected category. Also, no hidden achievement 
* will appear on any array, but once a hidden achievement is unlocked it'll be 
* part of the unlocked array.
*
* Examples:
*
* main = all;
* The example above will return the achievements with the same order as the
* database.
*
* main = main.concat(locked, unlocked, secrets);
* With the script above the achievements will also be at the same order as the
* database, except that the locked achievements will appear first, followed
* by the unlocked ones and at last the secret ones.
*
* You can use sort() to order the achievents, check the default value on
* "Sort Options" to see some examples.
*
*------------------------------------------------------------------------------
* YEP_MainMenuManager Compatibility
*------------------------------------------------------------------------------
* In case you want to use YEP_MainMenuManager you can turn the "Menu Command"
* parameter OFF and use the following settings:
*
*       Name: "Achievements"
*     Symbol: achievements
*       Show: true
*    Enabled: true
*        Ext:
*  Main Bind: this.commandAchievements.bind(this)
* Actor Bind:
*
* You can customize the "Name", "Show" and "Enabled" options.
*
*------------------------------------------------------------------------------
* PLUGIN COMMANDS
*------------------------------------------------------------------------------
* Command 1:
* ShowAchievements
*
* Action:
* Opens the achievements menu.
*
*  -  -  -  -  -  -  -  -  -  -
* Command 2:
* ShowAchievements categoryName
*
* Action:
* Opens the achievements menu on a specific category.
*
* Example:
* ShowAchievements Battle
*
*  -  -  -  -  -  -  -  -  -  -
* Command 3:
* RefreshAchievements
*
* Action:
* Manually refreshes the locked achievements, unlocking them in case their
* requirements are met.
*
*  -  -  -  -  -  -  -  -  -  -
* Command 4:
* ResetAchievementsData
*
* Action:
* Locks all the achievements and trophies.
*
*------------------------------------------------------------------------------
* SCRIPT CALLS
*------------------------------------------------------------------------------
* The id of an achievement is the number that appears next to it's data on
* the "Achievements Data" parameter, it's based on their order on that list
* so the first data will have id = 1, the second id = 2 and so on.
*
* Script 1:
* $gameSystem.achievement(id)
*
* Action:
* Returns the data of this achievement or null if there's no achievement
* with this id.
*
* Examples:
* $gameSystem.achievement(1);
* $gameSystem.achievement('Slime Slayer');
*
*  -  -  -  -  -  -  -  -  -  -
* Script 2:
* $gameSystem.achievement(id).isUnlocked()
*
* Action:
* Returns a boolean (true or false).
*
*  -  -  -  -  -  -  -  -  -  -
* Script 3:
* $gameSystem.achievement(id).isSecret()
*
* Action:
* Returns a boolean (true or false).
*
*  -  -  -  -  -  -  -  -  -  -
* Script 4:
* $gameSystem.achievement(id).isHidden()
*
* Action:
* Returns a boolean (true or false).
*
*  -  -  -  -  -  -  -  -  -  -
* Script 5:
* $gameSystem.achievement(id).unlock()
*
* Action:
* Forces this achievement to unlock.
*
*  -  -  -  -  -  -  -  -  -  -
* Script 6:
* $gameSystem.achievement(id).lock()
*
* Action:
* Locks the achievement again.
*
*  -  -  -  -  -  -  -  -  -  -
* Script 7:
* $gameSystem.unlockedAchievsCount()
*
* Action:
* Returns the number of achievements unlocked so far.
*
*  -  -  -  -  -  -  -  -  -  -
* Script 8:
* $gameSystem.lockedAchievsCount()
*
* Action:
* Returns the number of achievements still locked.
*
*  -  -  -  -  -  -  -  -  -  -
* Script 9:
* $gameSystem.isTrophyUnlocked(id)
*
* Action:
* Returns a boolean (true or false). You can use the category's name or ID.
*
* Examples:
* $gameSystem.isTrophyUnlocked(1);
* $gameSystem.isTrophyUnlocked('Battle');
*
*------------------------------------------------------------------------------
* Changelog
*------------------------------------------------------------------------------
* V 1.03 
*    - The info window now open/close instead of just appearing/disappearing;
*    - Improved wrap text mechanic, and it also works on the info window now;
*    - Improved performance on the menu;
*    - Achievements are now refreshed after transfering;
*    - Parameter "Unlocked In" changed to "Unlocked On";
*    - New parameters for trophies on "Categories and Trophies": "Hide Trophy",
*    "Trophy Image" and "On Unlock";
*    - New parameter inside "Use Trophies": "Trophy Selector";
*    - Added option to select images for locked and secret achievements (check
*    out "Locked Achiev Background" and "Secret Achiev Background";
*    - Added text codes for the pop up's text and for the "Unlocked On" text;
*    - It's possible to set a different image for the pop up for each achiev,
*    check out "Pop Up Image" inside "Achievements Data";
*
* V 1.02 
*    - Fixed bug with plugin commands;
*    - Fixed bug where achievements unlocked with script calls were not
*    being saved on global range;
*
* V 1.01 
*    - New parameter added: Global Rewards;
*
* V 1.00 
*    - Plugin released!
*
*------------------------------------------------------------------------------
* END OF THE HELP FILE
*------------------------------------------------------------------------------
*/
//===============================================================================================
// Categories Structure
//===============================================================================================
/*~struct~categories:
*
* @param Category Name
* @desc Choose a name for this category.
* @default Battle
*
* @param Cat Background
* @type file
* @dir img/achievements
* @required 1
* @desc The background image for this category.
* @default
*
* @param Trophy
* @default ----------
*
* @param Hide Trophy
* @parent Trophy
* @type boolean
* @desc If ON, this trophy won't appear on the menu, but the player can still unlock it.
* @default false
*
* @param Trophy Description
* @parent Trophy
* @type note
* @desc Write a description for this category's trophy.
* @default "This is a description."
*
* @param Trophy Image
* @parent Trophy
* @type file
* @dir img/achievements
* @require 1
* @desc Choose an image to represent this trophy.
* @default
*
* @param On Unlock
* @parent Trophy
* @type note
* @desc This script will be called once this trophy is unlocked.
* @default
*
*/
//===============================================================================================
// Data Structure
//===============================================================================================
/*~struct~data:
*
* @param Name
* @desc Defines the name of this achievement.
* This name will appear when selecting achievements.
* @default Slime Slayer
*
* @param Category
* @desc Define the category of this achievement. You can set
* multiple categories, separate each one with a comma.
* @default Battle
*
* @param Description
* @type note
* @desc This text will be shown on this achievement's body.
* Maximum of 3 lines.
* @default "Kill 10 Slimes."
*
* @param Visibility
* @type select
* @option Visible from start
* @option Secret
* @option Hidden
* @desc Secret: You'll see this achievement with question marks.
* Hidden: You won't see this achievement on the menu.
* @default Visible from start
*
* @param Background Image
* @type file
* @dir img/achievements
* @require 1
* @desc Choose an image to serve as background for this achievement.
* @default
*
* @param Pop Up Image
* @type file
* @dir img/achievements
* @require 1
* @desc This image will be the pop up's background when this achievement is unlocked.
* @default
*
* @param Requirements
* @type struct<requirements>[]
* @desc Defines what is required to unlock this achievement.
* @default ["{\"Type\":\"Switch\",\"Item ID\":\"1\",\"Comparison\":\"≥\",\"Value\":\"1\",\"Alias\":\"\",\"Advanced\":\"------\",\"Current Value\":\"\",\"Final Value\":\"\"}"]
*
* @param Rewards
* @type struct<rewards>[]
* @desc Make a list with the rewards for unlocking this achievement.
* @default
*
* @param Icons
* @desc These icons will be drawn next to this achievement's name.
* They will overwrite the "Default Icons".
* @default ------
*
* @param Locked Icon
* @parent Icons
* @type number
* @min -2
* @desc -1 -> No icon at all;
* -2 -> Replaced the equivalent "Global Icon".
* @default -2
*
* @param Unlocked Icon
* @parent Icons
* @type number
* @min -2
* @desc -1 -> No icon at all; 
* -2 -> Replaced the equivalent "Global Icon".
* @default -2
*
* @param Secret Icon
* @parent Icons
* @type number
* @min -2
* @desc -1 -> No icon at all;
* -2 -> Replaced the equivalent "Global Icon".
* @default -2
*
*/

//===============================================================================================
// Requirements Structure
//===============================================================================================
/*~struct~requirements:
*
* @param Type
* @type select
* @option Custom(Advanced)
* @option Switch
* @option Variable
* @option Item
* @option Weapon
* @option Armor
* @option Gold
* @option Steps
* @option Playtime
* @option Save Count
* @option Battle Count
* @option Win Count
* @option Escape Count
* @option Party Member
* @option Party Level
* @option Party Size
* @desc Choose the requirement type.
* @default Switch
*
* @param Item ID
* @type Number
* @min 1
* @desc The ID of the Switch, Variable, Item, Weapon, Armor or
* Party Member.
* @default 1
*
* @param Comparison
* @type select
* @option =
* @option >
* @option ≥
* @option <
* @option ≤
* @option ≠
* @desc This will be used for comparison between the current
* value and the required one.
* @default ≥
*
* @param Required Value
* @desc This is the value required to unlock this achievement.
* @default 1
*
* @param Alias
* @desc This name will override the item's name.
* Read the help section to learn about it.
* @default
*
* @param Alias Icon
* @parent Alias
* @type number
* @min -1
* @desc The icon drawn next to your "Alias" name.
* Use -1 if you don't want to use an icon.
* @default -1
*
* @param Advanced
* @desc For custom items only.
* Check the parameters below.
* @default ------
*
* @param Current Value
* @parent Advanced
* @type note
* @desc Use JS to define this requirement's current value.
* Read the help section to learn about it.
* @default
*
* @param Final Value
* @parent Advanced
* @type note
* @desc Use JS to define this requirement's final value.
* Read the help section to learn about it.
* @default
*
*/

//===============================================================================================
// Rewards Structure
//===============================================================================================
/*~struct~rewards:
*
* @param Type
* @type select
* @option Custom(Advanced)
* @option Gold
* @option Item
* @option Weapon
* @option Armor
* @desc Select the item type.
* @default Gold
*
* @param Item ID
* @type number
* @min 1
* @desc Select the Item ID (ignore this if you selected Gold).
* @default 1
*
* @param Amount
* @type Number
* @min 1
* @desc Defines the amount of the selected item to be given
* to the player.
* @default 1
*
* @param Advanced
* @type note
* @desc Use JS to code a script, this script will be called once
* this achievement is unlocked. Works with all item types.
* @default
*
* @param Alias
* @desc This name will override the item's name.
* Read the help section to learn about it.
* @default
*
* @param Alias Icon
* @parent Alias
* @type number
* @min -1
* @desc The icon drawn next to your "Alias" name.
* Use -1 if you don't want to use an icon.
* @default -1
*
*/

//===============================================================================================
// Texts Structure
//===============================================================================================
/*~struct~texts:
*
* @param Menu Name
* @desc This name appears at the top of the menu.
* @default Achievements
*
* @param Progress
* @desc This is the text showed as the total progress
* @default Total Progress:
*
* @param Trophies
* @desc This name will appear above the tophies.
* @default TROPHIES
*
* @param None
* @desc This text appears when there's no requirements/rewards to be shown.
* @default None
*
* @param Requirements
* @desc This text is shown above the requirements.
* @default Requirements:
*
* @param Rewards
* @desc This text is shown above the rewards.
* @default Rewards:
*
* @param Locked
* @desc This text will be shown when selecting a locked data.
* @default LOCKED
*
* @param Unlocked On
* @desc Shown on the info window when the selected achievement is
* unlocked. Learn more about it on the Help section.
* @default Unlocked on <date> at <time>
*
* @param Secret Sign
* @desc This text will replace the achievement's name in case it's secret.
* @default ???
*
* @param Secret Achiev
* @type note
* @desc This text will be shown when selecting a secret achievement.
* @default "This is a secret achievement. It'll be revealed once it's requirements are met."
*
* @param Trophies Description
* @type note
* @desc This text will be shown on the trophy's window.
* @default "Unlock trophies by completing achievements. Each category unlocks a different trophy."
*
* @param Unlocked Color
* @desc The color of unlocked achievements' texts and borders.
* You can use hexadecimal or rgba colors. Default: #00FF00
* @default #00FF00
*
* @param Selector Color
* @desc The color of the selector (used for trophies and sort options).
* You can use hexadecimal or rgba colors. Default: #FF9900
* @default #FF9900
*
* @param Gauge Color 1
* @desc The first color for the menu gauges.
* You can use hexadecimal or rgba colors. Default: rgba(20,255,20,1)
* @default rgba(20,255,20,1)
*
* @param Gauge Color 2
* @desc The second color for the menu gauges.
* You can use hexadecimal or rgba colors. Default: rgba(100,255,100,1)
* @default rgba(100,255,100,1)
*
*/
/*~struct~sort:
* @param Symbol
* @desc This will be the name of this option.
* @default A-z
*
* @param Script
* @type note
* @desc The script called to sort the achievements. Check the @help section for more info.
* @default "main = unlocked.concat(locked);\nmain.sort((a, b) => a.Name.localeCompare(b.Name, 'en', { sensitivity: 'base' }));"
*
*/
var Imported = Imported || {};
var SMO = SMO || {};
SMO.AM = {};
Imported.SMO_Achievements = true;

//===============================================================================================
// Basics
//===============================================================================================
if (!Array.prototype.last){
	Array.prototype.last = function(){
		return this[this.length - 1];
	}
}

if (!Array.prototype.delete){
	Array.prototype.delete = function(value){
		if (value && this.contains(value)){
			this.splice(this.indexOf(value), 1);
		}
		return this;
	}
}

if (!Array.prototype.deleteAll){
	Array.prototype.deleteAll = function(value){
		if (value) {
			while (this.contains(value)){
				this.splice(this.indexOf(value), 1);
			}
		} else {
			this.splice(0, this.length);
		}
		return this;
	}
}

Number.toNatural = function(n){
	return n > 0 ? Math.round(n) : 0;
}

Bitmap.prototype.drawTriangleS = function(x, y, base, height, direction, color){
	var p1, p2, p3;
	base = base || 6;
	height = height || 4;
	switch(direction){
	case 'left':
		p1 = {x:x - height, y:y};
	case 'right':
		p1 = p1 || {x:x + height, y:y};
		p2 = {x:x, y:y - base/2};
		p3 = {x:x, y:y + base/2};
		break;
	case 'up':
		p1 = {x:x, y:y - height};
	default:
		p1 = p1 || {x:x, y:y + height};
		p2 = {x:x - base/2, y:y};
		p3 = {x:x + base/2, y:y};
	}
	var sides = Math.hypot(height, base/2);
	var context = this._context;
	context.save();
	context.fillStyle = color;
	context.beginPath();
	context.moveTo(p1.x, p1.y);
	context.lineTo(p2.x, p2.y);
	context.lineTo(p3.x, p3.y);
	context.fill();
	context.restore();
	this._setDirty();
}

Bitmap.prototype.drawHalfCircleS = function(x, y, radius, color, side){
	var sides = ['down', 'left', 'up', 'right'];
	var index = sides.indexOf(side) > -1 ? sides.indexOf(side) : 0;
	var startAngle = Math.PI * index/2;
	var endAngle = startAngle + Math.PI;
	var context = this._context;
	context.save();
	context.fillStyle = color;
	context.beginPath();
	context.arc(x, y, radius, startAngle, endAngle, false);
	context.fill();
	context.restore();
	this._setDirty();
}

Bitmap.prototype.drawRectS = function(x, y, width, height, borderSize, borderColor, backColor, backImg){
	borderSize = borderSize || 0;

	//Drawing borders
	if (borderSize > 0){
		borderColor = borderColor || '#FFFFFF';
		this.fillRect(x, y, borderSize, height, borderColor);//left
		this.fillRect(x + width - borderSize, y, borderSize, height, borderColor);//right
		this.fillRect(x + borderSize, y, width - borderSize * 2, borderSize, borderColor);//top
		this.fillRect(x + borderSize, y + height - borderSize, width - borderSize * 2, borderSize, borderColor);//bottom
	}

	//Drawing background
	if (backImg){
		var bitmap = ImageManager.loadAchievement(backImg);
		this.blt(bitmap, 0, 0, bitmap.width, bitmap.height, x + borderSize, y + borderSize, width - borderSize * 2, height - borderSize * 2);
	} else {
		backColor = backColor || 'rgba(0,0,0,0.6)';
		this.fillRect(x + borderSize, y + borderSize, width - borderSize * 2, height - borderSize * 2, backColor);
	}
}

Bitmap.prototype.drawRectSR = function(x, y, width, height, borderSize, borderColor, backColor, backImg){
	backColor = backColor || 'rgba(0,0,0,0.6)';
	borderSize = borderSize || 0;
	//The height cannot be odd
	height = (height % 2 != 0) ? height + 1 : height;
	//The width cannot be smaller than the height
	width = Math.max(width, height);
	//The bordersize cannot be bigger than half the height
	borderSize = Math.min(borderSize, height/2);

	//Drawing borders
	if (borderSize > 0){
		borderColor = borderColor || '#FFFFFF';
		//Left border
		this.drawHalfCircleS(x + height/2, y + height/2, height/2, borderColor, 'left');
		this.drawHalfCircleS(x + height/2, y + height/2, height/2 - borderSize, backColor, 'left');
		//Right border
		this.drawHalfCircleS(x + width - height/2, y + height/2, height/2, borderColor, 'right');
		this.drawHalfCircleS(x + width - height/2, y + height/2, height/2 - borderSize, backColor, 'right');
		//Top border
		this.fillRect(x + height/2, y, width - height, borderSize, borderColor);
		//Bottom border
		this.fillRect(x + height/2, y + height - borderSize, width - height, borderSize, borderColor);
	} else {
		//Left backgorund
		this.drawHalfCircleS(x + height/2, y + height/2, height/2, backColor, 'left');
		//Right backgorund
		this.drawHalfCircleS(x + width - height/2, y + height/2, height/2, backColor, 'right');
	}

	//Drawing background (rectangle)
	if (backImg){
		var bitmap = ImageManager.loadAchievement(backImg);
		this.blt(bitmap, 0, 0, bitmap.width, bitmap.height, x + borderSize, y + borderSize, width - borderSize * 2, height - borderSize * 2);
	} else {
		this.fillRect(x + height/2, y + borderSize, width - height, height - borderSize * 2, backColor);
	}
}

//===============================================================================================
// Plugin Parameters
//===============================================================================================
SMO.getParams = PluginManager.parameters('SMO_Achievements');

SMO.AM.isGlobalRange = String(SMO.getParams['Range']) === 'Global' ? true : false;
if (SMO.AM.isGlobalRange && !Utils.isNwjs()){
	SMO.AM.isGlobalRange = false;
	console.warn('Global range does not work out of Node.js, the achievement\'s range was adjusted to "Local".');
}
SMO.AM.isGlobalRewards  = SMO.AM.isGlobalRange && String(SMO.getParams['Global Rewards']) === 'true' ? true : false;
SMO.AM.background       = String(SMO.getParams['Menu Background']);
SMO.AM.autoRefresh      = SMO.getParams['Auto Refresh'] === 'true' ? true : false;
SMO.AM.updateInterval   = Number(SMO.getParams['Update Interval']);
SMO.AM.onUnlockScript   = SMO.getParams['On Unlock'] ? JSON.parse(SMO.getParams['On Unlock']) : '';
SMO.AM.hideTotally      = SMO.getParams['Hide Totally'] === 'true' ? true : false;
SMO.AM.lockedBackground = SMO.getParams['Locked Achiev Background'];
SMO.AM.secretBackground = SMO.getParams['Secret Achiev Background'];

SMO.AM.TrophiesConfigs = {
	enabled:     SMO.getParams['Use Trophies'] === 'true' ? true : false,
	lines:       Number(SMO.getParams['Trophies Lines']),
	cols:        Number(SMO.getParams['Trophies Columns']),
	selectStyle: SMO.getParams['Trophy Selector'] === 'Grow' ? 'grow' : 'cursor'
};

SMO.AM.TitleCommand = {
	active:   SMO.getParams['Title Command'] === 'true' ? true : false,
	name:     String(SMO.getParams['Title Command Name']),
	position: Number(SMO.getParams['Title Command Position']),
}

//Pop Up
SMO.AM.PopUp = {
	state:            SMO.getParams['Pop Up Window'] === 'true' ? true : false,
	button:           SMO.getParams['Pop Up Button'] === 'true' ? true : false,
	text:             SMO.getParams['Pop Up Text'] ? JSON.parse(SMO.getParams['Pop Up Text']) : '',
	x:                String(SMO.getParams['Pop Up X']),
	y:                String(SMO.getParams['Pop Up Y']),
	width:            String(SMO.getParams['Pop Up Width']),
	height:           String(SMO.getParams['Pop Up Heigth']),
	borderColor:      SMO.getParams['Pop Up Borders'] || 'rgba(0,0,0,0)',
	preselect:        0,
	isClickTriggered: false
};

SMO.AM.getTexts = function(){
	var texts = JSON.parse(SMO.getParams['Texts and Colors']);
	SMO.AM.Texts = {
		progress:         String(texts['Progress']),
		trophies:         String(texts['Trophies']),
		secretSign:       String(texts['Secret Sign']),
		menuName:         String(texts['Menu Name']),
		locked:           String(texts['Locked']),
		unlockedOn:       texts['Unlocked In'] || String(texts['Unlocked On']),//unlocked in -> for previous versions
		secretAchievDesc: texts['Secret Achiev'] ? JSON.parse(texts['Secret Achiev']) : '',
		trophiesDesc:     texts['Trophies Description'] ? JSON.parse(texts['Trophies Description']) : '',
		none:             String(texts['None']),
		requirements:     String(texts['Requirements']),
		rewards:          String(texts['Rewards']),
		unlockedColor:    String(texts['Unlocked Color']) || 'rgba(0,0,0,0)',
		selectorColor:    String(texts['Selector Color']) || 'rgba(0,0,0,0)',
		gaugeColor1:      String(texts['Gauge Color 1']) || 'rgba(0,0,0,0)',
		gaugeColor2:      String(texts['Gauge Color 2']) || 'rgba(0,0,0,0)'
	}
}
SMO.AM.getTexts();

//Default Icons
SMO.AM.Icons = {
	locked:       SMO.getParams['Locked Icon'] ? Number(SMO.getParams['Locked Icon']) : -1,
	unlocked:     SMO.getParams['Unlocked Icon'] ? Number(SMO.getParams['Unlocked Icon']) : -1,
	secret:       SMO.getParams['Secret Icon'] ? Number(SMO.getParams['Secret Icon']) : -1,
	gold:         SMO.getParams['Gold Icon'] ? Number(SMO.getParams['Gold Icon']) : -1,
	recentUnlock: SMO.getParams['Recent Unlock'] ? Number(SMO.getParams['Recent Unlock']) : -1
};

//Menu Command
SMO.AM.MenuCommand = {
	active:   SMO.getParams['Menu Command'] === 'true' ? true : false,
	switchId: Number(SMO.getParams['Show Command Switch']),
	position: Number(SMO.getParams['Command Position'])
};

//Refresh categories if any of them have a custom img
SMO.AM._categoryRefreshed = true;

//Images to be loaded before opening the achievements menu
SMO.AM.achievsBackgrounds = [];

if (SMO.AM.lockedBackground){
	SMO.AM.achievsBackgrounds.push(SMO.AM.lockedBackground);
}

if (SMO.AM.secretBackground){
	SMO.AM.achievsBackgrounds.push(SMO.AM.secretBackground);
}

SMO.AM.categories = [];
SMO.AM.getCategories = function(){
	var data, image, needUpdate;
	var cat = SMO.getParams['Categories And Trophies'] ? JSON.parse(SMO.getParams['Categories And Trophies']) : [];
	SMO.AM.Categories = [];
	cat.forEach(function(c){
		data = JSON.parse(c);
		SMO.AM.Categories.push({
			img: data['Cat Background'],
			name: data['Category Name'],
			Trophy: {
				img: data['Image'] || data['Trophy Image'],
				description: data['Trophy Description'] ? JSON.parse(data['Trophy Description']) : '',
				hidden: data['Hide Trophy'] === 'true' ? true : false,
				onUnlock: data['On Unlock'] ? JSON.parse(data['On Unlock']) : ''
			}
		});

		//Adding the category's image to the load list
		image = SMO.AM.Categories.last().img;
		if (image){
			SMO.AM.achievsBackgrounds.delete(image);
			SMO.AM.achievsBackgrounds.push(image);
			SMO.AM._categoryRefreshed = false;
		}

		//Adding the trophy's image to the load list
		image = SMO.AM.Categories.last().Trophy.img;
		if (image){
			SMO.AM.achievsBackgrounds.delete(image);
			SMO.AM.achievsBackgrounds.push(image);
		}
		SMO.AM.categories.push(data['Category Name']);
	});
}
SMO.AM.getCategories();
if (SMO.AM.Categories.length > 99){
	SMO.AM.Categories.splice(99, SMO.AM.Categories.length - 99);
	SMO.AM.categories.splice(99, SMO.AM.categories.length - 99);
	console.warn('The categories are hard capped at 99 members. Extra categories removed.');
}
if (SMO.AM.categories.contains('none')){
	SMO.AM.categories.deleteAll('none');
	console.warn('The category name "none" is reserved, please try giving it another name.');
}

//Sort Options
SMO.AM.Sort = {
	options: SMO.getParams['Sort Options'] ? JSON.parse(SMO.getParams['Sort Options']) : [],
	cellHeight: Number(SMO.getParams['Cell Height']),
	x: Number(SMO.getParams['Sort X']),
	y: Number(SMO.getParams['Sort Y']),
	width: Number(SMO.getParams['Sort Width'])	
}
SMO.AM.Sort.enabled = SMO.AM.Sort.options.length > 0 ? true : false;
SMO.AM.getSortOptions = function(){
	this.Sort.options = [];
	var options = SMO.getParams['Sort Options'] ? JSON.parse(SMO.getParams['Sort Options']) : [];
	var option;
	options.forEach(function(o){
		option = JSON.parse(o);
		SMO.AM.Sort.options.push({
			symbol: option.Symbol,
			script: option.Script ? JSON.parse(option.Script) : ''
		})
	})
}
SMO.AM.getSortOptions();

//Test Window - the window used to measure texts for sprites
//Check SMO.AM.textWidthEx
SMO.AM.TestWindow = null;
//===============================================================================================
// Achievement Data Object
//===============================================================================================
function Achievement_Data (){
	this.initialize.apply(this, arguments);
}

Achievement_Data.prototype = Object.create(null);
Achievement_Data.prototype.constructor = Achievement_Data;

Achievement_Data.prototype.initialize = function(id, data){
	this.id = id;
	this.setupRequirements(data);
	this.setupRewards(data);
	this.category = data['Category'];
	this.icon = {};
	this.icon.locked = data['Locked Icon'] ? Number(data['Locked Icon']) : -2;
	this.icon.unlocked = data['Unlocked Icon'] ? Number(data['Unlocked Icon']) : -2;
	this.icon.secret = data['Secret Icon'] ? Number(data['Secret Icon']) : -2;
	this.backgroundImage = data['Background Image'];
	this.popUpImage = data['Pop Up Image'] || '';
	this.setupVisibility(data['Visibility']);
	this.Name = data.Name;
	this.name = this.visibility === 'secret' ? SMO.AM.Texts.secretSign : this.Name;
	this.Description = data['Description'] ? JSON.parse(data['Description']) : '';
	this.description = this.visibility === 'secret' ? SMO.AM.Texts.secretSign : this.Description;
	if (this.backgroundImage){
		SMO.AM.achievsBackgrounds.delete(this.backgroundImage);
		SMO.AM.achievsBackgrounds.push(this.backgroundImage);
	}
	this._isAchievement = true;
}

Achievement_Data.prototype.setupRequirements = function(data){
	this.requirements = [];
	var req, type, itemId, comparison, value;
	var requirements = data['Requirements'] ? JSON.parse(data['Requirements']) : null;
	var isPlaytime = false;
	if (requirements){
		requirements.forEach(function(r){
			req = JSON.parse(r);
			type = req.Type.toLowerCase();
			itemId = Number(req['Item ID']);
			comparison = this.getProperComparison(req.Comparison);
			value = req.Value ? Number(req.Value) : Number(req['Required Value']);
			alias = String(req.Alias);
			aliasIcon = req['Alias Icon'] ? Number(req['Alias Icon']) : -1;
			currentValue = req['Current Value'] ? JSON.parse(req['Current Value']) : '';
			finalValue = req['Final Value'] ? JSON.parse(req['Final Value']) : '';
			this.requirements.push({
				type: type, 
				itemId: itemId, 
				comparison: comparison, 
				value: value,
				alias: alias,
				aliasIcon: aliasIcon,
				currentValue: currentValue,
				finalValue: finalValue
			});
			if (type === 'playtime'){
				isPlaytime = true;
			}
		}, this);
		this._playtimeRequired = isPlaytime;
	}
}

Achievement_Data.prototype.getProperComparison = function(sign){
	switch (sign){
	case '=':
		return '===';
	case '>':
		return '>';
	case '≥':
		return '>=';
	case '<':
		return '<';
	case '≤':
		return '<=';
	case '≠':
		return '!=';
	}
}

Achievement_Data.prototype.isPlaytimeRequired = function(){
	return this._playtimeRequired && !this.isUnlocked();
}

Achievement_Data.prototype.setupRewards = function(data){
	this.rewards = [];
	var rew, type, itemId, amount;
	var rewards = data['Rewards'] ? JSON.parse(data['Rewards']) : null;
	if (rewards){
		rewards.forEach(function(r){
			rew = JSON.parse(r);
			type = rew.Type.toLowerCase();
			itemId = Number(rew['Item ID']);
			amount = Number(rew.Amount);
			advanced = rew.Advanced ? JSON.parse(rew.Advanced) : '';
			alias = rew.Alias;
			aliasIcon = rew['Alias Icon'] ? Number(rew['Alias Icon']) : -1;
			this.rewards.push({ 
				type: type,
				itemId: itemId,
				amount: amount,
				advanced: advanced,
				alias: alias,
				aliasIcon: aliasIcon
			});
		}, this);
	}
}

Achievement_Data.prototype.setupVisibility = function(vData){
	this.visibility = vData === 'Visible from start' ? 'visible' : vData.toLowerCase();
}

Achievement_Data.prototype.unlock = function(){
	var scene = SceneManager._scene;
	SMO.AM.unlockAchievement(this.id);
	if ($gameSystem.achievPopUp.queue.length === 1){
		scene._achievementPopUp.show();
	}
	Window_Achievements.prototype.refreshUnlockedTrophies.call(this, true);
	if (scene instanceof Scene_Achievements){
		scene.refreshAll();
	}
}

Achievement_Data.prototype.lock = function(){
	var index = SMO.AM.Achievements().achievs.unlocked.indexOf(this.id);
	if (index > -1){
		var achievs = SMO.AM.Achievements().achievs;
		achievs.recentUnlock.delete(this.id);
		achievs.locked.push(this.id);
		achievs.unlockDate.splice(index, 1);
		achievs.unlocked.delete(this.id);
		var PopUp = SceneManager._scene._achievementPopUp;
		if (PopUp){
			var popUpIndex = PopUp._queue.indexOf(this.id);
			if (popUpIndex != 0){
				$gameSystem.achievPopUp.queue.delete(this.id);
				PopUp._queue.delete(this.id);
			}
		}
		if (SMO.AM.isGlobalRange){
			SMO.AM.saveGlobalAchievements();
		}
		var scene = SceneManager._scene;
		if (scene instanceof Scene_Achievements){
			scene.refreshAll();
		}
	}
}

Achievement_Data.prototype.gainRewards = function(){
	var reward, itemId, amount, r;
	for (r = 0; r < this.rewards.length; r++){
		reward = this.rewards[r];
		itemId = reward.itemId;
		amount = reward.amount;
		switch (reward.type){
		case 'custom(advanced)':
			//Nothing to see here, keep scrolling
			break;
		case 'gold':
			$gameParty.gainGold(amount);
			break;
		case 'item':
			$gameParty.gainItem($dataItems[itemId], amount);
			break;
		case 'weapon':
			$gameParty.gainItem($dataWeapons[itemId], amount);
			break;
		case 'armor':
			$gameParty.gainItem($dataArmors[itemId], amount);
			break;
		}
		if (reward.advanced){
			try {
				eval(reward.advanced);
			} catch(e){
				console.error('Error on Advanced Reward! (Achievement: '+this.name+' (ID '+this.id+'))');
				console.error(e);
			}
		}
	}
}

Achievement_Data.prototype.isUnlocked = function(){
	return SMO.AM.Achievements().achievs.unlocked.contains(this.id);
}

Achievement_Data.prototype.isHidden = function(){
	return this.visibility === 'hidden' && !this.isUnlocked();
}

Achievement_Data.prototype.isSecret = function(){
	return this.visibility === 'secret' && !this.isUnlocked();
}

Achievement_Data.prototype.getUnlockDateString = function(){
	var str = '';
	if (this.isUnlocked()){
		var index = SMO.AM.Achievements().achievs.unlocked.indexOf(this.id);
		var date = SMO.AM.Achievements().achievs.unlockDate[index];
		str = SMO.AM.Texts.unlockedOn;
		for (var d in date){
			var regex = new RegExp('<' + d.toLowerCase() + '>', "i");
			str = str.replace(regex, date[d]);
		}
	}
	return str;
}

Achievement_Data.prototype.getUnlockDateNow = function(){
	var value = null;
	if (this.isUnlocked()){
		var index = SMO.AM.Achievements().achievs.unlocked.indexOf(this.id);
		var value = SMO.AM.Achievements().achievs.unlockDate[index].now;
	}
	return value;
}

Achievement_Data.prototype.isMyBackgroundReady = function(){
	if (this.backgroundImage) {
		var bitmap = ImageManager.loadAchievement(this.backgroundImage);
		return bitmap.isReady();
	}
	return true;
}

Achievement_Data.prototype.isMyPopUpReady = function(){
	if (this.popUpImage) {
		var bitmap = ImageManager.loadAchievement(this.popUpImage);
		return bitmap.isReady();
	}
	return this.isMyBackgroundReady();
}

//===============================================================================================
// Other Parameters
//===============================================================================================
//Get all achievements' data
SMO.AM.getData = function(){
	SMO.AM.Data = [];
	var achievsData = JSON.parse(SMO.getParams['Achievements Data']);
	var singularData, id;
	var rejected = 0;
	for (var d = 0; d < achievsData.length; d++){
		if (achievsData[d][0] === '{'){
			singularData = JSON.parse(achievsData[d]);
			id = d + 1 - rejected;
			SMO.AM.Data.push(new Achievement_Data(id, singularData));
		} else {
			rejected++;
		}
	}
};
SMO.AM.getData();

SMO.AM.toUnlock = [];
SMO.AM.toDelete = [];
SMO.AM.currentCategory = 'none';
SMO.AM.FrameCount = {
	lastValue:0,
	value:0
};

SMO.AM.playtime = function(){
	if (this.isGlobalRange){
		return Math.floor(this.FrameCount.value / 60);
	} else {
		return $gameSystem.playtime();
	}
}

//Comparing 2 achievs to see which one was unlocked first
SMO.AM.compareAchievsDates = function(achiev1, achiev2){
	var v1 = achiev1.getUnlockDateNow();
	var v2 = achiev2.getUnlockDateNow();
	if (!v1 || !v2) return 0;
	if (v1 === v2) return 0;

	return v1 < v2 ? 1 : -1;
}

SMO.AM.uniteArrayWithStrings = function(array, between){
	var union = '';
	if (Object.prototype.toString.call(array) === '[object Array]'){
		for (var a = 0; a < array.length; a++){
			union += array[a];
			if (between && a + 1 < array.length){
				union += between;
			}
		}
	}
	return union;
}

SMO.getTextColor = function(n) {;
	var bitmap = new Bitmap(1,1);
	bitmap = ImageManager.loadSystem('Window');
	var px = 96 + (n % 8) * 12 + 6;
	var py = 144 + Math.floor(n / 8) * 12 + 6;
	return bitmap.getPixel(px, py);
}

SMO.getDate = function(){
	var arr = new Date().toString().split(' ');

	var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'September', 
		'October', 'November', 'December'];
	var month = new Date().getMonth();
	var monthName = months[month++];
	month = month < 10 ? '0' + month : String(month);

	var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	var today = days[new Date().getDay()];
	var dayA = arr[2].length < 2 ? '0' + arr[2] : arr[2];

	var hours = arr[4].split(':');
	var hourA = hours[0].length < 2 ? '0' + hours[0] : hours[0]; 
	var hourB = Math.max(0, Number(hours[0]) - 12);
	var hourB = hourB < 10 ? '0' + hourB : String(hourB);
	var phase = Number(hours[0]) >= 12 ? 'PM' : 'AM';
	var min = hours[1].length < 2 ? '0' + hours[1] : hours[1];
	var sec = hours[2].length < 2 ? '0' + hours[2] : hours[2];

	var Data = {
		hour:   hourA,
		hourA:  hourA,       //hour (24h)
		hourB:  hourB,       //hour (AM/PM)
		phase:  phase,       //AM or PM
		min:    min,         //min
		sec:    sec,         //sec
		day:    dayA,
		dayA:   dayA,        //day (number)
		dayB:   today,       //day of the week
		dayC:   arr[0],      //day of the week (ab)
		month:  month,
		monthA: month,       //month (number)
		monthB: monthName,   //month name
		monthC: arr[1],      //month name (ab)
		year:   arr[3],      //number
		now:    Date.now()   //date now
	};
	Data.date = dayA + '/' + month + '/' + arr[3];
	Data.time = hourA + ':' + min + ':' + sec;
	return Data;
}

SMO.AM.textStateHeight = function(textState, fontSize, all){
	if (!this.TestWindow){
		this.TestWindow = new Window_Base();
		this.TestWindow.resetFontSettings = function() {};
	}
	fontSize = fontSize || 28;
	this.TestWindow.contents.fontSize = fontSize;

	return this.TestWindow.calcTextHeight(textState, all);
}

SMO.AM.textWidthEx = function (text, fontSize, easy, fontRate, keepFont) {
	if (!text) return 0;
	if (Object.prototype.toString.call(text) === '[object Number]'){
		text = text.toString();
	} else if (Object.prototype.toString.call(text) !== '[object String]') {
		return 0;
	}

	if (!this.TestWindow){
		this.TestWindow = new Window_Base();
		this.TestWindow.resetFontSettings = function() {};
	}

	fontRate = fontRate > 0 ? fontRate : 12;
	this.TestWindow.makeFontBigger = function(){
		if (this.contents.fontSize <= 96) {
			this.contents.fontSize += fontRate;
		}
	}
	this.TestWindow.makeFontSmaller = function(){
		if (this.contents.fontSize >= 24) {
			this.contents.fontSize -= fontRate;
		}
	}
	if (!keepFont){
		this.TestWindow.contents.fontSize = fontSize > 4 ? fontSize : 28;
	}

	if (easy){ // for simple texts
		return Math.ceil(this.TestWindow.textWidth(text));
	} else {   // for texts using codes (E.G: \c[x])
		var lines = text.split('\n');
		var textWidth = this.TestWindow.textWidthEx(lines[0]);
		for (var i = 1; i < lines.length; i++) {
			if (this.TestWindow.textWidthEx(lines[i]) > textWidth) {
				textWidth = this.TestWindow.textWidthEx(lines[i]);
			}
		}
		return Math.ceil(textWidth);
	}
}

SMO.AM.removeTextCodes = function(text){
	if (text){
		text = text.replace(/\\v\[.?.?.?.?\]/gi, '');
		text = text.replace(/\\n\[.?.?.?.?\]/gi, '');
		text = text.replace(/\\p\[.?.?.?.?\]/gi, '');
		text = text.replace(/\\g/gi, '');
		text = text.replace(/\\c\[.?.?\]/gi, '');
		text = text.replace(/\\i\[.?.?.?.?\]/gi, '');
		text = text.replace(/\\{/g, '');
		text = text.replace(/\\}/g, '');
	}
	return text;
}

SMO.AM.wrapText = function(text, maxWidth, fontSize, easy){
	var newText = [];
	if (text && maxWidth > 0){
		var line, lineWidth, newLineWidth, unitedTxt;
		var lines = text.split('\n');
		var remaining = '';
		for (var l = 0; l < lines.length || remaining != ''; l++){
			line = lines[l] ? remaining + lines[l] : remaining;
			lineWidth = SMO.AM.textWidthEx(line, fontSize, easy);
			if (lineWidth > maxWidth){
				newLineWidth = lineWidth;
				newLine = line.split(' ');
				remaining = '';
				while (newLineWidth > maxWidth){
					if (newLine.length > 1){
						remaining = newLine.last() + ' ' + remaining;
						newLine.splice(newLine.length - 1, 1);
						unitedTxt = SMO.AM.uniteArrayWithStrings(newLine, ' ');
						newLineWidth = SMO.AM.textWidthEx(unitedTxt, fontSize, easy);
					} else {
						newLineWidth = 0;
						remaining = '';
					}
				}
				newLine = SMO.AM.uniteArrayWithStrings(newLine, ' ');
			} else {
				remaining = '';
				newLine = line;
			}
			newText.push(newLine);
		}
		newText = SMO.AM.uniteArrayWithStrings(newText, '\n');
	}
	return newText;
}

SMO.AM.setupAchievements = function(){
	var d, extras;
	var changed = false;
	var all = this.achievs.locked.length + this.achievs.unlocked.length;
	if (SMO.AM.Data.length != all){
		changed = true;
		extras = SMO.AM.Data.length - all;
		if (extras > 0){//data added
			for (d = all; d < SMO.AM.Data.length; d++){
				this.achievs.locked.push(d + 1);
			}
		} else {//data removed
			for (d = all; d > SMO.AM.Data.length; d--){
				this.achievs.locked.delete(d);
				this.achievs.unlocked.delete(d);
				this.achievs.unlockDate.delete(d - 1);
				this.achievs.recentUnlock.delete(d);
			}
		}
	}
	all = this.trophies.locked.length + this.trophies.unlocked.length;
	if (SMO.AM.Categories.length != all){
		changed = true;
		extras = SMO.AM.Categories.length - all;
		if (extras > 0){//trophies added
			for (d = all; d < SMO.AM.Categories.length; d++){
				this.trophies.locked.push(d + 1);
			}
		} else {//trophies removed
			for (d = all; d > SMO.AM.length; d--){
				this.trophies.locked.delete(d - 1);
				this.trophies.unlocked.delete(d - 1);
			}
		}
	}
	Window_Achievements.prototype.refreshUnlockedTrophies.call(this, changed);
}

if (SMO.AM.isGlobalRange){
//-----------------------------------------------------------------------------------------------
// Global Achievements
// Saving global achievements does not work on browser.
// The browser does not support the require() function

SMO.AM.GlobalAchievements = {
	achievs: {
		locked:[],
		unlocked:[],
		recentUnlock:[],
		unlockDate:[]
	},
	trophies: {
		locked:[],
		unlocked:[]
	}
};

SMO.AM.saveGlobalAchievements = function() {
	var achievs = JSON.stringify(SMO.AM.GlobalAchievements);
	var fs, path;
	fs = require('fs');
	path = 'data/Achievements.json';
	if (fs.existsSync(path)) {
		achievs = btoa(achievs);
		achievs = 'S' + achievs;
		fs.writeFileSync(path, achievs);
	}
}

SMO.AM.getGlobalAchievements = function(text){
	if (text){
		text = text.replace('S', '');
		text = atob(text);
		this.GlobalAchievements = JSON.parse(text);
	} else {
		this.saveGlobalAchievements();
	}
	SMO.AM.setupAchievements.call(SMO.AM.GlobalAchievements);
}

SMO.AM.loadGlobalAchievements = function() {
	var path = 'data/Achievements.json';
	var request = new XMLHttpRequest();
	request.open("GET", path);
	request.overrideMimeType('application/json');
	request.onload = function() {
		if (request.status < 400) {
			SMO.AM.getGlobalAchievements(request.responseText);
		}
	};
	request.send();
};
SMO.AM.loadGlobalAchievements();

}//SMO.AM.isGlobalRange

//-----------------------------------------------------------------------------------------------
// Commands

SMO.AM.Achievements = function(){
	if (this.isGlobalRange){
		return this.GlobalAchievements;
	} else {
		return $gameSystem;
	}
}

//Opening the new scene
SMO.AM.showAchievements = function(category){
	if (category != undefined && SMO.AM.categories.contains(category)){
		SMO.AM.currentCategory = category;
	}
	SceneManager.push(Scene_Achievements);
}

//Refresh all achievements
SMO.AM.refreshAchievements = function(){
	if ($gamePlayer && $gamePlayer._transferring){
		return;
	}

	var scene = SceneManager._scene;

	//creating the game system obj
	if (!$gameSystem.achievs){
		$gameSystem.setupAchievs();		
	}

	//check locked achievements
	for (d = 0; d < SMO.AM.Achievements().achievs.locked.length; d++){
		SMO.AM.tryUnlockingAchievement(SMO.AM.Achievements().achievs.locked[d])
	}

	if (SMO.AM.toDelete.length > 0){
		SMO.AM.toDelete.forEach(function(d){
			SMO.AM.Data.delete(d);
		});
		SMO.AM.toDelete = [];
	}

	var isUnlock = SMO.AM.toUnlock.length > 0;
	if (isUnlock){
		SMO.AM.toUnlock.forEach(function(a){
			SMO.AM.unlockAchievement(a);
		});

		if (scene._goldWindow && scene._goldWindow.refresh){
			scene._goldWindow.refresh();
		}

		Window_Achievements.prototype.refreshUnlockedTrophies.call(this, true);
		if (scene._itemWindow){
			if (scene._trophiesWindow && scene._trophiesWindow.visible){
				scene._trophiesWindow.refresh();
			} else if (scene._itemWindow.refresh) {
				scene._itemWindow.refresh();
			}
		}

		if (scene._achievementPopUp && !scene._achievementPopUp._isBusy){
			scene._achievementPopUp.show();
		}
	}
	SMO.AM.toUnlock = [];

	if (scene instanceof Scene_Achievements){
		scene.refreshMin(isUnlock);
	}
}

//Unlock achievements if it's requirements are met
SMO.AM.tryUnlockingAchievement = function(achievId){
	var requirements, achievement;
	achievement = this.Data[achievId - 1];
	if (achievement){

		//Check requirements
		if (achievement.requirements){
			requirements = this.evalRequirements(achievement);
		} else {
			requirements = true;
		}

		//Unlock it
		if (requirements){
			SMO.AM.toUnlock.push(achievId);
			return true;
		}
	}
	return false;
}

//Force unlock achievement
SMO.AM.unlockAchievement = function(id){
	var isNumber, achievement, achievementId, unlockScript, name, id;
	isNumber = Number(id);
	if (isNumber){
		achievement = SMO.AM.Data[id - 1];
		if (achievement && !achievement.isUnlocked()){
			//Unlocked for the first time
			SMO.AM.Achievements().achievs.locked.delete(isNumber);
			SMO.AM.Achievements().achievs.unlocked.push(isNumber);
			this.addNewUnlockedDate();
			SMO.AM.Achievements().achievs.recentUnlock.push(isNumber);
			$gameSystem.achievPopUp.queue.push(isNumber);

			achievement.gainRewards();

			if (this.onUnlockScript){
				try{
					eval(this.onUnlockScript);
				} catch(e){
					this.onUnlockScript = '';
					console.error('There\'s an error on your "On Unlock" script.')
					console.error(e);
				}
			}
		}
	} else {
		achievementId = this.findAchievementByName(id);
		if (achievementId > 0){
			return this.unlockAchievement(achievementId);
		}
	}
}

SMO.AM.resetAchievementsData = function(){
	var index, achievs;
	SMO.AM.Achievements().achievs = {
		recentUnlock: [],
		unlockDate: [],
		unlocked: [],
		sortType: 0,
		locked: []
	}

	SMO.AM.Achievements().trophies = {
		unlocked: [],
		locked: []
	}
	
	this.Data.forEach(function(d){
		SMO.AM.Achievements().achievs.locked.push(d.id);
	})

	for (var c = 0; c < this.categories.length; c++){
		SMO.AM.Achievements().trophies.locked.push(c + 1);
	}

	if (this.isGlobalRange){
		this.saveGlobalAchievements();
	}

	if (SceneManager._scene instanceof Scene_Achievements){
		SceneManager._scene.refreshAll();
	}
}

SMO.AM.addNewUnlockedDate = function(){
	var Data = SMO.getDate();
	SMO.AM.Achievements().achievs.unlockDate.push(Data);	
}

SMO.AM.evalRequirements = function(achievement){
	var r, requirements;
	requirements = achievement.requirements;
	if (requirements){
		for (r = 0; r < requirements.length; r++){
			if (!this.getRequirementValues(requirements[r], achievement).state){
				return false;
			};			
		}
	}
	return true;
}

SMO.AM.getRequirementValues = function(requirement, achievement){
	var itemId, iconIndex, comparison, currentValue, finalValue, name, condition;
	itemId = requirement.itemId;
	comparison = requirement.comparison;
	value = requirement.value;

	switch(requirement.type){
	case 'custom(advanced)':
		name = 'Custom';
		try {
			currentValue = eval(requirement.currentValue);
			finalValue = requirement.finalValue ? eval(requirement.finalValue) : value;
		} catch(e){
			currentValue = 0;
			finalValue = 1;
			console.error('Error on Advanced Requirement! (Achievement: '+achievement.Name+' (ID: '+achievement.id+'))');
			console.error(e);
		}
		break;
	case 'switch':
		name = $dataSystem ? $dataSystem.switches[itemId] : '';
		currentValue = $gameSwitches.value(itemId);
		finalValue = true;
		break;
	case 'variable':
		name = $dataSystem ? $dataSystem.variables[itemId] : '';
		currentValue = $gameVariables.value(itemId);
		finalValue = value;
		break
	case 'item':
		name = $dataItems[itemId] ? $dataItems[itemId].name : 'Item ' + itemId;
		iconIndex = $dataItems[itemId] ? $dataItems[itemId].iconIndex : -1;
		currentValue = $gameParty.numItems($dataItems[itemId]);
		finalValue = value;
		break;
	case 'weapon':
		name = $dataWeapons[itemId] ? $dataWeapons[itemId].name : 'Weapon ' + itemId;
		iconIndex = $dataWeapons[itemId] ? $dataWeapons[itemId].iconIndex : -1;
		currentValue = $gameParty.numItems($dataWeapons[itemId]);
		finalValue = value;
		break;
	case 'armor':
		name = $dataArmors[itemId] ? $dataArmors[itemId].name : 'Armor ' + itemId;
		iconIndex = $dataArmors[itemId] ? $dataArmors[itemId].iconIndex : -1;
		currentValue = $gameParty.numItems($dataArmors[itemId]);
		finalValue = value;
		break;
	case 'gold':
		name = 'Gold';		
		currentValue = $gameParty.gold();
		finalValue = value;
		break;
	case 'steps':
		name = 'Steps';
		currentValue = $gameParty.steps();
		finalValue = value;
		break;
	case 'playtime':
		name = 'Playtime';
		currentValue = SMO.AM.playtime();
		finalValue = value;
		break;
	case 'save count':
		name = 'Save Count';
		currentValue = $gameSystem.saveCount();
		finalValue = value;
		break;
	case 'battle count':
		name = 'Battle Count';
		currentValue = $gameSystem.battleCount();
		finalValue = value;
		break;
	case 'win count':
		name = 'Win Count';
		currentValue = $gameSystem.winCount();
		finalValue = value;
		break;
	case 'escape count':
		name = 'Escape Count';
		currentValue = $gameSystem.escapeCount();
		finalValue = value;
		break;
	case 'party member':
		name = $gameActors.actor(itemId) ? $gameActors.actor(itemId).name() : 'Actor ' + itemId;
		currentValue = $gameParty.members().contains($gameActors.actor(itemId));
		finalValue = true;
		break;
	case 'party level':
		name = 'Party Level';
		currentValue = 0;
		if ($gameParty && $gameParty.members().length > 0){
			$gameParty.members().forEach(function(pm){
				currentValue += pm.level;
			});
			currentValue = Math.floor(currentValue/$gameParty.members().length);
		}
		finalValue = value;
		break;
	case 'party size':
		name = 'Party Size';
		currentValue = $gameParty.members().length;
		finalValue = value;
		break;
	}
	iconIndex = iconIndex || -1;
	condition = currentValue + comparison + finalValue;
	condition = eval(condition);
	return {name:name, currentValue:currentValue, finalValue:finalValue, state:condition, iconIndex:iconIndex};
}

//Find achievement by name
SMO.AM.findAchievementByName = function(name){
	for (var a = 0; a < this.Data.length; a++){
		if (this.Data[a].Name === name){
			return a + 1;
		}
	}
	return 0;
}

//Get all the achievements on a specific category
SMO.AM.getAchievsByCategory = function(category){
	var achievements;
	if (this.categories.length > 0){
		achievements = SMO.AM.Data.filter(function(d){
			return d && (d.category.split(',').contains(category));
		});
	}
	return achievements || SMO.AM.Data;
}

//===============================================================================================
// Creating/updating data
//===============================================================================================
SMO.AM._DataManager_setupNewGame = DataManager.setupNewGame;
DataManager.setupNewGame = function(){
	SMO.AM._DataManager_setupNewGame.call(this);
	$gameSystem.setupAchievs();
	if (SMO.AM.isGlobalRewards){
		SMO.AM.Achievements().achievs.unlocked.forEach(function(a){
			$gameSystem.achievement(a).gainRewards();
		});
	}
	SMO.AM.FrameCount.lastValue = 0;
}

SMO.AM._SceneLoad_reloadMapIfUpdated = Scene_Load.prototype.reloadMapIfUpdated;
Scene_Load.prototype.reloadMapIfUpdated = function(){
	SMO.AM._SceneLoad_reloadMapIfUpdated.call(this);
	if ($gameSystem.versionId() !== $dataSystem.versionId){
		$gameSystem.setupAchievs();
	}
}

//===============================================================================================
// Game Player
// Refreshing achievements after transfer
//===============================================================================================
SMO.AM._GamePlayer_clearTransferInfo = Game_Player.prototype.clearTransferInfo;
Game_Player.prototype.clearTransferInfo = function(){
	SMO.AM._GamePlayer_clearTransferInfo.call(this);
	SceneManager._scene._achieveCounter = 0;
	SMO.AM.refreshAchievements();
}

//===============================================================================================
// Game System
//===============================================================================================
Game_System.prototype.setupAchievs = function(){
	if (this.achievs){
		if (!SMO.AM.isGlobalRange){
			SMO.AM.setupAchievements.call(this);
		}
		if (SMO.AM.Sort.enabled){
			if (!SMO.AM.Sort.options[this.achievs.sortType]){
				this.achievs.sortType = 0;
			}
		}
	} else {
		this.achievs = {
			locked:[],
			unlocked:[],
			recentUnlock:[],
			unlockDate:[],
			sortType:0
		};
		this.achievPopUp = {
			opacity:0,
			isFading:false,
			isShowing:false,
			fadeRate:0,
			fadeLimit:0,
			timer:0,
			queue:[]
		};
		this.trophies = {
			locked:[],
			unlocked:[]
		}
		this.setupAchievs();
	}
}

//The achievementId may be a number or the achievement name
Game_System.prototype.achievement = function(achievementId){
	if (Number(achievementId)){
		return SMO.AM.Data[achievementId - 1] || null;
	} else {
		achievementId = SMO.AM.findAchievementByName(achievementId);
		if (achievementId > 0){
			return SMO.AM.Data[achievementId - 1] || null;
		}
	}
	return null;
}

//The trophyId may be a number or the trophy name
Game_System.prototype.isTrophyUnlocked = function(trophyId){
	var id = Number(trophyId);
	if (id){
		return SMO.AM.Achievements().trophies.unlocked.contains(trophyId);
	} else {
		var trophyIndex = SMO.AM.categories.indexOf(trophyId);
		if (trophyIndex > -1){
			return this.isTrophyUnlocked(trophyIndex + 1)
		}
	}
	return false;
}

Game_System.prototype.unlockedAchievsCount = function(){
	return SMO.AM.Achievements().achievs.unlocked.length;
}

Game_System.prototype.lockedAchievsCount = function(){
	return SMO.AM.Achievements().achievs.locked.length;
}

//===============================================================================================
// Window Base
//===============================================================================================
Window_Base.prototype.textWidthEx = function(text) {
   	return this.drawTextEx(text, 0, this.contents.height);
};

Window_Base.prototype.drawRectS = function(x, y, width, height, borderSize, borderColor, backColor, backImg){
	this.contents.drawRectS(x, y, width, height, borderSize, borderColor, backColor, backImg);
}

//===============================================================================================
// Scene Base
//===============================================================================================
SMO.AM._SceneBase_update = Scene_Base.prototype.update;
Scene_Base.prototype.update = function(){
	SMO.AM._SceneBase_update.call(this);
	this.updateAchievements();
	this.updateFrameS();
}

Scene_Base.prototype.updateFrameS = function(){
	if (!SMO.AM.isGlobalRange) return;
	if (SMO.AM.FrameCount.lastValue !== Graphics.frameCount){
		SMO.AM.FrameCount.value += Graphics.frameCount - SMO.AM.FrameCount.lastValue;
		SMO.AM.FrameCount.lastValue = Graphics.frameCount;
	}
}

Scene_Base.prototype.updateAchievements = function(){
	if (this instanceof Scene_Boot) return;
	if (this instanceof Scene_Title && !SMO.AM.isGlobalRange) return;

	if (SMO.AM.PopUp.state && !this._achievementPopUp){
		this.createAchievementsPopUp();
	}

	if (SMO.AM.autoRefresh){
		this._achieveCounter = this._achieveCounter || 0;
		this._achieveCounter++;
		if (this._achieveCounter >= SMO.AM.updateInterval){
			SMO.AM.refreshAchievements();
			this._achieveCounter = 0;
		}
	}
}

Scene_Base.prototype.createAchievementsPopUp = function(){
	this._achievementPopUp = new Achievement_PopUp();
	this.addChild(this._achievementPopUp);
}

//===============================================================================================
// Image Manager
//===============================================================================================
ImageManager.loadAchievement = function(filename, hue) {
	return this.loadBitmap('img/achievements/', filename, hue, true);
};

ImageManager.isAchievementsReady = function(){
	var bitmap;
	for (var b = 0; b < SMO.AM.achievsBackgrounds.length; b++){
		bitmap = ImageManager.loadAchievement(SMO.AM.achievsBackgrounds[b]);
		if (!bitmap.isReady()) return false;
	}
	return true;
}

//===============================================================================================
// Scene Manager
//===============================================================================================
SMO.AM._SceneManager_snapForBackground = SceneManager.snapForBackground;
SceneManager.snapForBackground = function() {
	var scene = this._scene;
	if (scene._achievementPopUp){
		scene._achievementPopUp.opacity = 0;
	}
	SMO.AM._SceneManager_snapForBackground.call(this);
};

//===============================================================================================
// Achievement Pop Up - Sprite
// This sprite is created on all scenes except for the Scene_Boot
//===============================================================================================
function Achievement_PopUp (){
	this.initialize.apply(this, arguments);
}

Achievement_PopUp.prototype = Object.create(Sprite_Button.prototype);
Achievement_PopUp.prototype.constructor = Achievement_PopUp;

Achievement_PopUp.prototype.initialize = function(){
	Sprite_Button.prototype.initialize.call(this);
	try {
		var width = eval(SMO.AM.PopUp.width);
		var height = eval(SMO.AM.PopUp.height);
	} catch(e){
		var width = 140;
		var height = 106;
		console.error('There\'s an error on your Pop Up (Width or Heigth) equation.');
		console.error(e);
	}
	var PopUp = {
		width:width,
		height:height
	}
	try {
		this.x = eval(SMO.AM.PopUp.x);
		this.y = eval(SMO.AM.PopUp.y);
	} catch(e){
		this.x = 0;
		this.y = 0;
		console.error('There\'s an error on your Pop Up (X or Y) equation.');
		console.error(e);
	}
	this.bitmap = new Bitmap(width, height);
	this.bitmap.fontSize = this.standardFontSize();
	this._timerX = 180;
	$gameSystem.achievPopUp = $gameSystem.achievPopUp || {};
	this.opacity = $gameSystem.achievPopUp.opacity || 0;
	this._fadeRate = $gameSystem.achievPopUp.fadeRate || 0;
	this._fadeLimit = $gameSystem.achievPopUp.fadeLimit || 0;
	this._isFading = $gameSystem.achievPopUp.isFading || false;
	this._isShowing = $gameSystem.achievPopUp.isShowing || false;
	this._timer = $gameSystem.achievPopUp.timer || 0;
	this._queue = $gameSystem.achievPopUp.queue || [];
	this._isBusy = this._queue.length > 0;
	this.drawAchievementPopUp();
	if (SMO.AM.PopUp.button){
		this.setClickHandler(this.onClick.bind(this));
	}
}

Achievement_PopUp.prototype.onClick = function(){
	if (this.opacity > 0){
		if (SceneManager._scene instanceof Scene_Title) return;
		if (SceneManager._scene instanceof Scene_Achievements) return;
		if (Imported.AlphaABS && uAPI.isBattle) {
			AlphaABS.BattleManagerABS.alertNoInBattle();
			AlphaABS.BattleManagerABS.warning(1);
			return;
		}
		if (!$gamePlayer.canMove()) return;
		var achievement = $gameSystem.achievement(this._queue[0]);
		if (achievement){
			var category = achievement.category.split(',')[0];
			SMO.AM.currentCategory = SMO.AM.categories.length > 0 ? category : 'none';
			var data = SMO.AM.getAchievsByCategory(SMO.AM.currentCategory);
			data.forEach(function(d){
				if (d.isHidden()){
					data.delete(d);
				}
			});
			data = Window_Achievements.prototype.sortData(data, $gameSystem.achievs.sortType);
			SMO.AM.PopUp.preselect = data.indexOf(achievement);
			SMO.AM.PopUp.isClickTriggered = true;
			SoundManager.playOk();
			SMO.AM.showAchievements();
		}		
	}
}

Achievement_PopUp.prototype.show = function(fadeRate){
	if (this._isShowing) return;
	this._queue = $gameSystem.achievPopUp.queue || [];
	if (this._queue.length > 0){
		var achievement = SMO.AM.Data[this._queue[0] - 1] || null;
		if (achievement){
			fadeRate = fadeRate || 5;
			if (achievement.isMyPopUpReady()){
				this.drawAchievementPopUp();
				this._isShowing = true;
				$gameSystem.achievPopUp.isShowing = true;
				this.fade(fadeRate, this._timerX);//fade in
			} else {
				//if the backgorund is not ready the achievement is pushed to the end of
				//the queue and the queue will wait 15 frames before continue
				$gameSystem.achievPopUp.queue.push(this._queue[0]);
				$gameSystem.achievPopUp.queue.splice(0, 1);
				this._refreshQueue = 15;
			}
		} else {
			//when the ID is not a valid achievement's ID
			$gameSystem.achievPopUp.queue.splice(0, 1);
			this._queue = $gameSystem.achievPopUp.queue;
			if (this._queue.length > 0){
				return this.show(fadeRate);
			}
			this._isBusy = false;
		}
	} else {
		this._isBusy = false;
	}
}

Achievement_PopUp.prototype.hide = function(){
	this.fade(-5);//fade out
}

Achievement_PopUp.prototype.drawAchievementPopUp = function(){
	if (this._queue.length > 0){
		var item = SMO.AM.Data[this._queue[0] - 1];
		this.bitmap.clear();
		if (item){
			var width = this.bitmap.width;
			var height = this.bitmap.height;
			var popUpImg = item.popUpImage || item.backgroundImage;

			//Drawing background
			this.bitmap.drawRectS(0, 0, width, height, 2, SMO.AM.PopUp.borderColor, 'rgba(20,20,20,0.8)', popUpImg);

			//Drawing text
			if (SMO.AM.PopUp.text){
				var text = this.convertPopUpTextCodes(SMO.AM.PopUp.text, item);
				this.drawTextEx(text, 6, 5);
			}
		}
	}
}

Achievement_PopUp.prototype.convertPopUpTextCodes = function(text, Achievement){
	if (!text) return '';
	if (!Achievement) return text;
	var iconIndex = Achievement.icon.unlocked > -2 ? Achievement.icon.unlocked : SMO.AM.Icons.unlocked;
	var regExp = /<AchievCategory:.?.?>/gi;
	var results = text.match(regExp);
	if (results){
		var categories = Achievement.category.split(',');
		results.forEach(function(r){
			var indexStart = '<AchievCategory:>'.length - 1;
			var indexEnd = r.length - 1;
			var catId = Number(r.substr(indexStart, indexEnd - indexStart)) || 0;
			var category = categories[catId - 1] || '';
			text = text.replace(r, category);
		})
	}
	text = text.replace(/<achievname>/gi, Achievement.Name);
	text = text.replace(/<achievid>/gi, Achievement.id);
	text = text.replace(/<achievicon>/gi, '\\i[' + iconIndex + ']');
	return text;
}

Achievement_PopUp.prototype.changeTextColor = function(color) {
	if (this.bitmap){
		this.bitmap.textColor = color;
	}
};

Achievement_PopUp.prototype.lineHeight = function(){
	return 36;
}

Achievement_PopUp.prototype.standardFontSize = function(){
	return 18;
}

Achievement_PopUp.prototype.standardFontFace = function(){
	return Window_Base.prototype.standardFontFace.call(this);
}

Achievement_PopUp.prototype.drawText = function(text, x, y, maxWidth, maxHeight, align){
	if (this.bitmap){
		this.bitmap.drawText(text, x, y, maxWidth, maxHeight, align);
	}
}

Achievement_PopUp.prototype.drawTextEx = function(text, x, y){
	if (this.bitmap){
		if (text) {
			var lines = text.split('\n');
			var xOffSet = [];
			var lineSize = 0;
			var keepFont = false;
			this.resetFontSettings();
			//Calculating the align offset
			for (var l = 0; l < lines.length; l++){
				var lowerCaseLine = lines[l].toLowerCase();
				if (lowerCaseLine.indexOf('<center>') > -1){
					lineSize = SMO.AM.textWidthEx(lines[l].replace(/<center>/i, ''), this.bitmap.fontSize, false, 4, keepFont);
					keepFont = true;
					xOffSet.push(Math.floor((this.width - lineSize)/2 - x));
				} else if (lowerCaseLine.indexOf('<right>') > -1){
					lineSize = SMO.AM.textWidthEx(lines[l].replace(/<right>/i, ''), this.bitmap.fontSize, false, 4, keepFont);
					keepFont = true;
					xOffSet.push(this.width - lineSize - x - 6);
				} else {
					lineSize = 0;
					xOffSet.push(lineSize);
				}
			}
			text = this.removeAlignTexts(text);

			//Drawing the texts
			var textState = { index: 0, x: x, y: y, left: x, xOffSet: xOffSet, lineIndex: 0 };
			textState.text = this.convertEscapeCharacters(text);
			textState.height = SMO.AM.textStateHeight(textState, this.bitmap.fontSize, false);
			while (textState.index < textState.text.length) {
				this.processCharacter(textState);
			}
			return textState.x - x;
		} else {
			return 0;
		}
	}
}

Achievement_PopUp.prototype.removeAlignTexts = function(text){
	text = text.replace(/<center>/ig, '');
	text = text.replace(/<right>/ig, '');
	return text;
}

Achievement_PopUp.prototype.resetFontSettings = function() {
	this.bitmap.fontFace = this.standardFontFace();
	this.bitmap.fontSize = this.standardFontSize();
	this.bitmap.textColor = SMO.getTextColor(0);
};

Achievement_PopUp.prototype.convertEscapeCharacters = function(text) {
	return Window_Base.prototype.convertEscapeCharacters.call(this, text);
};

Achievement_PopUp.prototype.processCharacter = function(textState){
	Window_Base.prototype.processCharacter.call(this, textState);
}

Achievement_PopUp.prototype.processNewLine = function(textState) {
	textState.x = textState.left;
	textState.y += textState.height;
	textState.lineIndex++;
	textState.height = SMO.AM.textStateHeight(textState, this.bitmap.fontSize, false);
	textState.index++;
};

Achievement_PopUp.prototype.processNormalCharacter = function(textState) {
	var c = textState.text[textState.index++];
	var w = SMO.AM.textWidthEx(c, this.bitmap.fontSize, true);
	var xOffSet = textState.xOffSet[textState.lineIndex] || 0;
	this.bitmap.drawText(c, textState.x + xOffSet, textState.y, this.width/2, textState.height);
	textState.x += w;
};

Achievement_PopUp.prototype.processNewPage = function(textState) {
    textState.index++;
};

Achievement_PopUp.prototype.processEscapeCharacter = function(code, textState) {
	switch (code) {
	case 'C':
		this.bitmap.textColor = SMO.getTextColor(this.obtainEscapeParam(textState));
		break;
	case 'I':
		this.processDrawIcon(this.obtainEscapeParam(textState), textState);
		break;
	case '{':
		this.makeFontBigger();
		break;
	case '}':
		this.makeFontSmaller();
		break;
	}
};

Achievement_PopUp.prototype.processDrawIcon = function(iconIndex, textState) {
	var xOffSet = textState.xOffSet[textState.lineIndex] || 0;
	var yOffSet = -(28 - this.bitmap.fontSize)/2;
    this.drawIcon(iconIndex, textState.x + 2 + xOffSet, textState.y + 2 + yOffSet);
    textState.x += Window_Base._iconWidth + 4;
};

Achievement_PopUp.prototype.drawIcon = function(iconIndex, x, y) {
	var bitmap = ImageManager.loadSystem('IconSet');
	var pw = Window_Base._iconWidth;
	var ph = Window_Base._iconHeight;
	var sx = iconIndex % 16 * pw;
	var sy = Math.floor(iconIndex / 16) * ph;
	this.bitmap.blt(bitmap, sx, sy, pw, ph, x, y);
};

Achievement_PopUp.prototype.makeFontBigger = function() {
	if (this.bitmap.fontSize <= 96) {
		this.bitmap.fontSize += 4;
	}
};

Achievement_PopUp.prototype.makeFontSmaller = function() {
	if (this.bitmap.fontSize >= 24) {
		this.bitmap.fontSize -= 4;
	}
};

Achievement_PopUp.prototype.obtainEscapeCode = function(textState) {
	textState.index++;
	var regExp = /^[\$\.\|\^!><\{\}\\]|^[A-Z]+/i;
	var arr = regExp.exec(textState.text.slice(textState.index));
	if (arr) {
		textState.index += arr[0].length;
		return arr[0].toUpperCase();
	} else {
		return '';
	}
};

Achievement_PopUp.prototype.obtainEscapeParam = function(textState) {
	var arr = /^\[\d+\]/.exec(textState.text.slice(textState.index));
	if (arr) {
		textState.index += arr[0].length;
		return parseInt(arr[0].slice(1));
	} else {
		return '';
	}
};

Achievement_PopUp.prototype.fade = function (fadeRate, timer, fadeLimit) {
	if (!fadeRate) return;
	if (fadeLimit === undefined) {
		if (fadeRate > 0) {
			fadeLimit = 255;
		} else {
			fadeLimit = 0;
		}
	}
	timer = timer || 0;
	$gameSystem.achievPopUp.fadeLimit = fadeLimit;
	$gameSystem.achievPopUp.fadeRate = fadeRate;
	$gameSystem.achievPopUp.timer = timer;
	$gameSystem.achievPopUp.isFading = true;
	this._fadeLimit = fadeLimit;
	this._fadeRate = fadeRate;
	this._timer = timer;
	this._isFading = true;
}

Achievement_PopUp.prototype.update = function(){
	Sprite_Button.prototype.update.call(this);
	if (this._isFading) {
		if (this._fadeRate > 0){
			if (this.opacity < this._fadeLimit) {
				this.opacity += this._fadeRate;
			} else {
				this.opacity = this._fadeLimit;
				this._isFading = false;
			}
			$gameSystem.achievPopUp.opacity = this.opacity;
			$gameSystem.achievPopUp.isFading = this._isFading;
		} else if (this._fadeRate < 0){
			if (this.opacity > this._fadeLimit) {
				this.opacity += this._fadeRate;
			} else {
				this.opacity = this._fadeLimit;
				this._isShowing = false;
				$gameSystem.achievPopUp.isShowing = false;
				this._isFading = false;
			}
			$gameSystem.achievPopUp.opacity = this.opacity;
			$gameSystem.achievPopUp.isFading = this._isFading;
			if (!this._isFading){
				$gameSystem.achievPopUp.queue.splice(0, 1);
				this.show(10);
			}
		}
    }
	if (this._timer && !this._isFading) {
		this._timer--;
		$gameSystem.achievPopUp.timer--;
		if (this._timer <= 0) {    		
			this.hide();
			this._timer = 0;
			$gameSystem.achievPopUp.timer = 0;			
		}
	}
	if (this._refreshQueue > 0){
		this._refreshQueue--;
		if (this._refreshQueue <= 0){
			this.show();
		}
	}
	this._isBusy = this._queue.length > 0;
	if (this._isBusy && !this._isShowing){
		this.show();
	}
}

//===============================================================================================
// Scene Title
// Adding the title command (on global range only)
//===============================================================================================
if (SMO.AM.isGlobalRange){

SMO.AM._SceneTitle_createCommandWindow = Scene_Title.prototype.createCommandWindow;
Scene_Title.prototype.createCommandWindow = function() {
	SMO.AM._SceneTitle_createCommandWindow.call(this);
	this._commandWindow.setHandler('achievements', this.commandAchievements.bind(this));
}

Scene_Title.prototype.commandAchievements = function() {
	this._commandWindow.close();
	SceneManager.push(Scene_Achievements);
};

SMO.AM._WindowTitleCommand_makeCommandList = Window_TitleCommand.prototype.makeCommandList;
Window_TitleCommand.prototype.makeCommandList = function() {
	SMO.AM._WindowTitleCommand_makeCommandList.call(this);
	if (SMO.AM.TitleCommand.active){
		var position = SMO.AM.TitleCommand.position - 1;
		var name = SMO.AM.TitleCommand.name;
		Window_MenuCommand.prototype.addCommandWithIndex.call(this, name, 'achievements', true, null, position);
	}
};

}//SMO.AM.isGlobalRange

//===============================================================================================
// Scene Menu
// Adding the menu command
//===============================================================================================
SMO.AM._SceneMenu_createCommandWindow = Scene_Menu.prototype.createCommandWindow;
Scene_Menu.prototype.createCommandWindow = function(){
	SMO.AM._SceneMenu_createCommandWindow.call(this);
	this._commandWindow.setHandler('achievements', this.commandAchievements.bind(this));	
}

Scene_Menu.prototype.commandAchievements = function(){
	SceneManager.push(Scene_Achievements);
}

SMO.AM._WindowMenuCommand_makeCommandList = Window_MenuCommand.prototype.makeCommandList;
Window_MenuCommand.prototype.makeCommandList = function(){
	SMO.AM._WindowMenuCommand_makeCommandList.call(this);
	if (SMO.AM.MenuCommand.active){
		var switchId = SMO.AM.MenuCommand.switchId;
		var condition = switchId ? $gameSwitches.value(switchId) : true;
		var position = SMO.AM.MenuCommand.position - 1;
		var name = PluginManager.parameters('SMO_Achievements')['Command Name'];
		if (condition){
			this.addCommandWithIndex(name, 'achievements', true, null, position);
		}
	}	
}

Window_MenuCommand.prototype.addCommandWithIndex = function(name, symbol, enabled, ext, index) {
    if (enabled === undefined) {
        enabled = true;
    }
    if (ext === undefined) {
        ext = null;
    }
    var min = 0;
    var max = this._list.length;
    var position = index.clamp(min, max);
    var command = { name: name, symbol: symbol, enabled: enabled, ext: ext};
    this._list.splice(position, 0, command);
};

//===============================================================================================
// Scene Map
// Avoiding making the player walk after clicking on the pop up
//===============================================================================================
if (SMO.AM.PopUp.button){
	SMO.AM._SceneMap_processMapTouch = Scene_Map.prototype.processMapTouch;
	Scene_Map.prototype.processMapTouch = function() {
    	if (TouchInput.isTriggered() || this._touchCount > 0) {
        	if (TouchInput.isPressed()) {
            	if (this._touchCount === 0 || this._touchCount >= 15) {
            		if (!this.isAchievementPopUp(TouchInput.x, TouchInput.y)){
            			SMO.AM._SceneMap_processMapTouch.call(this);
            			this._touchCount--;
            		}
            	}
            	this._touchCount++;
        	} else {
            	this._touchCount = 0;
        	}
    	}
	};
	
	Scene_Map.prototype.isAchievementPopUp = function(x, y){
		var apu = this._achievementPopUp;
		if (!apu) return false;
		if (!apu._isBusy) return false;
		if (x >= apu.x && x <= apu.x + apu.width){
			if (y >= apu.y && y <= apu.y + apu.height){
				return true;
			}
		}
		return false;
	}
}

//===============================================================================================
// New Scene - Scene Achievements
//===============================================================================================
function Scene_Achievements () {
	this.initialize.apply(this, arguments);
}

Scene_Achievements.prototype = Object.create(Scene_Base.prototype);
Scene_Achievements.prototype.constructor = Scene_Achievements;

Scene_Achievements.prototype.initialize = function(){
	Scene_Base.prototype.initialize.call(this);
	this._catScrollY = 0;
	this.createBackground();
	this.createWindowLayer();
	this.createTitleWindow();
	this.createItemWindow();
	this.createTrophiesWindow();
	this.createInfoWindow();
	this.createSortSprite();
	this.createEditModeButton();

	//After clicking on the Pop Up
	if (SMO.AM.PopUp.isClickTriggered){
		this.onAchievementOk();
		this._itemWindow.deactivate();
		if (this._sortOption){
			this._sortOption.visible = true;
		}
		SMO.AM.PopUp.isClickTriggered = false;
	}

	//When directly opening a category
	if (SMO.AM.currentCategory != 'none'){
		if (this._sortOption){
			this._sortOption.visible = true;
		}
	}
}

Scene_Achievements.prototype.createBackground = function() {
	this._backgroundSprite = new Sprite();
	if (SMO.AM.background){
		this._backgroundSprite.bitmap = ImageManager.loadAchievement(SMO.AM.background);
	} else {
		this._backgroundSprite.bitmap = SceneManager.backgroundBitmap();
	}	
	this.addChild(this._backgroundSprite);
};

Scene_Achievements.prototype.createTitleWindow = function(){
	this._titleWindow = new Window_SceneName();
	this.addWindow(this._titleWindow);
}

Scene_Achievements.prototype.createItemWindow = function(){
	this._itemWindow = new Window_Achievements();
	this._itemWindow.setHandler('ok',     this.onAchievementOk.bind(this));
	this._itemWindow.setHandler('cancel', this.onAchievementCancel.bind(this));
	this.addWindow(this._itemWindow);
	this._itemWindow.select(SMO.AM.PopUp.preselect);
};

Scene_Achievements.prototype.createTrophiesWindow = function(){
	if (SMO.AM.categories.length > 0){
		this._trophiesWindow = new Window_Trophies();
		this.addWindow(this._trophiesWindow);
	}
}

Scene_Achievements.prototype.createInfoWindow = function(){
	this._infoWindow = new Window_AchievInfo();
	this.addWindow(this._infoWindow);
}

Scene_Achievements.prototype.createSortSprite = function(){
	if (!SMO.AM.Sort.enabled) return;
	this._sortOption = new Sort_Option();
	this.addChild(this._sortOption);
	this._sortOption.visible = false;
}

Scene_Achievements.prototype.createEditModeButton = function(){
	if (true) return; //the editor is not ready yet D:
	this._editMode = false;
	this._editAchievsSprite = new SpriteI_EditAchievs();
	this.addChild(this._editAchievsSprite);
}

Scene_Achievements.prototype.onAchievementOk = function(){
	var index = this._itemWindow.index();
	if (this._itemWindow._data[index]){
		if (this.isCategory()){
			if (this._editAchievsSprite){
				this._editAchievsSprite.onMenuChange(true);
			}
			SMO.AM.currentCategory = this._itemWindow._data[index];
			this._catScrollY = this._itemWindow._scrollY;
			this._lastCategory = index;
			this._itemWindow.select(0);
			this._itemWindow._scrollY = 0;
			this._itemWindow.width = this._itemWindow.windowWidth();
			this._trophiesWindow.hide();
			if (this._sortOption){
				this._sortOption.visible = true;
			}
			this.refreshAll();
		} else if (this._infoWindow.isOpen()){
			this._infoWindow.close();
			this._itemWindow.refreshMin();
		} else {
			this._infoWindow.open(this._itemWindow._data[index]);
			return;
		}
	}

	this._itemWindow.activate();	
}

Scene_Achievements.prototype.isCategory = function(){
	return SMO.AM.categories.length > 0 && SMO.AM.currentCategory === 'none';
}

Scene_Achievements.prototype.onAchievementCancel = function(){
	if (SMO.AM.currentCategory === 'none'){
		SceneManager.pop();
	} else {
		this.clearRecentUnlock();
		if (this._sortOption){
			this._sortOption.visible = false;
		}
		if (this._editAchievsSprite){
			this._editAchievsSprite.onMenuChange();
		}
		var categoryIndex = SMO.AM.categories.indexOf(SMO.AM.currentCategory);
		SMO.AM.currentCategory = 'none';
		SMO.AM.PopUp.preselect = 0;
		this._itemWindow.width = this._itemWindow.windowWidth();
		this._lastCategory = this._lastCategory || categoryIndex;
		this._itemWindow.select(this._lastCategory);
		this._itemWindow._scrollY = this._catScrollY;
		this.refreshAll();
		this._trophiesWindow.show();
		this._itemWindow.activate();
	}	
}

Scene_Achievements.prototype.clearRecentUnlock = function(){
	var category = SMO.AM.currentCategory;
	var toDelete = [];
	SMO.AM.Achievements().achievs.recentUnlock.forEach(function(a){
		if ($gameSystem.achievement(a).category.split(',').contains(category)){
			toDelete.push(a);
		}
	});
	toDelete.forEach(function(a){
		SMO.AM.Achievements().achievs.recentUnlock.delete(a);
	})
	if (SMO.AM.isGlobalRange){
		SMO.AM.saveGlobalAchievements();
	}
}

Scene_Achievements.prototype.refreshAll = function(){
	this._windowLayer.children.forEach(function(w){
		if (w.refresh){
			w.refresh();
		};
	})
}

Scene_Achievements.prototype.refreshMin = function(isUnlock){
	if (this._itemWindow && this._itemWindow.active){
		this._itemWindow.refreshMin();
	}

	if (isUnlock && this._trophiesWindow && this._trophiesWindow.visible){
		this._trophiesWindow.refresh();
	}

	if (this._infoWindow && this._infoWindow.isOpen()){
		this._infoWindow.refreshMin(isUnlock);
	}
}

Scene_Achievements.prototype.isReady = function(){
	var ready = Scene_Base.prototype.isReady.call(this);
	return ready && ImageManager.isAchievementsReady();
}

Scene_Achievements.prototype.update = function(){
	Scene_Base.prototype.update.call(this);
	this.updateBackground();
	this.updateTriggers();
}

Scene_Achievements.prototype.updateBackground = function(){
	if (this._backgrUpdated) return;
	if (SMO.AM.background){
		this._backgroundSprite.bitmap = ImageManager.loadAchievement(SMO.AM.background);
	} else {
		this._backgroundSprite.bitmap = SceneManager.backgroundBitmap();
	}
	this._backgrUpdated = true;
}

if (!Input.keyMapper[65]){
	Input.keyMapper[65] = 'a';
}

Scene_Achievements.prototype.updateTriggers = function(){
	var onChange = false;
	if (this._editAchievsSprite){
		if (!this._editMode && Input.isPressed('control') && Input.isPressed('a')){
			if (this._editAchievsSprite){
				this._editAchievsSprite.show();
			}
		}
		if (this._editMode) return;
	}
	if (this._infoWindow && this._infoWindow.isOpen()){
		if (Input.isTriggered('ok') || Input.isTriggered('cancel') || 
			TouchInput.isTriggered() || TouchInput.isCancelled()){
			SoundManager.playCancel();
			return this.onAchievementOk();
		}
	} else {
		if (this._trophiesWindow && this._trophiesWindow.visible){
			if (TouchInput.isTriggered()){
				var buttonName = this.getButtonOnClick();
				if (buttonName){
					this._trophiesWindow.onClick(buttonName);
				}
			}
			if (Input.isRepeated('left')){
				this._trophiesWindow.selectSlot(this._trophiesWindow._selected - 1);
			} else if (Input.isRepeated('right')){
				this._trophiesWindow.selectSlot(this._trophiesWindow._selected + 1);
			}
		}
		if (this._sortOption && this._sortOption.visible){
			if (this._sortOption._open){
				if ((TouchInput.isTriggered() && !this.isSortSprite()) || TouchInput.isCancelled() || Input.isTriggered('cancel')){
					//Closing sort option
					this._sortOption.onClick(this._sortOption._selected);
				} else if (Input.isRepeated('up')){
					this._sortOption._selecting--;
					if (this._sortOption._selecting < 0){
						this._sortOption._selecting = this._sortOption._options.length - 1;
					}
					this._sortOption.drawSortBody();
					SoundManager.playCursor();
				} else if (Input.isRepeated('down')){
					this._sortOption._selecting++;
					if (this._sortOption._selecting > this._sortOption._options.length - 1){
						this._sortOption._selecting = 0;
					}
					this._sortOption.drawSortBody();
					SoundManager.playCursor();
				} else if (Input.isTriggered('ok')){
					//When an option is selected
					this._sortOption.onClick(this._sortOption._selecting);
				}
			} else if (Input.isTriggered('shift')){
				this._itemWindow.deactivate();
				this._sortOption._open = true;
				this._sortOption.drawSortBody();
				SoundManager.playCursor();
			}
		}
	}
}

Scene_Achievements.prototype.getButtonOnClick = function(){
	var x = TouchInput._x - this._trophiesWindow.x;
	var y = TouchInput._y - this._trophiesWindow.y;
	var buttons = this._trophiesWindow.buttons;
	var button;
	for (var i in buttons){
		button = buttons[i];
		if (x >= button.x1 && x <= button.x2 && y >= button.y1 && y <= button.y2){
			return i;
		}
	}
	return '';
}

Scene_Achievements.prototype.isSortSprite = function(){
	if (this._sortOption){
		var x = TouchInput._x;
		var y = TouchInput._y;
		var so = this._sortOption;
		var x2 = so.x + so.width;
		var y2 = so._open ? so.y + so.height : so.y + so._cellHeight;
		if (x >= so.x && x <= x2){
			if (y >= so.y && y <= y2){
				return true;
			}
		}
	}
	return false;
}

//===============================================================================================
// SceneName Window
//===============================================================================================
function Window_SceneName () {
	this.initialize.apply(this, arguments);
}

Window_SceneName.prototype = Object.create(Window_Base.prototype);
Window_SceneName.prototype.constructor = Window_SceneName;

Window_SceneName.prototype.initialize = function(){
	var x, y, width, height;
	width = Graphics.width;
	height = 80;
	x = 0;
	y = 0;
	
	Window_Base.prototype.initialize.call(this, x, y, width, height);
	this.drawSceneName();
}

Window_SceneName.prototype.drawSceneName = function(){
	var cat = SMO.AM.currentCategory === 'none';
	var text = cat ? SMO.AM.Texts.menuName : SMO.AM.currentCategory + ' ' + SMO.AM.Texts.menuName;
	var x = 0;
	var y = 0;
	var maxWidth = Graphics.width;
	this.contents.clear();
	this.drawText(text, x, y, maxWidth, 'center');
}

Window_SceneName.prototype.refresh = function(){
	this.drawSceneName();
}


//===============================================================================================
// Achievements Window
//===============================================================================================
function Window_Achievements () {
	this.initialize.apply(this, arguments);
}

Window_Achievements.prototype = Object.create(Window_Command.prototype);
Window_Achievements.prototype.constructor = Window_Achievements;

Window_Achievements.prototype.initialize = function(){
	var x = 0;
	var y = 80;
	this._data = [];
	this._sortType = $gameSystem.achievs.sortType;
	Window_Command.prototype.initialize.call(this, x, y);
	this.refreshUnlockedTrophies();
}

Window_Achievements.prototype.refreshUnlockedTrophies = function(forceSave){
	var all, unlocked, dataChanged = false;
	for (var c = 0; c < SMO.AM.Categories.length; c++){
		if (SMO.AM.Achievements().trophies.locked.contains(c + 1)){
			all = SMO.AM.getAchievsByCategory(SMO.AM.Categories[c].name);
			unlocked = all.filter(d => d.isUnlocked());
			if (unlocked.length >= all.length){
				//Unlocking Trophy
				dataChanged = true;
				SMO.AM.Achievements().trophies.unlocked.push(c + 1);
				SMO.AM.Achievements().trophies.locked.delete(c + 1);
				if (SMO.AM.Categories[c].Trophy.onUnlock){
					try {
						eval(SMO.AM.Categories[c].Trophy.onUnlock);
					} catch (e){
						console.error('Error on trophy\'s unlock script (Trophy\'s name: '+SMO.AM.Categories[c].name+').');
						console.error(e);
					}
				}
			}
		}
	}
	if (SMO.AM.isGlobalRange && (dataChanged || forceSave)){
		SMO.AM.saveGlobalAchievements();
	}
}

Window_Achievements.prototype.update = function(){
	Window_Command.prototype.update.call(this);
	this.updatePosition();
	this.updateImages();
}

Window_Achievements.prototype.refreshMin = function(){
	if (this.isCategory()) {
		this.refresh();
	} else {
		for (var d = 0; d < this._data.length; d++){
			if (this._data[d].isPlaytimeRequired()){
				this.redrawItem(d);
			}
		}
	}
}

Window_Achievements.prototype.updatePosition = function(){
	if (this._positionRefreshed) return;
	this.y = SceneManager._scene._titleWindow.height;
	this.height = Graphics.height - this.y;
	this._positionRefreshed = true;
}

Window_Achievements.prototype.updateImages = function(){
	if (!SMO.AM._categoryRefreshed){
		this.refresh();
		SMO.AM._categoryRefreshed = true;
	}
}

Window_Achievements.prototype.windowWidth = function(){
	this._categoryWidth = Graphics.width/3;
	var width = this.isCategory() ? this._categoryWidth : Graphics.width;
	return width;
}

Window_Achievements.prototype.windowHeight = function(){
	return Graphics.height;
}

Window_Achievements.prototype.maxCols = function(){
	var cols = Math.floor(Graphics.width / 200);
	return this.isCategory() ? 1 : cols;
}

Window_Achievements.prototype.itemHeight = function(index){
	var LH = this.lineHeight();
	var height = this.isCategory() ? LH * 2 : LH * 4;
	return height;
}

Window_Achievements.prototype.isCategory = function(){
	return SMO.AM.categories.length > 0 && SMO.AM.currentCategory === 'none';
}

Window_Achievements.prototype.standardFontSize = function() {
	return this.isCategory() ? 26 : 18;
};

Window_Achievements.prototype.makeCommandList = function(){
	var text, enabled, achievs;
	this._data = this.getCommandListData();

	this._data.forEach(function(d){
		text = this.isCategory() ? d : d.Name;
		achievs = this.isCategory() ? SMO.AM.getAchievsByCategory(d) : [1];
		enabled = achievs.length > 0 ? true : false;
		this.addCommand(text, 'achiev', enabled);
	}, this);
}

Window_Achievements.prototype.drawItem = function(index) {
	var rect, rect2, y, c, item, completed, color, text, recent, toDelete;
	var achievs, achievsL, completedAchivs, iconId, iconX, iconSize, maxWidth;
	if (this.isCategory()){
		rect = this.itemRectForText(index);
    	y = rect.y + (rect.height - this.lineHeight())/2;
    	this.resetTextColor();
    	achievs = SMO.AM.getAchievsByCategory(this.commandName(index));
    	if (SMO.AM.hideTotally){
    		toDelete = [];
    		achievs.forEach(function(d){
    			if (d.isHidden()){
    				toDelete.push(d);
    			}
    		})
    		toDelete.forEach(function(d){
    			achievs.delete(d);
    		})
    	}

    	iconSize = 0;

    	recent = achievs.filter(function(c){
    		return SMO.AM.Achievements().achievs.recentUnlock.contains(c.id);
    	})
    	rect2 = this.itemRect(index);
    	this.drawAchievBackground(rect2, SMO.AM.Categories[index]);

    	if (recent.length > 0 && SMO.AM.Icons.recentUnlock > -1){
    		iconId = SMO.AM.Icons.recentUnlock;
    		iconX = rect.width - Window_Base._iconWidth/2 - 4;
    		this.drawIcon(iconId, iconX, rect.y);
    		iconSize = Window_Base._iconWidth + 4;
    	}
    	maxWidth = rect.width;

    	completedAchivs = achievs.filter(function(c){
    		return c.isUnlocked();
    	});

    	achievsL = achievs.length;
    	completedAchivs = completedAchivs.length;
    	this.changePaintOpacity(this.isCommandEnabled(index));
    	text = this.commandName(index) + ' (' + completedAchivs + '/'+ achievsL +')';
    	this.drawText(text, rect.x, y, maxWidth, 'center');
    	this.changePaintOpacity(true);
	} else {
		item = this._data[index];
		if (item) {
			color = item.isUnlocked() ? SMO.AM.Texts.unlockedColor : this.textColor(0);
			this.changeTextColor(this.normalColor());
			rect = this.itemRect(index);
			rect.width -= this.textPadding();
			this.drawAchievBackground(rect, item);
			this._keepColor = true;
			if(!this._tested){
				this._tested = true;
			}

			this.contents.fontSize += 4;
			this.drawItemName(item, rect.x + 4, rect.y + 4, rect.width - 6);
			this.contents.fontSize -= 4;
			
			this.drawAchievBody(index, rect, color);
			this._keepColor = false;

			var recent = SMO.AM.Achievements().achievs.recentUnlock.contains(item.id);

			if (recent && SMO.AM.Icons.recentUnlock > -1){
				iconId = SMO.AM.Icons.recentUnlock;
				iconX = rect.x + rect.width - Window_Base._iconWidth;
				var iconY = rect.y + rect.height - Window_Base._iconWidth - 4;
				this.drawIcon(iconId, iconX, iconY);
			}
		}
	}
};

Window_Achievements.prototype.drawAchievBackground = function(rect, Data){
	var bitmap, background, isUnlocked, LH, color1, color2, color3, color4;
	var isAchievement = !!Data._isAchievement;
	if (isAchievement){
		isUnlocked = Data.isUnlocked();
		background = Data.backgroundImage;
	} else {
		isUnlocked = false;
		background = Data.img;
	}
	
	var x0, y0, width, dw, dh;
	var cursorWidth = 3;
	x0 = rect.x + cursorWidth;
	y0 = rect.y + cursorWidth;
	width = isAchievement ? rect.width + 6 : rect.width;
	dw = width - cursorWidth * 2;
	dh = rect.height - cursorWidth * 2;

	LH = this.lineHeight();
	color1 = isUnlocked ? SMO.AM.Texts.unlockedColor : 'rgba(200,200,200,1)'; //borders
	color2 = 'rgba(0,0,0,0.6)';    //name (this will be above the color 3)
	color3 = 'rgba(0,0,0,0.5)';    //body

	this.drawRectS(x0, y0, dw, dh, 1, color1, color3, background);
	if (isAchievement){
		var imgName = Data.isSecret() ? SMO.AM.secretBackground : SMO.AM.lockedBackground;
		if (background){
			if (!isUnlocked) {
				if (imgName) {
					//Drawing locked/secret background
					bitmap = ImageManager.loadAchievement(imgName);
					this.contents.blt(bitmap, 0, 0, bitmap.width, bitmap.height, x0 + 1, y0 + 1, rect.width - 2, rect.height - cursorWidth * 2 - 2);
				} else {
					//Drawing black semi-transparent square above the achiev's background
					this.contents.fillRect(x0 + 1, y0 + 1, rect.width - 2, rect.height - cursorWidth * 2 - 2, color2);
				}
			}
		} else if (imgName){
			bitmap = ImageManager.loadAchievement(imgName);
			this.contents.blt(bitmap, 0, 0, bitmap.width, bitmap.height, x0 + 1, y0 + 1, rect.width - 2, rect.height - cursorWidth * 2 - 2);
		} else {
			//Drawing darker box behind the achievs' name
			this.contents.fillRect(x0 + 1, y0 + 1, dw - 2, this.lineHeight(), color2);
		}
	}
}

Window_Achievements.prototype.drawItemName = function(item, x, y, width) {
	var iconBoxWidth, align, name;
	width = width || 312;
	if (item) {
		iconBoxWidth = Window_Base._iconWidth + 6;
		if (!this._keepColor){
			this.resetTextColor();
		}
		if (item.iconIndex > -1){
			y += 2;
			this.drawIcon(item.iconIndex, x + 2, y);
		} else {
			iconBoxWidth = 4;
		}
		align = 'left';
		if (item.isSecret()){
			align = 'center';
			x -= 20;
		}
		name = item.isUnlocked() ? item.Name : item.name;
		this.drawText(name, x + iconBoxWidth, y, width - iconBoxWidth, align);
	}
};

Window_Achievements.prototype.drawAchievBody = function(index, rect, color){
	var r, y, LH, achievement, requirements, text, rate, values, current;
	var status = {
		total:100,
		each:0,
		unlocked:0
	};
	achievement = this._data[index];
	requirements = achievement.requirements;
	status.each = requirements.length > 0 ? status.total/requirements.length : status.total;
	requirements.forEach(function(r){
		values = SMO.AM.getRequirementValues(r, achievement);
		if (r.comparison === '>=' && !isNaN(values.currentValue) && !isNaN(values.finalValue)){
			values.finalValue = values.finalValue == 0 ? 1 : values.finalValue;
			current = values.state ? status.each : Number.toNatural(status.each * values.currentValue/values.finalValue);
			status.unlocked += current;
		} else if (values.state){
			status.unlocked += status.each;
		}
	})
	status.unlocked = Math.floor(status.unlocked);
	LH = this.lineHeight();
	y = rect.y + LH;
	if (achievement.isSecret()){
		text = SMO.AM.Texts.secretSign;
		this.drawText(text, rect.x + 3, y + LH - 2, rect.width, 'center');
	} else {
		rate = achievement.isUnlocked() ? 100 : status.unlocked;
		this.drawGauge(rect.x + 8, y + LH + 12, rect.width - 10, Math.floor(rate) / 100, SMO.AM.Texts.gaugeColor1, SMO.AM.Texts.gaugeColor2, LH - 12);
		text = achievement.Description;
		text = SMO.AM.removeTextCodes(text);
		var texts = SMO.AM.wrapText(text, rect.width - 8, this.contents.fontSize, true);
		texts = texts.split('\n');
		for (var t = 0; t < 3; t++){
			if (t === 2 && texts.length > 3){
				this.contents.drawCircle(rect.x + rect.width/2 - 12, y + (LH-14) * 3, 3, '#FFFFFF');
				this.contents.drawCircle(rect.x + rect.width/2, y + (LH-14) * 3, 3, '#FFFFFF');
				this.contents.drawCircle(rect.x + rect.width/2 + 12, y + (LH-14) * 3, 3, '#FFFFFF');
			} else {
				this.changeTextColor(this.normalColor());
				this.drawText(texts[t], rect.x + 8, y + (LH-14) * t, rect.width - 8, 'left');
			}
		}
		this.changeTextColor(color);
		text = Math.floor(rate);
		if (text === 100 && !achievement.isUnlocked()){
			text--;
		}
		text = text + '%';
		this.contents.outlineColor = 'rgba(0,0,0,0.8)';
		this.drawText(text, rect.x + 3, y + LH * 2 - 2, rect.width - 3, 'center');
		this.contents.outlineColor = 'rgba(0,0,0,0.5)';
	}	
}

Window_Achievements.prototype.drawGauge = function(x, y, width, rate, color1, color2, height) {
    height = height || 6;
    var fillW = Math.floor(width * rate);
    var gaugeY = y + this.lineHeight() - 8;
    this.contents.fillRect(x, gaugeY, width, height, this.gaugeBackColor());
    this.contents.gradientFillRect(x, gaugeY, fillW, height, color1, color2);
};

Window_Achievements.prototype.getCommandListData = function(){
	var data, candidates;
	if (this.isCategory()){
		data = SMO.AM.categories;
	} else {
		var toDelete = [];
		data = SMO.AM.getAchievsByCategory(SMO.AM.currentCategory);
		data = this.sortData(data);
		data.forEach(function(d){
			if (d.isHidden()){
				toDelete.push(d);
			} else if (d.isSecret()){
				d.iconIndex = d.icon.secret > -2 ? d.icon.secret : SMO.AM.Icons.secret;
			} else if (d.isUnlocked()){
				d.iconIndex = d.icon.unlocked > -2 ? d.icon.unlocked : SMO.AM.Icons.unlocked;
			} else {
				d.iconIndex = d.icon.locked > -2 ? d.icon.locked : SMO.AM.Icons.locked;
			}
		})
		toDelete.forEach(function(d){
			data.delete(d);
		})
	}
	return data;	
}

Window_Achievements.prototype.sortData = function(data, sortType){
	if (!SMO.AM.Sort.enabled) return data;

	if (sortType === undefined){
		sortType = this._sortType;
	}

	if (!SMO.AM.Sort.options[sortType]){
		sortType = 0;
		this._sortType = 0;
		$gameSystem.achievs.sortType = 0;
	}
	
	var achiev, achivIndex;
	var main = data;
	var all = data;
	if (data){
		var unlocked = []; 
		var locked = []; 
		var secrets = [];
		main = [];
		data.forEach(function(d){
			if (d.isUnlocked()){
				unlocked.push(d);
			} else if (d.isSecret()){
				secrets.push(d);
			} else {
				locked.push(d);
			}
		})
		var option = SMO.AM.Sort.options[sortType];
		try {
			eval(option.script);
		} catch(e){
			console.error('Error on Sort Script ('+ option.symbol +')');
			console.error(e);
		}
	}
	return main;
}

//===============================================================================================
// Trophies Window
//===============================================================================================
function Window_Trophies () {
	this.initialize.apply(this, arguments);
}

Window_Trophies.prototype = Object.create(Window_Base.prototype);
Window_Trophies.prototype.constructor = Window_Trophies;

Window_Trophies.prototype.initialize = function(){
	Window_Base.prototype.initialize.call(this, 0, 0, Graphics.width, Graphics.height);
	this._trophies = null;
	this.buttons = {};
	this._data = [];
	this._desc = {};
	this._page = 0;
	this._maxItems = 0;
	this._maxPages = 0;
	this._selected = -1;
	if (SMO.AM.currentCategory != 'none'){
		this.hide();
	}
}

Window_Trophies.prototype.update = function(){
	Window_Base.prototype.update.call(this);
	this.updatePosition();
}

Window_Trophies.prototype.updatePosition = function(){
	if (this._positionUpdated) return;
	var itemWindow = SceneManager._scene._itemWindow;
	this.x = itemWindow._categoryWidth;
	this.y = itemWindow.y;
	this.width = Graphics.width - itemWindow._categoryWidth;
	this.height = itemWindow.height;
	this.refresh();
	this._positionUpdated = true;
}

Window_Trophies.prototype.createTrophySprites = function(allItems, width, height){
	var maxItems = Math.min(this._maxItems, allItems);
	var widthB = Math.floor(width * 1.25);
	var heightB = Math.floor(height * 1.25);
	var Trophy;
	this._trophies = [];
	for (var s = 0; s < maxItems; s++){
		Trophy = new Sprite(new Bitmap(widthB, heightB));
		
		Trophy._trophyIndex = s;
		Trophy._container = this;
		Trophy.update = function(){
			if (this._container && this._container.visible){
				Sprite.prototype.update.call(this);
				if (this._container._selected === this._trophyIndex){
					if (this.scale.x < 1){
						this.scale.x += 0.01;
						this.scale.y += 0.01;
					}
				} else if (this.scale.x >= 0.81){
					this.scale.x -= 0.01;
					this.scale.y -= 0.01;
				}
			}
		}
		Trophy.anchor.x = 0.5;
		Trophy.anchor.y = 0.5;
		Trophy.scale.x = 0.8;
		Trophy.scale.y = 0.8;
		this._trophies.push(Trophy);
		this.addChild(this._trophies.last());
	}
}

Window_Trophies.prototype.clearTrophies = function(allItems, width, height){
	if (!this._trophies){
		this.createTrophySprites(allItems, width, height);
	}
	this._trophies.forEach(function(t){
		t.bitmap.clear();
	});
}

Window_Trophies.prototype.drawTrophy = function(index, x, y, imgName, isUnlocked){
	if (!this._trophies[index]) return;
	var Trophy = this._trophies[index];
	var Bitmap = Trophy.bitmap;
	var borderColor = isUnlocked ? SMO.AM.Texts.unlockedColor : '#FFFFFF';
	this._trophies[index].x = Math.floor(x + Trophy.width * 1/2);
	this._trophies[index].y = Math.floor(y + Trophy.height * 1/2);
	Bitmap.drawRectS(0, 0, Trophy.width, Trophy.height, 2, borderColor, null, imgName);
	if (!isUnlocked){
		Bitmap.drawText('?', 0, Math.floor((Trophy.height - Bitmap.fontSize)/2), Trophy.width, Bitmap.fontSize, 'center');
	}
}

Window_Trophies.prototype.drawTrophiesBody = function(){
	var progressTxt, allAchievs, unlockedAchievs;
	var rate, maxWidth, x, y, width, height;
	var line, col, maxLines, maxCols;

	//Calculating the total progress
	var achievs = SMO.AM.hideTotally ? SMO.AM.Data.filter(d => !d.isHidden()) : SMO.AM.Data;
	unlockedAchievs = SMO.AM.Achievements().achievs.unlocked.length;
	allAchievs = achievs.length;
	rate = unlockedAchievs / allAchievs;
	progressTxt = SMO.AM.Texts.progress + ' ' + unlockedAchievs + '/' + allAchievs;
	x = 0; y = 0; maxWidth = this.width - 40;

	//Drawing trophies window's title
	this.drawText(SMO.AM.Texts.trophies, x, y, maxWidth, 'center');

	//Drawing trophies window's description
	this.contents.fontSize -= 5;
	var trophiesDesc = SMO.AM.wrapText(SMO.AM.Texts.trophiesDesc, maxWidth, this.contents.fontSize).split('\n');
	this._lockFontState = true;
	for (var t = 0; t < trophiesDesc.length; t++){
		this.drawTextEx(trophiesDesc[t], x, y + this.lineHeight() * (t + 1), maxWidth);
	}
	this._lockFontState = false;
	this.contents.fontSize += 5;

	//Drawing trophies
	maxLines = SMO.AM.TrophiesConfigs.lines;
	maxCols = SMO.AM.TrophiesConfigs.cols;
	this._maxItems = maxLines * maxCols;
	if (SMO.AM.TrophiesConfigs.enabled){
		this._data = SMO.AM.Categories.filter(function(c) {return !c.Trophy.hidden;});
	} else {
		this._data = [];
		var addData, unlockedIds = SMO.AM.Achievements().achievs.unlocked;
		for (t = unlockedIds.length - 1; this._data.length < this._maxItems; t--){
			addData = unlockedIds[t] ? SMO.AM.Data[unlockedIds[t] - 1] : {id:0};
			this._data.push(addData);
		}
	}
	this._maxPages = Math.ceil(this._data.length/this._maxItems);
	this._pageMaxItems = Math.min(this._maxItems, this._data.length - this._page * this._maxItems);

	line = 0; col = 0;
	var gap = 10;
	y = 140;
	width = Math.floor((maxWidth/2 - gap * (maxCols + 1))/maxCols);
	height = Math.floor((this.height - 284 - gap * (maxLines + 1))/maxLines) - 5;
	trophiesHeight = Math.floor(this.height - 284);

	this.clearTrophies(this._data.length, width, height);
	if (this._selected === -1){
		this.selectSlot(0, false, false);
	}
	var x2, y2, c, slotIndex, imgName, isUnlocked, command, buttonName, color, borderColor;
	for (c = this._maxItems * this._page; c < this._data.length; c++){
		if (col >= maxCols){
			line++;
			col = 0;
		}
		if (maxLines > line) {
			slotIndex = c - this._maxItems * this._page;
			if (SMO.AM.TrophiesConfigs.enabled){
				isUnlocked = SMO.AM.Achievements().trophies.unlocked.contains(c + 1);
				imgName = isUnlocked ? SMO.AM.Categories[c].Trophy.img : '';
			} else {
				isUnlocked = !!this._data[slotIndex].id;
				imgName = isUnlocked ? this._data[slotIndex].backgroundImage : '';
			}
			if (SMO.AM.TrophiesConfigs.selectStyle === 'cursor'){
				x2 = x + gap + (width + gap) * col;
				y2 = y + (height + gap) * line;
				if (slotIndex === this._selected){
					color = SMO.AM.Texts.selectorColor;
					this.drawRectS(x2 - 1, y2 - 1, width + 2, height + 2, 3, color, null, imgName);
				} else {
					borderColor = isUnlocked ? SMO.AM.Texts.unlockedColor : '#FFFFFF';
					this.drawRectS(x2, y2, width, height, 2, borderColor, null, imgName);
				}
				if (!isUnlocked){
					this.drawText('?', x2, y2 + height/2 - this.lineHeight()/2, width, 'center');
				}
			} else {
				x2 = x + gap + (width + gap) * col + gap * (maxCols - 1)/2 - maxCols/2;
				y2 = y + (height + gap) * line + gap * (maxLines - 1)/2  - maxLines/2;
				this.drawTrophy(slotIndex, x2, y2, imgName, isUnlocked);
			}
			command = 'this.selectSlot('+slotIndex+');';
			buttonName = 'slot' + slotIndex;
			this.addButton(buttonName, x2+16, x2+width+18, y2 + 16, y2 + height + 16, true, command);
			col++;
		}
	}

	//Defining the description's box properties
	x = maxWidth/2 + 12; width = maxWidth/2 - 12; height = height * maxLines + gap  * (maxLines - 1);
	this._desc = {
		x:x,
		y:y,
		width:width,
		height:height
	}

	this.drawRectS(x, y, width, height, 2);

	//Drawing arrows
	if (this._maxPages > 1){
		x = maxWidth/4 - 45; y += trophiesHeight;
		this.drawArrowButtons(x, y);
	}
	
	//Drawing progress gauge
	x = 20; y = Graphics.height - 224;
	this.drawGauge(x, y, maxWidth - 45, rate, SMO.AM.Texts.gaugeColor1, SMO.AM.Texts.gaugeColor2, 24);
	
	//Drawing progress text
	x = 0; y = Graphics.height - 174;
	this.drawText(progressTxt, x, y, maxWidth, 'center');
}

Window_Trophies.prototype.drawArrowButtons = function(x, y){
	//Drawing triangles
	var enabledB1 = this._page > 0;                  //B1 -> left triangle
	var enabledB2 = this._page + 1 < this._maxPages; //B2 -> right triangle
	var colorB1 = enabledB1 ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0.5)';
	var colorB2 = enabledB2 ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0.5)';
	this.contents.drawTriangleS(x, y, 30, 20, 'left', colorB1);
	this.contents.drawTriangleS(x + 90, y, 30, 20, 'right', colorB2);

	//Buttons set up
	var commandB1 = 'this._page--;' + 'this.selectSlot(0);';
	var commandB2 = 'this._page++;' + 'this.selectSlot(0);';
	this.addButton('leftArrow', x - 2, x + 18, y - 5, y + 25, enabledB1, commandB1);
	this.addButton('rightArrow', x + 108, x + 128, y - 5, y + 25, enabledB2, commandB2);

	//Drawing page index
	var text = this._page + 1;
	text += '/' + this._maxPages;
	this.drawText(text, x, y - 18, 90, 'center');
}

Window_Trophies.prototype.resetFontSettings = function(){
	if (this._lockFontState) return;
	this.contents.fontFace = this.standardFontFace();
	this.contents.fontSize = this.standardFontSize();
	this.resetTextColor();
}

Window_Trophies.prototype.addButton = function(name, x1, x2, y1, y2, enabled, onClick){
	if (this.buttons[name]){
		this.buttons[name].onClick = onClick;
		this.buttons[name].state = enabled;
	} else {
		this.buttons[name] = {
			x1:x1,
			x2:x2,
			y1:y1,
			y2:y2,
			state:enabled,
			onClick:onClick
		}
	}
}

Window_Trophies.prototype.onClick = function(buttonName){
	var button = this.buttons[buttonName];
	if (button && button.state){
		eval(button.onClick);
		this.refresh();
	}
}

Window_Trophies.prototype.selectSlot = function(index, playCursor, refresh){
	if (this.select(index)){
		this.swapChildren(this._trophies[this._selected], this.children.last());
		if (refresh || refresh === undefined){
			if (SMO.AM.TrophiesConfigs.selectStyle === 'cursor'){
				this.refresh();
			} else {
				this.refreshTrophyDesc();
			}
		}
		if (playCursor || playCursor === undefined){
			SoundManager.playCursor();
		}
	}
}

Window_Trophies.prototype.select = function(index){
	var dataIndex = index + this._maxItems * this._page;
	var data = this._data[dataIndex];
	if (data){
		if (index < 0){
			this._page--;
			this._selected = this._maxItems - 1;
			this.refresh();
		} else if (index + 1 > this._maxItems){
			this._page++;
			this._selected = 0;
			this.refresh();
		} else {
			this._selected = index;
		}
		return true;
	}
	return false;
}

Window_Trophies.prototype.drawGauge = function(x, y, width, rate, color1, color2, height) {
    height = height || 6;
    var fillW = Math.floor(width * rate);
    var gaugeY = y + this.lineHeight() - 8;
    this.contents.fillRect(x, gaugeY, width, height, this.gaugeBackColor());
    this.contents.gradientFillRect(x, gaugeY, fillW, height, color1, color2);
};

Window_Trophies.prototype.refresh = function(){
	this.contents.clear();
	this.drawTrophiesBody();
	this.drawTrophyDesc();
}

Window_Trophies.prototype.refreshTrophyDesc = function(){
	var x = this._desc.x;
	var y = this._desc.y;
	var width = this._desc.width;
	var height = this._desc.height;
	this.contents.clearRect(x, y, width, height);
	this.drawRectS(x, y, width, height, 2);
	this.drawTrophyDesc();
}

Window_Trophies.prototype.drawTrophyDesc = function(){
	var index = this._selected + this._maxItems * this._page;
	var data = this._data[index];
	if (data){
		var isTrophies = SMO.AM.TrophiesConfigs.enabled;
		var isUnlocked = isTrophies ? SMO.AM.Achievements().trophies.unlocked.contains(index + 1) : data.id > 0;
		var image = SMO.AM.TrophiesConfigs.enabled ? data.Trophy.img : data.backgroundImage;
		var LH = this.lineHeight() - 10;
		if (image && isUnlocked){
			var bitmap = ImageManager.loadAchievement(image);
			this.contents.blt(bitmap, 0, 0, bitmap.width, bitmap.height, this._desc.x + 2, this._desc.y + 2, this._desc.width - 4, this._desc.height - 4);
		}
		this.contents.fontSize -= 10;
		var description = isUnlocked ? isTrophies ? data.Trophy.description : data.description : SMO.AM.Texts.locked;
		var texts = description.split('\n');
		var txtHeight = LH * texts.length;
		var alignX = isUnlocked ? 'left' : 'center';
		var alignY = {
			up: this._desc.y,
			center: this._desc.y + this._desc.height/2 - txtHeight,
			down: this._desc.y + this._desc.height - txtHeight - 8
		}
		var y, t;
		if (SMO.AM.TrophiesConfigs.enabled || !isUnlocked){
			y = isUnlocked ?  alignY.down : alignY.center;
			for (t = 0; t < texts.length; t++){
				if (isUnlocked){
					this.contents.fillRect(this._desc.x + 2, y + LH * t + 4, this._desc.width - 4, LH, 'rgba(0,0,0,0.5)');
				}
				this.drawText(texts[t], this._desc.x + 8, y + LH * t, this._desc.width - 16, alignX);
			}
		} else {
			this.contents.fontSize += 10;
			//Background for the acheivement's name
			this.contents.fillRect(this._desc.x + 4, alignY.up + 4, this._desc.width - 8, LH + 15, 'rgba(0,0,0,0.5)');
			//Background for the acheivement's unlock date
			this.contents.fillRect(this._desc.x + 4, alignY.down + 4, this._desc.width - 8, LH, 'rgba(0,0,0,0.5)');

			//Drawing name
			this.drawText(data.name, this._desc.x + 8, alignY.up + 5, this._desc.width - 16, 'center');
			this.changeTextColor(SMO.AM.Texts.unlockedColor);
			this.contents.fontSize -= 10;
			//Drawing unlock date
			this.drawText(data.getUnlockDateString(), this._desc.x + 8, alignY.down, this._desc.width - 16, 'center');
			this.changeTextColor(this.normalColor());
		}
		
		this.contents.fontSize += 10;
	}
}

//===============================================================================================
// Info Window
//===============================================================================================
function Window_AchievInfo () {
	this.initialize.apply(this, arguments);
}

Window_AchievInfo.prototype = Object.create(Window_Base.prototype);
Window_AchievInfo.prototype.constructor = Window_AchievInfo;

Window_AchievInfo.prototype.initialize = function(){
	var width = 408;
	var height = 468;
	var x = Math.round((Graphics.width - width)/2);
	var y = Math.round((Graphics.height - height)/2);
	this._textMaxWidth = width - 36;
	this._data = null;
	this._lines = 7;
	Window_Base.prototype.initialize.call(this, x, y, width, height);
	this.openness = 0;
}

Window_AchievInfo.prototype.update = function(){
	Window_Base.prototype.update.call(this);
	if (this.isOpen()){
		var scene = SceneManager._scene;
		if (scene._itemWindow && scene._itemWindow.active){
			this.close();
			scene._itemWindow.refreshMin();
		}
	}
}

Window_AchievInfo.prototype.refresh = function(openning){
	if (this.isOpen() || openning){
		this.contents.clear();
		this.drawContents();
	}
}

Window_AchievInfo.prototype.refreshMin = function(isUnlock){
	if (this._data && this._data.isPlaytimeRequired() || isUnlock){
		this.refresh();
	}
}

Window_AchievInfo.prototype.reStyle = function(){
	this.reSize();
	this.rePosition();
}

Window_AchievInfo.prototype.reSize = function(){
	this.height = this._lines * this.lineHeight() - 18;
}

Window_AchievInfo.prototype.rePosition = function(){
	this.y = (Graphics.height - this.height)/2;
}

Window_AchievInfo.prototype.open = function(achievement){
	this.setData(achievement);
	Window_Base.prototype.open.call(this);
	this.refresh(true);
}

Window_AchievInfo.prototype.setData = function(data){
	this._data = data ? data : null;
}

Window_AchievInfo.prototype.drawContents = function(){
	if (this._data){
		this._lines = 6;
		var name, description, iconBoxWidth, secretLines;
		var achiev = this._data;
		var LH = this.lineHeight();
		if (achiev.isSecret()){
			var fontSize = this.contents.fontSize - 6;
			var maxWidth = this._textMaxWidth;
			var sDesc = SMO.AM.wrapText(SMO.AM.Texts.secretAchievDesc, maxWidth, fontSize);
			secretLines = sDesc.split('\n');
			secretLines = secretLines.length + 1;
			this._lines = secretLines.clamp(3, 7);
			this.contents.fontSize -= 6;
			this._lockFontState = true;
			this.drawTextEx(sDesc, 0, 0);
			this._lockFontState = false;
			this.contents.fontSize += 6;
			this.reStyle();
			return;
		}
		
		//Draw achievement's icon
		iconBoxWidth = 0;
		if (achiev.iconIndex > -1){
			iconBoxWidth = Window_Base._iconWidth + 6;
			this.drawIcon(achiev.iconIndex, 0, 0);
		}

		//Draw name
		name = achiev.isUnlocked() ? achiev.Name : achiev.name;
		this.drawText(name, iconBoxWidth, 0, this.width - iconBoxWidth, 'left');
		this.drawHorzLine(Math.round(LH/2));
		this.contents.fontSize -= 6;
		this._lockFontState = true;

		//Draw description
		description = achiev.isUnlocked() ? achiev.Description : achiev.description;
		description = SMO.AM.wrapText(description, this._textMaxWidth, this.contents.fontSize);
		this.drawTextEx(description, 0, LH);
		var txtOffset = SMO.AM.Texts.requirements ? 0 : -6;
		this.drawHorzLine(LH * 4 + txtOffset);

		//Draw status
		this.drawAchievStatus();

		//Draw requirements
		this.drawRequirements();
		this.drawHorzLine(LH * (4 + this._reqLines));

		//Draw rewards
		this.drawRewards();
		this._lockFontState = false;
		this.contents.fontSize += 6;

		//Resize and reposition window
		this.reStyle();
	}
}

Window_AchievInfo.prototype.drawIcon = function(iconIndex, x, y) {
    var bitmap = ImageManager.loadSystem('IconSet');
    var pw = Window_Base._iconWidth;
    var ph = Window_Base._iconHeight;
    var sx = iconIndex % 16 * pw;
    var sy = Math.floor(iconIndex / 16) * ph;
    this.contents.blt(bitmap, sx, sy, pw, ph, x + 2, y, pw - 4, ph - 4);
};

Window_AchievInfo.prototype.drawAchievStatus = function(){
	var item = this._data;
	if (item.isUnlocked()){
		var text = item.getUnlockDateString();
	} else {
		var text = SMO.AM.Texts.locked;
	}
	var y = this.lineHeight() * 4 - 20;
	var color = item.isUnlocked() ? SMO.AM.Texts.unlockedColor : this.systemColor();
	this.changeTextColor(color);
	this.drawText(text, 0, y, this._textMaxWidth, 'center');
	this.changeTextColor(this.normalColor());
}

Window_AchievInfo.prototype.drawRequirements = function(){
	var req, y2, requirements, text, align, iconX;;
	var values, currentValue, isMet, isFixedValue;
	var LH        = this.lineHeight();
	var y1        = LH * 4  + 16;
	var maxWidth  = this._textMaxWidth;
	var achiev    = this._data;
	var padding   = 12;                     //half distance between two columns
	var colWidth  = maxWidth/2 - padding;   //column width
	var col2_x    = colWidth + padding * 2; //initial X for the column on the right

	this._reqLines = 0;
	this._column = 1;
	if (SMO.AM.Texts.requirements){
		//Drawing "Requirements:" text
		this.changeTextColor(this.systemColor());
		this.drawText(SMO.AM.Texts.requirements, 0, y1, maxWidth, 'center');
		this.changeTextColor(this.normalColor());
		this._reqLines++;
		this._lines++;
	}	
	this.contents.fontSize = 18;//22 -> 18
	
	requirements = achiev.requirements;
	if (requirements.length === 0){
		//Drawing "None" text
		this.drawText(SMO.AM.Texts.none, 0, y1 + LH * this._reqLines, maxWidth, 'center')
		this._reqLines++;
		this._lines++;
		this.contents.fontSize = 22;
		return;
	}

	//Drawing Requirements
	for (var r = 0; r < requirements.length; r++){
		req = requirements[r];
		values = SMO.AM.getRequirementValues(req, achiev);
		isMet = achiev.isUnlocked() || values.state;
		isFixedValue = isMet && req.comparison === '>=';

		currentValue = isFixedValue ? values.finalValue : values.currentValue;
		iconIndex = values.iconIndex;
		text = values.name;

		if (isMet){this.changeTextColor(SMO.AM.Texts.unlockedColor)};

		if (req.alias){
			text = req.alias;
			text = this.convertAliasCodes(text, values.currentValue, values.finalValue);
			iconIndex = req.aliasIcon;
		} else if (!['switch', 'party member'].contains(req.type)){
			text += ' ' + currentValue + '/' + values.finalValue;
		}

		y2         = y1 + LH * this._reqLines;
		align      = requirements.length > 1 ? 'left' : 'center';
		iconSize   = iconIndex > -1 ? Window_Base._iconWidth + 4 : 0;

		if (this._column === 1){
			//Column on the left
			if (iconSize){
				iconX = requirements.length > 1 ? 0 : (maxWidth - iconSize - SMO.AM.textWidthEx(text, this.contents.fontSize, true))/2;
				this.drawIcon(iconIndex, iconX, y2);
			}
			this.drawText(text, iconSize, y2, maxWidth - iconSize, align);
			this._lines++;
			this._reqLines++;
			this._column++;
		} else {
			//Column on the right
			if (iconSize){
				this.drawIcon(iconIndex, col2_x, y2 - LH);
			}
			this.drawText(text, col2_x + iconSize, y2 - LH, colWidth - iconSize, 'left');
			this._column = 1;
		}
		this.changeTextColor(this.normalColor());
	}
	this.contents.fontSize = 22;
}

Window_AchievInfo.prototype.convertAliasCodes = function(text, value1, value2){
	value1 = Number(value1);
	value2 = Number(value2);
	text = text.replace(/\\value1/g, value1);//old versions
	text = text.replace(/\\value2/g, value2);//old versions
	text = text.replace(/<CurrentValue>/g, value1);
	text = text.replace(/<RequiredValue>/g, value2);
	return text;
}

Window_AchievInfo.prototype.drawRewards = function(){
	var y2, reward, itemId, amount, text, align;
	var iconIndex, iconSize, iconX;
	var txtOffset = SMO.AM.Texts.rewards ? 0 : 8;
	var rewards  = this._data.rewards;
	var LH       = this.lineHeight();
	var y1       = LH  * (4 + this._reqLines) + 14 + txtOffset;
	var maxWidth = this._textMaxWidth; 
	var padding  = 12;                   //half distance between two columns
	var col2_x   = maxWidth/2 + padding; //initial X for the column on the right

	this._rewLines = 0;
	this._column = 1;
	if (SMO.AM.Texts.rewards){
		//Drawing "Rewards:" text
		this.changeTextColor(this.systemColor());
		this.drawText(SMO.AM.Texts.rewards, 0, y1, maxWidth, 'center');
		this.changeTextColor(this.normalColor());
		this._rewLines++;
		this._lines++;
	}
	this.contents.fontSize = 18;//22 -> 18

	if (rewards.length === 0 && SMO.AM.Texts.none){
		//Drawing "None" text
		this.drawText(SMO.AM.Texts.none, 0, y1 + LH, maxWidth, 'center');
		this._rewLines++;
		this._lines++;
	} else {
		for (var r = 0; r < rewards.length; r++){
			reward = rewards[r];
			itemId = reward.itemId;
			amount = reward.amount;
			switch(reward.type){
			case 'custom(advanced)':
				text = 'Custom';
				iconIndex = -1;
				break;
			case 'gold':
				text = amount;
				iconIndex = SMO.AM.Icons.gold;
				break;
			case 'item':
				text = $dataItems[itemId] ? $dataItems[itemId].name : '???';
				iconIndex = $dataItems[itemId] ? $dataItems[itemId].iconIndex : -1;
				break;
			case 'weapon':
				text = $dataWeapons[itemId] ? $dataWeapons[itemId].name : '???';
				iconIndex = $dataWeapons[itemId] ? $dataWeapons[itemId].iconIndex : -1;
				break;
			case 'armor':
				text = $dataArmors[itemId] ? $dataArmors[itemId].name : '???';
				iconIndex = $dataArmors[itemId] ? $dataArmors[itemId].iconIndex : -1;
				break;
			}

			if (!['custom(advanced)','gold'].contains(reward.type)){
				text += ' x ' + amount;
			}

			if (reward.alias){
				text = reward.alias;
				iconIndex = reward.aliasIcon;
			}

			iconSize  = iconIndex > -1 ? Window_Base._iconWidth + 4 : 0;
			align     = rewards.length > 1 ? 'left' : 'center';
			y2        = y1 + LH * this._rewLines;
			
			if (this._column === 1) {
				//Column on the left
				if (iconSize){
					iconX = rewards.length > 1 ? 0 : (maxWidth - SMO.AM.textWidthEx(text, this.contents.fontSize, true) - Window_Base._iconWidth)/2;
					this.drawIcon(iconIndex, iconX, y2);
				}
				this.drawText(text, iconSize, y2, maxWidth - iconSize, align);
				this._rewLines++;
				this._lines++;
				this._column++;
			} else {
				//Column on the right
				if (iconSize){
					this.drawIcon(iconIndex, col2_x, y2 - LH);
				}
				this.drawText(text, col2_x + iconSize, y2 - LH, maxWidth/2 - iconSize, 'left');
				this._column = 1;
			}		
		}
	}
	this.contents.fontSize += 4;
}

Window_AchievInfo.prototype.drawHorzLine = function(y) {
    var lineY = y + this.lineHeight() / 2 - 1;
    this.contents.paintOpacity = 48;
    this.contents.fillRect(0, lineY, this.contentsWidth(), 2, this.normalColor());
    this.contents.paintOpacity = 255;
};

Window_AchievInfo.prototype.resetFontSettings = function(){
	if (this._lockFontState) return;
	this.contents.fontFace = this.standardFontFace();
   	this.contents.fontSize = this.standardFontSize();
   	this.resetTextColor();
}

//===============================================================================================
// Sort Option Sprite
//===============================================================================================
function Sort_Option () {
	this.initialize.apply(this, arguments);
}

Sort_Option.prototype = Object.create(Sprite_Button.prototype);
Sort_Option.prototype.constructor = Sort_Option;

Sort_Option.prototype.initialize = function(){
	Sprite_Button.prototype.initialize.call(this);
	this._cellHeight = SMO.AM.Sort.cellHeight;
	this._options = SMO.AM.Sort.options;
	this._selected = $gameSystem.achievs.sortType;
	this._selecting = this._selected;

	var width = SMO.AM.Sort.width;
	var height = this._cellHeight * (this._options.length + 1);
	this.x = SMO.AM.Sort.x;
	this.y = SMO.AM.Sort.y;
	this._open = false;
	this.bitmap = new Bitmap(width, height);
	this.drawSortBody();
	this.setClickHandler(this.onClick.bind(this));
}

Sort_Option.prototype.drawSortBody = function(){
	this.bitmap.clear();
	this.bitmap.fontSize = 22;
	var LH = this._cellHeight;
	var width = this.bitmap.width;
	var height = this._open ? this._cellHeight * (this._options.length + 1) : LH;
	var borderSize = 2;
	this.bitmap.drawRectS(0, 0, width, height, borderSize, null, 'rgba(0,0,0,0.8)');
	this.bitmap.drawText(this._options[this._selected].symbol, 6, 0, width - 12 - 18, LH,'left');
	if (this._open) {
		this.bitmap.drawTriangleS(width - 15, LH/2 + 5, 15, 10, 'up', '#FFFFFF');
		for (var i = 0; i < this._options.length; i++){
			if (this._selecting === i){
				this.bitmap.drawRectS(0, LH * (i + 1), width, this._cellHeight, 2, SMO.AM.Texts.selectorColor, 'rgba(0,0,0,0)');
			} else {
				this.bitmap.fillRect(4, LH * (i + 1), width - 8, 1, 'rgba(255,255,255,0.5)');
			}
			this.bitmap.drawText(this._options[i].symbol, 6, LH * (i + 1), width - 12, LH,'left');
		}
	} else {
		this.bitmap.drawTriangleS(width - 15, LH/2 - 3, 15, 10, 'down', '#FFFFFF');
	}
}

Sort_Option.prototype.onClick = function(index){
	if (SceneManager._scene._editMode) return;
	var x = TouchInput._x - this.x;
	var y = TouchInput._y - this.y;
	var scene = SceneManager._scene;
	var iw = scene._itemWindow;
	if (this._open){
		index = index > -1 ? index : Math.floor(y/this._cellHeight) - 1;
		var changed = false;
		if (index > -1 && this._selected != index && this._options[index]){
			this._selected = index;
			this._selecting = index;
			changed = true;
		}
		this._open = false;
		if (iw){
			if (changed){
				//changing the order of the items on the item window
				iw._sortType = this._selected;
				$gameSystem.achievs.sortType = this._selected;
				SoundManager.playOk();
				iw.refresh();
			} else {
				this._selecting = this._selected;
				SoundManager.playCancel();
				iw.refreshMin();
			}
			iw.activate();
		}
		this.drawSortBody();
	} else {
		if (y <= this._cellHeight){
			SoundManager.playCursor();
			iw.deactivate();
			this._open = true;
			this.drawSortBody();
		}
	}
}

//===============================================================================================
// Sprite Interactive Prototype
// Button types:
// 0 -> common button, the function "onClick" is called when clicked on this button.
// 1 -> select button, the function "onClick" is called when a new value is selected.
// 2 -> text input, the function "onClick" is called when "Ok" (Enter) is pressed.
//===============================================================================================
function Sprite_InteractiveP () {
	this.initialize.apply(this, arguments);
}

Sprite_InteractiveP.prototype = Object.create(Sprite_Button.prototype);
Sprite_InteractiveP.prototype.constructor = Sprite_InteractiveP;

function SI_Button(Data){
	this.initMembers.apply(this, arguments);
}

SI_Button.prototype = Object.create(null);
SI_Button.prototype.constructor = SI_Button;

SI_Button.prototype.initMembers = function(Data){
	var typeOptions = [0, 1, 2];
	var designOptions = ['rect', 'round'];
	var filterOptions = ['number', 'letter', 'alphanum'];
	this.symbol = Data.symbol || '';
	this.type = typeOptions.contains(Data.type) ? Data.type : 0;
	this.text = Data.text || '';
	this.fontSize = Data.fontSize || 0;
	this.textOffset = Data.textOffset ? Data.textOffset.length > 1 ? Data.textOffset : Data.textOffset.concat([0]) : [0, 0];
	this.textColor = Data.textColor || '#FFFFFF';
	this.x = Data.x || 0;
	this.y = Data.y || 0;
	this.width = Data.width || 0;
	this.height = Data.height || 0;
	this.borderSize = Data.borderSize || 2;
	this.borderColor = Data.borderColor || '#FFFFFF';
	this.backColor = Data.backColor || 'rgba(0,0,0,0.5)';
	this.img = Data.img || null;
	this.enabled = Data.enabled || true;
	this.onClick = Data.onClick || '';
	this.bind = Data.bind || '';
	this.selectedValue = Data.selectedValue || '';
	this.lastValue = Data.lastValue || '';
	//only type 0
	this.design = designOptions.contains(Data.design) ? Data.design : 'rect';
	//only type 1
	this.options = Data.options || ['Empty'];
	this.open = Data.open  || false;
	//only type 2
	this.cursorIndex = Data.cursorIndex || 0;
	this.maxDigits = Data.maxDigits || 10;
	this.valueFilter = filterOptions.contains(Data.valueFilter) ? Data.valueFilter : '';
	this.allowSpace = Data.allowSpace === undefined ? true : Data.allowSpace;
	this.allowPaste = Data.allowPaste === undefined ? true : Data.allowPaste;
}

SI_Button.prototype.acceptInput = function(keyCode, specialKeys){
	var filter = this.valueFilter;
	if (!filter) return true;
	if (filter === 'number'){
		if (!(specialKeys.shift || specialKeys.ctrl || specialKeys.alt) && keyCode >= 48 && keyCode <= 57){
			return true;
		}
	} else if (filter === 'letter'){
		if (!(specialKeys.ctrl || specialKeys.alt) && keyCode >= 65 && keyCode <= 90){
			return true;
		}
	} else if (filter === 'alphanum'){
		if (keyCode >= 48 && keyCode <= 57) {
			if(!(specialKeys.shift || specialKeys.ctrl || specialKeys.alt)){
				return true;
			}
		} else if (keyCode >= 65 && keyCode <= 90){
			if(!(specialKeys.ctrl || specialKeys.alt)){
				return true;
			}
		}
	}
	return false;
}

SI_Button.prototype.acceptPasteValue = function(str){
	if (!this.allowPaste) return false;
	var filter = this.valueFilter;
	var checkSpace = !this.allowSpace;
	if (!filter && checkSpace) return true;
	var keyCode;
	for (var v = 0; v < str.length; v++){
		keyCode = str.charCodeAt(v);
		if (filter){
			if (filter === 'number'){
				if (!(keyCode >= 48 && keyCode <= 57)){
					return false;
				}
			} else if (filter === 'letter'){
				if (!(keyCode >= 65 && keyCode <= 90) && !(keyCode >= 97 && keyCode <= 122)){
					return false;
				}
			} else if (filter === 'alphanum'){
				if (!(keyCode >= 48 && keyCode <= 57) && !(keyCode >= 65 && keyCode <= 90) &&
					!(keyCode >= 97 && keyCode <= 122)){
					return false;
				}
			}
		}
		if (!checkSpace){
			if (keyCode === 32){
				return false;
			}
		}
	}
	return true;
}

SI_Button.prototype.moveCursor = function(value){
	if (this.type === 2 && this._container){
		this._container.moveCursorSprite(value);
	}
}

SI_Button.prototype.redraw = function(){
	if (this._container && this._container.bitmap){
		var x = this.x - this._container.bitmap.x;
		var y = this.y - this._container.bitmap.y;
		this._container.bitmap.clearRect(x, y, this.width, this.height);
		this._container.drawButton(this);
	}
}

Sprite_InteractiveP.prototype.initialize = function(){
	Sprite_Button.prototype.initialize.call(this);
	this._buttons = {};
	this._bIndex = 0;
	this._waitInput_Button = null;
	this._textInput_Button = null;
	this._callOnClick = true;
	this._cancelClick = false;
	this._movable = true;
	this._grabSpot = null;
	this._grabBox = null;
	this.setClickHandler(this.onClick.bind(this));
}

Sprite_InteractiveP.prototype.onClick = function(){
	if (this._cancelClick) {
		this._cancelClick = false;
		return;
	}
	var symbol = this.getButtonOnClick();
	if (!symbol) {
		if (this._waitInput_Button && !this.isGrabbing()){
			this._waitInput_Button = null;
			SoundManager.playCancel();
		}
		return;
	};

	var button = this._buttons[symbol];
	if (button && button.enabled){
		if (button['defaultCode']){
			button['defaultCode'](symbol);
		}
		if (button['onClick'] && this._callOnClick){
			if (button.bind){
				var bond = this._buttons[button.bind];
				if (bond){
					button['onClick'](bond.selectedValue);
				}
			} else {
				button['onClick'](button.selectedValue);
			}
		}
		this._callOnClick = true;
	} else {
		SoundManager.playBuzzer();
	}
}

Sprite_InteractiveP.prototype.getButtonOnClick = function(){
	var symbol, b;
	var x = TouchInput._x;
	var y = TouchInput._y;

	if (this._waitInput_Button){//If a "select" input is open
		symbol = this._waitInput_Button.symbol;
		b = this._buttons[symbol];
		var w = b.x + b.width;
		var h = b.y + b.height * (b.options.length + 1);
		var index = -1;
		if (x >= b.x && x <= w && y >= b.y && y <= h){
			index = Math.floor((y - b.y)/b.height) - 1;
		}
		this._buttons[symbol].selectedValue = b.options[index] || b.selectedValue;
		return symbol;
	} else {//Common buttons
		var buttons = this._buttons;
		for (symbol in buttons){
			b = buttons[symbol];
			if (!b){
				continue;
			}
			if (x >= b.x && x <= (b.x + b.width) && y >= b.y && y <= (b.y + b.height)){
				return symbol;
			}
		}
	}	
	return '';
}

Sprite_InteractiveP.prototype.addButton = function(Button){
	var type = Object.prototype.toString.call(Button);
	if (!Button || type != '[object Object]') return;
	var padding = 4;

	Button = new SI_Button(Button);

	if (!Button.symbol){
		Button.symbol = 'button' + this._bIndex;
		this._bIndex++;
	}

	if (!Button.fontSize){
		Button.fontSize = this.bitmap ? this.bitmap.fontSize : 15;
	}

	if (!Button.width){
		Button.width = this.getButtonDefWidth(Button.text, Button.fontSize);
		//Extra space for the arrow on "select" buttons
		if (Button.type === 1){
			Button.width += 25;
		}
	}

	if (!Button.height){
		Button.height = Button.fontSize + padding * 2;
	}

	/*while (Button.textOffset.length < 2){
		Button.textOffset.push(0);
	}*/

	Button._container = this;

	Button.defaultCode = this.getDefaultCode(Button.type);

	Button.x += this.x;
	Button.y += this.y;
	
	if (Button.type === 1){
		Button.selectedValue = Button.selectedValue === '' ? Button.options[0] : Button.selectedValue;
		Button.lastValue = Button.lastValue === '' ? Button.selectedValue : Button.lastValue;
	}

	this._buttons[Button.symbol] = Button;
}

Sprite_InteractiveP.prototype.deleteButton = function(symbol){
	if (this._waitInput_Button && this._waitInput_Button.symbol === symbol){
		this._waitInput_Button = null;
	}
	if (this._buttons[symbol]) {
		delete this._buttons[symbol];
		this.refresh();
	}
}

Sprite_InteractiveP.prototype.update = function(){
	this.updateGrabbing();
	Sprite_Button.prototype.update.call(this);
	//Select input (list)
	if (this._waitInput_Button){
		if (TouchInput.isCancelled() || Input.isTriggered('cancel') || 
			(TouchInput.isTriggered() && !this.isClickOnMe())){
			this.onClick();
		}
	//Text input
	} else if (this._textInput_Button){
		if (TouchInput.isCancelled() || Input.isTriggered('cancel') 
			|| TouchInput.isTriggered() || Input.isTriggered('ok')){
			if (Input.isTriggered('ok') && this._textInput_Button.onClick){
				this._textInput_Button.onClick(this._textInput_Button.selectedValue);
			}
			this._textInput_Button._isCursor = false;
			this._textInput_Button = null;
			Sprite_InteractiveP._typing = false;
			Sprite_InteractiveP._button = null;
			Sprite_InteractiveP.loadDefaultKeyCodes();
			this.deleteButtonCursor();
			this.refresh();
		} else if (Input.isRepeated('left')){
			this.moveCursorSprite(-1);
		} else if (Input.isRepeated('right')){
			this.moveCursorSprite(1);
		}
		this.updateTextInput();
	}
}

Sprite_InteractiveP.prototype.isClickOnMe = function(){
	var x = TouchInput._x;
	var y = TouchInput._y;
	if (x >= this.x && x <= this.x + this.width && y >= this.y && y <= this.y + this.height){
		return true;
	}
	return false;
};

Sprite_InteractiveP.prototype.createCursorSprite = function(Button){
	if (!this._cursor && Button){
		this._cursor = new Sprite(new Bitmap(2, Button.height - Button.borderSize * 2 - 4));
		this._cursor._fadeState = 0;
		this._cursor._fadeCounter = 0;
		var fadeWait = 30;
		var x = Button.x - this.x;
		var y = Button.y - this.y;
		this._cursor.update = function(){
			Sprite.prototype.update.call(this);
			if (this._fadeState){
				if (this.alpha >= 1){
					this._fadeCounter++;
					if (this._fadeCounter >= fadeWait){
						this._fadeCounter = 0;
						this._fadeState = 0;
					}
				} else {
					this.alpha += 0.05;
				}
			} else {
				if (this.alpha <= 0){
					this._fadeCounter++;
					if (this._fadeCounter >= fadeWait - 20){
						this._fadeCounter = 0;
						this._fadeState = 1;
					}
				} else {
					this.alpha -= 0.05;
				}
			}
		}
		this._cursor.bitmap.fillRect(0, 0, 2, this._cursor.bitmap.height, '#FFFFFF');
		Button.cursorIndex = Button.selectedValue.length;
		var textWidth = this.getButtonDefWidth(Button.selectedValue, Button.fontSize, true);
		var maxX = x + Button.width - Button.borderSize - 4;
		this._cursor.x = Math.min(x + Button.borderSize + 2 + textWidth, maxX);
		this._cursor.y = y + Button.borderSize + 2;
		this.addChild(this._cursor);
	}
}

Sprite_InteractiveP.prototype.deleteButtonCursor = function(){
	if (this._cursor){
		this.removeChild(this._cursor);
		this._cursor = null;
	}
}

Sprite_InteractiveP.prototype.moveCursorSprite = function(value){
	if (this._cursor){
		value = value || 0;
		var Button = this._textInput_Button;
		var x = Button.x - this.x;
		var y = Button.y - this.y;
		var newIndex = Button.cursorIndex + value;
		Button.cursorIndex = newIndex.clamp(0, Button.selectedValue.length);
		var substr = Button.selectedValue.substr(0, Button.cursorIndex);
		var textWidth = this.getButtonDefWidth(substr, Button.fontSize, true);
		var maxX = x + Button.width - Button.borderSize - 4;
		this._cursor.x = Math.min(x + Button.borderSize + 2 + textWidth, maxX);
		this._cursor.alpha = 0.9;
		this._cursor._fadeState = 1;
		this._cursor._fadeCounter = -10;
	}
}

Sprite_InteractiveP.prototype.updateGrabbing = function(){
	if (!this.isMovable()) return;
	this._cancelClick = false;
	if (this.isGrabbing() && !this._grabbing) return;
	if (this.visible && (TouchInput.isTriggered() && this.isClickOnGrabBox()) || this.isGrabbing()){
		if (TouchInput.isPressed()){
			this._grabSpot = this._grabSpot || { x: TouchInput._x - this.x, y: TouchInput._y - this.y, lastX: this.x, lastY: this.y};
			this._grabbing = true;
			
			var x = TouchInput._x - this._grabSpot.x;
			var y = TouchInput._y - this._grabSpot.y;
			this.x = x.clamp(-this.bitmap.width/2, Graphics.width - this.bitmap.width/2);
			this.y = y.clamp(0, Graphics.height - this.bitmap.height/2);
		} else {
			this.onRelease(this._grabSpot);
			this._grabSpot = null;
		}
	}
};

Sprite_InteractiveP.prototype.isClickOnGrabBox = function(){
	if (this._grabBox){
		var GB = this._grabBox;
		var x = TouchInput._x;
		var y = TouchInput._y;
		var realX = this.x + GB.x;
		var realY = this.y + GB.y;
		if (x >= realX && x <= realX + GB.width && y >= realY && y <= realY + GB.height){
			return true;
		}
	}
	return false;
}

Sprite_InteractiveP.prototype.isClickOnButton = function(Button){
	if (Button){
		var x = TouchInput._x;
		var y = TouchInput._y;
		var b = Button;
		if (x >= b.x && x <= b.x + b.width && y >= b.y && y <= b.y + b.height){
			return true;
		}
	}
	return false;
}

Sprite_InteractiveP.prototype.isGrabbing = function(){
	return !!this._grabSpot;
}

Sprite_InteractiveP.prototype.onRelease = function(gs){
	var b, moved;
	moved = this.x != gs.lastX || this.y != gs.lastY;
	this._grabbing = false;
	if (moved){
		for (var symbol in this._buttons){
			b = this._buttons[symbol];
			if (!b) {
				continue;
			}
			b.x += this.x - gs.lastX;
			b.y += this.y - gs.lastY;
		}
		this._cancelClick = true;
		this.refresh();
	}
}

Sprite_InteractiveP.prototype.getButtonDefWidth = function(text, fontSize, noPadding){
	if (!this.bitmap) return 0;
	if (!text) return 0;
	var padding = noPadding ? 0 : 6;
	var textWidth = SMO.AM.textWidthEx(text, fontSize, true) + padding * 2;
	return Math.ceil(textWidth);
}

Sprite_InteractiveP.prototype.getDefaultCode = function(type){
	if (type === 2){
		return this.textInput.bind(this);
	} else if (type === 1){
		return this.selectInput.bind(this);
	}
	return '';
}

Sprite_InteractiveP.prototype.textInput = function(symbol){
	if (!this._textInput_Button || (this._textInput_Button.symbol != symbol && this._buttons[symbol])){
		Sprite_InteractiveP.getCustomKeyCodes();
		Sprite_InteractiveP._button = this._buttons[symbol];
		this._textInput_Button = this._buttons[symbol];
		this._buttons[symbol]._isCursor = true;
		this.createCursorSprite(this._buttons[symbol]);
		Sprite_InteractiveP._typing = true;
		this._callOnClick = false;
		this.refresh();
	}
}

Sprite_InteractiveP.prototype.selectInput = function(symbol){
	if (this._waitInput_Button){
		//Close the selecting box
		this._buttons[symbol].open = false;
		//Clear the selected button
		this._waitInput_Button = null;
		if (this._buttons[symbol].lastValue === this._buttons[symbol].selectedValue){
			//Jump the "onClick" function
			this._callOnClick = false;
			SoundManager.playCancel();
		}
		this._buttons[symbol].lastValue = this._buttons[symbol].selectedValue;
	} else {
		//Open the selecting box
		this._buttons[symbol].open = true;
		//Jump the "onClick" function
		this._callOnClick = false;
		//Save the selected button
		this._waitInput_Button = this._buttons[symbol];
		SoundManager.playCursor();
	}
	this.refresh();
}

Sprite_InteractiveP.prototype.drawAllButtons = function(){
	if (this.bitmap){
		var Button, b;
		for (b in this._buttons){
			Button = this._buttons[b];
			if (!Button){
				continue;
			}
			this.drawButton(Button);
		}
	}
}

Sprite_InteractiveP.prototype.drawButton = function(Button){
	var x, y, width, height, fx, fy, padding, allHeight, text, maxWidth;
	x = Button.x - this.x;
	y = Button.y - this.y;
	width = Button.width;
	height = Button.height;
	fx = Button.textOffset[0];
	fy = Button.textOffset[1];
	this.bitmap.fontSize = Button.fontSize;
	this.bitmap.textColor = Button.textColor;
	padding = 5;
	maxWidth = width - Button.borderSize * 2 - padding;
	if (maxWidth < 6){
		maxWidth = width - Button.borderSize * 2;
	}
	if (Button.type === 2){
		var darker = false;
		if (Button.selectedValue){
			text = Button.selectedValue;
		} else if (Button._isCursor){
			text = '';
		} else {
			darker = true;
			text = Button.text;
		}
		this.bitmap.drawRectS(x, y, width, height, Button.borderSize, Button.borderColor, Button.backColor, Button.img);
		this.bitmap.drawText(text, x + Button.borderSize + 2 + fx, y + fy, maxWidth, height, 'left');
		if (darker){
			this.bitmap.fillRect(x + Button.borderSize, y + Button.borderSize, width - Button.borderSize * 2, height - Button.borderSize * 2, 'rgba(0,0,0,0.5)');
		}
	} else if (Button.type === 1){//"select" input type
		if (Button.open){
			allHeight = height * (Button.options.length + 1);
			//Drawing background and arrow
			this.bitmap.drawRectS(x, y, Button.width, allHeight, Button.borderSize, Button.borderColor, Button.backColor, Button.img);
			this.bitmap.drawTriangleS(x + width - 15, y + 14, 15, Button.height - 16, 'up', '#FFFFFF');
			//Drawing input options
			for (var o = 0; o < Button.options.length; o++){
				this.bitmap.fillRect(x + 4, y + height * (o + 1), width - 8, 1, 'rgba(255,255,255,0.5)');
				this.bitmap.drawText(Button.options[o], x + padding + fx, y + height * (o + 1) + fy, maxWidth, height,'left');
			}
		} else {
			//Drawing background and arrow
			this.bitmap.drawRectS(x, y, width, height, Button.borderSize, Button.borderColor, Button.backColor, Button.img);
			this.bitmap.drawTriangleS(x + width - 15, y + 8, 15, Button.height - 16, 'down', '#FFFFFF');
		}
		text = Button.selectedValue;
		this.bitmap.drawText(text, x + Button.borderSize + padding + fx, y + fy, maxWidth, height, 'left');
	} else {
		if (Button.design === 'round'){
			this.bitmap.drawRectSR(x, y, width, height, Button.borderSize, Button.borderColor, Button.backColor, Button.img);
		} else {
			this.bitmap.drawRectS(x, y, width, height, Button.borderSize, Button.borderColor, Button.backColor, Button.img);
		}
		this.bitmap.drawText(Button.text, x + Button.borderSize + padding + fx, y + fy, maxWidth, height, 'left');
		//Turning it darker in case it's not enabled
		if (!Button.enabled){
			if (Button.design === 'round'){
				this.bitmap.drawRectSR(x, y, width, height, 0, null, 'rgba(0,0,0,0.5)');
			} else {
				this.bitmap.fillRect(x, y, width, height, 'rgba(0,0,0,0.5)');						
			}
		}
	}
}

Sprite_InteractiveP.prototype.setButtonAttribute = function(symbol, att, value){
	if (this._buttons[symbol]){
		this._buttons[symbol][att] = value;
	}
}

Sprite_InteractiveP.prototype.show = function(){
	this.setupSelectButtons();
	this.visible = true;
}

Sprite_InteractiveP.prototype.setupSelectButtons = function(){
	var symbol, b;
	for (symbol in this._buttons){
		b = this._buttons[symbol];
		if (b.type === 1 && b['onClick']){
			b['onClick'](b.selectedValue);
		}
	}
}

Sprite_InteractiveP.prototype.hide = function(){
	this.visible = false;
}

Sprite_InteractiveP.prototype.isMovable = function(){
	return this._grabBox && this._movable;
}

Sprite_InteractiveP.prototype.setMovable = function(state){
	this._movable = state;
}

Sprite_InteractiveP.prototype.setGrabBox = function(x, y, width, height){
	this._grabBox = {
		x: x,
		y: y,
		width: width,
		height: height
	};
}

Sprite_InteractiveP.prototype.drawText = function(text, x, y, maxWidth, maxHeight, align){
	if (this.bitmap){
		this.bitmap.drawText(text, x, y, maxWidth, maxHeight, align);
	}
}

Sprite_InteractiveP.prototype.refresh = function(){
	if (this.bitmap){
		this.bitmap.clear();
		this.drawAllButtons();
	}
}

Sprite_InteractiveP.PressedKeys = {};
Sprite_InteractiveP._typing = false;
Sprite_InteractiveP._button = null;

//Document - On Paste
Sprite_InteractiveP.onPaste = document.onpaste;
document.onpaste = function (event){
	if (Sprite_InteractiveP._typing){
		var text = event.clipboardData.getData("Text");
		if (text){
			var SI = Sprite_InteractiveP;
			var Button = SI._button;
			var value = Button.selectedValue;
			var maxEntries = Button.maxDigits ? Button.maxDigits - value.length : text.length;
			fittingText = text.substr(0, maxEntries);
			if (Button.acceptPasteValue(fittingText)){
				var index = Button.cursorIndex;
				var str1 = value.substr(0, index);
				var str2 = value.substr(index);
			
				Button.selectedValue = str1 + fittingText + str2;
				Button.redraw();
				Button.moveCursor(fittingText.length);
			}
		}
	} else if (Sprite_InteractiveP.onPaste) {
		Sprite_InteractiveP.onPaste.call(this, event);
	}
}

//KeyMapper - key handling
Sprite_InteractiveP.DEFAULT_KEY_CODES = {};
Sprite_InteractiveP.SPECIAL_KEY_CODES = {
	8: 'backspace',
	32: 'space',
	35: 'end',
	36: 'home',
	46: 'delete',
	186: 'ç',
	187: '=',
	188: ',',
	189: '-',
	190: '.',
	191: ';',
	192: '\'',
	193: '/',
	219: '´',
	220: ']',
	221: '[',
	222: '~',
	226: '\\'
}

Sprite_InteractiveP.SPECIAL_SIGNS = {
	'54b': '¨',
	219: '´',
	'219b': '`',
	222: '~',
	'222b': '^'
};

Sprite_InteractiveP.getCustomKeyCodes = function(){
	Sprite_InteractiveP.saveDefaultKeyCodes();
	//Numbers
	for (var c = 48; c < 58; c++){
		Input.keyMapper[c] = String.fromCharCode(c);
	}
	//Letters - (uppercase 65 -> 90) - (lowercase 97 -> 122)
	for (c = 65; c < 91; c++){
		Input.keyMapper[c] = String.fromCharCode(c).toLowerCase();
	}

	for (c in Sprite_InteractiveP.SPECIAL_KEY_CODES){
		Input.keyMapper[c] = Sprite_InteractiveP.SPECIAL_KEY_CODES[c];
	}
}

Sprite_InteractiveP.saveDefaultKeyCodes = function(){
	for(var k in Input.keyMapper){
		Sprite_InteractiveP.DEFAULT_KEY_CODES[k] = Input.keyMapper[k];
	}
}

Sprite_InteractiveP.loadDefaultKeyCodes = function(){
	for(var k in Input.keyMapper){
		if (Sprite_InteractiveP.DEFAULT_KEY_CODES[k]){
			Input.keyMapper[k] = Sprite_InteractiveP.DEFAULT_KEY_CODES[k];
		} else {
			delete Input.keyMapper[k];
		}
	}
	Sprite_InteractiveP.DEFAULT_KEY_CODES = {};
}

//-----------------------------------------------------------------------------------------------
// Input

Sprite_InteractiveP._Input__onKeyDown = Input._onKeyDown;
Input._onKeyDown = function(event){
	Sprite_InteractiveP._Input__onKeyDown.call(this, event);
	if (Sprite_InteractiveP._typing){
		var code = event.keyCode;
		var key = event.key === ' ' ? 'space' : event.key;
		var special = Sprite_InteractiveP.SPECIAL_KEY_CODES;
		if ((code >= 48 && code <= 57) || (code >= 65 && code <= 90) || special[code]){
			Sprite_InteractiveP.PressedKeys[code] = {key:key, shift:event.shiftKey, ctrl:event.ctrlKey, alt:event.altKey};
		}
	}
}

Sprite_InteractiveP._Input__onKeyUp = Input._onKeyUp;
Input._onKeyUp = function(event) {
	Sprite_InteractiveP._Input__onKeyUp.call(this, event);
	var code = event.keyCode;
	var key = event.key;
	var special = Sprite_InteractiveP.SPECIAL_KEY_CODES;
	if ((code >= 48 && code <= 57) || (code >= 65 && code <= 90) || special[code]){
		delete Sprite_InteractiveP.PressedKeys[code];
	}
}

Sprite_InteractiveP._lastSign =  {code:0, key:''};

Sprite_InteractiveP.prototype.updateTextInput = function(){
	var SI = Sprite_InteractiveP;
	var Pressed = SI.PressedKeys;
	for (var k in Pressed){
		var char = Pressed[k].key;
		var fakeChar = Input.keyMapper[k];
		var fakeRepeat = false;
		var specialKeys = {shift: Pressed[k].shift, ctrl: Pressed[k].ctrl, alt:Pressed[k].alt};
		var sign;

		if (char === 'Dead' && SI.SPECIAL_SIGNS[k]){
			if (Input.isTriggered(fakeChar) && SI._lastSign.code != 0){
				sign = Pressed[k].shift ? SI.SPECIAL_SIGNS[k + 'b'] :  SI.SPECIAL_SIGNS[k];
				SI._lastSign.key += sign;
				fakeRepeat = true;
			} else if (Input.isTriggered(fakeChar)){
				SI._lastSign.code = k;
				sign = Pressed[k].shift ? SI.SPECIAL_SIGNS[k + 'b'] :  SI.SPECIAL_SIGNS[k];
				SI._lastSign.key += sign;
			}
		} else {
			SI._lastSign = {code:0, key:''};
		}
		
		if (Input.isRepeated(fakeChar) || fakeRepeat){
			var Button = SI._button;
			var value = Button.selectedValue;
			var index = Button.cursorIndex;
			var maxDigits = Button.maxDigits;
			var filter = Button.valueFilter;
			var moveCursor = 0;
			switch (char){
			case 'Dead':
				if (!filter && fakeRepeat && (!maxDigits || value.length < maxDigits)){
					char = (!maxDigits || value.length + 1 < maxDigits) ? SI._lastSign.key : SI._lastSign.key[0];
					var str1 = value.substr(0, index);
					var str2 = value.substr(index);
					Button.selectedValue = str1 + char + str2;
					SI._lastSign = {code:0, key:''};
					moveCursor = char.length;
				}
				break;
			case 'Backspace':
				index -= 1;
				moveCursor = -1;
			case 'Delete':
				var str1 = value.substr(0, index);
				var str2 = value.substr(index + 1);
				Button.selectedValue = str1 + str2;
				break;
			case 'space':
				if ((!maxDigits || value.length < maxDigits) && Button.allowSpace){
					var str1 = value.substr(0, index);
					var str2 = value.substr(index);
					Button.selectedValue = str1 + ' ' + str2;
					moveCursor = 1;
				}
				break;
			case 'Home':
				moveCursor -= value.length;
				break;
			case 'End':
				moveCursor = value.length;
				break;
			default:
				if (!Pressed[k].ctrl && (!maxDigits || value.length < maxDigits) 
						&& Button.acceptInput(k, specialKeys)){
					var str1 = value.substr(0, index);
					var str2 = value.substr(index);
					Button.selectedValue = str1 + char + str2;
					moveCursor = 1;
				}
			}
			Button.redraw();
			Button.moveCursor(moveCursor);
		}
	}
}

//===============================================================================================
// Edit Mode
//===============================================================================================
function SpriteI_EditAchievs () {
	this.initialize.apply(this, arguments);
}

SpriteI_EditAchievs.prototype = Object.create(Sprite_InteractiveP.prototype);
SpriteI_EditAchievs.prototype.constructor = SpriteI_EditAchievs;

SpriteI_EditAchievs.prototype.initialize = function(){
	Sprite_InteractiveP.prototype.initialize.call(this);
	var width = 200;
	var height = 250;
	this._isButtons = false;
	this._selectedWindow = null;
	this._undoData = [];
	this._redoData = [];
	this.bitmap = new Bitmap(width, height);
	this.x = (Graphics.width - width)/2;
	this.y = (Graphics.height - height)/2;
	this.setGrabBox(0, 0, width, 60);
	this.drawBody();
	this.visible = false;
}

SpriteI_EditAchievs.prototype.turnBig = function(){
	var oldWidth = this.bitmap.width;
	var oldHeight = this.bitmap.height;
	var newWidth = 300;
	var newHeight = 350;
	this.bitmap = new Bitmap(newWidth, newHeight);
	var changeInX = this.bitmap.width - oldWidth;
	var changeInY = this.bitmap.height - oldHeight;
	
	var newX = this._buttons['closeButton'].x + changeInX;
	this.setButtonAttribute('closeButton', 'x', newX);

	newX = this._buttons['selectWindow'].x + changeInX/2;
	this.setButtonAttribute('selectWindow', 'x', newX);

	this.refresh();
}

SpriteI_EditAchievs.prototype.drawBody = function(){
	this.bitmap.clear();
	this.bitmap.fontSize = 28;
	this.bitmap.textColor = '#FFFFFF';
	var width = this.bitmap.width;
	var height = this.bitmap.height;
	var backColor = 'rgba(0,0,0,1)';
	var borderColor = '#FFFFFF';

	//Window's body
	this.bitmap.drawRectS(0, 0, width, height, 2, borderColor, backColor);

	//Window's title
	this.bitmap.fontSize = 15;
	this.drawText('ACHIEVS\' EDITOR', 0, 28, width, 15, 'center');
	this.bitmap.fontSize = 12;
	this.drawText('version 0.2', 0, 44, width, 15, 'center');

	//Data background
	this._dataBox = {
		x: 20,
		y: 100,
		width: width - 40,
		height: height - 110
	}
	var box = this._dataBox;
	this.refreshDataBox();

	if (!this._isButtons){
		//Lock
		var lockButton = {
			symbol:'lockButton',
			text: '',
			x:2,
			y:2,
			width: 20,
			height: 20,
			borderSize:1,
			backColor:'#222222',
			onClick: this._switchLockMode.bind(this)
		}
		this.addButton(lockButton);

		//Undo
		var undoButton = {
			symbol:'undoButton',
			text: 'UNDO',
			x:22,
			y:2,
			width:36,
			heigth:20,
			borderSize:1,
			backColor:'#222222',
			enabled: this._undoData.length > 0,
			onClick: this.undoLastAction.bind(this)
		}
		this.addButton(undoButton);

		//Redo
		var redoButton = {
			symbol:'redoButton',
			text: 'REDO',
			x:58,
			y:2,
			width:36,
			heigth:20,
			borderSize:1,
			backColor:'#222222',
			enabled: this._redoData.length > 0,
			onClick: this.redoLastAction.bind(this)
		}
		this.addButton(redoButton);
	
		//Close
		var closeButton = {
			symbol:'closeButton',
			text: 'X',
			y:2,
			textOffset: [-1],
			fontSize:12,
			textColor:'rgba(255,50,50,1)',
			borderColor:'#FF0000',
			backColor:'rgba(255,0,0,0.5)',
			onClick: this.hide.bind(this)
		}
		closeButton.x = Math.ceil(width - this.getButtonDefWidth(closeButton.text, closeButton.fontSize)) - 2;
		this.addButton(closeButton);

		
		//Change width
		var ChangeWidth = {
			symbol: 'changeWidth',
			type: 2,
			text: 'Window Width',
			fontSize: 15,
			x: box.x + 10,
			y: box.y + 80,
			width: 140,
			borderSize: 1,
			backColor:'rgba(0,0,0,1)',
			//valueFilter: 'number',
			allowSpace: false,
			maxDigits: 4,
			onClick: console.log
		}
		this.addButton(ChangeWidth);

		//Submit (binded with "Change width" button)
		var submit = {
			symbol: 'submit',
			type: 0,
			design: 'round',
			text: 'submit',
			fontSize: 15,
			x: box.x + 50,
			y: box.y + 110,
			width: 60,
			borderColor: '#000099',
			backColor: '#3333FF',
			bind: 'changeWidth',
			onClick: this.changeWindowWidth.bind(this)
		}
		this.addButton(submit);//*/

		//Select window
		var categoryOptions = ['Select window', 'Categories', 'Trophies', 'Menu Title'];
		var achievsOptions = ['Select window', 'Achievements', 'Menu Title', 'Achiev Info'];
		var windowOptions = this.isCategory() ? categoryOptions : SMO.AM.Sort.enabled ? achievsOptions.push('Sort Option') : achievsOptions;
		var SelectWindow = {
			symbol:'selectWindow',
			type:1,
			text: 'Select window',
			fontSize:15,
			x: 30,
			y: 68,
			width:140,
			borderSize:1,
			backColor:'rgba(0,0,0,1)',
			options: windowOptions,
			onClick: this.selectWindow.bind(this)
		}
		this.addButton(SelectWindow);

		this._isButtons = true;
	}
	this.drawAllButtons();

	//Drawing lock circle - outside
	this.bitmap.drawCircle(12, 12, 6, '#FFFFFF');
	if (this.isMovable()){
		//Inside
		this.bitmap.drawCircle(12, 12, 4, '#222222');
	}
}

SpriteI_EditAchievs.prototype.isCategory = function(){
	return SMO.AM.categories.length > 0 && SMO.AM.currentCategory === 'none';
}

SpriteI_EditAchievs.prototype.selectWindow = function(value){
	var scene = SceneManager._scene;
	var itw = scene._itemWindow;
	var trw = scene._trophiesWindow;
	var tiw = scene._titleWindow;
	var inw = scene._infoWindow;
	var so = scene._sortOption || {};	
	switch (value){
	case 'Categories':
		this._selectedWindow = itw;
		itw.alpha = 1; trw.alpha = 0.5; tiw.alpha = 0.5;
		break;
	case 'Trophies':
		this._selectedWindow = trw;
		itw.alpha = 0.5; trw.alpha = 1; tiw.alpha = 0.5;
		break;
	case 'Menu Title':
		this._selectedWindow = tiw;
		itw.alpha = 0.5; trw.alpha = 0.5; tiw.alpha = 1; inw.alpha = 0.2; so.alpha = 0.5; inw._isWindow = false;
		break;
	case 'Achievements':
		this._selectedWindow = itw;
		itw.alpha = 1; tiw.alpha = 0.5; inw.alpha = 0.2; so.alpha = 0.5; inw._isWindow = false;
		break;
	case 'Achiev Info':
		inw._isWindow = true;
		this._selectedWindow = inw;
		itw.alpha = 0.5; tiw.alpha = 0.5; inw.alpha = 1; so.alpha = 0.5;
		break;
	case 'Sort Option':
		this._selectedWindow = so;
		itw.alpha = 0.5; tiw.alpha = 0.5; so.alpha = 1; inw.alpha = 0.2; inw._isWindow = false;
		break;
	default:
		this._selectedWindow = null;
		itw.alpha = 1; trw.alpha = 1; tiw.alpha = 1; inw.alpha = 1; so.alpha = 1; inw._isWindow = true;
	}
	this.refreshDataBox()
	SoundManager.playOk();
}

SpriteI_EditAchievs.prototype._switchLockMode = function(){
	this._movable = !this._movable;
	SoundManager.playCursor();
	this.refresh();
}

SpriteI_EditAchievs.prototype.changeWindowWidth = function(value){
	if (this._selectedWindow && value){
		this._selectedWindow.width = value;
	}
}

SpriteI_EditAchievs.prototype.update = function(){
	if (Input.isTriggered('cancel') || TouchInput.isCancelled()){
		if (!this._waitInput_Button){
			this.hide();
		}
	}
	Sprite_InteractiveP.prototype.update.call(this);
	this.updateWindowGrabbing();
	this.updateWindowMove();
}

SpriteI_EditAchievs.prototype.updateWindowGrabbing = function(){
	if (!this._selectedWindow) return;
	var w = this._selectedWindow;
	if (this.isGrabbing() && !w._grabbing) return;
	if ((TouchInput.isTriggered() && this.isClickOnWindow(w)) || this.isGrabbing()){
		if (TouchInput.isPressed()){
			this._grabSpot = this._grabSpot || { x: TouchInput._x - w.x, y: TouchInput._y - w.y, lastX: w.x, lastY: w.y };
			w._grabbing = true;
			var x = TouchInput._x - this._grabSpot.x;
			var y = TouchInput._y - this._grabSpot.y;
			w._lastX = w._lastX || x;
			w._lastY = w._lastY || y;
			if (w._lastX != x || w._lastY != y){
				w.x = x;
				w.y = y;
				w._lastX = w.x;
				w._lastY = w.y;
				this.refreshDataBox();
			}
		} else {
			this.onReleaseWindow(this._grabSpot, w);
			this._grabSpot = null;
		}
	}
}

SpriteI_EditAchievs.prototype.updateWindowMove = function(){
	if (this.isGrabbing()) return;
	if (!this._selectedWindow) return;
	if (this._textInput_Button) return;
	var w = this._selectedWindow;
	var moved = false;
	var backup = [w.x, w.y];
	if (Input.isRepeated('up')){
		w.y--;
		moved = true;
	}
	if (Input.isRepeated('left')){
		w.x--;
		moved = true;
	}
	if (Input.isRepeated('down')){
		w.y++;
		moved = true;
	}
	if (Input.isRepeated('right')){
		w.x++;
		moved = true;
	}
	if (moved){
		if (this._undoData.length === 0 || this._undoData.last().type != 'preciseMove'){
			this.addEditAction({
				type:'preciseMove',
				window: w,
				lastValue: {x: backup[0], y: backup[1]},
				newValue: {x: w.x, y: w.y}
			})
		} else if (this._undoData.last().type === 'preciseMove'){
			this._undoData.last().newValue = {x: w.x, y: w.y};
		}
		this.refreshDataBox();
	}
}

SpriteI_EditAchievs.prototype.isClickOnWindow = function(w){
	if (w){
		var x = TouchInput._x;
		var y = TouchInput._y;
		if (x >= w.x && x <= w.x + w.width && y >= w.y && y <= w.y + w.height){
			return true;
		}
	}
	return false;
}

SpriteI_EditAchievs.prototype.onReleaseWindow = function(gs, w){
	if (gs){
		var moved = w.x != gs.lastX || w.y != gs.lastY;
		if (moved){
			this.addEditAction({
				type: 'move',
				window: w,
				lastValue: {x: gs.lastX, y: gs.lastY}, 
				newValue: {x: w.x, y: w.y}
			})
		}
	}
	w._grabbing = false;
	this.refresh();
}

SpriteI_EditAchievs.prototype.addEditAction = function(action, redo){
	if (action){
		this._undoData.push(action);
		if (this._undoData.length > this.undoLimit()){
			this._undoData.splice(0, 1);
		}
		this._redoData = [];
		this.setButtonAttribute('undoButton', 'enabled', true);
		this.setButtonAttribute('redoButton', 'enabled', false);
	}
}

SpriteI_EditAchievs.prototype.undoLimit = function(){
	return 5;
}

SpriteI_EditAchievs.prototype.undoLastAction = function(){
	var data = this._undoData.last();
	if (data){
		switch(data.type){
		case 'preciseMove':
		case 'move':
			data.window.x = data.lastValue.x;
			data.window.y = data.lastValue.y;
			break;
		}
		this._redoData.push(data);
		this._undoData.splice(this._undoData.length - 1, 1);
		if (this._undoData.length === 0){
			this.setButtonAttribute('undoButton', 'enabled', false);
		}
		this.setButtonAttribute('redoButton', 'enabled', true);
		SoundManager.playCursor();
		this.refresh();
	}
}

SpriteI_EditAchievs.prototype.redoLastAction = function(){
	var data = this._redoData.last();
	if (data){
		switch(data.type){
		case 'preciseMove':
		case 'move':
			data.window.x = data.newValue.x;
			data.window.y = data.newValue.y;
			break;
		}
		this._undoData.push(data);
		this._redoData.splice(this._redoData.length - 1, 1);
		if (this._redoData.length === 0){
			this.setButtonAttribute('redoButton', 'enabled', false);
		}
		this.setButtonAttribute('undoButton', 'enabled', true);
		SoundManager.playCursor();
		this.refresh();
	}
}

SpriteI_EditAchievs.prototype.refresh = function(){
	var scene = SceneManager._scene;
	if (scene._editMode){
		this.drawBody();
	} else {
		this.hide();
	}
}

SpriteI_EditAchievs.prototype.refreshDataBox = function(){
	if (!this._dataBox) return;
	var box = this._dataBox;
	this.bitmap.clearRect(box.x, box.y, box.width, box.height);
	this.bitmap.gradientFillRect(box.x, box.y, box.width, box.height, '#333333', '#111111', true);
	if (this._selectedWindow){
		var sw = this._selectedWindow;
		this.bitmap.fontSize = 15;
		this.drawText('X:' + sw.x, box.x + 4, box.y + 4, Math.floor(box.width/3 - 8), 15, 'left');
		this.drawText('W:' + sw.width, box.x + 4, box.y + 4, box.width - 8, 15, 'center');
		this.drawText('O:' + sw.opacity, box.x + 4, box.y + 4, box.width - 8, 15, 'right');
		this.drawText('Y:' + sw.y, box.x + 4, box.y + 20, Math.floor(box.width/3 - 8), 15, 'left');
		this.drawText('H:' + sw.height, box.x + 4, box.y + 20, box.width - 8, 15, 'center');
		if (sw._windowskin){
			var windowSkin = sw._windowskin._url.substr(sw._windowskin._url.lastIndexOf('/') + 1);
			this.drawText('Skin: ' + windowSkin, box.x + 4, box.y + 40, box.width - 8, 15, 'left');
		} else {
			this.drawText('Skin: none', box.x + 4, box.y + 40, box.width - 8, 15, 'left');
		}
		var fontSize = sw.contents ? sw.contents.fontSize : sw.bitmap.fontSize;
		var fontFace = sw.contents ? sw.contents.fontFace : sw.bitmap.fontFace;
		this.drawText('Font Size: ' + fontSize, box.x + 4, box.y + 60, box.width - 8, 15, 'left');
		this.drawText('Font Face: ' + fontFace, box.x + 4, box.y + 80, box.width - 8, 15, 'left');
	}
}

SpriteI_EditAchievs.prototype.show = function(){
	var scene = SceneManager._scene;

	//Closing Sort option
	if (scene._sortOption && scene._sortOption.visible && scene._sortOption._open){
		scene._sortOption.onClick(scene._sortOption._selected);
	}

	//Starting edit mode
	scene._editMode = true;

	//Deactivating Item Window
	if (scene._itemWindow){
		if (!this.isCategory() && !scene._infoWindow.isOpen()){
			scene._infoWindow.open();
		}
		scene._itemWindow.active = false;
	}

	Sprite_InteractiveP.prototype.show.call(this);
	this.refresh();
}

SpriteI_EditAchievs.prototype.hide = function(){
	this.clearSelectedStuff();
	SoundManager.playCancel();
	this.visible = false;
}

SpriteI_EditAchievs.prototype.clearSelectedStuff = function(){
	var scene = SceneManager._scene;
	//Ending edit mode
	scene._editMode = false;
	this._selectedWindow = null;

	//Changing the windows' opacity
	if (scene._itemWindow){
		if (scene._infoWindow.isOpen()){
			scene._infoWindow.close();
		}
		scene._itemWindow.active = true;
		scene._itemWindow.alpha = 1;
		scene._trophiesWindow.alpha = 1;
		scene._titleWindow.alpha = 1;
		scene._infoWindow._isWindow = true;
		scene._infoWindow.alpha = 1;
	}
	if (scene._sortOption){
		scene._sortOption.alpha = 1;
	}
}

SpriteI_EditAchievs.prototype.onMenuChange = function(isCategory){
	if (isCategory){
		var selectOptions = ['Select window', 'Achievements', 'Menu Title', 'Achiev Info'];
		if (SMO.AM.Sort.enabled){
			selectOptions.push('Sort Option');
		}
		this.setButtonAttribute('selectWindow', 'options', selectOptions);
		this.setButtonAttribute('selectWindow', 'selectedValue', 'Select window');
	} else {
		this.setButtonAttribute('selectWindow', 'options', ['Select window', 'Categories', 'Trophies', 'Menu Title']);
		this.setButtonAttribute('selectWindow', 'selectedValue', 'Select window');
	}
	this.setButtonAttribute('undoButton', 'enabled', false);
	this.setButtonAttribute('redoButton', 'enabled', false);
	this._redoData = [];
	this._undoData = [];
}

//===============================================================================================
// Game Interpreter
// Plugin commands
//===============================================================================================
SMO.AM._GameInterpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args){
	SMO.AM._GameInterpreter_pluginCommand.call(this, command, args);
	var lowerCommand = command.toLowerCase();
	if (lowerCommand === 'showachievements'){
		SMO.AM.showAchievements(args[0]);
	} else if (lowerCommand === 'refreshachievements'){
		SMO.AM.refreshAchievements();
	} else if(lowerCommand === 'resetachievementsdata'){
		SMO.AM.resetAchievementsData();
	}
}

//===============================================================================================
// END
//===============================================================================================
