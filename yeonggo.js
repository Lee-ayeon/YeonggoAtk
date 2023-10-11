//먼저 선언해야하는 것들 박아둠
function showcheckalert() {
  document.getElementById("checkalert").style.display = "block";
}
function closecheckalert() {
  document.getElementById("checkalert").style.display = "none";
}
function closequickadd() {
  document.getElementById("quickadd").style.display = "none";
}
function showinputalert() {
  document.getElementById("inputalert").style.display = "block";
}
function closeinputalert() {
  document.getElementById("inputalert").style.display = "none";
}
function showfullalert() {
  document.getElementById("fullalert").style.display = "block";
}
function closefullalert() {
  document.getElementById("fullalert").style.display = "none";
}
function showatkmaker() {
  document.getElementsByClassName("atkmaker")[0].style.display = "block";
}
function closeatkmaker() {
  document.getElementsByClassName("atkmaker")[0].style.display = "none";
}
let nextelday = "";
let day = "";
let atknum = "";
let time = "";
let AMorPM = "";
let elday = "";
let koday = "";
let difficulty = "";
let mbrlist = [];
let atkarray = [];
let atklist = [];
let historylist = [];
let dungeon = `카양겔`;
let numofmbr = 4;
let numofmbrlist = [];
let classname, level, character_name, day_atknum;
let name_array = [];
let load_img_name = "";
let load_name = "";
let atk_Id = "";
let nameValue = "";
let name_atk = "";
let imageId = "";
let classGroup = "";
let thisid = "";

// 드롭다운 초기 박스
const dropdown = document.querySelector(".dropdown");
const toggleButton = document.querySelectorAll(".dropdown-toggle")[0];
const dungeonselectbtn = document.querySelector(".dungeonselecterunit");
const dayselectbtn = document.querySelector(".dayselecterunit");
// 드롭다운 메뉴
const menu = document.querySelectorAll(".dropdown-menu")[0];
const dungeonmenu = document.querySelector(".dungeonselecter-menu");
const daymenu = document.querySelector(".dayselecter-menu");
// 드롭다운 옵션
let options = ``;
options = document.querySelectorAll(".dropdown-option");
const dungeonoptions = document.querySelectorAll(".dungeon-option");
const dayoptions = document.querySelectorAll(".day-option");

//던전 메뉴 클릭시 던전 옵션 표시
dungeonselectbtn.addEventListener("click", () =>
  dungeonmenu.classList.toggle("show")
);
//던전 메뉴 블러 시 옵션 숨김
dungeonselectbtn.addEventListener("blur", () =>
  dungeonmenu.classList.remove("show")
);
//던전 메뉴 옵션마다 클릭 이벤트 리스너 부여
dungeonoptions.forEach((item) =>
  item.addEventListener("click", selectdungeonOption)
);
//던전 선택 드롭다운 옵션 선택시
function selectdungeonOption() {
  const value = this.textContent.trim(); //옵션 이름으로 바꾸고
  dungeonselectbtn.textContent = value;
  dungeonselectbtn.classList.add("selected"); //색 바꾸기
  dungeon = value;
  console.log(`던전명: ${dungeon}`);
  getnumofmbr();
  console.log(`인원수: ${numofmbr}`);
}

//요일 메뉴 클릭시 던전 옵션 표시
dayselectbtn.addEventListener("click", () => daymenu.classList.toggle("show"));
//요일 메뉴 블러 시 옵션 숨김
dayselectbtn.addEventListener("blur", () => daymenu.classList.remove("show"));
//요일 메뉴 옵션마다 클릭 이벤트 리스너 부여
dayoptions.forEach((item) => item.addEventListener("click", selectdayOption));
//요일 선택 드롭다운 옵션 선택시
function selectdayOption() {
  const value = this.textContent.trim(); //옵션 이름으로 바꾸고
  dayselectbtn.textContent = value;
  dayselectbtn.classList.add("selected"); //색 바꾸기
  switch (value) {
    case `월요일`:
      elday = `mon`;
      koday = `월`;
      day = mon;
      nextelday = `tue`;
      break;
    case `화요일`:
      elday = `tue`;
      koday = `화`;
      day = tue;
      nextelday = `end`;
      break;
    case `수요일`:
      elday = `wed`;
      koday = `수`;
      day = wed;
      nextelday = `thu`;
      break;
    case `목요일`:
      elday = `thu`;
      koday = `목`;
      day = thu;
      nextelday = `fri`;
      break;
    case `금요일`:
      elday = `fri`;
      koday = `금`;
      day = fri;
      nextelday = `sat`;
      break;
    case `토요일`:
      elday = `sat`;
      koday = `토`;
      day = sat;
      nextelday = `sun`;
      break;
    case `일요일`:
      elday = `sun`;
      koday = `일`;
      day = sun;
      nextelday = `mon`;
      break;
  }
  console.log(`요일: ${value}`);
  console.log(`간단하게: ${koday}`);
  console.log(`영어로는: ${elday}`);
  console.log(`다음날은: ${nextelday}`);
}

