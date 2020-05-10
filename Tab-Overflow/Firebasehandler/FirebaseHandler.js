var database;
var emailid;
var password;

chrome.storage.sync.get('loggedinuser',function(result) {
	emailid=result.loggedinuser[0];
	password = result.loggedinuser[1];
	addemailid(database,emailid,password);
	firebasetolocalstorage();
});

database = initialize();

function initialize() {
	// Initialize Firebase
	var config = {
		apiKey: "",
	    authDomain: "",
	    databaseURL: "",
	    projectId: "",
	    storageBucket: "",
	    messagingSenderId: "",
	    appId: "",
	    measurementId: ""
	};
	firebase.initializeApp(config);
  
	console.log(firebase);
  
	database = firebase.database();
	
	return database;
}

function getvalidkey(key) {
	//Getting valid key by removing ".", "#", "$", "[", or "]" from the key
	var validkey="";
	
	for(var i=0;i<key.length;i++) {
		if(key[i]!="." && key[i]!="#" && key[i]!="$" && key[i]!="[" && key[i]!="]") {
			validkey=validkey.concat(key[i]);
		}
	}
	return validkey;
}

function addemailid(database,emailId,password) {
	var ref = database.ref();
		
	console.log("11111111 "+emailId);
	emailId=getvalidkey(emailId);
	ref.once('value').then(function(snapshot){
			console.log("22222211111111 "+emailId);
			if(!snapshot.hasChild(emailId)) {
				console.log(emailId+" Added");
				var ref1=database.ref(getvalidkey(emailId));
				ref1.push({emailid:emailId, password:password});
				addactivity(database,emailId,"default_activity_123");
				addactivity(database,emailId,"blocked_url");
			}
			else {
				alert(emailId+" already exists!");
				console.log("Emailid exists");
			}		
    });
	
}

function getemailidsactivity(database) {
	var ref = firebase.database().ref();
	
	var keys=[];
	var values=[];
	
	ref.once('value').then(function(snapshot){
		ul = document.getElementById("show_email_ids");
	for(var i=0;i<arr.length;i++)
	{
		var li = document.createElement("li");
		li.appendChild(document.createTextNode(arr[i]));
		li.setAttribute("value", arr[i]);
		li.setAttribute("display", "none");
		li.setAttribute("class", "list-group-item");
		li.setAttribute("style", "width: 100%;");
		li.onclick = function() {
			document.getElementById("modal_text_input").value = this.innerHTML;
			this.parentNode.style.display = "none";
		};
		ul.appendChild(li);
	}
	ul.style.display = "none";

	ul = document.getElementById("a_show_email_ids");
	var arr = get_all_email_ids();
	for(var i=0;i<arr.length;i++)
	{
		var li = document.createElement("li");
		li.appendChild(document.createTextNode(arr[i]));
		li.setAttribute("value", arr[i]);
		li.setAttribute("display", "none");
		li.setAttribute("class", "list-group-item");
		li.setAttribute("style", "width: 100%;");
		li.onclick = function() {
			document.getElementById("a_modal_text_input").value = this.innerHTML;
			this.parentNode.style.display = "none";
		};
		ul.appendChild(li);
	}
	ul.style.display = "none";
    });
}


function getemailidstask(database) {
	var ref = firebase.database().ref();
	
	var keys=[];
	var values=[];
	
	ref.once('value').then(function(snapshot){
		ul = document.getElementById("show_email_ids");
		ul1 = document.getElementById("a_show_email_ids");
	snapshot.forEach(function(childSnapshot){
			k = childSnapshot.key;
			var li = document.createElement("li");
			li.appendChild(document.createTextNode(k));
			li.setAttribute("value", k);
			li.setAttribute("display", "none");
			li.setAttribute("class", "list-group-item");
			li.setAttribute("style", "width: 100%;");
			li.onclick = function() {
				document.getElementById("modal_text_input").value = this.innerHTML;
				this.parentNode.style.display = "none";
			};

			var li1 = document.createElement("li");
			li1.appendChild(document.createTextNode(k));
			li1.setAttribute("value", k);
			li1.setAttribute("display", "none");
			li1.setAttribute("class", "list-group-item");
			li1.setAttribute("style", "width: 100%;");
			li1.onclick = function() {
				document.getElementById("a_modal_text_input").value = this.innerHTML;
				this.parentNode.style.display = "none";
			};

			ul.appendChild(li);
			ul1.appendChild(li1);
		});

	ul.style.display = "none";
	ul1.style.display = "none";

    });
}

