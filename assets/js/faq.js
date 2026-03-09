// const questions = [
//   {
//     id: 1,
//     question: "受けられない人はいますか？",
//     answer: "妊娠中・心疾患・ボトックスを打った方で医師の許可がない方・ペースメーカーが入っている方には<br class='faq-break'/>施術はできません。",
//   },
//   {
//     id: 2,
//     question: "おすすめの来院頻度はどれくらいですか？",
//     answer: "より早くお身体にとって良い状態を定着させる為に、目安として10日〜14日以内に施術を受けて頂く事をオススメしております。",
//   },
//   {
//     id: 3,
//     question: "保険は使用できますか？",
//     answer: "申し訳ありませんが、法律上整体では保険適応されません。<br class='faq-break'/>また整骨院などで整体に対して、保険適応されている場合は違法行為ですのでお気をつけてください。",
//   },
//   {
//     id: 4,
//     question: "男性も利用可能ですか？",
//     answer: "もちろん男性も可能です！肩こり、頭痛、腰痛等の症状改善で通院されてる方も美容目的で小顔矯正などの施術を受けられている方も多くおられます。お気軽にご相談ください。",
//   },
//   {
//     id: 5,
//     question: "女性スタッフはいらっしゃいますか？",
//     answer: "女性スタッフ在中です。ご予約の際にご指名ください。",
//   },
//   {
//     id: 6,
//     question: "結婚式の直前に受けても大丈夫でしょうか？",
//     answer: "一度もご来院したことがない方は、万が一のことを考えてご結婚式の１週間前にお受けいただいております。今まで来院されたことがある方に関しては、状態によっては前日にも受けていただくことも可能です。",
//   },
//   {
//     id: 7,
//     question: "シェービングの前後どちらで施術を受けたらいいですか？",
//     answer: "肌トラブルを防ぐため、施術→シェービング の順番をおすすめしております。<br class='faq-break'/>先にシェービングをされる場合は、肌を休ませるために4日以上間隔を空けてご来院ください。",
//   },
//   {
//     id: 8,
//     question: "結婚式のどれくらい前から受けたほうがいいですか？",
//     answer: "お身体の状態によって通い始めるタイミングは変わりますが、３ヶ月前〜半年前からご来院される方が多いです。",
//   },
// ];

// const faqContainer = document.getElementById("faqContainer");
// let openIds = [];
// const faqElements = new Map();
// let isAnimating = false;

// function toggleAccordion(id) {
//   if (isAnimating) return;
  
//   const wasOpen = openIds.includes(id);
//   const faqElement = faqElements.get(id);
//   if (!faqElement) return;
  
//   const header = faqElement.querySelector('.accordion_header');
//   const inner = faqElement.querySelector('.accordion_inner');
//   const arrow = faqElement.querySelector('.one_i');
  
//   isAnimating = true;
  
//   if (wasOpen) {
//     openIds = openIds.filter(openId => openId !== id);
    
//     // Remove any existing animation classes
//     inner.classList.remove('opening');
//     inner.classList.add('closing');
//     header.setAttribute('aria-expanded', 'false');
    
//     setTimeout(() => {
//       inner.classList.remove('closing', 'open');
//       arrow.classList.remove('active');
//       header.classList.remove('open');
//       isAnimating = false;
//     }, 600); // Reduced to 400ms for smoother feel
//   } else {
//     openIds.push(id);
    
//     // First set the open class to show content
//     inner.classList.add('open');
//     header.classList.add('open');
//     arrow.classList.add('active');
//     header.setAttribute('aria-expanded', 'true');
    
//     // Then trigger animation in next frame
//     requestAnimationFrame(() => {
//       inner.classList.remove('opening');
//       void inner.offsetWidth; // Force reflow
//       inner.classList.add('opening');
      
//       setTimeout(() => {
//         inner.classList.remove('opening');
//         isAnimating = false;
//       }, 600); // Match animation duration
//     });
//   }
// }

// function renderFAQs() {
//   faqContainer.innerHTML = "";
//   faqElements.clear();
  
//   const fragment = document.createDocumentFragment();

