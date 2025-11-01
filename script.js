const questionBank = [
  {q:"世界上人口最多的國家是哪個？",options:["印度","美國","中國","巴西"],answer:2,explanation:"中國人口約14億，是世界上人口最多的國家。"},
  {q:"世界上面積最大的國家？",options:["俄羅斯","加拿大","中國","美國"],answer:0,explanation:"俄羅斯面積約1700萬平方公里，全球最大。"},
  {q:"巴黎的著名鐵塔是？",options:["艾菲爾鐵塔","自由女神像","倫敦塔橋","比薩斜塔"],answer:0,explanation:"艾菲爾鐵塔是巴黎地標。"},
  {q:"埃及著名金字塔位於？",options:["開羅附近","亞歷山大港","盧克索","阿斯旺"],answer:0,explanation:"吉薩金字塔群位於開羅附近。"},
  {q:"澳洲的國寶動物是？",options:["考拉","袋鼠","鴨嘴獸","袋熊"],answer:1,explanation:"袋鼠是澳洲象徵動物。"},
  {q:"世界上最長的河流？",options:["亞馬遜河","尼羅河","長江","密西西比河"],answer:1,explanation:"尼羅河長約6650公里。"},
  {q:"日本首都是？",options:["東京","大阪","京都","札幌"],answer:0,explanation:"日本首都為東京。"},
  {q:"世界上最大的沙漠？",options:["撒哈拉沙漠","阿拉伯沙漠","戈壁沙漠","南極沙漠"],answer:3,explanation:"南極沙漠面積最大，雖為冰，但算沙漠。"},
  {q:"泰姬瑪哈陵位於哪個國家？",options:["印度","巴基斯坦","孟加拉","尼泊爾"],answer:0,explanation:"泰姬瑪哈陵位於印度阿格拉。"},
  {q:"馬丘比丘位於？",options:["秘魯","墨西哥","智利","阿根廷"],answer:0,explanation:"馬丘比丘位於秘魯安第斯山脈。"},
  {q:"世界最高的山峰？",options:["喜馬拉雅山珠穆朗瑪峰","喬戈里峰","乞力馬扎羅","洛子峰"],answer:0,explanation:"珠穆朗瑪峰海拔8848米。"},
  {q:"義大利著名傾斜塔是？",options:["比薩斜塔","羅馬競技場","聖母百花大教堂","米蘭大教堂"],answer:0,explanation:"比薩斜塔以傾斜著名。"},
  {q:"世界上最小的國家？",options:["梵蒂岡","摩納哥","聖馬力諾","列支敦士登"],answer:0,explanation:"梵蒂岡面積僅0.44平方公里，是最小國家。"},
  {q:"冰島著名自然現象？",options:["極光","火山熔岩湖","地熱溫泉","皆是"],answer:3,explanation:"冰島有極光、火山、溫泉等自然景觀。"},
  {q:"加拿大國旗圖案是？",options:["楓葉","海獅","鷹","太陽"],answer:0,explanation:"加拿大國旗以紅色楓葉為標誌。"},
  {q:"哪個國家以鬱金香聞名？",options:["荷蘭","比利時","丹麥","瑞士"],answer:0,explanation:"荷蘭以鬱金香花田聞名。"},
  {q:"日本有多少個主要島嶼？",options:["四個","三個","五個","六個"],answer:0,explanation:"日本四大主要島嶼：本州、北海道、九州、四國。"},
  {q:"冰島首都是？",options:["雷克雅維克","奧斯陸","赫爾辛基","哥本哈根"],answer:0,explanation:"冰島首都為雷克雅維克。"},
  {q:"世界著名的紅色沙漠艾爾斯岩位於？",options:["澳洲","美國","南非","智利"],answer:0,explanation:"艾爾斯岩位於澳洲北領地。"},
  {q:"馬爾地夫由多少個小島組成？",options:["約1200個","約500個","約800個","約1000個"],answer:0,explanation:"馬爾地夫由約1200個珊瑚島組成。"}
];

let gameQuestions = [];
let currentQ = 0;
let score = 0;

function startGame(numQuestions){
  score=0;
  currentQ=0;
  document.getElementById("startPage").style.display="none";
  document.getElementById("endPage").style.display="none";
  document.getElementById("gamePage").style.display="block";
  gameQuestions = shuffleArray([...questionBank]).slice(0,numQuestions);
  showQuestion();
}

function showQuestion(){
  const q = gameQuestions[currentQ];
  document.getElementById("questionNumber").innerText = `第 ${currentQ+1} 題`;
  document.getElementById("questionText").innerText = q.q;
  const opts = document.getElementById("options");
  opts.innerHTML="";
  q.options.forEach((opt,i)=>{
    const btn = document.createElement("button");
    btn.innerText=opt;
    btn.className="option";
    btn.onclick=()=>checkAnswer(i);
    opts.appendChild(btn);
  });
  document.getElementById("explanation").innerText="";
  document.getElementById("nextBtn").style.display="none";
}

function checkAnswer(selected){
  const q = gameQuestions[currentQ];
  if(selected===q.answer) score++;
  document.getElementById("explanation").innerText = `解說: ${q.explanation}`;
  Array.from(document.getElementsByClassName("option")).forEach((btn,i)=>{
    btn.disabled=true;
    if(i===q.answer) btn.style.backgroundColor="#4CAF50";
    else if(i===selected) btn.style.backgroundColor="#F44336";
  });
  document.getElementById("nextBtn").style.display="inline-block";
}

function nextQuestion(){
  currentQ++;
  if(currentQ<gameQuestions.length) showQuestion();
  else endGame();
}

function endGame(){
  document.getElementById("gamePage").style.display="none";
  document.getElementById("endPage").style.display="block";
  document.getElementById("finalScore").innerText = `你答對了 ${score} / ${gameQuestions.length} 題！`;
  const perc = score/gameQuestions.length;
  let text="";
  if(perc===1) text="完美！你是旅行大師！";
  else if(perc>=0.8) text="很棒！旅行知識豐富！";
  else if(perc>=0.5) text="不錯！繼續探索世界吧！";
  else text="加油！多看看世界旅行資訊哦！";
  document.getElementById("encourageText").innerText = text;
}

function restartGame(){
  document.getElementById("startPage").style.display="block";
  document.getElementById("endPage").style.display="none";
}

function shareScore(){
  const text = `我在🌏旅行知識挑戰答對了 ${score} / ${gameQuestions.length} 題！你也來挑戰看看吧！`;
  navigator.clipboard.writeText(text).then(()=>alert("成績已複製到剪貼簿！"));
}

function shuffleArray(array){
  for(let i=array.length-1;i>0;i--){
    const j=Math.floor(Math.random()*(i+1));
    [array[i],array[j]]=[array[j],array[i]];
  }
  return array;
}
