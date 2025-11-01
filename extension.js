const vscode = require('vscode');

// بيانات الأذكار
const athkarData = {
  morning: [
    { text: "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ", count: 1 },
    { text: "اللَّهُمَّ إِنِّي أَصْبَحْتُ أُشْهِدُكَ، وَأُشْهِدُ حَمَلَةَ عَرْشِكَ، وَمَلَائِكَتَكَ، وَجَمِيعَ خَلْقِكَ، أَنَّكَ أَنْتَ اللَّهُ لَا إِلَهَ إِلَّا أَنْتَ وَحْدَكَ لَا شَرِيكَ لَكَ، وَأَنَّ مُحَمَّدًا عَبْدُكَ وَرَسُولُكَ", count: 4 },
    { text: "اللَّهُمَّ مَا أَصْبَحَ بِي مِنْ نِعْمَةٍ أَوْ بِأَحَدٍ مِنْ خَلْقِكَ فَمِنْكَ وَحْدَكَ لَا شَرِيكَ لَكَ، فَلَكَ الْحَمْدُ وَلَكَ الشُّكْرُ", count: 1 },
    { text: "اللَّهُمَّ عَافِنِي فِي بَدَنِي، اللَّهُمَّ عَافِنِي فِي سَمْعِي، اللَّهُمَّ عَافِنِي فِي بَصَرِي، لَا إِلَهَ إِلَّا أَنْتَ", count: 3 },
    { text: "حَسْبِيَ اللَّهُ لَا إِلَهَ إِلَّا هُوَ عَلَيْهِ تَوَكَّلْتُ وَهُوَ رَبُّ الْعَرْشِ الْعَظِيمِ", count: 7 },
    { text: "أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ", count: 3 },
    { text: "بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ", count: 3 },
    { text: "رَضِيتُ بِاللَّهِ رَبًّا، وَبِالْإِسْلَامِ دِينًا، وَبِمُحَمَّدٍ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ نَبِيًّا", count: 3 },
    { text: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ عَدَدَ خَلْقِهِ، وَرِضَا نَفْسِهِ، وَزِنَةَ عَرْشِهِ، وَمِدَادَ كَلِمَاتِهِ", count: 3 },
    { text: "اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا، وَرِزْقًا طَيِّبًا، وَعَمَلًا مُتَقَبَّلًا", count: 1 },
    { text: "أَسْتَغْفِرُ اللَّهَ وَأَتُوبُ إِلَيْهِ", count: 100 },
    { text: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ", count: 100 }
  ],
  evening: [
    { text: "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ", count: 1 },
    { text: "اللَّهُمَّ إِنِّي أَمْسَيْتُ أُشْهِدُكَ، وَأُشْهِدُ حَمَلَةَ عَرْشِكَ، وَمَلَائِكَتَكَ، وَجَمِيعَ خَلْقِكَ، أَنَّكَ أَنْتَ اللَّهُ لَا إِلَهَ إِلَّا أَنْتَ وَحْدَكَ لَا شَرِيكَ لَكَ، وَأَنَّ مُحَمَّدًا عَبْدُكَ وَرَسُولُكَ", count: 4 },
    { text: "اللَّهُمَّ مَا أَمْسَى بِي مِنْ نِعْمَةٍ أَوْ بِأَحَدٍ مِنْ خَلْقِكَ فَمِنْكَ وَحْدَكَ لَا شَرِيكَ لَكَ، فَلَكَ الْحَمْدُ وَلَكَ الشُّكْرُ", count: 1 },
    { text: "اللَّهُمَّ عَافِنِي فِي بَدَنِي، اللَّهُمَّ عَافِنِي فِي سَمْعِي، اللَّهُمَّ عَافِنِي فِي بَصَرِي، لَا إِلَهَ إِلَّا أَنْتَ", count: 3 },
    { text: "حَسْبِيَ اللَّهُ لَا إِلَهَ إِلَّا هُوَ عَلَيْهِ تَوَكَّلْتُ وَهُوَ رَبُّ الْعَرْشِ الْعَظِيمِ", count: 7 },
    { text: "أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ", count: 3 },
    { text: "بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ", count: 3 },
    { text: "رَضِيتُ بِاللَّهِ رَبًّا، وَبِالْإِسْلَامِ دِينًا، وَبِمُحَمَّدٍ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ نَبِيًّا", count: 3 },
    { text: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ عَدَدَ خَلْقِهِ، وَرِضَا نَفْسِهِ، وَزِنَةَ عَرْشِهِ، وَمِدَادَ كَلِمَاتِهِ", count: 3 },
    { text: "أَسْتَغْفِرُ اللَّهَ وَأَتُوبُ إِلَيْهِ", count: 100 },
    { text: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ", count: 100 }
  ]
};

let currentAthkarSession = null;

function activate(context) {
  console.log('Athkar Extension is now active!');

  // تسجيل الأوامر
  context.subscriptions.push(
    vscode.commands.registerCommand('athkar.showMorning', () => {
      startAthkarSession(context, 'morning');
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('athkar.showEvening', () => {
      startAthkarSession(context, 'evening');
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('athkar.settings', () => {
      vscode.commands.executeCommand('workbench.action.openSettings', 'athkar');
    })
  );

  // فحص الأذكار عند فتح VS Code
  checkAthkarOnStartup(context);

  // فحص دوري كل 30 دقيقة
  setInterval(() => checkAthkarOnStartup(context), 30 * 60 * 1000);
}

function checkAthkarOnStartup(context) {
  const now = new Date();
  const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
  const today = now.toDateString();

  const config = vscode.workspace.getConfiguration('athkar');
  const morningEndTime = config.get('morningEndTime', '12:00');
  const eveningStartTime = config.get('eveningStartTime', '16:00');
  const eveningEndTime = config.get('eveningEndTime', '23:59');

  // فحص أذكار الصباح
  if (currentTime < morningEndTime) {
    const morningDone = context.globalState.get(`morning_${today}`, false);
    if (!morningDone) {
      showAthkarReminder(context, 'morning');
    }
  }

  // فحص أذكار المساء
  if (currentTime >= eveningStartTime && currentTime <= eveningEndTime) {
    const eveningDone = context.globalState.get(`evening_${today}`, false);
    if (!eveningDone) {
      showAthkarReminder(context, 'evening');
    }
  }
}

function showAthkarReminder(context, type) {
  const typeText = type === 'morning' ? 'الصباح' : 'المساء';
  
  vscode.window.showInformationMessage(
    `🌙 وقت أذكار ${typeText}`,
    'ابدأ الآن',
    'لاحقاً',
    'تم بالفعل'
  ).then(selection => {
    if (selection === 'ابدأ الآن') {
      startAthkarSession(context, type);
    } else if (selection === 'تم بالفعل') {
      const today = new Date().toDateString();
      context.globalState.update(`${type}_${today}`, true);
      vscode.window.showInformationMessage('✅ بارك الله فيك!');
    }
  });
}

function startAthkarSession(context, type) {
  if (currentAthkarSession) {
    vscode.window.showWarningMessage('يوجد جلسة أذكار جارية بالفعل');
    return;
  }

  const athkar = athkarData[type];
  const typeText = type === 'morning' ? 'الصباح' : 'المساء';

  currentAthkarSession = {
    type: type,
    athkarIndex: 0,
    currentCount: 0,
    totalAthkar: athkar.length
  };

  vscode.window.showInformationMessage(`🕌 بدأت أذكار ${typeText}`);
  showNextThikr(context);
}

function showNextThikr(context) {
  if (!currentAthkarSession) return;

  const { type, athkarIndex, currentCount } = currentAthkarSession;
  const athkar = athkarData[type];

  if (athkarIndex >= athkar.length) {
    // انتهت الأذكار
    completeAthkarSession(context);
    return;
  }

  const currentThikr = athkar[athkarIndex];
  const remainingCount = currentThikr.count - currentCount;

  if (remainingCount <= 0) {
    // الانتقال للذكر التالي
    currentAthkarSession.athkarIndex++;
    currentAthkarSession.currentCount = 0;
    showNextThikr(context);
    return;
  }

  const progress = `[${athkarIndex + 1}/${athkar.length}]`;
  const countText = remainingCount > 1 ? ` - ${remainingCount}×` : '';

  vscode.window.showInformationMessage(
    `${progress}${countText}\n\n${currentThikr.text}`,
    { modal: false },
    'Next',
    'Hide'
  ).then(selection => {
    if (selection === 'Next') {
      currentAthkarSession.currentCount++;
      showNextThikr(context);
    } else if (selection === 'Hide') {
      hideAthkarSession(context);
    }
  });
}

function hideAthkarSession(context) {
  vscode.window.showWarningMessage(
    'هل تريد إيقاف الأذكار؟',
    'نعم، أوقف',
    'لا، استمر'
  ).then(selection => {
    if (selection === 'نعم، أوقف') {
      currentAthkarSession = null;
      vscode.window.showInformationMessage('تم إيقاف الأذكار');
    } else if (selection === 'لا، استمر') {
      showNextThikr(context);
    }
  });
}

function completeAthkarSession(context) {
  const { type } = currentAthkarSession;
  const today = new Date().toDateString();
  const typeText = type === 'morning' ? 'الصباح' : 'المساء';

  // حفظ أن الأذكار تمت
  context.globalState.update(`${type}_${today}`, true);

  currentAthkarSession = null;

  vscode.window.showInformationMessage(
    `✅ تمت أذكار ${typeText} بنجاح!\n\nتقبل الله منك 🤲`,
    'الحمد لله'
  );
}

function deactivate() {
  currentAthkarSession = null;
}

module.exports = {
  activate,
  deactivate
};