//   questions.forEach(faq => {
//     const isOpen = openIds.includes(faq.id);
//     const accordion = document.createElement("div");
    
//     accordion.className = "accordion_one";
//     accordion.innerHTML = `
//       <div class="accordion_header ${isOpen ? "open" : ""}" role="button" tabindex="0" aria-expanded="${isOpen}" data-id="${faq.id}">
//         <div class="d-flex flex-row items-center gap-24px faq-header-container">
//           <p class="font-eb text-white fs-16">Q</p>
//           <p class="lh-normal fs-15 lh-150 font-noto faq-question fw-350">${faq.question}</p>
//         </div>
//         <div class="i_box">
//           <i class="one_i ${isOpen ? "active" : ""}"></i>
//         </div>
//       </div>
//       <div class="accordion_inner ${isOpen ? "open" : ""}">
//         <div class="box_one d-flex flex-row items-center gap-24px faq-answer-container">
//           <p class="fs-16 text-brown fw-500 font-eb">A</p>
//           <p class="fs-15 fw-400 faq-p lh-150 font-noto fw-300">${faq.answer}</p>
//         </div>
//       </div>
//     `;

//     fragment.appendChild(accordion);
//     faqElements.set(faq.id, accordion);
//   });

//   faqContainer.appendChild(fragment);
// }

// // Event delegation
// faqContainer.addEventListener('click', (e) => {
//   const header = e.target.closest('.accordion_header');
//   if (header) toggleAccordion(Number(header.dataset.id));
// });

// faqContainer.addEventListener('keydown', (e) => {
//   const header = e.target.closest('.accordion_header');
//   if (header && (e.key === "Enter" || e.key === " ")) {
//     e.preventDefault();
//     toggleAccordion(Number(header.dataset.id));
//   }
// });

// // Initial render
// renderFAQs();


