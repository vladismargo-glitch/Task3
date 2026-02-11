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
                ...taskData,
                status: 'planned',
                createdAt: new Date().toLocaleString(),
                lastEditAt: null
            };
            this.tasks.push(task);
        }
    }
});