class CienIngesDijeron {

    contador = 0;
    equipo1 = { pts: 0, strikes: 0 };
    equipo2 = { pts: 0, strikes: 0 };

    data = [{
        Q: "1. ¿Cómo puedes persuadir a una persona?",
        answers: [
            { A: "Argumentando correctamente ", pts: 40 },
            { A: "Estableciendo un vinculo emocional (empatia).", pts: 21 },
            { A: "Evita conflictos.", pts: 16 },
            { A: "Mostrando seguridad en las palabras", pts: 15 },
            { A: "Darle la razón.", pts: 8 }
        ]
    },
    {
        Q: "2. Marcas mundialmente conocidas ",
        answers: [
            { A: "Apple", pts: 27 },
            { A: "Amazon", pts: 25 },
            { A: "Google", pts: 21 },
            { A: "Samsung", pts: 11 },
            { A: "Cocacola", pts: 8 },
            { A: "Facebook", pts: 6 },
            { A: "Microsoft", pts: 2 }
        ]
    },
    {
        Q: "3. Lenguaje corporal que refleja que estás nervioso (puntos al doble)",
        answers: [
            { A: "Tartamudear", pts: 56 },
            { A: "Esconder las manos", pts: 50 },
            { A: "Mover alguna parte de tu cuerpo ", pts: 34 },
            { A: "Temblar", pts: 32 },
            { A: "Cruzar los brazos ", pts: 28 }
        ]
    },
    {
        Q: "4. Algunos empresarios más reconocidos (puntos al triple)",
        answers: [
            { A: "Steve Jobs ", pts: 84 },
            { A: "Carlos Slim ", pts: 66 },
            { A: "Elon Musk", pts: 54 },
            { A: "Marck Zuckerberg", pts: 45 },
            { A: "Jeff Bezos", pts: 30 },
            { A: "Bill gates ", pts: 21 }
        ]
    },
    {
        Q: "5. Errores comunes que deben evitarse al negociar: (puntos al triple)",
        answers: [
            { A: "No prepararse lo suficiente antes de la negociación.", pts: 84 },
            { A: "No escuchar activamente a la otra parte.", pts: 66 },
            { A: "Revelar demasiada información demasiado pronto.", pts: 54 },
            { A: "No conocer el valor real de lo que estás negociando.", pts: 45 },
            { A: "Dejar que las emociones tomen el control.", pts: 30 },
            { A: "No tener un plan de reserva o alternativas.", pts: 21 }
        ]
    }]

    respuesta_correcta = (ronda, opt) => {
        var x = this.data[ronda].answers[opt]
        console.log(x.A);
        this.contador += x.pts
    }

    equipo1_respuesta_incorrecta = () => {
        console.log("Sonido de pipip");
        if (this.equipo1.strikes >= 2) {
            console.log("Robo de puntos.");
        } else {
            this.equipo1.strikes += 1
        }
    }

    equipo2_respuesta_incorrecta = () => {
        console.log("Sonido de pipip");
        if (this.equipo2.strikes >= 2) {
            console.log("Robo de puntos.");
        } else {
            this.equipo2.strikes += 1
        }
    }

    equipo1_gana = () => {
        console.log("Sonido de festejo");
        this.equipo1.strikes = 0
        this.equipo1.pts += this.contador
        this.contador = 0
    }

    equipo2_gana = () => {
        console.log("Sonido de festejo");
        this.equipo2.strikes = 0
        this.equipo2.pts += this.contador
        this.contador = 0
    }
}

const $pregunta = document.getElementById('preguntas')
const $contador = document.getElementById('contador')
const $cont_equipo1 = document.getElementById('cont_equipo1')
const $cont_equipo2 = document.getElementById('cont_equipo2')
const $win1 = document.getElementById('win1')
const $win2 = document.getElementById('win2')
const $next = document.getElementById('next')
const $question = document.getElementById('question')

var x = new CienIngesDijeron()

var n = 0

$next.addEventListener('click', () => {
    if (n < x.data.length - 1) {
        n++
        cargar(n)
    } else {
        // funciona como una redirección HTTP
        window.location.replace("/finish.html");
    }
})
cargar(n)

function cargar(n) {
    var countI = 0
    $pregunta.innerHTML = ''
    $question.innerHTML = ''
    x.data[n].answers.forEach(e => {
        $pregunta.innerHTML += `<tr><td><input type="button" id="u${countI + 1}" class="opt" value="${countI + 1}"/></td></tr>`
        countI++
    });

    var opt = document.querySelectorAll("input.opt")
    $question.innerHTML = x.data[n].Q
    opt.forEach(e => {
        e.addEventListener('click', (e) => {
            let val = parseInt(e.target.value) - 1
            let ptsX = parseInt(x.data[n].answers[val].pts)
            e.target.value = `${x.data[n].answers[val].A} - ${ptsX}pts`
            x.contador += ptsX
            $contador.innerHTML = x.contador
        })
    })

    $win1.addEventListener('click', () => {
        x.equipo1_gana();
        $contador.innerHTML = x.contador
        $cont_equipo1.innerHTML = x.equipo1.pts
    })
    $win2.addEventListener('click', () => {
        x.equipo2_gana();
        $contador.innerHTML = x.contador
        $cont_equipo2.innerHTML = x.equipo2.pts
    })
}