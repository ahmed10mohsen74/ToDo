let addTask = document.getElementById("addTask");
let taskInput = document.getElementById("task");
let list = document.getElementById("list");

let arrayTask = JSON.parse(localStorage.getItem("tasks")) || [];

renderTask();

addTask.addEventListener("click", () =>
{
    if (!taskInput.value) return;

    arrayTask.push(taskInput.value);
    saveAndRender();
    taskInput.value = "";
});

function renderTask()
{
    list.innerHTML = "";
    arrayTask.forEach((task, index) =>
    {
        let li = document.createElement("li");
        let span = document.createElement("span");
        let Buttons = document.createElement("div");
        span.textContent = task;

        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "❌";
        deleteBtn.classList.add("delete");
        deleteBtn.style.marginLeft = "10px";

        deleteBtn.addEventListener("click", () =>
        {
            if (confirm("هل أنت متأكد أنك تريد حذف هذه المهمة؟"))
            {
                arrayTask = arrayTask.filter((_, i) => i !== index);
                saveAndRender();
            }
        });

        let editBtn = document.createElement("button");
        editBtn.textContent = "✏️";
        editBtn.classList.add("edit");
        editBtn.style.marginLeft = "10px";

        editBtn.addEventListener("click", () =>
        {
            let newTask = prompt("اكتب التعديل الجديد:", task);
            if (newTask !== null && newTask.trim() !== "")
            {
                arrayTask[index] = newTask.trim();
                saveAndRender();
            }
        }); // <-- هنا كانت ناقصة الأقواس دي

        li.appendChild(span);
        Buttons.appendChild(editBtn)
        Buttons.appendChild(deleteBtn)
        li.appendChild(Buttons); // انت كمان نسيت تضيف editBtn هنا;
        list.appendChild(li);

        li.addEventListener("click", () =>{
            li.classList.toggle("selected");
        })

    });
}

function saveAndRender()
{
    localStorage.setItem("tasks", JSON.stringify(arrayTask));
    renderTask();
}
