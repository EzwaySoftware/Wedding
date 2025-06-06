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

// rsvp
window.addEventListener("load", function() {
    const form = this.document.getElementById('rsvp-form');
    form.addEventListener("submit", function(e) {
        e.preventDefault();

        const status = document.getElementById('status').value
        const nama = document.getElementById('nama').value.trim()

        if (nama === "") {
            Swal.fire({
                icon: "error",
                text: "Nama wajib diisi!"
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