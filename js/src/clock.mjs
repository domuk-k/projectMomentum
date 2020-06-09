const $layoutClock= document.getElementById('layout-clock');

//2. 매 초마다 시간을 불러와 text 내용만 교체
//  digital 시계와 percentage를 같이 그림 
function changeClcok (){
    const $clockDigital = document.querySelector('.clock-digital');
    const $clockPercent = document.querySelector('.clock-percent');
    
    const now = new Date;
    const nowHours = now.getHours();
    const nowMinutes =now.getMinutes();
    
    const startTime = 10;
    const endTime = 22;
    const percentUnit = Math.abs(startTime-endTime)

    //시계 - 두자리 수를 맞출 것
    $clockDigital.textContent = `${
        nowHours >= 10 ? nowHours : '0' + nowHours 
        }:${
        nowMinutes >= 10 ? nowMinutes : '0' + nowMinutes
        }`;

    //percent - 두자리 수를 맞출 것 / 기준 시간은 10시부터 22시까지 / 이외의 시간이 넘어가면 +를 달 것 
    $clockPercent.textContent = `${
        nowHours >= startTime && nowHours < endTime ?
        Math.ceil((Math.abs(nowHours-startTime)+(nowMinutes/60))/percentUnit*100)
        :nowHours >= endTime ?
        Math.ceil(((nowHours-endTime)+(nowMinutes/60))/percentUnit*100)
        :'+'+ Math.ceil(((nowHours+(24-endTime))+(nowMinutes/60))/percentUnit*100)
        }%`;
        setTimeout(changeClcok,1000)
    };

//1.미리 시간을 넣을 수 있는 html을 넣고 시작
export function renderClock(){
    $layoutClock.innerHTML = `<div class="clock-digital"></div>
    <div class="clock-percent clock-active"></div>
    <button class="clock-toggle-btn"></button>` 
    changeClcok();
}

// 3. 버튼의 클릭이벤트
$layoutClock.onclick = (e) => {
    if(!e.target.matches('button')) return 
    $layoutClock.querySelectorAll('div').forEach( clock => clock.classList.toggle('clock-active')); 
}