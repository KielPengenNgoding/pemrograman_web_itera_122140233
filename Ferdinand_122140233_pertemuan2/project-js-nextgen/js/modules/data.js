export class TaskManager {
    constructor() {
        const savedTasks = localStorage.getItem('tasks');
        this.tasks = savedTasks ? JSON.parse(savedTasks) : [];
        
        if (this.tasks.length === 0) {
            this._saveTasks();
        }
    }

    getTasks() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve([...this.tasks]);
            }, 300);
        });
    }

    getTaskById(id) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const task = this.tasks.find(task => task.id === id);
                if (task) {
                    resolve({...task});
                } else {
                    reject(new Error('Task not found'));
                }
            }, 300);
        });
    }

    addTask(taskData) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const newTask = {
                    id: Date.now().toString(),
                    name: taskData.name || 'Tugas Baru',
                    description: taskData.description || '',
                    deadline: taskData.deadline || null,
                    completed: taskData.completed || false,
                    createdAt: new Date().toISOString()
                };
                
                this.tasks.push(newTask);
                this._saveTasks();
                resolve(newTask);
            }, 300);
        });
    }

    updateTask(id, taskData) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const index = this.tasks.findIndex(task => task.id === id);
                
                if (index !== -1) {
                    this.tasks[index] = {
                        ...this.tasks[index],
                        name: taskData.name || this.tasks[index].name,
                        description: taskData.description !== undefined ? taskData.description : this.tasks[index].description,
                        deadline: taskData.deadline !== undefined ? taskData.deadline : this.tasks[index].deadline,
                        completed: taskData.completed !== undefined ? taskData.completed : this.tasks[index].completed,
                        updatedAt: new Date().toISOString()
                    };
                    
                    this._saveTasks();
                    resolve(this.tasks[index]);
                } else {
                    reject(new Error('Task not found'));
                }
            }, 300);
        });
    }

    deleteTask(id) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const index = this.tasks.findIndex(task => task.id === id);
                
                if (index !== -1) {
                    this.tasks.splice(index, 1);
                    this._saveTasks();
                    resolve(true);
                } else {
                    reject(new Error('Task not found'));
                }
            }, 300);
        });
    }

    _saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }
}

export class ScheduleManager {
    constructor() {
        const savedSchedules = localStorage.getItem('schedules');
        this.schedules = savedSchedules ? JSON.parse(savedSchedules) : [];
        
        if (this.schedules.length === 0) {
            this._saveSchedules();
        }
    }

    getSchedules() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve([...this.schedules]);
            }, 300);
        });
    }

    getScheduleById(id) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const schedule = this.schedules.find(schedule => schedule.id === id);
                if (schedule) {
                    resolve({...schedule});
                } else {
                    reject(new Error('Schedule not found'));
                }
            }, 300);
        });
    }

    addSchedule(scheduleData) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const newSchedule = {
                    id: Date.now().toString(),
                    courseName: scheduleData.courseName || 'Mata Kuliah Baru',
                    day: scheduleData.day || 'Senin',
                    time: scheduleData.time || '',
                    location: scheduleData.location || '',
                    createdAt: new Date().toISOString()
                };
                
                this.schedules.push(newSchedule);
                this._saveSchedules();
                resolve(newSchedule);
            }, 300);
        });
    }

    updateSchedule(id, scheduleData) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const index = this.schedules.findIndex(schedule => schedule.id === id);
                
                if (index !== -1) {
                    this.schedules[index] = {
                        ...this.schedules[index],
                        courseName: scheduleData.courseName || this.schedules[index].courseName,
                        day: scheduleData.day || this.schedules[index].day,
                        time: scheduleData.time !== undefined ? scheduleData.time : this.schedules[index].time,
                        location: scheduleData.location !== undefined ? scheduleData.location : this.schedules[index].location,
                        updatedAt: new Date().toISOString()
                    };
                    
                    this._saveSchedules();
                    resolve(this.schedules[index]);
                } else {
                    reject(new Error('Schedule not found'));
                }
            }, 300);
        });
    }

    deleteSchedule(id) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const index = this.schedules.findIndex(schedule => schedule.id === id);
                
                if (index !== -1) {
                    this.schedules.splice(index, 1);
                    this._saveSchedules();
                    resolve(true);
                } else {
                    reject(new Error('Schedule not found'));
                }
            }, 300);
        });
    }

    _saveSchedules() {
        localStorage.setItem('schedules', JSON.stringify(this.schedules));
    }
}

export class WeatherService {
    constructor() {
        this.defaultWeather = {
            location: 'Jakarta, Indonesia',
            temperature: 30,
            condition: 'Clear',
            humidity: 75,
            windSpeed: 8,
            updatedAt: new Date().toISOString()
        };
    }

    async getWeather() {
        return new Promise((resolve) => {
            setTimeout(() => {
                const conditions = ['Clear', 'Clouds', 'Rain', 'Thunderstorm', 'Mist'];
                const randomCondition = conditions[Math.floor(Math.random() * conditions.length)];
                const randomTemp = Math.floor(Math.random() * 10) + 25;
                const randomHumidity = Math.floor(Math.random() * 30) + 60;
                const randomWind = Math.floor(Math.random() * 15) + 5;
                
                resolve({
                    location: 'Jakarta, Indonesia',
                    temperature: randomTemp,
                    condition: randomCondition,
                    humidity: randomHumidity,
                    windSpeed: randomWind,
                    updatedAt: new Date().toISOString()
                });
            }, 800);
        });
    }
}