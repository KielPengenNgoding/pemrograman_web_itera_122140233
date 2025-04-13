import { TaskManager } from './modules/data.js';
import { ScheduleManager } from './modules/data.js';
import { WeatherService } from './modules/data.js';
import { displayDateTime, showElement, hideElement } from './modules/utils.js';

const taskManager = new TaskManager();
const scheduleManager = new ScheduleManager();
const weatherService = new WeatherService();

const taskList = document.getElementById('task-list');
const scheduleList = document.getElementById('schedule-list');
const weatherInfo = document.getElementById('weather-info');
const taskModal = document.getElementById('task-modal');
const scheduleModal = document.getElementById('schedule-modal');
const taskForm = document.getElementById('task-form');
const scheduleForm = document.getElementById('schedule-form');
const addTaskBtn = document.getElementById('add-task-btn');
const addScheduleBtn = document.getElementById('add-schedule-btn');
const refreshWeatherBtn = document.getElementById('refresh-weather-btn');
const closeTaskModalBtn = document.getElementById('close-task-modal');
const closeScheduleModalBtn = document.getElementById('close-schedule-modal');

export const initApp = () => {
    displayDateTime();
    setInterval(displayDateTime, 1000);

    loadTasks();
    loadSchedules();
    loadWeather();

    addTaskBtn.addEventListener('click', () => {
        document.getElementById('task-modal-title').textContent = 'Tambah Tugas Baru';
        document.getElementById('task-id').value = '';
        document.getElementById('task-name').value = '';
        document.getElementById('task-description').value = '';
        document.getElementById('task-deadline').value = '';
        document.getElementById('task-completed').checked = false;
        showElement(taskModal);
    });

    addScheduleBtn.addEventListener('click', () => {
        document.getElementById('schedule-modal-title').textContent = 'Tambah Jadwal Baru';
        document.getElementById('schedule-id').value = '';
        document.getElementById('course-name').value = '';
        document.getElementById('course-day').value = 'Senin';
        document.getElementById('course-time').value = '';
        document.getElementById('course-location').value = '';
        showElement(scheduleModal);
    });

    refreshWeatherBtn.addEventListener('click', loadWeather);

    closeTaskModalBtn.addEventListener('click', () => hideElement(taskModal));
    closeScheduleModalBtn.addEventListener('click', () => hideElement(scheduleModal));

    taskForm.addEventListener('submit', handleTaskFormSubmit);
    scheduleForm.addEventListener('submit', handleScheduleFormSubmit);

    window.addEventListener('click', (e) => {
        if (e.target === taskModal) hideElement(taskModal);
        if (e.target === scheduleModal) hideElement(scheduleModal);
    });
};

const loadTasks = async () => {
    taskList.innerHTML = '<div id="task-loading">Memuat daftar tugas...</div>';
    
    try {
        const tasks = await taskManager.getTasks();
        renderTasks(tasks);
    } catch (error) {
        console.error('Error loading tasks:', error);
        taskList.innerHTML = '<div class="error-message">Error loading tasks. Please try again.</div>';
    }
};

const loadSchedules = async () => {
    scheduleList.innerHTML = '<div id="schedule-loading">Memuat jadwal kuliah...</div>';
    
    try {
        const schedules = await scheduleManager.getSchedules();
        renderSchedules(schedules);
    } catch (error) {
        console.error('Error loading schedules:', error);
        scheduleList.innerHTML = '<div class="error-message">Error loading schedules. Please try again.</div>';
    }
};

const loadWeather = async () => {
    weatherInfo.innerHTML = '<div id="weather-loading">Memuat informasi cuaca...</div>';
    
    try {
        const weatherData = await weatherService.getWeather();
        renderWeather(weatherData);
    } catch (error) {
        console.error('Error loading weather:', error);
        weatherInfo.innerHTML = '<div class="error-message">Error loading weather. Please try again.</div>';
    }
};

