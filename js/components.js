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
    <h4>{{ task.title }}</h4>
    <p>{{ task.desc }}</p>
    <div class="card-meta">
        <small>Создано: {{ task.createdAt }}</small><br>
        <small>Дедлайн: {{ task.deadline }}</small><br>
        <small v-if="task.lastEditAt">Изм: {{ task.lastEditAt }}</small>
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
            } else {
                alert("Заполните заголовок и дату!");
            }
        },
        handleReturn(task) {
            const reason = prompt("Укажите причину возврата:");
            if (reason) {
                this.$emit('return-task', task, reason);
            }
        }
    }
});