//공격대 메뉴 클릭시 옵션 표시
toggleButton.addEventListener("click", () => menu.classList.toggle("show"));
//공격대 메뉴 블러 시 옵션 숨김
toggleButton.addEventListener("blur", () => menu.classList.remove("show"));
//공격대 선택 드롭다운 옵션마다 클릭 이벤트 리스너 부여
options.forEach((item) => item.addEventListener("click", selectOption));
//공격대 선택 드롭다운 옵션 선택시
function selectOption() {
  const value = this.textContent.trim(); //옵션 이름으로 바꾸고
  console.log(this.textContent.trim());
  toggleButton.textContent = value;
  toggleButton.classList.add("selected"); //색 바꾸기
}

// 요일별 공격대 개수(atk) 및 공격대별 인원수(mbr) : 요일 배열
let wed, thu, fri, sat, sun, mon, tue;
wed = {
  atk: JSON.parse(localStorage.getItem(`wed : atk`)),
  mbr: JSON.parse(localStorage.getItem(`wed : mbr`)),
};
thu = {
  atk: JSON.parse(localStorage.getItem(`thu : atk`)),
  mbr: JSON.parse(localStorage.getItem(`thu : mbr`)),
};
fri = {
  atk: JSON.parse(localStorage.getItem(`fri : atk`)),
  mbr: JSON.parse(localStorage.getItem(`fri : mbr`)),
};
sat = {
  atk: JSON.parse(localStorage.getItem(`sat : atk`)),
  mbr: JSON.parse(localStorage.getItem(`sat : mbr`)),
};
sun = {
  atk: JSON.parse(localStorage.getItem(`sun : atk`)),
  mbr: JSON.parse(localStorage.getItem(`sun : mbr`)),
};
mon = {
  atk: JSON.parse(localStorage.getItem(`mon : atk`)),
  mbr: JSON.parse(localStorage.getItem(`mon : mbr`)),
};
tue = {
  atk: JSON.parse(localStorage.getItem(`tue : atk`)),
  mbr: JSON.parse(localStorage.getItem(`tue : mbr`)),
};
let mbrarray = [wed.mbr, thu.mbr, fri.mbr, sat.mbr, sun.mbr, mon.mbr, tue.mbr];
let atkstate = [wed.atk, thu.atk, fri.atk, sat.atk, sun.atk, mon.atk, tue.atk];
let daylist = ["wed", "thu", "fri", "sat", "sun", "mon", "tue", "end"];
console.log(atkstate);
console.log(mbrarray);
// 가장 긴 배열 찾기.
let longestArray = atkstate.reduce((prev, current) => {
  return current.length > prev.length ? current : prev;
}, []);
// 불러오기 및 나타내기
for (let i = 0; i < 7; i++) {
  for (let l = 0; l < longestArray.length; l++) {
    const day = daylist[i];
    const nextday = daylist[i + 1];
    const atk = atkstate[i];
    const mbr = mbrarray[i][l];
    //공대 표시하기
    if (localStorage.getItem(`atk : ${day}_atk${atk[l]}`) !== null) {
      document
        .getElementsByClassName(`${nextday}`)[0]
        .previousElementSibling.insertAdjacentHTML(
          "beforebegin",
          localStorage.getItem(`atk : ${day}_atk${atk[l]}`)
        );
    } else {
    }

    //드롭다운 요소 표시하기
    if (localStorage.getItem(`drop : ${day}_atk${atk[l]}`) !== null) {
      document
        .getElementsByClassName(`dropdown-menu`)[0]
        .insertAdjacentHTML(
          "beforeend",
          localStorage.getItem(`drop : ${day}_atk${atk[l]}`)
        );
    } else {
    }

    for (let k = 0; k < mbr; k++) {
      let day_atknum_mbrnum = `${day}_atk${atk[l]}_mbr${k + 1}`;
      let day_atknum_Lvnum = `${day}_atk${atk[l]}_lv${k + 1}`;
      //이름 불러오기
      eval(
        `${day_atknum_mbrnum} = localStorage.getItem('${day_atknum_mbrnum}') || "★딜러공석★";`
      );
      // 이미지 불러오기
      eval(
        `img_${day_atknum_mbrnum} = localStorage.getItem('img_${day_atknum_mbrnum}') || "딜러구함";`
      );
      //아이템 레벨 불러오기
      eval(
        `${day_atknum_Lvnum} = localStorage.getItem('${day_atknum_Lvnum}') || "0";`
      );
      //이름 나타내기
      eval(
        `document.getElementById("${day_atknum_mbrnum}").innerHTML = ${day_atknum_mbrnum};`
      );
      //이미지 나타내기
      eval(
        `document.getElementById("img_${day_atknum_mbrnum}").src = "img/classlist/"+img_${day_atknum_mbrnum}+".png"`
      );
      //아이템 레벨 나타내기
      eval(
        `document.getElementById("${day_atknum_Lvnum}").innerHTML ="Lv."+${day_atknum_Lvnum}`
      );
    }
  }
}
//히스토리 표시하기
historylist = JSON.parse(localStorage.getItem(`historylist`));
var showhistorylist = document.getElementById("parentElement");
showhistorylist.innerHTML = historylist.join(``);