function addactivity(database,emailId,activity) {
	var ref = database.ref(getvalidkey(emailId));
		
	activity=getvalidkey(activity);
	console.log("11111111 "+activity);
	ref.once('value').then(function(snapshot){
			console.log("222222211111111 "+activity);
			if(!snapshot.hasChild(activity)) {
				console.log(activity+" Added");
				var ref1=database.ref(getvalidkey(emailId+"/"+activity));
				ref1.push({activity:activity});
				if(activity == "blocked_url")
				{
					addtask(database,emailId,activity,"blocked");
				}
				else
				{
					addtask(database,emailId,activity,"default_task_123");
				}
			}
			else {
				console.log("Activity exists");
			}
			
    });
	
}

function getactivities(database,emailid,id) {
	var ref = firebase.database().ref(emailid);
	
	var keys=[];
	var values=[];
	
	ref.once('value').then(function(snapshot){
		var i=1;
			snapshot.forEach(function(childSnapshot){
			k = childSnapshot.key;
			document.getElementById(id).innerHTML = k;
			i++;
		});
    });
}


function removeactivity(database,emailid,activity) {
	var ref=database.ref(getvalidkey(emailid));
	ref.child(activity).remove();
}

function renameactivity(database,emailid,oldactivity,newactivity) {
	console.log("11111111115555 "+JSON.stringify(globaldatabase[newactivity]));
	//console.log("11111111115555 "+JSON.stringify(globaldatabase[emailid]));
	addactivity(database,emailid,newactivity);
	for(var task in globaldatabase[newactivity]) {
		console.log("121212 "+key+" "+globaldatabase[newactivity][key]);
		addtask(database,emailid,newactivity,task);
		for(var id in globaldatabase[newactivity][task]) {
			for(var url in globaldatabase[newactivity][task][id]) {
				addURL(database,emailid,newactivity,task,id,globaldatabase[newactivity][task][id]);
			}
		}
		
	} 	
	removeactivity(database,emailid,oldactivity);
}

function renametask(database,emailid,activity,oldtask,newtask) {
	console.log("11111111115555 "+JSON.stringify(globaldatabase[activity]));
	//console.log("11111111115555 "+JSON.stringify(globaldatabase[emailid]));
	addtask(database,emailid,activity,newtask);
	for(var id in globaldatabase[activity][newtask]) {
		console.log("121212 "+key+" "+globaldatabase[activity][newtask][id]);
		for(var url in globaldatabase[activity][newtask][id]) {
				addURL(database,emailid,activity,newtask,id,globaldatabase[activity][newtask][id]);
			}
	} 	
	removetask(database,emailid,activity,oldtask);
}

function shareactivity(database,emailid1,emailid2,activity) {
	//console.log("11111111115555 "+JSON.stringify(globaldatabase[newactivity]));
	//console.log("11111111115555 "+JSON.stringify(globaldatabase[emailid]));
	emailid1=getvalidkey(emailid1);
	emailid2=getvalidkey(emailid2);
	addactivity(database,emailid2,activity);
	for(var task in globaldatabase[activity]) {
		//console.log("121212 "+key+" "+globaldatabase[newactivity][key]);
		addtask(database,emailid2,activity,task);
		for(var id in globaldatabase[activity][task]) {
			for(var url in globaldatabase[activity][task][id]) {
				addURL(database,emailid2,activity,task,id,globaldatabase[activity][task][id]);
			}
		}
		
	} 	
}

function sharetask(database,emailid1,emailid2,activity,task) {
	//console.log("11111111115555 "+JSON.stringify(globaldatabase[newactivity]));
	//console.log("11111111115555 "+JSON.stringify(globaldatabase[emailid]));
	emailid1=getvalidkey(emailid1);
	emailid2=getvalidkey(emailid2);
	var shared_activity=task;
	alert(emailid1+"  " + emailid2);
	console.log(globaldatabase+" "+activity)
	addactivity(database,emailid2,shared_activity);
	addtask(database,emailid2,shared_activity,task);
		for(var id in globaldatabase[activity][task]) {
			for(var url in globaldatabase[activity][task][id]) {
				console.log("098 "+id+" "+globaldatabase[activity][task][id]);
				addURL(database,emailid2,shared_activity,task,id,globaldatabase[activity][task][id]);
			}
		}	
	 	
}


function addtask(database,emailId,activity,task) {
	var ref = database.ref(getvalidkey(emailId+"/"+activity));
		
	task=getvalidkey(task);
	ref.once('value').then(function(snapshot){
			if(!snapshot.hasChild(task)) {
				console.log(task+" Added");
				if(activity == "blocked_url")
				{
					if(snapshot.numChildren() >= 2)
					{
						alert("This is blocked url!");
						addURL(database,emailId,activity,"blocked",snapshot.numChildren()+1,task)
					}
				}
				var ref1=database.ref(getvalidkey(emailId+"/"+activity+"/"+task));
				ref1.push({task:task});
				addURL(database,emailId,activity,task,"default_id_123","1");
			}
			else {
				alert(task+" already exists!")
				console.log("Task exists");
			}
    });
}