const renderTasks = (tasks) => {
    if (tasks.length === 0) {
        taskList.innerHTML = '<div class="empty-message">Tidak ada tugas tersimpan. Tambahkan tugas baru!</div>';
        return;
    }

    const taskItems = tasks.map(task => {
        const statusClass = task.completed ? 'completed' : '';
        const statusBadge = task.completed 
            ? '<span class="task-completed">Selesai</span>' 
            : '<span class="task-pending">Belum</span>';
        
        const description = task.description || '';
        
        let deadlineText = '';
        if (task.deadline) {
            const deadlineDate = new Date(task.deadline);
            if (!isNaN(deadlineDate.getTime())) {
                deadlineText = `<div><small>Tenggat: ${deadlineDate.toLocaleString('id-ID')}</small></div>`;
            }
        }

        return `
            <li class="list-item ${statusClass}" data-id="${task.id}">
                <div>
                    <span>${task.name || "Tugas Tanpa Nama"} ${statusBadge}</span>
                    ${deadlineText}
                    <div><small>${description}</small></div>
                </div>
                <div class="action-buttons">
                    <button class="btn btn-warning edit-task-btn">Edit</button>
                    <button class="btn btn-danger delete-task-btn">Hapus</button>
                    <button class="btn ${task.completed ? 'btn-primary' : 'btn-success'} toggle-task-btn">
                        ${task.completed ? 'Tandai Belum' : 'Tandai Selesai'}
                    </button>
                </div>
            </li>
        `;
    }).join('');

    taskList.innerHTML = taskItems;
    addEventListenersToTasks();
};

const addEventListenersToTasks = () => {
    document.querySelectorAll('.edit-task-btn').forEach(btn => {
        btn.addEventListener('click', handleEditTask);
    });

    document.querySelectorAll('.delete-task-btn').forEach(btn => {
        btn.addEventListener('click', handleDeleteTask);
    });

    document.querySelectorAll('.toggle-task-btn').forEach(btn => {
        btn.addEventListener('click', handleToggleTask);
    });
};

const renderSchedules = (schedules) => {
    if (schedules.length === 0) {
        scheduleList.innerHTML = '<div class="empty-message">Tidak ada jadwal tersimpan. Tambahkan jadwal baru!</div>';
        return;
    }

    const scheduleItems = schedules.map(schedule => `
        <li class="list-item" data-id="${schedule.id}">
            <div>
                <span>${schedule.courseName || "Mata Kuliah Tanpa Nama"}</span>
                <div>
                    <small>${schedule.day || ""}, ${schedule.time || ""}</small>
                </div>
                <div>
                    <small>Lokasi: ${schedule.location || 'N/A'}</small>
                </div>
            </div>
            <div class="action-buttons">
                <button class="btn btn-warning edit-schedule-btn">Edit</button>
                <button class="btn btn-danger delete-schedule-btn">Hapus</button>
            </div>
        </li>
    `).join('');

    scheduleList.innerHTML = scheduleItems;
    addEventListenersToSchedules();
};

const addEventListenersToSchedules = () => {
    document.querySelectorAll('.edit-schedule-btn').forEach(btn => {
        btn.addEventListener('click', handleEditSchedule);
    });

    document.querySelectorAll('.delete-schedule-btn').forEach(btn => {
        btn.addEventListener('click', handleDeleteSchedule);
    });
};

const renderWeather = (weather) => {
    let iconClass;
    
    switch (weather.condition.toLowerCase()) {
        case 'clear':
            iconClass = '☀️';
            break;
        case 'clouds':
            iconClass = '☁️';
            break;
        case 'rain':
            iconClass = '🌧️';
            break;
        case 'thunderstorm':
            iconClass = '⛈️';
            break;
        case 'snow':
            iconClass = '❄️';
            break;
        case 'mist':
            iconClass = '🌫️';
            break;
        default:
            iconClass = '🌤️';
    }

    weatherInfo.innerHTML = `
        <div class="weather-location">${weather.location}</div>
        <div class="weather-icon">${iconClass}</div>
        <div class="weather-temp">${weather.temperature}°C</div>
        <div class="weather-desc">${weather.condition}</div>
        <div class="weather-details">
            <p>Kelembapan: ${weather.humidity}%</p>
            <p>Kecepatan Angin: ${weather.windSpeed} km/h</p>
        </div>
    `;
};

const handleTaskFormSubmit = async (e) => {
    e.preventDefault();
    
    const taskId = document.getElementById('task-id').value;
    const taskName = document.getElementById('task-name').value;
    const taskDescription = document.getElementById('task-description').value;
    const taskDeadline = document.getElementById('task-deadline').value;
    const taskCompleted = document.getElementById('task-completed').checked;

    try {
        if (taskId) {
            await taskManager.updateTask(taskId, {
                name: taskName,
                description: taskDescription,
                deadline: taskDeadline,
                completed: taskCompleted
            });
        } else {
            await taskManager.addTask({
                name: taskName,
                description: taskDescription,
                deadline: taskDeadline,
                completed: taskCompleted
            });
        }

        hideElement(taskModal);
        loadTasks();
    } catch (error) {
        console.error('Error saving task:', error);
        alert('Terjadi kesalahan saat menyimpan tugas. Silakan coba lagi.');
    }
};