//윈도우 로드시 아래 함수 작동
const gobtn = document.querySelectorAll(".gobtn")[0];
const notbtn = document.querySelector(".notbtn");
const selectbtn = document.querySelectorAll(".selectbtn");
const choise = document.querySelector("#Choise");
// 스케줄 내 이미지 클릭 시
selectbtn.forEach((element) => {
  element.addEventListener("click", function (event) {
    //퀵리무브 실행시 필요한 데이터 생성
    atk_Id = element.parentElement.previousElementSibling.id; //히스토리 작성 시 이용
    thisid = event.target.id; //클릭한 이미지의 id. 퀵리무브에서 사용
    thislv = event.target.nextElementSibling.nextElementSibling.id; //퀵리무브에서 레벨 0으로 초기화시 사용
    load_name = localStorage.getItem(`${thisid.slice(4, 17)}`); //퀵리무브에서 히스토리 작성 시 사용
    load_img_name = localStorage.getItem(`${thisid}`); //퀵리무브에서 히스토리 작성 시 사용
    showcheckalert();
    event.stopPropagation();
  });
});
// 난이도 버튼에 클릭 이벤트리스너 추가
const normal = document.querySelector(`.normal`);
const hard = document.querySelector(`.hard`);
const hell = document.querySelector(`.hell`);
normal.addEventListener(`click`, () => {
  difficulty = `노말`;
  normal.classList.add(`click`);
  hard.classList.remove(`click`);
  hell.classList.remove(`click`);
  console.log(difficulty);
});
hard.addEventListener(`click`, () => {
  difficulty = `하드`;
  normal.classList.remove(`click`);
  hard.classList.add(`click`);
  hell.classList.remove(`click`);
  console.log(difficulty);
});
hell.addEventListener(`click`, () => {
  difficulty = `헬`;
  normal.classList.remove(`click`);
  hard.classList.remove(`click`);
  hell.classList.add(`click`);
  console.log(difficulty);
});
// AM&PM에 클릭 이벤트리스너 추가
const AM = document.querySelector(`.AM`);
const PM = document.querySelector(`.PM`);
AM.addEventListener(`click`, () => {
  AMorPM = `AM`;
  AM.classList.add(`click`);
  PM.classList.remove(`click`);
  console.log(AMorPM);
});
PM.addEventListener(`click`, () => {
  AMorPM = `PM`;
  AM.classList.remove(`click`);
  PM.classList.add(`click`);
  console.log(AMorPM);
});

