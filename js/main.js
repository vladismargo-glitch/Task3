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
            console.log('Moving task:', task.title);
        },
        returnTask(task) {
            console.log('Returning task');
        }
    }
});