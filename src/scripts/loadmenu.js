"use strict";

/**
 * Die Funktion ist für das Nachladen des Menüs über Ajax zuständig.
 * Das Menu wird in das HTML 5 Element nav mit der id navigation 
 * hinzugefügt. 
 * @param url die relative URL der Menü Datei.
 * @throws {Error} url konnte nicht geladen werden.
 */
var loadmenu = function(url){
    console.log("call loadmenu function");
    var xhttp = new XMLHttpRequest();
    var successfull = true;
    xhttp.onreadystatechange = function(){
      
        if(this.readyState == 4 && this.status == 200){
            document.getElementById("navigation").innerHTML = xhttp.responseText;
        }
        if(xhttp.readyState == 4 && xhttp.status == 404){
            successfull = false;
            console.error('Can not load' + url);
        }
    };
    xhttp.open("GET",url,false);
    xhttp.send();
    if(!successfull){
        var error = new Error("Can not load " + url);
        throw error;
    }
}