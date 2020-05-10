globaldatabase={};




function daddActivity(activity) {
  globaldatabase[activity]={};
}

function daddTask(activity,task) {
  globaldatabase[activity][task]={};
}

function daddURL(activity,task,id,url) {
  globaldatabase[activity][task][id]=url;
}

function dgetActivity() {
  var arr=[];
  for(key in globaldatabase) {
    arr.push(key);
  }
  return arr;
}

function dgetTask(activity) {
  var arr=[];
  for(key in globaldatabase[activity]) {
    arr.push(key);
  }
  return arr;
}

function dgetURLs(activity,task) {
  var arr=[];
  for(key in globaldatabase[activity][task]) {
    arr.push(globaldatabase[activity][task][key]);
  }
  return arr;
}

function dgetURLIds(activity,task) {
  var arr=[];
  for(key in globaldatabase[activity][task]) {
    arr.push(key);
  }
  return arr;
}

function dgetURLandIds(activity,task) {
	var arr=[];
	console.log(activity+" "+task);
	console.log("234234 "+task);
	for(key in globaldatabase[activity][task]) {
    	arr.push([key,globaldatabase[activity][task][key]]);
  }
  console.log(arr+' gole ');
  return arr;
}


function dremoveActivity(activity) {
  //console.log(1+" "+activity+" "+globaldatabase);
  delete globaldatabase[activity];
  //console.log(2+" "+activty+" "+globaldatabase);
}

function dremoveTask(activity,task) {
  delete globaldatabase[activity][task];
}

function dremoveURL(activity,task,id) {
  delete globaldatabase[activity][task][id];
}


function drenameActivity(oldactivity,newactivity) {
  value=globaldatabase[oldactivity];
  delete globaldatabase[oldactivity];
  globaldatabase[newactivity]=value;
}

function drenameTask(activity,oldTask,newTask) {
  value=globaldatabase[activity][oldTask];
  delete globaldatabase[activity][oldTask];
  globaldatabase[activity][newTask]=value;
}

function drenameURL(activity,task,oldURL,newURL) {
  value=globaldatabase[activity][task][oldURL];
  delete globaldatabase[activity][task][oldURL];
  globaldatabase[activity][task][newURL]=value;
}

function getURLs(activity,task) {}









function load_activities()
{
	alert("Inside load_activities()");
	var div = document.getElementById("select_shit");
	//alert("inside load_activities()");
	//var activities = ['Activity1','Activity2','Activity3','Activity4','Activity5'];
	var activities=dgetActivity();
	console.log(activities);
	var select_tag_of_activities = document.getElementById("select_activity");
	for(var i=0; i<activities.length; i++)
	{
		var option = document.createElement("option");
		option.setAttribute("value", activities[i]);
		option.innerHTML = activities[i];
		select_tag_of_activities.appendChild(option);
	}

	var add_activity = document.createElement("button");
	add_activity.setAttribute("type", "button");
	add_activity.setAttribute("class", "btn btn-default btn-lg btn-activity-add activity-btns");
	add_activity.setAttribute("id", "add_activity_btn");
	add_activity.setAttribute("style", "float: right;");
	var span = document.createElement("span");
	span.setAttribute("class", "glyphicon glyphicon-plus");
	add_activity.appendChild(span);

	var btns = document.getElementById("select_shit").getElementsByTagName("button");
	for(var i=0;i<btns.length;i++)
	{
		if(btns[i].id == add_activity.id){
			break;
		}
	}
	if (i==btns.length){
		document.getElementById("select_shit").appendChild(add_activity);	
	}
	add_activity.onclick = function() {
		var text_input = document.createElement("input");
		text_input.setAttribute("type", "text");
		text_input.setAttribute("class", "form-control new-activity-txt");
		text_input.setAttribute("style", "width: 75%;");
		var btn = document.createElement("button");
		btn.setAttribute("type", "button");
		btn.setAttribute("class", "btn btn-default btn-lg new-activity-btn");
		btn.setAttribute("id", "add_activity_btn");
		var span = document.createElement("span");
		span.setAttribute("class", "glyphicon glyphicon-ok");
		btn.setAttribute("style", "float: right;");
		btn.appendChild(span);
		document.getElementById("rename_activity_elements_div").appendChild(btn);
		document.getElementById("rename_activity_elements_div").appendChild(text_input);
		btn.onclick = function() {
			var select_tag = document.getElementById("select_activity");
			var option = document.createElement("option");
			option.setAttribute("value", text_input.value);
			option.innerHTML = text_input.value;
			daddActivity(text_input.value);
			console.log("111sadg1111 "+" "+emailid+" "+text_input.value);
			addactivity(database,emailid,text_input.value);
			//addactivity(database,emailid,text_input.value);
			console.log(globaldatabase);
			select_tag.appendChild(option);
			var arr=select_tag.getElementsByTagName("option");
			console.log(JSON.stringify(arr));
			arr[arr.length-1].selected="selected";
			get_activity_name();
			//select_tag.insertBefore(option,select_tag.childNodes[3]);
			text_input.remove();
			this.remove();
		};
	};

}