// Question sets
const questionSets = {
  初めての方へ: [
    {id: 1, question: "Amazonesではどのようなサービスを提供しているのでしょうか？", answer: "Amazonesでは「女性が輝く未来をつくりたい」をスローガンに、フィットネスを通じて健康で喜びに満ちた未来をつくるお手伝いをするとともに、「また行きたい」「家に帰る前に行きたく"},
    {id: 2, question: "ジムの見学や体験はできますか？", answer: "Amazonesでは全店舗で常時、無料体験・見学を実施しております。"},
    {id: 3, question: "友達と体験・見学を受けたいです。一緒に受けることは可能ですか？", answer: "一緒に受けていただくことは可能です。ご予約の際に店舗へお申し出ください。"},
    {id: 4, question: "プログラムの予約方法を教えてください", answer: "<a href = '#' class = 'text-link'>マイページ</a> の予約フォームから予約が可能です。"},
    {id: 5, question: "ジムには何分前までに来店が必要ですか？", answer: "5分前を目途に来ていただければ、ご案内がスムーズです。"},
    {id: 6, question: "初回体験時のレンタル品はありますか？", answer: "初回体験のお客様には以下のアイテムを無料提供とレンタルしております。<br/> ・レンタルウェアセット（上下）・シューズ・タオル <br/> ・水素水・プロテイン"},
    {id: 7, question: "ジムに通っている方の年齢層を教えてください", answer: "10代～80代と幅広い年齢層の方にご利用いただいております。"},


],
  施設について: [
    {id: 1, question: "病気や怪我、妊娠中でもジムの利用は可能でしょうか？", answer: "妊娠中の場合でも運動は推奨されておりますが、安定期に入るまでは不安な方も多いと思いますので、安定期に入るまでの間休会も受け付けており、以降有酸素運動などしていただく<br/>以降有酸素運動などしていただくと健やかに妊娠中を過ごしていただけるかと思います<br/>病気や怪我も同様に休会（月¥2,200）が可能です。また、医師の判断により運動が止められている場合はご利用をご遠慮いただいております。"},
    {id: 2, question: "館内に忘れ物をしました。", answer: "忘れ物BOXまたは受付（カウンター内）で預かっております。<br/>保管期間は1週間となっております。"},
    {id: 3, question: "営業時間は何時ですか？", answer: "24時間年中無休ご利用いただけます。<br/>ただし、スタッフアワーは(水)(日)以外の11:00～20:00となっております。"},
    {id: 4, question: "駐車場はありますか？", answer: "店舗によって異なります。詳しく<a href = '#' class = 'text-link'>は店舗情報を</a> ご覧ください。"},
    {id: 5, question: "施設を利用するにあたって注意点やルールはありますか？", answer: "<a href = '#'  class = 'text-link'>ご利用規約<a/> をご確認ください。"},
    {id: 6, question: "シャワーはありますか？", answer: "<a href = '#'  class = '店舗によって異なります。詳しく<a href = '#' class = 'text-link'>は店舗情報<a/>をご覧ください。"},
    {id: 7, question: "どの時間帯が混みますか？", answer: "店舗により異なりますが、平日の18時以降が混み合うことが多いです。土日は、夜よりお昼間の方が利用者が多いです。"},
    {id: 8, question: "水素水・プロテインを契約していないのですが、単発で購入することは可能ですか？", answer: "基本的には200円で購入可能です。"},
    {id: 9 , question: "ロッカーは契約しなくても使えますか？", answer: "空いているロッカーは皆様ご利用可能です。"},

],
  ご入会について: [
    {id: 1, question: "入会はオンラインでできますか", answer: "オンラインから入会は可能となっておりますが、別途店頭にて書類の記入が必要となりますので、店舗での入会をお勧めしております。"},
    {id: 2, question: "入会手続きで必要なものを教えてください。", answer: "・顔写真付きの身分証明書 <br/> ・学生会員希望の方は有効な学生証 <br/> ・会費の支払い方法はクレジットカードか口座振替となっております。 <br/> ※クレジットカード引落希望の方はクレジットカードをお持ちください。<br/> ※口座振替の場合は口座情報の分かるものをお持ちください。（口座振替の場合、2ヵ月分の会費を入会時に現金でお支払いいただきます）"},
    {id: 3, question: "会員規則・利用規約などはありますか？", answer: "<a href = '#' class = 'text-link'>ご利用規約</a> をご確認ください。"},
    {id: 4, question: "未成年でも利用可能ですか？", answer: "可能となっております。18歳未満の方は入会時に保護者同意書の提出が必要です。"},

  ],
  ご予約について:[
    {id: 1, question: "体験・見学の予約はどこからできますか？", answer: "無料体験・見学のご予約は<a href = '#' class = 'text-link'>こちらから</a>"},
    {id: 2, question: "プログラムの予約はどこから取れますか？", answer: "<a href = '#' class = 'text-link'>マイページ</a> の予約フォームから予約が可能です。"},
    {id: 3, question: "チケットの種類が3種類ありますがそれぞれどういったチケットですか？", answer: "パーソナルチケット：パーソナルライト/パーソナル通い放題のプランに加入の方。<br/>また、有料パーソナルチケットをご購入いただいた方。"},
    {id: 4, question: "マイページから予約が取れません。", answer: "本人確認がまだだった。<br/>パーソナルプランじゃないのにパーソナルチケットで予約をとっていた場合 ＞ サポート・スタンダード・学生・シニアプランの場合は、無料サポートチケットを選択してください。"},
    {id: 5, question: "予約のキャンセルや変更はできますか？", answer: "キャンセル・変更は可能ですが、当日のキャンセルはチケット消化の対象となります。<br/> また、当日中での時間変更は可能ですが、別日への変更は当日キャンセルと同様の扱いとなります。"},
    {id: 6, question: "予約枠の制限はありますか？", answer: "1日でチケット2枚（1時間）まで使用可能です。"},
    {id: 7, question: "残りのチケットの枚数を確認したい。", answer: "<a href = '#' class = 'text-link'>マイページ</a>より保有している予約権利の下「チケット」から確認が可能です。"},
    {id: 8, question: "予約スケジュールはいつ公開されますか？", answer: "毎月末頃に翌月のご予約を公開しております。"},
    {id: 9, question: "初めてのジムで不安いっぱいです。大丈夫でしょうか？", answer: "当ジムは入会者様へ無料サポート4回受けていただけるチケットを付与しております。<br/>トレーナーが丁寧にサポートさせていただきます。初めての方がほとんどですので、安心してご来館くださいませ。"},
    {id: 10, question: "ジムが休館になることはありますか？", answer: "ございます。設備に不具合が発生し動作不能となった場合、または地震などの災害により一定時間の避難が必要となった場合は、休館とさせていただく可能性がございます。<br/> 状況に応じての対応、ご連絡をさせていただきます。"},
    {id: 11, question: "パーソナル以外で自分でトレーニングに来る際も予約は必要ですか？回数制限はありますか？", answer: "予約は不要で、回数制限もございません。24時間いつでもご利用いただけます。"},

  ],
 料金プランについて:[
    {id: 1, question: "チケットの購入方法を教えてください。", answer: "<a href  =  '#' class = 'text-link'>マイページ</a> より「チケット購入」を押し、店舗選択。購入するチケットの種類を選び、クレジットカード入力いただくと購入可能です。"},
    {id: 2, question: "購入チケットでの予約をキャンセルした場合、チケットの払い戻しはありますか？", answer: "一度決済いただきましたら、基本払い戻しはございません。"},
    {id: 3, question: "各種プラン料金を教えてください。", answer: "各種プランについては、<a href = '#'>店舗情報か</a>らご希望店舗の内容をご覧ください。"},
    {id: 4, question: "プランはどのようなプランがありますか", answer: "10種類のプランをご用意しております。詳しくは、<a href = '#' class = 'text-link'>店舗情報か</a> らご希望店舗の内容をご覧ください。"},
  ],
  お手続き休会退会復会について:[
    {id: 1, question: "プラン変更方法を教えてください。", answer: "<a  href = '#' class = 'text-link'>マイページ</a>より「契約管理」を選択し、「プランを変更」から変更手続きをお願いいたします。<br/>または、各店舗公式LINEにてお申し出ください。"},
    {id: 2, question: "途中でのプラン変更は可能ですか？", answer: "在籍3か月目からプラン変更可能でございます。"},
    {id: 3, question: "休会したいです。各種手続きの申請方法を教えてください。", answer: "<a href =  '#' class =  'text-link'>マイページ</a>より「契約管理」を選択し、「プランを変更」から変更手続きをお願いいたします。<br/>または、各店舗公式LINEにてお申し出ください。"},
    {id: 4, question: "休会中です。再開したいのですが、各種変更手続きの申請方法を教えてください。", answer: "<a href =  '#' class = 'text-link'>マイページ</a> より「契約管理」を選択し、「プランを変更」から変更手続きをお願いいたします。"},
    {id: 5, question: "退会したいです。各種手続きを教えてください。", answer: "退会手続きは店頭でのみ手続き可能となっております。店頭スタッフ、または各店公式LINEにてお声掛けください。<br/>クレジットカード払いの方は毎月19日まで、口座振替の方は毎月9日までの申請となります。"},
    {id: 6, question: "退会手続き後、いつまで通うことができますか？", answer: "クレジットカード払いの方は毎月19日まで、口座振替の方は毎月9日までの申請となり、翌月末退会とし退会日までご利用可能です。"},
    {id: 7, question: "在籍必須期間中ですが、退会したいです。", answer: "同意書記載通り、残りの在籍必須期間分の会費全てお支払いいただく必要がございます。お支払い後、退会可能です。"},
  ],
  お支払いについて:[
    {id: 1, question: "月会費のお支払い方法を教えてください。", answer: "お支払い方法は2種類ございます<br/><span class = 'text-lightBlue'>【カード払い】</span> <br/> 店頭にてスタッフと新規契約手続きお願いいたします。契約日に初期費用として以下のものが決済されます。<br/>・入会金＋セキュリティ登録料<br/>・契約月の会費（日割りの場合もあり）<br/>・翌月会費<br/>※2か月目以降は毎月20日に翌月分の決済が行われます<br/>※キャンペーン利用は上記と変更あり<br/><span class = 'text-lightBlue'>【口座振替】</span><br/>店頭にてスタッフと新規契約手続きお願いいたします。初期費用は店頭にて現金、または各店舗で対応しているキャッシュレス決済にてお支払いいただきます。<br/>・入会金＋セキュリティ登録料<br/>・契約月の会費（日割りの場合もあり）<br/>・翌月会費"},
    {id: 2, question: "月会費はいつ引き落としになりますか？", answer: "お支払方法により引落し日が異なります。<br/><span class = 'text-lightBlue'>【カード払いの場合】</span>毎月20日に翌月分の引落し"},
    {id: 3, question: "デビットカードやプリペイドカードでのお支払いはできますか？", answer: "以下のカードブランドがプリントされたカードであれば、デビットカードやプリペイドカードのご利用も原則可能となっております。"},
    {id: 4, question: "月会費の支払いに関して、クレジット明細はどのように記載されますか？", answer: "プラン種別と料金は<a href = '#' class  = 'text-link'>こちら</a>でご確認ください。明細は各クレジット会社にお問い合わせください。"},
    {id: 5, question: "領収書は発行できますか？", answer: "領収書は店頭にて手書きでの発行が可能でございます。店頭スタッフまでお声掛けください。"},
    {id: 6, question: "決済完了後の払い戻しはできますか？", answer: "決済後、契約完了後の払い戻しは受け付けておりません。あらかじめご了承ください。"},

  ],
  採用について:[
    {id: 1, question: "トレーナーは採用されていますか？", answer: "随時トレーナーを募集しております。詳しくは <a href = '#' class = 'text-link'>こちら</a>をご確認ください。"},
    {id: 2, question: "女性専用24時間ジムAmazonesで働いてみたいです。話だけでも聞くことは可能ですか？", answer: "お話だけでも可能となっております。お問い合わせは<a href = '#' class = 'text-link'>こちら</a> からお願いいたします。"},
    {id: 3, question: "アルバイトは募集していますか？", answer: "アルバイトも随時募集しております。お問い合わせは<a href = '#' class = 'text-link'>こちら</a>からお願いいたします。"},
    {id: 4, question: "プランはどのようなプランがありますか", answer: "10種類のプランをご用意しております。詳しくは、<a href = '#' class = 'text-link'>店舗情報か</a> らご希望店舗の内容をご覧ください。"},
  ],
  その他:[
    {id: 1, question: "靴はどうすれば良いですか？どのような靴がおすすめですか？", answer: "室内シューズ（スニーカー）であれば何でも構いません。"},
    {id: 2, question: "筋肉痛がこなくなり、きちんと効いているか不安です。", answer: "慣れてくると筋肉痛はマシになってきますので、効いていないわけではありません。<br/>また、重量を上げたりフォームが奇麗になると慣れてからもくることがあります。"},
    {id: 3, question: "「よくある質問」を読みましたが、解決しません。どうすれば良いですか？", answer: "その他のお問い合わせは、<a href = '#' class = 'text-link'>お問い合わせフォーム</a>かお電話にて承ります。<br/>また、ジムにお越しの際にスタッフに直接お聞きいただくことも可能です。お気軽にお問い合わせください。"},
    {id: 4, question: "月会費の安い店舗に入会して、月会費の高い店舗を継続利用して良いのですか？", answer: "他店を利用されるにあたり、所属店舗より他の特定の店舗を主に利用していると所定の基準に基づき判断された場合は、文書での通知をもって所属店舗が自動的に変更になります。<br/>その際、会員様自身でのお手続きは不要です。移籍の際には、移籍後の所属店舗において定められた会費等をお支払いいただきます。"},
   
  ]
};

