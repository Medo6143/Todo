let input = document.querySelector("#input")
let button = document.querySelector("#but")
let task = document.querySelector(".tasks")
input.focus()

let array = [];

//check storage
if (localStorage.getItem("tasks")) {
    array = JSON.parse(localStorage.getItem("tasks"))
}

get_storage()

function add() {
    if (input.value !== "") {
        add_task(input.value)
        input.value = "";
    }

    else {
        input.value = "please write your task"
    }

    input.focus()

}

function add_task(input) {
    const tasks = {
        id: Date.now(),
        title: input,
    }
    //add to array 
    array.push(tasks);
    //add task to page 
    addTopage(array);
    //local storage
    add_storage(array)
}

function addTopage(input) {
    task.innerHTML = "";
    input.forEach((tasks) => {
        //div
        let div = document.createElement("div")
        div.className = 'task';
        div.setAttribute("id", tasks.id);
        div.appendChild(document.createTextNode(tasks.title));
        //compelet task 

        


        let done = document.createElement("span")
        done.className = "do"
        done.appendChild(document.createTextNode("DONE"))
        div.appendChild(done)




        //span
        let span = document.createElement("span");
        span.className = "del";
        span.appendChild(document.createTextNode("DELET"))
        div.appendChild(span)
        //in page

        task.appendChild(div)
        //


        task.addEventListener("click", (e) => {
            if (e.target.classList.contains("do")) {
                let tru = document.createElement("p")
                tru.className = "true"
                tru.appendChild(document.createTextNode("✔"))
                div.appendChild(tru)
                document.querySelector(".do").remove()
            }



            del_storage(e.target.parentElement.getAttribute("id"))

        })
    });
    

}


function add_storage(text) {
    window.localStorage.setItem("tasks", JSON.stringify(text))
}

function get_storage() {
    let data = window.localStorage.getItem("tasks");
    if (data) {
        let tasks1 = JSON.parse(data);
        addTopage(tasks1)
    }
}

task.addEventListener("click", (e) => {
    if (e.target.classList.contains("del")) {
        e.target.parentElement.remove();
        del_storage(e.target.parentElement.getAttribute("id"))

    }

})

function del_storage(taskid) {
    array = array.filter((task) => task.id != taskid)
    add_storage(array)
}

let butt = document.querySelector("#butt")
butt.addEventListener("click", function () {
    document.querySelectorAll(".task").remove()
})

