Vue.component('kanban-column', {
    props: ['config', 'tasks'],
    template: `
        <div class="column">
            <h2>{{ config.title }}</h2>
            <div v-if="config.id === 'planned'" class="create-form">
                <input v-model="newTask.title" placeholder="Заголовок">
                <textarea v-model="newTask.desc" placeholder="Описание"></textarea>
                <input type="date" v-model="newTask.deadline">
                <button @click="submitTask">Создать</button>
            </div>
            
            <div class="task-list">
                <div v-for="task in tasks" :key="task.id" class="task-card">
                    <strong>{{ task.title }}</strong>
                </div>
            </div>
        </div>
    `,
    data() {
        return {
            newTask: { title: '', desc: '', deadline: '' }
        }
    },
    methods: {
        submitTask() {
            if (this.newTask.title && this.newTask.deadline) {
                this.$emit('create-task', { ...this.newTask });
                this.newTask = { title: '', desc: '', deadline: '' };
            }
        }
    }
});

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
                createdAt: new Date().toLocaleDateString(),
                lastEditAt: Date.now().toLocaleString()
            };
            this.tasks.push(task);
        }
    }
});