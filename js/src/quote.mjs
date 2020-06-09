let quote = []
const $layoutQuote = document.getElementById('layout-quote')
let num = ''

//인덱스로 접근한 쿼츠를 변수에 담고 해당 내용을 랜더한다. 
//로드 할 때마다 다시 그릴 수 있으니, 랜더에 값을 할당해버림
//2)
function renderQuote(){
  let resultQuote = quote[randomIndex()];
   if(!quote.length){ $layoutQuote.innerHTML = `<div>이제 그만~</div>`
  }else{
    $layoutQuote.innerHTML = `<div class="quote-text">${resultQuote.text}</div>
  <div class="quote-author">${resultQuote.author}
  <button class="quote-alter-btn"></botton></div>
  `
  return num = quote.indexOf(resultQuote) ;}
}

//index로 접근하기 위한 랜덤 인덱스 함수
function randomIndex(){
    return Math.floor(Math.random()*(quote.length));
}

function alterQuote(){
  quote = quote.filter( cite => cite.selection);
}
//이벤트 
$layoutQuote.onclick= (e) =>{
  if(!e.target.matches('button')) return 
  quote =quote.map(cite => quote[num] === cite ? {...cite, selection: false}: cite );
  alterQuote();
  renderQuote();  
}

//1)
export function getQuote() {

    quote = [{
        "text": "Genius is one percent inspiration and ninety-nine percent perspiration.",
        "author": "Thomas Edison",
        "selection": true
      },
      {
        "text": "You can observe a lot just by watching.",
        "author": "Yogi Berra",
        "selection": true
      },
      {
        "text": "A house divided against itself cannot stand.",
        "author": "Abraham Lincoln",
        "selection": true
      },
      {
        "text": "Difficulties increase the nearer we get to the goal.",
        "author": "Johann Wolfgang von Goethe",
        "selection": true
      },
      {
        "text": "Fate is in your hands and no one elses",
        "author": "Byron Pulsifer",
        "selection": true
      },
      {
        "text": "Be the chief but never the lord.",
        "author": "Lao Tzu",
        "selection": true
      },
      {
        "text": "Nothing happens unless first we dream.",
        "author": "Carl Sandburg",
        "selection": true
      },
      {
        "text": "Well begun is half done.",
        "author": "Aristotle",
        "selection": true
      },
      {
        "text": "Life is a learning experience, only if you learn.",
        "author": "Yogi Berra",
        "selection": true
      },
      {
        "text": "Self-complacency is fatal to progress.",
        "author": "Margaret Sangster",
        "selection": true
      },
      {
        "text": "Peace comes from within. Do not seek it without.",
        "author": "Buddha",
        "selection": true
      },
      {
        "text": "What you give is what you get.",
        "author": "Byron Pulsifer",
        "selection": true
      },
      {
        "text": "We can only learn to love by loving.",
        "author": "Iris Murdoch",
        "selection": true
      },
      {
        "text": "Life is change. Growth is optional. Choose wisely.",
        "author": "Karen Clark",
        "selection": true
      },
      {
        "text": "You'll see it when you believe it.",
        "author": "Wayne Dyer",
        "selection": true
      }]


    renderQuote()    
    }