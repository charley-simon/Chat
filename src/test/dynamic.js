// The string stores the name of files added till now 
var filesAdded = ''; 

function debugLog( content ) {
  var debugConsole = document.getElementById ('console-content');
  var p = document.createElement("p");
  p.textContent = content;
  debugConsole.appendChild(p);
}

// For loading JS file 
function loadJS(){ 

  debugLog( 'loadJS');

	// Gives -1 when the given input is not in the string 
	// i.e this file has not been added 
	
	if(filesAdded.indexOf('dynamic-dbg.js') !== -1) 
		return
		
	// Head tag 
	var head = document.getElementsByTagName('head')[0] 
	
	// Creating script element 
	var script = document.createElement('script') 
	script.src = 'dynamic-dbg.js'
	script.type = 'text/javascript'
	
	// Adding script element 
	head.append(script) 
	
	// Adding the name of the file to keep record 
	filesAdded += ' dynamic-dbg.js'
} 

// To load CSS file 
function loadCSS() { 

  debugLog( 'loadCSS');

	if(filesAdded.indexOf('dynamic-dbg.css') !== -1) 
		return

	var head = document.getElementsByTagName('head')[0] 
	
	// Creating link element 
	var style = document.createElement('link') 
	style.href = 'dynamic-dbg.css'
	style.type = 'text/css'
	style.rel = 'stylesheet'
	head.append(style); 
	
	// Adding the name of the file to keep record 
	filesAdded += ' dynamic-dbg.css'
}