// Get all FAQ containers
const containers = {
  初めての方へ: document.getElementById("初めての方へ"),
  施設について: document.getElementById("施設について"),
  ご入会について: document.getElementById("ご入会について"),
  ご予約について: document.getElementById("ご予約について"),
  料金プランについて: document.getElementById("料金プランについて"),
  お手続き休会退会復会について: document.getElementById("お手続き休会退会復会について"),
  お支払いについて: document.getElementById("お支払いについて"),
  採用について: document.getElementById("採用について"),
  その他:document.getElementById("その他")
};

// Store open IDs for each section
let openIds = {
  初めての方へ: [],
  施設について: [],
  ご入会について: [],
  ご予約について: [],
  料金プランについて: [],
  お手続き休会退会復会について: [],
  お支払いについて: [],
  採用について:[],
  その他:[]
};

// Track animation state per section
let animating = {
  初めての方へ: false,
  施設について: false,
  ご入会について: false,
  ご予約について: false,
  料金プランについて: false,
  お手続き休会退会復会について: false,
  お支払いについて:  false,
  採用について:  false,
  その他: false
};

function toggleAccordion(section, id) {
  if (animating[section]) return;
  
  const container = containers[section];
  if (!container) return;
  
  const header = container.querySelector(`[data-id="${id}"]`);
  if (!header) return;
  
  const faqElement = header.closest('.accordion_one');
  const inner = faqElement.querySelector('.accordion_inner');
  const arrow = faqElement.querySelector('.one_i');
  
  const wasOpen = openIds[section].includes(id);
  
  animating[section] = true;
  
  if (wasOpen) {
    openIds[section] = openIds[section].filter(v => v !== id);
    
    inner.classList.remove('opening');
    inner.classList.add('closing');
    header.setAttribute('aria-expanded', 'false');
    
    setTimeout(() => {
      inner.classList.remove('closing', 'open');
      arrow.classList.remove('active');
      header.classList.remove('open');
      animating[section] = false;
    }, 400);
  } else {
    openIds[section].push(id);
    
    inner.classList.add('open');
    header.classList.add('open');
    arrow.classList.add('active');
    header.setAttribute('aria-expanded', 'true');
    
    requestAnimationFrame(() => {
      inner.classList.remove('opening');
      void inner.offsetWidth;
      inner.classList.add('opening');
      
      setTimeout(() => {
        inner.classList.remove('opening');
        animating[section] = false;
      }, 400);
    });
  }
}

