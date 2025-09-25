// Datos simulados para el sistema
const systemData = {
    errors: [
        { id: 'ERR-001', description: 'Temperatura elevada en motor principal', system: 'Sistema A', priority: 'high', status: 'active', solution: 'Verificar sistema de refrigeración' },
        { id: 'ERR-002', description: 'Sensor de presión desajustado', system: 'Sistema B', priority: 'medium', status: 'pending', solution: 'Calibrar sensor según manual' },
        { id: 'ERR-003', description: 'Lubricación insuficiente', system: 'Sistema C', priority: 'low', status: 'resolved', solution: 'Aplicar lubricante tipo X' },
        { id: 'ERR-004', description: 'Vibración anormal en eje Y', system: 'Sistema A', priority: 'high', status: 'active', solution: 'Inspeccionar rodamientos' },
        { id: 'ERR-005', description: 'Conexión intermitente en panel', system: 'Sistema D', priority: 'medium', status: 'pending', solution: 'Revisar conectores y cables' }
    ],
    solutions: {
        'ERR-001': {
            title: 'Solución para Temperatura Elevada',
            steps: [
                '1. Verificar el nivel de refrigerante',
                '2. Inspeccionar el radiador por obstrucciones',
                '3. Comprobar el funcionamiento del ventilador',
                '4. Revisar las mangueras de refrigeración',
                '5. Contactar al técnico si persiste el problema'
            ],
            tools: ['Termómetro infrarrojo', 'Multímetro', 'Llaves de tubo'],
            estimatedTime: '30-45 minutos'
        },
        'ERR-002': {
            title: 'Calibración de Sensor de Presión',
            steps: [
                '1. Desconectar la alimentación del sistema',
                '2. Localizar el sensor de presión',
                '3. Aplicar presión de referencia conocida',
                '4. Ajustar el sensor según especificaciones',
                '5. Verificar las lecturas múltiples veces'
            ],
            tools: ['Calibrador de presión', 'Destornilladores', 'Manual técnico'],
            estimatedTime: '15-25 minutos'
        }
    }
};

// Funciones para el Dashboard principal
function updateDashboardStats() {
    const errorCount = systemData.errors.filter(e => e.status === 'active').length;
    const resolvedCount = systemData.errors.filter(e => e.status === 'resolved').length;
    
    document.getElementById('pending-tasks').textContent = errorCount;
    
    // Simular cambios en tiempo real
    const efficiency = Math.floor(Math.random() * 10) + 85;
    document.querySelector('.progress-fill').style.width = efficiency + '%';
    document.querySelector('.status-details').textContent = efficiency + '% de eficiencia operativa';
}

function generateReport() {
    showNotification('Generando reporte...', 'info');
    setTimeout(() => {
        showNotification('Reporte generado exitosamente', 'success');
    }, 2000);
}

function runDiagnostic() {
    showNotification('Ejecutando diagnóstico del sistema...', 'info');
    setTimeout(() => {
        showNotification('Diagnóstico completado. Sistema operacional', 'success');
    }, 3000);
}

function scheduleMaintenanceSim() {
    showNotification('Mantenimiento programado para mañana a las 02:00 AM', 'success');
}

// Funciones para la matriz de errores
function filterErrors() {
    const priorityFilter = document.getElementById('priority-filter').value;
    const statusFilter = document.getElementById('status-filter').value;
    const rows = document.querySelectorAll('#errors-tbody tr');
    
    rows.forEach(row => {
        const priority = row.dataset.priority;
        const status = row.dataset.status;
        
        const showPriority = priorityFilter === 'all' || priority === priorityFilter;
        const showStatus = statusFilter === 'all' || status === statusFilter;
        
        row.style.display = showPriority && showStatus ? '' : 'none';
    });
    
    updateErrorStats();
}

function updateErrorStats() {
    const visibleRows = document.querySelectorAll('#errors-tbody tr[style=""], #errors-tbody tr:not([style])');
    const activeErrors = Array.from(visibleRows).filter(row => row.dataset.status === 'active').length;
    const resolvedErrors = Array.from(visibleRows).filter(row => row.dataset.status === 'resolved').length;
    const pendingErrors = Array.from(visibleRows).filter(row => row.dataset.status === 'pending').length;
    
    document.getElementById('total-errors').textContent = visibleRows.length;
    document.getElementById('active-errors').textContent = activeErrors;
    document.getElementById('resolved-errors').textContent = resolvedErrors;
    document.getElementById('pending-errors').textContent = pendingErrors;
}