function gettasks(database,emailid,activity,id) {
	var ref = firebase.database().ref(emailid+"/"+activity);
	
	var keys=[];
	var values=[];
	
	ref.once('value').then(function(snapshot){
		var i=1;
			snapshot.forEach(function(childSnapshot){
			k = childSnapshot.key;
			document.getElementById(id).innerHTML = k;
			i++;
		});
    });
}
      

function removetask(database,emailid,activity,task) {
	var ref=database.ref(getvalidkey(emailid+"/"+activity));
	ref.child(task).remove();
}

function addURL(database,emailId,activity,task,id,url) {
	var ref=database.ref(getvalidkey(emailId+"/"+activity+"/"+task));
		
	id=getvalidkey(id);
	console.log(id+" "+getvalidkey(emailId+"/"+activity+"/"+task))
	ref.once('value').then(function(snapshot){
			if(!snapshot.hasChild(id)) {
				console.log(id+" Added");
				console.log(id+" "+url);
				var ref1=database.ref(getvalidkey(emailId+"/"+activity+"/"+task+"/"+id));
				console.log(ref1);
				ref1.set({URL:url});
			}
			else {
				console.log("URL exists");
			}	
    });
}

function getURLS(database,emailid,activity,task,id) {
	var ref = firebase.database().ref(emailid+"/"+activity+"/"+"task");
	
	var keys=[];
	var values=[];
	
	ref.once('value').then(function(snapshot){
		var i=1;
			snapshot.forEach(function(childSnapshot){
			k = childSnapshot.key;
			document.getElementById(id).innerHTML = k;
			i++;
		});
    });
}


function removeURL(database,emailid,activity,task,URL) {
	var ref=database.ref(getvalidkey(emailid+"/"+activity+"/"+task));
	ref.child(URL).remove();
}


function getAllData(database,emailid) {
	var ref = firebase.database().ref(emailid);
	
	var keys=[];
	var values=[];
	
	ref.once('value').then(function(snapshot){
		var i=1;
		snapshot.forEach(function(childSnapshot){
			k = childSnapshot.key;
			console.log(k);
			var j=1;
			childSnapshot.forEach(function(childchildSnapshot){
				k = childchildSnapshot.key;
				console.log(k);
				j++;
			});
			
			i++;
		});
    });
}

function firebasetolocalstorage() {
	var ref=firebase.database().ref(getvalidkey(emailid));
		
	ref.once('value').then(function(snapshot){
		console.log(snapshot.numChildren());
		var i=0;
		//var total_activities=snapshot.numChildren();
		snapshot.forEach(function(snapshot_activities){
			// console.log(snapshot.numChildren());
			var activity=snapshot_activities.key;
			if(activity[0]!="-") {
				if(activity!="default_activity_123") {
					globaldatabase[activity]={};
				}
				console.log(activity);
				var j=0;
				snapshot_activities.forEach(function(snapshot_tasks){
					var task=snapshot_tasks.key;
					if(task[0]!="-") {
						if(task!="default_task_123") {
							globaldatabase[activity][task]={};
						}
						console.log(task);
						var k=0;
						snapshot_tasks.forEach(function(snapshot_urlids){
							var urlid=snapshot_urlids.key;
							console.log("aaaa "+k+" "+urlid);
							if(urlid[0]!="-") {
								console.log(urlid);
								var l=0;
								snapshot_urlids.forEach(function(snapshot_urls){
									var url=snapshot_urls.key;
									var v=snapshot_urls.val();
									if(urlid!="default_id_123") {
										globaldatabase[activity][task][urlid]=v;
									}
									console.log(url+" "+v);
									console.log(i,j,k,l);
									console.log(snapshot.numChildren()+" "+snapshot_activities.numChildren()+" "+snapshot_tasks.numChildren()+" "+snapshot_urlids.numChildren());
									console.log(i==snapshot.numChildren()-2 && j==snapshot_activities.numChildren()-2 && k==snapshot_tasks.numChildren()-2);
									if(i==snapshot.numChildren()-2 && j==snapshot_activities.numChildren()-2 && k==snapshot_tasks.numChildren()-2) {
										console.log(i,j,k,l);
										load_activities();
										console.log("");
										console.log("");
										console.log("");
										console.log("");
										console.log("");
									}
									l++;
								});
							k++;
							}
						});
					j++;
					}
				});
			i++;
			}	
		});
    });	
}
function removeempty() {}
document.addEventListener("DOMContentLoaded", function(){

});