// 공대 삭제 버튼 누를 시
const removeatkbtn = document.querySelectorAll(`.remove`);
removeatkbtn.forEach((button) => {
  button.addEventListener(`click`, () => {
    //공대 삭제
    button.parentNode.parentNode.remove();
    //공격대 드롭다운 목록에서도 삭제
    let elements = document.querySelectorAll(`.dropdown-option`); //dropdown-option가 클래스명인 것을 모두 선택
    let selectedElements = [];
    for (let i = 0; i < elements.length; i++) {
      if (
        //`(수) PM 08:00 카양겔 하드`형식으로 된 텍스트와 일치하는 것만 선택
        elements[i].textContent.includes(`${button.previousElementSibling.id}`)
      ) {
        //선택한 요소를 배열에 저장
        selectedElements.push(elements[i]);
      }
    }
    //배열에 저장된 요소 삭제
    selectedElements[0].remove();
    //공대 삭제에 따라 요일 배열 수정
    eval(button.parentNode.parentNode.id.slice(0, 3)).atk.pop();
    eval(button.parentNode.parentNode.id.slice(0, 3)).mbr.pop();
    //삭제한 내용 로컬 스토리지에 업로드
    localStorage.setItem(
      `${button.parentNode.parentNode.id.slice(0, 3)} : atk`,
      JSON.stringify(eval(button.parentNode.parentNode.id.slice(0, 3)).atk)
    );
    localStorage.setItem(
      `${button.parentNode.parentNode.id.slice(0, 3)} : mbr`,
      JSON.stringify(eval(button.parentNode.parentNode.id.slice(0, 3)).mbr)
    );
    location.reload(); //새로고침
  });
});

//경고문 버튼 이벤트리스너 적용
const check_yes = document.querySelector(`.check_yes`);
const check_no = document.querySelector(`.check_no`);
const check_input = document.querySelector(`.check_input`);
const check_full = document.querySelector(`.check_full`);

// 확인 경고창에서 '네 탈퇴할게요' 선택 시 실행
check_yes.addEventListener(`click`, () => {
  quickremove(); //퀵리무브 진행
  nothistory(); //탈퇴 히스토리 작성
  closecheckalert(); //확인 경고창 닫기
  location.reload(); //새로고침
});

// 확인 경고창에서 확인했어요 클릭 시 경고창 닫히기
check_input.addEventListener(`click`, () => closeinputalert());
check_full.addEventListener(`click`, () => closefullalert());

// 확인 경고창에서 '아뇨 취소할래요'선택 시 경고창 닫히기
check_no.addEventListener(`click`, closecheckalert);

//입력된 시간 받아오기
function gettime() {
  time = document.getElementById(`time`).value;
  console.log(`시간: ${time}`);
}

//입력된 관문 받아오기
function getgate() {
  gate = document.getElementById(`gate`).value;
  console.log(`관문: ${gate}`);
}

//참여 버튼 누를 시 작동
gobtn.addEventListener("click", () => {
  //공격대, 캐릭터 이름을 입력했는지 확인.
  if (
    document.querySelector(".dropdown-toggle").textContent.trim() ===
      `공격대를 선택해주세요` ||
    document.getElementById("name").value === ``
  ) {
    showinputalert();
  } else {
    //모두 선택됐다면 실행
    const elements = document.getElementsByClassName(
      "dropdown-toggle selected"
    );
    Array.from(elements).forEach((element) => {
      name_atk = element.textContent;
      nameValue = document.getElementById("name").value;
      outputlevel();
      addprocess();
      gohistory();
    });
  }
});
//탈퇴 버튼 누를 시 작동
notbtn.addEventListener("click", function () {
  const elements = document.getElementsByClassName("dropdown-toggle selected");
  Array.from(elements).forEach((element) => {
    name_atk = element.textContent;
    nameValue = document.getElementById("name").value;
    removeprocess();
    nothistory();
    location.reload();
  });
});
//아이템 레벨 및 클래스명(예)스카우터) 불러오기
async function outputlevel() {
  character_name = nameValue; // 아이템 레벨을 찾을 캐릭터 이름 설정
  let encoded_name = encodeURIComponent(character_name); //해당 이름을 url형식의 언어로 바꿈
  var xmlHttpRequest = new XMLHttpRequest(); //로스트아크 API에 정보를 요청
  xmlHttpRequest.open(
    "GET",
    `https://developer-lostark.game.onstove.com/characters/${encoded_name}/siblings`,
    true
  );
  xmlHttpRequest.setRequestHeader("accept", "application/json");
  xmlHttpRequest.setRequestHeader(
    "authorization",
    "bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyIsImtpZCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyJ9.eyJpc3MiOiJodHRwczovL2x1ZHkuZ2FtZS5vbnN0b3ZlLmNvbSIsImF1ZCI6Imh0dHBzOi8vbHVkeS5nYW1lLm9uc3RvdmUuY29tL3Jlc291cmNlcyIsImNsaWVudF9pZCI6IjEwMDAwMDAwMDAwNTY3NTAifQ.fVU8PqQpJBQAg1tttu2CE2LTOlrRlXayGuJX1S0JuMR8r1SWISyZNQByNIOK0oLLdZxsLzsMr_ljNsPvasmzb76BihxoTkUlJcEyA_4JnIgXW4x7DDvRLqZLzPKyYkklMciSTeZKBs9mwB0qSX28UrthUdF2iYgMWVkAZdH2Qz3npz_FwjGzNT3-bHckRdHkUo_iajh7myghjy205MqgxPp5X7fv3pmPb94c2TeGUS5XUio5F9GyCCGT3-AofI5Dmfy0MG2VSDzB4B3jNfJntVZDmkib80b2JEvQpohJJ3uKvNJcMnKs3kiIpGsAN2efq7_CY0ORORs5NKf3Aur_JQ"
  );
  return new Promise((resolve, reject) => {
    xmlHttpRequest.onreadystatechange = () => {
      if (xmlHttpRequest.readyState === 4) {
        if (xmlHttpRequest.status === 200) {
          // 요청이 완료되었을 때의 처리
          let character_list = JSON.parse(xmlHttpRequest.responseText);
          const foundCharacter = character_list.find(
            (character) => character.CharacterName === character_name
          );
          if (foundCharacter) {
            //아이템 레벨
            result = foundCharacter;
            resolve(foundCharacter);
          } else {
            console.log(`${character_name}을(를) 찾을 수 없습니다.`);
            reject(`${character_name}을(를) 찾을 수 없습니다.`);
          }
        } else {
          console.error(
            "요청 실패:",
            xmlHttpRequest.status,
            xmlHttpRequest.statusText
          );
          reject("요청 실패");
        }
      }
    };
    xmlHttpRequest.send();
  });
}
// 인원수 구하기(4인공대&8인공대)
function getnumofmbr() {
  switch (dungeon) {
    case `쿠크세이튼`:
    case `카양겔`:
    case `혼돈의 상아탑`:
      numofmbr = 4;
      break;
    case `아브렐슈드`:
    case `일리아칸`:
    case `카멘`:
      numofmbr = 8;
      break;
    default:
      console.log(`던전 이름이 올바르지 않습니다.`);
      break;
  }
}
function dealnumber(x) {
  if (x < 3) {
    return x + 1;
  } else {
    return x + 2;
  }
}

