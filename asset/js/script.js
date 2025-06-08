AOS.init()

// music
var tempMusic = ''
music = document.querySelector('.music')
if (tempMusic) {
    music.src = tempMusic
}

// door mulai
function mulai() {
    // back to top
    window.scrollTo(0, 0)

    // sound door
    var soundDoor = document.querySelector('.sound-door')
    soundDoor.play()

    // door section
    var doorSection = $('#door-section')
    var doors = document.querySelectorAll('.door')
    doors.forEach(function (door, index) {
    
        if (door.classList.contains('door-left')) {
        door.style.transform = 'rotateY(-70deg)' // buka ke kiri
        } else {
        door.style.transform = 'rotateY(70deg)' // buka ke kanan
        }   
    })

    // set timeout music
    setTimeout(function () {
        // music play
        music.play()
        doorSection.css('transform', 'scale(6)')
    }, 600)

    // set timeout door section
    setTimeout(function () {
        doorSection.css('opacity', 0)
        $('body').removeClass('overflow-hidden')
        $('body').addClass('transition')
        doorSection.css('display', 'none')
    }, 2000)
}

// button music
var isPlaying = true

function toogleMusic(event) {
    event.preventDefault()

    const musicButton= document.getElementById('music-button')

    if (isPlaying) {
        musicButton.innerHTML = '<i class = "fas fa-fw fa-pause"></i>'
        musicButton.classList.remove('rotate')
        musicButton.style.transform = 'translateY(0)'
        music.pause()
    } else {
        musicButton.innerHTML = '<i class = "fas fa-fw fa-compact-disc"></i>'
        musicButton.classList.add('rotate')
        music.play()
    }

    isPlaying = !isPlaying
}

// countdown wedding
var countdownDate = new Date("Feb 10, 2024 10:00:00").getTime()

var x = setInterval(function () {
    var now = new Date().getTime()
    
    var distance = countdownDate - now
    var days = Math.floor(distance / (1000 * 60 * 60 * 24))
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
    var seconds = Math.floor((distance % (1000 * 60)) / 1000)
    
    document.getElementById('countdown-wedding').innerHTML = ` 
    <div class="col-lg-1 col-3"><div class="text-center p-2 rounded"><h5>${days} </h5> Hari</div></div>
    <div class="col-lg-1 col-3"><div class="text-center p-2 rounded"><h5>${hours}</h5> Jam</div></div>
    <div class="col-lg-1 col-3"><div class="text-center p-2 rounded"><h5>${minutes}</h5> Menit</div></div>
    <div class="col-lg-1 col-3"><div class="text-center p-2 rounded"><h5>${seconds}</h5> Detik</div></div>
    `
})

if (distance < 0) {
    clearInterval(x)
    document.getElementById('countdown-wedding').innerHTML = "<span class'text-center p-3 rounded m-2><h2>Sudah dimulai!</h2></span>"
}


// rsvp
window.addEventListener("load", function() {
    const form = this.document.getElementById('rsvp-form');
    form.addEventListener("submit", function(e) {
        e.preventDefault();

        const status = document.getElementById('status').value
        const nama = document.getElementById('nama').value.trim()
        const jumlah = document.getElementById('jumlah').value

        if (nama === "") {
            Swal.fire({
                icon: "error",
                text: "Nama wajib diisi!"
            })
            return;
        }

        if (jumlah === "0") {
            Swal.fire({
                icon: "error",
                text: "Pilih jumlah kehadiran terlebih dahulu!"
            })
            return;
        }


        if (status === "0") {
            Swal.fire({
                icon: "error",
                text: "Pilih salah satu status terlebih dahulu!"
            })
            return;
        }

        const data = new FormData(form);
        const action = e.target.action;
        const input = form.querySelectorAll('input, select, button')
        input.forEach(input => {
            input.disabled = true
        })

        fetch(action, {
            method: 'POST',
            body: data
        })
        .then(() => {
            Swal.fire({
                icon: "success",
                text: "Konfirmasi kehadiran Anda berhasil terkirim!"
            })
        })
        .catch((error) => {
            Swal.fire({
                icon: "error",
                text: "Error"
            })
        })
        .finally(() => {
            input.forEach(input => {
                input.disabled = false
            })
        })
    })
})