const handleScheduleFormSubmit = async (e) => {
    e.preventDefault();
    
    const scheduleId = document.getElementById('schedule-id').value;
    const courseName = document.getElementById('course-name').value;
    const day = document.getElementById('course-day').value;
    const time = document.getElementById('course-time').value;
    const location = document.getElementById('course-location').value;

    try {
        if (scheduleId) {
            await scheduleManager.updateSchedule(scheduleId, {
                courseName,
                day,
                time,
                location
            });
        } else {
            await scheduleManager.addSchedule({
                courseName,
                day,
                time,
                location
            });
        }

        hideElement(scheduleModal);
        loadSchedules();
    } catch (error) {
        console.error('Error saving schedule:', error);
        alert('Terjadi kesalahan saat menyimpan jadwal. Silakan coba lagi.');
    }
};

const handleEditTask = async (e) => {
    const taskId = e.target.closest('.list-item').dataset.id;
    
    try {
        const task = await taskManager.getTaskById(taskId);
        
        document.getElementById('task-modal-title').textContent = 'Edit Tugas';
        document.getElementById('task-id').value = task.id;
        document.getElementById('task-name').value = task.name || '';
        document.getElementById('task-description').value = task.description || '';
        
        if (task.deadline) {
            const deadlineDate = new Date(task.deadline);
            if (!isNaN(deadlineDate.getTime())) {
                document.getElementById('task-deadline').value = deadlineDate.toISOString().slice(0, 16);
            } else {
                document.getElementById('task-deadline').value = '';
            }
        } else {
            document.getElementById('task-deadline').value = '';
        }
        
        document.getElementById('task-completed').checked = task.completed || false;
        
        showElement(taskModal);
    } catch (error) {
        console.error('Error editing task:', error);
        alert('Terjadi kesalahan saat mengambil data tugas. Silakan coba lagi.');
    }
};

const handleDeleteTask = async (e) => {
    if (confirm('Apakah Anda yakin ingin menghapus tugas ini?')) {
        const taskId = e.target.closest('.list-item').dataset.id;
        
        try {
            await taskManager.deleteTask(taskId);
            loadTasks();
        } catch (error) {
            console.error('Error deleting task:', error);
            alert('Terjadi kesalahan saat menghapus tugas. Silakan coba lagi.');
        }
    }
};

const handleToggleTask = async (e) => {
    const taskId = e.target.closest('.list-item').dataset.id;
    
    try {
        const task = await taskManager.getTaskById(taskId);
        await taskManager.updateTask(taskId, {
            ...task,
            completed: !task.completed
        });
        loadTasks();
    } catch (error) {
        console.error('Error toggling task status:', error);
        alert('Terjadi kesalahan saat mengubah status tugas. Silakan coba lagi.');
    }
};

const handleEditSchedule = async (e) => {
    const scheduleId = e.target.closest('.list-item').dataset.id;
    
    try {
        const schedule = await scheduleManager.getScheduleById(scheduleId);
        
        document.getElementById('schedule-modal-title').textContent = 'Edit Jadwal';
        document.getElementById('schedule-id').value = schedule.id;
        document.getElementById('course-name').value = schedule.courseName || '';
        document.getElementById('course-day').value = schedule.day || 'Senin';
        document.getElementById('course-time').value = schedule.time || '';
        document.getElementById('course-location').value = schedule.location || '';
        
        showElement(scheduleModal);
    } catch (error) {
        console.error('Error editing schedule:', error);
        alert('Terjadi kesalahan saat mengambil data jadwal. Silakan coba lagi.');
    }
};

const handleDeleteSchedule = async (e) => {
    if (confirm('Apakah Anda yakin ingin menghapus jadwal ini?')) {
        const scheduleId = e.target.closest('.list-item').dataset.id;
        
        try {
            await scheduleManager.deleteSchedule(scheduleId);
            loadSchedules();
        } catch (error) {
            console.error('Error deleting schedule:', error);
            alert('Terjadi kesalahan saat menghapus jadwal. Silakan coba lagi.');
        }
    }
};