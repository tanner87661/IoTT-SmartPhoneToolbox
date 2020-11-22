[{
	"id": "33ab3185.21b51e",
	"type": "ui_template",
	"z": "eb6d436d.d04f9",
	"group": "a72b86ac.0a92c8",
	"name": "DCC Flow",
	"order": 2,
	"width": "7",
	"height": "12",
	"format": "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<title>DCC Viewer</title>\n<meta charset=\"utf-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n\n<script>\n    var thisScope = scope;\n    var freezeStatus = false;\n\n    var cycleData = [];\n    var oneTimeData =  [];\n\n    var cycDispLen = 10;\n    var otDispLen = 10;\n    \n    function initDisplay()\n    {\n        freezeStatus = false;\n    }\n\n    function processFreeze(sender)\n    {\n        if (freezeStatus == true)\n            freezeStatus = false;\n        else\n            freezeStatus = true;\n        document.getElementById(\"freeze\").innerHTML = freezeStatus ? \"RESUME\" : \"FREEZE\";\n    }\n\n    function processClear(sender)\n    {\n        cycleData = [];\n        oneTimeData =  [];\n        clearTable(document.getElementById(\"otTable\"));    \n        clearTable(document.getElementById(\"cycTable\")); \n    }\n\n    function clearTable(thisTable)\n    {\n        var trList = thisTable.getElementsByTagName(\"td\");\n        for (var i = 0; i < trList.length; i++)\n            trList[i].innerHTML = \"&nbsp;\";\n    }\n\n    function updateTable(thisTable, thisData)\n    {\n        var trList = thisTable.getElementsByTagName(\"td\");\n        var trIndex = 0;\n        for (var i = 0; i < thisData.length; i++)\n        {\n            trList[trIndex].innerHTML = thisData[i];\n            trIndex++;\n        }\n    }\n\n    function updateDisplay()\n    {\n        updateTable(document.getElementById(\"otTable\"), oneTimeData);\n        updateTable(document.getElementById(\"cycTable\"), cycleData);\n    }\n\n    function processLine(dispData)\n    {\n        var msgStr = \"unknown DCC message\";\n        var targetTable = -1;\n        if (!freezeStatus)\n        {\n            switch (dispData.type)\n            {\n                case \"switch\":\n                    msgStr = \"Switch \" + dispData.addr.toString() + \" set to \" + dispData.dir + \" - coil \" + dispData.power;\n                    targetTable = 0;\n                    break;\n                case \"signal\":\n                    msgStr = \"Signal \" + dispData.addr.toString() + \" set to aspect \" + dispData.aspect.toString();\n                    targetTable = 0;\n                    break;\n                 case \"loco_speed\":\n                    msgStr = \"Loco \" + dispData.addr.toString() + \" (\" + dispData.addr_type + \") set to step \" + dispData.speed.toString() + \" of \" + dispData.speedsteps.toString() + \" \" + dispData.dir;\n                targetTable = 1;\n                    break;\n                case \"loco_function\":\n                    msgStr = \"Loco \" + dispData.addr.toString() + \" (\" + dispData.addr_type + \") function group \" + dispData.func_group.toString() + \" set to 0x\" + (\"00\" + dispData.func_value.toString(16).toUpperCase()).slice(-2);\n                    targetTable = 1;\n                    break;\n            }\n            if (targetTable == 1) //cycl\n            {\n                cycleData.unshift(msgStr);\n                while (cycleData.length > cycDispLen)\n                    cycleData.pop();\n            }\n            if (targetTable === 0) //ot\n            {\n                oneTimeData.unshift(msgStr);\n                while (oneTimeData.length > otDispLen)\n                    oneTimeData.pop();\n            }\n            if (targetTable != -1)\n                updateDisplay();\n        }\n    }\n\n    (function() {\n        (function(scope) {\n            scope.$watch('msg', function(msg) {\n                if (msg) \n                {\n                    switch (msg.topic)\n                    {\n                        case \"dccBC\": \n                            processLine(msg.payload);\n                            break;\n                    }\n                }\n            });\n        })(scope);\n    })();\n\n</script>\n\n</head>\n\n<body>\n    <table id = \"otTable\" width=\"100%\">\n        <tr>\n            <th>One Time Commands</th>\n        </tr>\n        <tr>\n            <td>&nbsp;</td>\n        </tr>\n        <tr>\n            <td>&nbsp;</td>\n        </tr>\n        <tr>\n            <td>&nbsp;</td>\n        </tr>\n        <tr>\n            <td>&nbsp;</td>\n        </tr>\n        <tr>\n            <td>&nbsp;</td>\n        </tr>\n        <tr>\n            <td>&nbsp;</td>\n        </tr>\n        <tr>\n            <td>&nbsp;</td>\n        </tr>\n        <tr>\n            <td>&nbsp;</td>\n        </tr>\n        <tr>\n            <td>&nbsp;</td>\n        </tr>\n        <tr>\n            <td>&nbsp;</td>\n        </tr>\n    </table>\n\n    <table id = \"cycTable\" width=\"100%\">\n        <tr>\n            <th>Refreshed Commands</th>\n        </tr>\n        <tr>\n            <td>&nbsp;</td>\n        </tr>\n        <tr>\n            <td>&nbsp;</td>\n        </tr>\n        <tr>\n            <td>&nbsp;</td>\n        </tr>\n        <tr>\n            <td>&nbsp;</td>\n        </tr>\n        <tr>\n            <td>&nbsp;</td>\n        </tr>\n        <tr>\n            <td>&nbsp;</td>\n        </tr>\n        <tr>\n            <td>&nbsp;</td>\n        </tr>\n        <tr>\n            <td>&nbsp;</td>\n        </tr>\n        <tr>\n            <td>&nbsp;</td>\n        </tr>\n        <tr>\n            <td>&nbsp;</td>\n        </tr>\n    </table>\n\n    <table width=\"100%\">\n        <tr>\n            <td  class=\"button-cell\">\n                <md-button class=\"vibrate framed touched bigfont rounded\" id=\"freeze\" style=\"background-color:#2980b9\" onclick=\"processFreeze(this)\"> \n                    Freeze\n                </md-button>\n            </td>\n            <td  class=\"button-cell\">\n                <md-button class=\"vibrate filled touched bigfont rounded\" id=\"clear\" style=\"background-color:#c0392b\" onclick=\"processClear(this)\"> \n                    Clear\n                </md-button>        \n            </td>\n        </tr>\n    </table>\n<footer>\n  <p id=\"analoglink\">IoTT</p>\n</footer>\n\n<script>\n    setTimeout(initDisplay, 500);\n</script>\n\n</body>\n</html>\n",
	"storeOutMessages": false,
	"fwdInMessages": false,
	"templateScope": "local",
	"x": 821.0000152587891,
	"y": 160.00000953674316,
	"wires": [
		[]
	]
}, {
	"id": "e508f2c8.177c9",
	"type": "mqtt in",
	"z": "eb6d436d.d04f9",
	"name": "",
	"topic": "dccBC",
	"qos": "1",
	"broker": "5bc7cc44.39f4b4",
	"x": 326.00001525878906,
	"y": 158.00000953674316,
	"wires": [
		["be9df45a.6fd208"]
	]
}, {
	"id": "be9df45a.6fd208",
	"type": "json",
	"z": "eb6d436d.d04f9",
	"name": "",
	"property": "payload",
	"action": "obj",
	"pretty": false,
	"x": 563.0000152587891,
	"y": 160.00000953674316,
	"wires": [
		["33ab3185.21b51e"]
	]
}, {
	"id": "8c71ff91.e2e53",
	"type": "ui_template",
	"z": "eb6d436d.d04f9",
	"group": "a72b86ac.0a92c8",
	"name": "css etc",
	"order": 8,
	"width": "0",
	"height": "0",
	"format": "<style>\n* { \n  box-sizing: border-box; \n  }\n  .filled { \n      height: 100% !important;\n        width: 50% !important;\n      padding: 0 !important;\n      margin: 0 !important;\n  }\n  .framed { \n      height: 100% !important;\n      width: 50% !important;\n      padding: 5 !important;\n      margin: 5 !important;\n  }\n  .button-cell { \n      height: 100% !important;\n      width: 50% !important;\n      padding: 5 !important;\n      margin: 5 !important;\n      text-align: center !important;\n  }\n  .radio-cell { \n//      height: 100% !important;\n//      width: 10% !important;\n//      padding: 0 !important;\n//      margin: 0 !important;\n//      text-align: left !important;\n//      font-size: 10px;\n  }\n\n  .radio-text { \n      text-align: left !important;\n      font-size: 16px;\n  }\n\n  .nr-dashboard-template {\n      padding: 0;\n      margin: 0;\n  }\n  \n  .rounded {\n  border-radius: 12px 12px 12px 12px;\n}\n \n   .bigfont {\n  font-size: 18px;\n}\n\n   .smallfont {\n  font-size: 12px;\n}\n   .subfont {\n  font-size: 10px;\n}\n\nbody {\n  font-family: Arial, Helvetica, sans-serif;\n}\n\n/* Style the header */\nheader {\n  background-color: silver;\n  padding: 30px;\n  text-align: center;\n  font-size: 35px;\n  color: white;\n}\n\n/* Create two columns/boxes that floats next to each other */\nnav {\n  float: left;\n  width: 30%;\n//  height: 300px; /* only for demonstration, should be removed */\n  background: #ccc;\n  padding: 20px;\n}\n\n/* Style the list inside the menu */\nnav ul {\n  list-style-type: none;\n  padding: 0;\n}\n\narticle {\n  float: left;\n  padding: 20px;\n  width: 100%;\n  background-color: silver;\n//  height: 300px; /* only for demonstration, should be removed */\n}\n\n/* Clear floats after the columns */\nsection:after {\n  content: \"\";\n  display: table;\n  clear: both;\n}\n\n/* Style the footer */\nfooter {\n  background-color: #777;\n  padding: 10px;\n  text-align: center;\n  color: white;\n}\n\n/* Responsive layout - makes the two columns/boxes stack on top of each other instead of next to each other, on small screens */\n@media (max-width: 600px) {\n  nav, article {\n    width: 100%;\n    height: auto;\n  }\n}\n\n.slider {\n  -webkit-appearance: none;\n  width: 100%;\n  height: 30px;\n  border-radius: 10px;  \n  background: #d3d3d3;\n  outline: none;\n  opacity: 0.7;\n  -webkit-transition: .2s;\n  transition: opacity .2s;\n}\n\n.slider::-webkit-slider-thumb { //moving dot\n  -webkit-appearance: none;\n  appearance: none;\n  width: 50px;\n  height: 50px;\n  border-radius: 50%; \n  background: #4CAF50;\n  cursor: pointer;\n}\n\n.slider::-moz-range-thumb {\n  width: 50px;\n  height: 50px;\n  border-radius: 50%;\n  background: #4CAF50;\n  cursor: pointer;\n}\n  \n/* The Modal (background) */\n.modal {\n  display: none; /* Hidden by default */\n  position: fixed; /* Stay in place */\n  z-index: 1; /* Sit on top */\n  left: 0;\n  top: 0;\n  width: 100%; /* Full width */\n  height: 100%; /* Full height */\n  overflow: auto; /* Enable scroll if needed */\n  background-color: rgb(0,0,0); /* Fallback color */\n  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */\n  -webkit-animation-name: fadeIn; /* Fade in the background */\n  -webkit-animation-duration: 0.4s;\n  animation-name: fadeIn;\n  animation-duration: 0.4s\n}\n\n/* Modal Content */\n.modal-content {\n  position: fixed;\n  bottom: 0;\n  background-color: #fefefe;\n  width: 100%;\n  -webkit-animation-name: slideIn;\n  -webkit-animation-duration: 0.4s;\n  animation-name: slideIn;\n  animation-duration: 0.4s\n}\n\n/* The Close Button */\n.close {\n  color: white;\n  float: right;\n  font-size: 28px;\n  font-weight: bold;\n}\n\n.close:hover,\n.close:focus {\n  color: #000;\n  text-decoration: none;\n  cursor: pointer;\n}\n\n.modal-header {\n  padding: 2px 16px;\n  background-color: grey;\n  color: white;\n}\n\n.modal-body {padding: 2px 16px;}\n\n.modal-footer {\n  padding: 2px 16px;\n  background-color: grey;\n  color: white;\n}\n\n/* Add Animation */\n@-webkit-keyframes slideIn {\n  from {bottom: -300px; opacity: 0} \n  to {bottom: 0; opacity: 1}\n}\n\n@keyframes slideIn {\n  from {bottom: -300px; opacity: 0}\n  to {bottom: 0; opacity: 1}\n}\n\n@-webkit-keyframes fadeIn {\n  from {opacity: 0} \n  to {opacity: 1}\n}\n\n@keyframes fadeIn {\n  from {opacity: 0} \n  to {opacity: 1}\n}\n  \n</style>\n\n<script>\n$('.vibrate').on('click', function() {\n  navigator.vibrate(100);\n});\n\n$('.slidervibrate').on('change', function() {\n  navigator.vibrate(100);\n});\n\nfunction restore_bg(x) {\n            $(this).css(\"background-color\", x);\n    };\n\n$('.touched').on('mousedown', function() {\n    \n    var x= $(this).css(\"background-color\");\n    $(this).css(\"background-color\", \"yellow\");\n    \n    setTimeout(restore_bg.bind(this,x),100);\n    navigator.vibrate(80);\n    });\n    \n</script>",
	"storeOutMessages": false,
	"fwdInMessages": false,
	"templateScope": "local",
	"x": 819.9999771118164,
	"y": 202.0000114440918,
	"wires": [
		[]
	]
}, {
	"id": "a72b86ac.0a92c8",
	"type": "ui_group",
	"z": "",
	"name": "DCC Flow",
	"tab": "d3c365e7.4bde78",
	"order": 1,
	"disp": true,
	"width": "7",
	"collapse": false
}, {
	"id": "5bc7cc44.39f4b4",
	"type": "mqtt-broker",
	"z": "",
	"name": "",
	"broker": "192.168.87.52",
	"port": "1883",
	"clientid": "",
	"usetls": false,
	"compatmode": true,
	"keepalive": "60",
	"cleansession": true,
	"birthTopic": "",
	"birthQos": "0",
	"birthRetain": "false",
	"birthPayload": "",
	"willTopic": "",
	"willQos": "0",
	"willPayload": ""
}, {
	"id": "d3c365e7.4bde78",
	"type": "ui_tab",
	"z": "",
	"name": "DCC Viewer",
	"icon": "dashboard"
}]