function renderSection(section, questions) {
  const container = containers[section];
  if (!container) return;
  
  container.innerHTML = questions.map(faq => {
    const isOpen = openIds[section].includes(faq.id);
    return `<div class="accordion_one">
      <div class="accordion_header ${isOpen ? 'open' : ''}" 
           role="button" tabindex="0" 
           aria-expanded="${isOpen}" 
           data-id="${faq.id}">
        <div class="flex flex-row items-center gap-20px ">
          <img src = "../assets/img/faq/icon_q.svg" />
          <p class="fw-700 fs-16">${faq.question}</p>
        </div>
        <div class="i_box">
          <i class="one_i ${isOpen ? 'active' : ''}"></i>
        </div>
      </div>
      <div class="accordion_inner ${isOpen ? 'open' : ''}">
        <div class="box_one flex flex-row items-start gap-20px ">
          <img src = "../assets/img/faq/icon_a.svg" />
          <p class="fw-500 fw-16 answer-text lh-210">${faq.answer}</p>
        </div>
      </div>
    </div>`;
  }).join('');
}

// Setup event listeners for all sections
Object.keys(containers).forEach(section => {
  const container = containers[section];
  
  container.addEventListener('click', (e) => {
    const header = e.target.closest('.accordion_header');
    if (header) toggleAccordion(section, Number(header.dataset.id));
  });

  container.addEventListener('keydown', (e) => {
    const header = e.target.closest('.accordion_header');
    if (header && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      toggleAccordion(section, Number(header.dataset.id));
    }
  });
});

// Initial render for all sections
renderSection('初めての方へ', questionSets.初めての方へ);
renderSection('施設について', questionSets.施設について);
renderSection('ご入会について', questionSets.ご入会について);
renderSection('ご予約について', questionSets.ご予約について);
renderSection('料金プランについて', questionSets.料金プランについて);
renderSection('お手続き休会退会復会について', questionSets.お手続き休会退会復会について);
renderSection('お支払いについて', questionSets.お支払いについて);
renderSection('採用について', questionSets.採用について);
renderSection('その他', questionSets.その他)