function viewSolution(errorId) {
    const solution = systemData.solutions[errorId];
    if (!solution) {
        showNotification('Solución no disponible', 'warning');
        return;
    }
    
    const modal = document.getElementById('solution-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    
    modalTitle.textContent = solution.title;
    modalBody.innerHTML = `
        <div class="solution-content">
            <h4>Pasos a seguir:</h4>
            <ul class="solution-steps">
                ${solution.steps.map(step => `<li>${step}</li>`).join('')}
            </ul>
            <h4>Herramientas necesarias:</h4>
            <p>${solution.tools.join(', ')}</p>
            <h4>Tiempo estimado:</h4>
            <p>${solution.estimatedTime}</p>
        </div>
    `;
    
    modal.style.display = 'block';
}

function closeSolutionModal() {
    document.getElementById('solution-modal').style.display = 'none';
}

function markResolved(errorId) {
    const row = document.querySelector(`#errors-tbody tr td:first-child`);
    showNotification(`Error ${errorId} marcado como resuelto`, 'success');
    
    // Actualizar visualmente la fila
    setTimeout(() => {
        const rows = document.querySelectorAll('#errors-tbody tr');
        rows.forEach(row => {
            if (row.querySelector('td').textContent === errorId) {
                const statusCell = row.querySelector('.status');
                statusCell.textContent = 'Resuelto';
                statusCell.className = 'status resolved';
                row.dataset.status = 'resolved';
            }
        });
        updateErrorStats();
    }, 1000);
}

function addNewError() {
    showNotification('Funcionalidad de agregar error próximamente', 'info');
}

function viewHistory(errorId) {
    showNotification(`Mostrando historial de ${errorId}`, 'info');
}

// Funciones para reportes
function updateReportOptions() {
    const reportType = document.getElementById('report-type').value;
    const startDate = document.getElementById('start-date');
    const endDate = document.getElementById('end-date');
    
    const today = new Date();
    
    switch(reportType) {
        case 'daily':
            startDate.value = today.toISOString().split('T')[0];
            endDate.value = today.toISOString().split('T')[0];
            break;
        case 'weekly':
            const weekAgo = new Date(today);
            weekAgo.setDate(today.getDate() - 7);
            startDate.value = weekAgo.toISOString().split('T')[0];
            endDate.value = today.toISOString().split('T')[0];
            break;
        case 'monthly':
            const monthAgo = new Date(today);
            monthAgo.setMonth(today.getMonth() - 1);
            startDate.value = monthAgo.toISOString().split('T')[0];
            endDate.value = today.toISOString().split('T')[0];
            break;
    }
}

function generateCustomReport() {
    const startDate = document.getElementById('start-date').value;
    const endDate = document.getElementById('end-date').value;
    const reportType = document.getElementById('report-type').value;
    
    showNotification(`Generando reporte ${reportType} del ${startDate} al ${endDate}...`, 'info');
    
    setTimeout(() => {
        showNotification('Reporte personalizado generado exitosamente', 'success');
    }, 2500);
}

function downloadReport(type) {
    showNotification(`Descargando reporte ${type}...`, 'info');
    setTimeout(() => {
        showNotification(`Reporte ${type} descargado`, 'success');
    }, 1500);
}

function viewReport(type) {
    const modal = document.getElementById('report-modal');
    const modalTitle = document.getElementById('report-modal-title');
    const modalBody = document.getElementById('report-modal-body');
    
    modalTitle.textContent = `Reporte ${type.charAt(0).toUpperCase() + type.slice(1)}`;
    modalBody.innerHTML = `
        <div class="report-preview">
            <h4>Resumen Ejecutivo</h4>
            <p>Este reporte muestra las métricas clave del sistema durante el período seleccionado.</p>
            
            <h4>Métricas Principales</h4>
            <ul>
                <li>Tiempo de actividad: 99.2%</li>
                <li>Errores resueltos: 47</li>
                <li>Tiempo promedio de respuesta: 2.3 minutos</li>
                <li>Eficiencia operativa: 87%</li>
            </ul>
            
            <h4>Recomendaciones</h4>
            <ul>
                <li>Continuar con el mantenimiento preventivo</li>
                <li>Monitorear temperatura del sistema A</li>
                <li>Actualizar sensores de presión</li>
            </ul>
        </div>
    `;
    
    modal.style.display = 'block';
}

function closeReportModal() {
    document.getElementById('report-modal').style.display = 'none';
}

function downloadCurrentReport() {
    showNotification('Descargando reporte actual...', 'info');
    setTimeout(() => {
        showNotification('Reporte descargado exitosamente', 'success');
        closeReportModal();
    }, 1500);
}

function exportToPDF() {
    showNotification('Exportando a PDF...', 'info');
    setTimeout(() => {
        showNotification('Archivo PDF exportado', 'success');
    }, 2000);
}

function exportToExcel() {
    showNotification('Exportando a Excel...', 'info');
    setTimeout(() => {
        showNotification('Archivo Excel exportado', 'success');
    }, 2000);
}

function exportToCSV() {
    showNotification('Exportando a CSV...', 'info');
    setTimeout(() => {
        showNotification('Archivo CSV exportado', 'success');
    }, 1500);
}

function scheduleReport() {
    showNotification('Reporte programado para envío automático', 'success');
}

// Sistema de notificaciones
function showNotification(message, type = 'info') {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Aplicar estilos
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '1rem 1.5rem',
        borderRadius: '4px',
        color: 'white',
        fontWeight: '500',
        zIndex: '10000',
        opacity: '0',
        transform: 'translateX(100%)',
        transition: 'all 0.3s ease'
    });
    
    // Colores según el tipo
    const colors = {
        info: '#007bff',
        success: '#28a745',
        warning: '#ffc107',
        error: '#dc3545'
    };
    
    notification.style.backgroundColor = colors[type] || colors.info;
    
    // Agregar al DOM
    document.body.appendChild(notification);
    
    // Animación de entrada
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remover después de 3 segundos
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Simulación de gráficos con Canvas
function initializeCharts() {
    // Gráfico de rendimiento en tiempo real
    const performanceCanvas = document.getElementById('performance-chart');
    if (performanceCanvas) {
        const ctx = performanceCanvas.getContext('2d');
        drawPerformanceChart(ctx, performanceCanvas);
    }
    
    // Gráfico de eficiencia
    const efficiencyCanvas = document.getElementById('efficiency-chart');
    if (efficiencyCanvas) {
        const ctx = efficiencyCanvas.getContext('2d');
        drawEfficiencyChart(ctx, efficiencyCanvas);
    }
    
    // Gráfico de tendencias
    const trendCanvas = document.getElementById('trend-chart');
    if (trendCanvas) {
        const ctx = trendCanvas.getContext('2d');
        drawTrendChart(ctx, trendCanvas);
    }
}

