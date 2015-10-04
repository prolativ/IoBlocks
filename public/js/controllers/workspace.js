define(['app'], function(app){

	app.controller('workspaceCtrl', function(){

		var _this = this;

		//this.eventsCount = 0;

		//this.eventDOMs = {};
		//this.currentEvent;


		this.initWorkspace = function(){
			_this.workspace = Blockly.inject('workspaceDiv', {toolbox: document.getElementById('toolbox')});
		}
		
		
		/*function saveEvent(eventName){
			eventDOMs[eventName] = Blockly.Xml.workspaceToDom(workspace);
		}
		
		function setCurrentEvent(){
			var eventName = this.textContent;
			saveEvent(currentEvent);
			workspace.clear();
			if(eventName in eventDOMs){
				var dom = eventDOMs[eventName];
				Blockly.Xml.domToWorkspace(workspace, dom);
			}
			currentEvent = eventName;
		}
		
		
		function addEvent(eventName, basicBlock){
			
			var menuItem = document.createElement("li");
			menuItem.textContent = eventName;
			menuItem.onclick = setCurrentEvent;
			$('#eventList').append(menuItem);
			
			$(menuItem).click();
			
			if(basicBlock){
				var eventBlock = Blockly.Block.obtain(workspace, basicBlock);
				eventBlock.initSvg();
				eventBlock.render();
				eventBlock.setMovable(false);
				eventBlock.setDeletable(false);
				eventBlock.moveBy(15, 10);
			}
			
			definedReactions.push(eventName);
			
			
			//eventDOMs[eventName] = Blockly.Xml.workspaceToDom(workspace);
			//setCurrentEvent(eventName);
		}
		
		function showCode(){
			alert(Blockly.Python.workspaceToCode(workspace));
		}*/
		

		//this.initWorkspace();
		
		//$('#codePreview').click(showCode);
		
		/*addEvent('init', null);
		$('#addEvent').click(function(){
			addEvent('event' + eventsCount, 'procedures_defnoreturn');
			++eventsCount;
		});
		
		$('#eventMenu').collapsible('accordion-open', {
			animate: false
		});*/

	});

});
