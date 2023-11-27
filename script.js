const done = []
let randomQuest
let start = true
const review = [
   "Você está muito vulnerável e despreparado para evitar golpes",
   "Você está muito vulnerável e despreparado para evitar golpes",
   "Você está um pouco vulnerável e despreparado para evitar golpes",
   "Você está pouco preparado para evitar golpes",
   "Você está razoavelmente preparado para evitar golpes",
   "Você está bem preparado para evitar golpes",
   "Você está muito preparado e provavelmente não irá cair em golpes"
]
const questionTextDom = document.querySelector("#questionText")
const question = [
   {number: 1, text: "Identifique qual destas alternativas apresenta um domínio perigoso", answer: [
      "https://instragam.com", "https://drive.google.com", "https://facebook.com", "https://web.whatsapp.com"
   ]}, 
   {number: 2, text: "O e-mail a seguir foi recebido por um vendedor durante a negociação de um produto na OLX. <br> <img src=./imgs/olx1.png>", answer: [
      "O e-mail trata-se de uma tentativa de golpe, dado que a OLX nunca irá pedir por seus dados pessoais por este meio.", "O e-mail aparenta ser oficial e de origem confiável, logo as orientações descritas no mesmo devem ser seguidas.", "O e-mail trata-se de uma tentativa de golpe, e a OLX nunca se comunica com seus usuários por este meio.", "O e-mail trata-se de uma tentativa de golpe por conter links que podem ter origem maliciosa."
   ]},
   {number: 3, text: "Qual das alternativas a seguir está correta. <br> <br> <img src=./imgs/bancobrasil.png>", answer: [
      "A mensagem trata-se de uma fraude, devido à sua natureza suspeita e da presença de um link que não aparenta ser oficial e provavelmente é de origem maliciosa.", "A mensagem não tende a ser fraudulenta.", "A mensagem tende a ser fraudulenta, dado que o banco nunca manda mensagens por SMS aos seus clientes", "A mensagem tende a ser fraudulenta, pois o banco nunca notifica seus clientes a respeito do agendamento de pagamentos por meio de PIX."
   ]},
   {number: 4, text: "Você se depara com o seguinte e-mail <br> <br> <img src=./imgs/bancobrasil1.png> <br> Qual o principal elemento que faz com que seja uma mensagem fraudulenta?", answer: [
      "O e-mail de envio da empresa", "A baixa resolução do arquivo", "O número do protocolo de acesso", "A informalidade na mensagem"
   ]},
   {number: 5, text: "Você se depara com o seguinte sms <br> <br> <img src=./imgs/sms.png> <br> Qual o principal elemento que faz com que seja uma mensagem fraudulenta?", answer: [
      "A informalidade do banco ao contatar o cliente", "O DDD do número usado pelo banco", "Não tende a ser um golpe", "O domínio (site) estranho enviado"
   ]},
   {number: 6, text: "Como o remetente identificou que o SMS se trata de um golpe <br> <br> <img src=./imgs/bet.jpg class=imgPers >", answer: [
      "O remetente não se registrou em nenhuma plataforma ou sorteio, logo não há motivo para receber um SMS oferecendo um prêmio. ", "O SMS está oferecendo dinheiro muito facilmente, algo que não existe.", "A informalidade da mensagem, comprova a suspeita de que o SMS trata-se de um golpe.", "No começo da mensagem as palavras “Fortune tiger” mostram que se trata de uma casa de apostas, portanto é um golpe."
   ]}
]
const totalQuestNumber = question.length
const answer = {
   question_1: null,
   question_2: null,
   question_3: null,
   question_4: null,
   question_5: null,
   question_6: null
}
const rightAnswer = {
   question_1: 1,
   question_2: 1,
   question_3: 1,
   question_4: 1,
   question_5: 1,
   question_6: 1
}
let resultCount = 0
let resultArray = []