function drawPerformanceChart(ctx, canvas) {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    const data = [85, 87, 89, 86, 88, 91, 87, 89, 92, 88];
    const width = canvas.width;
    const height = canvas.height;
    const padding = 20;
    
    ctx.clearRect(0, 0, width, height);
    ctx.strokeStyle = '#007bff';
    ctx.lineWidth = 2;
    ctx.beginPath();
    
    for (let i = 0; i < data.length; i++) {
        const x = padding + (i * (width - 2 * padding)) / (data.length - 1);
        const y = height - padding - ((data[i] - 80) * (height - 2 * padding)) / 20;
        
        if (i === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    }
    
    ctx.stroke();
    
    // Agregar puntos
    ctx.fillStyle = '#007bff';
    for (let i = 0; i < data.length; i++) {
        const x = padding + (i * (width - 2 * padding)) / (data.length - 1);
        const y = height - padding - ((data[i] - 80) * (height - 2 * padding)) / 20;
        
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fill();
    }
}

function drawEfficiencyChart(ctx, canvas) {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    const data = [65, 25, 10]; // Óptimo, Regular, Crítico
    const colors = ['#4CAF50', '#FFC107', '#F44336'];
    const total = data.reduce((a, b) => a + b, 0);
    
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 20;
    
    let currentAngle = -Math.PI / 2;
    
    for (let i = 0; i < data.length; i++) {
        const sliceAngle = (data[i] / total) * Math.PI * 2;
        
        ctx.fillStyle = colors[i];
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
        ctx.closePath();
        ctx.fill();
        
        currentAngle += sliceAngle;
    }
}

function drawTrendChart(ctx, canvas) {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    const data = [12, 15, 8, 10, 6, 4, 7];
    const width = canvas.width;
    const height = canvas.height;
    const padding = 20;
    const barWidth = (width - 2 * padding) / data.length;
    
    ctx.fillStyle = '#28a745';
    
    for (let i = 0; i < data.length; i++) {
        const barHeight = (data[i] / 20) * (height - 2 * padding);
        const x = padding + i * barWidth + barWidth * 0.1;
        const y = height - padding - barHeight;
        
        ctx.fillRect(x, y, barWidth * 0.8, barHeight);
    }
}

// Actualizar gráficos en tiempo real
function updateCharts() {
    setTimeout(() => {
        initializeCharts();
        updateCharts();
    }, 5000); // Actualizar cada 5 segundos
}

// Cerrar modales al hacer clic fuera
window.onclick = function(event) {
    const solutionModal = document.getElementById('solution-modal');
    const reportModal = document.getElementById('report-modal');
    
    if (event.target === solutionModal) {
        solutionModal.style.display = 'none';
    }
    
    if (event.target === reportModal) {
        reportModal.style.display = 'none';
    }
}

// Inicialización cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar gráficos
    initializeCharts();
    
    // Actualizar estadísticas si estamos en el dashboard
    if (document.getElementById('pending-tasks')) {
        updateDashboardStats();
        setInterval(updateDashboardStats, 10000); // Cada 10 segundos
    }
    
    // Actualizar estadísticas de errores si estamos en esa página
    if (document.getElementById('total-errors')) {
        updateErrorStats();
    }
    
    // Configurar fecha por defecto en reportes
    if (document.getElementById('report-type')) {
        updateReportOptions();
    }
    
    // Iniciar actualización de gráficos
    updateCharts();
    
    // Mostrar notificación de bienvenida
    setTimeout(() => {
        showNotification('Sistema FOLMEX cargado correctamente', 'success');
    }, 1000);
});