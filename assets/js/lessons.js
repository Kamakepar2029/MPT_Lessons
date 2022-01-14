var config = {
    "AppName" : "MPT Lessons"
};

var html = document.documentElement;
var body = document.body;
var lesson_param = params["lesson_name"];

var lessons = document.getElementsByClassName('content-lessons')[0];

const renderAllArticles = function(xhrJSONResult){
    var template = `<div class="card-body">
                        <h5 class="card-title">%author%</h5>
                        <a href="read.html?lesson_name=%path%" class="btn btn-primary">Open Lesson</a>
                    </div>`;
    for (let i in xhrJSONResult){
        let ielem = xhrJSONResult[i];
        let doc = document.createElement('div');
        doc.className = 'card mb-3';
        doc.innerHTML = template.replace('%author%', ielem["description"]).replace("%path%", lesson_param+'&article_param='+ielem["name"]);
        lessons.innerHTML = '';
        lessons.append(doc);
    }
}

fetch('/lessons/'+lesson_param+'/index.json')
  .then(response => response.json())
  .then(response => renderAllArticles(response));