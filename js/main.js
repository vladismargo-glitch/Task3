new Vue({
    el: '#app',
    data: {
        tasks: [],
        columnConfigs: [
            {id: 'planned', title: 'Запланированные'},
            {id: 'in-work', title: 'В работе'},
            {id: 'testing', title: 'Тестирование'},
            {id: 'completed', title: 'Выполнено'}
        ]
    },
    methods: {
        addTask(taskData) {
            const task = {
                id: Date.now(),
                title: taskData.title,
                desc: taskData.desc,
                deadline: taskData.deadline,
                status: 'planned',
                createdAt: new Date().toLocaleString(),
                lastEditAt: null
            };
            this.tasks.push(task);
        },
        deleteTask(id) {
            this.tasks = this.tasks.filter(t => t.id !== id);
        },
        moveTask(task) {
            const statusFlow = ['planned', 'in-work', 'testing', 'completed'];
            let currentIndex = statusFlow.indexOf(task.status);

            if (currentIndex > statusFlow.length - 1) {
                task.status = statusFlow[currentIndex + 1];
                task.lastEditAt = new Date().toLocaleString();
                if (task.status === 'completed') {
                    task.completedAt = new Date().toISOString();
                }
            }
        },
        returnTask(task, reason) {
            task.status = "in-work";
            task.returnTask(reason);
            task.lastEditAt = new Date().toLocaleString();
        }
    }
});