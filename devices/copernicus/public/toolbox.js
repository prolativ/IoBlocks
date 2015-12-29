define(['text!../device/toolbox.xml!strip',
        'device.msg'], function(toolboxXml, msg){

  var parser = new DOMParser();
  var toolboxDom = parser.parseFromString(toolboxXml,"text/xml");

  var categories = msg.categories
  var categoryNodes = toolboxDom.getElementsByTagName("category");
  for(var i=0; i<categoryNodes.length; ++i){
    var node = categoryNodes[i];
    var categoryName = node.getAttribute("name");
    categoryName && node.setAttribute("name", categories[categoryName]);
  }

  return toolboxDom.getElementsByTagName("xml")[0];
});