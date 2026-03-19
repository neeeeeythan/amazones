const memberData = [
  {
    id: 1,
    shop: "和歌山駅前店",
    name: "宮崎葵 様",
    image: "../assets/img/top/icon_voice_image1.png",
    comment: "女性専用ジムで24時間空いているので自分の生活にぴったりなので通えそうです♪♪",
    age: "30代",
    membership: "6ヶ月"
  },
  {
    id: 2,
    shop: "大阪梅田店",
    name: "佐藤優子 様",
    image: "../assets/img/top/icon_voice_image2.png",
    comment: "スタッフの方が丁寧にマシンの使い方を教えてくれて、初心者でも安心して通えています。",
    age: "40代",
    membership: "3ヶ月"
  },
  {
    id: 3,
    shop: "東京新宿店",
    name: "鈴木真由美 様",
    image: "../assets/img/top/icon_voice_image3.png",
    comment: "24時間空いているので、仕事帰りや休日など自分のペースで通えるのが嬉しいです。",
    age: "20代",
    membership: "1年"
  },
  {
    id: 4,
    shop: "京都四条店",
    name: "田中恵 様",
    image: "../assets/img/top/icon_voice_image1.png",
    comment: "女性専用なので男性の目を気にせずトレーニングに集中できます。",
    age: "30代",
    membership: "8ヶ月"
  },
  {
    id: 5,
    shop: "神戸三宮店",
    name: "山本美香 様",
    image: "../assets/img/top/icon_voice_image1.png",
    comment: "マシンが充実していて、予約も取りやすいので続けられています。",
    age: "50代",
    membership: "2年"
  },
  {
    id: 6,
    shop: "横浜店",
    name: "中村綾 様",
    image: "../assets/img/top/icon_voice_image1.png",
    comment: "インストラクターの方が親身になってアドバイスしてくれるので、効果を実感できています。",
    age: "30代",
    membership: "4ヶ月"
  },
  {
    id: 7,
    shop: "名古屋栄店",
    name: "伊藤真紀 様",
    image: "../assets/img/top/icon_voice_image1.png",
    comment: "清掃が行き届いていて、いつも清潔な環境でトレーニングできます。",
    age: "40代",
    membership: "1年3ヶ月"
  },
  {
    id: 8,
    shop: "福岡天神店",
    name: "渡辺明美 様",
    image: "../assets/img/top/icon_voice_image1.png",
    comment: "アプリで混雑状況がわかるので、空いている時間を選んで通えます。",
    age: "20代",
    membership: "2ヶ月"
  },
  {
    id: 9,
    shop: "札幌店",
    name: "高橋幸子 様",
    image: "../assets/img/top/icon_voice_image1.png",
    comment: "駅から近くて通いやすいです。夜遅くまで開いているので仕事が長引いても安心です。",
    age: "30代",
    membership: "10ヶ月"
  },
  {
    id: 10,
    shop: "仙台店",
    name: "松本優香 様",
    image: "../assets/img/top/icon_voice_image1.png",
    comment: "マンツーマンレッスンで正しいフォームを学べて、ケガの心配なくトレーニングできています。",
    age: "40代",
    membership: "5ヶ月"
  },
  {
    id: 11,
    shop: "広島店",
    name: "井上真由子 様",
    image: "../assets/img/top/icon_voice_image1.png",
    comment: "他の会員の方と交流できるイベントもあって、モチベーションが保てます。",
    age: "30代",
    membership: "7ヶ月"
  },
  {
    id: 12,
    shop: "岡山店",
    name: "林久美子 様",
    image: "../assets/img/top/icon_voice_image1.png",
    comment: "料金がリーズナブルなのに設備が充実していて満足しています。",
    age: "20代",
    membership: "3ヶ月"
  },
  {
    id: 13,
    shop: "熊本店",
    name: "斎藤千夏 様",
    image: "../assets/img/top/icon_voice_image1.png",
    comment: "パーソナルトレーニングのおかげで、半年で-5kgのダイエットに成功しました！",
    age: "30代",
    membership: "6ヶ月"
  },
  {
    id: 14,
    shop: "静岡店",
    name: "加藤陽子 様",
    image: "../assets/img/top/icon_voice_image1.png",
    comment: "子供を預けてトレーニングできるので、ママでも安心して通えます。",
    age: "30代",
    membership: "4ヶ月"
  },
  {
    id: 15,
    shop: "大宮店",
    name: "吉田早紀 様",
    image: "../assets/img/top/icon_voice_image1.png",
    comment: "夜勤明けでも24時間いつでも来られるのが本当に助かっています。",
    age: "20代",
    membership: "8ヶ月"
  },
  {
    id: 16,
    shop: "千葉店",
    name: "三浦理恵 様",
    image: "../assets/img/top/icon_voice_image1.png",
    comment: "スタジオレッスンも充実していて、飽きずに続けられます。",
    age: "40代",
    membership: "1年"
  },
  {
    id: 17,
    shop: "奈良店",
    name: "橋本菜穂 様",
    image: "../assets/img/top/icon_voice_image1.png",
    comment: "他のジムより女性専用エリアが広くて快適です。",
    age: "30代",
    membership: "5ヶ月"
  },
  {
    id: 18,
    shop: "滋賀店",
    name: "西村麻衣 様",
    image: "../assets/img/top/icon_voice_image1.png",
    comment: "月額料金が安くて続けやすいです。必要なマシンは一通り揃っています。",
    age: "20代",
    membership: "2ヶ月"
  },
  {
    id: 19,
    shop: "金沢店",
    name: "森本千尋 様",
    image: "../assets/img/top/icon_voice_image1.png",
    comment: "友達と一緒に入会して、お互いに励まし合いながら続けられています。",
    age: "30代",
    membership: "9ヶ月"
  },
  {
    id: 20,
    shop: "長野店",
    name: "石井玲子 様",
    image: "../assets/img/top/icon_voice_image1.png",
    comment: "更年期の体力低下が気になっていましたが、無理なく続けられるメニューを組んでくれました。",
    age: "50代",
    membership: "1年2ヶ月"
  }
];

// Function to create a member card HTML
function createMemberCard(member) {
  return `
    <div class="p-member-content">
      <div class="relative p-member-voice-slide">
        <div class="slide-content flex flex-col gap-15px w-full p-member-voice-slide-content">
          <p class="fw-500 fs-14 text-white p-member-voice-label ">${member.shop}</p>
          <div class="p-member-voice-img-box flex flex-row items-center gap-20px">
            <img src="${member.image}" alt="${member.name}" />
          
              <p class="fw-700 text-lightBlue p-member-voice-name">${member.name}</p>
             
          </div>
          <p class="fw-500 fs-15 lh-180">${member.comment}</p>
        </div>
      </div>
    </div>
  `;
}

// Function to render all cards at once
function renderCards() {
  const container = document.getElementById('p-member-cards-container');

  let cardsHTML = '';
  memberData.forEach(member => {
    cardsHTML += createMemberCard(member);
  });

  container.innerHTML = cardsHTML;
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  renderCards();
});
