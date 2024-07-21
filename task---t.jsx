function selectDisk(event) {
    const disk = event.target;
    if (disk.draggable) {
        disk.classList.add('selected');
    }
}

function deselectDisk(event) {
    const disk = event.target;
    disk.classList.remove('selected');
}

function allowDrop(event) {
    event.preventDefault();
}

function dropDisk(event) {
    event.preventDefault();
    const selectedDisk = document.querySelector('.selected');
    const targetTower = event.currentTarget;
    const topDisk = targetTower.querySelector('.disk:last-child');

    if (!topDisk || selectedDisk.clientWidth < topDisk.clientWidth) {
        targetTower.appendChild(selectedDisk);
        checkWinCondition();
    }
    selectedDisk.classList.remove('selected');
}

function checkWinCondition() {
    const tower3 = document.getElementById('tower3');
    const disks = tower3.querySelectorAll('.disk');

    if (disks.length === 4) {
        alert('You won!');
    }
}

function resetGame() {
    const tower1 = document.getElementById('tower1');
    const tower2 = document.getElementById('tower2');
    const tower3 = document.getElementById('tower3');

    tower1.innerHTML = `
        <div class="disk" style="width: 100px;" draggable="true"></div>
        <div class="disk" style="width: 80px;" draggable="true"></div>
        <div class="disk" style="width: 60px;" draggable="true"></div>
        <div class="disk" style="width: 40px;" draggable="true"></div>
    `;

    tower2.innerHTML = '';
    tower3.innerHTML = '';

    const disks = document.querySelectorAll('.disk');
    disks.forEach(disk => {
        disk.addEventListener('dragstart', selectDisk);
        disk.addEventListener('dragend', deselectDisk);
    });

    const towers = document.querySelectorAll('.tower');
    towers.forEach(tower => {
        tower.addEventListener('dragover', allowDrop);
        tower.addEventListener('drop', dropDisk);
    });
}

document.addEventListener('DOMContentLoaded', resetGame);