//탈퇴 진행
function removeprocess() {
  // 선택한 공격대를 기반으로 요일_공격대명 생성
  // 나중에 wed_atk1_mbr1를 자동으로 만들기 위함
  day_atknum = document.getElementById(name_atk).className.split(` `)[1];
  // wed_atk1_mbr1 = `${day_atknum}_mbr1`로 대체
  // 인원수대로 반복문 생성
  console.log(day_atknum);
  for (let i = 0; i < numofmbr; i++) {
    name_array.push(`#${day_atknum}_mbr${i + 1}`);
  }
  console.log(name_array);
  // 표시된 이름 선택
  const elements = document.querySelectorAll(name_array);
  // 표시된 이름이 입력한 이름과 같은지 비교 후 탈퇴 진행
  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];
    const textContent = element.textContent;
    let localStorageKey, localStorageValue, imgValue;
    if (element.className.includes("deal")) {
      if (textContent === nameValue) {
        localStorageKey = `${day_atknum}_mbr${i + 1}`;
        localStorageValue = "★딜러공석★";
        imgValue = "딜러구함";
      } else {
        console.log(`다른 캐릭터로 넘어감`);
      }
    } else if (element.classList.contains("supt")) {
      if (textContent === nameValue) {
        localStorageKey = `${day_atknum}_mbr${i + 1}`;
        localStorageValue = "★서폿공석★";
        imgValue = "서폿구함";
      } else {
        console.log(`다른 캐릭터로 넘어감`);
      }
    }
    if (localStorageKey && localStorageValue && imgValue) {
      localStorage.setItem(localStorageKey, localStorageValue);
      localStorage.setItem(`img_${localStorageKey}`, imgValue);
      localStorage.setItem(`${day_atknum}_lv${i + 1}`, 1540);
    }
  }
}
//참여 진행
async function addprocess() {
  //클래스명과 아이템 레벨 가져오기
  try {
    const result = await outputlevel();
    level = `${result.ItemAvgLevel.slice(0, 1)}${result.ItemAvgLevel.slice(
      2,
      5
    )}`;
    classname = result.CharacterClassName;
    console.log(`${classname}의 레벨은 ${level}입니다.`); // level 값을 출력
  } catch (error) {
    console.error(error);
  }
  //입력된 클래스명을 보고 어떤 직업군인지 출력
  switch (classname) {
    case `홀리나이트`:
    case `바드`:
    case `도화가`:
      classGroup = `supt`;
      break;
    case `디스트로이어`:
    case `워로드`:
    case `버서커`:
    case `슬레이어`:
    case `배틀마스터`:
    case `인파이터`:
    case `기공사`:
    case `창술사`:
    case `스트라이커`:
    case `데빌헌터`:
    case `블래스터`:
    case `호크아이`:
    case `스카우터`:
    case `건슬링어`:
    case `서머너`:
    case `아르카나`:
    case `소서리스`:
    case `블레이드`:
    case `데모닉`:
    case `리퍼`:
    case `소울이터`:
    case `기상술사`:
      classGroup = `deal`;
      break;
    default:
      console.log(`선택된 클래스가 잘못되었습니다`);
      break;
  }
  // 선택한 공격대를 기반으로 요일_공격대명 생성
  // 나중에 wed_atk1_mbr1를 자동으로 만들기 위함
  day_atknum = document.getElementById(name_atk).className.split(` `)[1];
  // wed_atk1_mbr1 = `${day_atknum}_mbr1`로 대체
  // 인원수대로 반복문 생성
  console.log(day_atknum);
  for (let i = 0; i < numofmbr; i++) {
    name_array.push(`#${day_atknum}_mbr${i + 1}`);
  }
  console.log(name_array);
  // 표시된 이름 요소 선택
  const elements = document.querySelectorAll(name_array);
  // 표시된 이름에 ★이 들어간 경우 삽입 근데 딜러랑 서폿 구분해야함
  // 먼저 표시된 이름에 ★이 들어간 경우 실행. 만약 없다면 경고문(자리없음) 출력
  // 표시된 이름에 ★이 들어간 경우 딜인지 폿인지 구분 ㄱㄱ
  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];
    const textContent = element.textContent;
    if (textContent.includes(`★`)) {
      if (classGroup === `deal`) {
        localStorage.setItem(`${day_atknum}_mbr${dealnumber(i)}`, nameValue);
        localStorage.setItem(
          `img_${day_atknum}_mbr${dealnumber(i)}`,
          classname
        );
        localStorage.setItem(`${day_atknum}_lv${dealnumber(i)}`, level);
        break;
      } else if (classGroup === `supt`) {
        // 1,2,3,5,6,7은 딜러로, 4,8은 서폿으로
        localStorage.setItem(
          `${day_atknum}_mbr${(Math.floor(i / 4) + 1) * 4}`,
          nameValue
        );
        localStorage.setItem(
          `img_${day_atknum}_mbr${(Math.floor(i / 4) + 1) * 4}`,
          classname
        );
        localStorage.setItem(
          `${day_atknum}_lv${(Math.floor(i / 4) + 1) * 4}`,
          level
        );
        break;
      }
    } else {
      console.log(`자리가 없어요 ㅠㅠ`);
    }
  }
}
//퀵 리무브
function quickremove() {
  console.log(`퀵리무브 실행됨`);
  console.log(thisid);
  historylist.unshift(
    `<div class="nothistorycontents"> ${atk_Id} 공대에서 ${load_name}(${load_img_name})(이)가 탈퇴합니다.</div>`
  );
  var showhistorylist = document.getElementById("parentElement");
  showhistorylist.innerHTML += historylist[historylist.length - 1];
  localStorage.setItem("historylist", JSON.stringify(historylist));
  classname = localStorage.getItem(thisid);
  console.log(`클래스 명 : ${classname}`);
  switch (classname) {
    case `홀리나이트`:
    case `바드`:
    case `도화가`:
      classGroup = `supt`;
      break;
    case `디스트로이어`:
    case `워로드`:
    case `버서커`:
    case `슬레이어`:
    case `배틀마스터`:
    case `인파이터`:
    case `기공사`:
    case `창술사`:
    case `스트라이커`:
    case `데빌헌터`:
    case `블래스터`:
    case `호크아이`:
    case `스카우터`:
    case `건슬링어`:
    case `서머너`:
    case `아르카나`:
    case `소서리스`:
    case `블레이드`:
    case `데모닉`:
    case `리퍼`:
    case `소울이터`:
    case `기상술사`:
      classGroup = `deal`;
      break;
    default:
      console.log(`선택된 클래스가 잘못되었습니다`);
      break;
  }
  console.log(`직업군 : ${classGroup}`);
  switch (classGroup) {
    case `deal`:
      localStorage.setItem(thisid.slice(4, 17), "★딜러공석★");
      localStorage.setItem(thisid, "딜러구함");
      localStorage.setItem(thislv, "0");
      break;
    case `supt`:
      localStorage.setItem(thisid.slice(4, 17), "★서폿공석★");
      localStorage.setItem(thisid, "서폿구함");
      localStorage.setItem(thislv, "0");
      break;
  }
}
// 참여 히스토리 작성
async function gohistory() {
  try {
    const result = await outputlevel();
    level = `${result.ItemAvgLevel.slice(0, 1)}${result.ItemAvgLevel.slice(
      2,
      5
    )}`;
    classname = result.CharacterClassName;
  } catch (error) {
    console.error(error);
  }
  const elements = document.getElementsByClassName("dropdown-toggle selected"); //드롭다운 선택
  Array.from(elements).forEach((element) => {
    const name_atk = element.textContent;
    historylist.unshift(
      `<div class="gohistorycontents"> ${name_atk} 공대에 ${nameValue}(이)가 ${classname}로 참여합니다.</div>`
    );
    //입력된 값 공백으로 초기화
    document.getElementById("name").value = "";
    //드롭다운 선택지 초기화
    toggleButton.textContent = "공격대를 선택해주세요";
    var showhistorylist = document.getElementById("parentElement");
    showhistorylist.innerHTML += historylist[historylist.length - 1];
    localStorage.setItem("historylist", JSON.stringify(historylist));
  });
}
// 탈퇴 히스토리 작성
async function nothistory() {
  try {
    const result = await outputlevel();
    console.log(result); // level 값을 출력
  } catch (error) {
    console.error(error);
  }
  const elements = document.getElementsByClassName("dropdown-toggle selected"); //드롭다운 선택
  Array.from(elements).forEach((element) => {
    const name_atk = element.textContent;
    const nameValue = document.getElementById("name").value; //제출한 이름 텍스트 추출
    historylist.unshift(
      `<div class="nothistorycontents"> ${name_atk} 공대에서 ${nameValue}(이)의 ${classname}(이)가 탈퇴합니다.</div>`
    );
    //입력된 값 공백으로 초기화
    document.getElementById("name").value = "";
    //드롭다운 선택지 초기화
    toggleButton.textContent = "공격대를 선택해주세요";
    var showhistorylist = document.getElementById("parentElement");
    showhistorylist.innerHTML += historylist[historylist.length - 1];
    localStorage.setItem("historylist", JSON.stringify(historylist));
  });
}
// 공대생성기 버튼 만들기
const showatkmake = document.querySelector(`.atkmakerbtn`);
const closeatkmake = document.querySelector(`.makebtn`);
showatkmake.addEventListener(`click`, () => {
  showatkmaker();
});

