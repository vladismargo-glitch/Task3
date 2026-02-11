Vue.component('kanban-column', {
    props: ['config', 'tasks'],
    template: `
        <div class="column">
            <h2>{{ config.title }}</h2>
            
            <div v-if="config.id === 'planned'" class="create-form">
                <input v-model="newTask.title" placeholder="Заголовок">
                <textarea v-model="newTask.desc" placeholder="Описание"></textarea>
                <input type="date" v-model="newTask.deadline">
                <button @click="submitTask">Создать задачу</button>
            </div>
            
            <div class="task-list">
                <div v-for="task in tasks" :key="task.id" 
                     :class="['task-card', getDeadlineClass(task)]">
                    
                    <div v-if="!task.isEditing">
                        <h4>{{ task.title }}</h4>
                        <p>{{ task.desc }}</p>
                        
                        <div class="card-meta">
                            <small>Создано: {{ task.createdAt }}</small><br>
                            <small v-if="task.lastEditAt">Изм: {{ task.lastEditAt }}</small><br>
                            <small>Дедлайн: {{ task.deadline }}</small>
                            
                            <p v-if="task.returnReason" class="return-info">
                                <strong>Возврат:</strong> {{ task.returnReason }}
                            </p>

                            <div v-if="config.id === 'completed'" class="status-badge">
                                <strong v-if="isOverdue(task)" style="color: red;">Просрочено</strong>
                                <strong v-else style="color: green;">В срок</strong>
                            </div>
                        </div>
                        
                        <div class="card-btns">
                            <button v-if="config.id !== 'completed'" @click="startEdit(task)">Редактировать</button>
                            <button v-if="config.id === 'planned'" @click="$emit('delete-task', task.id)">Удалить</button>
                            <button v-if="config.id === 'testing'" @click="handleReturn(task)">Назад</button>
                            <button v-if="config.id !== 'completed'" @click="$emit('move-task', task)">Вперед →</button>
                        </div>
                    </div>

                    <div v-else class="edit-box">
                        <input v-model="task.title" placeholder="Заголовок">
                        <textarea v-model="task.desc" placeholder="Описание"></textarea>
                        <input type="date" v-model="task.deadline">
                        <button @click="saveEdit(task)">Сохранить</button>
                    </div>
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
        },
        startEdit(task) {
            this.$set(task, 'isEditing', true);
        },
        saveEdit(task) {
            task.isEditing = false;
            task.lastEditAt = new Date().toLocaleString();
        },
        handleReturn(task) {
            const reason = prompt("Причина возврата во второй столбец:");
            if (reason) {
                this.$emit('return-task', task, reason);
            }
        },
        isOverdue(task) {
            if (!task.completedAt) return false;
            return new Date(task.completedAt) > new Date(task.deadline);
        },
        getDeadlineClass(task) {
            if (this.config.id !== 'completed') return '';
            return this.isOverdue(task) ? 'overdue' : 'on-time';
        }
    }
});