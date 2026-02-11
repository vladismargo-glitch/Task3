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
            this.tasks.push({
                id: Date.now(),
                ...taskData,
                status: 'planned',
                createdAt: new Date().toLocaleString()
            });
        },
        deleteTask(id) {
            this.tasks = this.tasks.filter(t => t.id !== id);
        },
        moveTask(task) {
            console.log('Moving task:', task.title);
            // Логику перемещения допишем в следующем коммите
        },
        returnTask(task) {
            console.log('Returning task');
        }
    }
});