closeatkmake.addEventListener(`click`, () => {
  gettime();
  getgate();
  atkmaker();
  document.getElementById("time").value = "";
  document.getElementById("gate").value = "";
  dungeonselectbtn.textContent = "던전을 선택해주세요";
  dayselectbtn.textContent = "요일 선택";
  normal.classList.remove(`click`);
  hard.classList.remove(`click`);
  hell.classList.remove(`click`);
  AM.classList.remove(`click`);
  PM.classList.remove(`click`);
  closeatkmaker();
});
function getdealnum(x) {
  if (x < 3) {
    return x + 1;
  } else {
    return x + 2;
  }
}
//공대 생성기
function atkmaker() {
  // 변수 설명 : 던전명(dungeon), 오전or오후(AMorPM), 시간(time), 한글요일(koday)
  // 영문요일(elday), 난이도(difficulty), 인원수(numofmbr)
  let img, name, Lv;
  // 타겟 요소 설정(다음날의 위쪽 구분선)
  console.log(nextelday);
  console.log(document.getElementsByClassName(`${nextelday}`)[0]);
  let targetelement = document.getElementsByClassName(`${nextelday}`)[0]
    .previousElementSibling;
  console.log(targetelement);
  // 기타 요소 속성 설정
  let title = document.createElement("div"); //제목
  title.textContent = `${AMorPM} ${time} ${dungeon} ${difficulty} ${gate}`;
  for (let m = 1; m < 10; m++) {
    if (document.querySelector(`.time.${elday}_atk${m}`) !== null) {
      console.log(document.querySelector(`.time.${elday}_atk${m}`) !== null);
      atknum = `atk${m + 1}`;
    } else {
      console.log(document.querySelector(`.time.${elday}_atk${m}`) !== null);
      atknum = `atk${m}`;
      break;
    }
  }
  title.className = `time ${elday}_${atknum}`;
  title.id = `(${koday}) ${AMorPM} ${time} ${dungeon} ${difficulty} ${gate}`;
  //칸
  let conbox = document.createElement("div");
  conbox.className = `conbox${numofmbr}`;
  //박스
  let box = document.createElement("div");
  box.id = `${elday}_${atknum}`;
  // 타이틀박스
  let titlebox = document.createElement("div");
  titlebox.style.display = `flex`;
  titlebox.style.justifyContent = `space-between`;
  // 공대 삭제 버튼
  let removeatkbtn = document.createElement("div");
  removeatkbtn.textContent = `삭제`;
  removeatkbtn.className = `remove`;
  // 드롭다운 목록
  let dropdown_item = document.createElement("li");
  dropdown_item.className = `dropdown-item`;
  let dropdown_btn = document.createElement("button");
  dropdown_btn.type = `button`;
  dropdown_btn.className = `dropdown-option`;
  dropdown_btn.textContent = `(${koday}) ${AMorPM} ${time} ${dungeon} ${difficulty} ${gate}`;
  // 인원수만큼 반복
  for (i = 0; i < (numofmbr / 4) * 3; i++) {
    img = document.createElement("img");
    img.id = `img_${elday}_${atknum}_mbr${getdealnum(i)}`;
    img.src = `img/classlist/딜러구함.png`;
    img.className = `classlist_img selectbtn img_deal${i + 1}`;
    name = document.createElement("div");
    name.className = `deal${i + 1}`;
    name.id = `${elday}_${atknum}_mbr${getdealnum(i)}`;
    name.textContent = `★딜러구함★`;
    Lv = document.createElement("div");
    Lv.className = `level${getdealnum(i)}`;
    Lv.id = `${elday}_${atknum}_lv${getdealnum(i)}`;
    Lv.textContent = `Lv.0`;
    conbox.appendChild(img);
    conbox.appendChild(name);
    conbox.appendChild(Lv);
  }
  for (i = 0; i < numofmbr / 4; i++) {
    img = document.createElement("img");
    img.id = `img_${elday}_${atknum}_mbr${(i + 1) * 4}`;
    img.src = `img/classlist/서폿구함.png`;
    img.className = `classlist_img selectbtn img_supt${i + 1}`;
    name = document.createElement("div");
    name.className = `supt${i + 1}`;
    name.id = `${elday}_${atknum}_mbr${(i + 1) * 4}`;
    name.textContent = `★서폿구함★`;
    Lv = document.createElement("div");
    Lv.className = `level${(i + 1) * 4}`;
    Lv.id = `${elday}_${atknum}_lv${(i + 1) * 4}`;
    Lv.textContent = `Lv.0`;
    conbox.appendChild(img);
    conbox.appendChild(name);
    conbox.appendChild(Lv);
  }
  //요소 추가
  targetelement.insertAdjacentElement("beforebegin", box);
  box.appendChild(titlebox);
  titlebox.appendChild(title);
  titlebox.appendChild(removeatkbtn);
  box.appendChild(conbox);
  //로컬 스토리지에 저장
  localStorage.setItem(`atk : ${elday}_${atknum}`, box.outerHTML);
  //공격대 드롭다운에도 요소 추가
  const dropdown_menu = document.getElementsByClassName(`dropdown-menu`)[0];
  dropdown_menu.appendChild(dropdown_item);
  dropdown_item.appendChild(dropdown_btn);
  //공격대 드롭다운 요소 저장
  localStorage.setItem(`drop : ${elday}_${atknum}`, dropdown_item.outerHTML);
  // 요일 배열 수정하기
  console.log(day);
  day.atk.push(Number(atknum.slice(3, 4)));
  day.mbr.push(Number(numofmbr));
  console.log(atkstate);
  console.log(mbrarray);
  //수정한 데이터를 로컬 스토리지에 저장
  localStorage.setItem(`${elday} : atk`, JSON.stringify(day.atk));
  localStorage.setItem(`${elday} : mbr`, JSON.stringify(day.mbr));
  location.reload(); //새로고침
}

/* 문제점 
1. 
2.
3. 
4. 퀵리무브시 히스토리에 공대명이 없음
5. 날짜 변경 기능 추가
6. 이름 클릭 탈퇴 시 이미 비어있는 자리임에도 경고문구가 뜨지 않음
7. 공대 삭제 시 요일 목록 수정기능 추가
8. 회원가입해서 아이디 입력하면 가진 캐릭터 목록 나타나서 고르게 하기
9. 
*/
