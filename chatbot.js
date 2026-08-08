(function(){
  const FAQ = [
    { keys: ['gold'], reply: "Gold rates (24K/22K/18K) are live on the Rates page — per gram, per 8g, per 10g.", link: '/rates', linkText: 'Go to Rates →' },
    { keys: ['silver'], reply: "Silver rate is live on the Rates page, with per gram and per kg pricing.", link: '/rates', linkText: 'Go to Rates →' },
    { keys: ['platinum'], reply: "Platinum rate is live on the Rates page too.", link: '/rates', linkText: 'Go to Rates →' },
    { keys: ['weather','temperature','rain','forecast','humidity'], reply: "Live weather plus a 3-day forecast is on the Weather page.", link: '/weather', linkText: 'Go to Weather →' },
    { keys: ['emi','loan'], reply: "Use the EMI tab on the Calculators page — enter loan amount, rate, and tenure.", link: '/calculator', linkText: 'Go to Calculators →' },
    { keys: ['cgpa','marks'], reply: "The CGPA → % tab converts your CGPA using the standard ×9.5 formula.", link: '/calculator', linkText: 'Go to Calculators →' },
    { keys: ['age'], reply: "The Age tab calculates your exact age from your date of birth.", link: '/calculator', linkText: 'Go to Calculators →' },
    { keys: ['experience','joining'], reply: "The Experience tab calculates work experience from your joining date.", link: '/calculator', linkText: 'Go to Calculators →' },
    { keys: ['currency','usd','dollar','euro','pound'], reply: "The Currency tab converts live between USD, EUR, GBP, INR and more.", link: '/calculator', linkText: 'Go to Calculators →' },
    { keys: ['unit','km','miles','kg to lbs','celsius','fahrenheit'], reply: "The Units tab converts km↔miles, kg↔lbs, °C↔°F.", link: '/calculator', linkText: 'Go to Calculators →' },
    { keys: ['bmi'], reply: "The BMI tab calculates your Body Mass Index and category from height and weight.", link: '/calculator', linkText: 'Go to Calculators →' },
    { keys: ['interest','fd','deposit'], reply: "The Interest tab has both Simple and Compound Interest calculators.", link: '/calculator', linkText: 'Go to Calculators →' },
    { keys: ['tax','income tax'], reply: "The Tax tab compares old vs new India tax regime for FY 2026-27.", link: '/calculator', linkText: 'Go to Calculators →' },
    { keys: ['sip','mutual fund'], reply: "The SIP tab shows your future value from monthly investing.", link: '/calculator', linkText: 'Go to Calculators →' },
    { keys: ['gst'], reply: "The GST tab adds or removes GST at 5/12/18/28%.", link: '/calculator', linkText: 'Go to Calculators →' },
    { keys: ['todo','task','reminder'], reply: "Track your daily tasks on the To-Do page — saved in your browser only.", link: '/todo', linkText: 'Go to To-Do →' },
    { keys: ['qr'], reply: "The QR Code Generator on the Home page turns any text or URL into a downloadable QR code.", link: '/home', linkText: 'Go to Home →' },
    { keys: ['discount','sale off'], reply: "The Discount tab shows the final price after a % discount.", link: '/calculator', linkText: 'Go to Calculators →' },
    { keys: ['word count','character count'], reply: "The Word Count tab counts words, characters, and sentences live.", link: '/calculator', linkText: 'Go to Calculators →' },
    { keys: ['spin','wheel','random pick'], reply: "The Spin Wheel is on the Fun page — enter options and spin!", link: '/fun', linkText: 'Go to Fun →' },
    { keys: ['time zone','timezone'], reply: "The Time Zone Converter on the Home page shows a chosen time across IST, EST, GMT, and more.", link: '/home', linkText: 'Go to Home →' },
    { keys: ['contact','email','reach'], reply: "You can reach us anytime via the Contact page.", link: '/contact', linkText: 'Go to Contact →' },
    { keys: ['privacy'], reply: "Our full privacy policy is on the Privacy Policy page.", link: '/privacy', linkText: 'Go to Privacy →' },
    { keys: ['about','who made','who built'], reply: "Learn more about DailyBoard on the About page.", link: '/about', linkText: 'Go to About →' },
    { keys: ['dark mode','theme','night mode'], reply: "Tap the 🌙 button on the right edge of the screen to toggle dark mode.", link: null },
    { keys: ['calculator','tool','tools'], reply: "There are 14 calculators on the Calculators page — EMI, GST, Tax, BMI, SIP, and more.", link: '/calculator', linkText: 'Go to Calculators →' },
    { keys: ['hi','hello','hey','namaste','hii','helo'], reply: "Hi! I'm the DailyBoard assistant. Ask me about gold rate, EMI, BMI, weather, or any tool here.", link: null }
  ];

  function findAnswer(q){
    const lower = q.toLowerCase();
    for (const item of FAQ) {
      if (item.keys.some(k => lower.includes(k))) return item;
    }
    return { reply: "I couldn't find that. Try asking about gold rate, EMI, BMI, currency, weather, or any calculator tool — or check the nav menu at the top!", link: null };
  }

  function init(){
    const btn = document.createElement('button');
    btn.id = 'chatbotBtn';
    btn.setAttribute('aria-label','Open chat assistant');
    btn.textContent = '💬';

    const panel = document.createElement('div');
    panel.id = 'chatbotPanel';
    panel.innerHTML =
      '<div id="chatbotHeader">DailyBoard Assistant<button id="chatbotClose" aria-label="Close">✕</button></div>' +
      '<div id="chatbotMessages"></div>' +
      '<div id="chatbotInputRow">' +
        '<input type="text" id="chatbotInput" placeholder="Ask about gold rate, EMI, BMI…">' +
        '<button id="chatbotSend" aria-label="Send">➤</button>' +
      '</div>';

    document.body.appendChild(btn);
    document.body.appendChild(panel);

    function addMessage(text, sender, link, linkText){
      const messages = document.getElementById('chatbotMessages');
      const msgDiv = document.createElement('div');
      msgDiv.className = 'chatbot-msg ' + sender;
      msgDiv.textContent = text;
      messages.appendChild(msgDiv);
      if (link) {
        const a = document.createElement('a');
        a.href = link;
        a.textContent = linkText || 'Open →';
        a.className = 'chatbot-link';
        messages.appendChild(a);
      }
      messages.scrollTop = messages.scrollHeight;
    }

    let greeted = false;
    btn.addEventListener('click', () => {
      panel.classList.toggle('open');
      if (panel.classList.contains('open') && !greeted) {
        addMessage("Hi! I'm the DailyBoard assistant. Ask me about gold rate, EMI, BMI, weather, or any tool here.", 'bot');
        greeted = true;
      }
    });
    document.getElementById('chatbotClose').addEventListener('click', () => panel.classList.remove('open'));

    function handleSend(){
      const input = document.getElementById('chatbotInput');
      const q = input.value.trim();
      if (!q) return;
      addMessage(q, 'user');
      input.value = '';
      setTimeout(() => {
        const ans = findAnswer(q);
        addMessage(ans.reply, 'bot', ans.link, ans.linkText);
      }, 300);
    }
    document.getElementById('chatbotSend').addEventListener('click', handleSend);
    document.getElementById('chatbotInput').addEventListener('keydown', (e) => { if (e.key === 'Enter') handleSend(); });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