function defineOrderAnswer(randomQuest) {
   let doneAnswer = []
   let randomAnswer
   let totalAnswerNumber = 4
   let uniSize = 0
   while (true) {
      randomAnswer = Math.floor((Math.random() * 4) + 1);
      if (doneAnswer.includes(randomAnswer)) {
         if (doneAnswer.length >= totalAnswerNumber) {
            break
         }  
      }
      else {
         doneAnswer.push(randomAnswer)
      }
   }
   for (var x = 0; x < totalAnswerNumber; x++) {
      document.querySelectorAll(".answer")[x].id = "a" + String(doneAnswer[x])
      document.querySelectorAll(".answer")[x].children[0].innerHTML = question[randomQuest].answer[doneAnswer[x] - 1]
      if (document.querySelectorAll(".answer")[x].clientHeight > uniSize) {
         document.querySelectorAll(".answer")[x].style.height = `auto`
         uniSize = document.querySelectorAll(".answer")[x].clientHeight
      }
   } 
   for (var x = 0; x < totalAnswerNumber; x++) document.querySelectorAll(".answer")[x].style.height = uniSize + `px`
}
let rep = 0
function defineQuestion(rep) {
   while (true) {
      if (!rep) randomQuest = Math.floor((Math.random() * 6));
      else {
         randomQuest = done[rep]
         rep++
      } 
      if (done.includes(randomQuest)) {
         if (done.length >= totalQuestNumber) {
            questionTextDom.innerText = "Fim do quiz"
            document.querySelector("button.cont").style.visibility = `hidden`
            document.querySelector(".questCont").style.visibility = `hidden`
            document.querySelector(".continuar").style.visibility = `visible`
            document.querySelector(".continuar").style.height = `100%`
            document.querySelector(".continuar").children[0].innerText = `Ver resultados`
            document.querySelector("button.cont").style.visibility = `hidden`
            document.querySelector("span.questCounter").style.visibility = `hidden`
            start = false
            break
         }  
      }
      else {
         done.push(randomQuest)  
         questionTextDom.innerHTML = question[randomQuest].text
         defineOrderAnswer(randomQuest)
         break
      }
   }
}

function defineClick() {
   for (var c = 1; c <= 4; c++) {
      
      document.querySelector("#a" + c).addEventListener("click", (e) => {

         if (e.target.classList.contains(`answerText`)) {
            element = e.target.parentElement
         }
         else {
            element = e.target
         }
         for (var d = 0; d <= 3; d++) document.querySelectorAll(`.answer`)[d].classList = `answer`
         document.querySelector("button.cont").classList = "cont yesButton"
         element.classList += ` clicked`
      })
   }
      
}
function showResults() {
   let str = ``
   for(var c = 1; c<=totalQuestNumber; c++) {
      if (answer["question_"+c] == rightAnswer["question_"+c]) {
         resultCount +=1
         resultArray.push(true)
      }
      else {
         resultArray.push(false)
      }
   }
   done.forEach(e => {
      if (resultArray[e]) str += `✅`
      if (!resultArray[e]) str += `❌`
   });
   document.querySelector(".container").innerHTML = `<div class="resultBox"><span class="resultText"> Você acertou `+resultCount + `/` + totalQuestNumber + `<br>`+ str+` <br> <br> ` + review[resultCount] +`</span></div>`
   document.querySelector(".resultBox").addEventListener("click", () => {
      rep = 1
      defineQuestion()
   })
}

document.querySelector(".continuar").addEventListener("click", () => {
   if (start) {
      defineQuestion(0)
      defineClick()
      document.querySelector("button.cont").style.visibility = `visible`
      document.querySelector(".questCont").style.visibility = `visible`
      document.querySelector(".continuar").style.visibility = `hidden`
      document.querySelector(".continuar").style.height = 0
      document.querySelector("span.questCounter").style.visibility = `visible`
   } 
   if (!start) showResults()
})

document.querySelector("button").addEventListener("click", () => {
   if (document.querySelector(`.clicked`)) {
      answer["question_" + (randomQuest + 1)] = document.querySelector(`.clicked`).id.replace(`a`, ``)
      for (var d = 0; d <= 3; d++) document.querySelectorAll(`.answer`)[d].classList = `answer`
      document.querySelector("button.cont").classList = "cont notButton"
      document.querySelector("span.questCounter").innerText = done.length + 1 + `/` + totalQuestNumber
      defineQuestion(false)
   }
})








